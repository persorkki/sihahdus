import Link from "next/link"
import Image from "next/image"

export default function FooterLink({ url, flavorText, name, image }) {
    return (
        <div>
            <Link href={url} >
                {flavorText}
                <Image src={image} width={17} height={17} alt={`${name} link`} />
                {name}
            </Link>
        </div>
    )
}