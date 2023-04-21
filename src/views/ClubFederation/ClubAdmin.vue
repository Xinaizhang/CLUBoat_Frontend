<template>
    <el-container class="" style="height: 100vh">
        <el-header class="header">
            <FedNav/>
        </el-header>
    
        <el-container>
            <el-aside width="15vw">
                <el-menu
                    class="el-menu"
                    default-active="/clubFederation/clubAdmin"
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
                            <span class="title">社团列表</span>
                        </div>
                        </template>
                        <el-table
                        :data="clubList.slice((page-1) * limit, page * limit)" 
                        style="width: 100%"
                        size="large"
                        height="430"
                        highlight-current-row
                        @current-change="getCurrentRow"
                        >
                            <el-table-column label="序号" type="index" width="150" />
                            <el-table-column prop="clubId" label="社团ID" sortable width="150"/>
                            <el-table-column prop="clubName" label="社团名称"/>
                            <el-table-column prop="clubInformation" sortable label="社团简介" />
                            <el-table-column label="社团图片">
                                <template #default="scope">
                                    <el-image style="width: 100px; height: 100px" :src="scope.row.clubImageUrl" :fit="fit" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="clubCreateTime" sortable label="社团创建时间" />
                            <el-table-column fixed="right" label="操作" width="120">
                                <template #default>
                                    <el-button link type="primary" size="small" @click="dialogFormVisible = true"
                                    >设置社长</el-button>
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
                        <el-dialog v-model="dialogFormVisible" title="设置社长" align-center draggable>
                            <el-descriptions
                                class="margin-top"
                                title="社团信息"
                                :column="2"
                                :size="size"
                                border
                            >
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            <el-icon :style="iconStyle">
                                                <Ship />
                                            </el-icon>
                                            社团名称
                                        </div>
                                    </template>
                                    {{ club.clubName }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            <el-icon :style="iconStyle">
                                                <Edit />
                                            </el-icon>
                                            社团简介
                                        </div>
                                    </template>
                                    {{ club.clubInformation }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            <el-icon :style="iconStyle">
                                                <Calendar />
                                            </el-icon>
                                            创建时间
                                        </div>
                                    </template>
                                    {{ club.clubCreateTime }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            <el-icon :style="iconStyle">
                                                <Picture />
                                            </el-icon>
                                            社团图片
                                        </div>
                                    </template>
                                    <el-image style="width: 100px; height: 100px" :src="club.clubImageUrl" :fit="fit" />
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            <el-icon :style="iconStyle">
                                                <user />
                                            </el-icon>
                                            社长
                                        </div>
                                    </template>
                                    <div>用户ID：{{ clubadminInfo.userId }}</div>
                                    <div>用户名：{{ clubadminInfo.userName }}</div>
                                    
                                </el-descriptions-item>
                            </el-descriptions>
                            <h3 style="margin:20px 0px;color: #333;">更换社长</h3>
                            <el-select v-model="user_id" placeholder="选择用户" class="select" style="width:300px;">
                                <el-option
                                v-for="item in userList"
                                :key="item.userId"
                                :label="item.userId"
                                :value="item.userId"
                                class="select"
                                >
                                    <span style="float: left">UID：{{ item.userId }}</span>
                                    <span style="float: right;color: var(--el-text-color-secondary);font-size: 13px;">
                                        {{ item.userName }}
                                        <el-avatar :size="30" :src="item.userPhotoUrl" />
                                    </span>
                                </el-option>
                            </el-select>
                            <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="dialogFormVisible = false; user_id=null;">取消</el-button>
                                <el-button type="primary" @click="clubAdmin">
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
name: "clubFederationClubAdmin",
components: {
    FedNav
},
data () {
return {
    page: 1,
    limit: 8,
    total: 6,
    clubList:[{}],
    userList:[{}],
    dialogFormVisible: false,
    club:{},//当前行社团信息
    clubadminInfo:{},//当前行社团的社长信息
    user_id:null,//要设置为社长的用户id
}
},
methods: {
    handleCurrentChange(val){
        this.page=val
    },
    getCurrentRow(value){
        if(value!=null){
            console.log(value);
            this.club.clubId=value.clubId;
            this.club.clubName=value.clubName;
            this.club.clubInformation=value.clubInformation;
            this.club.clubImageUrl=value.clubImageUrl;
            this.club.clubCreateTime=value.clubCreateTime;
            console.log("hhhhhh");
            console.log(this.club);
            this.$axios({
                method: 'get',
                url: '/api/examine/club-admin/'+value.clubId,
            })
            .then(res => {
                console.log("社长信息");
                console.log(res.data.data);
                this.clubadminInfo=res.data.data;
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    },
    clubAdmin(){
        if(this.user_id==null){
            ElMessage({
                message: "请选择用户！",
                type: 'error',
            })
            return;
        }
        this.$axios({
            method: 'post',
            url: '/api/examine/club-admin',
            data:{
                user_id:this.clubadminInfo.userId,
                club_id:this.club.clubId,
                permission:1,
            },
        })
        .then(res => {
            console.log(res.data.message);
            if(res.data.code==200){
            ElMessage({
                message: "社长更新为管理员，选中用户更新为社长",
                type: 'success',
            })
            }else{
            ElMessage.error(res.data.message)
            }
        })
        .catch(function (error) {
            console.log(error);
            ElMessage.error("操作失败")
        })

        this.$axios({
            method: 'post',
            url: '/api/examine/club-admin',
            data:{
                user_id:this.user_id,
                club_id:this.club.clubId,
                permission:2,
            },
        })
        .then(res => {
            console.log(res.data.message);
            if(res.data.code==200){
            ElMessage({
                message: "用户更新为社长",
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
},
created() {
    this.$axios({
        method: 'get',
        url: '/api/examine/club',
    })
    .then(res => {
        console.log(res.data.data);
        this.clubList=res.data.data;
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