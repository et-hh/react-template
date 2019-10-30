import umiConfig from '../../../../.umirc'

export const getNavMenu = () => {
  return umiConfig.routes.filter(route => !route.hidden)
}