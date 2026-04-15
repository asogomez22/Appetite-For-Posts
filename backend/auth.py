import base64
import hashlib
import hmac
import json
import os
import secrets
import time

LEGACY_PASSWORD_SUFFIX = '#fake'
PASSWORD_SALT_BYTES = 12
PASSWORD_HASH_BYTES = 20
PASSWORD_ITERATIONS = 310_000
ENVIRONMENT = os.getenv('ENVIRONMENT', 'development').lower()
TOKEN_TTL_SECONDS = int(os.getenv('AUTH_TOKEN_TTL_SECONDS', '86400'))
AUTH_SECRET = os.getenv('AUTH_SECRET', 'change-this-auth-secret-in-production')

if ENVIRONMENT == 'production' and AUTH_SECRET == 'change-this-auth-secret-in-production':
    raise RuntimeError('AUTH_SECRET must be set to a strong value in production.')
if TOKEN_TTL_SECONDS <= 0:
    raise RuntimeError('AUTH_TOKEN_TTL_SECONDS must be greater than zero.')


def _urlsafe_b64encode(value: bytes) -> str:
    return base64.urlsafe_b64encode(value).decode('ascii').rstrip('=')



def _urlsafe_b64decode(value: str) -> bytes:
    padding = '=' * (-len(value) % 4)
    return base64.urlsafe_b64decode(value + padding)



def hash_password(password: str) -> str:
    salt = secrets.token_bytes(PASSWORD_SALT_BYTES)
    derived_key = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt,
        PASSWORD_ITERATIONS,
        dklen=PASSWORD_HASH_BYTES,
    )
    return _urlsafe_b64encode(salt + derived_key)



def is_legacy_password(password_hash: str) -> bool:
    return password_hash.endswith(LEGACY_PASSWORD_SUFFIX)



def verify_password(password: str, stored_password: str) -> bool:
    if is_legacy_password(stored_password):
        legacy_value = f'{password}{LEGACY_PASSWORD_SUFFIX}'
        return hmac.compare_digest(legacy_value, stored_password)

    try:
        decoded = _urlsafe_b64decode(stored_password)
    except Exception:
        return False

    if len(decoded) <= PASSWORD_SALT_BYTES:
        return False

    salt = decoded[:PASSWORD_SALT_BYTES]
    expected_hash = decoded[PASSWORD_SALT_BYTES:]
    candidate_hash = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt,
        PASSWORD_ITERATIONS,
        dklen=len(expected_hash),
    )
    return hmac.compare_digest(candidate_hash, expected_hash)



def create_access_token(username: str) -> str:
    payload = {
        'sub': username,
        'exp': int(time.time()) + TOKEN_TTL_SECONDS,
    }
    payload_segment = _urlsafe_b64encode(
        json.dumps(payload, separators=(',', ':'), sort_keys=True).encode('utf-8')
    )
    signature = hmac.new(
        AUTH_SECRET.encode('utf-8'),
        payload_segment.encode('utf-8'),
        hashlib.sha256,
    ).digest()
    signature_segment = _urlsafe_b64encode(signature)
    return f'{payload_segment}.{signature_segment}'



def decode_access_token(token: str) -> dict | None:
    try:
        payload_segment, signature_segment = token.split('.', maxsplit=1)
    except ValueError:
        return None

    expected_signature = hmac.new(
        AUTH_SECRET.encode('utf-8'),
        payload_segment.encode('utf-8'),
        hashlib.sha256,
    ).digest()

    try:
        provided_signature = _urlsafe_b64decode(signature_segment)
        payload = json.loads(_urlsafe_b64decode(payload_segment).decode('utf-8'))
    except Exception:
        return None

    if not hmac.compare_digest(provided_signature, expected_signature):
        return None

    expires_at = payload.get('exp')
    username = payload.get('sub')
    if not isinstance(expires_at, int) or not isinstance(username, str):
        return None
    if expires_at <= int(time.time()):
        return None

    return payload
