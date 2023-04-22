<template>
    <el-container class="" style="height: 100vh">
        <el-header class="header">
            <FedNav/>
        </el-header>

        <el-container>
            <el-aside width="15vw">
                <el-menu class="el-menu" default-active="/clubFederation/notification" router=true style="height: 100%;"
                    active-text-color="#023764" background-color="#fff" text-color="#023764" open="1">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <Ship />
                            </el-icon>
                            <span class="menu-item1">社团管理</span>
                        </template>
                        <el-menu-item-group>
                            <template #title>
                                <span class="menu-item">权限管理</span>
                            </template>
                            <el-menu-item class="menu-item2" index="/clubFederation/clubAdmin">&emsp;设置社长</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template #title>
                                <span class="menu-item">审批申请</span>
                            </template>
                            <el-menu-item class="menu-item2" index="/clubFederation/clubBuild">&emsp;创建社团</el-menu-item>
                            <el-menu-item class="menu-item2" index="/clubFederation/clubCancel">&emsp;社团注销</el-menu-item>
                            <el-menu-item class="menu-item2" index="/clubFederation/activity">&emsp;活动申请</el-menu-item>
                            <el-menu-item class="menu-item2" index="/clubFederation/reim">&emsp;报销申请</el-menu-item>
                            <el-menu-item class="menu-item2" index="/clubFederation/budget">&emsp;预算申请</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-menu-item index="/clubFederation/notification">
                        <template #title>
                            <el-icon>
                                <Bell />
                            </el-icon>
                            <span class="menu-item1">系统通知</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/clubFederation/pubnot">
                        <template #title>
                            <el-icon>
                                <Reading />
                            </el-icon>
                            <span class="menu-item1">公告管理</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main style="background-color: #F0F1F6;">
                    <el-card class="card">
                        <template #header>
                            <div class="card-header">
                                <span class="title">通知列表</span>
                                <el-button class="button" color="#023764" @click="dialogFormVisible = true">发布通知</el-button>
                            </div>
                        </template>
                        <el-table :data="notificationList.slice((page - 1) * limit, page * limit)"
                            :default-sort="{ prop: 'notificationTime', order: 'descending' }" style="width: 100%"
                            size="large" height="430">
                            <el-table-column label="序号" type="index" width="150" />
                            <el-table-column prop="sendUserId" label="用户ID" sortable width="170" />
                            <el-table-column prop="notificationTitle" label="标题" />
                            <el-table-column prop="notificationContent" label="内容" />
                            <el-table-column prop="notificationTime" sortable label="发布时间" />
                        </el-table>
                        <el-row justify="center">
                            <div class="pagination">
                                <div class="pagination_style">&emsp;</div>
                                <el-pagination :current-page="page" :page-size="limit" background layout="prev, pager, next"
                                    :total="total" @current-change="handleCurrentChange" />
                            </div>
                        </el-row>
                        <el-dialog v-model="dialogFormVisible" title="发布通知" align-center draggable>
                            <el-form :model="notification">
                                <el-form-item label="通知标题" label-width="70px">
                                    <el-input v-model="notification.notificationTitle" autocomplete="off" />
                                </el-form-item>
                                <el-form-item label="通知内容" label-width="70px">
                                    <el-input v-model="notification.notificationContent" autocomplete="off" type="textarea"
                                        :rows="6" />
                                </el-form-item>
                                <el-form-item label="选择用户" label-width="70px">
                                    <el-select v-model="notification.receiverId" placeholder="选择用户" class="select">
                                        <!-- group notification selection -->
                                        <el-option label="全体用户" :value=(-1)>全体用户</el-option>

                                        <el-option v-for="item in userList" :key="item.userId" :label="item.userId"
                                            :value="item.userId" class="select">
                                            <span style="float: left">UID：{{ item.userId }}</span>
                                            <span style="
                                                    float: right;
                                                    color: var(--el-text-color-secondary);
                                                    font-size: 13px;
                                                    ">
                                                {{ item.userName }}
                                                <el-avatar :size="30" :src="item.userPhotoUrl" />
                                            </span>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                            <template #footer>
                                <span class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取消</el-button>
                                    <el-button type="primary" @click="addNotification">
                                        确认
                                    </el-button>
                                </span>
                            </template>
                        </el-dialog>
                    </el-card>
                </el-main>

            </el-container>


        </el-container>

    </el-container>
</template>
    
<script>
import FedNav from '@/components/FedHeader.vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/index'

export default {
    name: "clubFederationNotification",
    components: {
        FedNav
    },
    data() {
        return {
            page: 1,
            limit: 8,
            total: 6,
            notificationList: [{}],
            userList: [{}],
            dialogFormVisible: false,
            notification: {
                sendAdminId: 1,
                sendUserId: null,
                senderType: 1,
                receiverType: null,
                receiverId: null,
                notificationTitle: "",
                notificationContent: ""
            },
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.page = val
        },
        addNotification() {
            if (this.notification.notificationContent == "" || this.notification.notificationTitle == "" || this.notification.receiver_id == null) {
                ElMessage({
                    message: "不能为空！",
                    type: 'error',
                })
                return;
            }

            // set send mode
            if (this.notification.receiverId == -1) { // to all users
                this.notification.receiverId = null;
                this.notification.receiverType = 0;
            }
            else {
                this.notification.receiverType = 2 // to specific user
            }

            this.dialogFormVisible = false;

            this.$axios({
                method: 'post',
                url: '/api/examine/notification',
                data: this.notification,
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
    },
    created() {
        this.$axios({
            method: 'get',
            url: '/api/examine/notification',
        })
        .then(res => {
            console.log(res.data.data);
            this.notificationList=res.data.data;
            this.total=res.data.data.length;
        })
        .catch(function (error) {
            console.log(error);
        })

        this.$axios({
            method: 'get',
            url: '/api/user-info/person-info',
        })
        .then(res => {
            console.log(res.data.data);
            this.userList=res.data.data;
        })
        .catch(function (error) {
            console.log(error);
        })
    },
}
</script>

<style scoped>
.header {
    width: 100%;
    height: 10vh;
    line-height: 10vh;
    border-bottom: 2px solid gainsboro;
}

.header .title {
    color: #023764;
    font-size: large;
    padding-left: 1vw;
}


.menu-item1 {
    font-size: large;
}

.menu-item2 {
    color: #023764;
    font-size: medium;
}

.el-menu-item.is-active {
    background-color: #023764;
    color: #FFC353;
}

.card {
    height: 99%;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
}

.card-header .title {
    padding-left: 10px;
    color: #023764;
    border-left: 8px solid #FFC353;
    font-size: 20px;
}

.card-header .button {
    color: #FFC353;
    height: 30px;
    width: 80px;
}

.select {
    width: 300px;
}

.pagination {
    --el-color-primary: #024886;
    display: block;
    margin: 0 auto;
}

.el-pagination {
    --el-pagination-font-size: 16px;
    --el-pagination-button-color: #024886;
    --el-pagination-button-disabled-bg-color: #fff;
    --el-pagination-button-bg-color: #fff;
    --el-pagination-hover-color: #167fdb;
}
</style>