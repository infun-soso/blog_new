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

let markdown = '# P01:课程介绍和环境搭建\n' +
'[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
'> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
 '**这是加粗的文字**\n\n' +
'*这是倾斜的文字*`\n\n' +
'***这是斜体加粗的文字***\n\n' +
'~~这是加删除线的文字~~ \n\n'+
'`console.log(1112)` \n\n'+
'# p02:来个Hello World 初始Vue3.0\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n'+
'***\n\n\n' +
'# p03:Vue3.0基础知识讲解\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n\n'+
'# p04:Vue3.0基础知识讲解\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n\n'+
'#5 p05:Vue3.0基础知识讲解\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n\n'+
'# p06:Vue3.0基础知识讲解\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n\n'+
'# p07:Vue3.0基础知识讲解\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n\n'+
'```\n'+
'import marked from \'marked\';\n'+
'```'



const Detail = (res) => {

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

  let html = marked(markdown)
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
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>
  
            <div>
              <div className="detail-title">文章标题</div>
  
              <div className="list-icon center">
                <span><Icon type="calendar" /> 2019-06-28</span>
                <span><Icon type="folder" /> 视频教程</span>
                <span><Icon type="fire" /> 5498人</span>
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