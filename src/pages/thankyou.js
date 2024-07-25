import { info } from '../../info';

export default function ThankYou() {
  return (
    <section className="relative flex flex-col flex-grow justify-center pt-20 px-0">
      <div className="container md:w-1/2 flex flex-col items-center">
        <h2 className="ft-8 text-center">
          Gracias por contactarnos y sumarte al cambio de una agricultura sustentable.
        </h2>
        <p className="text-center ft-6 mt-20">Si no se abrió tu WhatsApp</p>
        <a
          className="button !bg-brand-5 ft-4 flex justify-center items-center mt-6"
          href={`https://wa.me/${info.whatsapp.value}?text=${info.whatsapp.message}`}
          target="_blank"
        >
          <span className="material-icons">arrow_forward</span>Da click aquí<span
          className="text-white material-icons">arrow_back</span>
        </a>
      </div>
    </section>
  );
}
