<template>
  <Nav/>
  <br>
  <br>
  <el-row class="content">
    <el-col :span="3" :offset="3">
      <el-menu class="sidebar"
        default-active="/collection"
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
      <el-menu-item index="/collection">
        <p style="margin: 0 auto;">
          <el-icon><Star/></el-icon>
          <span>我的收藏</span>
        </p>
      </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="15" class="card">
      <el-header class="card_hd">
        <span class="word">我的收藏</span>
      </el-header>
      <el-main>
        <el-scrollbar height="446px">
          <el-row justify="center">
            <el-card class="box-card" v-for="item in collectionList.slice((page-1) * limit, page * limit)" :key="item.clubId" shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>{{ item.postTitle }}</span>
                  <el-button color="#023764" class="button" icon="ArrowRightBold" circle></el-button>
                </div>
              </template>
              <el-row>
                <el-col :span="3" v-for="(subitem,subindex) in item.postTag" :key="subindex" style="text-align: center;">
                  <span class="text">{{ subitem.tagName }}</span>
                </el-col>
                <el-button class="btn" color="#023764" @click="deleteCollection">取消收藏</el-button>
              </el-row>
            </el-card>
        </el-row>
        </el-scrollbar>
        <el-row class="pagination" justify="center">
          <div class="pagination_style">&emsp;</div>
          <el-pagination
            :current-page="page"
            :page-size="limit"
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-main>
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
  data () {
  return {
    page: 1,
    limit: 3,
    total: 6,
    collectionList: [{
      postId:1,
      clubId:1,
      postTitle:"后端好烦啊",
      postTime:"2022-12-22T13:30:45.000+00:00",
      postTag:[{
        tagName:"健身"
        },{
        tagName:"学习"
        }
      ]
    }, {
      postId:2,
      clubId:2,
      postTitle:"后端好烦啊",
      postTime:"2022-12-22T13:30:45.000+00:00",
      postTag:[{
        tagName:"健身"
        },{
        tagName:"学习"
        }
      ]
    }, {
      postId:3,
      clubId:1,
      postTitle:"后端好烦啊",
      postTime:"2022-12-22T13:30:45.000+00:00",
      postTag:[{
        tagName:"健身"
        },{
        tagName:"学习"
        }
      ]
    }, {
      postId:4,
      clubId:1,
      postTitle:"后端好烦啊",
      postTime:"2022-12-22T13:30:45.000+00:00",
      postTag:[{
        tagName:"健身"
        },{
        tagName:"学习"
        }
      ]
    }, {
      postId:5,
      clubId:1,
      postTitle:"后端好烦啊",
      postTime:"2022-12-22T13:30:45.000+00:00",
      postTag:[{
        tagName:"健身"
        },{
        tagName:"学习"
        }
      ]
    }],
  }
  },
  methods: {
    handleCurrentChange(val){
      this.page=val
    },
    deleteCollection(){
      this.$axios({
        method: 'delete',
        url: '/api/collection',
        data : {
          userId: localStorage.getItem('userId'),
          postId: 1,
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
      })
    },
  },
  created() {
    this.$axios({
      method: 'get',
      url: '/api/collection/'+localStorage.getItem('userId'),
    })
    .then(res => {
      console.log(res.data.data);
      this.collectionList=res.data.data;
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
  .card .tabs{
      margin: 20px 80px;
      color: #023764;
      font-size: 32px;
      font-weight: 600;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
  }
  .card-header .button{
    color: #fff;
    height: 30px;
    width: 30px;
  }
  .text {
    font-size: 14px;
    font-weight: normal;
    
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

  .box-card {
    width: 780px;
    margin-bottom: 8px;
  }
  .btn{
    color: #FFC353;
    height: 30px;
    width: 80px;
    position: relative;
    left: 65%;
  }
  .text{
    color: #023764;
    background-color: #FFC353;
    margin-right: 10px;
    border-radius: 10px;
    height: 30px;
    line-height: 30px;
    font-weight: 600;
  }
  .pagination{
    --el-color-primary: #024886;

  }
  .el-pagination {
    --el-pagination-font-size: 16px;
    --el-pagination-button-color: #024886;
    --el-pagination-button-disabled-bg-color:#fff;
    --el-pagination-button-bg-color:#fff;
    --el-pagination-hover-color: #167fdb;
  }
</style>