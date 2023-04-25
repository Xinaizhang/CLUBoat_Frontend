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


                <br>
                <el-tag class="ml-2" type="warning" size="large">Only main function operating. Still in process</el-tag>
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

const now = new Date()

export default {
    name: "OrgClubBudget",
    data() {
        return {
            dialogFormVisible: false,
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
            budget: {
                userId: localStorage.getItem("userId"),
                clubId: localStorage.getItem("clubId"),
                budgetApplyReason: "",
                budgetApplyTime: "",
            }
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
        onAddItem() {
            now.setDate(now.getDate() + 1)
            this.tableData.push({
                name: 'Tom',
                description: 'No. 189, Grove St, Los Angeles',
                money: 100,
            })
        },
        deleteRow(index) {
            this.tableData.splice(index, 1)
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
    min-height: 600px;
}
</style>