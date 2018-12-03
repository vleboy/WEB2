import React, { Component } from 'react'
import { Layout, BackTop } from 'antd'
import SideMenu from '../components/sideMenu'
import HeadMenu from '../components/headMenu'
import ScrollToTop from '../components/scrollToTop'
import Routes from '../router'
import Logo from '../imgs/logo.png'
const { Header, Footer, Sider, Content } = Layout
export default class Main extends Component {
  render() {
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            height: '100vh',
            position: 'fixed',
            left: 0,
            overflow: 'auto'
          }}
        >
          <div className="logo" style={{display:'flex',justifyContent:'center'}}>
            <img src={Logo} alt="oops"/>
          </div>
          <SideMenu />
        </Sider>
        <Layout>
          <Header style={{ textAlign: 'right' }}>
            <HeadMenu />
          </Header>
          <Content
            style={{
              background: '#fff',
              minHeight: '50vh',
              marginLeft: '200px'
            }}
          >
            <BackTop />
            <ScrollToTop>
              <Routes />
            </ScrollToTop>
          </Content>
          <Footer style={{ padding: 0 }}>
            <p style={{ textAlign: 'center' }}>
              Copyright © 2018. All Rights Reserved.
            </p>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
