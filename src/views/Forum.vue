<template>
    <Nav/>
    <div class="bg">
        <el-row>
            <el-breadcrumb style="font-size: 20px;margin: 5vh 6vw;" separator="＞">
                <el-breadcrumb-item :to="{ path: '/details' }">{{ clubName }}</el-breadcrumb-item>
                <el-breadcrumb-item>社团论坛</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>
        
        <el-row justify="center">
            <el-carousel class="forumImg">
                    <el-carousel-item  v-for="item in img" :key="item">
                        <el-image class="Img" :src="item.image" :fit="fit" />
                    </el-carousel-item>
            </el-carousel>
            <el-card style="width:56vw; background-color: #023764;border-radius: 20px;margin-bottom: 20px;">
                <div style="margin:20px 0px;">
                    <span class="tagTitle">筛选:</span>
                    <el-button v-for="item in tags"
                        :key="item.tagName" class="tagList" color="#FFC353" @click="edit">{{ item.tagName }}
                    </el-button>
                </div>

                <el-scrollbar max-height="1000px">
                <el-card class="box-card" v-for="item in postList.slice((page-1) * limit, page * limit)" :key="item.postId" shadow="hover">
                <template #header>
                    <div class="card-header">
                    <span>{{ item.postTitle }}</span>
                    <el-button color="#FFC353" class="button" icon="ArrowRightBold" circle @click="detail(item)"></el-button>
                    </div>
                </template>
                <el-row>
                    <el-col :span="19">
                    <el-tag class="postTag"  type="danger" size="large" v-for="i in item.postTag" :key="i.tagName">
                        {{ i.tagName }}
                    </el-tag>
                    </el-col>
                    <el-col style="text-align:right;" class="textfather" :span="5">
                    <span class="text">{{ item.postTime }}</span>
                    </el-col>
                </el-row>
                </el-card>
                </el-scrollbar>
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
            </el-card>

            <el-card style="background-color: #e6e9ec" class="user"> 
                <el-row style="margin-bottom: 10px;">
                    <el-col :span="9">
                        <el-avatar :size="50" :src="userInfo.userPhotoUrl" />
                    </el-col>
                    <el-col :span="15">
                        <span>{{ userInfo.userName }}</span>
                        <div class="sign">{{ userInfo.userSign }}</div>
                    </el-col>
                </el-row>
                <hr>
                <el-row style="margin: 10px 0px;font-size:14px;font-weight: 600;">我的帖子</el-row>
                <el-scrollbar height="160px">
                    <div class="myPostList" v-for="item in myPostList" :key="item.postId" shadow="hover">
                    <span>{{ item.postTitle }}</span>
                    <el-button color="#FFC353" class="button" icon="ArrowRightBold" circle @click="detail(item)"></el-button>
                    </div>
                </el-scrollbar>
            </el-card>
        </el-row>
        <el-dialog v-model="dialogFormVisible" title="发布通知" align-center draggable style="width:80vw">
            <template #header>
            <span>
                帖子详情
            </span>
            </template>

            <el-row justify="center">
                <el-col :span="17">
                    <el-scrollbar  class="dPost" height="70vh">
                        <el-row justify="center">
                            <h1 class="dTitle">{{ postDetail.postTitle }}</h1>
                        </el-row>
                        <el-row justify="center">
                            <h3 class="dTime">{{ postDetail.postTime }}</h3>
                        </el-row>
                        <p class="dContent">&emsp;&emsp;这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情。</p>
                        <p class="dContent">&emsp;&emsp;这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情。</p>
                        <p class="dContent">&emsp;&emsp;这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情。</p>
                        <p class="dContent">&emsp;&emsp;这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情。</p>
                        <p class="dContent">&emsp;&emsp;这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情。</p>
                        <p class="dContent">&emsp;&emsp;这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情。</p>
                        <p class="dContent">&emsp;&emsp;这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情。</p>
                        <p class="dContent">&emsp;&emsp;这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情，这是帖子详情。</p>
                    </el-scrollbar>
                </el-col>
                <el-col class="dcomment" :span="7">
                    <el-container style="height:70vh;">
                        <el-header>
                            <el-row justify="center">
                                <h3 style="margin-top:20px;">
                                    发表评论
                                </h3>
                            </el-row>
                        </el-header>
                        <el-main>
                            <el-scrollbar height="60vh">
                                <div v-for="item in comment" :key="item">
                                    <el-row>
                                        <el-avatar :size="25" :src="item.image" />
                                        <span style="font-size:20px;margin-left: 10px;margin-bottom: 10px;">{{ item.userName }}</span>
                                    </el-row>
                                    <el-row>
                                        <el-input style="margin-bottom:10px;" v-model="item.content" disabled placeholder="item.content" />
                                    </el-row>
                                </div>


                            </el-scrollbar>
                        </el-main>
                        <el-footer>
                            <el-input
                                class="inputComment"
                                v-model="dComment"
                                maxlength="30"
                                placeholder="Please input"
                                show-word-limit
                                type="text"
                            >
                            <template #append><el-button type="primary">发送</el-button></template>
                            </el-input>
                        </el-footer>
                    </el-container>
                </el-col>
            </el-row>
            <template #footer>
            <span class="dialog-footer">
                <el-button type="warning" plain>收藏</el-button>
                <el-button type="danger" plain>点赞</el-button>
            </span>
            </template>
        </el-dialog>
    </div>


</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
    name: "ClubForum",
    components: {
        Nav,
    },
    data () {
    return {
        page: 1,
        limit: 5,
        total: 13,
        clubName:null,
        clubId:null,
        tags:[{}],
        postList:[{}],
        myPostList:[{}],
        userInfo:[],
        dialogFormVisible:false,
        postDetail:[],
        dComment:null,
        img:[{
            image:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile.moyublog.com%2Fd%2Ffile%2F2021-06-28%2F89492d68481e7e090ee8a94ee0d076ca.jpg&refer=http%3A%2F%2Ffile.moyublog.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1674183589&t=617a541099be638fd23511b659d1d231"
        },{
            image:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.yipic.cn%2Fthumb%2Fb81cf77a%2Fa7fc306f%2F09c435cb%2Fa8db1a18%2Fbig_b81cf77aa7fc306f09c435cba8db1a18.png&refer=http%3A%2F%2Fimg.yipic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1674186787&t=a4b8b2443d08c8a8f75829ef9a09363f"
        }],
        comment:[{
            userName:"刻晴",
            content:"好极了！",
            image:"https://s2.loli.net/2022/11/20/sK9DCVWY7qLyIhw.jpg"
        },{
            userName:"行秋",
            content:"中规中矩吧！",
            image:"https://s2.loli.net/2022/11/20/sK9DCVWY7qLyIhw.jpg"
        },{
            userName:"钟离",
            content:"期待下一次观星！",
            image:"https://s2.loli.net/2022/11/20/sK9DCVWY7qLyIhw.jpg"
        }]
    }
    },
    methods: {
        handleCurrentChange(val){
            this.page=val
        },
        detail(value){
            this.dialogFormVisible=true;
            console.log(value);
            this.postDetail=value;
        }
    },
    created() {
        this.clubName=localStorage.getItem("clubName");
        this.clubId=localStorage.getItem("clubId");

        this.$axios({
            method: 'get',
            url: '/api/forum/tag/'+this.clubId,
        })
        .then(res => {
            console.log(res.data.data);
            this.tags=res.data.data;
        })
        .catch(function (error) {
            console.log(error);
        })

        this.$axios({
            method: 'get',
            url: '/api/forum/post-list',
        })
        .then(res => {
            console.log(res.data.data);
            this.postList=res.data.data;
            this.total=res.data.data.length;
        })
        .catch(function (error) {
            console.log(error);
        })

        this.$axios({
            method: 'get',
            url: '/api/forum/post-list/'+localStorage.getItem("userId"),
        })
        .then(res => {
            console.log(res.data.data);
            this.myPostList=res.data.data;
            this.total=res.data.data.length;
        })
        .catch(function (error) {
            console.log(error);
        })

        this.$axios({
            method: 'get',
            url: '/api/user-info/person-info/'+localStorage.getItem("userId"),
        })
        .then(res => {
            console.log(res.data.data);
            this.userInfo=res.data.data;
        })
        .catch(function (error) {
            console.log(error);
        })
        
    }
}
</script>

<style scoped>
.bg{
    background-color: #f9f9f9;
}
.user{
    width:15vw;
    height: 40vh;
    border-radius: 20px;
    margin-left: 20px;
}
.user .sign{
font-size: 12px;
margin-top: 10px;
}
.forumImg{
    width:15vw;
    height: 40vh;
    border-radius: 20px;
    margin-right: 20px;
}
.Img{
    width: 15vw; 
    height: 40vh;
}
.tagTitle{
    font-size: 20px;
    color: #FFC353;
    font-weight: 600;
}
.tagList{
    margin-left: 2vw;
    width: 6vw;
    color: #023764;
    font-size: 16px;
    border-radius: 15px;
}

.box-card{
    margin-top: 2vh;
}
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
}
.card-header .button{
    color: #023764;
    height: 30px;
    width: 30px;
}
.myPostList .button{
    height: 10px;
    width: 10px;
    float: right;
}
.myPostList{
    margin: 5px 0px;
}

.textFather{
    display: flex;
    text-align: right;
}
.text {
    font-size: 14px;
    color: grey;
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
.postTag{
    width: 5vw;
    margin-right: 20px;
}
.pagination{
    --el-color-primary: #FFC353;
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
.dPost{
    padding: 0px 30px;
}

.dTitle{
    margin: 10px 0px;
    color: #023764;
}
.dTime{
    margin: 10px 0px;
    color: #a2abb3;
}
.dContent{
    line-height: 40px;
}
.dcomment{
    border: 2px solid #d2d4d6;
    border-radius: 10px;
}
.inputComment{
    
}
</style>