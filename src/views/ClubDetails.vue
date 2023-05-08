<template>
    <Nav />
    <el-container style="background:#FFC353">
        <el-header class="intro">
            <el-row class="row-bg" justify="space-between">
                <el-col :span="5">
                    <div class="g1"></div>
                </el-col>
                <el-col :span="14">
                    <div class="g2">
                        <el-card shadow="never" class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <el-col :span="5">
                                        <el-avatar shape="square" :size="50" :src="clubInfo.clubImageUrl" />
                                    </el-col>
                                    <el-col :span="14">
                                        <div class="title1" style="text-align:center">{{ clubInfo.clubName }}</div>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-row>
                                            <el-button class="card-header-button" v-if="role == null"
                                                @click="dialogFormVisible = true">申请加入
                                            </el-button>
                                            <el-button class="card-header-button" v-if="role == 2"
                                                @click="dialogFormVisible2 = true">注销社团
                                            </el-button>
                                            <el-button class="card-header-button" style="width:110px;" v-if="role == 0"
                                                @click="dialogFormVisible1 = true">申请成为管理员</el-button>
                                        </el-row>
                                        <el-row>
                                            <el-button class="card-header-button" v-if="role == 1 || role == 2"
                                                @click=clubAdmin>后台管理</el-button>
                                        </el-row>
                                    </el-col>
                                </div>
                            </template>
                            <div class="title2">社团简介</div>
                            <div>{{ clubInfo.clubInformation }}
                            </div>
                            <!-- 申请弹窗 -->
                            <el-dialog v-model="dialogFormVisible" title="入社申请" align-center draggable>
                                <el-form :model="application">
                                    <el-form-item label="申请理由" label-width="70px">
                                        <el-input v-model="application.joinApplyContent" autocomplete="off" />
                                    </el-form-item>
                                </el-form>
                                <template #footer>
                                    <span class="dialog-footer">
                                        <el-button @click="dialogFormVisible = false">取消</el-button>
                                        <el-button type="primary" @click="addApplication">
                                            确认
                                        </el-button>
                                    </span>
                                </template>
                            </el-dialog>
                            <!-- 申请成为管理员弹窗 -->
                            <el-dialog v-model="dialogFormVisible1" title="管理员申请" align-center draggable>
                                <el-form :model="adminApplication">
                                    <el-form-item label="申请理由" label-width="70px">
                                        <el-input v-model="adminApplication.adminApplyReason" autocomplete="off" />
                                    </el-form-item>
                                </el-form>
                                <template #footer>
                                    <span class="dialog-footer">
                                        <el-button @click="dialogFormVisible1 = false">取消</el-button>
                                        <el-button type="primary" @click="becomeAdmin">
                                            确认
                                        </el-button>
                                    </span>
                                </template>
                            </el-dialog>
                            <!-- 注销社团申请弹窗 -->
                            <el-dialog v-model="dialogFormVisible2" title="注销社团申请" align-center draggable>
                                <el-form :model="deleteApplication">
                                    <el-form-item label="申请理由" label-width="70px">
                                        <el-input v-model="deleteApplication.cancelApplyReason" autocomplete="off" />
                                    </el-form-item>
                                </el-form>
                                <template #footer>
                                    <span class="dialog-footer">
                                        <el-button @click="dialogFormVisible1 = false">取消</el-button>
                                        <el-button type="primary" @click="deleteClub">
                                            确认
                                        </el-button>
                                    </span>
                                </template>
                            </el-dialog>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="g3"></div>
                </el-col>
            </el-row>
        </el-header>

        <el-main>
            <el-row class="row-bg" justify="space-between">
                <!-- 社团资讯 -->
                <el-col :span="10">
                    <div class="g4">
                        <img width="200" src="../assets/clubdetails/message.png">
                        <el-timeline v-for="item in clubNewsList" :key="item.id" shadow="hover">
                            <el-timeline-item :timestamp="item.newsTime" placement="top">
                                <el-card>
                                    <h4>{{ item.newsTitle }}</h4>
                                    <p>{{ item.newsContent }}</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </el-col>

                <!-- 社团活动 -->
                <el-col :span="13">
                    <el-row justify="space-between" class="g5">
                        <el-col :span="6" class="g5-1"></el-col>
                        <el-col :span="16" class="g5-2">
                            <el-scrollbar max-height="350px">
                                <el-card class="activitybox" v-for="item in ActivityList" :key="item.id" shadow="hover">
                                    <template #header>
                                        <div class="activityboxtitle">
                                            <span>{{ item.activityTitle }}</span>
                                            <router-link to="/activitydetail" style="text-decoration:none;color:#fff;">
                                                <el-button color="#023764" class="button" icon="ArrowRightBold" circle>
                                                </el-button>
                                            </router-link>

                                            <!-- <el-button color="#023764" class="button" icon="ArrowRightBold" circle>
                                            </el-button> -->
                                        </div>
                                    </template>
                                    <el-row>
                                        <el-col class="textFather" :span="21">
                                            <div class="text">{{ item.activityDescription }}</div>
                                            
                                        </el-col>
                                        <el-col :span="3">
                                            <el-button class="button" color="#023764"
                                                @click="attentionActivity(item)">关注</el-button>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </el-scrollbar>
                        </el-col>
                    </el-row>
                    <el-row class="row-bg" justify="space-between">
                        <el-col :span="24" class="g5-3" @click="forum"></el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import Nav from '@/components/Nav.vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/index'

export default {
    name: "ClubDetails",
    components: {
        Nav,
    },
    data() {
        return {
            join: true,
            djoin: false,
            dialogFormVisible: false,
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            role: null,
            clubInfo: {
                clubId: 1,
                clubName: "",
                clubInformation: "",
                clubCreateTime: "",
                clubImageUrl: "",
            },

            clubNewsList: [{}],
            clubNews: {
                newsId: 1,
                clubId: 1,
                userId: 1,
                newsTime: "",
                newsTitle: "",
                newsContent: "",
            },

            ActivityList: [{}],
            Activity: {
                activityId: 1,
                activityTitle: "",
                activityDate: "",
                activityCampus: "",
                activityDescription: "",
            },

            application: {
                userId: 1,
                joinClubId: 1,
                joinApplyContent: "",
                joinApplyTime: "",
            },
            adminApplication: {
                userId: 1,
                adminClubId: 1,
                adminApplyReason: "",
                adminApplyTime: "",
            },
            deleteApplication: {
                userId: 1,
                clubId: 1,
                cancelApplyReason: "",
                cancelApplyTime: "",
            },
        }
    },
    methods: {
        //关注社团活动
        attentionActivity(activity) {
            console.log(activity.activityId)
            this.$axios({
                method: 'post',
                url: '/api/club-manage/my-activity',
                data: {
                    activityId: activity.activityId,
                    userId: localStorage.getItem("userId")
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        ElMessage({
                            message: "关注成功",
                            type: 'success',
                        })
                    } else {
                        ElMessage.error("已关注该活动")
                    }
                })
                .catch(function () {
                    ElMessage.error("操作失败")
                })
        },
        //申请加入社团
        clubAdmin() {
            if (this.role == 2) {
                this.$router.push('/org_clubinfo')
            }
            else {
                ElMessage.error("您没有权限！")
                return;
            }
        },
        //申请成为管理员
        becomeAdmin() {
            this.time = new Date();
            this.hour = this.time.getHours();
            this.minute = this.time.getMinutes();
            this.second = this.time.getSeconds();
            if (this.hour < 10) {
                this.hour = '0' + this.hour;
            }
            if (this.minute < 10) {
                this.minute = '0' + this.minute;
            }
            if (this.second < 10) {
                this.second = '0' + this.second;
            }
            this.adminApplication.adminApplyTime = (this.time.getFullYear() + '-' + this.time.getMonth() + '-' + this.time.getDate() + ' ' + this.hour + ':' + this.minute + ':' + this.second);

            console.log(this.adminApplication.joinApplyTime);
            if (this.adminApplication.adminApplyReason == "" || this.adminApplication.adminApplyReason == "") {
                ElMessage({
                    message: "不能为空！",
                    type: 'error',
                })
                return;
            }
            this.dialogFormVisible = false;

            this.$axios({
                method: 'post',
                url: '/api/club-manage/administrator',
                data: this.adminApplication,
            })
                .then(res => {
                    console.log(res.data.message);
                    if (res.data.code == 200) {
                        ElMessage({
                            message: res.data.message,
                            type: 'success',
                        })
                    } else {
                        ElMessage.error(res.data.message)
                    }
                    this.$router.go(0)
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        handleCurrentChange(val) {
            this.page = val
        },
        addApplication() {

            this.time = new Date();
            this.hour = this.time.getHours();
            this.minute = this.time.getMinutes();
            this.second = this.time.getSeconds();
            if (this.hour < 10) {
                this.hour = '0' + this.hour;
            }
            if (this.minute < 10) {
                this.minute = '0' + this.minute;
            }
            if (this.second < 10) {
                this.second = '0' + this.second;
            }
            this.application.joinApplyTime = (this.time.getFullYear() + '-' + this.time.getMonth() + '-' + this.time.getDate() + ' ' + this.hour + ':' + this.minute + ':' + this.second);

            console.log(this.application.joinApplyTime);
            if (this.application.joinApplyContent == "" || this.application.joinApplyTime == "") {
                ElMessage({
                    message: "不能为空！",
                    type: 'error',
                })
                return;
            }
            this.dialogFormVisible = false;

            this.$axios({
                method: 'post',
                url: '/api/club-manage/club-application',
                data: this.application,
            })
                .then(res => {
                    console.log(res.data.message);
                    if (res.data.code == 200) {
                        ElMessage({
                            message: res.data.message,
                            type: 'success',
                        })
                    } else {
                        ElMessage.error(res.data.message)
                    }
                    this.$router.go(0)
                })
                .catch(function (error) {
                    console.log(error);
                })
        },

        //进入论坛
        forum() {
            this.$router.push('/forum')
        },

        //注销社团
        deleteClub() {
            this.time = new Date();
            this.hour = this.time.getHours();
            this.minute = this.time.getMinutes();
            this.second = this.time.getSeconds();
            if (this.hour < 10) {
                this.hour = '0' + this.hour;
            }
            if (this.minute < 10) {
                this.minute = '0' + this.minute;
            }
            if (this.second < 10) {
                this.second = '0' + this.second;
            }
            this.deleteApplication.cancelApplyTime = (this.time.getFullYear() + '-' + this.time.getMonth() + '-' + this.time.getDate() + ' ' + this.hour + ':' + this.minute + ':' + this.second);

            if (this.deleteApplication.cancelApplyReason == "" || this.deleteApplication.cancelApplyReason == "") {
                ElMessage({
                    message: "不能为空！",
                    type: 'error',
                })
                return;
            }
            this.dialogFormVisible = false;

            this.$axios({
                method: 'post',
                url: '/api/club-manage/club-cancellation-application',
                data: this.deleteApplication,
            })
                .then(res => {
                    console.log(res.data.message);
                    if (res.data.code == 200) {
                        ElMessage({
                            message: res.data.message,
                            type: 'success',
                        })
                    } else {
                        ElMessage.error(res.data.message)
                    }
                    this.$router.go(0)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    },
    created() {
        this.clubNews.userId = localStorage.getItem("userId")
        this.application.userId = localStorage.getItem("userId")
        this.adminApplication.userId = localStorage.getItem("userId")
        this.clubInfo.clubId = localStorage.getItem("clubId"),
            this.clubNews.clubId = localStorage.getItem("clubId"),
            this.application.joinClubId = localStorage.getItem("clubId"),
            this.adminApplication.adminClubId = localStorage.getItem("clubId"),
            this.$axios({
                method: 'get',
                url: '/api/club-manage/club/' + localStorage.getItem("clubId"),
            })
                .then(res => {
                    console.log(res.data.data);
                    this.clubInfo = res.data.data;
                    console.log(this.clubInfo);
                })
                .catch(function (error) {
                    console.log(error);
                })

        this.$axios({
            method: 'get',
            url: '/api/club-manage/news/' + localStorage.getItem("clubId"),
        })
            .then(res => {
                console.log(res.data.data);
                this.clubNewsList = res.data.data;
                console.log(this.clubNewsList);
            })
            .catch(function (error) {
                console.log(error);
            })

        this.$axios({
            method: 'get',
            url: '/api/club-manage/activity/' + localStorage.getItem("clubId"),
        })
            .then(res => {
                console.log(res.data.data);
                this.ActivityList = res.data.data;
                console.log(this.ActivityList);
            })
            .catch(function (error) {
                console.log(error);
            })

        this.$axios({
            method: 'post',
            url: '/api/club-manage/permission',
            data: {
                userId: localStorage.getItem("userId"),
                clubId: localStorage.getItem("clubId")
            }
        })
            .then(res => {
                console.log("hhhhhhhh权限")
                console.log(res.data.data);
                if (res.data.code == 444) {
                    this.role = null;
                }
                else {
                    this.role = res.data.data
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    },
}
</script>


<style lang="scss" scoped>
body {
    margin: 0;
    padding: 0;
    background: #FFC353;
}

.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.intro {
    background-image: url("../assets/clubdetails/bgwhite.png");
    background-repeat: no-repeat;
    height: 550px;
    background-size: 100% 100%;
    background-position: center center;
}

.g1 {
    margin-top: 80px;
    border-radius: 4px;
    min-height: 400px;
    background-image: url("../assets/clubdetails/boy1.png");
    background-repeat: no-repeat;
    background-size: 90%;
    background-position: center center;
}

.g2 {
    margin-top: 40px;
    border-radius: 4px;
    min-height: 500px;
    background-image: url("../assets/clubdetails/blackboard.png");
    background-repeat: no-repeat;
    text-align: center;
    background-size: 100%;
    background-position: center center;
}

.box-card {
    position: relative;
    top: 85px;
    background-color: rgb(0, 0, 0, 0);
    border: 0ch;
    box-shadow: none;
    color: #ffffff;
    font-size: 16px;
    text-align: left;
    margin-top: 70px;
    margin: auto;
    width: 500px;
}

.card-header {
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header-button {
    background-color: #F86A39;
    color: #ffffff;
}

.title1 {
    font-weight: 550;
    color: #FFC353;
    font-size: 22px;

}

.title2 {
    margin-bottom: 10px;
    border-radius: 4ch;
    background-color: #F86A39;
    color: #ffffff;
    display: inline-block;
    font-size: 18px;
    padding: 2px 12px;
}

.item {
    margin-bottom: 18px;
}



.g3 {
    margin-top: 85px;
    border-radius: 4px;
    min-height: 400px;
    background-image: url("../assets/clubdetails/girl1.png");
    background-repeat: no-repeat;
    background-size: 70%;
    background-position: center center;
}

.g4 {
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 40px;
    min-height: 650px;
    background-image: linear-gradient(rgb(254, 248, 248, 0.95), rgb(254, 248, 248, 0.4));
    background-size: 100%;
    background-position: center center;
    padding: 20px;
}


.g5 {
    margin-left: 10px;
    border-radius: 40px;
    min-height: 400px;
    background-image: linear-gradient(to right, rgb(254, 248, 248, 0.95), rgb(254, 248, 248, 0.4));
    background-size: 100% 100%;
    background-position: center center;
}


.g5-1 {
    margin-bottom: 60px;
    min-height: 140px;
    background-image: url("../assets/clubdetails/activity.png");
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center center;
}

.g5-2 {
    margin: 25px;
    text-align: center;
}


.bottom {
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    float: right;
    padding: 10px;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    display: block;
}

.g5-3 {
    margin-left: 10px;
    border-radius: 20px;
    min-height: 260px;
    background-image: url("../assets/clubdetails/forum2.gif");
    border-style: dashed;
    border-color: #003867;
    border-width: 5px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
}

.infinite-list {
    height: 300px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}

.textFather {
    display: flex;
}

.text {
    font-size: 14px;
    font-weight: normal;
    align-self:center;
    display: -webkit-box;
    /* 垂直对齐 */
    -webkit-box-orient: vertical;
    /* 几行省略 */
    -webkit-line-clamp: 2;
    /* 超出隐藏 */
    overflow: hidden;
    /* 超出的文字省略号表示 */
    text-overflow: ellipsis;
}

.activitybox {

    margin-bottom: 8px;
}

.activityboxtitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
}

.activityboxtitle .button {
    color: #fff;
    height: 30px;
    width: 30px;
}

.button {
    color: #FFC353;
    width: 60px;
}

.button:hover {
    color: #FFC353;
}
</style>