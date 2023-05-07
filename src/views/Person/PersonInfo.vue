<template>
  <Nav/>
  <div class="bg">
    <br>
  <br>
  <el-row class="content">
    <el-col :span="3" :offset="3">
      <el-menu class="sidebar"
        default-active="/personInfo"
        router=true
        active-text-color="#FFC353"
        background-color="#023764"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
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
        <span class="word">我的信息</span>
        <el-button class="btn" color="#023764" @click="edit">编辑</el-button>
      </el-header>
      <el-row>
        <!-- 修改头像 -->
        <el-col class="userPhoto" :span="8">
          <el-avatar v-if="picDisplay" :size="100" fit="cover" :src="userInfo.userPhotoUrl" />
          <el-avatar v-if="!picDisplay" :size="100" fit="cover" :src="picUrlReview" />
          <div>
            <el-upload class="upload"
              :show-file-list=false
              :name="'iFile'"
              limit=1
              accept=".jpg,.jpeg,.png,.gif"
              :http-request="upload"
              :on-remove="handleRemove"
            >
              <el-button v-if="picDisplay" color="#023764" class="btn" type="primary">修改头像</el-button>
            </el-upload>
            <el-button v-if="!picDisplay" type="success" circle  @click="submit"><el-icon><Select /></el-icon></el-button>
            <el-button v-if="!picDisplay" type="danger" circle  @click="cancel"><el-icon><CloseBold /></el-icon></el-button>
          </div>
          <div><el-button color="#023764" class="btn" type="primary" @click="display=true">修改密码</el-button></div>
        </el-col>
        <el-col :span="14">
          <el-scrollbar max-height="500px">
            <!-- 修改个人资料 -->
            <el-form v-if="!display" class="form"
              label-position="top"
              label-width="100px"
            >
              <el-form-item label="用户名">
                <el-input v-model="userInfo.userName" :disabled="input_show"/>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="userInfo.userSexual" :disabled="input_show">
                  <el-radio label="男" size="large">男</el-radio>
                  <el-radio label="女" size="large">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="电话号码">
                <el-input v-model="userInfo.userPhone" :disabled="input_show"/>
              </el-form-item>
              <el-form-item label="个性签名">
                <el-input v-model="userInfo.userSign" type="textarea" :rows="5" :disabled="input_show"/>
              </el-form-item>
              <el-form-item>
                <el-button v-if="btn_show" class="btn1" type="primary" color="#023764" @click="onSubmit">保存</el-button>
                <el-button v-if="btn_show" :v-show="btn_show" class="btn2" color="#023764" @click="cancelEdit">取消</el-button>
              </el-form-item>
            </el-form>
            <!-- 修改密码 -->
            <el-form v-if="display" class="form"
              label-position="top"
              label-width="100px"
              style="margin-top:63px;"
            >
              <el-form-item label="密码">
                <el-input show-password v-model="changePWD.inputPassword"/>
              </el-form-item>
              <el-form-item label="新密码">
                <el-input show-password v-model="changePWD.newPassword"/>
              </el-form-item>
              <el-form-item>
                <el-button class="btn1" type="primary" color="#023764" @click="changePassword">确认</el-button>
                <el-button  class="btn2" color="#023764" @click="display=false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-scrollbar>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  </div>


</template>
  
<script>
import Nav from '@/components/Nav.vue'
import { Bell, Football } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/index'
import COS from "cos-js-sdk-v5"
import {ref} from "vue"

var cos = new COS({
  SecretId: "AKIDkMkupY5TikiU0JVO2QZTAg183oOj2EBB",
    SecretKey: "3uWv51iDUXM8qqrgHi2EHF5jBSccQ1Qg",
})

export default {
  name: "myPerson",
  data () {
  return {
    picDisplay: true,
    display: false,
    input_show : true,
    btn_show : false,
    userInfo:{},
    userInfoEdit:{},
    changePWD:{
      userId:1,
      inputPassword:null,
      newPassword:null,
    },
    uploadIcon:'https://cluboat-1314598070.cos.ap-nanjing.myqcloud.com/upload.png',
    picUrlReview:ref('https://cluboat-1314598070.cos.ap-nanjing.myqcloud.com/test.png'),
    picUrl:ref(''),
  }
  },
  methods: {
    submit()
    {
      console.log('图片存储位置',this.picUrl)
      //注意：
      //此处要用axios请求将picUrl传到后端存入数据库（可随表单其他内容一起上传，以业务逻辑为准）
      this.picDisplay=true;
      this.userInfoEdit.userId=this.userInfo.userId
      this.userInfoEdit.userName=this.userInfo.userName
      this.userInfoEdit.userPhone=this.userInfo.userPhone
      this.userInfoEdit.userPhotoUrl=this.picUrl
      this.userInfoEdit.userSexual=this.userInfo.userSexual
      this.userInfoEdit.userSign=this.userInfo.userSign
      this.$axios({
        method: 'put',
        url: '/api/user-info/person-info',
        data : this.userInfoEdit
      })
      .then(res => {
        console.log(JSON.stringify(res.data));
        if(res.data.code==200){
            ElMessage({
                message: "修改成功",
                type: 'success',
            })
            this.$router.go(0)
        }
      })
      .catch(function (error) {
        console.log(error);
        ElMessage({
            message: "修改失败",
            type: 'error',
        })
      })
    },
    cancel(){
        this.picDisplay=true;
    },
    upload(picture) {
      // 随机创建文件昵称
      var suffix = picture.file.name.substring(picture.file.name.lastIndexOf("."));
      var randomContent = Math.random().toString(36);
      var picName = randomContent + suffix;
      console.log(picName)
      cos.putObject({
        Bucket: 'cluboat-1314598070',
        Region: 'ap-nanjing', // 地区
        Key: picName, // 上传的文件名
        StorageClass: 'STANDARD',
        Body: picture.file, // 上传文件对象
      }, function (err, data) {
          console.log(err, data)
      })
      this.picUrl = 'https://cluboat-1314598070.cos.ap-nanjing.myqcloud.com/' + picName;
      console.log(this.picUrlReview)
      this.picDisplay=false;
      setTimeout(() => {
          this.picUrlReview = this.picUrl;
      },500)
    },
    handleRemove(){
        this.picDisplay=true;
    },
    edit(){
      this.input_show=false
      this.btn_show=true
    },
    cancelEdit(){
      console.log(this.userInfo)
      this.userInfo.userId=this.userInfoEdit.userId
      this.userInfo.userName=this.userInfoEdit.userName
      this.userInfo.userPhone=this.userInfoEdit.userPhone
      this.userInfo.userPhotoUrl=this.userInfoEdit.userPhotoUrl
      this.userInfo.userSexual=this.userInfoEdit.userSexual
      this.userInfo.userSign=this.userInfoEdit.userSign
      this.input_show=true
      this.btn_show=false
    },
    onSubmit(){
      this.userInfoEdit.userId=this.userInfo.userId
      this.userInfoEdit.userName=this.userInfo.userName
      this.userInfoEdit.userPhone=this.userInfo.userPhone
      this.userInfoEdit.userPhotoUrl=this.userInfo.userPhotoUrl
      this.userInfoEdit.userSexual=this.userInfo.userSexual
      this.userInfoEdit.userSign=this.userInfo.userSign
      this.$axios({
        method: 'put',
        url: '/api/user-info/person-info',
        data : this.userInfoEdit
      })
      .then(res => {
        console.log(JSON.stringify(res.data));
      })
      .catch(function (error) {
        console.log(error);
      })
      this.input_show=true
      this.btn_show=false
    },
    changePassword(){
        if(this.changePWD.inputPassword==null||this.changePWD.newPassword==null){
            ElMessage({
                message: "不能为空",
                type: 'error',
            })
            return;
        }
        this.$axios({
            method: 'put',
            url: '/api/user-login/password',
            data: {
              userId: localStorage.getItem('userId'),
              inputPassword: this.changePWD.inputPassword,
              newPassword: this.changePWD.newPassword
            },
        })
        .then(res => {
            console.log(res.data.message);
            if(res.data.code==200){
            ElMessage({
                message: res.data.message,
                type: 'success',
            })
            }else{
            ElMessage.error(res.data.message)
            }
            this.$router.go(0)
        })
        .catch(function (error) {
            console.log(error);
        })
    }
  },
  created() {
    this.$axios({
      method: 'get',
      url: '/api/user-info/person-info/'+localStorage.getItem('userId'),
    })
    .then(res => {
      console.log(res.data.data);
      this.userInfo=res.data.data;
      console.log(this.userInfo);
      this.userInfoEdit.userId=this.userInfo.userId,
      this.userInfoEdit.userName=this.userInfo.userName,
      this.userInfoEdit.userPhone=this.userInfo.userPhone,
      this.userInfoEdit.userPhotoUrl=this.userInfo.userPhotoUrl,
      this.userInfoEdit.userSexual=this.userInfo.userSexual,
      this.userInfoEdit.userSign=this.userInfo.userSign,
      console.log("hhhhh");
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
  .card_hd .btn{
    color: #FFC353;
    height: 30px;
    width: 80px;
    position: relative; 
    left: 74%;
  }
  .form{
    max-width: 460px;
    margin: 40px  0px;
  }
  .form .btn1{
    color: #FFC353;
    height: 30px;
    width: 80px;
  }
  .form .btn2{
    color: #023764;
    height: 30px;
    width: 80px;
    background-color: #fff;
  }
  .form .btn2:hover{
    color: #023764;
    height: 30px;
    width: 80px;
    background-color: #0236641d;
  }
  .userPhoto{
    text-align: center;
    margin: 40px  0px;
  }
  .userPhotoUrl{
    width: 80px;
  }
  .userPhoto .btn{
    margin-top: 20px;
    color: #FFC353;
    height: 30px;
    width: 100px;
  }

</style>