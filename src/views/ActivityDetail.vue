<template>
    <div style="background:#FFC353;height: 100%;">
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
            <img class="titleImg" src="../assets/activitydetail.png">
            <span class="titleText">{{ activity.activityTitle }}</span>
        </el-row>
        
        <el-row justify="center">
            <!-- 活动详细信息表格 -->
            <div style="background:#ffffff" class="detail">
                <el-descriptions :model="activity" :column="2" border>
                    <el-descriptions-item label-align="center" align="center" width="25%">
                        <template #label>
                            <el-row justify="center" align="middle">
                                <el-col :span="2" class="cell-icon">
                                    <el-icon><School /></el-icon>
                                </el-col>
                                <el-col :span="10" class="cell-text">
                                    <span>活动校区</span>
                                </el-col>
                            </el-row>
                        </template>
                        <el-tag size="large" type="success" style="width:60%;font-size:16px">{{ activity.activityCampus }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label-align="center" align="center" width="25%">
                        <template #label>
                            <el-row justify="center" align="middle">
                                <el-col :span="2" class="cell-icon">
                                    <el-icon><Location /></el-icon>
                                </el-col>
                                <el-col :span="10" class="cell-text">
                                    <span>活动地点</span>
                                </el-col>
                            </el-row>
                        </template>
                        <el-tag size="large" type="success" style="width:60%;font-size:16px">{{ activity.activityLocation }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label-align="center" align="center">
                        <template #label>
                            <el-row justify="center" align="middle">
                                <el-col :span="2" class="cell-icon">
                                    <el-icon><Calendar /></el-icon>
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
                                    <el-icon><Timer /></el-icon>
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
                                    <el-icon><User /></el-icon>
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
                                    <el-icon><DataAnalysis /></el-icon>
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
                                    <el-icon><Edit /></el-icon>
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
                    <el-button type="primary" color="#023764" style="font-size:16px;margin-top: 20px;" @click="attentionActivity()">关注活动</el-button>
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
            activity:{
                activityApplyId: 1,
                userId: 1,
                clubId: 1,
                activityApplyTime: '2022-12-19 00:34:35',
                status: '待审批',
                activityTitle: '活动标题标题标题标题标题标题',
                activityDate:'2023-3-4',
                activityTime:'18:00 - 19:00',
                activityCampus:'嘉定校区',
                activityLocation:'嘉定广楼204',
                activityPeopleNum:"20 ~ 30",
                activityDescription:'同济大学学生社团联合会，简称“社团联合会”，是在同济大学党委领导下的同济大学学生社团的管理组织，接纳同济大学在校学生作为组织成员。同济大学社团联合会在工作上同时接受共青团同济大学委员会的指导。学生社团联合会的意义在与协调社团之间的资源支配。而随着社团的壮大，社团联也迅速成长起来。渐渐形成了以社团为特色，与社团做朋友的一个服务社团，统筹社团，规范社团，记录社团的大型组织。社团联服务社团，不仅为社团提供日常活动需要的场地和经费，还会为社团搭建一个更大的更有影响力的舞台，让社团发挥自己的才能展现自己的风采；同济大学社团联合会联规范同济大学校内的各个社团，每年定期举办合格社团联领导人资格认证。同时，社团联有完善的办公室规章制度，为规范社团，规范日常工作起到了很好的作用。同济大学校内的各个社团是围绕在社团联周围的组织，也是社团联核心的组织。',
                activityApplyReason: '申请理由',
                feedback: '反馈',
                userName: '文俊辉',
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

    },
}
</script>


<style scoped>
.back {
    position: relative;
    padding-left: 40px;
    padding-top: 20px;
}


.detail {
    border-radius: 30px 30px 0 0;
    padding: 60px;
    width: 65%;
}
.title-container {
    margin-bottom: 10px;
}
.titleImg{
    width: 100px; 
    height: 100px;
}
.titleText {
    font-size: 26px;
    font-weight: bold;
    line-height: 100px;
    margin-left: 20px;
}
.activityDescription{
    margin: 10px 20px 10px 25px;
    line-height: 24px;
    text-align: left;
}
.cell-icon {
  display: flex;
  align-items: center;
  font-size: 16px;
}
.cell-text{
    font-size: 16px;
    padding-left: 2px;
}
</style>