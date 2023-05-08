<template>
    <OrgHeader />

    <el-row style="background:#EEEEEE">
        <OrgNav />
        <el-col :span="20" class="main">

            <!-- 报销管理 -->
            <el-card class="box-card-1" style="text-align:center">
                <template #header>
                    <div class="card-header">
                        <span>报销提交记录</span>
                        <el-button class="button" color="#023764" @click="dialogFormVisible = true">提交申请
                        </el-button>
                    </div>
                </template>

                <!-- 报销列表 -->
                <el-table :data="reimList.slice((page - 1) * limit, page * limit)" style="width: 100%" size="large"
                    height="430" highlight-current-row @current-change="getCurrentRow">
                    <el-table-column label="序号" type="index" width="70" />
                    <el-table-column prop="title" label="标题" />
                    <el-table-column prop="amount" sortable label="报销金额" />
                    <el-table-column prop="createTime" sortable label="申请时间" />
                    <el-table-column prop="userName" label="申请人" />
                    <el-table-column prop="status" label="状态" width="100" :filters="[
                            { text: '已通过', value: '已通过' },
                            { text: '已拒绝', value: '已拒绝' },
                            { text: '待审批', value: '待审批' },
                        ]" :filter-method="filterTag" filter-placement="bottom-end">
                        <template #default="scope">
                            <el-tag v-if="scope.row.status == '已通过'" type="success" disable-transitions>已通过</el-tag>
                            <el-tag v-if="scope.row.status == '已拒绝'" type="danger" disable-transitions>已拒绝</el-tag>
                            <el-tag v-if="scope.row.status == '待审批'" disable-transitions>待审批</el-tag>
                        </template>
                    </el-table-column>
                    <!-- 查看详情按钮 -->
                    <el-table-column fixed="right" label="操作" width="120">
                        <el-button link type="primary" size="small" @click="dialogFormVisible1 = true">查看详情</el-button>
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

                <!-- 报销详情弹窗 -->
                <el-dialog v-model="dialogFormVisible1" align-center draggable width="55vw" style="padding:0px 10px;"
                    title="报销详情">
                    <el-scrollbar height="450px">
                        <div style="margin-left:15px;margin-right:20px;">
                            <el-descriptions border :model="reim" :column="4" direction="vertical">
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            <el-icon :style="iconStyle">
                                                <el-icon>
                                                    <Ship />
                                                </el-icon>
                                            </el-icon>
                                            <span class="cell-text">申请社团</span>
                                        </div>
                                    </template>
                                    <el-tag size="small">{{ reim.clubName }}</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            <el-icon :style="iconStyle">
                                                <user />
                                            </el-icon>
                                            <span class="cell-text">申请人</span>
                                        </div>
                                    </template>
                                    <el-tag size="small">{{ reim.userName }}</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            <el-icon :style="iconStyle">
                                                <el-icon>
                                                    <Money />
                                                </el-icon>
                                            </el-icon>
                                            <span class="cell-text">申请金额</span>
                                        </div>
                                    </template>
                                    <h4 style="color:green">{{ reim.amount }}</h4>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            <el-icon :style="iconStyle">
                                                <el-icon>
                                                    <Calendar />
                                                </el-icon>
                                            </el-icon>
                                            <span class="cell-text">申请时间</span>
                                        </div>
                                    </template>
                                    {{ reim.createTime }}
                                </el-descriptions-item>
                                <el-descriptions-item label="标题" :span="4">{{ reim.title }}</el-descriptions-item>
                                <el-descriptions-item label="申请理由" :span="4">{{ reim.description }}</el-descriptions-item>
                                <el-descriptions-item label="附件">
                                    <el-carousel trigger="click" arrow="always" :autoplay="false">
                                        <el-carousel-item v-for="item of reim.attachments" :key="item">
                                            <div style="text-align:center">
                                                <!-- <el-image style="width: 30vw;" src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" fit="contain">
                                                        </el-image> -->
                                                <el-image style="width: 30vw;" src="item.attachUrl" fit="contain">
                                                </el-image>
                                            </div>
                                        </el-carousel-item>
                                    </el-carousel>
                                </el-descriptions-item>
                            </el-descriptions>
                        </div>
                    </el-scrollbar>

                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible1 = false">退出</el-button>
                        </span>
                    </template>
                </el-dialog>

                <!-- 提交报销申请弹窗 -->
                <el-dialog v-model="dialogFormVisible" align-center draggable width="55vw" style="padding:0px 10px;"
                    title="提交报销申请">
                    <el-scrollbar height="450px">

                        <el-form :model="inputreim">
                            <el-form-item label="社团名称:" style="font-weight:bold" label-width="80px">
                                {{ clubName }}
                            </el-form-item>

                            <el-form-item label="标题:" style="font-weight:bold" label-width="80px">
                                <el-input v-model="inputreim.title" autocomplete="off" />
                            </el-form-item>

                            <el-form-item label="金额:" style="font-weight:bold" label-width="80px">
                                <el-input-number v-model="inputreim.amount" :min="1" :max="1000000" size="small"
                                    controls-position="right" @change="handleChange" />
                            </el-form-item>

                            <el-form-item label="申请理由:" style="font-weight:bold" label-width="80px">
                                <el-input v-model="inputreim.description" :rows="3" type="textarea"
                                    placeholder="请输入详细描述，以便工作人员进行审批" />
                            </el-form-item>

                            <el-form-item label="附件:" style="font-weight:bold" label-width="80px">
                                <!-- <el-input v-model="inputreim.attachments" autocomplete="off" /> -->
                                <el-upload v-model="inputreim.attachments" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                    :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture">
                                    <el-button type="primary">上传附件</el-button>
                                    <template #tip>
                                        <div class="el-upload__tip">
                                            jpg/png files with a size less than 500kb
                                        </div>
                                    </template>
                                </el-upload>
                            </el-form-item>
                        </el-form>

                    </el-scrollbar>

                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取消</el-button>
                            <el-button type="primary" @click="addReim">确认</el-button>
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
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/index'


export default {
    name: "OrgClubReim",
    data() {
        return {
            page: 1,
            limit: 8,
            total: 6,
            reimList: [{}],
            dialogFormVisible: false,
            dialogFormVisible1: false,
            feedback: null,
            reim: {},
            inputreim: {},
            display: false,
            isPass: true,
            clubName: localStorage.getItem("clubName"),
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.page = val
        },

        getCurrentRow(value) {
            if (value != null) {
                console.log(value);
                this.reim = value;
                console.log("当前行" + this.reim);
            }
        },



        //提交报销申请
        addReim() {
            if (this.inputreim.title == ""
                || this.inputreim.amount == ""
                || this.inputreim.description == "") {
                ElMessage({
                    message: "不能为空?",
                    type: 'error',
                })
                return;
            }
            this.dialogFormVisible = false;

            this.$axios({
                method: 'post',
                url: '/api/club-manage/reimbursements',
                data: {
                    clubId: localStorage.getItem("clubId"),
                    userId: localStorage.getItem("userId"),
                    title: this.inputreim.title,
                    amount: this.inputreim.amount,
                    description: this.inputreim.description,
                    attachments: this.inputreim.attachments,
                }
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
        this.$axios({
            method: 'get',
            url: '/api/club-manage/reimbursements/' + localStorage.getItem("clubId"),
        })
            .then(res => {
                console.log(res.data.data);
                this.reimList = res.data.data;
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