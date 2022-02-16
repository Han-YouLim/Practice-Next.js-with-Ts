import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

//process.cwd-> 현재작업디렉토리 반환(string) ts-next/lib/post.ts
//파일시스템에서 데이터 fetch
const postsDirectory = path.join(process.cwd(), 'posts')
const test = process.cwd()

export function getSortedPostsData() {
    console.log("process.cwd()" + test)
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