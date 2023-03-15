import styles from "../../styles/Home.module.scss"
import { getCsrfToken } from "next-auth/react"

export default function SignIn({ csrfToken }) {
    
    return (
     <main className={styles.content}>
        <h1 className={styles.title}>Log<span>in</span></h1>
        <h2></h2>
        <form className={styles.loginform} method="post" action="/api/auth/callback/credentials" >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div  className={styles.logincc}>
            <label>Password</label>
                
                <input name="password" type="password" placeholder="password here" autoFocus />
                
            
            </div>
            <button type="submit">Login</button>
        </form>
    </main>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}