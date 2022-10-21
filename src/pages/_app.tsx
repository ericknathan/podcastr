import type { AppProps } from 'next/app';
import { Header, Player } from '../components';

import '../styles/global.scss';
import styles from '../styles/app.module.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.appWrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  );
}
