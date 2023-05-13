<template>
    <div style="background:#FFC353;min-height: 95vh;padding-bottom: 5vh;">
        <!-- 返回按钮 -->
        <div class="back">
            <!-- 返回按钮 -->
            <el-button @click="goTo()" size="large" color="#023764" style="font-size:18px">
                <el-icon>
                    <ArrowLeftBold />
                </el-icon>
                <span style="margin-right: 10px;">返回</span>
            </el-button>
        </div>
        <!-- 活动标题 -->
        <el-row justify="center" class="title-container">
            <span class="titleText">{{ activity.activityTitle }}</span>
        </el-row>

        <el-row justify="center">

            <!-- 活动详细信息表格 -->
            <div style="background:#ffffff;position:relative" class="detail">
                <img class="Img" src="../assets/activitydetail.png">
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
                        <el-tag size="large" type="success" style="width:60%;font-size:16px">{{ activity.activityCampus
                        }}</el-tag>
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
                        <el-tag size="large" type="success" style="width:60%;font-size:16px">{{ activity.activityLocation
                        }}</el-tag>
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

                    <el-descriptions-item label-align="center" align="center">
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
                            &emsp;&emsp;{{ activity.activityDescription }}
                        </div>
                    </el-descriptions-item>
                </el-descriptions>
                <!-- 关注按钮 -->
                <el-row justify="center">
                    <el-button type="primary" color="#023764" style="font-size:16px;margin-top: 5vh;"
                        @click="attentionActivity()">关注活动</el-button>
                </el-row>
            </div>
        </el-row>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/index'

export default {
    name: "ActivityDetail",
    components: {

    },
    data() {
        return {
            activity: {
                activityId: null,
                userId: null,
                clubId: null, 
                activityTitle: null,
                activityDate: null,
                activityTime:null,
                activityCampus: null,
                activityLocation: null,
                activityPeopleNum: null,
                activityDescription: null,
                userName: null,
            }
        }
    },
    methods: {
        goTo() {
            this.$router.back();
            // this.$router.go(-1);
            // this.$router.push('/details')
        },
        attentionActivity() {
            this.$axios({
                method: 'post',
                url: '/api/club-manage/my-activity',
                data: {
                    activityId: localStorage.getItem("activityId"),
                    userId: localStorage.getItem("userId")
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        ElMessage({
                            message: "关注成功",
                            type: 'success',
                        })
                    } else {
                        ElMessage.error("已关注该活动")
                    }
                })
                .catch(function () {
                    ElMessage.error("操作失败")
                })
        },

    },
    created() {
        this.$axios({
            method: 'get',
            url: '/api/club-manage/activity/detail/'+localStorage.getItem("activityId"),
        })
            .then(res => {
                console.log(res.data.data);
                this.activity = res.data.data;
            })
            .catch(function (error) {
                console.log(error);
            })

    },
}
</script>


<style scoped>
.back {
    position: relative;
    padding-left: 40px;
    padding-top: 20px;
}

.Img {
    width: 200px;
    height: 200px;
    position: absolute;
    top: -15vh;
    left: 60vw;
}

.detail {
    border-radius: 30px;
    padding: 60px 60px 5vh 60px;
    width: 65%;
}

.title-container {
    margin-bottom: 10px;
}

.titleText {
    color: #023764;
    font-size: 30px;
    font-weight: bold;
    line-height: 10vh;
    margin-top: 3vh;
    letter-spacing: 2px;
}

.activityDescription {
    margin: 10px 20px 10px 25px;
    line-height: 24px;
    text-align: left;
}

.cell-icon {
    display: flex;
    align-items: center;
    font-size: 16px;
}

.cell-text {
    font-size: 16px;
    padding-left: 2px;
}
</style>