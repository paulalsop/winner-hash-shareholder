import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes.js';
import {
	UseStoreWeb3js,
} from '@/stores/web3js';
// import { storeToRefs } from "pinia";
const router = createRouter({
	routes,
	history: createWebHashHistory(),
	scrollBehavior: () => ({
		top: 0,
		left: 0,
		behavior: 'smooth',
	}),
});
const whiteRathPathList = ['/', '/homepage' ];

router.beforeEach(async (to, from, next) => {
	const storeEth = UseStoreWeb3js();
	const { startWeb3, userAddress } = storeEth;
	if (!userAddress && !whiteRathPathList.includes(to.path)) {
		try {
			console.log('router beforeEach--- 没有就去请求');
			const queryWeb3 = await startWeb3();
			console.log('router beforeEach--- queryWeb3:', queryWeb3);
			if (queryWeb3) {
				next();
			} else {
				next('/');
			}
		} catch (error) {
			console.error(error);
			next('/');
		}
	} else {
		next();
	}
});
router.afterEach((to) => {
	document.title = `${to.meta.title} - winner hash `;
});

export default router;
