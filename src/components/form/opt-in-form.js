import Link from 'next/link';
import { info } from '../../../info';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';
import { useState } from 'react';
import { restrictNumber, emailRegExp, cleanPhone } from '../../utils/formValidators';
import fbEvent from '../../services/fbEvents';

export default function OptInForm({lastClick = ''}) {
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    setSending(true);
    data.phone = cleanPhone(data.phone);
    data.origin = 'Notoriovs Landing';
    data.lastClick = lastClick;

    const _fbc = getCookie('_fbc');
    const _fbp = getCookie('_fbp');
    const payload = {...data, _fbc, _fbp};

    const crmParams = {
      obt_nombre: data.fullName,
      obt_email: data.email,
      obt_telefono: data.phone,
      obt_empresa: data.company
    }
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
          'CompleteRegistration',
          {email: data.email, phone: data.phone, externalID: id},
        );
        setCookie('lead', {...data, id});
        return id;
      })
      // POST to Customer CRM
      // .then((id) => {
      //     fetch(`${info.crmWebhook}?${new URLSearchParams(crmParams)}`, {
      //       method: 'GET', // due to Customer CRM Config we're sending as GET method
      //     }).then((result) => result.text())
      //       .then((r) => console.log(r))
      //       .catch((e) => console.error('FETCH', e));
      //     return id;
      //   }
      // )
      // Redirect to Survey Page
      .then((id) => router.push(`/survey?id=${id}`));
  };

  return (
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
      <input
        {...register(
          'phone',
          {required: true, maxLength: 10, minLength: 10},
        )}
        className={errors.phone && '!bg-red-200'}
        onKeyDown={restrictNumber}
        placeholder="Teléfono de WhatsApp"/>
      <input
        {...register(
          'company',
          {required: true}
        )}
        className={errors.fullName && '!bg-red-200'}
        placeholder="Tu empresa"/>

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
  );
}