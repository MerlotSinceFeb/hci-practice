import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '我的工作台', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  {
    path: '/people',
    component: Layout,
    redirect: '/people/info',
    meta: {
      title: '人事管理',
      icon: 'el-icon-menu',
      roles: ['admin']
    },
    children: [
      {
        path: 'info',
        name: 'people_info',
        component: () => import('@/views/people/info'),
        meta: {
          title: '人事信息管理',
          icon: 'el-icon-menu',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/event',
    component: Layout,
    redirect: '/event/info',
    meta: {
      title: '事件维护',
      icon: 'el-icon-menu',
      roles: ['worker']
    },
    children: [
      {
        path: 'info',
        name: 'event_info',
        component: () => import('@/views/event/info'),
        meta: {
          title: '事件信息维护',
          icon: 'el-icon-menu',
          roles: ['worker']
        }
      }
    ]
  },

  {
    path: '/supply',
    component: Layout,
    redirect: '/supply/info',
    meta: {
      title: '物资维护',
      icon: 'el-icon-menu',
      roles: ['worker']
    },
    children: [
      {
        path: 'info',
        name: 'supply_info',
        component: () => import('@/views/supply/info'),
        meta: {
          title: '物资基本信息维护',
          icon: 'el-icon-menu',
          roles: ['worker']
        }
      },
      {
        path: 'location',
        name: 'supply_location',
        component: () => import('@/views/supply/location'),
        meta: {
          title: '物资位置信息维护',
          icon: 'el-icon-menu',
          roles: ['worker']
        }
      }
    ]
  },

  {
    path: '/process',
    component: Layout,
    redirect: '/process/info',
    meta: {
      title: '流程维护',
      icon: 'el-icon-menu',
      roles: ['worker']
    },
    children: [
      {
        path: 'info',
        name: 'process_info',
        component: () => import('@/views/process/info'),
        meta: {
          title: '流程信息维护',
          icon: 'el-icon-menu',
          roles: ['worker']
        }
      }
    ]
  },

  {
    path: '/enterprise',
    component: Layout,
    redirect: '/enterprise/info',
    meta: {
      title: '风险企业维护',
      icon: 'el-icon-menu',
      roles: ['worker']
    },
    children: [
      {
        path: 'info',
        name: 'enterprise_info',
        component: () => import('@/views/enterprise/info'),
        meta: {
          title: '风险企业信息维护',
          icon: 'el-icon-menu',
          roles: ['worker']
        }
      }
    ]
  },

  {
    path: '/city',
    component: Layout,
    redirect: '/city/info',
    meta: {
      title: '城市维护',
      icon: 'el-icon-menu',
      roles: ['worker']
    },
    children: [
      {
        path: 'info',
        name: 'city_info',
        component: () => import('@/views/city/info'),
        meta: {
          title: '城市信息维护',
          icon: 'el-icon-menu',
          roles: ['worker']
        }
      }
    ]
  },

  {
    path: '/report',
    component: Layout,
    redirect: '/report/info',
    alwaysShow: true,
    meta: {
      title: '接报维护',
      icon: 'el-icon-menu',
      roles: ['worker', 'monitor', 'expert']
    },
    children: [
      {
        path: 'info',
        name: 'report_info',
        component: () => import('@/views/report/info'),
        meta: {
          title: '接报信息维护',
          icon: 'el-icon-menu',
          roles: ['worker']
        }
      },
      {
        path: 'monitor',
        name: 'report_monitor',
        component: () => import('@/views/report/monitor'),
        meta: {
          title: '指挥人员接报审批',
          icon: 'el-icon-menu',
          roles: ['monitor']
        }
      },
      {
        path: 'urgent',
        name: 'report_urgent',
        component: () => import('@/views/report/urgent'),
        meta: {
          title: '紧急事件处理',
          icon: 'el-icon-menu',
          roles: ['monitor']
        }
      },
      {
        path: 'expert',
        name: 'report_expert',
        component: () => import('@/views/report/expert'),
        meta: {
          title: '专家人员接报审批',
          icon: 'el-icon-menu',
          roles: ['expert']
        }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
