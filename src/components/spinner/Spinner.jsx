import { SyncLoader } from 'react-spinners';
import styles from '@/styles/components/spinner/Spinner.module.scss';

const Spinner = ({ loading = true, className = '' }) => {
  if (!loading) return null;

  return (
    <div className={`${styles.spinnerContainer} ${className}`}>
      <SyncLoader color="#98bf8d" loading margin={2} size={15} />
    </div>
  );
};

export default Spinner;
