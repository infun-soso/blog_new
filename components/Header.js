import React, {useEffect, useState} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import api from '../config/apiUrl'
import '@/public/style/components/header.css'

import { Row, Col, Menu, Icon } from 'antd'
const Header = () => {

  const [navArray, setNavArray] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(api.getTypeInfo)
      setNavArray(result.data.data)
    }
    fetchData()
  }, [])

  const handleMenuClick = (e) => {
    if(e.key === '0') {
      Router.push('/index')
    } else {
      Router.push('/list?id=' + e.key)
    }
  }

  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">
            <Link href={{pathname: '/index'}}>
              <a> Infun</a>
            </Link>
          </span>
          <span className="header-txt">一个会打篮球的coder</span>
        </Col>
  
        <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu 
            mode="horizontal"
            onClick={handleMenuClick}
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