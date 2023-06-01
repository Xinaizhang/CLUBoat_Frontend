import { createRouter, createWebHistory } from 'vue-router'

//登录
import LoginPage from '../views/Login/LoginPage.vue'

//主页
import HomeView from '../views/HomeView.vue'

// 个人中心
import PersonInfo from '../views/Person/PersonInfo.vue'
import MyActivity from '../views/Person/MyActivity.vue'
import Notification from '../views/Person/Notification.vue'
import MyClub from '../views/Person/MyClub.vue'

//社团详情
import ClubDetails from '../views/ClubDetails.vue'
//活动详情
import ActivityDetail from '../views/ActivityDetail.vue'


//论坛
import Forum from '../views/Forum.vue'
import ForumSquare from '../views/ForumSquare.vue'


// 社联后台
import Pubnot from '../views/ClubFederation/Pubnot.vue'
import CFNotification from '../views/ClubFederation/Notification.vue'
import CFActivity from '../views/ClubFederation/Activity.vue'
import CFBudget from '../views/ClubFederation/Budget.vue'
import CFReim from '../views/ClubFederation/Reim.vue'
import CFClubBuild from '../views/ClubFederation/ClubBuild.vue'
import CFClubCancel from '../views/ClubFederation/ClubCancel.vue'
import CFClubAdmin from '../views/ClubFederation/ClubAdmin.vue'


// 社团后台
import OrgClubInfo from '../views/ClubOrganization/OrgClubInfo.vue'
import OrgClubMember from '../views/ClubOrganization/OrgClubMember.vue'
import OrgClubNotification from '../views/ClubOrganization/OrgClubNotification.vue'
import OrgClubActivity from '../views/ClubOrganization/OrgClubActivity.vue'
import OrgClubNews from '../views/ClubOrganization/OrgClubNews.vue'
import OrgClubBudget from '../views/ClubOrganization/OrgClubBudget.vue'
import OrgClubReim from '../views/ClubOrganization/OrgClubReim.vue'
import OrgApplyJoin from '../views/ClubOrganization/OrgApplyJoin.vue'
import OrgApplyAdmin from '../views/ClubOrganization/OrgApplyAdmin.vue'


import Collection from '../views/Collection.vue'
import MyTest from '../views/MyTest.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/test',
    name: 'test',
    component: MyTest
  },
  {
    path: '/personInfo',
    name: 'personInfo',
    component: PersonInfo
  },
  {
    path: '/myActivity',
    name: 'MyActivity',
    component: MyActivity
  },
  {
    path: '/notification',
    name: 'Notification',
    component: Notification
  },
  {
    path: '/myClub',
    name: 'MyClub',
    component: MyClub
  },
  {
    path: '/collection',
    name: 'Collection',
    component: Collection
  },


  {
    path: '/clubFederation/pubnot',
    name: 'pubnot',
    component: Pubnot
  },
  {
    path: '/clubFederation/notification',
    name: 'CFNotification',
    component: CFNotification
  },
  {
    path: '/clubFederation/activity',
    name: 'CFActivity',
    component: CFActivity
  },
  {
    path: '/clubFederation/budget',
    name: 'CFBudget',
    component: CFBudget
  },
  {
    path: '/clubFederation/reim',
    name: 'CFReim',
    component: CFReim
  },
  {
    path: '/clubFederation/clubBuild',
    name: 'CFClubBuild',
    component: CFClubBuild
  },
  {
    path: '/clubFederation/clubCancel',
    name: 'CFClubCancel',
    component: CFClubCancel
  },
  {
    path: '/clubFederation/clubAdmin',
    name: 'CFClubAdmin',
    component: CFClubAdmin
  },
  {
    path: '/forum',
    name: 'Forum',
    component: Forum
  },
  {
    path: '/forumSquare',
    name: 'ForumSquare',
    component: ForumSquare
  },
  {
    path:"/details",
    name:'details',
    component: ClubDetails
  },
  {
    path:'/org_clubinfo',
    name:'org_clubinfo',
    component: OrgClubInfo
  },
  {
    path:'/org_clubmember',
    name:'org_clubmember',
    component: OrgClubMember
  },
  {
    path:'/org_clubnotification',
    name:'org_clubnotification',
    component: OrgClubNotification
  },
  {
    path:'/org_clubactivity',
    name:'org_clubactivity',
    component: OrgClubActivity
  },
  {
    path:'/org_clubnews',
    name:'org_clubnews',
    component: OrgClubNews
  },
  {
    path:'/org_clubbudget',
    name:'org_clubbudget',
    component: OrgClubBudget
  },
  {
    path:'/org_clubreim',
    name:'org_clubreim',
    component: OrgClubReim
  },
  {
    path:'/org_applyjoin',
    name:'org_applyjoin',
    component: OrgApplyJoin
  },
  {
    path:'/org_applyadmin',
    name:'org_applyadmin',
    component: OrgApplyAdmin
  },
  {
    path:'/activitydetail',
    name:'activitydetail',
    component: ActivityDetail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  mode:'history'
})

export default router
