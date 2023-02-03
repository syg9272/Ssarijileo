import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from '@/redux/store';

import Layout from '@/components/layout/Layout';

import '@/styles/global.scss';
import Head from 'next/head';

export const persist = persistStore(store);

// 카카오 전역 객체 선언
declare global {
  interface Window {
    Kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // 카카오 SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_SDK_KEY);
      // console.log(window.Kakao.isInitialized());
    }
  }, []);

  useEffect(() => {
    // 다크모드 설정
    document.body.dataset.theme = localStorage.getItem('theme') || 'light';
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <Head>
          <title>싸리질러</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
