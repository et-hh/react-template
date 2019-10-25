import styles from '../index.scss'

function BasicLayout(props) {
  return (
    <div className={styles.app_container}>
      <div className={styles.app_content}>
        <div className={styles.app_main}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default BasicLayout
