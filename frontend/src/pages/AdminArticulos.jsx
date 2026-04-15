import { useEffect, useMemo, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar2';
import PageContainer from '../components/PageContainer';
import { apiUrl } from '../lib/api';
const STORAGE_KEY = 'adminToken';
const SECTION_OPTIONS = [
  { value: 'noticias', label: 'Noticias' },
  { value: 'whatif', label: 'What If?' },
  { value: 'discografia', label: 'Discografia' },
  { value: 'entrevistas', label: 'Entrevistas' },
];

const EMPTY_CREDENTIALS = {
  username: '',
  password: '',
};

const EMPTY_ARTICLE = {
  title: '',
  description: '',
  img: '',
  body: '',
  section: 'noticias',
};

async function getErrorMessage(response, fallbackMessage) {
  try {
    const data = await response.json();
    return data.detail || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

function AdminArticulos() {
  const [hasAdmin, setHasAdmin] = useState(null);
  const [session, setSession] = useState(null);
  const [credentials, setCredentials] = useState(EMPTY_CREDENTIALS);
  const [article, setArticle] = useState(EMPTY_ARTICLE);
  const [authError, setAuthError] = useState('');
  const [authNotice, setAuthNotice] = useState('');
  const [articleError, setArticleError] = useState('');
  const [articleNotice, setArticleNotice] = useState('');
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);
  const [isSubmittingArticle, setIsSubmittingArticle] = useState(false);

  const isSetupMode = useMemo(() => hasAdmin === false, [hasAdmin]);

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      setIsBootstrapping(true);
      try {
        const statusResponse = await fetch(apiUrl('/api/admin/status'));
        if (!statusResponse.ok) {
          throw new Error('No se pudo consultar el estado del admin');
        }

        const statusData = await statusResponse.json();
        if (!isMounted) {
          return;
        }

        setHasAdmin(statusData.has_admin);

        const storedToken = window.localStorage.getItem(STORAGE_KEY);
        if (!storedToken) {
          return;
        }

        const sessionResponse = await fetch(apiUrl('/api/admin/session'), {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!isMounted) {
          return;
        }

        if (!sessionResponse.ok) {
          window.localStorage.removeItem(STORAGE_KEY);
          return;
        }

        const sessionData = await sessionResponse.json();
        setSession({
          token: storedToken,
          username: sessionData.username,
        });
        setAuthNotice('Sesion recuperada. Ya puedes publicar.');
      } catch (error) {
        if (isMounted) {
          setAuthError(error.message || 'No se pudo cargar la pantalla de admin');
        }
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    }

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleCredentialChange(event) {
    const { name, value } = event.target;
    setCredentials((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleArticleChange(event) {
    const { name, value } = event.target;
    setArticle((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleAuthSubmit(event) {
    event.preventDefault();
    setIsSubmittingAuth(true);
    setAuthError('');
    setAuthNotice('');
    setArticleNotice('');

    const endpoint = isSetupMode ? '/api/admin/setup' : '/api/admin/login';

    try {
      const response = await fetch(apiUrl(endpoint), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const message = await getErrorMessage(
          response,
          isSetupMode ? 'No se pudo crear el admin' : 'No se pudo iniciar sesion'
        );
        setAuthError(message);
        return;
      }

      const data = await response.json();
      window.localStorage.setItem(STORAGE_KEY, data.access_token);
      setSession({
        token: data.access_token,
        username: data.username,
      });
      setHasAdmin(true);
      setCredentials(EMPTY_CREDENTIALS);
      setAuthNotice(
        isSetupMode
          ? 'Admin configurado. Ya puedes crear articulos.'
          : 'Sesion iniciada correctamente.'
      );
    } catch {
      setAuthError('No se pudo conectar con la API de autenticacion');
    } finally {
      setIsSubmittingAuth(false);
    }
  }

  function handleLogout() {
    window.localStorage.removeItem(STORAGE_KEY);
    setSession(null);
    setAuthNotice('Sesion cerrada.');
    setArticleNotice('');
    setArticleError('');
  }

  async function handleArticleSubmit(event) {
    event.preventDefault();
    if (!session?.token) {
      setArticleError('Necesitas iniciar sesion antes de publicar');
      return;
    }

    setIsSubmittingArticle(true);
    setArticleError('');
    setArticleNotice('');

    try {
      const response = await fetch(apiUrl('/api/articles/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({
          ...article,
          img: article.img.trim() || null,
          body: article.body.trim(),
          section: article.section,
        }),
      });

      if (response.status === 401) {
        handleLogout();
        setArticleError('La sesion ha caducado. Vuelve a iniciar sesion.');
        return;
      }

      if (!response.ok) {
        const message = await getErrorMessage(response, 'No se pudo crear el articulo');
        setArticleError(message);
        return;
      }

      const data = await response.json();
      setArticle(EMPTY_ARTICLE);
      setArticleNotice(`Articulo publicado: ${data.title}`);
    } catch {
      setArticleError('No se pudo conectar con la API de articulos');
    } finally {
      setIsSubmittingArticle(false);
    }
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        <section className="relative overflow-hidden bg-[#080808] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(239,68,68,0.18),transparent_28%),linear-gradient(180deg,#0a0a0a_0%,#111111_45%,#050505_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />

          <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-7xl flex-col gap-8 px-4 py-10 md:px-8 lg:px-10">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[2rem] border border-yellow-400/20 bg-black/45 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur md:p-8">
                <p className="mb-3 text-xs uppercase tracking-[0.45em] text-yellow-400/80">Sala de redaccion</p>
                <h1 className="font-gnr text-5xl leading-none text-white md:text-7xl">Crear articulos</h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
                  Esta area protege la publicacion del blog. La primera entrada configura el usuario admin y, a partir de ahi, solo se puede publicar con usuario y contrasena.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-yellow-400/75">Acceso</p>
                    <p className="mt-2 text-sm text-zinc-300">Token firmado en cliente y validado en API.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-yellow-400/75">Primer uso</p>
                    <p className="mt-2 text-sm text-zinc-300">Si no existe admin, esta pantalla te obliga a crearlo.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-yellow-400/75">Proteccion</p>
                    <p className="mt-2 text-sm text-zinc-300">Crear, editar y borrar articulos queda cerrado al publico.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.55)] backdrop-blur md:p-8">
                <p className="text-xs uppercase tracking-[0.45em] text-zinc-500">
                  {isSetupMode ? 'Alta inicial' : 'Autenticacion'}
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  {isSetupMode ? 'Configura el admin' : 'Inicia sesion'}
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {isSetupMode
                    ? 'Todavia no existe un admin. Define ahora el usuario y la contrasena que se usaran para publicar.'
                    : 'Usa el usuario y la contrasena del admin para acceder al panel de publicacion.'}
                </p>

                {authError ? (
                  <div className="mt-5 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {authError}
                  </div>
                ) : null}

                {authNotice ? (
                  <div className="mt-5 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-100">
                    {authNotice}
                  </div>
                ) : null}

                {isBootstrapping ? (
                  <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-sm text-zinc-300">
                    Cargando estado del acceso...
                  </div>
                ) : session ? (
                  <div className="mt-8 space-y-5">
                    <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4">
                      <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">Sesion activa</p>
                      <p className="mt-2 text-lg font-semibold text-white">{session.username}</p>
                      <p className="mt-2 text-sm text-emerald-100/85">El formulario de publicacion queda desbloqueado en esta sesion.</p>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:border-yellow-400 hover:text-yellow-300"
                    >
                      Cerrar sesion
                    </button>
                  </div>
                ) : (
                  <form className="mt-8 space-y-5" onSubmit={handleAuthSubmit}>
                    <label className="block">
                      <span className="mb-2 block text-xs uppercase tracking-[0.35em] text-zinc-500">Usuario</span>
                      <input
                        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400/60"
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleCredentialChange}
                        placeholder="redaccion-gnr"
                        autoComplete="username"
                        required
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs uppercase tracking-[0.35em] text-zinc-500">Contrasena</span>
                      <input
                        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400/60"
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleCredentialChange}
                        placeholder="Minimo 6 caracteres"
                        autoComplete={isSetupMode ? 'new-password' : 'current-password'}
                        required
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmittingAuth}
                      className="inline-flex w-full items-center justify-center rounded-full bg-yellow-400 px-5 py-3 text-sm font-black uppercase tracking-[0.3em] text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmittingAuth
                        ? 'Procesando...'
                        : isSetupMode
                          ? 'Crear admin'
                          : 'Entrar'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-zinc-950/85 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.5)] backdrop-blur md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.45em] text-zinc-500">Publicacion</p>
                  <h2 className="mt-3 font-gnr text-4xl text-white md:text-5xl">Nuevo articulo</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
                    Completa el formulario y publica directamente contra la API protegida. El acceso solo se habilita cuando la sesion es valida.
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-zinc-400">
                  {session ? `Activo: ${session.username}` : 'Bloqueado'}
                </div>
              </div>

              {articleError ? (
                <div className="mt-6 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {articleError}
                </div>
              ) : null}

              {articleNotice ? (
                <div className="mt-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                  {articleNotice}
                </div>
              ) : null}

              <form className="mt-8 grid gap-5 lg:grid-cols-2" onSubmit={handleArticleSubmit}>
                <label className="block lg:col-span-2">
                  <span className="mb-2 block text-xs uppercase tracking-[0.35em] text-zinc-500">Titulo</span>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400/60"
                    type="text"
                    name="title"
                    value={article.title}
                    onChange={handleArticleChange}
                    placeholder="Slash y la noche que cambio la banda"
                    required
                    disabled={!session || isSubmittingArticle}
                  />
                </label>

                <label className="block lg:col-span-2">
                  <span className="mb-2 block text-xs uppercase tracking-[0.35em] text-zinc-500">Descripcion corta</span>
                  <textarea
                    className="min-h-28 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400/60"
                    name="description"
                    value={article.description}
                    onChange={handleArticleChange}
                    placeholder="Resumen que aparecera en las tarjetas del blog"
                    required
                    disabled={!session || isSubmittingArticle}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.35em] text-zinc-500">Imagen</span>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400/60"
                    type="url"
                    name="img"
                    value={article.img}
                    onChange={handleArticleChange}
                    placeholder="https://..."
                    disabled={!session || isSubmittingArticle}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.35em] text-zinc-500">Seccion</span>
                  <select
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-yellow-400/60"
                    name="section"
                    value={article.section}
                    onChange={handleArticleChange}
                    disabled={!session || isSubmittingArticle}
                  >
                    {SECTION_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block lg:col-span-2">
                  <span className="mb-2 block text-xs uppercase tracking-[0.35em] text-zinc-500">Cuerpo</span>
                  <textarea
                    className="min-h-72 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400/60"
                    name="body"
                    value={article.body}
                    onChange={handleArticleChange}
                    placeholder="Escribe aqui el contenido completo del articulo"
                    required
                    disabled={!session || isSubmittingArticle}
                  />
                </label>

                <div className="flex flex-col gap-3 lg:col-span-2 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm text-zinc-500">
                    Si no hay sesion valida, la API devolvera 401 y el formulario seguira bloqueado.
                  </p>
                  <button
                    type="submit"
                    disabled={!session || isSubmittingArticle}
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.3em] text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmittingArticle ? 'Publicando...' : 'Publicar articulo'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </PageContainer>
      <Footer />
    </>
  );
}

export default AdminArticulos;
