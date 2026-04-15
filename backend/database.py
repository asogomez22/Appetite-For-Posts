import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()


def _build_connection_url() -> str:
    database_url = os.getenv('DATABASE_URL')
    if database_url:
        return database_url

    required_settings = {
        'DB_NAME': os.getenv('DB_NAME'),
        'DB_HOST': os.getenv('DB_HOST'),
        'DB_PASSWORD': os.getenv('DB_PASSWORD'),
        'DB_DIALECT': os.getenv('DB_DIALECT'),
        'DB_USER': os.getenv('DB_USER'),
    }
    missing_settings = [key for key, value in required_settings.items() if not value]
    if missing_settings:
        missing_list = ', '.join(missing_settings)
        raise RuntimeError(
            f'Missing database configuration: {missing_list}. '
            'Set DATABASE_URL or the individual DB_* variables.'
        )

    return '{dialect}://{user}:{password}@{host}/{name}'.format(
        dialect=required_settings['DB_DIALECT'],
        user=required_settings['DB_USER'],
        password=required_settings['DB_PASSWORD'],
        host=required_settings['DB_HOST'],
        name=required_settings['DB_NAME'],
    )


URL_CONNECTION = _build_connection_url()

engine = create_engine(URL_CONNECTION, pool_pre_ping=True)

localSession = sessionmaker(autoflush=False, autocommit=False, bind=engine)

Base = declarative_base()
