import { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

import '@/styles/global.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { AuthProvider } from '@/services/firebase';

String.prototype.getStaticUrl = function() {
  return `https://storage.googleapis.com/nktimes-2903a.appspot.com/${this.valueOf()}`
}

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
