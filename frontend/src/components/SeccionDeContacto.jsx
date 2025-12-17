function SeccionDeContacto() {
  return (
    <div className="bg-[#161515ff] px-4 sm:px-6">
      <div className="pt-10 grid lg:grid-cols-2 items-start gap-16 p-6 mx-auto max-w-5xl font-serif">
        <div>
          <h2 className="text-white text-5xl md:text-6xl lg:text-7xl font-gnr tracking-wide pt-10 pb-6 transition hover:text-yellow-500">
            Contacto
          </h2>
          <p className="text-lg md:text-xl text-yellow-500 mt-4 leading-relaxed">
            Contacta con nosotros si tienes alguna sugerencia para el blog!
          </p>
        </div>

        <form className="lg:ml-auto space-y-4 w-full">
          <input
            type="text"
            placeholder="Nombre"
            className="w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border border-gray-200 focus:border-slate-900 outline-none focus:bg-gray-200"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border border-gray-200 focus:border-slate-900 outline-none focus:bg-gray-200"
          />
          <input
            type="text"
            placeholder="Asunto"
            className="w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border border-gray-200 focus:border-slate-900 outline-none focus:bg-gray-200"
          />
          <textarea
            placeholder="Mensaje"
            rows="6"
            className="w-full rounded-md px-4 bg-slate-100 text-slate-900 text-sm pt-3 border border-gray-200 focus:border-slate-900 outline-none focus:bg-gray-200"
          ></textarea>
          <button
            type="button"
            className="text-black bg-yellow-500 transition hover:bg-yellow-600 tracking-wide rounded-md text-sm font-medium px-4 py-3 w-full cursor-pointer mt-2 border-0"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
}

export default SeccionDeContacto;
