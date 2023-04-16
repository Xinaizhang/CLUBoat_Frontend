<template>
  <OrgHeader />

  <el-row style="background:#EEEEEE">
    <OrgNav />
    <el-col :span="20" class="main">

      <!-- 基本信息 -->
      <el-card class="box-card-1">
        <template #header>
          <div class="card-header">
            <span>基本信息</span>
            <el-button class="btn" color="#023764" @click="edit">编辑</el-button>
          </div>
        </template>

        <el-row>
          <el-col class="userPhoto" :span="6" :offset="2">
            <!-- <div class="block">
                  <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
                </div> -->
            <el-avatar :size="100" fit="cover" :src="clubInfo.clubImageUrl" />
            <el-upload>
              <el-button color="#023764" class="btn" type="primary">修改头像</el-button>
            </el-upload>
          </el-col>

          <el-col :span="14">
            <el-scrollbar max-height="500px">
              <el-form class="form" label-position="top" label-width="100px">
                <el-form-item label="社团名称">
                  <el-input v-model="clubInfo.clubName" :disabled="input_show" />
                </el-form-item>

                <el-form-item label="社团编号">
                  <el-input v-model="clubInfo.clubId" :disabled=true />
                </el-form-item>
                <el-form-item label="社团创建时间">
                  <el-input v-model="clubInfo.clubCreateTime" :disabled=true />
                </el-form-item>
                <el-form-item label="社团简介">
                  <el-input v-model="clubInfo.clubInformation" type="textarea" :rows="5" :disabled="input_show" />
                </el-form-item>
                <el-form-item>
                  <el-button v-if="btn_show" class="btn1" type="primary" color="#023764" @click="onSubmit">保存
                  </el-button>
                  <el-button v-if="btn_show" :v-show="btn_show" class="btn2" color="#023764" @click="cancelEdit">取消
                  </el-button>
                </el-form-item>
              </el-form>
            </el-scrollbar>

          </el-col>
        </el-row>

      </el-card>
    </el-col>
  </el-row>

</template>

<script>
  import OrgNav from '@/components/OrgNav.vue'
  import OrgHeader from '@/components/OrgHeader.vue'
  export default {
    name: "OrgClubinfo",
    data() {
      return {
        input_show: true,
        btn_show: false,
        clubInfo: {
          clubId: 1,
          clubName: "",
          clubInformation: "",
          clubCreateTime: "",
          clubImageUrl: "",
        },
        clubInfoEdit: {
          clubId: 1,
          clubName: "",
          clubInformation: "",
          clubCreateTime: "",
          clubImageUrl: "",
        },
      }
    },
    methods: {
      edit() {
        this.input_show = false
        this.btn_show = true
      },
      cancelEdit() {
        console.log(this.clubInfo)
        this.clubInfo.clubId = this.clubInfoEdit.clubId
        this.clubInfo.clubName = this.clubInfoEdit.clubName
        this.clubInfo.clubInformation = this.clubInfoEdit.clubInformation
        this.clubInfo.clubCreateTime = this.clubInfoEdit.clubCreateTime
        this.clubInfo.clubImageUrl = this.clubInfoEdit.clubImageUrl
        this.input_show = true
        this.btn_show = false
      },
      onSubmit() {
        this.clubInfoEdit.clubId = this.clubInfo.clubId
        this.clubInfoEdit.clubName = this.clubInfo.clubName
        this.clubInfoEdit.clubInformation = this.clubInfo.clubInformation
        this.clubInfoEdit.clubImageUrl = this.clubInfo.clubImageUrl
        this.$axios({
          method: 'put',
          url: '/api/club-manage/club',
          data: this.clubInfoEdit
        })
          .then(res => {
            console.log(JSON.stringify(res.data));
          })
          .catch(function (error) {
            console.log(error);
          })
        this.input_show = true
        this.btn_show = false
      }
    },
    created() {
      this.$axios({
        method: 'get',
        url: '/api/club-manage/club/1',
      })
        .then(res => {
          console.log(res.data.data);
          this.clubInfo = res.data.data;
          console.log(this.clubInfo);
            this.clubInfoEdit.clubId = this.clubInfo.clubId,
            this.clubInfoEdit.clubName = this.clubInfo.clubName,
            this.clubInfoEdit.clubInformation = this.clubInfo.clubInformation,
            this.clubInfoEdit.clubCreateTime = this.clubInfo.clubCreateTime,
            this.clubInfoEdit.clubImageUrl = this.clubInfo.clubImageUrl,
            console.log("hhhhh");
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

  .userPhoto .btn {
    margin-top: 20px;
    height: 30px;
    width: 100px;
  }
</style>