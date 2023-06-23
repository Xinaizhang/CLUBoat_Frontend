<template>
    <OrgHeader />

    <el-row style="background:#EEEEEE">
        <OrgNav />

        <el-col :span="20" class="main">
            <el-card class="box-card-1">

                <!-- Header -->
                <template #header>
                    <router-link to="/org_clubmember" style="position:absolute;
                            text-decoration:none;
                            color:#023764;
                            ">
                        <el-icon>
                            <ArrowLeftBold />
                        </el-icon>
                    </router-link>
                    <div class="card-header">管理员申请</div>
                </template>

                <!-- 表格 -->
                <el-table :data="adminList.slice((page - 1) * limit, page * limit)" style="width: 100%" size="large"
                    height="430" highlight-current-row @current-change="getCurrentRow">
                    <el-table-column label="序号" type="index" width="150" />
                    <el-table-column prop="userId" label="申请人Id" sortable width="170" />
                    <el-table-column prop="userName" label="申请人姓名" sortable width="170" />
                    <el-table-column prop="adminApplyContent" label="申请理由" />
                    <el-table-column prop="adminApplyTime" sortable label="申请时间" />
                    <el-table-column prop="status" label="状态" width="100" :filters="[
                            { text: '已通过', value: '已通过' },
                            { text: '已拒绝', value: '已拒绝' },
                            { text: '待审批', value: '待审批' },
                        ]" :filter-method="filterTag" filter-placement="bottom-end">
                        <template #default="scope">
                            <el-tag v-if="scope.row.status == '已通过'" type="success" disable-transitions>已通过</el-tag>
                            <el-tag v-if="scope.row.status == '已拒绝'" type="danger" disable-transitions>已拒绝</el-tag>
                            <el-tag v-if="scope.row.status == '待审批'" disable-transitions>待审批</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <el-button link type="primary" size="small" @click="dialogFormVisible = true">审核</el-button>
                    </el-table-column>
                </el-table>

                <!-- 翻页 -->
                <el-row justify="center">
                    <div class="pagination">
                        <div class="pagination_style">&emsp;</div>
                        <el-pagination :current-page="page" :page-size="limit" background layout="prev, pager, next"
                            :total="total" @current-change="handleCurrentChange" />
                    </div>
                </el-row>

                <!-- 审核详情弹窗 -->
                <el-dialog v-model="dialogFormVisible" align-center draggable width="55vw" style="padding:0px 10px;"
                    title="审核详情">
                    <el-scrollbar height="450px">
                        <div style="margin-left:15px;margin-right:20px;">
                            <el-form :model="admin">
                                <el-form-item label="审核状态" label-width="70px">
                                    <el-tag v-if="admin.status == '已通过'" type="success" disable-transitions>已通过</el-tag>
                                    <el-tag v-if="admin.status == '已拒绝'" type="danger" disable-transitions>已拒绝</el-tag>
                                    <el-tag v-if="admin.status == '待审批'" disable-transitions>待审批</el-tag>
                                </el-form-item>
                                <el-form-item v-if="admin.status == '已通过' || admin.status == '已拒绝'" label="反馈"
                                    label-width="70px">
                                    <el-input disabled v-model="admin.feedback" autocomplete="off" type="textarea"
                                        :rows="17" />
                                </el-form-item>
                                <el-form-item required v-if="admin.status == '待审批'" label="反馈" label-width="70px">
                                    <el-input v-model="feedback" autocomplete="off" type="textarea" :rows="16" />
                                </el-form-item>
                                <el-button v-if="admin.status == '待审批'" style="width:80px;" type="success" plain
                                    @click="pass">通过</el-button>
                                <el-button v-if="admin.status == '待审批'" style="width:80px;" type="danger" plain
                                    @click="noPass">驳回</el-button>
                            </el-form>
                        </div>
                    </el-scrollbar>
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
    name: "OrgApplyAdmin",
    data() {
        return {
            page: 1,
            limit: 8,
            total: 6,
            admin: {},
            adminList: [{}],
            dialogFormVisible: false,
            feedback: null,
            display: false,
            isPass: true,

        }
    },
    methods: {
        handleCurrentChange(val) {
            this.page = val
        },
        getCurrentRow(value) {
            if (value != null) {
                console.log(value);
                this.admin = value;
                console.log("当前行" + this.admin);
            }
        },

        // 审批操作 - 不通过
        noPass() {
            console.log("不通过");
            console.log(this.admin);
            if (this.feedback == "" || this.feedback == null) {
                ElMessage({
                    message: "反馈不能为空",
                    type: 'error',
                })
                return;
            }
            this.dialogFormVisible1 = false;
            this.$axios({
                method: 'put',
                url: '/api/examine/admin-apply',
                data: {
                    administratorApplyId: this.admin.adminApplyId,
                    status: "已拒绝",
                    feedback: this.feedback
                },
            })
                .then(res => {
                    this.admin.feedback = this.feedback;
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

        // 审批操作 - 通过
        pass() {
            console.log("通过");
            console.log(this.admin);
            if (this.feedback == "" || this.feedback == null) {
                ElMessage({
                    message: "反馈不能为空",
                    type: 'error',
                })
                return;
            }
            this.dialogFormVisible1 = false;
            this.$axios({
                method: 'put',
                url: '/api/examine/admin-apply',
                data: {
                    administratorApplyId: this.admin.adminApplyId,
                    status: "已通过",
                    feedback: this.feedback
                },
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
        filterTag(value, row) {
            return row.status === value;
        },
    },
    created() {
        this.$axios({
            method: 'get',
            url: '/api/examine/admin-apply/' + localStorage.getItem("clubId"),
        })
            .then(res => {
                console.log("报销申请" + res.data.data);
                this.adminList = res.data.data;
                this.total = res.data.data.length;
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
    justify-content: center;
    align-items: center;
    min-height: 35px;
}

.box-card-1 {
    margin: 10px;
    height: 83vh;
}


.pagination {
    display: block;
    margin: 0 auto;
}</style>