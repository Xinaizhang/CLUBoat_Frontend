<template>
    <OrgHeader />

    <el-row style="background:#EEEEEE">
        <OrgNav />
        <el-col :span="20" class="main">

            <!-- 财务管理 -->
            <el-card class="box-card-1" style="text-align:left">
                <el-input style="width: 200px;" v-model="apply.title" />
                <el-table :data="tableData" style="width: 100%" max-height="250">
                    <!-- <el-table-column fixed prop="date" label="Date" width="150" /> -->
                    <el-table-column prop="name" label="Name" width="220" />
                    <!-- <el-table-column prop="state" label="State" width="120" />
                    <el-table-column prop="city" label="City" width="120" /> -->
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
                <el-button class="mt-4" style="width: 100%" @click="this.dialogFormVisible = true;">Add Item</el-button>

                <div>Total Amount: {{ apply.amount }}</div>
                <el-dialog v-model="dialogFormVisible" title="Shipping address">
                    <el-form :model="item">
                        <el-form-item label="Name" :label-width="formLabelWidth">
                            <el-input v-model="item.name" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="Description" :label-width="formLabelWidth">
                            <el-input v-model="item.description" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="Money" :label-width="formLabelWidth">
                            <el-input type="number" v-model="item.money" autocomplete="off" />
                        </el-form-item>

                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">Cancel</el-button>
                            <el-button type="primary" @click="dialogFormVisible = false; addItem()">
                                Confirm
                            </el-button>
                        </span>
                    </template>
                </el-dialog>


                <!-- <template #header>
                    <div class="card-header">
                        <span>提交预算</span>
                    </div>
                </template> -->
                <!-- 交预算表 -->
                <!-- <el-form :model="budget">
                    <el-form-item label="申请理由" label-width="110px">
                        <el-input v-model="budget.budgetApplyReason" autocomplete="off" type="textarea" :rows="6" />
                    </el-form-item>
                </el-form>
                 -->
                <el-button type="primary" @click="addBudget">确认</el-button>

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
            this.item.money=parseInt(this.item.money);
            this.apply.amount=this.apply.amount+this.item.money;
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