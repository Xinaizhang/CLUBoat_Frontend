<template>
    <OrgHeader />

    <el-row style="background:#EEEEEE">
        <OrgNav />
        <el-col :span="20" class="main">

            <!-- 资讯管理 -->
            <el-card class="box-card-1">
                <template #header>
                    <div class="card-header">
                        <span>资讯管理</span>
                        <el-button class="button" color="#023764" @click="dialogFormVisible = true">发布资讯
                        </el-button>
                    </div>
                </template>

                <!-- 资讯列表 -->
                <el-table :data="newsList.slice((page-1) * limit, page * limit)" style="width: 100%" size="large"
                    height="430" highlight-current-row @current-change="getCurrentRow">
                    <el-table-column label="序号" type="index" width="150" />
                    <el-table-column prop="newsTitle" label="标题" />
                    <el-table-column prop="newsContent" label="内容" />
                    <el-table-column prop="newsTime" sortable label="发布时间" />
                    <el-table-column fixed="right" label="操作" width="120">
                        <!-- 修改删除按钮 -->
                        <el-button link type="primary" size="small" @click="dialogFormVisible1 = true">修改</el-button>
                        <el-button link type="primary" size="small" @click="confirmDeleteNews">删除</el-button>
                    </el-table-column>
                </el-table>

                <!-- 翻页 -->
                <el-row justify="center">
                    <div class="pagination">
                        <div class="pagination_style">&emsp;</div>
                        <el-pagination :current-page="page" :page-size="limit" background layout="prev, pager, next"
                            :total="total" @current-change="handleCurrentChange" />
                    </div>
                </el-row>

                <!-- 发布资讯 -->
                <el-dialog v-model="dialogFormVisible" title="发布资讯" align-center draggable>
                    <el-form :model="news">
                        <el-form-item label="资讯标题" label-width="70px">
                            <el-input v-model="news.newsTitle" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="资讯内容" label-width="70px">
                            <el-input v-model="news.newsContent" autocomplete="off" type="textarea" :rows="6" />
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取消</el-button>
                            <el-button type="primary" @click="addNews">确认</el-button>
                        </span>
                    </template>
                </el-dialog>

                <!-- 修改资讯 -->
                <el-dialog v-model="dialogFormVisible1" title="修改资讯" align-center draggable>
                    <el-form :model="news">
                        <el-form-item label="资讯标题" label-width="70px">
                            <el-input v-model="news.newsTitle" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="资讯内容" label-width="70px">
                            <el-input v-model="news.newsContent" autocomplete="off" type="textarea" :rows="6" />
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible1 = false">取消</el-button>
                            <el-button type="primary" @click="modifyNews">确认</el-button>
                        </span>
                    </template>
                </el-dialog>


            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import OrgNav from '@/components/OrgNav.vue'
    import OrgHeader from '@/components/OrgHeader.vue'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import 'element-plus/es/components/message/style/index'
    import 'element-plus/es/components/message-box/style/index'

    export default {
        name: "OrgClubNews",
        data() {
            return {
                page: 1,
                limit: 8,
                total: 6,
                newsList: [{}],
                dialogFormVisible: false,
                dialogFormVisible1: false,
                feedback: null,
                news: {
                    newsId: 1,
                    clubId: 1,
                    userId: 1,
                    newsTime: "",
                    newsTitle: "",
                    newsContent: "",
                },
                // newsEdit:{
                //     newsId: 1,
                //     newsTitle: "",
                //     newsContent: "",
                // },
                display: false,
                isPass: true,
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val
            },

            getCurrentRow(value) {
                if (value != null) {
                    console.log(value);
                    this.news.newsId = value.newsId;
                    this.news.newsTime = value.newsTime;
                    this.news.newsTitle = value.newsTitle;
                    this.news.newsContent = value.newsContent;
                    console.log("hhhhhh");
                    console.log(this.news);
                }
            },

            addNews() {
                if (this.news.newsTitle == "" || this.news.newsContent == "") {
                    ElMessage({
                        message: "不能为空！",
                        type: 'error',
                    })
                    return;
                }
                this.dialogFormVisible = false;

                this.$axios({
                    method: 'post',
                    url: '/api/club-manage/news',
                    data: this.news,
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

            modifyNews() {
                // this.newsEdit.userId = this.news.newsId
                // this.newsEdit.newsTitle = this.news.newsTitle
                // this.newsEdit.newsContent = this.news.newsContent

                this.dialogFormVisible1 = false;
                this.$axios({
                    method: 'put',
                    url: '/api/club-manage/news',
                    data: {
                        newsId: this.news.newsId,
                        newsTitle: this.news.newsTitle,
                        newsContent: this.news.newsContent,
                    },
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

            deleteNews() {
                this.$axios({
                    method: 'delete',
                    url: '/api/club-manage/news/' + this.news.newsId,
                })
                    .then(res => {
                        console.log(res.data.message);
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
                        ElMessage.error("操作失败")
                    })
            },
            confirmDeleteNews() {
                ElMessageBox.confirm(
                    '确认删除活动申请?',
                    '提示',
                    {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                    }
                )
                    .then(() => {
                        this.deleteNews();
                    })
            },
            filterTag(value, row) {
                return row.activityApplyIsPass === value;
            },
        },

        created() {
            this.$axios({
                method: 'get',
                url: '/api/club-manage/news/1',
            })
                .then(res => {
                    console.log(res.data.data);
                    this.newsList = res.data.data;
                    this.total = res.data.data.length;
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
        height: 83vh;
    }
</style>