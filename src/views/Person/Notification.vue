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
        <el-col :span="18">
          <el-scrollbar v-if="notificationList" max-height="480px">
            <el-collapse v-model="activeNames">
              <el-collapse-item class="item" v-for="item in notificationList" :key="item.notificationId" :title="item.notificationTitle" :name="item.notificationId">
                <div>
                  {{ item.notificationContent }}
                </div>
                <el-row>&emsp;</el-row>
                <el-row>
                  <el-col class="actorFather" :span="19">
                    <div class="actor" v-if="item.isAdmin!=1">社团管理员</div>
                    <div class="actor" v-if="item.isAdmin==1">社联管理员</div>
                  </el-col>
                  <el-col :span="5" class="time">
                    {{ item.notificationTime }}
                  </el-col>
                </el-row>
                
              </el-collapse-item>
            </el-collapse>
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
    activeNames: 1,
    notificationList: null,
    // [{
    //   notificationId:1,
    //   sendAdminId:1,
    //   sendUserId:1,
    //   notificationTitle:"社团成立啦",
    //   notificationContent:"恭喜你成为第一个用户",
    //   notificationTime:"2022-11-20T13:33:37.000+00:00"
    // },{
    //   notificationId:2,
    //   sendAdminId:1,
    //   sendUserId:1,
    //   notificationTitle:"社团成立啦",
    //   notificationContent:"恭喜你成为第一个用户",
    //   notificationTime:"2022-11-20T13:33:37.000+00:00"
    // },{
    //   notificationId:3,
    //   sendAdminId:1,
    //   sendUserId:1,
    //   notificationTitle:"社团成立啦",
    //   notificationContent:"恭喜你成为第一个用户",
    //   notificationTime:"2022-11-20T13:33:37.000+00:00"
    // },{
    //   notificationId:4,
    //   sendAdminId:1,
    //   sendUserId:1,
    //   notificationTitle:"社团成立啦",
    //   notificationContent:"恭喜你成为第一个用户",
    //   notificationTime:"2022-11-20T13:33:37.000+00:00"
    // },{
    //   notificationId:5,
    //   sendAdminId:1,
    //   sendUserId:1,
    //   notificationTitle:"社团成立啦",
    //   notificationContent:"恭喜你成为第一个用户",
    //   notificationTime:"2022-11-20T13:33:37.000+00:00"
    // },{
    //   notificationId:6,
    //   sendAdminId:1,
    //   sendUserId:1,
    //   notificationTitle:"社团成立啦",
    //   notificationContent:"恭喜你成为第一个用户",
    //   notificationTime:"2022-11-20T13:33:37.000+00:00"
    // },{
    //   notificationId:7,
    //   sendAdminId:1,
    //   sendUserId:1,
    //   notificationTitle:"社团成立啦",
    //   notificationContent:"恭喜你成为第一个用户",
    //   notificationTime:"2022-11-20T13:33:37.000+00:00"
    // }],
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

  .item{
    font-size: 30px;
  }
  .actor{
    background-color: #FFC353;
    width: 100px;
    color: #023764;
    border-radius: 10px;
    font-weight: 600;
    font-size: smaller;
  }
  .actorFather{
    text-align: center;
  }
  .time{
    color: #023764;
  }
</style>