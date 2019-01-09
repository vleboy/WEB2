import React, { Component } from 'react'
import { Layout, BackTop } from 'antd'
import SideMenu from '../components/sideMenu'
import HeadMenu from '../components/headMenu'
import ScrollToTop from '../components/scrollToTop'
import Routes from '../router'
import Logo from '../imgs/logo.png'
const { Header, Footer, Sider, Content } = Layout
export default class Main extends Component {
  constructor() {
    super()
    this.state = { collapse: false }
  }
  render() {
    return (
      <Layout>
        <Sider
          breakpoint="md"
          collapsible
          // trigger={null}
          collapsedWidth="0"
          onCollapse={() => this.setState({ collapse: true })}
          style={{
            height: '100vh',
            position: 'fixed',
            left: 0,
            overflow: 'auto'
          }}
        >
          <div
            className="logo"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <img src={Logo} alt="oops" />
          </div>
          <SideMenu />
        </Sider>
        <Layout className={this.state.collapse ? null : 'ml200'}>
          <Header style={{ textAlign: 'right' }}>
            <HeadMenu />
          </Header>
          <Content
            style={{
              minHeight: '50vh'
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
