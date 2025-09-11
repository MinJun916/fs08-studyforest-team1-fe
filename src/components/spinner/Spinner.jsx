import { SyncLoader } from 'react-spinners';
import styles from '@/styles/components/spinner/Spinner.module.scss';

const Spinner = ({
  loading = true,
  className = '',
  color = '#98bf8d',
  size = 15,
  margin = 2,
  style = {},
  overlay = false,
}) => {
  if (!loading) return null;

  const containerClass = overlay
    ? `${styles.spinnerContainer} ${styles.overlay} ${className}`
    : `${styles.spinnerContainer} ${className}`;

  return (
    <div className={containerClass} style={style}>
      <SyncLoader color={color} loading={loading} margin={margin} size={size} />
    </div>
  );
};

export default Spinner;
