<template>
    <OrgHeader />

    <el-row style="background:#EEEEEE">
        <OrgNav />
        <el-col :span="20" class="main">

            <!-- 活动管理 -->
            <el-card class="box-card-1">
                <template #header>
                    <div class="card-header">
                        <span>活动管理</span>
                        <el-button class="button" color="#023764" @click="dialogFormVisible1 = true">发布活动
                        </el-button>
                    </div>
                </template>

                <!-- 活动列表 -->
                <el-table :data="activityList.slice((page - 1) * limit, page * limit)" style="width: 100%" size="large"
                    height="430" highlight-current-row @current-change="getCurrentRow">
                    <el-table-column label="序号" type="index" width="80" />
                    <el-table-column prop="userName" label="用户名" width="160" />
                    <el-table-column prop="clubName" label="社团名" width="160" />
                    <el-table-column prop="activityTitle" label="活动标题" />
                    <el-table-column prop="activityApplyReason" label="申请理由" />
                    <el-table-column prop="activityApplyTime" sortable label="申请时间" />
                    <el-table-column prop="status" label="状态" width="100" :filters="[
                            { text: '待审批', value: '待审批' },
                            { text: '已通过', value: '已通过' },
                            { text: '未通过', value: '未通过' },
                        ]" :filter-method="filterTag" filter-placement="bottom-end">
                        <template #default="scope">
                            <el-tag v-if="scope.row.status == '已通过'" type="success" disable-transitions>已通过</el-tag>
                            <el-tag v-if="scope.row.status == '已拒绝'" type="danger" disable-transitions>已拒绝</el-tag>
                            <el-tag v-if="scope.row.status == '待审批'" disable-transitions>待审批</el-tag>
                        </template>
                    </el-table-column>

                    <!-- 查看详情按钮 -->
                    <el-table-column fixed="right" label="操作" width="120">
                        <el-button link type="primary" size="small" @click="dialogFormVisible = true">查看</el-button>
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

                <!-- 发布活动
                -activityApplyReason: null,
                -activityTitle: null,
                -activityDate: null,
                -activityTime: null,
                -activityCampus: null,
                -activityLocation: null,
                -activityPeopleNum: null,
                -activityDescription: null -->
                <el-dialog v-model="dialogFormVisible1" title="发布活动" align-center draggable>
                    <el-form :model="activity">
                        <el-form-item label="活动标题" label-width="110px">
                            <el-input v-model="activity.activityTitle" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="活动校区" label-width="110px">
                            <el-input v-model="activity.activityCampus" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="活动地点" label-width="110px">
                            <el-input v-model="activity.activityLocation" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="活动日期" label-width="110px">
                            <!-- <el-input v-model="activity.activityDate" autocomplete="off" /> -->
                            <el-date-picker v-model="activity.activityDate" type="date" placeholder="Pick a day" />
                        </el-form-item>
                        <el-form-item label="活动时间" label-width="110px">
                            <!-- <el-input v-model="activity.activityTime" autocomplete="off" /> -->
                            <div class="demo-time-range">
                                <el-time-select v-model="startTime" :max-time="endTime" class="mr-4"
                                    placeholder="Start time" start="06:00" step="00:15" end="23:45" />
                                <el-time-select v-model="endTime" :min-time="startTime" placeholder="End time" start="06:00"
                                    step="00:15" end="23:45" />
                            </div>
                        </el-form-item>
                        <el-form-item label="预计人数" label-width="110px">
                            <el-input v-model="activity.activityPeopleNum" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="活动描述" label-width="110px">
                            <el-input v-model="activity.activityDescription" autocomplete="off" type="textarea" :rows="6" />
                        </el-form-item>
                        <el-form-item label="申请原因" label-width="110px">
                            <el-input v-model="activity.activityApplyReason" autocomplete="off" type="textarea" :rows="6" />
                        </el-form-item>

                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible1 = false">取消</el-button>
                            <el-button type="primary" @click="addActivity">确认</el-button>
                        </span>
                    </template>
                </el-dialog>

                <!-- 查看活动详情弹窗 -->
                <el-dialog v-model="dialogFormVisible" title="活动详情" align-center draggable>
                    <el-form :model="activity">
                        <el-scrollbar max-height="300px">
                            <el-descriptions :model="activity" :column="2" border>
                                <el-descriptions-item label-align="center" align="center" width="25%">
                                    <template #label>
                                        <el-row justify="center" align="middle">
                                            <el-col :span="2" class="cell-icon">
                                                <el-icon>
                                                    <School />
                                                </el-icon>
                                            </el-col>
                                            <el-col :span="10" class="cell-text">
                                                <span>活动校区</span>
                                            </el-col>
                                        </el-row>
                                    </template>
                                    <el-tag size="large" type="success" style="width:60%;font-size:16px">{{
                                        activity.activityCampus }}</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item label-align="center" align="center" width="25%">
                                    <template #label>
                                        <el-row justify="center" align="middle">
                                            <el-col :span="2" class="cell-icon">
                                                <el-icon>
                                                    <Location />
                                                </el-icon>
                                            </el-col>
                                            <el-col :span="10" class="cell-text">
                                                <span>活动地点</span>
                                            </el-col>
                                        </el-row>
                                    </template>
                                    <el-tag size="large" type="success" style="width:60%;font-size:16px">{{
                                        activity.activityLocation }}</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item label-align="center" align="center">
                                    <template #label>
                                        <el-row justify="center" align="middle">
                                            <el-col :span="2" class="cell-icon">
                                                <el-icon>
                                                    <Calendar />
                                                </el-icon>
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
                                                <el-icon>
                                                    <Timer />
                                                </el-icon>
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
                                                <el-icon>
                                                    <User />
                                                </el-icon>
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
                                                <el-icon>
                                                    <DataAnalysis />
                                                </el-icon>
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
                                                <el-icon>
                                                    <Edit />
                                                </el-icon>
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
                                                <el-icon>
                                                    <Edit />
                                                </el-icon>
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

                        <!-- 审核状态 -->
                        <el-form-item label="审核状态" label-width="70px">
                            <el-tag v-if="activity.status == '已通过'" type="success" disable-transitions>已通过</el-tag>
                            <el-tag v-if="activity.status == '已拒绝'" type="danger" disable-transitions>已拒绝</el-tag>
                            <el-tag v-if="activity.status == '待审批'" type="primary" disable-transitions>待审批</el-tag>
                        </el-form-item>
                        <el-form-item required v-if="activity.status != '待审批'" label="反馈" label-width="70px">
                            <el-input disabled v-model="activity.feedback" autocomplete="off" type="textarea" :rows="3" />
                        </el-form-item>
                    </el-form>

                    <!-- 返回按钮 -->
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">返回</el-button>
                        </span>
                    </template>
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
    name: "OrgClubActivity",
    data() {
        return {
            page: 1,
            limit: 8,
            total: 6,
            activityList: [{}],
            dialogFormVisible: false,
            dialogFormVisible1: false,
            feedback: null,

            userId: localStorage.getItem("userId"),
            clubId: localStorage.getItem("clubId"),

            startTime: null,
            endTime: null,
            activity: {
                activityApplyReason: null,
                activityTitle: null,
                activityDate: null,
                activityTime: null,
                activityCampus: null,
                activityLocation: null,
                activityPeopleNum: null,
                activityDescription: null
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
            if (value != null) {
                console.log(value);
                this.activity = value;
                console.log("hhhhhh");
                console.log(this.activity);
            }
        },

        filterTag(value, row) {
            return row.status === value;
        },

        addActivity() {
            if (this.activity.activityApplyReason == null
                || this.activity.activityCampus == null
                || this.activity.activityDate == null
                || this.activity.activityDescription == null
                || this.activity.activityLocation == null
                || this.activity.activityPeopleNum == null
                || this.startTime == null
                || this.endTime == null
                || this.activity.activityTitle == null
            ) {
                ElMessage({
                    message: "不能为空?",
                    type: 'error',
                })
                return;
            }
            console.log("activity:"+this.activity.activityApplyReason)

            this.dialogFormVisible1 = false;
            this.activity.activityTime=this.startTime + "-" + this.endTime;
            this.$axios({
                method: 'post',
                url: '/api/club-manage/activity-apply',
                data: {
                    userID: localStorage.getItem("userId"),
                    clubId: localStorage.getItem("clubId"),
                    activityApplyReason: this.activity.activityApplyReason,
                    activityTitle: this.activity.activityTitle,
                    activityDescription: this.activity.activityDescription,
                    activityPeopleNum: this.activity.activityPeopleNum,
                    activityLocation: this.activity.activityLocation,
                    activityCampus: this.activity.activityCampus,
                    activityTime: this.activity.activityTime,
                    activityDate: this.activity.activityDate
                }
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

    created() {
        this.$axios({
            method: 'get',
            url: '/api/club-manage/activity-apply/' + localStorage.getItem("clubId"),
        })
            .then(res => {
                console.log(res.data.data);
                this.activityList = res.data.data;
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
    min-height: 600px;
}
</style>