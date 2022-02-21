import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import axios, {Axios} from "axios";
import {useEffect, useState} from "react";
import ItemList from "../components/ItemList";
import {Divider} from "semantic-ui-react";
//****Two Forms of Pre-rendering****
//Static Generation is the pre-rendering method that generates the HTML at build time.
// The pre-rendered HTML is then reused on each request.
// Server-side Rendering is the pre-rendering method that generates the HTML on each request.
//***Static Generation v.s. Server-side Rendering***
//standard:  "Can I pre-render this page ahead of a user's request?"
//            yes: Static Generation / no: Server-side Rendering
// your page shows frequently updated data, and the page content changes on every request. you need to fetch data at request time instead of at build time=> Server-side Rendering
//To use Server-side Rendering, you need to export getServerSideProps instead of getStaticProps from your page.
// Static Generation => getStaticProps
// Server-side Rendering => getServerSideProps

//*** 언제 Client-side Rendering를 쓰면좋을까? ***
//1. private, user-specific page,
//2. SEO is not relevant,
//3. and the page doesn’t need to be pre-rendered.
//**SWR**
//Next.js has created a React hook for data fetching called SWR
//example usage of SWR
//import useSWR from 'swr'
// function Profile() {
//   const { data, error } = useSWR('/api/user', fetch)
//
//   if (error) return <div>failed to load</div>
//   if (!data) return <div>loading...</div>
//   return <div>hello {data.name}!</div>
// }

//***getStaticProps Details***
//getStaticProps only runs on the server-side.
//It will never run on the client-side.
//In development (npm run dev or yarn dev), getStaticProps runs on every request even for pages that use Static Generation.
//
// In production, getStaticProps runs at build time.
// However, this behavior can be enhanced using the fallback key returned by getStaticPaths
//getStaticProps can only be exported from a page.
// You can’t export it from non-page files.
type item = {
    name ?: string;  // FunctionComponent.
    category ?: string;
    price ?: number;
}

export async function getStaticProps() {
  const allPostsData:any = getSortedPostsData()
  return {
    props: { allPostsData }
  }
}

const Home = ({ allPostsData }:any) => {
  const [list, setList] = useState([])
  const API_URL =
      "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
  async function getData(){
    const res = await fetch(API_URL)
    return res.json()
  }

  useEffect(() => {
    getData()
        .then(res => {
          setList(res)
          console.log(JSON.stringify(list))
        }
    )
  },[])
  return (
    <div className={styles.container}>
      <Head>
        <title>HOME | JERRY Market </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main className={styles.main}>
        {/*<p className={styles.description}>*/}
        {/*  Get started by editing{' '}*/}
        {/*  <code className={styles.code}>pages/index.tsx</code>*/}
        {/*</p>*/}
        <h1><section style={{color:"red"}}>Best</section></h1>
            <hr className={styles.solid}></hr>
        <ItemList list ={list.slice(0, 9)} />
            <h1><section style={{color:"red"}}>New</section></h1>
            <hr className={styles.solid}></hr>
            <ItemList list={list.slice(9)} />

        {/*<div className={styles.grid}>*/}
        {/*  <a href="https://nextjs.org/docs" className={styles.card}>*/}
        {/*    <h2>Documentation &rarr;</h2>*/}
        {/*    <p>Find in-depth information about Next.js features and API.</p>*/}
        {/*  </a>*/}

        {/*  <a href="https://nextjs.org/learn" className={styles.card}>*/}
        {/*    <h2>Learn &rarr;</h2>*/}
        {/*    <p>Learn about Next.js in an interactive course with quizzes!</p>*/}
        {/*  </a>*/}

        {/*  <a*/}
        {/*    href="https://github.com/vercel/next.js/tree/canary/examples"*/}
        {/*    className={styles.card}*/}
        {/*  >*/}
        {/*    <h2>Examples &rarr;</h2>*/}
        {/*    <p>Discover and deploy boilerplate example Next.js projects.</p>*/}
        {/*  </a>*/}

        {/*  <a*/}
        {/*    href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
        {/*    className={styles.card}*/}
        {/*  >*/}
        {/*    <h2>Deploy &rarr;</h2>*/}
        {/*    <p>*/}
        {/*      Instantly deploy your Next.js site to a public URL with Vercel.*/}
        {/*    </p>*/}
        {/*  </a>*/}
        {/*</div>*/}
        {/* Add this <section> tag below the existing <section> tag */}
        {/*<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>*/}
        {/*  <h2 className={utilStyles.headingLg}>Blog</h2>*/}
        {/*  <ul className={utilStyles.list}>*/}
        {/*    {allPostsData.map(({ id, date, title }:any) => (*/}
        {/*        <li className={utilStyles.listItem} key={id}>*/}
        {/*          <Link href={`/posts/${id}`}>*/}
        {/*            <a>{title}</a>*/}
        {/*          </Link>*/}
        {/*          <br />*/}
        {/*          <small className={utilStyles.lightText}>*/}
        {/*            <Date dateString={date} />*/}
        {/*          </small>*/}
        {/*        </li>*/}
        {/*    ))}*/}
        {/*  </ul>*/}
        {/*</section>*/}
      </main>
    </div>
  )
}

export default Home
