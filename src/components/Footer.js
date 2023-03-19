import styles from "../styles/Footer.module.scss"
import GitHubImage from "public/github-mark-white.svg"
import DigitalOceanImage from "public/DO_Logo_icon_blue.svg"

import FooterLink from "./Footer/FooterLink"

export default function Footer() {
    return (
        <>
            <div className={styles.content}>
                <FooterLink
                    url="https://www.digitalocean.com/?refcode=b859d8ac1d3c&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"
                    flavorText="hosted on"
                    name="Digital Ocean"
                    image={DigitalOceanImage}
                />
                <FooterLink
                    url="https://github.com/persorkki/sihahdus"
                    flavorText="source on"
                    name="GitHub"
                    image={GitHubImage}
                />
            </div>
        </>
    )
}
