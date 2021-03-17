import { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

import '@/styles/global.css';
import { AuthProvider } from '@/services/firebase';

export default function NKTimes({ Component, pageProps }) {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return
    setShowTooltip(true)
  })

  return (
    <AuthProvider>
      <>
        <Component {...pageProps} />
        {showTooltip && <ReactTooltip effect="solid" />}
      </>
    </AuthProvider>
  );
}
