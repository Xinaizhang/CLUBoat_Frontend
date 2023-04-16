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
                        <el-button class="button" color="#023764" @click="dialogFormVisible = true">发布活动
                        </el-button>
                    </div>
                </template>

                <!-- 活动列表 -->
                <el-table :data="activityList.slice((page-1) * limit, page * limit)" style="width: 100%" size="large"
                    height="430" highlight-current-row @current-change="getCurrentRow">
                    <el-table-column label="序号" type="index" width="70" />
                    <el-table-column prop="activityName" label="标题" />
                    <el-table-column prop="activityArea" label="地点" />
                    <el-table-column prop="activityStartTime" sortable label="开始时间" />
                    <el-table-column prop="activityEndTime" sortable label="结束时间" />
                    <el-table-column prop="activityContent" label="内容" />
                    <!-- 修改删除按钮 -->
                    <el-table-column fixed="right" label="操作" width="120">
                        <el-button link type="primary" size="small" @click="dialogFormVisible1 = true">修改</el-button>
                        <el-button link type="primary" size="small" @click="confirmDeleteActivity">删除</el-button>
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

                <!-- 发布活动 -->
                <el-dialog v-model="dialogFormVisible" title="发布活动" align-center draggable>
                    <el-form :model="activity">
                        <el-form-item label="活动标题" label-width="110px">
                            <el-input v-model="activity.activityName" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="活动地点" label-width="110px">
                            <el-input v-model="activity.activityArea" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="活动开始时间" label-width="110px">
                            <el-input v-model="activity.activityStartTime" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="活动结束时间" label-width="110px">
                            <el-input v-model="activity.activityEndTime" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="活动内容" label-width="110px">
                            <el-input v-model="activity.activityContent" autocomplete="off" type="textarea" :rows="6" />
                        </el-form-item>

                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取消</el-button>
                            <el-button type="primary" @click="addActivity">确认</el-button>
                        </span>
                    </template>
                </el-dialog>

                <!-- 修改活动 -->
                <el-dialog v-model="dialogFormVisible1" title="修改活动" align-center draggable>
                    <el-form :model="activity">
                        <el-form-item label="活动标题" label-width="110px">
                            <el-input v-model="activity.activityName" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="活动地点" label-width="110px">
                            <el-input v-model="activity.activityArea" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="活动开始时间" label-width="110px">
                            <el-input v-model="activity.activityStartTime" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="活动结束时间" label-width="110px">
                            <el-input v-model="activity.activityEndTime" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="活动内容" label-width="110px">
                            <el-input v-model="activity.activityContent" autocomplete="off" type="textarea" :rows="6" />
                        </el-form-item>

                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible1 = false">取消</el-button>
                            <el-button type="primary" @click="modifyActivity">确认</el-button>
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
    import { ElMessage, ElMessageBox } from 'element-plus'
    import 'element-plus/es/components/message/style/index'
    import 'element-plus/es/components/message-box/style/index'

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
                activity: {
                    clubId: 1,
                    activityId: 1,
                    activityName: "",
                    activityArea: "",
                    activityStartTime: "",
                    activityEndTime: "",
                    activityContent: "",
                    activityIsPass: "",
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
                    this.activity.activityId = value.activityId;
                    this.activity.clubId = value.clubId;
                    this.activity.activityName = value.activityName;
                    this.activity.activityArea = value.activityArea;
                    this.activity.activityStartTime = value.activityStartTime;
                    this.activity.activityEndTime = value.activityEndTime;
                    this.activity.activityContent = value.activityContent;
                    console.log("hhhhhh");
                    console.log(this.news);
                }
            },

            addActivity() {
                if (this.activity.activityName == "" || this.activity.activityArea == ""
                    || this.activity.activityStartTime == ""
                    || this.activity.activityEndTime == ""
                    || this.activity.activityContent == "") {
                    ElMessage({
                        message: "不能为空?",
                        type: 'error',
                    })
                    return;
                }
                this.dialogFormVisible = false;

                this.$axios({
                    method: 'post',
                    url: '/api/club-manage/activity',
                    data: {
                        clubId: this.activity.clubId,
                        activityName: this.activity.activityName,
                        activityArea: this.activity.activityArea,
                        activityStartTime: this.activity.activityStartTime,
                        activityEndTime: this.activity.activityEndTime,
                        activityContent: this.activity.activityContent,
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

            modifyActivity() {
                this.dialogFormVisible1 = false;
                this.$axios({
                    method: 'put',
                    url: '/api/club-manage/activity',
                    data: this.activity,
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

            deleteActivity() {
                this.$axios({
                    method: 'delete',
                    url: '/api/club-manage/activity/' + this.activity.activityId,
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

            confirmDeleteActivity() {
                ElMessageBox.confirm(
                    '确认删除活动?',
                    '提示',
                    {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                    }
                )
                    .then(() => {
                        this.deleteActivity();
                    })
            },
            filterTag(value, row) {
                return row.activityApplyIsPass === value;
            },
        },
        created() {
            this.$axios({
                method: 'get',
                url: '/api/club-manage/activity/'+localStorage.getItem("clubId"), 
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