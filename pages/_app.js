
import App, {Container} from 'next/app'
import React from 'react'
import dynamic from 'next/dynamic'
import 'antd/dist/antd.css'
import '@/public/style/pages/common.css'
const DynamicAplayer = dynamic(
  import('@/components/Aplayer'),
  {
    ssr: false   //这个要加上,禁止使用 SSR
  }
)
console.log(DynamicAplayer)
export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render () {
    const {Component, pageProps} = this.props
    return <Container>
      <DynamicAplayer></DynamicAplayer>
      <Component {...pageProps} />
    </Container>
  }
}