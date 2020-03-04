import React, {useEffect, useState, useMemo} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import _ from 'lodash';
import api from '../config/apiUrl'
import cs from 'classnames'
import { noop } from '@/tools/tools';
import '@/public/style/components/header.less'
import CustomIcon from '@/components/common/CustomIcon'
import {HomeOutlined} from '@ant-design/icons'

import { Row, Col, Menu } from 'antd'

const Header = () => {

  const [navArray, setNavArray] = useState([])
  const [isTop, setIsTop] = useState(true)
  const th = _.throttle(() => {
    const tops =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (!tops) {
      setIsTop(true)
    } else {
      setIsTop(false)
    }
  }, 150)
  const switchNavbarBackgroundColor = () => {
    const top = document.documentElement.scrollTop || document.body.scrollTop;
    if (!top) {
      setIsTop(true)
    }
    
    window.addEventListener(
      'scroll',
      th,
    );
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(api.getTypeInfo)
      setNavArray(result.data.data)
    }
    fetchData()
    switchNavbarBackgroundColor()
    return () => {
      window.removeEventListener('scroll', th);
    }
  }, [])
  
  const handleMenuClick = (e) => {
    if(e.key === '0') {
      Router.push('/index')
    } else {
      Router.push('/list?id=' + e.key)
    }
  }
  const MenuMemo = useMemo(() => (
    <Menu 
      mode="horizontal"
      onClick={handleMenuClick}
      style={{background: 'transparent', color: '#666666', border: 'none', fontSize: '0.8rem'}}
      >
      <Menu.Item key="0" style={{height: '3.25rem'}}>
        <HomeOutlined className="icon_home"/>
        首页
      </Menu.Item>
      {
        navArray.map((item) => (
          <Menu.Item key={item.id} style={{height: '3.25rem'}}>
            <CustomIcon type={`icon-${item.icon}`} className={`icon_${item.icon}`} />
            {item.typeName}
          </Menu.Item>
        ))
      }
    </Menu>
  ), [navArray])

  return (
    <div className={
      cs(
        'header',
        isTop ? 'clear_navbar_bg' : ''
      )
    }>
      <Row type="flex" justify="center" align="middle" style={{width: '100%'}}>
        <Col xs={24} sm={24} md={10} lg={15} xl={14}>
          <span className="header-logo">
            <Link href={{pathname: '/index'}}>
              <a style={{fontWeight: '500'}}> Infun</a>
            </Link>
          </span>
          <span className="header-txt">一个会打篮球的coder</span>
        </Col>
  
        <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={8}>
          {MenuMemo}
        </Col>
      </Row>
    </div>
  )
}

export default Header