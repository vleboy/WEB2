import React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

export default function SideMenu() {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["classic"]}
      defaultOpenKeys={["sub"]}
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
        <Menu.Item key="classic">传统百家乐</Menu.Item>
        <Menu.Item key="9">包桌百家乐</Menu.Item>
        <Menu.Item key="10">竞咪百家乐</Menu.Item>
        <Menu.Item key="11">龙宝百家乐</Menu.Item>
        <Menu.Item key="12">保险百家乐</Menu.Item>
        <Menu.Item key="13">牌路介绍</Menu.Item>
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
        <Icon type="upload" />
        <span>龙虎</span>
      </Menu.Item>
      <Menu.Item key="4">
        <Icon type="upload" />
        <span>轮盘</span>
      </Menu.Item>
      <Menu.Item key="5">
        <Icon type="upload" />
        <span>骰宝</span>
      </Menu.Item>
      <Menu.Item key="6">
        <Icon type="upload" />
        <span>炸金花</span>
      </Menu.Item>
      <Menu.Item key="7">
        <Icon type="upload" />
        <span>斗牛</span>
      </Menu.Item>
    </Menu>
  );
}
