import React, { useState } from 'react'
import Head from 'next/head'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Author from '@/components/Author'
import Advert from '@/components/advert'

import { Row, Col, List, Icon } from 'antd'

const Home = () => {

  const [myList, setMyList] = useState(
    [
      {title: '英雄联盟', context: '断剑重铸之日，骑士归来之时。'},
      {title: '程序规范', context: '程序员最讨厌的事情是维护没有注释的代码，第二讨厌的的事情是自己写注释。'},
      {title: '海月姬', context: '如果能够重生的话，我想，我想成为水母。想成为只是在海里自由地摇摇摆摆的水母。'},
      {title: '普希金', context: '你最可爱，我说时来不及思索，但思索过后，还是这样说'}
    ]
  )
  
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
                  <div className="list-title">{item.title}</div>
                  <div className="list-icon">
                    <span><Icon type="calendar" /> 2019-06-28</span>
                    <span><Icon type="folder" /> 视频教程</span>
                    <span><Icon type="fire" /> 5498人</span>
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

export default Home