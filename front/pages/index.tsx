import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

function Home() {
  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Header />
        <Footer />
      </main>
    </>
  );
}

export default Home;