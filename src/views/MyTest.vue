<template>
  <div>
    <img src="../assets/bg3.svg" alt="bg">
    <img style="margin-top:-5px;" src="../assets/bg4.svg" alt="bg">
  </div>
</template>

<script>

export default {
  name: "MyTest",
  created() {
    this.$axios({
      method: 'post',
      url: 'http://1.15.156.161:8099/examine/pubnot',
      data:{
        adminId: 1,
        pubnotTitle: "中回只两者算",
        pubnotContent: "in dolore consectetur eu sunt"
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch(function (error) {
      console.log(error);
    })
  },
}

</script>
