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
                default-active="/clubFederation/pubnot"
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
                        <span class="title">公告列表</span>
                        <el-button class="button" color="#023764" @click="dialogFormVisible = true">发布公告</el-button>
                    </div>
                    </template>
                    <el-table
                    :data="pubnotList.slice((page-1) * limit, page * limit)" 
                    style="width: 100%"
                    size="large"
                    height="430"
                    highlight-current-row
                    @current-change="getCurrentRow"
                    >
                        <el-table-column label="序号" type="index" width="60" />
                        <el-table-column prop="pubnotTitle" label="标题"/>
                        <el-table-column prop="pubnotContent" label="内容"/>
                        <el-table-column prop="pubnotTime" sortable label="发布时间" />
                        <el-table-column fixed="right" label="操作" width="120">
                            <template #default>
                                <el-button link type="primary" size="small" @click="dialogFormVisible1 = true"
                                >编辑</el-button
                                >
                                <el-button link type="primary" size="small" @click="confirmDeletePubnot">删除</el-button>
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
                    <el-dialog v-model="dialogFormVisible" title="发布公告" align-center draggable>
                        <el-form :model="pubnot">
                        <el-form-item label="公告标题" label-width="70px">
                            <el-input v-model="pubnot.pubnotTitle" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="公告内容" label-width="70px">
                            <el-input v-model="pubnot.pubnotContent" autocomplete="off" type="textarea" :rows="6"/>
                        </el-form-item>
                        </el-form>
                        <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false;">取消</el-button>
                            <el-button type="primary" @click="addPubnot">
                            确认
                            </el-button>
                        </span>
                        </template>
                    </el-dialog>
                    <el-dialog v-model="dialogFormVisible1" title="编辑公告" align-center draggable>
                        <el-form :model="currentPubnot">
                        <el-form-item
                         label="公告标题" 
                         label-width="80px"
                         :rules="{
                            required: true,
                            message: '请输入公告标题',
                            trigger: 'blur',
                         }"
                         >
                            <el-input v-model="currentPubnot.pubnotTitle" autocomplete="off" />
                        </el-form-item>
                        <el-form-item 
                         label="公告内容" 
                         label-width="80px"
                         :rules="{
                            required: true,
                            message: '请输入公告内容',
                            trigger: 'blur',
                         }"
                         >
                            <el-input v-model="currentPubnot.pubnotContent" autocomplete="off" type="textarea" :rows="6"/>
                        </el-form-item>
                        </el-form>
                        <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible1 = false">取消</el-button>
                            <el-button type="primary" @click="editPubnot">
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
import { ElMessage,ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message/style/index'
import 'element-plus/es/components/message-box/style/index'

export default {
name: "clubFederationPubnot",
components: {
},
data () {
return {
    page: 1,
    limit: 8,
    total: 6,
    pubnotList:[{}],
    dialogFormVisible: false,
    dialogFormVisible1: false,
    pubnot:{
        adminId: 1,
        pubnotTitle: "",
        pubnotContent: ""
    },
    currentPubnot:{
        id: 0,
        pubnotTitle: "",
        pubnotContent: ""
    },
}
},
methods: {
    handleCurrentChange(val){
      this.page=val
    },
    addPubnot(){
        if(this.pubnot.pubnotContent==""||this.pubnot.pubnotTitle==""||this.pubnot.id==null){
            ElMessage({
                message: "不能为空！",
                type: 'error',
            })
            return;
        }
        this.dialogFormVisible = false;
        this.$axios({
            method: 'post',
            url: '/api/examine/pubnot',
            data: this.pubnot,
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
    getCurrentRow(value){
        if(value!=null){
            console.log(value);
            this.currentPubnot.id=value.pubnotId;
            this.currentPubnot.pubnotTitle=value.pubnotTitle;
            this.currentPubnot.pubnotContent=value.pubnotContent;
            console.log("hhhhhh");
            console.log(this.currentPubnot);
        }
    },
    editPubnot(){
        if(this.currentPubnot.pubnotContent==""||this.currentPubnot.pubnotTitle==""||this.currentPubnot.id==null){
            ElMessage({
                message: "不能为空！",
                type: 'error',
            })
            return;
        }
        this.dialogFormVisible1 = false;
        this.$axios({
            method: 'put',
            url: '/api/examine/pubnot',
            data: this.currentPubnot,
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
    deletePubnot(){
        this.$axios({
            method: 'delete',
            url: '/api/examine/pubnot/'+this.currentPubnot.id,
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
    confirmDeletePubnot(){
        ElMessageBox.confirm(
            '确认删除公告?',
            '提示',
            {
                distinguishCancelAndClose: true,
                confirmButtonText: '确认',
                cancelButtonText: '取消',
            }
        )
        .then(() => {
            this.deletePubnot();
        })
    }
},
created() {
  this.$axios({
    method: 'get',
    url: '/api/examine/pubnot',
  })
  .then(res => {
    console.log(res.data.data);
    this.pubnotList=res.data.data;
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
.card-header .button{
    color: #FFC353;
    height: 30px;
    width: 80px;
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