import '../styles/globals.css';
import type { AppProps } from 'next/app';

function StudyTime({ Component, pageProps }: AppProps) {

  if (typeof document !== 'undefined') {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(theme);
  }

  return <Component {...pageProps} />;
}

export default StudyTime;
