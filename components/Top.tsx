import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import Head from 'next/head'
import styles from './layout.module.css'
import Link from "next/link";

export default function Top () {
    return (
        <>
            <div className={styles.login}>
                <Link href="/sign/in">
                    <h5>
                    <a className={styles.loginText}>Login at
                    this page</a>
                    </h5>
                </Link>
        </div>
            <header className={styles.header}>
            <Image
                priority
                src="/images/jerry.jpeg"
                className={utilStyles.borderCircle}
                height={100}
                width={100}
                alt="jerry"
            />
            <h1 className={utilStyles.heading2Xl}>JERRY Marcket</h1>

        </header>

        </>

    )
}