<template>
    <OrgHeader />

    <el-row style="background:#EEEEEE">
        <OrgNav />
        <el-col :span="15" class="main">

            <!-- 违规管理：帖子/评论 -->
            <el-card class="box-card-1" style="text-align:center">
                <template #header>
                    <div class="card-header">
                        <span>违规列表</span>
                    </div>
                </template>

                <!-- 表格 -->
                <el-table :data="reportList.slice((page - 1) * limit, page * limit)" style="width: 100%" size="large"
                    height="430" highlight-current-row @current-change="getCurrentRow">
                    <el-table-column label="序号" type="index" width="80" />
                    <el-table-column prop="reportReason" label="申请社团" sortable width="170" />
                    <el-table-column prop="reporterId" label="申请人" sortable width="100" />
                    <el-table-column prop="targetType" label="申请标题" />
                    <el-table-column prop="reportTime" label="申请金额" />
                    <el-table-column prop="status" label="状态" width="100" :filters="[
                            { text: '已审核', value: '已审核' },
                            { text: '待审核', value: '待审核' },
                        ]" :filter-method="filterTag" filter-placement="bottom-end">
                        <template #default="scope">
                            <el-tag v-if="scope.row.status == '已审核'" type="danger" disable-transitions>已审核</el-tag>
                            <el-tag v-if="scope.row.status == '待审核'" disable-transitions>待审核</el-tag>
                        </template>
                    </el-table-column>

                    <!-- 审核按钮 -->
                    <el-table-column fixed="right" label="操作" width="120">
                        <el-button link type="primary" size="small" @click="dialogFormVisible1 = true">审核</el-button>
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

                <!-- 审核详情弹窗 -->
                <el-dialog v-model="dialogFormVisible1" align-center draggable width="55vw" style="padding:0px 10px;"
                    title="审核详情">
                    <el-scrollbar height="450px">
                        <div style="margin-left:15px;margin-right:20px;">
                            <el-form :model="report">

                                <el-form-item label="违规内容" label-width="70px">
                                    <el-input disabled v-model="report.reportContent" autocomplete="off" type="textarea"
                                        :rows="5" />
                                </el-form-item>

                                <el-form-item label="审核状态" label-width="70px">
                                    <el-tag v-if="report.status == '已审核'" type="danger" disable-transitions>已审核</el-tag>
                                    <el-tag v-if="report.status == '待审核'" disable-transitions>待审核</el-tag>
                                </el-form-item>

                                <el-form-item label="惩罚措施" label-width="70px">

                                </el-form-item>

                                <el-form-item v-if="report.status == '已审核'" label="反馈" label-width="70px">
                                    <el-input disabled v-model="report.feedback" autocomplete="off" type="textarea"
                                        :rows="17" />
                                </el-form-item>
                                <el-form-item required v-if="report.status == '待审核'" label="反馈" label-width="70px">
                                    <el-input v-model="feedback" autocomplete="off" type="textarea" :rows="16" />
                                </el-form-item>


                                <!-- 提交审核结果 -->
                                <el-button v-if="report.status == '待审核'" style="width:80px;" type="success" plain
                                    @click="pass">提交</el-button>

                            </el-form>
                        </div>
                    </el-scrollbar>
                </el-dialog>
            </el-card>

        </el-col>

        <el-col :span="5" class="main">
            <el-card class="box-card-1">
                <template #header>
                    <div class="card-header">
                        <span>tag管理</span>
                    </div>
                </template>

                <el-tag v-for="tag in tagList" :key="tag" class="mx-1" size="large" style="margin:5px; ">
                    {{ tag.tagName }}
                </el-tag>

                <el-input v-if="inputVisible" v-model="inputValue" class="ml-1 w-20" @keyup.enter="handleInputConfirm"
                    @blur="handleInputConfirm" style="margin:5px; " />
                <el-button v-else class="button-new-tag ml-1" @click="showInput" style="margin:5px; ">
                    + New Tag
                </el-button>


            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import OrgNav from '@/components/OrgNav.vue'
import OrgHeader from '@/components/OrgHeader.vue'
import { ElMessage } from 'element-plus'



export default {
    name: "OrgForum",
    components: {
        OrgNav,
        OrgHeader,
    },

    data() {
        return {
            clubId: localStorage.getItem("clubId"),
            page: 1,
            limit: 8,
            total: 6,
            // dialogFormVisible: false,
            dialogFormVisible1: false,
            feedback: null,
            report: {
                reportContent: "我是美美姐的狗",
            },
            // display: false,
            // isPass: true,

            reportList: [
                {
                    "reportId": 1,
                    "targetId": 10,
                    "reportReason": "这个帖子有问题，不利于团结",
                    "reporterId": 1,
                    "targetType": "帖子",
                    "reportTime": "2023-05-01 17:30:38",
                    "status": "待审批",
                    "punish": null,
                    "feedback": null
                },
                {
                    "reportId": 2,
                    "targetId": 15,
                    "reportReason": "这个评论有问题，不利于团结",
                    "reporterId": 1,
                    "targetType": "评论",
                    "reportTime": "2023-05-01 17:38:38",
                    "status": "待审批",
                    "punish": null,
                    "feedback": null
                }
            ],

            inputValue: '',
            tagList: ['Tag 1', 'Tag 2', 'Tag 3'],
            inputVisible: false,



        }
    },
    methods: {

        showInput() {
            this.inputVisible = true
        },

        handleInputConfirm() {
            // if (inputValue.value) {
            //     tagList.value.push("tagName:" + inputValue.value)
            // }

            if (this.inputValue == "") {
                ElMessage({
                    message: "tag不能为空",
                    type: 'error',
                })
                this.inputVisible = false
                this.inputValue = ''
                return;
            }

            this.$axios({
                method: 'post',
                url: '/api/forum/tag',
                data: {
                    clubId: this.clubId,
                    tagName: this.inputValue
                }
            })
                .then(res => {
                    console.log("inputTag", res);
                })
                .catch(function (error) {
                    console.log(error);
                })

            this.inputVisible = false
            this.inputValue = ''
            this.$router.go(0)
        },

        handleCurrentChange(val) {
            this.page = val
        },
        getCurrentRow(value) {
            if (value != null) {
                console.log(value);
                this.report = value;
                console.log("当前行" + this.report);
            }
        },

        // pass() {
        //     console.log("通过");
        //     console.log(this.report);
        //     if (this.feedback == "" || this.feedback == null) {
        //         ElMessage({
        //             message: "反馈不能为空",
        //             type: 'error',
        //         })
        //         return;
        //     }
        //     this.dialogFormVisible1 = false;
        //     this.$axios({
        //         method: 'put',
        //         url: '/api/club-manage/reportbursements',
        //         data: {
        //             reportId: this.report.reportId,
        //             status: "已通过",
        //             feedback: this.feedback
        //         },
        //     })
        //         .then(res => {
        //             console.log(res.data.message);
        //             if (res.data.code == 200) {
        //                 ElMessage({
        //                     message: res.data.message,
        //                     type: 'success',
        //                 })
        //             } else {
        //                 ElMessage.error(res.data.message)
        //             }
        //             this.$router.go(0)
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         })
        // },
        filterTag(value, row) {
            return row.status === value;
        },
    },


    created() {
        // 获取违规列表
        this.$axios({
            method: 'get',
            url: '/api/forum/report',
            data: {
                clubId: this.clubId,
                // status:"正常"
            }
        })
            .then(res => {
                console.log("违规列表", res.data.data);
                this.reportList = res.data.data;
                this.total = res.data.data.length;
            })
            .catch(function (error) {
                console.log(error);
            })

        //获取 tag 列表
        this.$axios({
            method: 'get',
            url: '/api/forum/tag/' + localStorage.getItem("clubId"),
        })
            .then(res => {
                console.log("tag", res.data.data);
                this.tagList = res.data.data;
                this.total = res.data.data.length;
            })
            .catch(function (error) {
                console.log(error);
            })
    },


}
</script>



<style scoped>
.main {
    padding: 10px;
    height: 99%;
}


.pagination {
    display: block;
    margin: 0 auto;
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


.cell-item {
    display: flex;
    align-items: center;
}

.cell-text {
    padding-left: 5px;
}
</style>