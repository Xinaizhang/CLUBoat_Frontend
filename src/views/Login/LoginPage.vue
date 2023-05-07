<template>
    <div class="bg">
        <!-- 页面标语 -->
        <div class="headline">
            <div class="title">
                CLUBoat
            </div>
            <div class="subtitle">
                Enjoy Meeting You Here!
            </div>
        </div>
        <div class="container">
            <div class="form-box" :style="{ 'transform': form_style }">
                
                <!-- 注册 -->
                <div class="signup-box" :class="{ 'hidden': isHidden }">
                    <h2>Sign Up</h2>
                    <!-- <input type="text" placeholder="用户名"> -->
                    <input type="text" placeholder="手机号" v-model="user.userPhone">
                    <input type="password" placeholder="密码">
                    <input type="password" placeholder="确认密码" v-model="user.userPassword">
                    <button @click="userSignup">注册</button>
                </div>

                <!-- 登录 -->
                <div class="login-box" :class="{ 'hidden': !isHidden }">
                    <h2>Login</h2>
                    <input type="text" placeholder="账号" v-model="loginInfo.loginAccount">
                    <input type="password" placeholder="密码" v-model="loginInfo.inputPassword">
                    <div style="margin-top: 20px">
                        <el-radio-group v-model="authority" size="small" text-color="#023764" fill="rgba(255, 222, 7, 0.65)">
                            <el-radio-button color="#fff" label="用户" />
                            <el-radio-button label="管理" />
                        </el-radio-group>
                    </div>
                    <button @click="userLogin">登录</button>
                </div>
            </div>
            <!-- 登录引导 -->
            <div class="con-box left">
                <h2>欢迎来到<span>CLUBoat</span></h2>
                <p>这里是一个一站式社团服务平台</p>
                <el-row justify="center"><img style="width:16vw;" src="../../assets/CLUBOAT2.png" alt=""/></el-row>
                
                <!-- <p class="p2">Hey!</p> -->
                <p class="p2 p3">Hey! Sign up here👉🏻</p>
                <p id="alter">已有账号</p>
                <button id="login" @click='toLogin'>去登录</button>
            </div>

            <!-- 注册引导 -->
            <div class="con-box right">
                <h2>欢迎来到<span>CLUBoat</span></h2>
                <p>你的一站式社团生活平台</p>
                <el-row justify="center"><img style="width:16vw;" src="../../assets/CLUBOAT2.png" alt=""/></el-row>
                <!-- <p class="p2">Hey!</p> -->
                <p class="p2 p3">👈🏻Hey! Login here</p>
                <p id="alter">没有账号?</p>
                <button id="signup" @click='toSignup'>去注册</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/index'
import { ref } from 'vue'

export default {
    name: 'LoginPage',
    data() {
        const authority=ref("用户")  // **
        return {
            form_style: '',
            authority,
            isHidden: true,
            userId: 0,
            user: {
                userId: 0,
                userPhone: '',
                userPassword: ''
            },
            loginInfo: {
                isAdmin: 0,
                loginAccount: '',
                inputPassword: '',
            },
        }
    },
    methods: {
        toSignup: function () {
            // alert("test");
            this.form_style = 'translateX(80%)';
            this.isHidden = false;
        },
        toLogin: function () {
            this.form_style = 'translateX(0%)';
            this.isHidden = true;
        },
        toHome: function () {
            this.$router.replace('/home')
        },
        test1: function () {
            alert(this.user.userPhone)
        },
        userSignup: function () {
            this.$axios({
                method: 'post',
                url: '/api/user-login/user',
                data: {
                    userPhone: this.user.userPhone,
                    userPassword: this.user.userPassword
                }
            }).then(res => {
                console.log(res)
                if(res.data.code==200){
                    console.log(res.message)
                    ElMessage({
                        message: '注册成功',   // ** not working!
                        type: 'success',
                    })
                }else{
                    ElMessage({
                        message: '该手机已注册，请登录账号',   // ** not working!
                        type: 'error',
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        userLogin: function () {
            if (this.authority=="管理"){  // **
                this.loginInfo.isAdmin=1
                console.log(this.loginInfo.isAdmin)
            }
            else{
                this.loginInfo.isAdmin=0
                console.log(this.loginInfo.isAdmin)
            }
            this.$axios({
                method: 'post',
                url: '/api/user-login/login',
                data: {
                    isAdmin: this.loginInfo.isAdmin,
                    loginAccount: this.loginInfo.loginAccount,
                    inputPassword: this.loginInfo.inputPassword,
                }
            }).then(res => {
                console.log(res.data)
                this.$store.commit("setUserId", res.data.data);
                console.log(this.$store.state.userId);
                localStorage.setItem('userId',res.data.data);
                console.log(localStorage.getItem('userId'));
        
                if(res.data.code==200){
                    console.log(res.message)
                    this.userId = res.data.data.userId
                    if(this.loginInfo.isAdmin==0){
                        this.$router.replace('/home')
                    }
                    else if(this.loginInfo.isAdmin==1){
                        this.$router.replace('/clubFederation/clubAdmin')
                    }
                    ElMessage({
                        message: '登录成功',   // ** not working!
                        type: 'success',
                    })
                }else{
                    ElMessage({
                        message: '登录失败，账号或密码错误',   // ** not working!
                        type: 'error',
                    })
                }
            })
                .catch(function (error) {
                    console.log(error)
                })
        }

    }
}


</script>

<style scoped>
.bg {
    margin: 0;
    padding: 0;
    /* 100% window height */
    height: 100vh;
    /* flex layout & vertical center align */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* gradient background */

    background: #e1eec3;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #f05053, #e1eec3);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #fffeaf, #e3ffc6, #bee9ff);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    /* 
    background: #70e1f5; 
    background: -webkit-linear-gradient(to right, #fffdc7, #b9f4ff); 
    background: linear-gradient(to right, #fffdc7, #b9f4ff);  */

}

.title {
    color: #202c68;
    font-size: 55px;
    font-weight: 100;
    letter-spacing: 12px;
    /* margin-bottom: 5px; */
    text-align: center;
    font-family: 'Avenir';
}

.subtitle {
    color: #202c68;
    font-size: 18px;
    font-weight: 100;
    letter-spacing: 3px;
    margin-bottom: 70px;
    text-align: center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.container {
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(5px);
    width: 650px;
    height: 415px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(50, 50, 50, 0.1);
    position: relative;
    margin-bottom: 60px;
}

.signup-box,
.login-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.form-box {
    position: absolute;
    top: -10%;
    left: 4%;
    background: linear-gradient(to bottom, #fffee1, #fbf1af);

    width: 330px;
    height: 480px;
    border-radius: 15px;
    box-shadow: 2px 0 10px rgba(50, 50, 50, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    /* animation style */
    transition: 0.5s ease-in-out;
}

h2 {
    color: #202c68;
    letter-spacing: 4px;
    text-align: center;
    margin-bottom: 35px;
    font-size: 60px;
    font-weight: 800;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}


input {
    background-color: transparent;
    width: 70%;
    color: #202c68;
    border: none;
    /* bottom border style */
    border-bottom: 1px solid rgba(13, 16, 86, 0.4);
    padding: 10px 0;
    text-indent: 10px;
    margin: 8px 0;
    font-size: 12px;
    letter-spacing: 1px;
}

input::placeholder {
    color: #202c68;
}

input:focus {
    color: #6596c8;
    outline: none;
    border-bottom: 1px solid #e9b10a;
    transition: 0.5s;
}

input:focus::placeholder {
    opacity: 0;
}

.form-box button {
    width: 45%;
    margin-top: 35px;
    background-color: rgba(255, 222, 7, 0.65);
    /* outline: none; */
    /* outline: #202c68; */
    /* border: 1px solid #fede12; */
    border-radius: 25px;
    padding: 13px;
    color: #50504f;
    letter-spacing: 2px;
    border: none;
    cursor: pointer;
}

.form-box button:hover {
    background-color: #e9b10a;
    color: beige;
    transition: background-color 0.5s ease;
}

.con-box {
    width: 50%;
    /* flex layout & vertical center align */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* absolute locating, center */
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: 0.5s ease-in-out;
}

.con-box.left {
    left: -2%;
    transition: 0.5s ease-in-out;
}

.con-box.right {
    right: -2%;
    transition: 0.5s ease-in-out;
}

.con-box h2 {
    color: rgb(18, 72, 139);
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 4px;
    margin-top: 50px;
}

.con-box p {
    color: rgb(18, 72, 139);
    font-size: 13px;
    font-weight: 200;
    letter-spacing: 3px;
    text-align: center;
}

.con-box .p2 {
    font-size: 17px;
    font-weight: 400;
    letter-spacing: 1px;
    font-family: 'Avenir';
}

.con-box .p3 {
    margin-bottom: 75px;
}

#alter {
    /* margin-top: 10px; */
    letter-spacing: 1px;
    color: #e9b10a;
}

.con-box span {
    color: rgb(136, 168, 206);
}

.con-box img {
    width: 364px;
    height: 122px;
    align-self: center;
    justify-content: center;
    /* position: relative; */
    margin-top: 5px;
}

.con-box button {
    margin-top: 2%;
    background-color: #fff;
    color: #e9b10a;
    border: 1px solid #fdedbc;
    padding: 5px;
    padding-left: 13px;
    padding-right: 13px;
    border-radius: 20px;
    letter-spacing: 1px;
    outline: none;
    cursor: pointer;
    font-size: 10px;
    font-weight: 200;
}

.con-box button:hover {
    background-color: #fdedbc;
    color: #ffffff;

}

.hidden {
    display: none;
    transition: 0.5s;
}
</style>