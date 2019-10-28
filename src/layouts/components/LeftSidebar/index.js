import React from 'react'
import { getNavMenu } from './utils'
import { Icon, Menu } from 'antd'
import { router } from 'umi'

export default class extends React.Component {
  navMenus = getNavMenu()

  onChangeMenuItem = ({ key }) => {
    const path = this.navMenus[key].routes[0].path
    router.push(path)
  }

  render() {
    return (
      <Menu theme="light" mode="inline" onClick={menuItem => this.onChangeMenuItem(menuItem)}>
        {this.navMenus.map((navmenu, navIndex) => (
          <Menu.Item key={navIndex}>
            <Icon type="pie-chart" />
            <span>{navmenu.routes[0].meta.title}</span>
          </Menu.Item>
        ))}
      </Menu>
    )
  }
}
