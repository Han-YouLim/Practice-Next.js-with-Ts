import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from "../components/Footer";
import Top from "../components/Top"
import 'semantic-ui-css/semantic.min.css'
//In Next.js, you can add global CSS files by importing them from pages/_app.js.
// You cannot import global CSS anywhere else.
// The reason that global CSS can't be imported outside of pages/_app.js is that global CSS affects all elements on the page.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <div>
          <Top />
          <Component {...pageProps} />
        <Footer />
      </div>
  )
}

//페이지 전환 시 레이아웃을 유지할 수 있음
//페이지 전환 시 상태값 유지할 수 있음
//글로벌 css를 이곳에 선언
//모든 패이지에 적용되어야하는 부분은이곳에!
