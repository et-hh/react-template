import React from 'react'
import { getNavMenu } from './utils'
import { Icon, Menu } from 'antd'
import { router } from 'umi'

export default class extends React.Component {
  state = {
    selectedKeys: [],
  }

  navMenus = getNavMenu()

  componentDidMount() {
    const path = window.location.pathname
    this.setState({
      selectedKeys: [path],
    })
  }

  onChangeMenuItem = e => {
    const path = e.key
    this.setState(
      {
        selectedKeys: [path],
      },
      () => {
        router.push(path)
      },
    )
  }

  recursionMenu(navMenu) {
    const submenuRoutes = navMenu.routes
    if (submenuRoutes && submenuRoutes.length > 1) {
      return (
        <Menu.SubMenu key={navMenu.path} title={navMenu.meta.title}>
          {submenuRoutes.map(submenu => {
            return this.recursionMenu(submenu)
          })}
        </Menu.SubMenu>
      )
    }

    const menuItemPath = submenuRoutes ? submenuRoutes[0].path : navMenu.path
    const menuItemTitle = submenuRoutes ? submenuRoutes[0].meta.title : navMenu.meta.title
    return (
      <Menu.Item key={menuItemPath}>
        <Icon type="pie-chart" />
        <span>{menuItemTitle}</span>
      </Menu.Item>
    )
  }

  render() {
    const { selectedKeys } = this.state
    return (
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={selectedKeys}
        onClick={menuItem => this.onChangeMenuItem(menuItem)}
      >
        {this.navMenus.map(navmenu => {
          return this.recursionMenu(navmenu)
        })}
      </Menu>
    )
  }
}
