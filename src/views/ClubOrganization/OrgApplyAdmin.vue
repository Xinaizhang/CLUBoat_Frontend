<template>
    <OrgHeader />

    <el-row style="background:#EEEEEE">
        <OrgNav />

        <el-col :span="20" class="main">
            <el-card class="box-card-1">
                <template #header>
                    <router-link to="/org_clubmember" style="position:absolute;text-decoration:none;color:#023764;">
                        <el-icon><ArrowLeftBold /></el-icon>
                    </router-link>
                    <div class="card-header">管理员申请</div>
                </template>
            </el-card>
            
        </el-col>

    </el-row>
</template>

<script>
import OrgNav from '@/components/OrgNav.vue'
import OrgHeader from '@/components/OrgHeader.vue'

export default {
    name: "OrgApplyAdmin",
    data() {
        return {

        }
    },
    methods: {
    },
    created() {

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
    justify-content:center;
    align-items: center;
}

.box-card-1 {
    margin: 10px;
    min-height: 600px;
}
</style>