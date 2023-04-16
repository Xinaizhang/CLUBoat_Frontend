<template>
    <OrgHeader />

    <el-row style="background:#EEEEEE">
        <OrgNav />
        <el-col :span="20" class="main">
            <el-card class="box-card-1">
                <template #header>
                    <div class="card-header">
                        <span>人员列表</span>
                        <div>
                            <el-button color="#023764" @click="apply">管理员申请</el-button>
                            <el-button color="#023764" @click="join">入社申请</el-button>
                        </div>
                    </div>
                </template>
                <el-table :data="buildList.slice((page-1) * limit, page * limit)" style="width: 100%" size="large"
                    height="430" highlight-current-row @current-change="getCurrentRow">
                    <el-table-column label="序号" type="index" width="150" />
                    <el-table-column prop="userId" label="用户ID" sortable width="150" />
                    <el-table-column prop="userName" label="用户名" />
                    <el-table-column prop="permission" label="职位" width="100" :filters="[
                                    { text: '社长', value: 2 },
                                    { text: '管理员', value: 1 },
                                    { text: '社员', value: 0 },
                                ]" :filter-method="filterTag" filter-placement="bottom-end">
                        <template #default="scope">

                            <el-tag v-if="scope.row.permission =='0'" :type="success" disable-transitions>社员
                            </el-tag>
                            <el-tag v-if="scope.row.permission =='1'"
                                :type="scope.row.permission === '0' ? 'success' : 'danger'" disable-transitions>管理员
                            </el-tag>
                            <el-tag v-if="scope.row.permission =='2'"
                                :type="scope.row.permission === '0' ? 'success' : 'danger'" disable-transitions>社长
                            </el-tag>

                        </template>
                    </el-table-column>
                </el-table>

                <el-row justify="center">
                    <div class="pagination">
                        <div class="pagination_style">&emsp;</div>
                        <el-pagination :current-page="page" :page-size="limit" background layout="prev, pager, next"
                            :total="total" @current-change="handleCurrentChange" />
                    </div>
                </el-row>

            </el-card>
        </el-col>
    </el-row>
</template>


<script>
    import OrgNav from '@/components/OrgNav.vue'
    import OrgHeader from '@/components/OrgHeader.vue'

    export default {
        name: "OrgClubMember",
        data() {
            return {
                page: 1,
                limit: 8,
                total: 6,
                display: false,
                isPass: true,
                dialogFormVisible: false,
                dialogFormVisible1: false,
                buildList: [{}],
                clubInfo: {
                    userId: "",
                    userName: "",
                    state: "",
                    permission: "",
                },

            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val
            },
            getCurrentRow(value) {
                if (value != null) {
                    console.log(value);
                    this.clubInfo.userId = value.userId;
                    this.clubInfo.userName = value.userName;
                    this.clubInfo.state = value.state;
                    this.clubInfo.permission = value.permission;
                    console.log("hhhhhh");
                    console.log(this.build);
                }
            },
            filterTag(value, row) {
                return row.permission===value;
            },

        },
        created() {
            this.$axios({
                method: 'get',
                url: '/api/club-manage/club-staff/1',
            })
                .then(res => {
                    console.log(res.data.data);
                    this.buildList = res.data.data;
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
</style>