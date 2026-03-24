import Link from 'next/link';
import { info } from '../../../info';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';
import { useState } from 'react';
import { restrictNumber, emailRegExp, cleanPhone } from '../../utils/formValidators';
import fbEvent from '../../services/fbEvents';
import { Select } from './formAtoms';

export default function OptInForm({lastClick = ''}) {
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const methods = useForm({mode: 'all'});
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = methods;

  const onSubmit = (data) => {
    setSending(true);
    data.phone = data.country === "MX" ? "52" + cleanPhone(data.phone) : data.country === "CO" ? "57" + cleanPhone(data.phone) : "1" + cleanPhone(data.phone);
    data.origin = 'Notoriovs Landing';
    data.lastClick = lastClick;

    const _fbc = getCookie('_fbc');
    const _fbp = getCookie('_fbp');
    const leadUtm = getCookie('utm');
    const utm = JSON.parse(leadUtm);
    const payload = {...data,...utm, _fbc, _fbp};

    let crmParams = {};
    Object.keys(data).map((key) => {
      const k = `obt_${key}`;
      crmParams[k] = data[key]
    });

    // POST to Make.com Webhook
    fetch(info.optInWebhook, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((result) => result.json())
      // Send FB Event
      .then(({id}) => {
        fbEvent(
          'Lead',
          {email: data.email, phone: data.phone, externalID: id},
        );
        setCookie('lead', {...data, id});
        return id;
      })
      // POST to Customer CRM
      .then((id) => {
          fetch(`${info.crmWebhook}?${new URLSearchParams(crmParams)}`, {
            method: 'GET', // due to Customer CRM Config we're sending as GET method
          }).then((result) => result.text())
            .then((r) => console.log(r))
            .catch((e) => console.error('FETCH', e));
          return id;
        }
      )
      // Redirect to Survey Page
      .then((id) => {
        const forwardLink = document.createElement('a');
        forwardLink.href = info.surveyRedirect + `?name=${data.fullName}&email=${data.email}&phone${data.phone}`;
        forwardLink.target = '_blank';
        forwardLink.click();

        router.push(`/thankyou`);
      });
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register(
            'fullName',
            {
              required: true,
            },
          )}
          className={errors.fullName && '!bg-red-200'}
          placeholder="Tu nombre"/>
        <input
          {...register(
            'email',
            {
              required: true,
              pattern: {
                value: emailRegExp,
                message: 'Revisa tu correo',
              },
            },
          )}
          className={errors.email && '!bg-red-200'}
          placeholder="Un email activo"/>
        <div className="grid grid-cols-3 gap-4">
          <Select
            name="country"
            inputOptions={{required: true}}
            options={[
              {value: 'MX', name: '🇲🇽 MX'},
              {value: 'US', name: '🇺🇸 US'},
              {value: 'CO', name: '🇨🇴 CO'},
            ]}
            placeholder={false}
          />
          <input
            {...register(
              'phone',
              {required: true, maxLength: 10, minLength: 10},
            )}
            className={`col-span-2 ${errors.phone && '!bg-red-200'}`}
            onKeyDown={restrictNumber}
            placeholder="Teléfono de WhatsApp (10 dígitos)"/>
        </div>
        <input
          {...register(
            'company',
            {required: true},
          )}
          className={errors.company && '!bg-red-200'}
          placeholder="Tu empresa"/>

        <Select
          name="businessVertical"
          inputOptions={{required: true}}
          options={[
            {value: 'logistica', name: 'Logística'},
            {value: 'industrial', name: 'Industrial / Manufactura'},
            {value: 'agricola', name: 'Agrícola'},
            {value: 'education', name: 'Educación'},
            {value: 'realEstate', name: 'Real Estate'},
            {value: 'salud', name: 'Salud o Cuidado Personal'},
            {value: 'security', name: 'Seguridad'},
            {value: 'sales', name: 'Ventas/Retail'},
            {value: 'other', name: 'Otro'},
          ]}
          placeholder="En qué industria encaja tu empresa?"
          className={errors.businessVertical && '!bg-red-200'}
        />

        <textarea
          {...register(
            'notes',
            {required: true},
          )}
          placeholder="Cuéntanos un poco más acerca de tu proyecto/idea?"
          className={errors.notes && '!bg-red-200'}
        />

        <Select
          name="urgency"
          inputOptions={{required: true}}
          options={[
            {value: 'puntual', name: 'Tengo una necesidad puntual'},
            {value: 'project', name: 'Tengo un proyecto en mente y necesito equipo'},
            {value: 'idea', name: 'Solo tengo una idea para darle forma'},
          ]}
          placeholder="Cómo te identificas?"
          className={errors.urgency && '!bg-red-200'}
        />
        <span className="ft-0 text-neutral-300">Los proyectos de software pueden comenzar a partir de 7.000 USD a 20.000 USD en el mercado. ¿Su empresa cuenta con las posibilidad de invertir el total o cuotas por el mismo?</span>
        <Select
          name="commitment"
          inputOptions={{required: true}}
          options={[
            {value: 'yes', name: 'Sí puedo invertir esos montos'},
            {value: 'payments', name: 'Puedo abonar cuotas'},
            {value: 'no', name: 'No estoy en condiciones'},
          ]}
          placeholder="Selecciona"
          className={errors.commitment && '!bg-red-200'}
        />

        <Select
          name="decision"
          inputOptions={{required: true}}
          options={[
            {value: 'decisionMaker', name: 'Sí, soy quien toma la decisión'},
            {value: 'participant', name: 'Participo en la decisión'},
            {value: 'other', name: 'Solo estoy investigando opciones'},
          ]}
          placeholder="Tú tomas la decisión de esta implementación?"
          className={errors.decission && '!bg-red-200'}
        />

        <button
          disabled={sending}
          className={`w-full ${sending ? '!bg-transparent' : 'hover:!bg-brand-3'}`}
        >{
          !sending
            ? 'Comenzar →'
            : <span className="material-symbols-outlined animate-spin">progress_activity</span>
        }</button>

        <div className="mt-4">
          <p className="-ft-3 text-center text-white">Al dar clic aceptas nuestra&nbsp;
            <Link href={info.privacyNotice}>política de privacidad</Link>
          </p>
        </div>
      </form>
    </FormProvider>
  );
}