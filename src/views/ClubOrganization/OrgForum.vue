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
                            { text: '已审批', value: '已审批' },
                            { text: '待审批', value: '待审批' },
                        ]" :filter-method="filterTag" filter-placement="bottom-end">
                        <template #default="scope">
                            <el-tag v-if="scope.row.status == '已审批'" type="success" disable-transitions>已审批</el-tag>
                            <el-tag v-if="scope.row.status == '待审批'" disable-transitions>待审批</el-tag>
                        </template>
                    </el-table-column>

                    <!-- 审批按钮 -->
                    <el-table-column fixed="right" label="操作" width="120">
                        <el-button link type="primary" size="small" @click="dialogFormVisible1 = true">审批</el-button>
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

                <!-- 审批详情弹窗 -->
                <el-dialog v-model="dialogFormVisible1" align-center draggable width="55vw" style="padding:0px 10px;"
                    title="审批详情">
                    <el-scrollbar height="450px">
                        <div style="margin-left:15px;margin-right:20px;">
                            <el-form :model="report">

                                <el-form-item label="违规内容" label-width="70px">
                                    <el-input disabled v-model="report.reportContent" autocomplete="off" type="textarea"
                                        :rows="3" />
                                </el-form-item>

                                <el-form-item label="审批状态" label-width="70px">
                                    <el-tag v-if="report.status == '已审批'" type="success" disable-transitions>已审批</el-tag>
                                    <el-tag v-if="report.status == '待审批'" disable-transitions>待审批</el-tag>
                                </el-form-item>

                                <el-form-item label="惩罚措施" label-width="70px">
                                    <el-select v-model="report.punish" class="m-2" placeholder="请选择">
                                        <el-option v-for="item in punish" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                    </el-select>

                                </el-form-item>

                                <el-form-item v-if="report.status == '已审批'" label="反馈" label-width="70px">
                                    <el-input disabled v-model="report.feedback" autocomplete="off" type="textarea"
                                        :rows="7" />
                                </el-form-item>
                                <el-form-item required v-if="report.status == '待审批'" label="反馈" label-width="70px">
                                    <el-input v-model="report.feedback" autocomplete="off" type="textarea" :rows="7" />
                                </el-form-item>


                                <!-- 提交审批结果 -->
                                <el-button v-if="report.status == '待审批'" style="width:80px;" type="primary"
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
            dialogFormVisible1: false,
            report: {
                reportContent: "我是美美姐的狗",
            },
            value : "",
            punish :[
                {
                    value: '无',
                    label: '无',
                },
                {
                    value: '删除',
                    label: '删除',
                },
                {
                    value: '删除并封禁用户',
                    label: '删除并封禁用户',
                }
            ],
            reportList: [],
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
                console.log("当前行", this.report);

                this.$axios({
                    method: 'get',
                    url: '/api/forum/report/detail/' + this.report.reportId,
                })
                    .then(res => {
                        console.log("reportDetail", res.data.data.reportContent);
                        this.report.reportContent = res.data.data.reportContent;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })


            }
        },

        pass() {
            console.log("提交");
            if (this.report.feedback == "" || this.report.punish == null) {
                ElMessage({
                    message: "反馈/惩罚不能为空",
                    type: 'error',
                })
                return;
            }
            this.dialogFormVisible1 = false;
            this.$axios({
                method: 'put',
                url: '/api/forum/report',
                data: {
                    reportId: this.report.reportId,
                    status: "已审批",
                    punish:this.report.punish,
                    feedback: this.report.feedback
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