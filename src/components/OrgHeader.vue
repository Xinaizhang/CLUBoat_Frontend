<template>
    <!--顶部导航栏-->
    <div class="header">
        <div class="headertitle">社团管理系统</div>
        <div class="personinfo">
            <router-link to="/details" style="position:absolute;left:0px">
                <el-button type="primary">返回社团详情</el-button>
            </router-link>
            <router-link to="/" style="position:absolute;right:30px">
                <el-button type="primary">退出登录</el-button>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrgHeader",
        data() {
            return {

                circleUrl:
                    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
            }
        },
    }
</script>

<style scoped>
    .header {
        display: flex;
        height: 60px;
        border: 1px solid #ccc;
        background-color: #fff;
        justify-content: space-between;
    }

    .headertitle {
        color: #003867;
        padding: 10px 10px 10px 20px;
        font-size: 25px;
        font-weight: bold;
        width: 200px;
    }

    .personinfo {
        position:relative;
        color: #000000;
        padding: 10px;
        font-size: 18px;
        width: 230px;
    }
</style>