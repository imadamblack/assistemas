import Blockbuster from '../components/blockbuster';
import OptInForm from '../components/form/opt-in-form';
import { useEffect, useState } from 'react';
import scrollDepth from '../utils/scrollDepth';
import Faqs from '../components/faqs';
import Link from 'next/link';

import i01 from '../../public/assets/imagenes/01.jpg'
import i02 from '../../public/assets/imagenes/02.jpg'
import i03 from '../../public/assets/imagenes/03.jpg'
import i05 from '../../public/assets/imagenes/05.jpg'

export default function Home() {
  const [lastClick, setLastClick] = useState('');

  useEffect(() => {
    scrollDepth({
      values: [25, 50, 75, 100],
      callback: (value) => fbq('trackCustom', `Scroll Depth: ${value}`),
    });
  });

  console.log(lastClick);

  return (
    <>
      <section
        className="relative min-h-[64rem] w-full flex flex-col justify-center items-center bg-[url('/assets/imagenes/06.png')] bg-cover">
        <div className="w-full lg:w-1/2 text-center text-white z-10 p-8">
          <h1
            className="relative font-semibold ft-10 text-white [text-shadow:_2px_2px_0_rgb(0_0_0_/_60%)]">
            Ahorra hasta el 70% de las tareas manuales y automatiza el crecimiento de tu negocio
          </h1>
          <div className="flex flex-col justify-center items-center mt-12">
            <p className="ft-2 font-medium text-center mb-12 text-white">Agenda una sesión gratuita <br/>para diseñar el
              software de gestión de tu empresa</p>
            <Link href="#contact">
              <a
                onClick={() => setLastClick('hero')}
                className="button mb-4 mx-auto"
              >Agenda una sesión estratégica</a>
            </Link>
          </div>
        </div>
        <div className="absolute flex flex-col justify-center items-center text-white bottom-8 mt-8 md:mt-20 z-10">
          <p className="ft-1 text-white">Sigue leyendo</p>
          <div className="animate-bounce">
            <div className="ft-3 material-icons mx-auto">expand_more</div>
          </div>
        </div>
        <div className="w-full h-full absolute bg-black/30 -z-1"/>
      </section>

      <section className="reading-container mb-16">
        <div className="flex border-b border-brand-1 pb-4 mb-8">
          <span className="material-icons mr-2 -ft-2">timer</span>
          <p className="-ft-2" style={{marginBlockEnd: 0}}>Tiempo estimado: 4 min</p>
        </div>
        <p className="ft-4 font-bold">Queremos que te conviertas en una empresa</p>
        <p className="ft-6 font-bold text-brand-3">+ Rentable</p>
        <p className="ft-6 !mt-0 font-bold text-brand-3 ">+ Productiva</p>
        <p className="ft-2 mt-12">
          Ni a ti ni a tu equipo de trabajo les beneficia que solo 1 persona
          en la empresa tenga la información y todos colapsen cuando esa
          persona no está para resolver un dato.
          <br/><br/>
          Nosotros te ayudamos a <b>centralizar la información</b> para que sea accesible para todos
          y <b>automatizamos procesos</b> que te quitan mucho tiempo con <b>un software de
          gestión</b> para que tu equipo se concentre en lo que verdaderamente
          importa: que la empresa crezca.
        </p>
        <div className="flex flex-col justify-center items-center">
          <Link href="#contact">
            <a
              onClick={() => setLastClick('story')}
              className="button mb-4 mx-auto"
            >Contáctanos, da clic</a>
          </Link>
          <p className="-ft-2 !mt-2 text-center">Agenda una asesoría de software</p>
        </div>
      </section>

      <Blockbuster
        overhead="Beneficios"
        title="Por qué deberías considerar un software de gestión en lugar de mil archivos de excel"
        image={i01}
      />
      <section className="reading-container my-16">
        <p className="ft-2">
          A ver, ya estamos de acuerdo en parar el uso excesivo de excel.
          <br/><br/>
          Ahora, te voy a dar 3 razones de por qué un software a medida:
        </p>
        <h3 className="ft-2 font-bold text-brand-3">
          La automatización
        </h3>
        <p className="ft-2">
          Y es que no me vas a negar que estar encargando siempre las mismas tareas y no salgan como quieres, se vuelve
          una friega diaria.
        </p>
        <h3 className="ft-2 font-bold text-brand-3">
          La integración y centralización de información
        </h3>
        <p className="ft-2">
          Para que no tengas que depender de Lupita de contabilidad cuando se va a la playa y no estuvo conectada por
          cualquier cosa.
        </p>
        <h3 className="ft-2 font-bold text-brand-3">
          Y por último: time is money
        </h3>
        <p className="ft-2">
          Tener un software a medida te va a ahorrar tiempo y mejorar tus procesos internos para
          que no se tarden toda una semana generando un reporte que puede estar listo en 2 clics.
        </p>
        <div>
          <Link href="#contact">
            <a
              onClick={() => setLastClick('benefits')}
              className="button mb-4 mx-auto"
            >3 buenas razones ¿no? Da clic</a>
          </Link>
          <p className="-ft-2 !mt-2 text-center">Agenda una asesoría de software</p>
        </div>
      </section>

      <Blockbuster
        overhead="Por qué AS Sistemas"
        title="Más que una agencia de software: somos especialistas en gestión de procesos empresariales"
        image={i02}
      />
      <section className="reading-container my-16">
        <p className="ft-2">
          Ahora sí, qué vamos a hacer por ti.
          <br/><br/>
          Es muy común que nuestros clientes tengan la duda de cómo vamos a lograr que un software resuelva su
          operación.<br/>
          Y como te decía antes, somos más que una agencia de software.<br/>
          Pues alcanzar una solución 100% a la medida requiere de 6 pasos:
          <br/><br/>
        </p>
        <ol className="!mt-0">
          <li className="ft-1 mb-4"><b>Diagnóstico</b> de necesidades de la empresa</li>
          <li className="ft-1 mb-4">Definimos la <b>ruta de entregables</b> y metas</li>
          <li className="ft-1 mb-4"><b>Desarrollamos las herramientas</b> tecnológicas de tu sistema</li>
          <li className="ft-1 mb-4"><b>Implementamos</b> el sistema y lo echamos a volar</li>
          <li className="ft-1 mb-4"><b>Capacitamos a tu equipo</b> para que lo usen como si ellos lo hubieran creado
          </li>
          <li className="ft-1 mb-4">Te vamos a dar <b>soporte técnico</b> por si a alguien se le olvida como
            funcionaba algo
          </li>
        </ol>
        <p className="ft-2">
          Contamos con un equipo con más de 10 años de experiencia en desarrollo de software para asegurar que todo
          funcione como esperas.
        </p>
        <div>
          <Link href="#contact">
            <a
              onClick={() => setLastClick('deliverables')}
              className="button mb-4 mx-auto"
            >¿Qué más necesitas saber? Da clic</a>
          </Link>
          <p className="-ft-2 !mt-2 text-center">Agenda una asesoría de software</p>
        </div>
      </section>

      <Blockbuster
        overhead="Nuestro Target"
        title={`¿Ya estás buscando librarte de la excelitis?<br/> Entonces sí hacemos match`}
        image={i03}
      />
      <section className="reading-container my-16">
        <p className="ft-2">
          Lo más seguro es que hayas llegado aquí porque estás buscando dar el siguiente paso en la operación de tu
          empresa.
          <br/><br/>
          Y que ya no soportas que le enviaste un archivo a la de compras y lo editó,<br/><br/>
          otra copia que le enviaste al de RH y la editó,<br/><br/>
          otra que tenías como "Reporte_de_Cobranza-Final-Final-EL_BUENO-V2"
          <br/><br/>
          Ok tal vez estoy exagerando... ¿o no?
          <br/><br/>
          Desde ahorita es importante saber que esta es una inversión y
          <b>un software</b> en AS Sistemas va <b>desde los $70,000 mxn</b>, según las
          necesidades de tu empresa.
          <br/><br/>
          Además, quédate tranquilo de que no te
          vamos a vender algo que no necesitas, ni te vamos a poner cargos
          extras.
        </p>
        <div>
          <Link href="#contact">
            <a
              onClick={() => setLastClick('target')}
              className="button mb-4 mx-auto"
            >Líbrate del excel. Da clic</a>
          </Link>
          <p className="-ft-2 !mt-2 text-center">Agenda una asesoría de software</p>
        </div>
      </section>

      <Blockbuster
        overhead="Preguntas frecuentes"
        title="Si tienes dudas, probablemente estén aquí"
        image={i05}
      />
      <Faqs />

      <section
        className="bg-brand-1 w-full"
        id="contact"
      >
        <div className="reading-container !py-20">
          <h2 className="text-white">
            Obtén una asesoría gratuita para diagnosticar tu proyecto de software
          </h2>
          <p className="text-white">
            Ya llegaste hasta acá, ya le dedicaste al menos 5 minutos de tu
            valioso tiempo a leer esta historia.
          </p>
          <p className="text-white">
            Regálanos unos datos y agenda una cita para analizar tu proyecto.
          </p>
          <OptInForm
            lastClick={lastClick}
          />
        </div>
      </section>
    </>
  );
}
