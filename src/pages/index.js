import Blockbuster from '../components/blockbuster';
import OptInForm from '../components/form/opt-in-form';
import { useEffect, useState } from 'react';
import scrollDepth from '../utils/scrollDepth';
import Faqs from '../components/faqs';
import Link from 'next/link';

import i01 from '../../public/assets/imagenes/01.jpg';
import i02 from '../../public/assets/imagenes/02.jpg';
import i03 from '../../public/assets/imagenes/03.jpg';
import i05 from '../../public/assets/imagenes/05.jpg';
import t01 from '../../public/assets/imagenes/testimonio01.jpg';
import t02 from '../../public/assets/imagenes/testimonio02.jpg';
import t03 from '../../public/assets/imagenes/testimonio03.jpg';
import Image from 'next/image';
import Script from 'next/script';

export default function Home({_fbp, _fbc}) {
  const [lastClick, setLastClick] = useState('');

  console.log(_fbc, _fbp);

  const calendlyMetadata = {utm_content: _fbc ?? '', utm_term: _fbp ?? ''}
  const params = new URLSearchParams(calendlyMetadata)
  const calendlyURL = `https://calendly.com/llamada-gratuita/30min?hide_event_type_details=1&hide_gdpr_banner=1&${params.toString()}`

  console.log(calendlyURL);

  useEffect(() => {
    scrollDepth({
      values: [25, 50, 75, 100],
      callback: (value) => fbq('trackCustom', `Scroll Depth: ${value}`),
    });
  });

  return (
    <>
      <section
        className="relative min-h-[64rem] w-full flex flex-col justify-center items-center">
        <div className="w-full lg:w-1/2 text-center z-10 p-8">
          <div className="ft-0 font-semibold tracking-wide bg-brand-2 px-8 py-2 rounded-full mx-auto mb-8 text-white">
            Software de gestión para empresas de logística y manufactura
          </div>
          <h1
            className="relative font-semibold ft-8 text-brand-1 my-16">
            Tu operación merece un sistema hecho exactamente para tu tamaño, tu industria y tu presupuesto
          </h1>
          <p
            className="relative font-medium ft-4 text-brand-1">
            Si tu empresa depende de excel, procesos que se repiten en tres formatos distintos y de información que nadie sabe si está actualizada, estás perdiendo dinero.
          </p>
          <div className="flex flex-col justify-center items-center mt-12">
            <Link href="#contact">
              <a
                onClick={() => setLastClick('hero')}
                className="button mb-4 mx-auto"
              >Quiero ordenar mi operación →
              </a>
            </Link>
            <p className="-ft-2">Agenda una sesión de diagnóstico · Respuesta en menos de 24 hrs</p>
          </div>
        </div>
        <div className="absolute flex flex-col justify-center items-center text-white bottom-8 mt-8 md:mt-20 z-10">
          <p className="ft-1 text-white">Sigue leyendo</p>
          <div className="animate-bounce">
            <div className="ft-3 material-icons mx-auto">expand_more</div>
          </div>
        </div>
      </section>

      <section className="reading-container">
        <h2 className="ft-6">¿Reconoces alguno de estos problemas en tu empresa?</h2>
        <p className="ft-1">
          <span className="ft-2 font-bold">El Excel que nadie se atreve a tocar</span><br/>
          Si un empleado borra una celda por accidente, ese registro desaparece sin dejar rastro. <br/>
          No hay historial. No hay forma de recuperarlo. <br/>
          Y lo más preocupante: no sabes cuántas veces ya pasó sin que nadie lo reportara.
        </p>
        <p className="ft-1">
          <span className="ft-2 font-bold">Tomas decisiones con información que puede estar desactualizada</span><br/>
          ¿Cuánto inventario tienes disponible en este momento?<br/>
          ¿Cuánto costó realmente el último lote de producción?<br/>
          ¿Qué órdenes de tu cliente están pendientes de facturar?<br/>
          Si la respuesta requiere abrir un archivo, llamar a alguien o esperar a fin de mes, tu empresa está
          funcionando a ciegas.
        </p>
        <p className="ft-1">
          <span className="ft-2 font-bold">El mismo dato se captura dos, tres veces en formatos distintos</span><br/>
          Primero en el formato físico o el chat de WhatsApp.<br/>
          Luego en el Excel de operación.<br/>
          Luego en el Excel de costos, nómina o facturación.<br/>
          Cada traspaso es un punto de falla.<br/>
          Cada persona que toca ese dato es una oportunidad de que el número cambie.<br/>
          Y cuando los números no cuadran al final del mes, nadie sabe en qué paso se perdió la información.
        </p>
        <p className="ft-1">
          <span
            className="ft-2 font-bold">Llegaste a fin de mes (o de año) y encontraste dinero que nunca cobraste</span><br/>
          Una factura olvidada.<br/>
          Una orden que se entregó pero nunca se facturó.<br/>
          Un cobro que "ya mero" se hacía pero quedó perdido en el ruido del día a día.<br/>
          No es negligencia, es el resultado natural de operar con información dispersa en múltiples archivos que nadie
          tiene tiempo de auditar.<br/>
          El dinero estaba ahí.<br/>
          Se fue por desorden, no por falta de clientes.
        </p>
        <p className="ft-1">
          <span className="ft-2 font-bold">Ya intentaste resolverlo y te quedaron mal</span><br/>
          Un ERP de seis cifras al año con módulos que tu empresa de 40 empleados nunca va a usar.<br/>
          Un desarrollador que prometió tres meses, entregó el 85% y desapareció.<br/>
          Un sistema genérico que no entiende cómo funciona tu industria.<br/>
          No es que no hayas intentado.<br/>
          Es que el mercado no tiene una opción diseñada para empresas de tu tamaño.<br/>
          Hasta ahora.
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

      <section className="container py-40">
        <div className="max-w-[100rem] mx-auto">
          <p className="ft-6 font-bold text-center">El problema no eres tú.<br/> El problema es que los softwares del mercado fueron diseñados para empresas de 500 empleados y te los cobran como si tu empresa también lo fuera.</p>
        </div>
      </section>

      <section className="my-16">
        <div className="container grid lg:grid-cols-3 gap-8">
          <div className="relative flex flex-col bg-brand-1 rounded-2xl pt-16 p-12">
            <p className="!text-9xl absolute -top-12 left-4 text-brand-2 material-icons">format_quote</p>
            <p className="ft-2 text-white flex-grow">
              Con AS Sistemas, el antes y el después es muy notorio… Estábamos en oscuridad y hoy tenemos visibilidad,
              trazabilidad, luz.
            </p>
            <hr className="my-16"/>
            <div className="flex justify-between">
              <div className="relative w-[8rem] h-[8rem] rounded-full overflow-hidden">
                <Image src={t01} layout="fill" objectFit="cover"/>
              </div>
              <div className="my-auto text-white">
                <p className="ft-1 text-right">Elena Sierra</p>
                <p className="-ft-1 text-right">CEO
                  Grupo SierraS</p>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col bg-brand-1 rounded-2xl pt-16 p-12">
            <p className="!text-9xl absolute -top-12 left-4 text-brand-2 material-icons">format_quote</p>
            <p className="ft-2 text-white flex-grow">
              Es una misión cumplida, estamos tranquilos y seguros de que la información se maneja con las personas
              debidas. Es un equipo muy profesional.
            </p>
            <hr className="my-16"/>
            <div className="flex justify-between">
              <div className="relative w-[8rem] h-[8rem] rounded-full overflow-hidden">
                <Image src={t02} layout="fill" objectFit="cover"/>
              </div>
              <div className="my-auto text-white">
                <p className="ft-1 text-right">Saide Noris</p>
                <p className="-ft-1 text-right">Representante Legal Tasal</p>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col bg-brand-1 rounded-2xl pt-16 p-12">
            <p className="!text-9xl absolute -top-12 left-4 text-brand-2 material-icons">format_quote</p>
            <p className="ft-2 text-white flex-grow">
              Ahora tenemos la información concentrada, disponible y bien gestionada… es muy eficiente y sí lo
              recomendaría.
            </p>
            <hr className="my-16"/>
            <div className="flex justify-between">
              <div className="relative w-[8rem] h-[8rem] rounded-full overflow-hidden">
                <Image src={t03} layout="fill" objectFit="cover"/>
              </div>
              <div className="my-auto text-white">
                <p className="ft-1 text-right">Estefani Rincón</p>
                <p className="-ft-1 text-right">Secretaría de Finanzas y Administración
                  DDHQRO</p>
              </div>
            </div>
          </div>
        </div>

        <div className="reading-container">
          <Link href="#contact">
            <a
              onClick={() => setLastClick('benefits')}
              className="button mb-4 mx-auto"
            >3 buenas razones ¿no? Da clic</a>
          </Link>
          <p className="-ft-2 !mt-2 text-center">Agenda una asesoría de software</p>
        </div>
      </section>

      <section className="reading-container my-16">
        <h2 className="ft-6">Tu flujo de trabajo completo digitalizado: desde la operación del día a día hasta el cierre administrativo del mes, en un solo lugar</h2>
        <p className="ft-2">
          A ver, ya estamos de acuerdo en parar el uso excesivo de excel.
          <br/><br/>
          Ahora, te voy a dar unas razones de por qué un software a medida:
        </p>
        <h3 className="ft-2 font-bold text-brand-3">
          Un solo registro, cero doble captura
        </h3>
        <p className="ft-2">
          Cada dato se captura una vez y fluye automáticamente a donde necesita llegar — operación, costos, nómina o facturación. Sin traspasos manuales. Sin errores de transcripción.
        </p>
        <h3 className="ft-2 font-bold text-brand-3">
          Visibilidad de tu operación en tiempo real
        </h3>
        <p className="ft-2">
          Inventario, órdenes activas, costos reales vs. estimados, cuentas por cobrar pendientes. Todo disponible en el momento que lo necesitas, no al final del mes cuando ya no puedes corregir nada.
        </p>
        <h3 className="ft-2 font-bold text-brand-3">
          Cero cobros perdidos
        </h3>
        <p className="ft-2">
          Cada entrega, cada orden, cada servicio: registrado, trazado y vinculado a su factura. Nunca más llegues a fin de año y encuentres dinero que debiste haber cobrado hace tres meses.
        </p>
        <h3 className="ft-2 font-bold text-brand-3">
          Hecho para tu industria, no para todas a la vez
        </h3>
        <p className="ft-2">
          No pagás por módulos de manufactura aeroespacial si eres una planta de inyección de plástico. No pagás por gestión de flotas globales si tienes 35 unidades en Jalisco. Solo lo que tu operación realmente necesita.
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

      <section className="reading-container my-16">
        <h2 className="ft-6">Más que una agencia de software: somos especialistas en gestión de procesos empresariales</h2>
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

      <section className="reading-container">
        <h2 className="ft-6">Si tienes dudas, probablemente estén aquí</h2>
        <Faqs/>
      </section>

      <section
        className="bg-brand-1 w-full"
        id="contact"
      >
        <div className="reading-container !py-20">
          <h2 className="text-white">
            Obtén una asesoría gratuita para diagnosticar tu proyecto de software
          </h2>
          <p className="ft-2 text-white">
            Agenda una llamada de 45 minutos. Te hacemos un diagnóstico gratuito: revisamos cómo opera tu empresa hoy, identificamos dónde estás perdiendo tiempo y dinero, y te mostramos exactamente cómo se vería tu operación digitalizada.
          </p>
          <p className="ft-2 text-white">
            Este diagnóstico es para empresas de 20 a 150 empleados en logística o manufactura que ya operan y quieren ordenar su operación.
          </p>
          <OptInForm
            lastClick={lastClick}
          />

        </div>
      </section>
    </>
  );
}


export async function getServerSideProps(ctx) {
  const { req, query } = ctx;
  const cookiesHeader = req.headers.cookie || '';

  const keys = ['utm', '_fbc', '_fbp', 'lead'];
  const cookies = {};

  for (const key of keys) {
    const raw = cookiesHeader
      .split('; ')
      .find(c => c.startsWith(`${key}=`))
      ?.split('=')[1];

    if (!raw) continue;

    try {
      const clean = raw.startsWith('j%3A') ? raw.slice(4) : raw;
      cookies[key] = JSON.parse(decodeURIComponent(clean));
    } catch {
      cookies[key] = decodeURIComponent(raw);
    }
  }

  // --- Revisar params UTM del query ---
  const utmFromQuery = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    if (query[param]) utmFromQuery[param] = query[param];
  });

  // Si hay params en la URL, se usan; si no, cae en cookie
  const utm =
    Object.keys(utmFromQuery).length > 0
      ? utmFromQuery
      : cookies.utm ?? null;

  const { lead, _fbc, _fbp } = cookies;

  return {
    props: {
      lead: {
        fullName: lead?.fullName ?? '',
        phone: lead?.phone ?? '',
        whatsapp: lead?.whatsapp ?? '',
        sheetRow: lead?.sheetRow ?? '',
      },
      utm,
      _fbp: _fbp ?? '',
      _fbc,
    },
  };
}
