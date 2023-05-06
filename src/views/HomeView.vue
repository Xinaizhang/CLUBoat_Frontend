<template>
  <Nav/>
  <div>
    <div class="head_bg">
      <el-row justify="center" class="title">CLUBoat</el-row>
      <el-row justify="center" class="content">这里有最新鲜的社团资讯，最丰富的校园活动实况，最温暖友善的社团论坛，最温情的校园点滴，就是我，将承包你大学生活的所有幻想!</el-row>
    </div>
    <div class="cards body_bg">
      <el-row justify="center">
        <el-col :span="10" style="text-align:center;">
          <div class="card">
          <div class="card_hd">
              <el-icon class="card_hd_icon"><Orange /></el-icon>
              <div class="card_hd_word">
                <div style="font-size:24px;color: #023764;font-weight: bolder;margin-bottom: 5px;">社团风采</div>
                <div style="font-size:16px;color: #023764;">你我的社团，你我的文化</div>
              </div>
          </div>
          <div style="width: 600px;">
            <MySwiper/>
          </div>
          </div>
        </el-col>
        <el-col :span="10" style="text-align:center;">
          <div class="card">
            <div class="card_hd">
                <el-icon class="card_hd_icon"><MessageBox /></el-icon>
                <div class="card_hd_word">
                  <div style="font-size:24px;color: #023764;font-weight: bolder;margin-bottom: 5px;">社联公告</div>
                  <div style="font-size:16px;color: #023764;">特色社团展风采，百花齐放竞风流 </div>
                </div>
            </div>
            <div class="card_bd">
              <ul class="card_bd_list">
                <li
                  class="item"
                  v-for="item of pubnotList.slice((page1-1) * limit1, page1 * limit1)" :key="item.pubnotId" @click="item.drawer = true"
                >
                  <img class="item-img" :src="imgUrl" />
                  <div class="item-info">
                    <p class="item-title">{{ item.pubnotTitle }}</p>
                    <p class="item-date">{{ item.pubnotTime }}</p>
                  </div>
                  <el-drawer
                    :append-to-body="true"
                    size="31%"
                    :lock-scroll="true"
                    :close-on-click-modal="true"
                    v-model="item.drawer" 
                    :title="item.pubnotTitle" 
                    :with-header="true"
                  >
                  <div class="drawer">
                    <span>{{ item.pubnotTime }}</span>
                    <img :src="imgUrl" />
                    <p v-html="item.pubnotContent"></p>
                  </div>

                  </el-drawer>
                </li>

              </ul>
              <div class="pagination" style="position: relative;bottom: 0px;">
                <div>
                  <el-pagination
                  :current-page="page1"
                  :page-size="limit1"
                  layout="prev, pager, next"
                  :total="total1"
                  @current-change="handleCurrentChange1"
                  style="--el-pagination-button-height: 20px;"
                />
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-row justify="center">
          <el-col :span="24">
            <div class="card2">
              <div class="card2_hd">
                <div class="card_hd">
                  <el-icon class="card_hd_icon"><List /></el-icon>
                  <div class="card_hd_word">
                    <div style="font-size:24px;color: #023764;font-weight: bolder;margin-bottom: 5px;">社团列表</div>
                    <div style="font-size:16px;color: #023764;">与其在别处迷茫，不如在这里徜徉 </div>
                  </div>
                  <div class="search">
                    <el-input
                    class="clubSearch"
                      v-model="search"
                      placeholder="请输入关键词"
                      suffix-icon="Search"
                      style="width:15vw"
                      @input ="changeTotal(searchResult)"
                    />
                  </div>
                </div>
              </div>
              <div class="club">
                <ul class="club_list">
                  <li class="item" v-for="item of searchResult.slice((page-1) * limit, page * limit)" :key="item.clubId">
                    <div class="club-img">
                      <a href="#">
                        <img class="item-img" :src="item.clubImageUrl" />
                      </a>
                    </div>
                    <p class="item-name">{{ item.clubName }}</p>
                    <div class="review">
                      <p class="item-desc">{{ item.clubInformation }}</p>
                      <a href="#" @click="clubDetail(item)">
                        <span>查看详情</span>
                      </a>
                    </div>
                  </li>
                </ul>
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
              </div>
            </div>
          </el-col>
        </el-row>
      </el-row>
    </div>
    <div class="tail_bg">
      <img src="../assets/bg3.svg" alt="bg">
      <img style="margin-top:-5px;" src="../assets/bg4.svg" alt="bg">
    </div>
  </div>
</template>

<script>
import MySwiper from '@/components/MySwiper.vue'
import Nav from '@/components/Nav.vue'

export default {
  name: "HomeView",
  components: {
    MySwiper,
    Nav,
  },
  data () {
    return {
      search:"",
      imgUrl: 'https://bpic.588ku.com/back_origin_min_pic/19/04/16/1d2712697441514d1900d3837eefc67a.jpg',
      pubnotList: [{
      //   pubnot_id: '0001',
      //   drawer:false,
      //   imgUrl: 'https://bpic.588ku.com/back_origin_min_pic/19/04/16/1d2712697441514d1900d3837eefc67a.jpg',
      //   pubnot_title: '关于新社团成立申请书的若干要求',
      //   pubnot_content: '<p>整体流程：首先将申请书电子版发到社团品牌发展部的公共邮箱tjaustppfz @163.com，我们会针对电子版中存在的问题和负责人联系，直至电子版审核通过后，我们会统一制作申请书的纸质版，并交由社团负责人联系社团的指导老师签字以及证件签注，随后交回社团品牌发展部，答辩通过之后，我们会将材料上交团委和党委，最终结果将由社团品牌发展部通知社团负责人。</p><p>社团发起人至少为20名以上本校在读学生联合发起，其中需要设有正、副社长、一位团支书和一位财务负责人，学生社团主要负责人专业综合排名应在前50%，思想政治类、志愿公益类社团主要负责人应为中共党员。社团主要负责人原则上至少履职一年。其余的部门负责人等人员安排由社团自己视实际情况而定。</p><p>社团要有至少1名指导老师，社团要有规范的名称、社团章程，如有特殊情况请于邮件里说明。</p><p>本要求解释权归共青团同济大学委员会社团发展管理中心所有。如有疑义请联系社团品牌发展部联系人微信：lvlv_smallgreen</p>',
      //   pubnot_time: '2020.02.22'
      // }, {
      //   pubnot_id: '0002',
      //   drawer:false,
      //   imgUrl: 'https://appwk.baidu.com/naapi/doc/view?ih=810&o=jpg_6&iw=1440&ix=0&iy=0&aimw=1440&rn=1&doc_id=7a8a79552379168884868762caaedd3383c4b5ce&pn=1&sign=c7174a63eabf4b668f92d48974a5cc90&type=1&app_ver=2.9.8.2&ua=bd_800_800_IncredibleS_2.9.8.2_2.3.7&bid=1&app_ua=IncredibleS&uid=&cuid=&fr=3&Bdi_bear=WIFI&from=3_10000&bduss=&pid=1&screen=800_800&sys_ver=2.3.7',
      //   pubnot_title: '秋招 | 咨询会，pick部门时那杯醍醐灌顶的mojito',
      //   pubnot_content: '<p>整体流程：首先将申请书电子版发到社团品牌发展部的公共邮箱tjaustppfz @163.com，我们会针对电子版中存在的问题和负责人联系，直至电子版审核通过后，我们会统一制作申请书的纸质版，并交由社团负责人联系社团的指导老师签字以及证件签注，随后交回社团品牌发展部，答辩通过之后，我们会将材料上交团委和党委，最终结果将由社团品牌发展部通知社团负责人。</p><p>社团发起人至少为20名以上本校在读学生联合发起，其中需要设有正、副社长、一位团支书和一位财务负责人，学生社团主要负责人专业综合排名应在前50%，思想政治类、志愿公益类社团主要负责人应为中共党员。社团主要负责人原则上至少履职一年。其余的部门负责人等人员安排由社团自己视实际情况而定。</p><p>社团要有至少1名指导老师，社团要有规范的名称、社团章程，如有特殊情况请于邮件里说明。</p><p>本要求解释权归共青团同济大学委员会社团发展管理中心所有。如有疑义请联系社团品牌发展部联系人微信：lvlv_smallgreen</p>',
      //   pubnot_time: '2021.06.30'
      // }, {
      //   pubnot_id: '0003',
      //   drawer:false,
      //   imgUrl: 'https://bpic.588ku.com/element_origin_min_pic/19/05/29/f42f6f009b55aba3e3927d7b40f1358d.jpg',
      //   pubnot_title: '任职证明办理流程-社彩同济',
      //   pubnot_content: '<p>整体流程：首先将申请书电子版发到社团品牌发展部的公共邮箱tjaustppfz @163.com，我们会针对电子版中存在的问题和负责人联系，直至电子版审核通过后，我们会统一制作申请书的纸质版，并交由社团负责人联系社团的指导老师签字以及证件签注，随后交回社团品牌发展部，答辩通过之后，我们会将材料上交团委和党委，最终结果将由社团品牌发展部通知社团负责人。</p><p>社团发起人至少为20名以上本校在读学生联合发起，其中需要设有正、副社长、一位团支书和一位财务负责人，学生社团主要负责人专业综合排名应在前50%，思想政治类、志愿公益类社团主要负责人应为中共党员。社团主要负责人原则上至少履职一年。其余的部门负责人等人员安排由社团自己视实际情况而定。</p><p>社团要有至少1名指导老师，社团要有规范的名称、社团章程，如有特殊情况请于邮件里说明。</p><p>本要求解释权归共青团同济大学委员会社团发展管理中心所有。如有疑义请联系社团品牌发展部联系人微信：lvlv_smallgreen</p>',
      //   pubnot_time: '2022.03.22'
      // }, {
      //   pubnot_id: '0004',
      //   drawer:false,
      //   imgUrl: 'https://appwk.baidu.com/naapi/doc/view?ih=810&o=jpg_6&iw=1440&ix=0&iy=0&aimw=1440&rn=1&doc_id=7a8a79552379168884868762caaedd3383c4b5ce&pn=1&sign=c7174a63eabf4b668f92d48974a5cc90&type=1&app_ver=2.9.8.2&ua=bd_800_800_IncredibleS_2.9.8.2_2.3.7&bid=1&app_ua=IncredibleS&uid=&cuid=&fr=3&Bdi_bear=WIFI&from=3_10000&bduss=&pid=1&screen=800_800&sys_ver=2.3.7',
      //   pubnot_title: '秋招 | 咨询会，pick部门时那杯醍醐灌顶的mojito',
      //   pubnot_content: '<p>整体流程：首先将申请书电子版发到社团品牌发展部的公共邮箱tjaustppfz @163.com，我们会针对电子版中存在的问题和负责人联系，直至电子版审核通过后，我们会统一制作申请书的纸质版，并交由社团负责人联系社团的指导老师签字以及证件签注，随后交回社团品牌发展部，答辩通过之后，我们会将材料上交团委和党委，最终结果将由社团品牌发展部通知社团负责人。</p><p>社团发起人至少为20名以上本校在读学生联合发起，其中需要设有正、副社长、一位团支书和一位财务负责人，学生社团主要负责人专业综合排名应在前50%，思想政治类、志愿公益类社团主要负责人应为中共党员。社团主要负责人原则上至少履职一年。其余的部门负责人等人员安排由社团自己视实际情况而定。</p><p>社团要有至少1名指导老师，社团要有规范的名称、社团章程，如有特殊情况请于邮件里说明。</p><p>本要求解释权归共青团同济大学委员会社团发展管理中心所有。如有疑义请联系社团品牌发展部联系人微信：lvlv_smallgreen</p>',
      //   pubnot_time: '2021.06.30'
      // }, {
      //   pubnot_id: '0005',
      //   drawer:false,
      //   imgUrl: 'https://bpic.588ku.com/element_origin_min_pic/19/05/29/f42f6f009b55aba3e3927d7b40f1358d.jpg',
      //   pubnot_title: '任职证明办理流程-社彩同济',
      //   pubnot_content: '<p>整体流程：首先将申请书电子版发到社团品牌发展部的公共邮箱tjaustppfz @163.com，我们会针对电子版中存在的问题和负责人联系，直至电子版审核通过后，我们会统一制作申请书的纸质版，并交由社团负责人联系社团的指导老师签字以及证件签注，随后交回社团品牌发展部，答辩通过之后，我们会将材料上交团委和党委，最终结果将由社团品牌发展部通知社团负责人。</p><p>社团发起人至少为20名以上本校在读学生联合发起，其中需要设有正、副社长、一位团支书和一位财务负责人，学生社团主要负责人专业综合排名应在前50%，思想政治类、志愿公益类社团主要负责人应为中共党员。社团主要负责人原则上至少履职一年。其余的部门负责人等人员安排由社团自己视实际情况而定。</p><p>社团要有至少1名指导老师，社团要有规范的名称、社团章程，如有特殊情况请于邮件里说明。</p><p>本要求解释权归共青团同济大学委员会社团发展管理中心所有。如有疑义请联系社团品牌发展部联系人微信：lvlv_smallgreen</p>',
      //   pubnot_time: '2022.03.22'
      }],
      page: 1,
      limit: 5,
      total: 13,
      page1: 1,
      limit1: 3,
      total1: 5,
      clubList: [{
      //   club_id: '0001',
      //   club_imageURL: 'https://img.zcool.cn/community/0198ce5b0bab2ea8012181b0957742.jpg@1280w_1l_2o_100sh.jpg',
      //   club_name: '书法社',
      //   club_information: '这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介。'
      // }, {
      //   club_id: '0002',
      //   club_imageURL: 'https://marketplace.canva.cn/EADcCD0iE9s/3/0/1600w/canva-%E8%93%9D%E7%BB%BF%E8%89%B2%E5%8F%8C%E6%89%8B%E5%85%83%E7%B4%A0%E6%89%8B%E8%AF%AD%E7%A4%BE%E5%9B%A2logo-DuHpdkXClWo.jpg',
      //   club_name: '手语社',
      //   club_information: '这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介。'
      // }, {
      //   club_id: '0003',
      //   club_imageURL: 'https://img-qn.51miz.com/preview/muban/00/00/65/89/M-658928-25F93217.jpg',
      //   club_name: '轮滑社',
      //   club_information: '这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介。'
      // }, {
      //   club_id: '0004',
      //   club_imageURL: 'https://marketplace.canva.cn/EADcCeGh3QU/3/0/1600w/canva-%E8%93%9D%E8%89%B2%E8%AF%9D%E7%AD%92%E5%8D%8E%E8%AF%AD%E8%BE%A9%E8%AE%BA%E7%A4%BE%E5%9B%A2logo-AD5FR4ZZRi4.jpg',
      //   club_name: '辩论社',
      //   club_information: '这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介。'
      // }, {
      //   club_id: '0005',
      //   club_imageURL: 'https://marketplace.canva.cn/EADcCS7KakY/2/0/1600w/canva-%E7%BA%A2%E8%89%B2%E7%88%B1%E5%BF%83%E7%AE%80%E5%8D%95%E8%8A%AD%E8%95%BE%E8%88%9E%E7%A4%BE%E7%A4%BE%E5%9B%A2logo-8KbZ6Ll759k.jpg',
      //   club_name: '芭蕾舞社',
      //   club_information: '这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介。'
      // }, {
      //   club_id: '0006',
      //   club_imageURL: 'https://img.51miz.com/Element/00/86/75/68/46d2b344_E867568_bd12aa0f.png',
      //   club_name: '篮球社',
      //   club_information: '这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介。'
      // }, {
      //   club_id: '0007',
      //   club_imageURL: 'https://img.51miz.com/Element/00/90/86/79/5749ec64_E908679_72dacc39.png',
      //   club_name: '羽毛球社',
      //   club_information: '这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介。'
      // }, {
      //   club_id: '0008',
      //   club_imageURL: 'https://bpic.588ku.com/element_pic/20/06/30/56b221540e02272739385038812ad7bd.jpg',
      //   club_name: '爵士舞社',
      //   club_information: '这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介。'
      // }, {
      //   club_id: '0009',
      //   club_imageURL: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpro.upload.logomaker.com.cn%2F2019%2F11%2F26%2FhuqLO21GQB0Z.jpg&refer=http%3A%2F%2Fpro.upload.logomaker.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671986611&t=523be83dfda426a932db3bfc99ec2ac9',
      //   club_name: '宠物社',
      //   club_information: '这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介。'
      // }, {
      //   club_id: '0010',
      //   club_imageURL: 'https://bpic.588ku.com/element_pic/20/06/30/62fd3cae1dd2f131f6b0f6e4eb8408b1.jpg',
      //   club_name: '钢琴社',
      //   club_information: '这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介。'
      // }, {
      //   club_id: '0011',
      //   club_imageURL: 'https://bpic.588ku.com/element_pic/20/06/30/62fd3cae1dd2f131f6b0f6e4eb8408b1.jpg',
      //   club_name: '钢琴社',
      //   club_information: '这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介。'
      // }, {
      //   club_id: '0012',
      //   club_imageURL: 'https://bpic.588ku.com/element_pic/20/06/30/56b221540e02272739385038812ad7bd.jpg',
      //   club_name: '爵士舞社',
      //   club_information: '这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介，这是社团简介。'
      }],
    }
  },
  computed:{
    searchResult(){
        if(this.search){
          console.log("键入关键词");
          return this.clubList.filter((value)=>{
              return value.clubName.includes(this.search);
          });
        }else{
            return this.clubList;
        }
    },
  },
  methods: {
    changeTotal(val){
      this.total=val.length
      console.log("现在的total值："+this.total)
    },
    handleCurrentChange(val){
      this.page=val
    },
    handleCurrentChange1(val){
      this.page1=val
    },
    clubDetail(club){
      localStorage.setItem("clubId",club.clubId);
      localStorage.setItem("clubName",club.clubName);
      this.$router.push('/details')
    }
  },
  created() {
    console.log(localStorage.getItem('userId'));
    console.log(this.$store.state.userId);

    this.$axios({
      method: 'get',
      url: '/api/examine/pubnot',
    })
    .then(res => {
      console.log(res.data.data);
      this.pubnotList=res.data.data;
      this.pubnotList.sort(function(a, b) {
          return b.pubnotTime < a.pubnotTime ? -1 : 1
      })
      this.total1=res.data.data.length;
    })
    .catch(function (error) {
      console.log(error);
    })

    this.$axios({
      method: 'get',
      url: '/api/examine/club',
    })
    .then(res => {
      console.log(res.data.data);
      this.clubList=res.data.data;
      this.total=res.data.data.length;
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  .head_bg{
    background-image: url("../assets/bg.svg");
    height: 40vh;
    text-align: center;
    background-size:cover;
    padding: 1vh;
    background-position:center center;
  }
  .head_bg .title{
    color: #fff;
    font-size: 40px;
    font-weight: bolder;
    padding-top: 10vh;
  }
  .head_bg .content{
    color: #fff;
    margin: 0 auto;
    width: 30vw;
    padding-top: 5vh;
    padding-bottom: 5vh;
  }
  .body_bg{
    background-color: #023764;
    background-image: url("../assets/bg2.svg");
    height: 300px;
    background-size:cover;
    background-position:center center;
    margin-top: -1px;
  }
  .tail_bg img{
    width: 100%;
    position: relative;
    bottom: -820px;
  }

  .cards{
    position: relative;
  }
  .card{
    display: inline-block;
    background-color: #fff;
    border:8px solid #FFC353;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #023764;
    width: 600px;
    height: 508px;
    border-radius:20px 20px 0px 0px;
    margin: 20px 0px;
  }
  .card_hd{
    margin-left: 190px;
    text-align: left;
    height: 100px;
  }
  .card_hd_icon{
    position: relative;
    top: 20px;
    left: -20px;
    color: #023764; 
    font-size: 60px;
  }
  .card_hd_word{
    position: relative;
    top: -44px;
    left: 60px;
  }
  
  .card_bd{
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
  }
  .card_bd_list{
    list-style: none;
    padding: 0px;
    margin: 0px;
    height: 388px;
  }
  .card_bd_list .item{
    border:1px solid #ccc;
    text-align: left;
    position: relative;
    height: 126px;
    width: 600px;
  }
  .card_bd_list .item:hover {
    transform: translate3d(0, -2px, 0);
    cursor: pointer;
  }
  .card_bd_list .item .item-img{
    width: 220px;
    height: 126px;
  }
  .card_bd_list .item .item-info{
    height: 126px;
    display: inline-block;
  }
  .card_bd_list .item .item-title{
    width: 340px;
    position: absolute;
    top: 25%;
    left: 40%;
  }
  /* .card_bd_list .item .item-author{
    color: #023764; 
    display: inline;
    margin-right: 220px;
  } */
  .card_bd_list .item .item-date{
    color: #023764;
    position: absolute;
    top: 70%;
    left: 40%;
  }

  .drawer{
    text-align: left;
  }

  .drawer span{
    color: #023764;
    opacity: 0.6;
    display: block;
    font-size: 14px;
    margin-top: -20px;
    margin-bottom: 20px;
  }
  .drawer img{
    width:420px;
  }

  .drawer p{
    width: 420px;
    height: auto;
    display: block;
    padding-bottom: 10px;
  }

  .card2{
    margin-top: 20px;
    display: inline-block;
    background-color: #FFC353;
    border:8px solid #FFC353;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #023764;
    width: 81vw;
    height: auto;
    border-radius:20px;
  }
  .card2 .card_hd{
    margin-left: 60px;
    
  }
  .card2 .card2_hd{
    background-color: #FFC353;
    border-bottom:2px solid #023764;
    margin-bottom: 8px;
  }
  .card2 .search{
    width: 20vw;
    position: relative;
    top: -80px;
    left: 60vw;
  }
  .card2 .text{
        height: 22px;
        line-height: 22px;
        font-size: 14px;
        border: 1px solid #ccc;
        padding: 3px 16px;
        border-bottom-left-radius: 20px;
        border-top-left-radius: 20px;
  }
  .card2 .text:focus{
      outline: none;
      border-color: #023764;
      box-shadow: inset 0 0px 0px rgba(0, 0, 0, 0.075), 0 0 8px #023764;
  }
  .card2 .button{
      color: #fff;
      width: 60px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      border: none;
      background-color: #023764;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
  }
  .club{
    text-align: center;
  }
  .clubSearch{
    font-size: 14px;
    margin-right: 40px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 3px #023764;
    border-radius: 4px;
  }
  .club_list{
    list-style: none;
    padding: 0px;
    margin: 0px;
    margin-top: 50px;
    height: 288px;
  }
  .clearfix::after {
    clear: both;
  }
  .club li {
    border-radius: 20px;
    float: left;
    width: 234px;
    height: 220px;
    padding: 20px 0 20px;
    z-index: 1;
    margin-left: 14px;
    margin-bottom: 14px;
    background: #fff;
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
    position: relative;
    font-size: 20px;
    font-weight: bold;
    color: #023764;
  }
  .club-img {
    width: 150px;
    height: 150px;
    margin: 0 auto 18px;
  }
  .club-img img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .card2 .item-desc {
    height: 18px;
    font-size: 18px;
  }

  .review {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 234px;
    height: 260px;
    border-radius:20px;
    overflow: hidden;
    font-size: 12px;
    background: #023764;
    opacity: 0;
    transition: all .2s linear;
  }
  .review .item-desc{
    background: #fff;
    color: #023764;
    height: 170px;
    padding: 20px;
    font-size: 16px;
    font-weight: normal;
    overflow:hidden;
  }
  .review a {
    color: #757575;
    display: block;
    padding: 10px 30px;
  }
  .review a span {
    font-weight: normal;
    font-size: 18px;
    color: #fff;
    height: 80px;
  }
  .club li:hover {
    -webkit-box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    box-shadow: 0 15px 30px #024886;
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
  }
  .club li:hover .review {
    opacity: 1;
    height: 260px;
    border-radius:20px;
  }

  .pagination{
    --el-color-primary: #024886;
    margin-bottom: 20px;
    display: inline-block;
  }
  .el-pagination {
    --el-pagination-font-size: 16px;
    --el-pagination-button-color: #024886;
    --el-pagination-button-disabled-bg-color:#fff;
    --el-pagination-button-bg-color:#fff;
    --el-pagination-hover-color: #167fdb;
  }
  .pagination li {
    float: none;
    width: 30px;
    background: #fff;
    position: unset;
  }

</style>