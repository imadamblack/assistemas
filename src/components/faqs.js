import { useState } from 'react';

export default function Faqs() {
  const [faqOpen, setFaqOpen] = useState(1);
  const faqsData = [
    {
      i: 1,
      q: '¿Qué tan personalizado puede ser el software?',
      a: 'Totalmente personalizable según las necesidades que tengas en tu empresa.'
    },
    {
      i: 2,
      q: '¿Cómo garantizan la seguridad de mis datos?',
      a: 'Utilizamos las últimas medidas de seguridad y cifrado para asegurarte que no nos quedamos con nada de tus datos.'
    },
    {
      i: 3,
      q: '¿Cuánto tiempo lleva implementar el software?',
      a: 'El tiempo de implementación es a partir de 1 mes, dependiendo de la necesidad de tu empresa.'
    },
    {
      i: 4,
      q: '¿Qué pasa si necesito nuevas herramientas en mi software?',
      a: 'El software lo desarrollamos para que sea 100% escalable, podemos agregar nuevos módulos, nuevas opciones y nuevas herramientas conforme las vayas necesitando.'
    },
    {
      i: 5,
      q: '¿Cómo manejan los problemas técnicos?',
      a: 'Contamos con un equipo dedicado para resolver cualquier problema rápidamente.'
    }
  ]

  return (
    <section className='bg-gray-100 py-20'>
      <div className='container'>
        <div className='w-full shadow-sm mb-2'>
          <p
            id={1}
            className='w-full p-4 bg-white mb-0 cursor-pointer rounded-lg border border-gray-200'
            onClick={(e) => setFaqOpen(e.target.id)}
          >
            <span className='font-bold mr-4 text-brand-1'>›</span>¿Qué tan personalizado puede ser el software?</p>
          <p className={`${faqOpen == 1 ? 'flex' : 'hidden'} bg-gray-200 p-20`}>
            Totalmente personalizable según las necesidades que tengas en tu empresa.
          </p>
        </div>
        <div className='w-full shadow-sm mb-2'>
          <p
            id={2}
            className='w-full p-4 bg-white mb-0 cursor-pointer rounded-lg border border-gray-200'
            onClick={(e) => setFaqOpen(e.target.id)}
          >
            <span className='font-bold mr-4 text-brand-1'>›</span>¿Cómo garantizan la seguridad de mis datos?</p>
          <p className={`${faqOpen == 2 ? 'flex' : 'hidden'} bg-gray-200 p-20`}>
            Utilizamos las últimas medidas de seguridad y cifrado para asegurarte que no nos quedamos con nada de tus datos.
          </p>
        </div>
        <div className='w-full shadow-sm mb-2'>
          <p
            id={3}
            className='w-full p-4 bg-white mb-0 cursor-pointer rounded-lg border border-gray-200'
            onClick={(e) => setFaqOpen(e.target.id)}
          >
            <span className='font-bold mr-4 text-brand-1'>›</span>¿Cuánto tiempo lleva implementar el software?</p>
          <p className={`${faqOpen == 3 ? 'flex' : 'hidden'} bg-gray-200 p-20`}>
            El tiempo de implementación es a partir de 1 mes, dependiendo de la necesidad de tu empresa.
          </p>
        </div>
        <div className='w-full shadow-sm mb-2'>
          <p
            id={4}
            className='w-full p-4 bg-white mb-0 cursor-pointer rounded-lg border border-gray-200'
            onClick={(e) => setFaqOpen(e.target.id)}
          >
            <span className='font-bold mr-4 text-brand-1'>›</span>¿Qué pasa si necesito nuevas herramientas en mi software?</p>
          <p className={`${faqOpen == 4 ? 'flex' : 'hidden'} bg-gray-200 p-20`}>
            El software lo desarrollamos para que sea 100% escalable, podemos agregar nuevos módulos, nuevas opciones y nuevas herramientas conforme las vayas necesitando.
          </p>
        </div>
        <div className='w-full shadow-sm mb-2'>
          <p
            id={5}
            className='w-full p-4 bg-white mb-0 cursor-pointer rounded-lg border border-gray-200'
            onClick={(e) => setFaqOpen(e.target.id)}
          >
            <span className='font-bold mr-4 text-brand-1'>›</span>¿Cómo manejan los problemas técnicos?</p>
          <p className={`${faqOpen == 5 ? 'flex' : 'hidden'} bg-gray-200 p-20`}>
            Contamos con un equipo dedicado para resolver cualquier problema rápidamente.
          </p>
        </div>
      </div>
    </section>
  )
}