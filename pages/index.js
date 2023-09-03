
import styles from './index.module.scss'
import "../app/globals.css"
import AuthTest from '/components/authtest'
import Link from 'next/link'

export default function Home() {

  return (
    <main className={styles.main}>
      <h1>Auth and PWA and MongoDB</h1>

      <AuthTest />

      <hr />
      <Link href="/secure">secure</Link>
    </main>
  )
}
