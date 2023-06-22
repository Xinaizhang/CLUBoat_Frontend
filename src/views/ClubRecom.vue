<template>
    <div style="background:#FFC353;min-height: 95vh;padding-bottom: 5vh;">
        <!-- 返回主页按钮 -->
        <div class="back">
            <el-button @click="goTo()" size="large" color="#023764" style="font-size:18px">
                <el-icon>
                    <ArrowLeftBold />
                </el-icon>
                <span style="margin-right: 10px;">返回主页</span>
            </el-button>
        </div>
        <!-- 问卷标题 -->
        <el-row justify="center" class="title-container">
            <span class="titleText">AI社团推荐调查问卷</span>
        </el-row>

        <el-row justify="center">
            <!-- 问卷具体内容 -->
            <div style="background:#ffffff;position:relative" class="detail">
                <img class="Img" src="../assets/ClubRecom.png">
                <div>
                    亲爱的同学，我们设计了这个问卷以帮助你找到你可能感兴趣的大学社团。请花一点时间回答以下问题。<br><br>
                </div>

                <div><br>1. 请问你所在的学科专业是？[单选]</div>
                <el-checkbox-group v-model="A1" :min="0" :max="1">
                    <el-checkbox v-for="q in Q1" :key="q" :label="q">
                        {{ q }}</el-checkbox>
                </el-checkbox-group>

                <div><br>2. 你平时有什么特别喜欢的娱乐活动或爱好？[最多选3项]</div>
                <el-checkbox-group v-model="A2" :min="0" :max="3">
                    <el-checkbox v-for="q in Q2" :key="q" :label="q">
                        {{ q }}</el-checkbox>
                </el-checkbox-group>

                <div><br>3. 你有没有特别喜欢的艺术形式？[最多选3项]</div>
                <el-checkbox-group v-model="A3" :min="0" :max="3">
                    <el-checkbox v-for="q in Q3" :key="q" :label="q">
                        {{ q }}</el-checkbox>
                </el-checkbox-group>

                <div><br>4. 你对什么体育活动有兴趣？[最多选3项]</div>
                <el-checkbox-group v-model="A4" :min="0" :max="3">
                    <el-checkbox v-for="q in Q4" :key="q" :label="q">
                        {{ q }}</el-checkbox>
                </el-checkbox-group>

                <!-- <div><br>5. 你对哪个科学领域感兴趣？[最多选3项]</div>
                <el-checkbox-group v-model="A5" :min="0" :max="3">
                    <el-checkbox v-for="q in Q5" :key="q" :label="q">
                        {{ q }}</el-checkbox>
                </el-checkbox-group> -->

                <div><br>5. 你有没有想学习的乐器？[单选]</div>
                <el-checkbox-group v-model="A6" :min="0" :max="3">
                    <el-checkbox v-for="q in Q6" :key="q" :label="q">
                        {{ q }}</el-checkbox>
                </el-checkbox-group>

                <!-- <div><br>7. 你对探讨哪类社会问题有兴趣？[最多选3项]</div>
                <el-checkbox-group v-model="A7" :min="0" :max="3">
                    <el-checkbox v-for="q in Q7" :key="q" :label="q">
                        {{ q }}</el-checkbox>
                </el-checkbox-group> -->

                <div><br>6. 你希望通过参加社团活动获得什么样的收获？[最多选2项]</div>
                <el-checkbox-group v-model="A8" :min="0" :max="2">
                    <el-checkbox v-for="q in Q8" :key="q" :label="q">
                        {{ q }}</el-checkbox>
                </el-checkbox-group>

                <!-- <div><br>9. 你希望社团的活动地点在哪里？[单选]</div>
                <el-checkbox-group v-model="A9" :min="0" :max="1">
                    <el-checkbox v-for="q in Q9" :key="q" :label="q">
                        {{ q }}</el-checkbox>
                </el-checkbox-group> -->

                <div><br>7. 对于社团活动的形式，你更倾向于哪一种？[单选]</div>
                <el-checkbox-group v-model="A10" :min="0" :max="1">
                    <el-checkbox v-for="q in Q10" :key="q" :label="q">
                        {{ q }}</el-checkbox>
                </el-checkbox-group>


                <!-- 提交问卷 -->
                <el-row justify="center">
                    <el-button type="primary" color="#023764" style="font-size:16px;margin-top: 5vh;" @click="submit()">
                        提交问卷</el-button>
                </el-row>
            </div>
        </el-row>
    </div>
</template>

<script>
// import { ElMessage } from 'element-plus'
// import 'element-plus/es/components/message/style/index'
import { ElMessageBox } from 'element-plus'
// import type { Action } from 'element-plus'

export default {
    name: "ClubRecom",
    components: {

    },
    data() {
        return {
            Q1: ['文学', '历史学', '哲学', '经济学', '管理学', '法学', '理学', '工学', '医学', '教育学', '艺术学'],
            Q2: ['阅读和写作', '绘画或摄影', '烹饪', '音乐（唱歌，弹乐器等）', '体育（足球，篮球，游泳等）', '电脑/手机游戏'],
            Q3: ['音乐', '舞蹈', '绘画', '书法', '摄影', '戏剧', '其他'],
            Q4: ['足球', '篮球', '游泳', '乒乓球', '羽毛球', '瑜伽', '健身', '其他'],
            Q5: ['生物学', '物理学', '化学', '天文学', '地质学', '其他'],
            Q6: ['吉他', '钢琴', '小提琴', '鼓', '吹奏乐器', '不想学习乐器', '其他'],
            Q7: ['人权问题', '环保问题', '政治议题', '性别平等', '教育改革', '文化多元性', '其他'],
            Q8: ['扩大社交圈子', '提高个人技能', '获得学术进步', '社区服务经验'],
            Q9: ['校内', '校外', '不限'],
            Q10: ['线下面对面活动', '线上虚拟活动', '不限'],

            A1: [],
            A2: [],
            A3: [],
            A4: [],
            A5: [],
            A6: [],
            A7: [],
            A8: [],
            A9: [],
            A10: [],
            userAnswer: "",
        }
    },
    methods: {
        goTo() {
            //this.$router.back();
            // this.$router.go(-1);
            this.$router.push('/home')
        },

        submit() {
            this.userAnswer = ""

            ElMessageBox.alert('为您推荐：吉他社、音游社、摄影社', '推荐结果', {
                // if you want to disable its autofocus
                // autofocus: false,
                confirmButtonText: 'OK',
                // callback: (action: Action) => {
                //     ElMessage({
                //         type: 'info',
                //         message: `action: ${action}`,
                //     })
                // },
            })

            this.$axios({
                method: 'post',
                url: '/localhost/chat',
                data: { prompt: this.userAnswer }
            })
                .then(res => {
                    console.log(res.data.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        },

    }
}
</script>


<style scoped>
.back {
    position: relative;
    padding-left: 40px;
    padding-top: 20px;
}

.Img {
    width: 150px;
    height: 200px;
    position: absolute;
    top: -20vh;
    left: 60vw;
}

.detail {
    border-radius: 30px;
    padding: 60px 100px 5vh 100px;
    width: 60%;
    margin: 0px 100px 0px 100px;
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