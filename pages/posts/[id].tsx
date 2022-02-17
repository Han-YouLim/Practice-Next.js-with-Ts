import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

//You should use getStaticPaths if you're statically pre-rendering pages that use dynamic routes and:
// The data comes from a headless CMS.
// ->The data comes from a database.
// ->The data comes from the filesystem.
//if fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
export async function getStaticPaths() {
    console.log("getStaticPaths")
    const paths = getAllPostIds() //[{"params":{"id":"pre-rendering"}},{"params":{"id":"ssg-ssr"}}]
    console.log("paths" + JSON.stringify(paths))
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }:any ) {
    console.log("getStaticProps")
    const postData = await getPostData(params.id)
    return {
        props: { postData }
    }
}

export default function Post({ postData }: any) {
    console.log("Post " + JSON.stringify(postData.id))
    return (
        <Layout>
            <Head>
                <title>헤드: 타이틀 = {postData.title}</title>
            </Head>
            <br/>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>

        </Layout>
    )
}