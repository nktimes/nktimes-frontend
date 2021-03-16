import ReactTooltip from 'react-tooltip';

import '@/styles/global.css';
import { AuthProvider } from '@/services/firebase';

export default function NKTimes({ Component, pageProps }) {
  return (
    <AuthProvider>
      <>
        <Component {...pageProps} />
        <ReactTooltip effect="solid" />
      </>
    </AuthProvider>
  );
}
