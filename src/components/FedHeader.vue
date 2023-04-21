<template>
    <!--顶部导航栏-->
    <el-row>
        <el-col :span="22" class="title">
            <h1>
                社联管理系统
            </h1>
        </el-col>
        <el-col :span="2" class="text">
            <el-button class="nav_button" color="#024886"><router-link style="text-decoration:none;color:#FFC353" to="/">退出登录</router-link></el-button>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "FedHeader",
    }
</script>

<style scoped>
.title{
    color: #023764;
    font-size: large;
    padding-left: 1vw;
}
    .nav_button{
        color: #fff;
        height: 30px;
        width: 80px;
    }
</style>