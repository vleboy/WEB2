import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

const { SubMenu } = Menu

export default function SideMenu() {
  return (
    <Menu
      theme="dark"
      mode="inline"
      // defaultSelectedKeys={["sub"]}
      defaultOpenKeys={['sub']}
    >
      <SubMenu
        key="sub"
        title={
          <span>
            <Icon type="appstore" />
            <span>百家乐</span>
          </span>
        }
      >
        <Menu.Item key="classic">
          <Link to="/classic">传统百家乐</Link>
        </Menu.Item>
        <Menu.Item key="9">
          <Link to="/baozhuo">包桌百家乐</Link>
        </Menu.Item>
        <Menu.Item key="10">
          <Link to="/jinmi">竞咪百家乐</Link>
        </Menu.Item>
        <Menu.Item key="11">
          <Link to="/longbao">龙宝百家乐</Link>
        </Menu.Item>
        <Menu.Item key="12">
          <Link to="insurance">保险百家乐</Link>
        </Menu.Item>
        <Menu.Item key="13">
          <Link to="pailu">牌路介绍</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="1">
        <Link to="/twentyOne">
          <Icon type="user" />
          <span>21点</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/niuniu">
          <Icon type="video-camera" />
          <span>牛牛</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/longhu">
          <Icon type="upload" />
          <span>龙虎</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/lunpan">
          <Icon type="upload" />
          <span>轮盘</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/toubao">
          <Icon type="upload" />
          <span>骰宝</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="6">
        <Link to="/jinhua">
          <Icon type="upload" />
          <span>炸金花</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="7">
        <Link to="/douniu">
          <Icon type="upload" />
          <span>斗牛</span>
        </Link>
      </Menu.Item>
    </Menu>
  )
}
