import Layout from '@/layout/index.vue';
const routes = [
	{
		path: '/',
		name: 'Layout',
		component: Layout,
		redirect: '/homepage',
		children: [
			{
				path: '/homepage',
				name: 'homepage',
				component: () => import('@/views/homepage/index.vue'),
				meta: {
					title: '首页',
				},
			},
			{
				path: '/namesTable',
				name: 'namesTable',
				component: () => import('@/views/namesTable/index.vue'),
				meta: {
					title: '股东名单',
				},
			},
			{
				path: '/rule',
				name: 'rule',
				component: () => import('@/views/rule/index.vue'),
				meta: {
					title: '股东名单',
				},
			},
			{
				path: "/demo",
				name: "demo",
				component: () => import("@/views/demo/index.vue"),
				meta: {
					title: "测试",
				},
			},
		],
	},
	{
		path: '/error/404',
		name: 'error404',
		component: () => import('@/views/errorPage/404.vue'),
		meta: {
			title: '错误页面-找不到资源',
		},
	},
	{
		path: '/:catchAll(.*)',
		redirect: '/error/404',
	},
];
export default routes;
