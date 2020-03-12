import React, { useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import tocbot from 'tocbot';
import 'tocbot/dist/tocbot.css';
import hljs from "highlight.js"
import 'highlight.js/styles/monokai-sublime.css'
import { noop } from '@/tools/tools';
import {Row, Col, Breadcrumb, Icon, Affix} from 'antd'
import api from '../config/apiUrl'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Banner from '@/components/common/Banner'

import '@/public/style/pages/detail.less'

const Detail = (res) => {
  const detail = res.data[0]
  let html = detail.article_content
  const tocbotInit = () => {
    const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    for (let i = 0, len = headers.length; i < len; i += 1) {
      headers[i].id = `header-${i}`;
    }
    tocbot.init({
      tocSelector: '.menu',
      contentSelector: '.detail-context',
      headingSelector: 'h1, h2, h3, h4, h5, h6',
    });
  }
  const hljsInit = () => {
    const codeBlock = document.querySelectorAll('pre code');
    for (let i = 0, l = codeBlock.length; i < l; i += 1) {
      hljs.highlightBlock(codeBlock[i]);
    }
  }
  const fixToc = () => {
    const menu = document.querySelector('.menu');

    window.addEventListener(
      'scroll',
      _.throttle(() => {
        const tops =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (tops < 440) {
          menu.style.top = `${512 - tops}px`;
        } else {
          menu.style.top = '4rem';
        }
      }, 10),
    );
  }
  // if (global) initTocbot() 
  useEffect(() => {
    tocbotInit()
    hljsInit()
    fixToc()
    return () => {
      window.removeEventListener('scroll', noop)
    }
  }, [])
  return (
    <>
      <Head>
        <title>博客详情页</title>
      </Head>
      <Header />
      <Banner imgUrl={detail.cover_url} height='50vh'/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{detail.typeName}</Breadcrumb.Item>
                <Breadcrumb.Item>{detail.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
  
            <div style={{padding: '0 2rem'}}>
              <div className="detail-title">{detail.title}</div>
  
              <div className="list-icon center">
                <span><Icon type="calendar" /> {detail.addTime}</span>
                <span><Icon type="folder" /> {detail.typeName}</span>
                <span><Icon type="fire" /> {detail.view_count}人</span>
              </div>
  
              <div className="detail-context">
                <div dangerouslySetInnerHTML={{__html: html}}></div>
              </div>
            </div>
          </div>
        </Col>
  
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <div className="menu">
              {/* {tocify && tocify.render()} */}
          </div>
        </Col>
      </Row>
      <Footer />
   </>
  )
}

Detail.getInitialProps = async (context) => {
  let id = context.query.id
  const res = await axios(api.getArticleById + id)
  return res.data
}

export default Detail