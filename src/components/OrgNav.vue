<template>
    <!-- 侧栏 -->
    <el-col :span="4">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" style="height: 100%;">
            <router-link to="/org_clubinfo">
                <el-menu-item index="1">
                    <template #title>
                        <el-icon>
                            <HomeFilled />
                        </el-icon>
                        <text style="font-size:17px">社团信息</text>
                    </template>
                </el-menu-item>
            </router-link>

            <router-link to="/org_clubmember">
                <el-menu-item index="2">
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <text style="font-size:17px">人员管理</text>
                    </template>
                </el-menu-item>
            </router-link>

            <router-link to="/org_clubnotification">
                <el-menu-item index="3">
                    <template #title>
                        <el-icon>
                            <BellFilled />
                        </el-icon>
                        <text style="font-size:17px">通知管理</text>
                    </template>
                </el-menu-item>
            </router-link>

            <router-link to="/org_clubnews">
                <el-menu-item index="4">
                    <template #title>
                        <el-icon>
                            <setting />
                        </el-icon>
                        <text style="font-size:17px">资讯管理</text>
                    </template>
                </el-menu-item>
            </router-link>

            <router-link to="/org_clubactivity">
                <el-menu-item index="5">
                    <template #title>
                        <el-icon>
                            <StarFilled />
                        </el-icon>
                        <text style="font-size:17px">活动管理</text>
                    </template>
                </el-menu-item>
            </router-link>

            <router-link to="/org_clubbudget">
                <el-menu-item index="6">
                    <template #title>
                        <el-icon>
                            <TrendCharts />
                        </el-icon>
                        <text style="font-size:17px">预算管理</text>
                    </template>
                </el-menu-item>
            </router-link>

            <router-link to="/org_clubreim">
                <el-menu-item index="6">
                    <template #title>
                        <el-icon>
                            <TrendCharts />
                        </el-icon>
                        <text style="font-size:17px">报销管理</text>
                    </template>
                </el-menu-item>
            </router-link>

        </el-menu>
    </el-col>


</template>

<script>
    export default {
        name: "OrgNav",
    }
</script>


<style scoped>
    .router-link-active {
        text-decoration: none;
    }

    .sidenav {
        font-size: 20px;
    }
</style>