<template>
    <el-container class="" style="height: 100vh">
        <el-header class="header">
            <FedNav />
        </el-header>

        <el-container>
            <el-aside width="15vw">
                <el-menu class="el-menu" default-active="/clubFederation/budget" router=true style="height: 100%;"
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
                                <span class="title">预算申请列表</span>
                            </div>
                        </template>
                        <el-table :data="budgetList.slice((page - 1) * limit, page * limit)" style="width: 100%"
                            size="large" height="430" highlight-current-row @current-change="getCurrentRow">
                            <el-table-column label="序号" type="index" width="80" />
                            <el-table-column prop="clubName" label="申请社团" sortable width="150" />
                            <el-table-column prop="applicantName" label="申请人" sortable width="150" />
                            <el-table-column prop="title" label="申请标题" />
                            <el-table-column prop="amount" label="申请金额" />
                            <el-table-column prop="createTime" sortable label="申请时间" />
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
                                <template #default="operation">
                                    <el-button v-if="operation.row" link type="primary" size="small"
                                        @click="dialogTableVisible = true">查看</el-button>
                                    <el-button link type="primary" size="small"
                                        @click="dialogFormVisible = true">审核</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row justify="center">
                            <div class="pagination">
                                <div class="pagination_style">&emsp;</div>
                                <el-pagination :current-page="page" :page-size="limit" background layout="prev, pager, next"
                                    :total="total" @current-change="handleCurrentChange" />
                            </div>
                        </el-row>

                        <!-- 预算详情查看 -->

                        <el-dialog v-model="dialogTableVisible" align-center draggable width="55vw"
                            style="padding:0px 10px;" title="预算申请详情">
                            <el-scrollbar height="450px">
                                <div style="margin-left:15px;margin-right:20px;">
                                    <el-descriptions border :model="budget" :column="4" direction="vertical">
                                        <el-descriptions-item>
                                            <template #label>
                                                <div class="cell-item">
                                                    <el-icon :style="iconStyle">
                                                        <el-icon>
                                                            <Ship />
                                                        </el-icon>
                                                    </el-icon>
                                                    <span class="cell-text">申请社团</span>
                                                </div>
                                            </template>
                                            <el-tag size="small">{{ budget.clubName }}</el-tag>
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                            <template #label>
                                                <div class="cell-item">
                                                    <el-icon :style="iconStyle">
                                                        <user />
                                                    </el-icon>
                                                    <span class="cell-text">申请人</span>
                                                </div>
                                            </template>
                                            <el-tag size="small">{{ budget.applicantName }}</el-tag>
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                            <template #label>
                                                <div class="cell-item">
                                                    <el-icon :style="iconStyle">
                                                        <el-icon>
                                                            <Money />
                                                        </el-icon>
                                                    </el-icon>
                                                    <span class="cell-text">申请金额</span>
                                                </div>
                                            </template>
                                            <h4 style="color:green">{{ budget.amount }}</h4>
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                            <template #label>
                                                <div class="cell-item">
                                                    <el-icon :style="iconStyle">
                                                        <el-icon>
                                                            <Calendar />
                                                        </el-icon>
                                                    </el-icon>
                                                    <span class="cell-text">申请时间</span>
                                                </div>
                                            </template>
                                            {{ budget.createTime }}
                                        </el-descriptions-item>
                                        <el-descriptions-item label="标题" :span="4">{{ budget.title }}</el-descriptions-item>
                                        <el-descriptions-item label="申请项目" :span="4">
                                            <el-table :data="budget.item" style="width: 100%" max-height="250">
                                                <el-table-column prop="name" label="Name" width="180" />
                                                <el-table-column prop="description" label="Description" width="420" />
                                                <el-table-column prop="money" label="Money" width="100" />
                                            </el-table>
                                        </el-descriptions-item>

                                    </el-descriptions>
                                </div>
                            </el-scrollbar>

                            <template #footer>
                                <span class="dialog-footer">
                                    <el-button type="primary"
                                        @click="dialogTableVisible = false; dialogFormVisible = true">预算审批</el-button>
                                </span>
                            </template>
                        </el-dialog>

                        <!--  -->

                        <!-- 审核详情弹窗 -->
                        <el-dialog v-model="dialogFormVisible" align-center draggable width="55vw"
                            style="padding:0px 10px;" title="审核详情">
                            <el-scrollbar height="450px">
                                <div style="margin-left:15px;margin-right:20px;">
                                    <el-form :model="budget">
                                        <el-form-item label="审核状态" label-width="70px">
                                            <el-tag v-if="budget.status == '已通过'" type="success"
                                                disable-transitions>已通过</el-tag>
                                            <el-tag v-if="budget.status == '已拒绝'" type="danger"
                                                disable-transitions>已拒绝</el-tag>
                                            <el-tag v-if="budget.status == '待审批'" disable-transitions>待审批</el-tag>
                                        </el-form-item>
                                        <el-form-item v-if="budget.status == '已通过' || budget.status == '已拒绝'" label="反馈"
                                            label-width="70px">
                                            <el-input disabled v-model="budget.feedback" autocomplete="off" type="textarea"
                                                :rows="17" />
                                        </el-form-item>
                                        <el-form-item required v-if="budget.status == '待审批'" label="反馈" label-width="70px">
                                            <el-input v-model="feedback" autocomplete="off" type="textarea" :rows="16" />
                                        </el-form-item>
                                        <el-button v-if="budget.status == '待审批'" style="width:80px;" type="success" plain
                                            @click="pass">通过</el-button>
                                        <el-button v-if="budget.status == '待审批'" style="width:80px;" type="danger" plain
                                            @click="noPass">驳回</el-button>
                                    </el-form>
                                </div>
                            </el-scrollbar>
                            <template #footer>
                                <span class="dialog-footer">
                                    <el-button type="primary"
                                        @click="dialogFormVisible = false; dialogTableVisible = true">预算申请</el-button>
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
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message/style/index'
import 'element-plus/es/components/message-box/style/index'

export default {
    name: "clubFederationBudget",
    components: {
        FedNav,
    },
    data() {
        return {
            page: 1,
            limit: 8,
            total: 6,
            budgetList: [{}],
            dialogTableVisible: false,
            dialogFormVisible: false,
            feedback: null,
            budget: {
            },
            display: false,
            isPass: true,
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.page = val
        },
        getCurrentRow(value) {
            if (value != null && this.dialogTableVisible == true) {
                this.row = value.budgetId;
                // alert(this.row);
                console.log("row id is:" + this.row);
                this.getBudgetDetail();
            }
        },
        getBudgetDetail() {
            if (this.row != null) {
                console.log("id:" + this.row);
                // this.dialogTableVisible = true;
                this.$axios({
                    method: 'get',
                    url: '/api/examine/budgets/detail/' + this.row,
                })
                    .then(res => {
                        console.log(res.data.data);
                        this.budget = res.data.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }

        },
        noPass() {
            this.dialogFormVisible = false;
            console.log("不通过");
            console.log(this.budget);
            if (this.feedback == "" || this.feedback == null) {
                ElMessage({
                    message: "反馈不能为空",
                    type: 'error',
                })
                return;
            }

            this.$axios({
                method: 'put',
                url: '/api/examine/budgets',
                data: {
                    budgetId: this.budget.budgetId,
                    status: '已拒绝',
                    feedback: this.feedback,
                },
            })
                .then(res => {
                    this.budget.feedback = this.feedback;
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
        pass() {
            this.dialogFormVisible1 = false;
            this.$axios({
                method: 'put',
                url: '/api/examine/budgets',
                data: {
                    budgetId: this.budget.budgetId,
                    status: '已通过',
                    feedback: this.feedback,
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

        deleteBudget() {
            this.$axios({
                method: 'delete',
                url: '/api/examine/budget-apply/' + this.budget.budgetApplyId,
            })
                .then(res => {
                    console.log(res.data.message);
                    if (res.data.code == 200) {
                        ElMessage({
                            message: res.data.message,
                            type: 'success',
                        })
                        this.$router.go(0)
                    } else {
                        ElMessage.error(res.data.message)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    ElMessage.error("操作失败")
                })
        },
        confirmDeleteBudget() {
            ElMessageBox.confirm(
                '确认删除预算申请?',
                '提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                }
            )
                .then(() => {
                    this.deleteBudget();
                })
        },
        filterTag(value, row) {
            return row.budgetApplyIsPass === value;
        },
    },
    created() {
        this.$axios({
            method: 'get',
            url: '/api/examine/budgets',
        })
            .then(res => {
                console.log(res.data.data);
                this.budgetList = res.data.data;
                this.total = res.data.data.length;
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
}</style>