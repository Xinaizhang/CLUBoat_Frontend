<template>
  <Nav/>
  <br>
  <br>
  <el-row class="content">
    <el-col :span="3" :offset="3">
      <el-menu class="sidebar"
        default-active="/notification"
        router=true
        active-text-color="#FFC353"
        background-color="#023764"
        text-color="#fff"
      >
        <el-menu-item index="/personInfo">
          <p style="margin: 0 auto;">
            <el-icon><User/></el-icon>
            <span>我的信息</span>
          </p>
        </el-menu-item>
        <el-menu-item index="/myActivity">
          <p style="margin: 0 auto;">
            <el-icon><Football/></el-icon>
            <span>我的活动</span>
          </p>
        </el-menu-item>
        <el-menu-item index="/myClub">
        <p style="margin: 0 auto;">
          <el-icon><Ship/></el-icon>
          <span>我的社团</span>
        </p>
      </el-menu-item>
      <el-menu-item index="/notification">
        <p style="margin: 0 auto;">
          <el-icon><Bell/></el-icon>
          <span>我的通知</span>
        </p>
      </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="15" class="card">
      <el-header class="card_hd">
        <span class="word">我的通知</span>
      </el-header>
      <el-row justify="center" style="margin-top: 20px;">
        <el-col :span="20">
          <el-scrollbar v-if="notificationList" max-height="480px" style="padding-right:2vw;">
            <el-timeline v-model="activeNames" style="padding-left:1px;">
              <el-timeline-item v-for="item in notificationList" :key="item.notificationId" :timestamp="item.notificationTime" placement="top" color="#FFC353" :hollow="true">
                <el-card>
                  <template #header>
                    <div class="card-header">
                      <h3>{{ item.notificationTitle }}</h3>
                      <div class="actorFather">
                        <div class="actor" v-if="item.isAdmin!=1">社团管理员</div>
                        <div class="actor" v-if="item.isAdmin==1">社联管理员</div>
                      </div>
                    </div>
                  </template>
                <p>{{ item.notificationContent }}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
          <el-empty style="height:478px;" v-if="!notificationList" description="未收到通知" />
        </el-col>
      </el-row>
    </el-col>
  </el-row>

</template>
  
<script>
import Nav from '@/components/Nav.vue'
import { Bell, Football } from '@element-plus/icons-vue';

export default {
  name: "myNotification",
  data () {
    return {
      notificationList: null,
    }
  },
  methods: {
  },
  created() {
    this.currentDate = new Date();
    this.$axios({
      method: 'get',
      url: '/api/user-info/notification/'+localStorage.getItem('userId'),
    })
    .then(res => {
      console.log(res.data.data);
      this.notificationList=res.data.data;
      this.notificationList.sort(function(a, b) {
          return b.notificationTime < a.notificationTime ? -1 : 1
      })
      console.log("通知"+this.activeNames)
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
    height: 600px;
  }
  .sidebar{
    text-align: center;
    height: 600px;
  }
  .card{
    border: 1px solid #023764;
  }
  .card_hd{
    background-color: #0236641d;
    height: 80px;
    line-height: 80px;
    color: #023764;
    padding-left: 60px;
  }
  .card_hd .word{
    padding-left: 10px;
    color: #023764;
    border-left: 8px solid #FFC353;
    font-size: 20px;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .actor{
    background-color: #FFC353;
    width: 100px;
    color: #023764;
    border-radius: 10px;
    font-weight: 600;
    font-size: smaller;
    line-height: 20px;
  }
  .actorFather{
    text-align: center;
  }
</style>