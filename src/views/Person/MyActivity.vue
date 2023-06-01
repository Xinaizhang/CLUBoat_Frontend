<template>
  <Nav />
  <el-row class="content">
    <el-col :span="3" :offset="3">
      <el-menu class="sidebar" default-active="/myActivity" router=true active-text-color="#FFC353"
        background-color="#023764" text-color="#fff">
        <el-menu-item index="/personInfo">
          <p style="margin: 0 auto;font-size:2.3vh;">
            <el-icon>
              <User />
            </el-icon>
            <span>我的信息</span>
          </p>
        </el-menu-item>
        <el-menu-item index="/myActivity">
          <p style="margin: 0 auto;font-size:2.3vh;">
            <el-icon>
              <Football />
            </el-icon>
            <span>我的活动</span>
          </p>
        </el-menu-item>
        <el-menu-item index="/myClub">
          <p style="margin: 0 auto;font-size:2.3vh;">
            <el-icon>
              <Ship />
            </el-icon>
            <span>我的社团</span>
          </p>
        </el-menu-item>
        <el-menu-item index="/notification">
          <p style="margin: 0 auto;font-size:2.3vh;">
            <el-icon>
              <Bell />
            </el-icon>
            <span>我的通知</span>
          </p>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="15" class="card">
      <el-header class="card_hd">
        <span class="word">我的活动</span>
      </el-header>
      <el-row>
        <el-tabs v-if="activityList && display" v-model="tabs" class="tabs" style="width:100%;">
          <!-- 全部活动 -->
          <el-tab-pane label="&emsp;&nbsp;全部&nbsp;&emsp;" name="全部">
            <el-scrollbar max-height="55vh" style="padding-right:10px;">
              <el-row justify="center">
                <el-card class="box-card" v-for="item in activityList" :key="item.activityId" shadow="hover">
                  <template #header>
                    <div class="card-header">
                      <span>{{ item.activityTitle }}</span>
                      <!-- <el-button color="#023764" class="button" icon="ArrowRightBold" circle></el-button> -->
                      <el-button color="#023764" class="button" icon="ArrowRightBold" @click="goActivityDetail(item)"
                        circle>
                      </el-button>
                    </div>
                  </template>
                  <el-row>
                    <el-col class="textFather" :span="21">
                      <div class="text">{{ item.activityDescription }}</div>
                    </el-col>
                    <el-col :span="3">
                      <el-button class="button" color="#023764" @click="edit(item.activityId)">取消关注</el-button>
                    </el-col>
                  </el-row>
                </el-card>
              </el-row>

            </el-scrollbar>
          </el-tab-pane>

          <!-- 未过期活动 -->
          <el-tab-pane label="&emsp;未过期&emsp;" name="未过期">
            <el-scrollbar max-height="55vh" style="padding-right:10px;">
              <el-card class="box-card" v-for="item in activityList" v-show="activityTime(item.activityTime)"
                :key="item.activityId" shadow="hover">
                <template #header>
                  <div class="card-header">
                    <span>{{ item.activityTitle }}</span>
                    <el-button color="#023764" class="button" icon="ArrowRightBold" circle></el-button>
                  </div>
                </template>
                <el-row>
                  <el-col class="textFather" :span="21">
                    <div class="text">{{ item.activityDescription }}</div>
                  </el-col>
                  <el-col :span="3">
                    <el-button class="button" color="#023764" @click="edit">取消关注</el-button>
                  </el-col>
                </el-row>
              </el-card>
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>

      </el-row>
      <el-empty style="height:478px;" v-if="!activityList" description="暂时没有关注活动" />
    </el-col>
  </el-row>
</template>
  
<script>
import Nav from '@/components/Nav.vue'
import { Bell, Football } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/index'

export default {
  name: "myActivity",
  data() {
    return {
      currentDate: "",
      tabs: "全部",
      activityList: [{}],
      display: true,
    }
  },
  methods: {
    goActivityDetail(activity) {
      console.log("activityId:" + activity.activityId)
      localStorage.setItem('activityId', activity.activityId);
      this.$router.push({
        path: '/activitydetail',
      })
    },
    activityTime(value) {
      var date1 = new Date(value)
      var date2 = new Date(this.currentDate)
      if (date1.getTime() > date2.getTime()) {
        console.log("日期比较" + value + "：" + date1.getTime() + ">" + this.currentDate + "：" + date2.getTime())
        return true
      } else {
        return false
      }
    },
    edit(value) {
      this.$axios({
        method: 'delete',
        url: '/api/user-info/my-activity',
        data: {
          userId: localStorage.getItem('userId'),
          activityId: value,
        },
      })
        .then(res => {
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
          ElMessage.error("无记录")
        })
    }
  },
  created() {
    var time = new Date();
    var month = time.getMonth() + 1;
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (minute < 10) {
      minute = '0' + minute;
    }
    if (second < 10) {
      second = '0' + second;
    }
    this.currentDate = (time.getFullYear() + '-' + month + '-' + time.getDate() + ' ' + hour + ':' + minute + ':' + second);

    console.log(this.currentDate);
    this.$axios({
      method: 'get',
      url: '/api/user-info/my-activity/' + localStorage.getItem('userId'),
    })
      .then(res => {
        this.activityList = res.data.data;
        console.log('我的活动' + this.activityList);
      })
      .catch(function (error) {
        console.log(error);
      })
  },
  components: {
    Nav,
    Bell,
    Football
  },
}
</script>

<style scoped>
.content{
  height: auto;
  margin-top:5vh;
}
.sidebar{
  text-align: center;
  height: 82vh;
}
.card{
  border: 1px solid #023764;
  height: 82vh;
}

.card_hd {
  background-color: #0236641d;
  height: 80px;
  line-height: 80px;
  color: #023764;
  padding-left: 60px;
}

.card_hd .word {
  padding-left: 10px;
  color: #023764;
  border-left: 8px solid #FFC353;
  font-size: 2.7vh;
}

.card .tabs {
  margin: 20px 80px;
  color: #023764;
  font-size: 32px;
  font-weight: 600;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2.5vh;
  font-weight: 600;
}

.card-header .button {
  color: #fff;
  height: 4vh;
  width: 4vh;
}

.textFather {
  display: flex;
}

.text {
  font-size: 2vh;
  font-weight: normal;
  align-self: center;
  display: -webkit-box;
  /* 垂直对齐 */
  -webkit-box-orient: vertical;
  /* 几行省略 */
  -webkit-line-clamp: 2;
  /* 超出隐藏 */
  overflow: hidden;
  /* 超出的文字省略号表示 */
  text-overflow: ellipsis;
}

.button {
  color: #FFC353;
  height: 4vh;
    line-height: 4vh;
    width: 6vw;
    font-size: 2vh;
}

.button:hover {
  color: #FFC353;
}

.box-card {
  width: 50vw;
  margin-bottom: 1vh;
}
</style>