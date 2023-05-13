<template>
    <el-container class="" style="height: 100vh">
        <el-header class="header">
            <FedNav/>
        </el-header>
    
        <el-container>
            <el-aside width="15vw">
                <el-menu
                    class="el-menu"
                    default-active="/clubFederation/activity"
                    router=true
                    style="height: 100%;"
                    active-text-color="#023764"
                    background-color="#fff"
                    text-color="#023764"
                    open="1"
                >
                    <el-sub-menu index="1">
                    <template #title>
                        <el-icon><Ship /></el-icon>
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
                        <el-icon><Bell /></el-icon>
                        <span class="menu-item1">系统通知</span>
                    </template>
                    </el-menu-item>
                    <el-menu-item index="/clubFederation/pubnot">
                    <template #title>
                        <el-icon><Reading /></el-icon>
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
                            <span class="title">活动申请列表</span>
                        </div>
                        </template>
                        
                        <el-table
                        :data="activityList.slice((page-1) * limit, page * limit)" 
                        style="width: 100%"
                        size="large"
                        height="430"
                        highlight-current-row
                        @current-change="getCurrentRow"
                        >
                            <el-table-column label="序号" type="index" width="80" />
                            <el-table-column prop="userName" label="用户名" width="160"/>
                            <el-table-column prop="clubName" label="社团名" width="160"/>
                            <el-table-column prop="activityTitle" label="活动标题"/>
                            <el-table-column prop="activityApplyReason" label="申请理由"/>
                            <el-table-column prop="activityApplyTime" sortable label="申请时间" />
                            <el-table-column
                                prop="status"
                                label="状态"
                                width="100"
                                :filters="[
                                    { text: '待审批', value: '待审批' },
                                    { text: '已通过', value: '已通过' },
                                    { text: '未通过', value: '未通过' },
                                ]"
                                :filter-method="filterTag"
                                filter-placement="bottom-end"
                                >
                                <template #default="scope">
                                    <el-tag v-if="scope.row.status == '已通过'" type="success" disable-transitions>已通过</el-tag>
                                    <el-tag v-if="scope.row.status =='已拒绝'" type="danger" disable-transitions >已拒绝</el-tag>
                                    <el-tag v-if="scope.row.status =='待审批'" disable-transitions >待审批</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="120">
                                <template #default="operation">
                                    <el-button v-if="operation.row.status == '待审批'" link type="primary" size="small" @click="dialogFormVisible = true"
                                    >审核</el-button>
                                    <el-button v-if="operation.row.status != '待审批'" link type="primary" size="small" @click="dialogFormVisible = true"
                                    >查看</el-button>
                                    <el-button link type="warning" size="small" @click="confirmDeleteActivity">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row justify="center">
                            <div class="pagination">
                                <div class="pagination_style">&emsp;</div>
                                <el-pagination
                                :current-page="page"
                                :page-size="limit"
                                background
                                layout="prev, pager, next"
                                :total="total"
                                @current-change="handleCurrentChange"
                                />
                            </div>
                        </el-row>

                        <el-dialog v-model="dialogFormVisible" title="审批活动申请" align-center draggable>
                            <el-form :model="activity">
                                <el-scrollbar max-height="300px">
                                    <el-descriptions :model="activity" :column="2" border>
                                        <el-descriptions-item label-align="center" align="center" width="25%">
                                            <template #label>
                                                <el-row justify="center" align="middle">
                                                    <el-col :span="2" class="cell-icon">
                                                        <el-icon><School /></el-icon>
                                                    </el-col>
                                                    <el-col :span="10" class="cell-text">
                                                        <span>活动校区</span>
                                                    </el-col>
                                                </el-row>
                                            </template>
                                            <el-tag size="large" type="success" style="width:60%;font-size:16px">{{ activity.activityCampus }}</el-tag>
                                        </el-descriptions-item>
                                        <el-descriptions-item label-align="center" align="center" width="25%">
                                            <template #label>
                                                <el-row justify="center" align="middle">
                                                    <el-col :span="2" class="cell-icon">
                                                        <el-icon><Location /></el-icon>
                                                    </el-col>
                                                    <el-col :span="10" class="cell-text">
                                                        <span>活动地点</span>
                                                    </el-col>
                                                </el-row>
                                            </template>
                                            <el-tag size="large" type="success" style="width:60%;font-size:16px">{{ activity.activityLocation }}</el-tag>
                                        </el-descriptions-item>
                                        <el-descriptions-item label-align="center" align="center">
                                            <template #label>
                                                <el-row justify="center" align="middle">
                                                    <el-col :span="2" class="cell-icon">
                                                        <el-icon><Calendar /></el-icon>
                                                    </el-col>
                                                    <el-col :span="10" class="cell-text">
                                                        <span>活动日期</span>
                                                    </el-col>
                                                </el-row>
                                            </template>
                                            <div style="font-size:16px">
                                                {{ activity.activityDate }}
                                            </div>
                                        </el-descriptions-item>
                                        <el-descriptions-item label-align="center" align="center">
                                            <template #label>
                                                <el-row justify="center" align="middle">
                                                    <el-col :span="2" class="cell-icon">
                                                        <el-icon><Timer /></el-icon>
                                                    </el-col>
                                                    <el-col :span="10" class="cell-text">
                                                        <span>活动时间</span>
                                                    </el-col>
                                                </el-row>
                                            </template>
                                            <div style="font-size:16px">
                                                {{ activity.activityTime }}
                                            </div>
                                        </el-descriptions-item>
                                        <el-descriptions-item label-align="center" align="center">
                                            <template #label>
                                                <el-row justify="center" align="middle">
                                                    <el-col :span="2" class="cell-icon">
                                                        <el-icon><User /></el-icon>
                                                    </el-col>
                                                    <el-col :span="10" class="cell-text">
                                                        <span>总负责人</span>
                                                    </el-col>
                                                </el-row>
                                            </template>
                                            <el-tag size="large" style="width:60%;font-size:16px">{{ activity.userName }}</el-tag>
                                        </el-descriptions-item>
                                        <el-descriptions-item label-align="center" align="center">
                                            <template #label>
                                                <el-row justify="center" align="middle">
                                                    <el-col :span="2" class="cell-icon">
                                                        <el-icon><DataAnalysis /></el-icon>
                                                    </el-col>
                                                    <el-col :span="10" class="cell-text">
                                                        <span>预计人数</span>
                                                    </el-col>
                                                </el-row>
                                            </template>
                                            <div style="font-size:16px">
                                                {{ activity.activityPeopleNum }}
                                            </div>
                                        </el-descriptions-item>
                                        <el-descriptions-item label-align="center" align="center" :span="2">
                                            <template #label>
                                                <el-row justify="center" align="middle">
                                                    <el-col :span="2" class="cell-icon">
                                                        <el-icon><Edit /></el-icon>
                                                    </el-col>
                                                    <el-col :span="10" class="cell-text">
                                                        <span>活动标题</span>
                                                    </el-col>
                                                </el-row>
                                            </template>
                                            <div class="activityDescription" style="font-size:16px">
                                                {{ activity.activityTitle }}
                                            </div>
                                        </el-descriptions-item>
                                        <el-descriptions-item label-align="center" align="center" :span="2">
                                            <template #label>
                                                <el-row justify="center" align="middle">
                                                    <el-col :span="2" class="cell-icon">
                                                        <el-icon><Edit /></el-icon>
                                                    </el-col>
                                                    <el-col :span="10" class="cell-text">
                                                        <span>活动详情</span>
                                                    </el-col>
                                                </el-row>
                                            </template>
                                            <div class="activityDescription" style="font-size:16px">
                                                {{ activity.activityDescription }}
                                            </div>
                                        </el-descriptions-item>
                                    </el-descriptions>
                                </el-scrollbar>
                                <br>
                            <el-form-item required v-if="activity.status == '待审批'" label="反馈" label-width="70px">
                                <el-input v-model="feedback" autocomplete="off" type="textarea" :rows="3"/>
                            </el-form-item>
                            <el-form-item required v-if="activity.status != '待审批'" label="反馈" label-width="70px">
                                <el-input disabled v-model="activity.feedback" autocomplete="off" type="textarea" :rows="3"/>
                            </el-form-item>
                            <el-form-item v-if="activity.status != '待审批'" label="审核状态" label-width="70px">
                                <el-tag v-if="activity.status == '已通过'" type="success" disable-transitions>已通过</el-tag>
                                <el-tag v-if="activity.status =='已拒绝'" type="danger" disable-transitions >已拒绝</el-tag>
                            </el-form-item>
                            </el-form>
                            <template #footer>
                            <span class="dialog-footer">
                                <el-button  v-if="activity.status != '待审批'" @click="dialogFormVisible = false">返回</el-button>
                                <el-button v-if="activity.status == '待审批'" @click="noPass">不通过</el-button>
                                <el-button v-if="activity.status == '待审批'" type="primary" @click="pass">通过</el-button>
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
import { ElMessage,ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message/style/index'
import 'element-plus/es/components/message-box/style/index'

export default {
name: "clubFederationActivity",
components: {
    FedNav,
},
data () {
return {
    page: 1,
    limit: 8,
    total: 6,
    activityList:[{}],
    dialogFormVisible: false,
    dialogFormVisible1: false,
    feedback:null,
    activity:{
        activityApplyId: null,
        activityApplyReason: "",
        activityApplyIsPass: null,
        activityApplyTime: "",
        feedback:null,
    },
    display:false,
    isPass:true,
}
},
methods: {
    handleCurrentChange(val){
        this.page=val
    },
    getCurrentRow(value){
        if(value!=null){
            console.log(value);
            this.activity=value;
            console.log("hhhhhh");
            console.log(this.activity);
        }
    },
    noPass(){
        console.log("不通过");
        console.log(this.activity);
        if(this.feedback==""||this.feedback==null){
            ElMessage({
                message: "反馈不能为空",
                type: 'error',
            })
            return;
        }

        this.$axios({
            method: 'put',
            url: '/api/examine/activity-apply',
            data: {
                activityApplyId: this.activity.activityApplyId,
                status: '已拒绝',
                feedback: this.feedback,
            },
        })
        .then(res => {
            this.activity.feedback=this.feedback;
            console.log(res.data.message);
            if(res.data.code==200){
            ElMessage({
                message: res.data.message,
                type: 'success',
            })
            }else{
            ElMessage.error(res.data.message)
            }
            this.$router.go(0)
        })
        .catch(function (error) {
            console.log(error);
        })
    },
    pass(){
        if(this.feedback==""||this.feedback==null){
            ElMessage({
                message: "反馈不能为空",
                type: 'error',
            })
            return;
        }
        this.$axios({
            method: 'put',
            url: '/api/examine/activity-apply',
            data: {
                activityApplyId: this.activity.activityApplyId,
                status: '已通过',
                feedback: this.feedback,
            },
        })
        .then(res => {
            console.log(res.data.message);
            if(res.data.code==200){
            ElMessage({
                message: res.data.message,
                type: 'success',
            })
            }else{
                ElMessage.error(res.data.message)
            }
            this.$router.go(0)
        })
        .catch(function (error) {
            console.log(error);
        })
    },

    deleteActivity(){
        this.$axios({
            method: 'delete',
            url: '/api/examine/activity-apply/'+this.activity.activityApplyId,
        })
        .then(res => {
            console.log(res.data.message);
            if(res.data.code==200){
            ElMessage({
                message: res.data.message,
                type: 'success',
            })
            this.$router.go(0)
            }else{
            ElMessage.error(res.data.message)
            }
        })
        .catch(function (error) {
            console.log(error);
            ElMessage.error("操作失败")
        })
    },
    confirmDeleteActivity(){
        ElMessageBox.confirm(
            '确认删除活动申请?',
            '提示',
            {
                distinguishCancelAndClose: true,
                confirmButtonText: '确认',
                cancelButtonText: '取消',
            }
        )
        .then(() => {
            this.deleteActivity();
        })
    },
    filterTag(value, row) {
        return row.activityApplyIsPass===value;
    },
},
created() {
    this.$axios({
        method: 'get',
        url: '/api/examine/activity-apply',
    })
    .then(res => {
        console.log(res.data.data);
        this.activityList=res.data.data;
        this.total=res.data.data.length;
    })
    .catch(function (error) {
        console.log(error);
    })
},
}
</script>

<style scoped>
.header{
    width: 100%;
    height: 10vh;
    line-height: 10vh;
    border-bottom:2px solid gainsboro;
}

.menu-item1{
    font-size: large;
}
.menu-item2{
    color: #023764;
    font-size: medium;
}
.el-menu-item.is-active{
    background-color: #023764;
    color: #FFC353;
}
.card{
    height: 99%;
}
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
}
.card-header .title{
    padding-left: 10px;
    color: #023764;
    border-left: 8px solid #FFC353;
    font-size: 20px;
}

.pagination{
    --el-color-primary: #024886;
    display: block;
    margin: 0 auto;
    }
.el-pagination {
--el-pagination-font-size: 16px;
--el-pagination-button-color: #024886;
--el-pagination-button-disabled-bg-color:#fff;
--el-pagination-button-bg-color:#fff;
--el-pagination-hover-color: #167fdb;
}
.nav_button{
    color: #fff;
    height: 30px;
    width: 80px;
}
</style>