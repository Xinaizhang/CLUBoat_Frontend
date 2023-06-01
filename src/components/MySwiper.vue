<template>
<swiper class="swiper-container"
      :pagination="{ clickable: true }"
      :autoplay="{ autoplay: true }"
      loop
>
      <swiper-slide class="swiper-slide" v-for="(item, i) in imgs" :key="i">
        <img :src="item" alt=""/>
      </swiper-slide>
</swiper>
<div class="swiper-pagination"></div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import style (>= Swiper 6.x)
import "swiper/swiper-bundle.css";
// Import Swiper core and required modules
import SwiperCore, {
  Pagination,
  Autoplay,
} from "swiper";
SwiperCore.use([Pagination, Autoplay]);


export default {
    name: "swiperCom",
    data: function () {
      return {
        imgs: [
            require("../assets/1.png"),
            require("../assets/2.png"),
        ],
      };
    },
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
    return {
        onSwiper,
        onSlideChange,
        modules: [Pagination],
    };
    },
  };

</script>
<style>
  .swiper-container {
    width: 40vw;
    height: 57vh;
    --swiper-pagination-color: #023764;
  }
  .swiper-slide img{
    width: 100%;
    height: 100%;
  }
  .swiper-pagination{
    height: 3vh;
    margin-bottom: -2vh;
    background-color: #fff;
  }
</style>