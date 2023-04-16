<template>
    <el-container class="" style="height: 100vh">
        <el-header class="header">
            <el-row>
                <el-col :span="22" class="title">
                    <h1>
                        社联管理系统
                    </h1>
                </el-col>
                <el-col :span="2" class="text">
                    你好！管理员
                </el-col>
            </el-row>
        </el-header>
    
        <el-container>
            <el-aside width="15vw">
                <el-menu
                    class="el-menu"
                    default-active="/clubFederation/clubBuild"
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
                            <span class="title">创建社团申请列表</span>
                        </div>
                        </template>
                        <el-table
                        :data="buildList.slice((page-1) * limit, page * limit)" 
                        style="width: 100%"
                        size="large"
                        height="430"
                        highlight-current-row
                        @current-change="getCurrentRow"
                        >
                            <el-table-column label="序号" type="index" width="150" />
                            <el-table-column prop="userId" label="用户ID" sortable width="150"/>
                            <el-table-column prop="adminClubName" label="社团名称"/>
                            <el-table-column prop="buildApplyReason" label="申请理由"/>
                            <el-table-column prop="buildApplyTime" sortable label="申请时间" />
                            <el-table-column
                                prop="buildApplyIsPass"
                                label="状态"
                                width="100"
                                :filters="[
                                    { text: '已通过', value: 1 },
                                    { text: '未通过', value: 0 },
                                ]"
                                :filter-method="filterTag"
                                filter-placement="bottom-end"
                                >
                                <template #default="scope">
                                    <el-tag
                                    v-if="scope.row.buildApplyIsPass == '1'"
                                    :type="success"
                                    disable-transitions
                                    >已通过</el-tag>
                                    <el-tag
                                    v-if="scope.row.buildApplyIsPass =='0'"
                                    :type="scope.row.buildApplyIsPass === '1' ? 'success' : 'danger'"
                                    disable-transitions
                                    >未通过</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="120">
                                <template #default="operation">
                                    <el-button v-if="operation.row.feedback == null" :disabled="operation.row.buildApplyIsPass =='1'" link type="primary" size="small" @click="dialogFormVisible = true"
                                    >审核</el-button>
                                    <el-button v-if="operation.row.feedback != null" :disabled="operation.row.buildApplyIsPass =='1'" link type="primary" size="small" @click="dialogFormVisible = true"
                                    >查看</el-button>
                                    <el-button link type="primary" size="small" @click="confirmDeleteBuild">删除</el-button>
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
                        <el-dialog v-model="dialogFormVisible" title="审批创建社团申请" align-center draggable>
                            <el-form :model="build">
                            <el-form-item label="社团名称" label-width="70px">
                                <el-input disabled v-model="build.adminClubName" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="申请时间" label-width="70px">
                                <el-input disabled v-model="build.buildApplyTime" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="申请理由" label-width="70px">
                                <el-input disabled v-model="build.buildApplyReason" autocomplete="off" type="textarea" :rows="3"/>
                            </el-form-item>
                            <el-form-item required v-if="display" label="反馈" label-width="70px">
                                <el-input :disabled="build.feedback != null" v-model="feedback" autocomplete="off" type="textarea" :rows="3"/>
                            </el-form-item>

                            <el-form-item required v-if="build.feedback != null" label="反馈" label-width="70px">
                                <el-input :disabled="build.feedback != null" v-model="build.feedback" autocomplete="off" type="textarea" :rows="3"/>
                            </el-form-item>



                            </el-form>
                            <template #footer>
                            <span class="dialog-footer">
                                <el-button :disabled="build.feedback != null" v-if="!display" @click="display=true;">不通过</el-button>
                                <el-button v-if="display" @click="display=false;feedback=null;">返回</el-button>
                                <el-button v-if="display" @click="noPass">确认</el-button>
                                <el-button :disabled="build.feedback != null" v-if="!display" type="primary" @click="pass">通过</el-button>
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
import { ElMessage,ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message/style/index'
import 'element-plus/es/components/message-box/style/index'

export default {
name: "clubFederationClubBuild",
components: {
},
data () {
return {
    page: 1,
    limit: 8,
    total: 6,
    buildList:[{}],
    dialogFormVisible: false,
    dialogFormVisible1: false,
    feedback:null,
    build:{
        buildApplyId: null,
        buildApplyReason: "",
        buildApplyIsPass: null,
        buildApplyTime: "",
        feedback:null,
        userId:null,
        adminClubName:"",
    },
    display:false,
    isPass:true,
    clubId:null,
}
},
methods: {
    handleCurrentChange(val){
        this.page=val
    },
    getCurrentRow(value){
        if(value!=null){
            console.log(value);
            this.build.userId=value.userId;
            this.build.buildApplyId=value.buildApplyId;
            this.build.buildApplyReason=value.buildApplyReason;
            this.build.buildApplyTime=value.buildApplyTime;
            this.build.buildApplyIsPass=value.buildApplyIsPass;
            this.build.feedback=value.feedback;
            this.build.adminClubName=value.adminClubName;
            console.log("hhhhhh");
            console.log(this.build);
        }
    },
    noPass(){
        this.dialogFormVisible1 = false;
        console.log("不通过");
        console.log(this.build);
        if(this.feedback==""||this.feedback==null){
            ElMessage({
                message: "反馈不能为空",
                type: 'error',
            })
            return;
        }

        this.$axios({
            method: 'post',
            url: '/api/examine/club-build-apply',
            data: {
                id: this.build.buildApplyId,
                state: 0,
                feedback: this.feedback,
            },
        })
        .then(res => {
            this.build.feedback=this.feedback;
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
        this.dialogFormVisible1 = false;
        this.$axios({
            method: 'post',
            url: '/api/examine/club-build-apply',
            data: {
                id: this.build.buildApplyId,
                state: 1,
            },
        })
        .then(res => {
            console.log(res.data.message);
            if(res.data.code==200){
                this.clubId=res.data.data.clubId;
                this.setAdmin();
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
    setAdmin(){
        this.dialogFormVisible1 = false;
        this.$axios({
            method: 'post',
            url: '/api/examine/club-admin/master',
            data: {
                user_id: this.build.userId,
                club_id: this.clubId,
            },
        })
        .then(res => {
            console.log(res.data.message);
            if(res.data.code==200){
                this.clubId=res.data.data.clubId;
                ElMessage({
                    message: res.data.message,
                    type: 'success',
                })
            }else{
                ElMessage.error(res.data.message)
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    },
    deleteBuild(){
        this.$axios({
            method: 'delete',
            url: '/api/examine/club-build-apply/'+this.build.buildApplyId,
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
    confirmDeleteBuild(){
        ElMessageBox.confirm(
            '确认删除创建社团申请?',
            '提示',
            {
                distinguishCancelAndClose: true,
                confirmButtonText: '确认',
                cancelButtonText: '取消',
            }
        )
        .then(() => {
            this.deleteBuild();
        })
    },
    filterTag(value, row) {
        return row.buildApplyIsPass===value;
    },
},
created() {
    this.$axios({
        method: 'get',
        url: '/api/examine/club-build-apply',
    })
    .then(res => {
        console.log(res.data.data);
        this.buildList=res.data.data;
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
.header .title{
    color: #023764;
    font-size: large;
    padding-left: 1vw;
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
</style>