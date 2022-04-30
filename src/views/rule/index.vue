<template>
    <div class="view">
        <h1 class="view-title theme-text-gold text-center">规则说明</h1>
        <div class="grid-center">
            <ul class="rule">
                <li v-for="(item, index) in rules" :key="index">
                    <div class="index">
                        <span>{{ index }}</span>
                    </div>
                    <p>{{ item }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const rules = [
    '用户购买的股权会用作WINNER哈希平台的奖励底池',
    '每24小时会结算一次股东收益',
    '收益计算方式=平台收益X股份占比',
    '当平台收益为负数时，会扣除用户购入的股权本金',
    '用户可以在固定的时间内购买和提取股权本金',
    '平台亏损不会超出所有地址拥有的股权总价值',
]
</script>
<style lang='scss' scoped>
.view-title {
    margin: 20px 0 40px;
}
.grid-center {
    background-color: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
}
.rule {
    padding: 90px 0 120px;
    color: #fff;
    li {
        display: flex;
        font-size: 20px;
        margin-bottom: 20px;

        .index {
            margin-right: 40px;
            width: 34px;
            height: 34px;
            transform: rotateZ(45deg);
            border: 1px solid #c1a875;
            span {
                display: block;
                transform: rotateZ(-45deg) translate(-2px, 2px);
                text-align: center;
            }
        }
        @media screen and (max-width: 768px) {
            font-size: 12px;
            .index {
                width: 20px;
                height: 20px;
                span {
                    transform: rotateZ(-45deg) translate(-1px, 1px);
                }
            }
        }
    }
}
</style>
