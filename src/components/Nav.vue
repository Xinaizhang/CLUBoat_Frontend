<template>
    <div>
        <div class="header">
            <div class="box">
                <nav class="nav_text">
                    <router-link active-class="active" to="/home">主&emsp;&emsp;页</router-link>
                    <router-link active-class="active" to="/personInfo">个人中心</router-link>
                </nav>
                <div class="box_style"></div>
            </div>
            <h1 class="logo">
                <img src="../assets/logo.svg">
                <span>LUBoat</span>
            </h1>
            <div class="box2">
                <!-- <el-input v-model="input" class="search" placeholder="请输入关键字">
                <template #prefix>
                <el-icon class="el-input__icon"><search/></el-icon>
                </template>
                </el-input> -->
                <nav class="nav_icon">
                    <a href="/notification"><el-icon class="icon"><Bell /></el-icon></a>
                    <el-popover
                        placement="bottom"                    
                    >
                        <template #reference>
                            <el-avatar size="small" :src="userInfo.userPhotoUrl"/>
                        </template>
                        <el-row justify="center"><el-button class="btn" link><router-link class="text" to="/personInfo">个人中心</router-link></el-button></el-row>
                        <hr style="margin: 10px 0px;">
                        <el-row justify="center"><el-button class="btn" link><router-link class="text" to="/">退出登录</router-link></el-button></el-row>
                    </el-popover>
                </nav>
            </div>
            <div class="box_style2"></div>
            <div class="box_style2_top"></div>
        </div>
        <div class="contents">
            <div class="content">
                <!--指定组件的位置-->
                <router-view></router-view>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "NavHeader",
        data () {
            return {
                userInfo:{}
            }
        },   
        created(){
            console.log(localStorage.getItem('userId'));
            this.$axios({
                method: 'get',
                url: '/api/user-info/person-info/'+localStorage.getItem('userId'),
            })
            .then(res => {
                console.log(res.data.data);
                this.userInfo=res.data.data;
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }
</script>

<style scoped>

    .active[data-v-6e1afce0] {
        color: #009A61;
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        border-bottom:2px solid #ccc;
        background-color: #fff;
        /*吸顶效果*/
        /* position: sticky;
        position: -webkit-sticky;
        top: 0px;  */
    }
    .box{
        height: 60px;
        display: flex;
        align-items: center;
        vertical-align: middle;
        background-color: #023764;
        width: 55vw;
    }
    .box_style{
        width: 10vw;
        height: 60px;
        background-color: #fff;
        padding: 0px 7vw;
        border-radius: 0% 0% 60px 60px;
    }

    h1{
        width: 120px;
        height: 60px;
        line-height: 60px;
        background-color: #FFC353;
        color: #023764;
        display: flex;
        align-items: center;
        font: bolder 28px Cookie, Arial, Helvetica, sans-serif;
        padding: 0px 100px;
        border-radius: 0% 0% 60px 60px;
        margin-left: -250px;
    }
    img{
        width: 30px;
        height: 26px;
    }

    .nav_text {
        width: 530px;
        display: flex;
        align-items: center;
        text-align: center;
    }
    .nav_text a{
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        background: #FFC353;
        width: 100px;
        text-decoration:none;
        color: #023764;
        font-size: 16px;
        font-weight: bolder;
        margin-left: 20px;
    }

    .nav_text a:hover {
        background: #fab22d;
    }

    .box2{
        position: relative;
        left: 5vw;
        height: 50px;
        width: 28vw;
        display: flex;
        align-items: center;
        background-color: #fff;
        border-bottom:10px solid #023764;
        padding-left: 2vw;
        border-radius: 0px 0px 0px 10px;
    }

    .nav_icon {
        padding-right: 30px;
        display: flex;
        align-items: center;
        width: 120px;
        font-size: 20px;
        margin-left: 20vw;
    }

    .nav_icon a{
        width: 3vw;
        text-decoration:none;
        color: #023764;
        margin-left: 2vw;
    }

    .nav_icon a:hover {
        color: #055aa4;
    }
    .nav_icon .icon {
        margin-top: 1vh;
    }
    .nav_icon .icon:hover {
        cursor: pointer;
    }

    /*搜索框*/
    .search{
        width: 20vw;
        height: 26px;
        font-size: 16px;
        margin-right: 40px;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 3px #023764;
        border-radius: 4px;
    }
.btn{
    color: #FFC353;
    height: 30px;
    width: 80px;
}
.btn .text{
    text-decoration:none;
    color: #023764;
}
</style>
