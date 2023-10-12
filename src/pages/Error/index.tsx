import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './Error.module.scss'


export const Error: FC = () => {
  return (
    <div className={styles.error_container}>
      <h1 className={styles.error_title}>404 Not Found</h1>
      <p className={styles.error_message}>The page you are looking for does not exist.</p>
      <Link to="/" className={styles.home_link}>
        Go Home
      </Link>
    </div>
  )
}
