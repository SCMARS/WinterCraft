import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>WinterCraft 2025 - Minecraft Christmas Event</title>
        <meta name="description" content="Join the WinterCraft 2025 Minecraft Christmas event! Participate in festive activities, win prizes, and experience the magic of winter in Minecraft." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="WinterCraft 2025 - Minecraft Christmas Event" />
        <meta property="og:description" content="Join the WinterCraft 2025 Minecraft Christmas event! Participate in festive activities, win prizes, and experience the magic of winter in Minecraft." />
        <meta property="og:image" content="/gallery/hero-1.png" />
        <meta property="og:url" content="https://wintercraft2025.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
