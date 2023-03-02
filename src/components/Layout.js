import { Navigation } from "./Navigation"
import { Footer } from "./Footer"
import styles from "../styles/Layout.module.scss"

function Layout({ children }) {
    return (
        <div>
          <Navigation />
            <div className={styles.content}>
              {children}
              <Footer />
            </div>
        </div>
    )
}

export { Layout }