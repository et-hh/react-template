import routes from '../../../../config/routes'

export const getNavMenu = () => {
  return routes.filter(route => !route.hidden)
}