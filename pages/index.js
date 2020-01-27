import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import api from '../config/apiUrl'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Author from '@/components/Author'
import Advert from '@/components/advert'

import { Row, Col, List, Icon } from 'antd'

const Home = (list, list2) => {
  const [myList, setMyList] = useState(list.data)
  
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
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
                  <div className="list-context">{item.introduce}</div>
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

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(api.getArticleList).then(
      (res) => {
        console.log(res, '222323')
        resolve(res.data)
      }
    )
  })
  return promise
}

export default Home