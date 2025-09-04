import Header from '@components/header/Header.jsx';
import styles from '@styles/components/layout/Layout.module.scss';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}
