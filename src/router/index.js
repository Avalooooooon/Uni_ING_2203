import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () => import('@/views/login/auth-redirect'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('@/views/error-page/401'),
  hidden: true
},
// {
//   path: '/',
//   component: Layout,
//   redirect: '/dashboard',
//   hidden: true,
//   children: [
//     {
//       path: 'dashboard',
//       component: () => import('@/views/dashboard/index'),
//       name: 'Dashboard',
//       meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
//     }
//   ]
// },
{
  path: '/content',
  component: Layout,
  redirect: '/content/wxcontent',
  meta: {
    title: '内容管理',
    icon: 'form',
    affix: true
  },
  children: [{
    path: 'wxcontent',
    component: () => import('@/views/content/WxContent'),
    name: 'WxContent',
    meta: {
      title: '小程序内容管理',
      icon: 'wechat',
      affix: true
    }
  },
  {
    path: '/content/wxcontent/morningdetail',
    hidden: true,
    component: () => import('@/views/content/components/MorningDetail'),
    name: 'MorningDetail',
    meta: {
      title: '早安晚安',
      activeMenu: '/content/wxcontent'
    }
  },
  {
    path: '/content/wxcontent/wxdetail',
    hidden: true,
    component: () => import('@/views/content/components/WxDetail'),
    name: 'WxDetail',
    meta: {
      title: '壁纸',
      activeMenu: '/content/wxcontent'
    }
  },
  {
    path: '/content/wxcontent/memedetail',
    hidden: true,
    component: () => import('@/views/content/components/MemeDetail'),
    name: 'MemeDetail',
    meta: {
      title: '表情包',
      activeMenu: '/content/wxcontent'
    }
  },
  {
    path: '/content/wxcontent/secretdetail',
    hidden: true,
    component: () => import('@/views/content/components/SecretDetail'),
    name: 'SecretDetail',
    meta: {
      title: '爱的密语',
      activeMenu: '/content/wxcontent'
    }
  },
  {
    path: '/content/wxcontent/detailcheckimgsmorning',
    hidden: true,
    component: () => import('@/views/content-detail/DetailCheckImgsMorning'),
    name: 'DetailCheckImgsMorning',
    meta: {
      title: '早安晚安系列详情',
      activeMenu: '/content/wxcontent'
    },
    props(route) {
      return {
        detailid: route.query.detailid,
        detailname: route.query.detailname
      }
    }
  },
  {
    path: '/content/wxcontent/detailcheckimgs',
    hidden: true,
    component: () => import('@/views/content-detail/DetailCheckImgs'),
    name: 'DetailCheckImgs',
    meta: {
      title: '壁纸系列详情',
      activeMenu: '/content/wxcontent'
    },
    props(route) {
      return {
        detailid: route.query.detailid,
        detailname: route.query.detailname
      }
    }
  },
  {
    path: '/content/wxcontent/detailcheckimgsmeme',
    hidden: true,
    component: () => import('@/views/content-detail/DetailCheckImgsMeme'),
    name: 'DetailCheckImgsMeme',
    meta: {
      title: '表情包系列详情',
      activeMenu: '/content/wxcontent'
    },
    props(route) {
      return {
        detailid: route.query.detailid,
        detailname: route.query.detailname
      }
    }
  },
  {
    path: '/content/wxcontent/detailcheckimgssecret',
    hidden: true,
    component: () => import('@/views/content-detail/DetailCheckImgsSecret'),
    name: 'DetailCheckImgsSecret',
    meta: {
      title: '爱的密语系列详情',
      activeMenu: '/content/wxcontent'
    },
    props(route) {
      return {
        detailid: route.query.detailid,
        detailname: route.query.detailname
      }
    }
  },
  {
    path: '/content/wxcontent/detailaddimgset',
    hidden: true,
    component: () => import('@/views/content-detail/DetailAddImgset'),
    name: 'DetailAddImgset',
    meta: {
      title: '详情-添加多张图片'
    },
    props(route) {
      return {
        detailid: route.query.detailid,
        detailname: route.query.detailname
      }
    }
  },
  {
    path: '/content/wxcontent/detailaddimgonly',
    hidden: true,
    component: () => import('@/views/content-detail/DetailAddImgOnly'),
    name: 'DetailAddImgOnly',
    meta: {
      title: '详情-添加单张图片'
    },
    props(route) {
      return {
        detailid: route.query.detailid,
        detailname: route.query.detailname
      }
    }
  },

  {
    path: 'appcontent',
    component: () => import('@/views/content/AppContent'),
    name: 'AppContent',
    meta: {
      title: 'APP内容管理',
      icon: 'international',
      affix: true
    }
  },
  {
    path: '/content/appcontent/appdetail',
    hidden: true,
    component: () => import('@/views/content/components/AppDetail'),
    name: 'AppDetail',
    meta: {
      title: 'App详情'
    },
    props(route) {
      return {
        appid: route.query.appid,
        appname: route.query.appname
      }
    }
  },
  {
    path: '/content/appcontent/appdetail/detailadd',
    hidden: true,
    component: () => import('@/views/content-detail/DetailAdd'),
    name: 'DetailAdd',
    meta: {
      title: '详情-添加富文本编辑器'
    },
    props(route) {
      return {
        detailid: route.query.detailid,
        detailname: route.query.detailname
      }
    }
  },
  {
    path: '/content/appcontent/appdetail/DetailCheckVideo',
    hidden: true,
    component: () => import('@/views/content-detail/DetailCheckVideo'),
    name: 'DetailCheckVideo',
    meta: {
      title: '详情-查看视频'
    },
    props(route) {
      return {
        detailid: route.query.detailid,
        detailname: route.query.detailname
      }
    }
  }
  ]
}
  // {
  //   path: '/content/appcontent',
  //   component: Layout,
  //   hidden: true,
  //   meta: { title: '内容管理/App内容管理' },
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'appdetail',
  //       component: () => import('@/views/content/components/AppDetail'),
  //       name: 'AppDetail',
  //       meta: { title: 'App详情', icon: 'dashboard', affix: true, activeMenu: '/content/appcontent' },
  //
  //       props(route) {
  //         return {
  //           appid: route.query.appid,
  //           appname: route.query.appname
  //         }
  //       }
  //
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   component: Layout,
  //   hidden: true,
  //   meta: { title: '内容管理' },
  //   children: [
  //     {
  //       // hidden: true,
  //       path: '/content/wxcontent/morningdetail',
  //       component: () => import('@/views/content/components/MorningDetail'),
  //       name: 'MorningDetail',
  //       meta: { title: '早安晚安', icon: 'dashboard', affix: true },
  //
  //       props(route) {
  //         return {
  //           appid: route.query.appid,
  //           appname: route.query.appname
  //         }
  //       }
  //
  //     }
  //   ]
  // },
  // {
  //   path: '/content/wxcontent',
  //   component: Layout,
  //   hidden: true,
  //   meta: { title: '内容管理' },
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'wxdetail',
  //       component: () => import('@/views/content/components/WxDetail'),
  //       name: 'WxDetail',
  //       meta: { title: '小程序详情(壁纸）', icon: 'dashboard', affix: true, activeMenu: '/content/wxcontent' },
  //
  //       props(route) {
  //         return {
  //           appid: route.query.appid,
  //           appname: route.query.appname
  //         }
  //       }
  //
  //     }
  //   ]
  // },
  // {
  //   path: '/content/wxcontent',
  //   component: Layout,
  //   hidden: true,
  //   meta: { title: '内容管理/小程序内容管理' },
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'memedetail',
  //       component: () => import('@/views/content/components/MemeDetail'),
  //       name: 'MemeDetail',
  //       meta: { title: '小程序详情(表情包）', icon: 'dashboard', affix: true, activeMenu: '/content/wxcontent' },
  //
  //       props(route) {
  //         return {
  //           appid: route.query.appid,
  //           appname: route.query.appname
  //         }
  //       }
  //
  //     }
  //   ]
  // },
  // {
  //   path: '/content/wxcontent',
  //   component: Layout,
  //   hidden: true,
  //   meta: { title: '内容管理/小程序内容管理' },
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'secretdetail',
  //       component: () => import('@/views/content/components/SecretDetail'),
  //       name: 'SecretDetail',
  //       meta: { title: '小程序详情(爱的密语）', icon: 'dashboard', affix: true, activeMenu: '/content/wxcontent' },
  //
  //       props(route) {
  //         return {
  //           appid: route.query.appid,
  //           appname: route.query.appname
  //         }
  //       }
  //
  //     }
  //   ]
  // },
  // {
  //   path: '/content/wxcontent',
  //   component: Layout,
  //   hidden: true,
  //   meta: { title: '小程序内容管理' },
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'detailaddimgonly',
  //       component: () => import('@/views/content-detail/DetailAddImgOnly'),
  //       name: 'DetailAddImgOnly',
  //       meta: { title: '详情-添加单张图片', icon: 'dashboard', activeMenu: '/content/wxcontent' },
  //
  //       props(route) {
  //         return {
  //           detailid: route.query.detailid,
  //           detailname: route.query.detailname
  //         }
  //       }
  //
  //     }
  //   ]
  // },

  // {
  //   path: '/content/wxcontent',
  //   component: Layout,
  //   hidden: true,
  //   meta: { title: '小程序内容管理' },
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'detailcheckimgsmorning',
  //       component: () => import('@/views/content-detail/DetailCheckImgsMorning'),
  //       name: 'DetailCheckImgsMorning',
  //       meta: { title: '系列详情-早安晚安', icon: 'dashboard', activeMenu: '/content/wxcontent' },
  //
  //       props(route) {
  //         return {
  //           detailid: route.query.detailid,
  //           detailname: route.query.detailname
  //         }
  //       }
  //
  //     }
  //   ]
  // },
  // {
  //   path: '/content/wxcontent',
  //   component: Layout,
  //   hidden: true,
  //   meta: { title: '小程序内容管理' },
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'detailcheckimgs',
  //       component: () => import('@/views/content-detail/DetailCheckImgs'),
  //       name: 'DetailCheckImgs',
  //       meta: { title: '系列详情-壁纸', icon: 'dashboard', activeMenu: '/content/wxcontent' },
  //
  //       props(route) {
  //         return {
  //           detailid: route.query.detailid,
  //           detailname: route.query.detailname
  //         }
  //       }
  //
  //     }
  //   ]
  // },
  // {
  //   path: '/content/wxcontent',
  //   component: Layout,
  //   hidden: true,
  //   meta: { title: '小程序内容管理' },
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'detailcheckimgsmeme',
  //       component: () => import('@/views/content-detail/DetailCheckImgsMeme'),
  //       name: 'DetailCheckImgsMeme',
  //       meta: { title: '系列详情-表情包', icon: 'dashboard', activeMenu: '/content/wxcontent' },
  //
  //       props(route) {
  //         return {
  //           detailid: route.query.detailid,
  //           detailname: route.query.detailname
  //         }
  //       }
  //
  //     }
  //   ]
  // },
  // {
  //   path: '/content/wxcontent',
  //   component: Layout,
  //   hidden: true,
  //   meta: { title: '小程序内容管理' },
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'detailcheckimgssecret',
  //       component: () => import('@/views/content-detail/DetailCheckImgsSecret'),
  //       name: 'DetailCheckImgsSecret',
  //       meta: { title: '系列详情-爱的密语', icon: 'dashboard', activeMenu: '/content/wxcontent' },
  //
  //       props(route) {
  //         return {
  //           detailid: route.query.detailid,
  //           detailname: route.query.detailname
  //         }
  //       }
  //
  //     }
  //   ]
  // },

  // {
  //   path: '/content/wxcontent',
  //   component: Layout,
  //   hidden: true,
  //   meta: { title: '小程序内容管理' },
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'detailaddimgset',
  //       component: () => import('@/views/content-detail/DetailAddImgset'),
  //       name: 'DetailAddImgset',
  //       meta: { title: '详情-添加多张图片', icon: 'dashboard', activeMenu: '/content/wxcontent' },
  //
  //       props(route) {
  //         return {
  //           detailid: route.query.detailid,
  //           detailname: route.query.detailname
  //         }
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/content/appcontent/appdetail',
  //   component: Layout,
  //   children: [
  //     {
  //       hidden: true,
  //       path: 'detailadd',
  //       component: () => import('@/views/content-detail/DetailAdd'),
  //       name: 'DetailAdd',
  //       meta: { title: '详情-添加富文本编辑器', icon: 'dashboard', activeMenu: '/content/appcontent' },
  //
  //       props(route) {
  //         return {
  //           detailid: route.query.detailid,
  //           detailname: route.query.detailname
  //         }
  //       }
  //
  //     }
  //   ]
  // },

  // {
  //   path: '/content/appcontent/appdetail/DetailCheckVideo',
  //   component: Layout,
  //   children: [
  //     {
  //       hidden: true,
  //       path: '',
  //       component: () => import('@/views/content-detail/DetailCheckVideo'),
  //       name: 'DetailCheckVideo',
  //       meta: { title: '详情-查看视频', icon: 'dashboard' },
  //
  //       props(route) {
  //         return {
  //           detailid: route.query.detailid,
  //           detailname: route.query.detailname
  //         }
  //       }
  //
  //     }
  //   ]
  // }
  // {
  //   path: '/new',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/new/index'),
  //       name: 'New',
  //       meta: { title: '新增页面', icon: 'dashboard', affix: true }
  //
  //     }
  //   ]
  // },

  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: 'Profile', icon: 'user', noCache: true }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },
  //
  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
