import React, { Component } from 'react'
import { Layout } from 'antd'
import SideMenu from '../components/sideMenu'
import HeadMenu from '../components/headMenu'
import Routes from '../router'
const { Header, Footer, Sider, Content } = Layout
export default class Main extends Component {
  render() {
    return (
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0" style={{ height: '100vh' }}>
          {/* <img src="" alt=""/> */}
          <div>aaa</div>
          <SideMenu />
        </Sider>
        <Layout>
          <Header style={{ textAlign: 'right' }}>
            <HeadMenu />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: '50vh'
            }}
          >
            <Routes />
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
