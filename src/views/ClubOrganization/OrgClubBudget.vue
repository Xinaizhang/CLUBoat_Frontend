<template>
    <OrgHeader />

    <el-row style="background:#EEEEEE">
        <OrgNav />
        <el-col :span="20" class="main">

            <!-- 财务管理 -->
            <el-card class="box-card-1" style="text-align:left">
                <template #header>
                    <div class="card-header">
                        <span>预算申请记录</span>
                        <el-button class="button" color="#023764" @click="dialogFormVisible = true">提交申请
                        </el-button>
                    </div>
                </template>


                <!--  -->

                <!-- 预算列表 -->
                <el-table :data="budgetList.slice((page - 1) * limit, page * limit)" style="width: 100%" size="large"
                    height="400" highlight-current-row @current-change="getCurrentRow">
                    <el-table-column label="序号" type="index" width="70" />
                    <el-table-column prop="title" label="标题" />
                    <el-table-column prop="amount" sortable label="申请金额" />
                    <el-table-column prop="createTime" sortable label="申请时间" />
                    <el-table-column prop="applicantName" label="申请人" />
                    <!-- <el-table-column prop="status" label="审批状态" /> -->
                    <el-table-column prop="status" label="审批状态" :filters="[
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

                    <!-- 查看详情按钮 -->
                    <el-table-column fixed="right" label="操作" width="120">
                        <el-button link type="primary" size="small" @click="this.dialogTableVisible = true">查看详情</el-button>
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

                <!--  -->


                <!-- 预算详情弹窗 -->
                <el-dialog v-model="dialogTableVisible" align-center draggable width="55vw" style="padding:0px 10px;"
                    title="预算申请详情">
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
                                        <el-table-column prop="description" label="Description" width="420"/>
                                        <el-table-column prop="money" label="Money" width="100" />
                                    </el-table>
                                </el-descriptions-item>

                            </el-descriptions>
                        </div>
                    </el-scrollbar>

                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogTableVisible = false">退出</el-button>
                        </span>
                    </template>
                </el-dialog>


                <!--  -->


                <el-dialog width="80%" v-model="dialogFormVisible" title="New Budget Apply">
                    <el-form>
                        <el-form-item label="Title ">
                            <el-input style="width: 180px;" v-model="apply.title" />
                        </el-form-item>
                    </el-form>


                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="Name">
                            <el-input v-model="item.name" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="Money">
                            <el-input type="number" min="0" v-model="item.money" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="Description">
                            <el-input style="width: 300px;" v-model="item.description" autocomplete="off" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addItem">Add</el-button>
                        </el-form-item>
                    </el-form>

                    <el-table :data="tableData" style="width: 100%" max-height="250">
                        <el-table-column prop="name" label="Name" width="220" />
                        <el-table-column prop="description" label="Description" width="500" />
                        <el-table-column prop="money" label="Money" width="120" />
                        <el-table-column fixed="right" label="Operations" width="120">
                            <template #default="scope">
                                <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
                                    Remove
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>


                    <div>Total Amount: {{ apply.amount }}</div>


                    <el-button type="primary" @click="addBudget">确认</el-button>
                </el-dialog>

            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import OrgNav from '@/components/OrgNav.vue'
import OrgHeader from '@/components/OrgHeader.vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import 'element-plus/es/components/message/style/index'
// import 'element-plus/es/components/message-box/style/index'

export default {
    name: "OrgClubBudget",
    data() {
        return {
            page: 1,
            limit: 6,
            total: 0,
            row: ref(0),
            budgetList: [],
            dialogFormVisible: false,
            dialogTableVisible: false,
            tableData: ref([]),
            item: ref({
                name: '',
                description: '',
                money: 0,
            }),
            apply: {
                clubId: localStorage.getItem("clubId"),
                applicantId: localStorage.getItem("userId"),
                amount: 0,
                title: '',
                itemList: [],
            },
            budget: ref({
                // clubName: '',
                // applicantName: '',
                // title: '',
                // amount: 0,
                // createTime: '',
                // item: [],
            })
        }
    },
    methods: {
        addItem() {
            if (this.item.name == '' || this.item.value <= 0) {
                ElMessage({
                    message: "invalid input!",
                    type: 'warning',
                })
                return;
            }
            this.item.money = parseInt(this.item.money);
            this.apply.amount = this.apply.amount + this.item.money;
            this.tableData.push(this.item);
            this.item = {
                name: '',
                description: '',
                money: 0,
            }
        },
        deleteRow(index) {
            this.tableData.splice(index, 1)
        },
        handleCurrentChange(val) {
            this.page = val
        },
        getCurrentRow(value){
            if(value!=null && this.dialogTableVisible == true){
                this.row=value.budgetId;
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
                    url: '/api/club-manage/budgets/detail/' + this.row,
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
        addBudget() {
            if (this.tableData.length == 0) {
                ElMessage({
                    message: "不能为空",
                    type: 'error',
                })
                return;
            }
            this.apply.itemList = this.tableData

            this.$axios({
                method: 'post',
                url: '/api/club-manage/budgets',
                data: this.apply,
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
                        alert(400);
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
            url: '/api/club-manage/budgets/' + localStorage.getItem("clubId"),
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