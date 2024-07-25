import '../styles/globals.scss';
import Layout from '../components/layout/layout';
import { useRouter } from 'next/router';
import { setCookie, getCookie } from 'cookies-next';

function MyApp({Component, pageProps}) {
  const {query: { fbclid }} = useRouter();
  const _fbc = getCookie('_fbc');

  if (!_fbc && fbclid) {
    const date = new Date();
    setCookie(
      '_fbc',
      `fb.1.${Date.now()}.${fbclid}`,
      {expires: new Date(date.setDate(date.getDate() + 7))}
    );
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
