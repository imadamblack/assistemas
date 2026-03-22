import { useState } from 'react';

export default function Faqs() {
  const [faqOpen, setFaqOpen] = useState(1);
  const faqs = [
    {
      q: "¿Cuánto tiempo tarda la implementación?",
      a: "Depende del alcance de tu operación, pero trabajamos con entregas por fases. Desde las primeras semanas ya tienes algo funcionando — no esperas meses para ver el primer resultado. Definimos el cronograma exacto en el diagnóstico."
    },
    {
      q: "¿Qué pasa con mis datos actuales en Excel?",
      a: "Los migramos nosotros. No tienes que hacer nada técnico ni perder tu historial. El proceso de migración está incluido en el proyecto y lo hacemos de forma gradual para que tu operación no se detenga."
    },
    {
      q: "¿Qué tan difícil es para mi equipo adaptarse?",
      a: "Tus colaboradores no cambian su flujo de trabajo hasta que estén listos. Implementamos por etapas y capacitamos a cada área antes de activar su módulo. La resistencia al cambio es el mayor riesgo en estos proyectos — por eso lo manejamos nosotros."
    },
    {
      q: "¿Cuánto cuesta?",
      a: "Depende del alcance. Lo que sí podemos decirte es que es significativamente menor a cualquier ERP del mercado — y sin los módulos que tu empresa nunca va a usar. Te damos el precio exacto después del diagnóstico, cuando entendemos qué necesitas realmente."
    },
    {
      q: "¿Y si me quedo mal como los otros proveedores?",
      a: "Es la pregunta más importante que puedes hacernos. Por eso el proceso empieza con un prototipo funcional antes de cualquier contrato. No pedimos que confíes a ciegas — pedimos 45 minutos para mostrarte por qué somos diferentes."
    }
  ];

  return (
    <div className='pb-20'>
        {faqs.map((f,i) =>
          <div className='w-full shadow-sm mb-2'>
            <p
              id={i}
              className='w-full p-4 bg-white mb-0 cursor-pointer rounded-lg border border-gray-200'
              onClick={(e) => setFaqOpen(e.target.id)}
            >
              <span className='font-bold mr-4 text-brand-1'>›</span>{f.q}</p>
            <p className={`${faqOpen == i ? 'flex' : 'hidden'} bg-gray-200 p-20`}>
              {f.a}
            </p>
          </div>
        )}
    </div>
  )
}