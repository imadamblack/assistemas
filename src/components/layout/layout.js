import Head from 'next/head';
import { info } from '../../../info';
import Header from './header';
import Footer from './footer';
import { useEffect } from 'react';

export default function Layout({children}) {
    useEffect(() => {
    const mainHeader = document.getElementsByTagName('header')[0];
    document.querySelector('html').style.scrollPaddingTop = mainHeader.offsetHeight + 'px';
  }, []);

  return (
    <>
      <Head>
        <title>{info.companyName}</title>
        <meta name="description" content={info.description}/>
      </Head>
      <Header/>

      <main className="flex-grow">{children}</main>

      <Footer/>
    </>
  );
}
