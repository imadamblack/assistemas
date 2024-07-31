'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Radio, Checkbox } from '../components/form/formAtoms';
import { useRouter } from 'next/router';
import { setCookie, getCookie } from 'cookies-next';
import { info } from '../../info';
import fbEvent from '../services/fbEvents';

const formSteps = [
  {
    name: 'tools',
    title: `Ok, prometo hacer esto lo más rápido y sencillo posible, <br/>son solo 6 preguntas.`,
    description: 'Selecciona una o varias herramientas que utilizas actualmente en tu operación diaria.',
    type: 'checkbox',
    options: [
      {value: 'excel', label: 'Excel'},
      {value: 'crm', label: 'CRM'},
      {value: 'erp', label: 'ERP'},
      {value: 'cobranza', label: 'Cobranza'},
      {value: 'tpv', label: 'Terminal Punto de Venta'},
      {value: 'other', label: 'Otro'},
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
      {value: 'realEstate', label: 'Real Estate'},
      {value: 'education', label: 'Educación'},
      {value: 'sales', label: 'Ventas/Retail'},
      {value: 'security', label: 'Seguridad'},
      {value: 'industrial', label: 'Industrial'},
      {value: 'restaurant', label: 'Restaurant'},
      {value: 'other', label: 'Otro'},
    ],
    cols: 3,
  },
  {
    name: 'companySize',
    title: '¿Cuántos colaboradores trabajan en tu empresa?',
    description: 'Selecciona una opción por favor',
    type: 'radio',
    options: [
      {value: '0-10', label: 'Menos de 10'},
      {value: '10-50', label: '10 a 50'},
      {value: '50+', label: 'Más de 50'},
    ],
    cols: 1,
  },
  {
    name: 'notes',
    title: `Cuéntanos sobre tu negocio y qué problemas de tu operación estás buscando optimizar`,
    type: 'textarea',
    inputOptions: {required: true},
    placeholder: 'Pon aquí todo con lujo de detalle',
    cols: 4,
  },
  // {
  //   name: 'budget',
  //   title: '¿En qué rango de presupuesto estarías cómodo para solucionar tus broncas operativas?',
  //   description: 'Es solo un estimado, haremos algo a medida',
  //   type: 'radio',
  //   inputOptions: {required: 'Selecciona una opción'},
  //   options: [
  //     {value: '70000-100000', label: '$70,000 a $100,000 mxn'},
  //     {value: '100000-150000', label: '$100,000 a $150,000 mxn'},
  //     {value: '150000+', label: 'Más de $150,000 mxn'},
  //   ],
  //   cols: 1,
  // },
  {
    name: 'urgency',
    title: '¿Qué tan urgente es que implementes un software?',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'high', label: 'Muy urgente'},
      {value: 'mid', label: 'Puede esperar un par de meses'},
      {value: 'low', label: 'Nada urgente'},
    ],
  },
  {
    name: 'commitment',
    title: '¿Prometes atender a la sesión que estás a punto de agendar?',
    description: 'Es que no nos gusta que nos dejen plantados',
    type: 'radio',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'no', label: 'No estoy seguro'},
      {value: 'remind', label: 'Recuérdenme por favor'},
      {value: 'yes', label: 'Si, atento!'},
    ],
    cols: 3,
  },
];

export default function Survey() {
  const [formStep, setFormStep] = useState(0);
  const [inputError, setInputError] = useState(null);
  const [sending, setSending] = useState(false);
  const methods = useForm({mode: 'all'});
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors},
    watch
  } = methods;

  const router = useRouter();

  useEffect(() => {
    formSteps.map((fs) => setError(fs.name, {}));
  }, [setError]);

  const handleNext = () => {
    const formStepName = formSteps[formStep].name;
    if (errors[formStepName]) {
      setInputError(formStep);
      return;
    }
    setInputError(null);
    window.scrollTo(0, 0);
    return formStep < formSteps.length - 1 && setFormStep(formStep + 1);
  };

  const onSubmit = (data) => {
    setSending(true);
    const lead = getCookie('lead');
    const {id, email, phone, company, fullName} = JSON.parse(lead);
    const _fbc = getCookie('_fbc');
    const _fbp = getCookie('_fbp');
    const payload = {...data, id, fullName, email, phone, _fbc, _fbp};

    const crmParams = {
      obt_nombre: fullName,
      obt_email: email,
      obt_telefono: phone,
      obt_empresa: company,
      obt_tools: data.tools.join(', '),
      obt_businessVertical: data.businessVertical,
      obt_companySize: data.companySize,
      obt_notes: data.notes,
      obt_budget: data.budget,
      obt_urgency: data.urgency,
    };

    console.log(crmParams);

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
      // POST to Customer CRM
      .then(() => fetch(`${info.crmWebhook}?${new URLSearchParams(crmParams)}`, {
          method: 'GET', // due to Customer CRM Config we're sending as GET method
        }).then((result) => result.text())
          .then((r) => console.log(r))
          .catch((e) => console.error('FETCH', e)),
      )
      // Redirect to Thank you page and Scheduler
      .then(() => {
        console.log('url params', new URLSearchParams(crmParams).toString());
        if (info.surveyRedirect !== '') {
          const forwardLink = document.createElement('a');
          forwardLink.href = info.surveyRedirect + `?name=${fullName}&email=${email}&phone${phone}`;
          forwardLink.target = '_blank';
          forwardLink.click();
        }

        router.push(`/thankyou`);
      });
  };

  return (
    <div className="relative flex flex-grow bg-black pointer-events-none">
      <div className="container !p-0 flex flex-col flex-grow items-center pointer-events-auto touch-auto">
        <div className="survey-card">
          <div className="w-full absolute left-0 top-0 bg-gray-100">
            <div className={`h-4 bg-brand-1`} style={{width: `${((formStep + 1) / formSteps.length) * 100}%`}}/>
          </div>
          <p className="-ft-1">{formStep + 1}/{formSteps.length}</p>
          <FormProvider {...methods}>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              {formSteps.map((fs, idx) => {
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
                  type={formStep < formStep.length - 1 ? 'button' : 'submit'}
                  disabled={sending}
                  onClick={() => handleNext()}
                  className="mt-auto"
                >
                  {sending && <span className="animate-spin mr-4">+</span>}
                  {formStep === formSteps.length - 1 ? 'Agendar cita' : sending ? 'Abriendo Calendario' : 'Siguiente'}
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
  const {req, res, query: {id}} = ctx;
  const lead = getCookie('lead', {req, res});

  if (!lead || lead === 'null' || Object.keys(lead).length === 0) {
    if (!id) {
      return {
        redirect: {
          permanent: false,
          destination: '/#contact',
        },
      };
    } else {
      setCookie('lead', {...lead, id}, {req, res});
      return {props: {}};
    }
  }

  return {props: {}}
}
