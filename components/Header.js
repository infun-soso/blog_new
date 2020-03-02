import React, {useEffect, useState} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import _ from 'lodash';
import api from '../config/apiUrl'
import cs from 'classnames'
import { noop } from '@/tools/tools';
import '@/public/style/components/header.less'

import { Row, Col, Menu, Icon } from 'antd'


const Header = () => {

  const [navArray, setNavArray] = useState([])
  const [isTop, setIsTop] = useState(true)

  const switchNavbarBackgroundColor = () => {
    const top = document.documentElement.scrollTop || document.body.scrollTop;
    if (!top) {
      setIsTop(true)
    }
    console.log(window)
    if(window){
      window.addEventListener(
        'scroll',
        _.throttle(() => {
          const tops =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (!tops) {
            setIsTop(true)
          } else {
            setIsTop(false)
          }
        }, 150),
      );
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(api.getTypeInfo)
      setNavArray(result.data.data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    switchNavbarBackgroundColor()
    return () => {
      if(window)window.removeEventListener('scroll', noop);
    }
  })

  const handleMenuClick = (e) => {
    if(e.key === '0') {
      Router.push('/index')
    } else {
      Router.push('/list?id=' + e.key)
    }
  }

  return (
    <div className={
      cs(
        'header',
        isTop ? 'clear_navbar_bg' : ''
      )
    }>
      <Row type="flex" justify="center" align="middle" style={{width: '100%'}}>
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">
            <Link href={{pathname: '/index'}}>
              <a style={{fontWeight: '500'}}> Infun</a>
            </Link>
          </span>
          <span className="header-txt">一个会打篮球的coder</span>
        </Col>
  
        <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu 
            mode="horizontal"
            onClick={handleMenuClick}
            style={{background: 'transparent', color: '#666666', border: 'none', fontSize: '0.8rem'}}
            >
            <Menu.Item key="0">
              <Icon type="home"></Icon>
              首页
            </Menu.Item>
            {
              navArray.map((item) => (
                <Menu.Item key={item.id}>
                  <Icon type={item.icon}></Icon>
                  {item.typeName}
                </Menu.Item>
              ))
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header