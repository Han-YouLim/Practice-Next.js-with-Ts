import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import Head from 'next/head'
import styles from './layout.module.css'
import Link from "next/link";
import Gnb from "./Gnb"

export default function Top () {
    return (
        <>
            <div className={styles.login}>
                <Link href="/sign/in">
                    <h5>
                    <a className={styles.loginText}>Login</a>
                    </h5>
                </Link>
        </div>
            <Link href="/">
            <header className={styles.header}>
            <Image
                priority
                src="/images/jerry.jpeg"
                className={utilStyles.borderCircle}
                height={100}
                width={100}
                alt="jerry"
            />
            <h1 className={utilStyles.heading2Xl}>JERRY <span style={{color:"#0070f3", fontSize:"48px"}}>M</span>arcket</h1>
            </header>
            </Link>
            <Gnb />
        </>

    )
}