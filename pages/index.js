import React, { useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import api from '../config/apiUrl'
import '../public/style/pages/home.less'
import svgIcons from '@/static/imgs/infun-blog-svg-icons.svg'
import { svgSprite } from '@/config/constants'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Author from '@/components/Author'
import Advert from '@/components/Advert'
import PostSummary from '@/components/post/PostSummary'
import Banner from '@/components/common/Banner'

import { Row, Col, List, Icon, Calendar } from 'antd'

const renderer = new marked.Renderer();
marked.setOptions({
  renderer: renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  sanitize:false,
  xhtml: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});


const Home = (list) => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Banner />
      <div className="home_slogon">
        <h1 className="glitch" data-value='HI, INFUN!'>HI, INFUN!</h1>
      </div>
      <div className="content">
        {/* <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}> */}
          {/* <div>
            <List 
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={myList}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{pathname: '/detail', query: {id: item.id}}}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><Icon type="calendar" /> {item.addTime}</span>
                    <span><Icon type="folder" /> {item.typeName}</span>
                    <span><Icon type="fire" /> {item.view_count}人</span>
                  </div>
                  <div className="list-context" dangerouslySetInnerHTML={{__html: marked(item.introduce)}}></div>
                </List.Item>
              )}
            />
          </div> */}
          <h2 className="blog_summary_tips">
            <svg className="icon">
              <use xlinkHref={`${svgIcons}${svgSprite.new}`} />
            </svg>
            The Latest!
          </h2>
          <PostSummary list={list}/>
        {/* </Col> */}
  
        {/* <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author></Author>
          <Advert></Advert>
          <div style={{ background: '#fff', border: '1px solid #d9d9d9', borderRadius: 4, margin: '.5rem 0 0 .5rem' }}>
            <Calendar fullscreen={false} />
          </div>
        </Col> */}
      </div>
      <Footer></Footer>
    </div>
  )
}

Home.getInitialProps = async () => {
  const promise = await axios(api.getArticleList)
  return promise.data
}

export default Home
