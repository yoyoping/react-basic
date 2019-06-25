/*
 * @Description: 路由集中整理，这里的只是显示在Layout组件里面的路由，通过登录、权限动态生成路由
 * @Author: zhangping
 * @Date: 2019-06-11 20:08:52
 * @LastEditTime: 2019-06-25 11:37:27
 * @LastEditors: Please set LastEditors
 */
import { lazy } from 'react'

/**
 * 路由懒加载
 * @param {String} filename 文件路径
 */
 const lazyRouter = (filename: string) => {
  return lazy(() => import(`../pages/${filename}`))
 }

/**
 * path-访问的路径
 * name-名称
 * component-应用的组件
 * needLogin-是否需要登录
 * redirect-重定向
 * auth-能访问该路由的权限（没有就证明没有权限限制）
 */
const RouterMap = [
  { path: '/', name: '首页', component: lazyRouter('home/Index'), needLogin: false, redirect: null },
  { path: '/mine', name: '我的', component: lazyRouter('mine/Index'), needLogin: false, redirect: null },
  { path: '/list', name: '列表', component: lazyRouter('list/Index'), needLogin: false, redirect: null },
]

export default RouterMap
