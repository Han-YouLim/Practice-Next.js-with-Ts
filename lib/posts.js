import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

//process.cwd-> 현재작업디렉토리 반환(string) ts-next/lib/post.ts
//파일시스템에서 데이터 fetch
const postsDirectory = path.join(process.cwd(), 'posts')
const test = process.cwd()

export function getSortedPostsData() {
    console.log("process.cwd()" + test) // /Users/han-yulim/Desktop/ts-next
    console.log("postDirectory" + postsDirectory) // /Users/han-yulim/Desktop/ts-next

    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        //파일 읽어오기 (파일을 꼭 읽고 와서 그 후에 담으로 넘어감-> 동기)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the posts metadata section
        const matterResult = matter(fileContents)

        // Combine the data with the id
        return {
            id,
            ...matterResult.data
        }
    })
    // Sort posts by date
    return allPostsData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    })
}

//api에서 데이터 fetch in js
// export async function getSortedPostsData() {
//     // Instead of the file system,
//     // fetch post data from an external API endpoint
//     const res = await fetch('..')
//     return res.json()
// }


//database에서 데이터 fetch in js
// import someDatabaseSDK from 'someDatabaseSDK'
//
// const databaseClient = someDatabaseSDK.createClient(...)
//
// export async function getSortedPostsData() {
//     // Instead of the file system,
//     // fetch post data from a database
//     return databaseClient.query('SELECT posts...')
// }

//It will return the list of file names (excluding .md) in the posts directory.
// The returned list is not just an array of strings — it must be an array of objects
export function getAllPostIds() {
    const fileNames =fs.readdirSync(postsDirectory)
    // // Instead of the file system,
    // // fetch post data from an external API endpoint
    // and make sure to make "async" this function
    // const res = await fetch('..')
    // const posts = await res.json()
    // return posts.map(post => {
    //     return {
    //         params: {
    //             id: post.id
    //         }
    //     }
    // })

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the id
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}
