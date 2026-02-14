'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Radio, Checkbox } from '../components/form/formAtoms';
import { useRouter } from 'next/router';
import { setCookie, getCookie } from 'cookies-next';
import { info } from '../../info';
import fbEvent from '../services/fbEvents';

const formSteps = (country = 'MX') => ([
  {
    name: 'tools',
    title: `Ok, prometo hacer esto lo más rápido y sencillo posible, <br/>son solo 8 preguntas.`,
    description: 'Selecciona una o varias herramientas que utilizas actualmente en tu operación diaria.',
    type: 'checkbox',
    options: [
      {value: 'excel', label: 'Excel'},
      {value: 'crm', label: 'CRM'},
      {value: 'erp', label: 'ERP'},
      {value: 'cobranza', label: 'Cobranza'},
      {value: 'tpv', label: 'Terminal Punto de Venta'},
      {value: 'otherTools', label: 'Otro'},
    ],
    cols: 2,
  },
  {
    name: 'businessVertical',
    title: '¿En qué industria encaja mejor tu empresa?',
    description: 'Selecciona una por favor',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'logistica', label: 'Logística'},
      {value: 'industrial', label: 'Industrial / Manufactura'},
      {value: 'agricola', label: 'Agrícola'},
      {value: 'education', label: 'Educación'},
      {value: 'realEstate', label: 'Real Estate'},
      {value: 'salud', label: 'Salud o Cuidado Personal'},
      {value: 'security', label: 'Seguridad'},
      {value: 'sales', label: 'Ventas/Retail'},
      {value: 'other', label: 'Otro'},
    ],
    cols: 3,
  },
  {
    name: 'notes',
    title: `Cuéntanos sobre tu negocio y qué problemas de tu operación estás buscando optimizar`,
    type: 'textarea',
    inputOptions: {required: true},
    placeholder: 'Pon aquí todo con lujo de detalle',
    cols: 4,
  },
  {
    name: 'companySize',
    title: '¿Cuántos colaboradores trabajan en tu empresa?',
    description: 'Selecciona una opción por favor',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: '0-10', label: 'Menos de 10'},
      {value: '10-50', label: '10 a 50'},
      {value: '50+', label: 'Más de 50'},
    ],
    cols: 1,
  },
  {
    name: 'currentSales',
    title: '¿Cuánto vendes al mes, aproximadamente?',
    description: 'Esto nos ayuda a medir el potencial de tu sistematización.',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: '<$100,000', label: 'Menos de $100,000 mxn'},
      {value: '$100,000-$200,000', label: '$100,000 a $200,000 mxn'},
      {value: '$200,000-$500,000', label: '$200,000 a $500,000 mxn'},
      {value: '$500,000+', label: 'Más de $500,000 mxn'},
    ],
    cols: 1,
  },
  {
    name: 'budget',
    title: '¿Cuánto esperarías ahorrar al mes una vez que sistematices la operación de tu empresa?',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'no-sabe', label: 'No tengo idea'},
      {value: '<$50,000', label: 'Unos $50,000'},
      {value: '$50,000-$100,000', label: 'Entre $50,000 y $100,000'},
      {value: '>$100,000', label: 'Más de $100,000'},
    ],
    cols: 1,
  },
  {
    name: 'urgency',
    title: 'Si tu proyecto es aceptado, ¿cuándo tienes pensado comenzar?',
    description: '...para irnos programando',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'noDate', label: 'No tengo idea'},
      {value: '3months', label: 'Máximo en 3 meses'},
      {value: '1month', label: 'En 1 mes'},
      {value: 'instantly', label: 'De inmediato'},
    ],
  },
  {
    name: 'commitment',
    title: '¿Listo para programar una sesión de diagnóstico con nuestro equipo?',
    description: '<br/>Si únicamente buscas conocer un precio rápido o una opción genérica, una sesión de diagnóstico probablemente no sea lo que necesitas en este momento.<br/><br/>Como referencia, nuestros proyectos se diseñan a medida, inician a partir de $150,000 MXN y pueden escalar conforme al valor que generan.<br/><br/>Listo para programar tu sesión?',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'no', label: 'No estoy seguro'},
      {value: 'yes', label: 'Si, seguro!'},
    ],
    cols: 2,
  },
]);

export default function Survey({lead = {}}) {
  const [formStep, setFormStep] = useState(0);
  const [inputError, setInputError] = useState(null);
  const [sending, setSending] = useState(false);
  const [partSending, setPartSending] = useState(false);
  const {id, email, phone, company, fullName} = lead;
  const _fbc = getCookie('_fbc');
  const _fbp = getCookie('_fbp');
  const methods = useForm({mode: 'all'});
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors},
    getValues,
    watch
  } = methods;

  const router = useRouter();

  const crmParams = (data) => ({
    obt_nombre: fullName,
    obt_email: email,
    obt_telefono: phone,
    obt_empresa: company,
    obt_tools: data.tools.join(', '),
    obt_businessVertical: data.businessVertical,
    obt_notes: data.notes,
    obt_companySize: data.companySize,
    obt_currentSales: data.currentSales,
    obt_budget: data.budget,
    obt_urgency: data.urgency,
    obt_commitment: data.commitment,
    obt_fbc: _fbc,
    obt_fbp: _fbp,
  });

  useEffect(() => {
    formSteps(lead.country).map((fs) => setError(fs.name, {}));
  }, [setError]);

  const handlePartialSubmit = async () => {
    try {
      setPartSending(true);
      const dataSoFar = getValues();
      const crmPayload = crmParams(dataSoFar)
      const payload = {
        ...dataSoFar,
        id,
        fullName,
        email,
        phone,
        _fbc,
        _fbp,
      };

      await fetch(info.partialSurveyWebhook, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {'Content-Type': 'application/json'},
      });

      await fetch(`${info.crmWebhook}?${new URLSearchParams(crmPayload)}`, {
        method: 'GET',
      })

      setPartSending(false);

    } catch (e) {
      console.error('Partial submit failed', e);
    }
  };

  const onSubmit = (data) => {
    setSending(true);
    const payload = {...data, id, fullName, email, phone, _fbc, _fbp};
    const elegible = data.commitment === 'yes';

    fetch(info.surveyWebhook, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response)
      .then(() => fbEvent(
        'Lead',
        {email, phone, externalID: id},
      ))
      // POST to AS Sistemas CRM
      .then(() => fetch(`${info.crmWebhook}?${new URLSearchParams(crmParams(payload))}`, {
          method: 'GET',
        }).then((result) => result.text())
          .then((r) => console.log(r))
          .catch((e) => console.error('FETCH', e)),
      )
      // Redirect to Thank you page and Scheduler
      .then(() => {
        if (elegible) {
          if (info.surveyRedirect !== '') {
            const forwardLink = document.createElement('a');
            forwardLink.href = info.surveyRedirect + `?name=${fullName}&email=${email}&phone${phone}`;
            forwardLink.target = '_blank';
            forwardLink.click();
          }

          router.push(`/thankyou`);
        } else {
          router.push(`/not-elegible`)
        }
      });
  };

  const handleNext = async () => {
    const currentStep = formSteps(lead.country)[formStep];
    const formStepName = currentStep.name;

    const valid = await methods.trigger(formStepName);

    if (!valid) {
      setInputError(formStep);
      return;
    }

    setInputError(null);
    window.scrollTo(0, 0);

    if (formStep < formSteps(lead.country).length - 1) {
      await handlePartialSubmit();
      setFormStep(formStep + 1);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="relative flex flex-grow bg-black pointer-events-none">
      <div className="container !p-0 flex flex-col flex-grow items-center pointer-events-auto touch-auto">
        <div className="survey-card">
          <div className="w-full absolute left-0 top-0 bg-gray-100">
            <div className={`h-4 bg-brand-1`} style={{width: `${((formStep + 1) / formSteps(lead.country).length) * 100}%`}}/>
          </div>
          <p className="-ft-1">{formStep + 1}/{formSteps(lead.country).length}</p>
          <FormProvider {...methods}>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              {formSteps(lead.country).map((fs, idx) => {
                if (fs.type === 'text') {
                  const {name, title, description, placeholder, inputOptions} = fs;
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className={`my-20 flex-grow ${formStep === idx ? 'block' : 'hidden'}`}>
                      <p className="ft-3 sans" dangerouslySetInnerHTML={{__html: title}}/>
                      <p className="mb-12" dangerouslySetInnerHTML={{__html: description}}/>
                      <input
                        {...register(name, inputOptions)}
                        placeholder={placeholder}
                        className={inputError === idx ? '!border-brand-2 mt-12' : 'mt-12'}
                      />
                    </div>
                  );
                }

                if (fs.type === 'radio') {
                  const {name, title, description, placeholder, inputOptions, options, cols} = fs;
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className={`my-20 ${formStep === idx ? 'flex flex-col' : 'hidden'}`}>
                      <p className="ft-3 sans" dangerouslySetInnerHTML={{__html: title}}/>
                      <p className="mb-12" dangerouslySetInnerHTML={{__html: description}}/>
                      <Radio
                        name={name}
                        inputOptions={inputOptions}
                        placeholder={placeholder}
                        options={options}
                        optCols={cols}
                        className={inputError === idx ? '!border-brand-2' : undefined}
                      />
                    </div>
                  );
                }
                if (fs.type === 'checkbox') {
                  const {name, title, description, placeholder, inputOptions, options, cols} = fs;
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className={`my-20 ${formStep === idx ? 'flex flex-col' : 'hidden'}`}>
                      <p className="ft-3 sans" dangerouslySetInnerHTML={{__html: title}}/>
                      <p className="mb-12" dangerouslySetInnerHTML={{__html: description}}/>
                      <Checkbox
                        name={name}
                        inputOptions={inputOptions}
                        placeholder={placeholder}
                        options={options}
                        optCols={cols}
                        className={inputError === idx ? '!border-brand-2' : undefined}
                      />
                    </div>
                  );
                }
                if (fs.type === 'textarea') {
                  const {name, title, description, placeholder, inputOptions, cols} = fs;
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className={`my-20 ${formStep === idx ? 'block' : 'hidden'}`}>
                      <p className="ft-3 sans" dangerouslySetInnerHTML={{__html: title}}/>
                      <p className="mb-12" dangerouslySetInnerHTML={{__html: description}}/>
                      <textarea
                        {...register(name, inputOptions)}
                        placeholder={placeholder}
                        rows={cols}
                        className={inputError === idx ? '!border-brand-2 mt-12' : 'mt-12'}
                      />
                    </div>
                  );
                }
              })}

              <div className="flex justify-between w-full mt-auto">
                <button
                  type="button"
                  onClick={() => setFormStep(formStep - 1)}
                  className="!bg-transparent !text-brand-3 border-none hover:text-brand-1 disabled:!text-gray-100"
                  disabled={formStep <= 0}
                >Atrás
                </button>
                <button
                  type="button"
                  disabled={sending}
                  onClick={() => handleNext()}
                  className="mt-auto"
                >
                  {sending && <span className="animate-spin mr-4">+</span>}
                  {formStep === formSteps(lead.country).length - 1 ? 'Agendar cita' : sending ? 'Abriendo Calendario' : 'Siguiente'}
                  {partSending && <span className="animate-spin ml-4 !my-0">+</span>}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { req, res, query } = ctx;
  const id = query?.id;

  const leadCookie = getCookie('lead', { req, res });

  const parsedLead =
    leadCookie && leadCookie !== 'null'
      ? (typeof leadCookie === 'string' ? JSON.parse(leadCookie) : leadCookie)
      : null;

  const isEmptyLead =
    !parsedLead || (typeof parsedLead === 'object' && Object.keys(parsedLead).length === 0);

  if (isEmptyLead) {
    if (!id) {
      return {
        redirect: { permanent: false, destination: '/#contact' },
      };
    }

    const newLead = { id };
    setCookie('lead', JSON.stringify(newLead), { req, res });

    return { props: { lead: newLead } };
  }

  return { props: { lead: parsedLead } };
}