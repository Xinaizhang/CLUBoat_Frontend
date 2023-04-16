<template>
  <router-view></router-view>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'App',

  // created() {
  //   // 先检查sessionStorage中是否有数据，若存在数据则加载到vuex
  //   if (sessionStorage.getItem("store")) {
  //     this.$store.replaceState(
  //       Object.assign(
  //         this.$store.state,
  //         JSON.parse(sessionStorage.getItem("store"))
  //       )
  //     );
  //     sessionStorage.removeItem("store");
  //   }

  //   //在页面刷新时将vuex里的信息保存到sessionStorage里
  //   window.addEventListener("beforeunload", () => {
  //     sessionStorage.setItem("store", JSON.stringify(this.$store.state));
  //   });
  // }
}
</script>

<style>
*{
  padding: 0px;
  margin: 0px;
}
body {
  overflow-x:hidden;
}
ul{
  list-style: none;
}
a{
  text-decoration: none;
}
</style>