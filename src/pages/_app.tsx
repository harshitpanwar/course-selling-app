import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import './config/recoil'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { user } from '../../atoms/user';

export default function App({ Component, pageProps }: AppProps) {

  return(
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    );
}

