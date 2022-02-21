//로그인
import Layout from '../../components/Layout'
import Head from 'next/head'
import styles from '../../styles/login.module.css'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";

export default function SignIn() {
    const [isLogin, setIsLogin] = useState("fail")
    const router = useRouter()

    async function checkLogin() {
        const res = await fetch("../api/isLogin")
        if(res) {
            setIsLogin("success")
        }

        return res.json()
    }
    const doLogin = () => {
        checkLogin().then(r => {
            console.log("here " + JSON.stringify(r))
        })
    }

    useEffect(() => {
        if (isLogin === "success") {
            alert("로그인에 성공하셨습니다.")
            router.push('/')
        }
    }, [isLogin])

    console.log("SignIn")
    return (
        <div className={styles.container}>
            <Head>
                <title>Yourim Next.js Signin</title>
            </Head>
            <br/>
            <div style={{textAlign:"center", padding: "10px"}}>
                <h1 className="title">
                    Login
                </h1>
                <input className={styles.inputBox} placeholder="아이디"/>
                <br/>
                <input className={styles.inputBox} placeholder="비밀번호"/>
                <br/>
                <button className={styles.loginButton} onClick={doLogin}>
                    로그인
                </button>

                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
                <br/> <br/> <br/>
            </div>

        </div>
    )
}
