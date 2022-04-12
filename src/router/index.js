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

  ////////////////////内容管理start
  {
    path: '/content',
    component: Layout,
    redirect: '/content/wxcontent',
    meta: {
      title: '内容管理',
      icon: 'form',
      affix: true
    },

    // 小程序内容管理部分路由
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

      // App内容管理部分路由
      {
        path: 'appcontent',
        component: () => import('@/views/content/AppContent'),
        name: 'AppContent',
        meta: {
          title: 'APP内容管理',
          icon: 'international',
          affix: true,
          activeMenu: '/content/appcontent'
        }
      },
      {
        path: '/content/appcontent/designerdetail',
        hidden: true,
        component: () => import('@/views/content/components/DesignerDetail'),
        name: 'DesignerDetail',
        meta: {
          title: '设计师',
          activeMenu: '/content/appcontent'
        },
        props(route) {
          return {
            appid: route.query.appid,
            appname: route.query.appname
          }
        }
      },
      {
        path: '/content/appcontent/designerdetail/detailcheckimgsdesigner',
        hidden: true,
        component: () => import('@/views/content-detail/DetailCheckImgsDesigner'),
        name: 'DetailCheckImgsDesigner',
        meta: {
          title: '设计师详情',
          activeMenu: '/content/appcontent'
        },
        props(route) {
          return {
            detailid: route.query.detailid,
            detailname: route.query.detailname
          }
        }
      },
      {
        path: '/content/appcontent/designerdetail/adddesigner',
        hidden: true,
        component: () => import('@/views/content/components/AddDesigner'),
        name: 'AddDesigner',
        meta: {
          title: '新增设计师',
          activeMenu: '/content/appcontent'
        },
        props(route) {
          return {
            listid: route.query.listid,
          }
        }
      },
      {
        path: '/content/appcontent/newsdetail',
        hidden: true,
        component: () => import('@/views/content/components/NewsDetail'),
        name: 'NewsDetail',
        meta: {
          title: '资讯',
          activeMenu: '/content/appcontent'
        },
        props(route) {
          return {
            appid: route.query.appid,
            appname: route.query.appname
          }
        }
      },
      {
        path: '/content/appcontent/newsdetail/detailcheckimgsnews',
        hidden: true,
        component: () => import('@/views/content-detail/DetailCheckImgsNews'),
        name: 'DetailCheckImgsNews',
        meta: {
          title: '资讯详情',
          activeMenu: '/content/appcontent'
        },
        props(route) {
          return {
            detailid: route.query.detailid,
            detailname: route.query.detailname
          }
        }
      },
      {
        path: '/content/appcontent/newsdetail/addnews',
        hidden: true,
        component: () => import('@/views/content/components/AddNews'),
        name: 'AddNews',
        meta: {
          title: '新增资讯',
          activeMenu: '/content/appcontent'
        },
        props(route) {
          return {
            listid: route.query.listid,
          }
        }
      },
      {
        path: '/content/appcontent/knowledgedetail',
        hidden: true,
        component: () => import('@/views/content/components/KnowledgeDetail'),
        name: 'KnowledgeDetail',
        meta: {
          title: '保养小知识',
          activeMenu: '/content/appcontent'
        },
        props(route) {
          return {
            appid: route.query.appid,
            appname: route.query.appname
          }
        }
      },
      {
        path: '/content/appcontent/designerdetail/detailcheckimgsknowledge',
        hidden: true,
        component: () => import('@/views/content-detail/DetailCheckImgsKnowledge'),
        name: 'DetailCheckImgsKnowledge',
        meta: {
          title: '保养小知识详情',
          activeMenu: '/content/appcontent'
        },
        props(route) {
          return {
            detailid: route.query.detailid,
            detailname: route.query.detailname
          }
        }
      },
      {
        path: '/content/appcontent/newsdetail/addknowledge',
        hidden: true,
        component: () => import('@/views/content/components/AddKnowledge'),
        name: 'AddKnowledge',
        meta: {
          title: '新增保养小知识',
          activeMenu: '/content/appcontent'
        },
        props(route) {
          return {
            listid: route.query.listid,
          }
        }
      },
    ]
  },
  ////////////////////内容管理end



  ////////////////////素材投放start
  {
    path: '/material',
    component: Layout,
    redirect: '/material/matlib',
    meta: {
      title: '素材投放',
      icon: 'form',
      affix: true
    },
    children: [
      // 素材库部分路由
      {
        path: 'matlib',
        component: () => import('@/views/material-lib/MatLib'),
        name: 'MatLib',
        meta: {
          title: '素材库',
          icon: 'wechat',
          affix: true
        }
      },
      {
        path: '/material/matlib/libcheckdetail',
        hidden: true,
        component: () => import('@/views/material-lib/LibCheckDetail'),
        name: 'LibCheckDetail',
        meta: {
          title: '查看视频',
          activeMenu: '/material/matlib'
        },
        props(route) {
          return {
            matid: route.query.matid,
            matname: route.query.matname
          }
        }
      },
      {
        path: '/material/matlib/libcheckdetail',
        hidden: true,
        component: () => import('@/views/material-lib/LibCheckDetail'),
        name: 'LibCheckDetail',
        meta: {
          title: '查看详情',
          activeMenu: '/material/matlib'
        },
        props(route) {
          return {
            matid: route.query.matid,
            matname: route.query.matname
          }
        }
      },
      {
        path: '/material/matlib/libedit',
        hidden: true,
        component: () => import('@/views/material-lib/LibEdit'),
        name: 'LibEdit',
        meta: {
          title: '编辑素材',
          activeMenu: '/material/matlib'
        },
        props(route) {
          return {
            matid: route.query.matid,
            matname: route.query.matname
          }
        }
      },
      {
        path: '/material/matlib/libeditvideo',
        hidden: true,
        component: () => import('@/views/material-lib/LibEditVideo'),
        name: 'LibEditVideo',
        meta: {
          title: '编辑视频',
          activeMenu: '/material/matlib'
        },
        props(route) {
          return {
            matid: route.query.matid,
            matname: route.query.matname
          }
        }
      },
      {
        path: '/material/matlib/libimageset',
        hidden: true,
        component: () => import('@/views/material-lib/LibImageset'),
        name: 'LibImageset',
        meta: {
          title: '查看图集',
          activeMenu: '/material/matlib'
        },
        props(route) {
          return {
            matid: route.query.matid,
            matname: route.query.matname
          }
        }
      },
      {
        path: '/material/matlib/libimagesetadd',
        hidden: true,
        component: () => import('@/views/material-lib/LibImagesetAdd'),
        name: 'LibImagesetAdd',
        meta: {
          title: '编辑新图集（上传图集）',
          activeMenu: '/material/matlib'
        },
        props(route) {
          return {
            matid: route.query.matid,
            matname: route.query.matname
          }
        }
      },
      {
        path: '/material/matlib/libimagesetedit',
        hidden: true,
        component: () => import('@/views/material-lib/LibImagesetEdit'),
        name: 'LibImagesetEdit',
        meta: {
          title: '编辑已上传图集',
          activeMenu: '/material/matlib'
        },
        props(route) {
          return {
            matid: route.query.matid,
            matname: route.query.matname
          }
        }
      },
      {
        path: '/material/matlib/libimagesetdel',
        hidden: true,
        component: () => import('@/views/material-lib/LibImagesetDel'),
        name: 'LibImagesetDel',
        meta: {
          title: '删除图集',
          activeMenu: '/material/matlib'
        },
        props(route) {
          return {
            matid: route.query.matid,
            matname: route.query.matname
          }
        }
      },

      // 投放申请部分路由
      {
        path: 'matapply',
        component: () => import('@/views/material-apply/MatApply'),
        name: 'MatApply',
        meta: {
          title: '投放申请',
          icon: 'wechat',
          affix: true
        }
      },
      {
        path: '/material/matapply/applychoosemat',
        hidden: true,
        component: () => import('@/views/material-apply/ApplyChooseMat'),
        name: 'ApplyChooseMat',
        meta: {
          title: '投放申请-选择素材',
          activeMenu: '/material/matapply'
        },
        props(route) {
          return {
            matid: route.query.matid,
            matname: route.query.matname
          }
        }
      },

      // 投放记录部分路由
      {
        path: 'matrecord',
        component: () => import('@/views/material-record/MatRecord'),
        name: 'MatRecord',
        meta: {
          title: '投放记录',
          icon: 'wechat',
          affix: true
        }
      },
      {
        path: '/material/matlib/recorddetail',
        hidden: true,
        component: () => import('@/views/material-record/RecordDetail'),
        name: 'RecordDetail',
        meta: {
          title: '投放记录-详情',
          activeMenu: '/material/matrecord'
        },
        props(route) {
          return {
            matid: route.query.matid,
            matname: route.query.matname
          }
        }
      },
      {
        path: '/material/matlib/recordwithdraw',
        hidden: true,
        component: () => import('@/views/material-record/RecordWithdraw'),
        name: 'RecordWithdraw',
        meta: {
          title: '投放记录-撤回',
          activeMenu: '/material/matrecord'
        },
        props(route) {
          return {
            matid: route.query.matid,
            matname: route.query.matname
          }
        }
      },

    ]
  }
  ////////////////////素材投放end

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
