<template>
	<div class="view limit-max-width-media">
		<h1 class="theme-text-gold text-center">购买股权</h1>
		<h1 class="text-center join-time">{{ joinTime }}</h1>
		<div class="g-grid">
			<div class="shadow-card g-col-2">
				<h3>总股本</h3>
				<p>{{ totalSharesPerTokenWei }} USDT</p>
			</div>
			<div class="shadow-card g-col-2">
				<h3>平台余额</h3>
				<p>{{ totalbalancePerTokenWei }} USDT</p>
			</div>
		</div>
		<div class="g-grid">
			<div class="shadow-card g-col-2">
				<h3>当前利润</h3>
				<p>{{ currentTotalbalance }} USDT</p>
			</div>
		</div>

		<div class="gold-card">
			<div class="form-call">
				<p class="theme-text-gold">
					<span>已购股份</span>
					<span>{{ sharesWei }}USDT</span>
				</p>
				<button class="theme-bg-gold" @click="shareholderWithdrawal">提现</button>
			</div>
			<div class="form-call">
				<p class="theme-text-gold">
					<span>占比</span>
					<span>{{ sharesProportion }}%</span>
				</p>
			</div>
			<div class="form-call">
				<p class="theme-text-gold">
					<span>可领取收益</span>
					<span>{{ erc20ReWordsWei }}USDT</span>
				</p>
				<button class="theme-bg-gold" @click="shareholderInterest">领取</button>
			</div>
			<div class="form-call">
				<p class="theme-text-gold">
					<span>已领取收益</span>
					<span>{{ erc20ReleasedWei }}USDT</span>
				</p>
			</div>
			<div class="form-call">
				<input type="number" placeholder="请输入购买的股份" v-model="joinAmount" />
				<button class="theme-bg-gold" @click="joinShareholder">购买</button>
				<!-- no.4 -->
			</div>
			<!-- <p class="ps-gray text-center">每次只能购入1000-10000USDT</p> -->
		</div>
	</div>
</template>

<script setup>
// @ utils
import { lockLoadHandler, PlusElMessage } from "@/utils/PlusElement";

// @ stores
import { UseStoreWeb3js } from "@/stores/web3js"
import { storeToRefs } from "pinia";

// @ plugins
import { ref, watch, computed, onMounted } from "vue"

// @ abis
import { AbiAddressUSDT } from "@/abis"

const storeWeb3 = UseStoreWeb3js()
const { web3, Contracts, userAddress, todoInit } = storeToRefs(storeWeb3)
function FromWei(str) {
	if (web3.value) {
		return web3.value.utils.fromWei(str) || ''
	}
	return ''
}
function ToWei(str) {
	if (web3.value) {
		return web3.value.utils.toWei(str) || ''
	}
	return ''
}

// *** 面板数据 <

// 股份分配额
// get_shares no.1
const shares = ref('0')
const sharesWei = computed(() => FromWei(shares.value))
const sharesProportion = computed(() => {
	return sharesWei.value / totalSharesPerTokenWei.value * 100
})
async function getShares() {
	try {
		const { HashContract } = Contracts.value
		const res = await HashContract.methods.get_shares(
			AbiAddressUSDT,
			userAddress.value
		).call()
		shares.value = res
		console.log("getShares:-->", res);
	} catch (e) {
		console.error(e);
	}
}
// 股东资金分红可领取金额
// get_erc20ReWords
const erc20ReWords = ref('0')
const erc20ReWordsWei = computed(() => FromWei(erc20ReWords.value))
async function getErc20ReWords() {
	try {
		const { HashContract } = Contracts.value
		const res = await HashContract.methods.get_erc20ReWords(
			AbiAddressUSDT,
			userAddress.value
		).call()
		console.log("getErc20ReWords:-->", res);
		erc20ReWords.value = res
	} catch (e) {
		console.error(e);
	}
}
// 股东资金分红已经领取金额
// get_erc20Released
const erc20Released = ref('0')
const erc20ReleasedWei = computed(() => FromWei(erc20Released.value))
async function getErc20Released() {
	try {
		const { HashContract } = Contracts.value
		const res = await HashContract.methods.get_erc20Released(
			AbiAddressUSDT,
			userAddress.value
		).call()
		console.log("getErc20Released:-->", res);
		erc20Released.value = res
	} catch (e) {
		console.error(e);
	}
}
// 获取可以入股和提现的时间段
// get_join_time()
const joinTimeLeft = ref(0)
const joinTimeRight = ref(0)
const joinTime = computed(() =>
	joinTimeRight.value - joinTimeLeft.value <= 0 ?
		'暂停交易' :
		`交易时间：${joinTimeLeft.value}时 - ${joinTimeRight.value}时`
)
async function getJoinTime() {
	try {
		const { HashContract } = Contracts.value
		const res = await HashContract.methods.get_join_time().call().then(res => res.map(item => parseInt(item)))
		console.log("get_join_time:-->", res);
		joinTimeLeft.value = res[0]
		joinTimeRight.value = res[1]
	} catch (e) {
		console.error(e);
	}
}


// 股东记录
// get_Shareholder_record_info
async function getShareholderRecordInfo() {
	try {
		const { HashContract } = Contracts.value
		const res = await HashContract.methods.get_Shareholder_record_info(
			userAddress.value,
			AbiAddressUSDT,
		).call()
		console.log("getShareholderRecordInfo:-->", res);
	} catch (e) {
		console.error(e);
	}
}

// 起初股本金额
// get_totalSharesPerToken
const totalSharesPerToken = ref('0')
const totalSharesPerTokenWei = computed(() => FromWei(totalSharesPerToken.value))
async function getTotalSharesPerToken() {
	try {
		const { HashContract } = Contracts.value
		const res = await HashContract.methods.get_totalSharesPerToken(AbiAddressUSDT).call()
		console.log("getTotalSharesPerToken:-->", res);
		totalSharesPerToken.value = res
	} catch (e) {
		console.error(e);
	}
}
// 实时资金池流水总额
// get_totalbalancePerToken
const totalbalancePerToken = ref('0')
const totalbalancePerTokenWei = computed(() => FromWei(totalbalancePerToken.value))
async function getTotalbalancePerToken() {
	try {
		const { HashContract } = Contracts.value
		const res = await HashContract.methods.get_totalbalancePerToken(AbiAddressUSDT).call()
		console.log("getTotalbalancePerToken:-->", res);
		totalbalancePerToken.value = res
	} catch (e) {
		console.error(e);
	}
}
const currentTotalbalance = computed(() => totalbalancePerTokenWei.value - totalSharesPerTokenWei.value)
// *** 面板数据 />


// *** 交互 <

// Shareholder_withdrawal no.2
// 提现
async function shareholderWithdrawal() {
	const load = lockLoadHandler('send loading...');
	try {
		const { HashContract } = Contracts.value
		const res = await HashContract.methods.Shareholder_withdrawal(
			userAddress.value,
			AbiAddressUSDT,
		).send({
			from: userAddress.value
		})
		if (res.status) {
			PlusElMessage({
				type: 'success',
				message: 'success'
			})
			init(todoInit.value)
		} else {
			PlusElMessage({
				type: 'error',
				message: 'failed'
			})
		}
		load.close()
		console.log("getShares:-->", res);
	} catch (e) {
		console.error(e);
		load.close()
	}
}
// join_shareholder no.4
// 购买
const joinAmount = ref(0)
async function joinShareholder() {
	const load = lockLoadHandler('send loading...');
	try {
		const { HashContract } = Contracts.value
		const amount = ToWei(joinAmount.value.toString())
		const res = await HashContract.methods.join_shareholder(
			userAddress.value,
			AbiAddressUSDT,
			amount,
		).send({
			from: userAddress.value
		})
		if (res.status) {
			PlusElMessage({
				type: 'success',
				message: 'success'
			})
			joinAmount.value = 0
			init(todoInit.value)
		} else {
			PlusElMessage({
				type: 'error',
				message: 'failed'
			})
		}
		load.close()
		console.log("getShares:-->", res);
	} catch (e) {
		console.error(e);
		load.close()

	}
}
// shareholder_interest
// 领取
async function shareholderInterest() {
	const load = lockLoadHandler('send loading...');
	try {
		const { HashContract } = Contracts.value
		const res = await HashContract.methods.shareholder_interest(
			userAddress.value,
			AbiAddressUSDT,
		).send({
			from: userAddress.value
		})
		if (res.status) {
			PlusElMessage({
				type: 'success',
				message: 'success'
			})
			init(todoInit.value)
		} else {
			PlusElMessage({
				type: 'error',
				message: 'failed'
			})
		}
		load.close()
		console.log("shareholderInterest:-->", res);
	} catch (e) {
		console.error(e);
		load.close()
	}
}

// *** 交互 />

async function init(bool = true) {
	if (!bool) return
	const load = lockLoadHandler('init loading...');
	try {
		const { HashContract } = Contracts.value
		console.log(HashContract.methods);
		await getShares()
		await getErc20ReWords()
		await getErc20Released()
		await getShareholderRecordInfo()
		await getTotalSharesPerToken()
		await getTotalbalancePerToken()
		await getJoinTime()
		load.close()
	} catch (e) {
		console.error(e);
		load.close()
	}
}
watch(() => todoInit.value, (n, o) => {
	if (n && n != o) init(n)
})
onMounted(() => {
	init(todoInit.value)
})
</script>

<style lang='scss' scoped>
.view {
	color: #fff;
	padding-block: 20px;
}
.shadow-card {
	background-image: linear-gradient(45deg, #242424, #0f0f0f, #242424);
	border-radius: 8px;
	padding: 8px 12px;
	margin-bottom: 20px;
}
.gold-card {
	border-radius: 16px;
	border: 1px solid #ccaa78;
	padding: 40px;
	background-color: #0f0f0f;
	@media screen and (max-width: 768px) {
		padding: 20px 15px;
	}
}

.join-time {
	padding: 20px 0;
}

.form-call {
	// display: grid;
	// grid-template-columns: auto 154px;
	display: flex;
	height: 80px;
	margin-bottom: 20px;
	input,
	p {
		width: 100%;
		border: 1px solid #bebebe;
		padding: 0 20px;
		font-size: 20px;
	}
	p {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: bold;
	}
	button {
		width: 154px;
	}
	input {
		// background-color: transparent;

		// color: #fff;
		&::placeholder {
			color: #999;
		}
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	input[type="number"] {
		-moz-appearance: textfield;
	}
	@media screen and (max-width: 768px) {
		p {
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			// width: calc(100% - 80px);
		}
		button {
			width: 100px;
		}
	}
}
.g-grid {
	@media screen and (min-width: 769px) {
		display: flex;
		& > *:not(:last-child) {
			margin-right: 20px;
		}
		.g-col-2 {
			flex: 1;
		}
	}
}
// .ps-gray {
// 	color: #999;
// }
</style>
