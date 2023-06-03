<template>
    <Nav />
    <div class="bg">
        <el-row>
            <!-- <el-breadcrumb style="font-size: 20px;margin: 5vh 7vw;" separator="＞">
                <el-breadcrumb-item :to="{ path: '/details' }">{{ clubName }}</el-breadcrumb-item>
                <el-breadcrumb-item>社团论坛</el-breadcrumb-item>
            </el-breadcrumb> -->
            <h2 style="font-size: 30px;margin: 2vh 5vw; letter-spacing: 4px;">论坛广场</h2>
        </el-row>

        <el-button @click="this.$router.push('/home')"> Square to Home</el-button>
        <button @click="modelTest">test model</button>

        <el-row justify="center">

            <div>
                <el-card style="background-color: #e6e9ec;margin-top: 3vh;margin-bottom: 0px;" class="hotPost">
                    <el-row style="margin: 5px 0px;font-size:14px;font-weight: 600;">热门帖子</el-row>
                    <el-scrollbar height="28vh">
                        <div class="hotList" v-for="item in hotList" :key="item" shadow="hover" style="margin-right:10px;">
                            <el-row>
                                <el-col :span="23">
                                    <span class="myPostText">{{ item.postTitle }}</span>
                                </el-col>
                                <el-col :span="1">
                                    <el-button color="#FFC353" class="button" icon="ArrowRightBold" circle
                                        @click="detail(item)"></el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-scrollbar>
                </el-card>
            </div>


            <el-card style="width:60vw; height: 35vh; background-color: #023764;border-radius: 20px;margin-bottom: 0px; margin-right: 150px;">
                <template #header>
                    <div class="clubnav-header">
                        <span>论坛导航</span>
                    </div>
                </template>

                <!-- club list nav -->
                <div class="club">
                    <ul class="club_list">
                        <li class="item" v-for="item of clubList.slice((page1 - 1) * limit1, page1 * limit1)"
                            :key="item.clubId">
                            <div class="club-img">
                                <a href="#">
                                    <img class="item-img" :src="item.clubImageUrl" @click="goForum(item)" />
                                </a>
                            </div>
                            <p class="item-name">{{ item.clubName }}</p>
                            <!-- <div class="review">
                                <p class="item-desc">{{ item.clubInformation }}</p>
                                <a href="#" @click="clubDetail(item)">
                                    <span>查看详情</span>
                                </a>
                            </div> -->
                        </li>
                    </ul>
                    <div class="pagination1">
                        <div class="pagination_style">&emsp;</div>
                        <el-pagination :current-page="page1" :page-size="limit1" background layout="prev, pager, next"
                            :total="total1" @current-change="handleCurrentChange1" />
                    </div>
                </div>
            </el-card>


            <!-- 社团帖子 -->
            <el-card style="width:60vw; margin-left: 230px;background-color: #023764;border-radius: 20px;margin-bottom: 20px;">
                <template #header>
                    <div class="clubnav-header">
                        <span>推荐帖子</span>
                    </div>
                </template>
                
                <!-- 帖子列表 -->
                <el-card class="box-card" v-for="item in filterPost.slice((page - 1) * limit, page * limit)"
                    :key="item.postId" shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <span>{{ item.postTitle }}</span>
                            <el-button color="#FFC353" class="button" icon="ArrowRightBold" circle
                                @click="detail(item)"></el-button>
                        </div>
                    </template>
                    <el-row>
                        <p class="postContent">{{ item.postContent }}</p>
                    </el-row>
                    <el-row>
                        <el-col :span="19">
                            <el-tag class="postTag" type="danger" size="large" v-for="i in item.postTag" :key="i.tagName">
                                {{ i.tagName }}
                            </el-tag>
                        </el-col>
                        <el-col style="text-align:right;" class="textfather" :span="5">
                            <span class="text">{{ item.postTime }}</span>
                        </el-col>
                    </el-row>
                </el-card>
                <el-row>
                    <div class="pagination">
                        <div class="pagination_style">&emsp;</div>
                        <el-pagination :current-page="page" :page-size="limit" background layout="prev, pager, next"
                            :total="filterPost.length" @current-change="handleCurrentChange" />
                    </div>
                </el-row>
            </el-card>
        </el-row>
        <!-- 帖子详情弹窗 -->
        <el-dialog v-model="dialogFormVisible" align-center draggable style="width:80vw">
            <template #header>
                <span>
                    帖子详情
                </span>
            </template>
            <el-row justify="center">
                <el-col :span="17">
                    <el-container style="height:80vh;">
                        <el-header>
                            <el-row justify="center">
                                <h1 class="dTitle">{{ postDetail.postTitle }}</h1>
                            </el-row>
                            <el-row justify="center">
                                <h3 class="dTime">{{ postDetail.postTime }}</h3>
                            </el-row>
                        </el-header>
                        <el-main>
                            <el-scrollbar class="dPost" height="60vh">
                                <p class="dContent">
                                    {{ postDetail.postContent }}
                                </p>
                            </el-scrollbar>
                        </el-main>
                        <el-footer>
                            <el-row justify="center">
                                <el-tooltip content="收藏" placement="bottom" effect="light">
                                    <el-button size="large" v-if="!isCollected" type="warning" plain circle
                                        @click="collect"><el-icon>
                                            <Star />
                                        </el-icon></el-button>
                                </el-tooltip>
                                <el-tooltip content="取消收藏" placement="bottom" effect="light">
                                    <el-button size="large" v-if="isCollected" type="warning" circle
                                        @click="cancelCollect"><el-icon>
                                            <Star />
                                        </el-icon></el-button>
                                </el-tooltip>
                                &nbsp;
                                <el-tooltip content="点赞" placement="bottom" effect="light">
                                    <el-button size="large" v-if="!isLiked" type="danger" circle plain
                                        @click="like"><el-icon>
                                            <Pointer />
                                        </el-icon></el-button>
                                </el-tooltip>
                                <el-tooltip content="取消点赞" placement="bottom" effect="light">
                                    <el-button size="large" v-if="isLiked" type="danger" circle
                                        @click="cancelLike"><el-icon>
                                            <Pointer />
                                        </el-icon></el-button>
                                </el-tooltip>
                                <el-tooltip content="删除帖子" placement="bottom" effect="light">
                                    <el-button size="large" v-if="postDetail.userId == userId" type="info" circle
                                        @click="deletePost"><el-icon>
                                            <Delete />
                                        </el-icon></el-button>
                                </el-tooltip>
                                <el-tooltip content="举报帖子" placement="bottom" effect="light">
                                    <el-button size="large" v-if="postDetail.userId != userId" type="info" circle
                                        @click="this.dialogFormVisible2 = true"><el-icon>
                                            <Warning />
                                        </el-icon></el-button>
                                </el-tooltip>
                            </el-row>
                        </el-footer>
                    </el-container>
                </el-col>
                <el-col class="dcomment" :span="7">
                    <el-container style="height:80vh;">
                        <el-header>
                            <el-row justify="center">
                                <h3 style="margin-top:20px;">
                                    评论
                                </h3>
                            </el-row>
                        </el-header>
                        <el-main>
                            <el-scrollbar height="58vh" style="padding-right:10px;">
                                <div v-for="item in comment" :key="item">
                                    <el-row align="middle">
                                        <el-col :span="3">
                                            <el-avatar :size="25" :src="item.userPhotoUrl" />
                                        </el-col>
                                        <el-col :span="5">
                                            <span class="postDetailUsername">{{ item.userName }}</span>
                                        </el-col>
                                        <el-col :span="13">
                                            <span style="font-size:12px;color:grey">发布于{{ item.commentTime }}</span>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <p style="margin-top:10px;line-height: 20px;">{{ item.commentContent }}</p>
                                        <el-divider />
                                    </el-row>

                                </div>
                            </el-scrollbar>
                        </el-main>
                        <el-footer>
                            <el-input class="inputComment" v-model="dComment" maxlength="30" placeholder="Please input"
                                show-word-limit type="text">
                                <template #append><el-button type="primary" @click="submitComment">发送</el-button></template>
                            </el-input>
                        </el-footer>
                    </el-container>
                </el-col>
            </el-row>
        </el-dialog>


        <!-- 举报帖子弹窗 -->
        <el-dialog v-model="dialogFormVisible2" align-center draggable style="width:35vw">
            <template #header>
                <span>
                    举报帖子
                </span>
            </template>
            <el-form :model="postReport">
                <!-- 标题 -->
                <el-form-item>
                    <el-input v-model="postReport.reportReason" type="textarea" placeholder="请输入举报理由" :rows="3" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" @click="reportPost">确认</el-button>
                <el-button @click="cancelReportPost">取消</el-button>

            </template>
        </el-dialog>
        <!-- 我的帖子弹窗 -->
        <el-dialog v-model="dialogFormVisible2" align-center draggable style="width:35vw">
            <template #header>
                <span>
                    举报帖子
                </span>
            </template>
            <el-form :model="postReport">
                <!-- 标题 -->
                <el-form-item>
                    <el-input v-model="postReport.reportReason" type="textarea" placeholder="请输入举报理由" :rows="3" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" @click="reportPost">确认</el-button>
                <el-button @click="cancelReportPost">取消</el-button>

            </template>
        </el-dialog>
    </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
// import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message/style/index'
import 'element-plus/es/components/message-box/style/index'

export default {
    name: "ClubForum",
    components: {
        Nav,
    },
    data() {
        return {
            userId: localStorage.getItem("userId"),
            page: 1,
            page1: 1,
            limit: 5,
            limit1: 8,
            total: 13,
            total1: 6,
            clubName: null,
            clubId: null,
            clubList: [{}],
            tags: [{}],
            postList: [{}],
            myPostList: [{}],
            hotList: [{}],
            collectedPostList: [{}],
            userInfo: [],
            newPost: {
                userId: localStorage.getItem("userId"),
                clubId: localStorage.getItem("clubId"),
                postTitle: null,
                postTag: [],
                postContent: null
            },
            postReport: {
                reporterId: localStorage.getItem("userId"),
                reportReason: null,
                targetId: null,
                targetType: "帖子"
            },
            dialogFormVisible: false,
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            postDetail: [],
            dComment: null,
            emptyPicUrl: "https://jbgz-1312275634.cos.ap-shanghai.myqcloud.com/0.ndphwzhxl18.png",
            img: [{
                image: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile.moyublog.com%2Fd%2Ffile%2F2021-06-28%2F89492d68481e7e090ee8a94ee0d076ca.jpg&refer=http%3A%2F%2Ffile.moyublog.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1674183589&t=617a541099be638fd23511b659d1d231"
            }, {
                image: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.yipic.cn%2Fthumb%2Fb81cf77a%2Fa7fc306f%2F09c435cb%2Fa8db1a18%2Fbig_b81cf77aa7fc306f09c435cba8db1a18.png&refer=http%3A%2F%2Fimg.yipic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1674186787&t=a4b8b2443d08c8a8f75829ef9a09363f"
            }],
            comment: [{}],
            currentTag: '全部',
            isCollected: false,
            isLiked: false,
        }
    },
    methods: {
        modelTest() {
            let prompt = "以下是我的个人介绍：我所在的学科专业是工学，我平时特别喜欢的娱乐活动或爱好是音乐和体育。在艺术方面，我特别喜欢音乐和摄影。我对游泳体育活动有特别的兴趣。在科学领域，我对生物学感兴趣。我也有想学习一种乐器，那就是吉他。我对探讨文化多元性的文化或社会问题有兴趣。每周我能投入大约4小时到社团活动。我希望通过参加社团活动获得扩大社交圈子和提升个人技能。对于社团活动的形式，我更倾向于线上虚拟活动。现在请你根据我的个人信息，帮我从学校社团列表中，选择三个适合我的社团推荐给我。学校社团列表如下：天文社、流行音乐社、动漫社、英语协会、民谣社、吉他社、轻音社、篮球社、象棋社、文学社、推理社、电子游戏社、电影鉴赏协会、欧美文化社、运动协会、手工社、数码社、环保协会、辩论社"
            this.$axios({
                method: 'post',
                url: '/localhost/chat?question=' + prompt,
                // headers:{'Access-Control-Allow-Origin' : '*'},
                // data:{prompt:"以下是我的个人介绍：我所在的学科专业是工学，我平时特别喜欢的娱乐活动或爱好是音乐和体育。在艺术方面，我特别喜欢音乐和摄影。我对游泳体育活动有特别的兴趣。在科学领域，我对生物学感兴趣。我也有想学习一种乐器，那就是吉他。我对探讨文化多元性的文化或社会问题有兴趣。每周我能投入大约4小时到社团活动。我希望通过参加社团活动获得扩大社交圈子和提升个人技能。对于社团活动的形式，我更倾向于线上虚拟活动。现在请你根据我的个人信息，帮我从学校社团列表中，选择三个适合我的社团推荐给我。学校社团列表如下：天文社、流行音乐社、动漫社、英语协会、民谣社、吉他社、轻音社、篮球社、象棋社、文学社、推理社、电子游戏社、电影鉴赏协会、欧美文化社、运动协会、手工社、数码社、环保协会、辩论社"}
                // "天文社、流行音乐社、动漫社、英语协会、民谣社、吉他社、轻音社、篮球社、象棋社、文学社、推理社、电子游戏社、电影鉴赏协会、欧美文化社、运动协会、手工社、数码社、环保协会、辩论社"
            }).then(res => {
                console.log(res.data);
            })
        },
        handleCurrentChange(val) {
            this.page = val
        },
        handleCurrentChange1(val) {
            this.page1 = val
        },
        goForum(item) {
            localStorage.setItem("clubId", item.clubId);
            localStorage.setItem("clubName", item.clubName);
            this.$router.push('/forum')
        },
        detail(value) {
            console.log(value);
            this.postDetail = value;

            // 获取帖子的评论列表
            this.$axios({
                method: 'get',
                url: '/api/forum/comment/' + value.postId,
            })
                .then(res => {
                    console.log(res.data.data);
                    this.comment = res.data.data;
                    this.comment.sort(function (a, b) {
                        return b.commentTime < a.commentTime ? -1 : 1
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })

            // 判断帖子是否收藏
            this.$axios({
                method: 'post',
                url: '/api/forum/collection/judge',
                data: {
                    postId: value.postId,
                    userId: localStorage.getItem("userId"),
                }
            })
                .then(res => {
                    console.log('是否收藏' + res.data.message);
                    if (res.data.code == 200) {
                        this.isCollected = true;
                    }
                    else {
                        this.isCollected = false;
                    }

                })
                .catch(function (error) {
                    console.log(error);
                })

            // 判断帖子是否点赞
            this.$axios({
                method: 'post',
                url: '/api/forum/likes/judge',
                data: {
                    postId: value.postId,
                    userId: localStorage.getItem("userId"),
                }
            })
                .then(res => {
                    console.log('是否收藏' + res.data.message);
                    if (res.data.code == 200) {
                        this.isLiked = true;
                    }
                    else {
                        this.isLiked = false;
                    }

                })
                .catch(function (error) {
                    console.log(error);
                })

            this.dialogFormVisible = true;
        },
        currentTagName(tagName) {
            this.currentTag = tagName;
        },
        submitComment() {
            if (this.dComment == "" || this.dComment == null) {
                ElMessage({
                    message: "评论不能为空",
                    type: 'error',
                })
                return;
            }
            this.$axios({
                method: 'post',
                url: '/api/forum/comment',
                data: {
                    userId: localStorage.getItem("userId"),
                    postId: this.postDetail.postId,
                    commentContent: this.dComment
                },
            })
                .then(res => {
                    console.log(res.data.message);
                    if (res.data.code == 200) {
                        ElMessage({
                            message: '成功发表评论！',
                            type: 'success',
                        })
                    } else {
                        ElMessage.error('发表失败！')
                    }
                    this.dialogFormVisible = false;
                    this.dComment = null;
                    this.detail(this.postDetail);
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        confirmDeleteCancel() {
            ElMessageBox.confirm(
                '确认删除注销社团申请?',
                '提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                }
            )
                .then(() => {
                    this.deleteCancel();
                })
        },
        collect() {
            // 收藏帖子
            this.$axios({
                method: 'post',
                url: '/api/forum/collection',
                data: {
                    postId: this.postDetail.postId,
                    userId: localStorage.getItem("userId"),
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        ElMessage({
                            message: '收藏成功！',
                            type: 'success',
                        })
                        this.dialogFormVisible = false;
                        this.detail(this.postDetail);
                    }
                    else {
                        ElMessage.error('收藏失败！')
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    ElMessage.error('收藏失败！')
                })
        },
        cancelCollect() {
            ElMessageBox.confirm(
                '确认取消收藏?',
                '提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                }
            )
                .then(() => {
                    // 取消收藏帖子
                    this.$axios({
                        method: 'delete',
                        url: '/api/forum/collection',
                        data: {
                            postId: this.postDetail.postId,
                            userId: localStorage.getItem("userId"),
                        }
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                ElMessage({
                                    message: '已取消收藏！',
                                    type: 'success',
                                })
                                this.dialogFormVisible = false;
                                this.detail(this.postDetail);
                            }
                            else {
                                ElMessage.error('操作失败！')
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            ElMessage.error('操作失败！')
                        })
                })
        },
        like() {
            // 点赞帖子
            this.$axios({
                method: 'post',
                url: '/api/forum/likes',
                data: {
                    postId: this.postDetail.postId,
                    userId: localStorage.getItem("userId"),
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        ElMessage({
                            message: '点赞成功！',
                            type: 'success',
                        })
                        this.dialogFormVisible = false;
                        this.detail(this.postDetail);
                    }
                    else {
                        ElMessage.error('点赞失败！')
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    ElMessage.error('点赞失败！')
                })
        },
        cancelLike() {
            ElMessageBox.confirm(
                '确认取消点赞?',
                '提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                }
            )
                .then(() => {
                    // 取消收藏帖子
                    this.$axios({
                        method: 'delete',
                        url: '/api/forum/likes',
                        data: {
                            postId: this.postDetail.postId,
                            userId: localStorage.getItem("userId"),
                        }
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                ElMessage({
                                    message: '已取消点赞！',
                                    type: 'success',
                                })
                                this.dialogFormVisible = false;
                                this.detail(this.postDetail);
                            }
                            else {
                                ElMessage.error('操作失败！')
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            ElMessage.error('操作失败！')
                        })
                })
        },
        upPost() {
            if (this.newPost.postTitle == "" || this.newPost.postTitle == null || this.newPost.postContent == "" || this.newPost.postContent == null || this.newPost.postTag == [] || this.newPost.postTag == null) {
                ElMessage({
                    message: "不能为空",
                    type: 'error',
                })
                return;
            }
            console.log("我的帖子标签" + this.newPost.postTag)
            ElMessageBox.confirm(
                '确认发布该帖子?',
                '提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                }
            )
                .then(() => {
                    // 发布帖子
                    this.$axios({
                        method: 'post',
                        url: '/api/forum/post',
                        data: this.newPost,
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                ElMessage({
                                    message: '已发布该帖子！',
                                    type: 'success',
                                })
                                this.$router.go(0);
                            }
                            else {
                                ElMessage.error('操作失败！')
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            ElMessage.error('操作失败！')
                        })
                })
        },
        cancelUpPost() {
            this.newPost.postTitle = null;
            this.newPost.postTag = [];
            this.newPost.postContent = null;
            this.dialogFormVisible1 = false
        },
        deletePost() {
            ElMessageBox.confirm(
                '确认删除该帖子?',
                '提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                }
            )
                .then(() => {
                    // 删除帖子
                    this.$axios({
                        method: 'delete',
                        url: '/api/forum/post/' + this.postDetail.postId,
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                ElMessage({
                                    message: '已删除该帖子！',
                                    type: 'success',
                                })
                                this.$router.go(0);
                            }
                            else {
                                ElMessage.error('操作失败！')
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            ElMessage.error('操作失败！')
                        })
                })
        },
        reportPost() {
            if (this.postReport.reportReason == "" || this.postReport.reportReason == null) {
                ElMessage({
                    message: "举报理由不能为空",
                    type: 'error',
                })
                return;
            }
            this.postReport.targetId = this.postDetail.postId;
            // 举报帖子
            this.$axios({
                method: 'post',
                url: '/api/forum/report',
                data: this.postReport,
            })
                .then(res => {
                    if (res.data.code == 200) {
                        ElMessage({
                            message: '举报成功！',
                            type: 'success',
                        })
                        this.postReport.reportReason = null;
                        this.dialogFormVisible2 = false;
                    }
                    else {
                        ElMessage.error('操作失败！')
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    ElMessage.error('操作失败！')
                })
        },
        cancelReportPost() {
            this.postReport.targetId = null;
            this.postReport.reportReason = null;
            this.dialogFormVisible2 = false
        }
    },
    computed: {
        filterPost() {
            if (this.currentTag == '全部') {
                return this.postList;
            }
            else {
                return this.postList.filter((post) => {
                    return post.postTag.some((tag) => tag.tagName === this.currentTag);
                });
            }
        },
    },
    created() {
        this.clubName = localStorage.getItem("clubName");
        this.clubId = localStorage.getItem("clubId");
        let userId = localStorage.getItem("userId");

        // get club list
        this.$axios({
            method: 'get',
            url: '/api/examine/club',
        })
            .then(res => {
                console.log(res.data.data);
                this.clubList = res.data.data;
                this.total1 = res.data.data.length;
            })
            .catch(function (error) {
                console.log(error);
            })

        // 获取tag列表
        this.$axios({
            method: 'get',
            url: '/api/forum/tag/' + this.clubId,
        })
            .then(res => {
                console.log(res.data.data);
                this.tags = res.data.data;
            })
            .catch(function (error) {
                console.log(error);
            })

        // 获取该社团论坛的帖子列表
        this.$axios({
            method: 'get',
            url: '/api/forum/post/recommend/' + userId,
        })
            .then(res => {
                this.postList = res.data.data;
                this.postList.sort(function (a, b) {
                    return b.postTime < a.postTime ? -1 : 1
                })
                this.total = this.postList.length;
                console.log('帖子列表' + this.postList);
            })
            .catch(function (error) {
                console.log(error);
            })

        // 获取热门帖子
        this.$axios({
            method: 'get',
            url: '/api/forum/post/popular',
        })
            .then(res => {
                console.log("hot:");
                console.log(res.data.data);
                this.hotList = res.data.data;
            })
            .catch(function (error) {
                console.log(error);
            })

        // 获取我发布的帖子
        this.$axios({
            method: 'post',
            url: '/api/forum/post/user',
            data: {
                userId: localStorage.getItem("userId"),
                status: "正常"
            }
        })
            .then(res => {
                console.log('我的帖子' + res.data.data);
                this.myPostList = res.data.data;
            })
            .catch(function (error) {
                console.log(error);
            })

        // 获取我收藏的帖子
        this.$axios({
            method: 'get',
            url: '/api/user-info/collection/' + localStorage.getItem("userId"),
        })
            .then(res => {
                this.collectedPostList = res.data.data;
            })
            .catch(function (error) {
                console.log(error);
            })

        // 获取用户信息
        this.$axios({
            method: 'get',
            url: '/api/user-info/person-info/' + localStorage.getItem("userId"),
        })
            .then(res => {
                console.log(res.data.data);
                this.userInfo = res.data.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}
</script>

<style scoped>
.bg {
    background-color: #f9f9f9;
}

.item {
    padding: 0px 0px 20px 25px;
}

.item-img {
    width: 50px;
    height: 50px;
    border: 2px solid rgb(251, 222, 89);
    border-radius: 12px;
}

.pagination {
    --el-color-primary: #024886;
    margin-bottom: 20px;
    display: inline-block;
}

.el-pagination {
    --el-pagination-font-size: 16px;
    --el-pagination-button-color: #024886;
    --el-pagination-button-disabled-bg-color: #fff;
    --el-pagination-button-bg-color: #fff;
    --el-pagination-hover-color: #167fdb;
}

.pagination1 li {
    float: none;
    width: 30px;
    background: #fff;
    position: unset;
    align-self: center;

}

.pagination1 {
    align-self: center;
    padding-left: 40%;
    --el-color-primary: #FFC353;
    display: block;
    margin: 0 auto;
}

.item-name {
    color: white;
    font-size: large;
}

.club {
    text-align: center;
}

.club_list {
    list-style: none;
    padding: 0px;
    margin: 0px;
    margin-top: 20px;
    height: 88px;
}

.club li {
    border-radius: 20px;
    float: left;
    /* width: 234px;
    height: 220px; */
    /* padding: 20px 0 20px; */
    z-index: 1;
    margin-left: 14px;
    /* margin-bottom: 14px; */
    /* background: #fff; */
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
    position: relative;
    font-size: 20px;
    font-weight: bold;
    color: #023764;
}

.clubnav-header {
    color: #f9f9f9;
    font-size: 18px;
}

.user {
    width: 20vw;
    height: 50vh;
    border-radius: 20px;
    margin-right: 2vw;
    padding-bottom: 1vh;
}

.user .sign {
    font-size: 12px;
    margin-top: 10px;
    color: grey;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    /* 这里是超出几行省略 */
    overflow: hidden;
}

.forumImg {
    width: 15vw;
    height: 40vh;
    border-radius: 20px;
    margin-right: 20px;
}

.Img {
    width: 15vw;
    height: 40vh;
}

.tagTitle {
    font-size: 20px;
    color: #FFC353;
    font-weight: 600;
}

.tagList {
    margin-left: 2vw;
    width: 6vw;
    color: #023764;
    font-size: 16px;
    border-radius: 15px;
}

.box-card {
    margin-top: 2vh;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
}

.card-header .button {
    color: #023764;
    height: 30px;
    width: 30px;
}

.hotList .button {
    height: 10px;
    width: 10px;
    float: right;
}

.hotPost {
    margin-left: 0px;
    margin-right: 80px;
    width: 20vw;
}

.hotList {
    margin: 1.5vh 0px;
    /* margin-right: 60px; */
}

.textFather {
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

.postTag {
    width: 5vw;
    margin-right: 1vw;
}

.postContent {
    margin-bottom: 2vh;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    /* 这里是超出几行省略 */
    overflow: hidden;
    color: rgb(85, 84, 84);
    font-size: 14px;
}

.myPostText {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    /* 这里是超出几行省略 */
    overflow: hidden;
    color: rgb(85, 84, 84);
    font-size: 14px;
}

.postDetailUsername {
    font-size: 16px;
    color: #023764;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    /* 这里是超出几行省略 */
    overflow: hidden;
}

.pagination {
    --el-color-primary: #FFC353;
    display: block;
    margin: 0 auto;
}

.el-pagination {
    --el-pagination-font-size: 16px;
    --el-pagination-button-color: #024886;
    --el-pagination-button-disabled-bg-color: #fff;
    --el-pagination-button-bg-color: #fff;
    --el-pagination-hover-color: #167fdb;
}

.dPost {
    padding: 0px 30px;
}

.dTitle {
    margin: 10px 0px;
    color: #023764;
}

.dTime {
    margin: 10px 0px;
    color: #a2abb3;
}

.dContent {
    line-height: 40px;
}

.dcomment {
    border: 2px solid #d2d4d6;
    border-radius: 10px;
}
</style>