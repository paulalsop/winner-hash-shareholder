<template>
    <div class="head-nav">
        <img class="logo" src="@/assets/WinnerHash.png" alt="">
        <button class="button">链接钱包</button>
    </div>
</template>

<script setup>

</script>
<style lang='scss' scoped>
.head-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #000;
    .logo {
        width: 90px;
    }
    .button {
        background-color: #383838;
        color: #fff;
        font-size: 12px;
        padding: 4px 12px;
        border-radius: 4px;
    }
}
</style>
