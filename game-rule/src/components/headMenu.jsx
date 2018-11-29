import React, { Component } from 'react'
import { Select } from 'antd'
const Option = Select.Option
export default class SideMenu extends Component {
  handleChange = value => {
    console.log(value)
  }
  render() {
    return (
      <Select
        defaultValue="zh"
        style={{ width: 120 }}
        onChange={this.handleChange}
      >
        <Option value="zh">中文</Option>
        <Option value="en">English</Option>
      </Select>
    )
  }
}
