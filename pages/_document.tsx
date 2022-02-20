import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="ko">
            <Head />
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}
//서버에만 렌더링되고 onclick 같은건 작동 안함
