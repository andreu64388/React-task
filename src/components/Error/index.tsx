import { FC } from 'react'
import styles from './Error.module.scss'


interface IError {
   error: string
}
export const Error: FC<IError> = ({ error }) => {
   const handleRefreshPage = () => {
      window.location.reload();
   };
   return (
      <div className={styles.error}>
         <div className={styles.error__message}>{error}</div>
         <button className={styles.error__btn} onClick={handleRefreshPage}>Try again</button>
      </div>
   )
}

