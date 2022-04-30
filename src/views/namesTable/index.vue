<template>
    <div class="view limit-max-width-media">
        <h1 class="view-title theme-text-gold text-center">股权购买结算倒计时</h1>
        <div class="table theme-bg-gary">
            <ul class="table-head bold">
                <li>钱包地址</li>
                <li>购买数量</li>
                <li>占比</li>
            </ul>
            <ul class="table-body">
                <!-- <li class="table-body-th" v-for="(item, index) in tableList" :key="index">
                    <p class="call theme-text-title">{{ item.t_address }}</p>
                    <p class="call theme-text-title">{{ item.rman }}</p>
                    <p class="call theme-text-title">{{ item.lnav }}</p>
                </li>-->
                <li class="table-body-th" v-for="(item, index) in 3" :key="index">
                    <p class="call theme-text-title">123456</p>
                    <p class="call theme-text-title">123456</p>
                    <p class="call theme-text-title">123456</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>

</script>
<style lang='scss' scoped>
.view-title {
    margin: 20px 0 40px;
}
.table {
    border-radius: 8px;
    // font-size: 12px;
    padding: 12px;
    .table-head,
    .table-body .table-body-th {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        margin-bottom: 10px;
        text-align: center;
    }
    .table-head {
        font-size: 20px;
        padding-bottom: 12px;
        border-bottom: 1px solid #999;
        color: #999;
    }
    .table-body .call {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #fff;
    }
}
</style>
