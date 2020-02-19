import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import marked from 'marked'
import hljs from "highlight.js"
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import 'markdown-navbar/dist/navbar.css'
import {Row, Col, Breadcrumb, Icon, Affix} from 'antd'
import api from '../config/apiUrl'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import '@/public/style/pages/detail.css'

const Detail = (res) => {
  // console.log(res)
  // const [detail, setDetail] = useState({})
  console.log(res.data[0])
  const detail = res.data[0]
  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  renderer.heading = function(text, level, raw) {
    console.log(text, level, raw)
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  }

  marked.setOptions({
    renderer: renderer,
    gfm: true, // 启动github样式的markdown
    pedantic: false, // 只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
    sanitize: false, // 原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
    tables: true, // 支持Github形式的表格，必须打开gfm选项
    breaks: false, // 支持Github换行符，必须打开gfm选项，填写true或者false
    smartLists: true, // 优化列表输出 建议打开
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    } // 高亮规则 使用highlight
  })

  let html = marked(detail.article_content)
  return (
    <>
      <Head>
        <title>博客详情页</title>
      </Head>
      <Header />
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
  
            <div>
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
          <Affix offsetTop={5}>
            <div className="detail-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
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