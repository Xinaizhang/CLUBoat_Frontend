<template>
  <Nav/>
  <br>
  <br>
  <el-row class="content">
    <el-col :span="3" :offset="3">
      <el-menu class="sidebar"
        default-active="/myClub"
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
        <span class="word">我的社团</span>
        <el-button class="btn" color="#023764" @click="dialogFormVisible=true">创建社团</el-button>
      </el-header>
      <el-main>
        <div v-if="clubList" class="clubList">
          <div style="margin-left: 80px;margin-top: 40px;">
            <el-row :gutter="20">
              <el-col
                v-for="item in clubList.slice((page-1) * limit, page * limit)"
                :key="item.clubId"
                :span="7"
              >
              <el-card class="club">
                <img :src="item.clubImageUrl" class="image"/>
                <div class="bottom" style="padding: 14px">
                  <span class="clubName">{{ item.clubName }}</span>
                  <div class="bottom">
                    <div>
                      <el-button color="#FFC353" class="btn" type="primary"  @click="deleteClub(item.clubId)">退出社团</el-button>
                    </div>
                    <div>
                      <el-button color="#FFC353" class="btn" type="primary"  @click="adminApply">我的申请</el-button>
                    </div>
                  </div>
                </div>
              </el-card>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <div class="pagination">
                <div class="pagination_style">&emsp;</div>
                <el-pagination
                  :current-page="page"
                  :page-size="limit"
                  background
                  layout="prev, pager, next"
                  :total="total"
                  @current-change="handleCurrentChange"
                />
              </div>
            </el-row>
          </div>
          <el-dialog v-model="dialogFormVisible" title="创建社团" align-center draggable>
            <el-form :model="club">
                <el-form-item label="社团名称" label-width="70px">
                    <el-input v-model="club.clubName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="申请理由" label-width="70px">
                    <el-input v-model="club.buildApplyReason" autocomplete="off" type="textarea" :rows="6" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="createClub">确认</el-button>
                </span>
            </template>
        </el-dialog>
        </div>
        <el-empty style="height:478px;" v-if="!clubList" description="你还未加入社团哦" />
      </el-main>

    </el-col>
  </el-row>

</template>
  
<script>
import Nav from '@/components/Nav.vue'
import { Bell, Football } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message/style/index'
import 'element-plus/es/components/message-box/style/index'

export default {
  name: "myActivity",
  data () {
  return {
    page: 1,
    limit: 3,
    total: 6,
    clubList: null,
    dialogFormVisible:false,
    club: {
      userId: 14,
      clubName: null,
      buildApplyReason: null,
      buildApplyTime: null
    },
    // [{
      // clubId: '0001',
      // clubName: '书法社',
      // clubImageUrl: 'https://img.zcool.cn/community/0198ce5b0bab2ea8012181b0957742.jpg@1280w_1l_2o_100sh.jpg',
    // }, {
    //   clubId: '0002',
    //   clubName: '书法社',
    //   clubImageUrl: 'https://img.zcool.cn/community/0198ce5b0bab2ea8012181b0957742.jpg@1280w_1l_2o_100sh.jpg',
    // }, {
    //   clubId: '0003',
    //   clubName: '书法社',
    //   clubImageUrl: 'https://img.zcool.cn/community/0198ce5b0bab2ea8012181b0957742.jpg@1280w_1l_2o_100sh.jpg',
    // }, {
    //   clubId: '0004',
    //   clubName: '书法社',
    //   clubImageUrl: 'https://img.zcool.cn/community/0198ce5b0bab2ea8012181b0957742.jpg@1280w_1l_2o_100sh.jpg',
    // }, {
    //   clubId: '0005',
    //   clubName: '书法社',
    //   clubImageUrl: 'https://img.zcool.cn/community/0198ce5b0bab2ea8012181b0957742.jpg@1280w_1l_2o_100sh.jpg',
    // }]
  }
  },
  methods: {
    handleCurrentChange(val){
      this.page=val
    },
    deleteClub(value){
      this.$axios({
        method: 'delete',
        url: '/api/user-info/my-club',
        data : {
          userId: localStorage.getItem('userId'),
          clubId: value,
        }
      })
      .then(res => {
        console.log(res.data.message);
        if(res.data.code==200){
          ElMessage({
            message: res.data.message,
            type: 'success',
          })
          this.$router.go(0)
        }else{
          ElMessage.error(res.data.message)
        }
      })
      .catch(function (error) {
        console.log(error);
        ElMessage.error("无记录")
      })
    },
    adminApply(){
      this.$axios({
        method: 'get',
        url: '/api/user-info/admin-apply/'+localStorage.getItem('userId'),
      })
      .then(res => {
        var result=res.data;
        console.log(result.data.length);
        if(result.code==200){
          for(var i=0;i<result.data.length;i++){
            ElMessageBox.alert(result.data[i].adminApplyReason, '管理员申请', {
            confirmButtonText: '确认',
          })
          }
        }else{
          ElMessageBox.alert('暂无申请', '管理员申请', {
            confirmButtonText: '确认',
          })
        }
      })
      .catch(function (error) {
        console.log(error);
        ElMessageBox.alert('暂无申请', '管理员申请', {
          confirmButtonText: '确认',
        })
      })
    },
    addNews() {
      if (this.club.buildApplyReason == "" || this.club.buildApplyReason == "") {
          ElMessage({
              message: "不能为空！",
              type: 'error',
          })
          return;
      }
      this.dialogFormVisible = false;

      this.$axios({
          method: 'post',
          url: '/api/club-manage/club-creation-application',
          data: this.club,
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
      url: '/api/user-info/my-club/'+localStorage.getItem('userId'),
    })
    .then(res => {
      console.log(res.data.data);
      this.clubList=res.data.data;
      this.total=res.data.data.length;
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
  .card_hd .btn{
    color: #FFC353;
    height: 30px;
    width: 80px;
    position: relative; 
    left: 74%;
    top: -12px
  }
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
  .clubList{
    height: 400px;
    margin-top: 30px;
  }
  .club{
    text-align: center;
  }
  .bottom {
    margin: 0 auto;
  }
  .clubName{
    font-size: 25px;
    font-weight: 600;
    color: #023764;
  }
  .image {
    width: 100%;
    height:20vh;
    display: block;
  }
  .btn{
    font-weight: 600;
    margin-top: 20px;
    color: #023764;
    height: 30px;
    width: 120px;
  }
  
  .pagination{
    --el-color-primary: #024886;
    display: block;
    margin: 0 auto;
  }
  .el-pagination {
    --el-pagination-font-size: 16px;
    --el-pagination-button-color: #024886;
    --el-pagination-button-disabled-bg-color:#fff;
    --el-pagination-button-bg-color:#fff;
    --el-pagination-hover-color: #167fdb;
  }
</style>