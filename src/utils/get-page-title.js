import defaultSettings from '@/settings'

const title = defaultSettings.title || '环境应急管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
