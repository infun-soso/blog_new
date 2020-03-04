import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import Link from 'next/link'
import axios from 'axios'
import api from '../config/apiUrl'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Author from '@/components/Author'
import Advert from '@/components/Advert'
import Banner from '@/components/common/Banner'

import { Row, Col, List, Icon, Breadcrumb } from 'antd'

const ListPage = (list) => {
  const [myList, setMyList] = useState(list.data)
  useEffect(() => {
    setMyList(list.data)
  }, [list.data])
  return (
    <div>
      <Head>
        <title>ListPage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Banner />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
              </Breadcrumb>
            </div>
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
                  <div className="list-context">{item.context}</div>
                </List.Item>
              )}
            />
          </div>
        </Col>
  
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author></Author>
          <Advert></Advert>
        </Col>
      </Row>
      <Footer></Footer>
    </div>
  )
}

ListPage.getInitialProps = async (context) => {
  const id = context.query.id
  const promise = await axios(api.getListById + id)
  return promise.data
}

export default ListPage
