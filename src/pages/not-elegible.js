import { info } from '../../info';

export default function ThankYou() {
  return (
    <section className="relative flex flex-col flex-grow justify-center pt-20 px-0">
      <div className="container md:w-1/2 flex flex-col items-center gap-8">
        <h2 className="ft-8 text-center">
          Gracias por compartirnos tu información
        </h2>
        <p className="ft-4 text-center">
          Parece que tu negocio se encuentra en una etapa de optimizar procesos y sentar bases sólidas antes de
          implementar un software a medida.
          <br/><br/>
          Para ayudarte a prepararte, creamos un ebook con las mejores prácticas para sistematizar tu negocio.
          <br/><br/>
          Descárgalo y vuelve cuando estés listo para avanzar al siguiente nivel.
        </p>
        <a
          className="button hover:scale-105 bg-brand-2 hover:bg-brand-3 ft-4 flex justify-center items-center "
          href='/resources/as-sistemas-ebook-2026.pdf'
          target="_blank"
        >
          <span className="material-icons">arrow_forward</span>Descarga aquí
          <span className="text-white material-icons">arrow_back</span>
        </a>

        <p className="ft-2 text-center mt-20">
          Si tienes dudas más puntuales y necesitas asesoría de un especialista
        </p>
        <a
          className="ft-2 py-3 px-6 rounded-lg items-center  bg-green-500 hover:bg-green-600 transition-all hover:scale-105"
          href={`https://wa.me/${info.whatsapp.value}`}
        >
          <p className="text-white">
            Contáctanos por <span className="font-semibold">WhatsApp</span>
          </p>
        </a>
      </div>
    </section>
  );
}
