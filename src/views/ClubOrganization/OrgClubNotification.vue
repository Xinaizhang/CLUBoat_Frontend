<template>
    <OrgHeader />

    <el-row style="background:#EEEEEE">
        <OrgNav />
        <el-col :span="20" class="main">

            <el-card class="box-card-1">
                <template #header>
                    <div class="card-header">
                        <span>通知管理</span>
                        <el-button class="button" color="#023764" @click="dialogFormVisible = true">发布通知</el-button>
                    </div>
                </template>

                <el-table :data="notificationList.slice((page - 1) * limit, page * limit)"
                    :default-sort="{ prop: 'notificationTime', order: 'descending' }" style="width: 100%" size="large"
                    height="430">
                    <el-table-column label="序号" type="index" width="80" />
                    <el-table-column prop="sendAdminId" label="接收用户" width="100" />
                    <el-table-column prop="sendUserId" label="发送用户" width="100" />
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
                                <!-- group notification selection-->
                                <el-option label="全体社团成员" :value=(-1)>全体社团成员</el-option>

                                <el-option v-for="item in userList" :key="item.userId" :label="item.userId"
                                    :value="item.userId" class="select">
                                    <span style="float: left">UID：{{ item.userId }} &nbsp;{{ item.userName }}</span>
                                    <span style="float: right;color: font-size: 13px;">
                                        <el-tag :type="warning" class="mx-1" effect="light" round
                                            v-if="item.permission == 2">
                                            社长
                                        </el-tag>
                                        <el-tag :type="warning" class="mx-1" effect="light" round
                                            v-if="item.permission == 1">
                                            管理员
                                        </el-tag>
                                        <el-tag :type="warning" class="mx-1" effect="light" round
                                            v-if="item.permission == 0">
                                            普通成员
                                        </el-tag>
                                    </span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取消</el-button>
                            <el-button type="primary" @click="addNotification">确认</el-button>
                        </span>
                    </template>
                </el-dialog>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import OrgNav from '@/components/OrgNav.vue'
import OrgHeader from '@/components/OrgHeader.vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/index'

export default {
    name: "OrgClubNotification",
    data() {
        return {
            page: 1,
            limit: 8,
            total: 6,
            notificationList: [{}],
            userList: [{}],
            dialogFormVisible: false,

            notification: {
                sendAdminId: null,
                sendUserId: null,
                senderType: 0,
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
            // set send mode
            if (this.notification.receiverId == -1) { // to all club members
                this.notification.receiverId = parseInt(localStorage.getItem('clubId'));
                this.notification.receiverType = 1;
            }
            else {
                this.notification.receiverType = 2 // to specific user
            }

            this.notification.sendUserId = parseInt(localStorage.getItem('userId'))
            if (this.notification.notificationContent == "" || this.notification.notificationTitle == "" || this.notification.sendUserId == null) {
                ElMessage({
                    message: "不能为空！",
                    type: 'error',
                })
                return;
            }
            this.dialogFormVisible = false;

            this.$axios({
                method: 'post',
                url: '/api/club-manage/notification',
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
            url: '/api/club-manage/notification',
            data:{
                type:1,
                userId:localStorage.getItem('userId')
            }
        })
            .then(res => {
                console.log(res.data.data);
                this.notificationList = res.data.data;
                this.total = res.data.data.length;
            })
            .catch(function (error) {
                console.log(error);
            })

        this.$axios({
            method: 'get',
            url: '/api/club-manage/club-staff/' + localStorage.getItem('clubId'),
        })
            .then(res => {
                console.log(res.data.data);
                this.userList = res.data.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    },

    components: {
        OrgNav,
        OrgHeader,
    },

}
</script>


<style scoped>
.main {
    margin: 0;
    padding: 10px;
}

.card-header {
    font-weight: 800;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.box-card-1 {
    margin: 10px;
    height: 83vh;
}
</style>