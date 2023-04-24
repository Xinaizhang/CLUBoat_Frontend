<template>
    <div style="background:#FFC353">
        <div class="back">
            <!-- 返回按钮 -->
            <el-button @click="goTo()" size="large" color="#023764" style="font-size:18px">
                <el-icon>
                    <ArrowLeftBold />
                </el-icon>
                返回
            </el-button>
        </div>


            <!-- 活动标题 -->
            <div class="title-container">
                <div>
                    <img style="width: 100px; height: 100px; left: 10px" src="../assets/activitydetail.png">
                    <div class="title">
                        <span>活动标题标题标题标题</span>
                    </div>
                </div>
            </div>
        
        <el-row>
            <el-col :span="4">
            </el-col>

            <!-- 活动详细信息表格 -->
            <el-col :span="16" style="background:#ffffff" class="detail">
                <el-descriptions :column="2" :size="large" border>

                    <el-descriptions-item label-align="center" align="center" width="100px">
                        <template #label>
                            <div class="cell-item">
                                活动地点
                            </div>
                        </template>
                        <el-tag size="large" type="success" style="font-size:16px">广楼 204</el-tag>
                    </el-descriptions-item>

                    <el-descriptions-item label-align="center" align="center" width="100px">
                        <template #label>
                            <div class="cell-item">
                                负责人
                            </div>
                        </template>
                        <el-tag size="large" style="font-size:16px">闻珺慧</el-tag>
                    </el-descriptions-item>

                    <el-descriptions-item label-align="center" align="center" width="100px">
                        <template #label>
                            <div class="cell-item">
                                活动时间
                            </div>
                        </template>
                        <div style="font-size:18px">
                            2023/3/4 18:00-19:00
                        </div>
                    </el-descriptions-item>

                    <el-descriptions-item label-align="center" align="center" width="100px">
                        <template #label>
                            <div class="cell-item">
                                预计参与人数
                            </div>
                        </template>
                        <div style="font-size:18px">
                            20 ~ 30
                        </div>
                    </el-descriptions-item>

                    <el-descriptions-item label-align="center" align="center" width="100px">
                        <template #label>
                            <div class="cell-item">
                                活动详情
                            </div>
                        </template>
                        <div style="font-size:18px">
                            你对星空有着无限的向往吗？你想了解宇宙的奥秘和美丽吗？你想和志同道合的朋友一起探索天文学的魅力吗？
                            如果你的答案是肯定的，那么欢迎你加入我们的天文社！
                            本次天文讲座邀请了专业的天文学家或老师为我们分享最新的天文研究成果或基础知识，让我们开阔视野，增长见识。
                        </div>
                    </el-descriptions-item>



                </el-descriptions>
                <!-- 关注按钮 -->

                <el-button type="primary" size="large" color="#023764" style="font-size:18px">关注活动</el-button>


            </el-col>

            <el-col :span="4">
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "ActivityDetail",
    components: {

    },
    data() {
        return {

        }
    },
    methods: {
        goTo() {
            this.$router.back();
            // this.$router.go(-1);
            // this.$router.push('/details')
        }

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
    min-height: 75ch;
    border-radius: 30px 30px 0 0;
    padding: 60px;
    font-size: 16px;
}


.cell-item {
    font-size: 18px;
    padding-top: 10px;
    padding-bottom: 10px
}

.title-container {
    text-align: center;
    position: relative;
}

.title {
    position: relative;
    font-size: 26px;
    margin: 0px auto 10px auto;
    text-align: center;
    font-weight: bold;
    display: inline-block;
    /* 指定相对位置 */
    bottom: 30px;
    left: 20px;
}
</style>