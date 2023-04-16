<template>
    <OrgHeader />

    <el-row style="background:#EEEEEE">
        <OrgNav />
        <el-col :span="20" class="main">

            <!-- 财务管理 -->
            <el-card class="box-card-1" style="text-align:center">
                <template #header>
                    <div class="card-header">
                        <span>提交预算</span>
                    </div>
                </template>
                <!-- 交预算表 -->
                <el-form :model="budget">
                    <el-form-item label="申请理由" label-width="110px">
                        <el-input v-model="budget.budgetApplyReason" autocomplete="off" type="textarea" :rows="6" />
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="addBudget">确认</el-button>

            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import OrgNav from '@/components/OrgNav.vue'
    import OrgHeader from '@/components/OrgHeader.vue'
    import { ElMessage } from 'element-plus'
    import 'element-plus/es/components/message/style/index'
    // import 'element-plus/es/components/message-box/style/index'

    export default {
        name: "OrgClubBudget",
        data() {
            return {
                budget: {
                    userId: localStorage.getItem("userId"),
                    clubId: localStorage.getItem("clubId"),
                    budgetApplyReason: "",
                    budgetApplyTime: "",
                }
            }
        },
        methods: {
            getNowDate() {
                var date = new Date();
                var sign2 = ":";
                var year = date.getFullYear() // 年
                var month = date.getMonth() + 1; // 月
                var day = date.getDate(); // 日
                var hour = date.getHours(); // 时
                var minutes = date.getMinutes(); // 分
                var seconds = date.getSeconds() //秒
                // var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
                // var week = weekArr[date.getDay()];
                // 给一位数的数据前面加 “0”
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (day >= 0 && day <= 9) {
                    day = "0" + day;
                }
                if (hour >= 0 && hour <= 9) {
                    hour = "0" + hour;
                }
                if (minutes >= 0 && minutes <= 9) {
                    minutes = "0" + minutes;
                }
                if (seconds >= 0 && seconds <= 9) {
                    seconds = "0" + seconds;
                }
                this.budgetApplyTime = year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds;
            },

            addBudget() {
                this.getNowDate();
                if (this.budget.budgetApplyReason == "") {
                    ElMessage({
                        message: "不能为空",
                        type: 'error',
                    })
                    return;
                }

                this.$axios({
                    method: 'post',
                    url: '/api/club-manage/budget-application',
                    data: this.budget,
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