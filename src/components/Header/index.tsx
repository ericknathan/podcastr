import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './styles.module.scss';

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  });

  return (
    <header className={styles.headerContainer}>
      <img
        src="logo.svg"
        alt="Fone de ouvido em conjunto com o texto Podcastr, simbolizando o logotípo da aplicação"
      />
      <p>O melhor para você ouvir, sempre</p>
      <time>{currentDate}</time>
    </header>
  );
}
