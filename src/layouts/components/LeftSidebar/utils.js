import umiConfig from '../../../../.umirc'

export const getNavMenu = _ => {
  return umiConfig.routes.filter(route => !route.hidden)
}