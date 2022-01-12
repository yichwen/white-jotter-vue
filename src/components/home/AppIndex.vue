<template>
  <div style="margin-top: 40px">
    <side-menu id="side-menu" />
    <div class="home">
      <div id="header-div">
        <div style="height: 150px;"></div>
        <carousel />
        <quick-nav style="float:right;margin-top:-450px;margin-right:480px"/>
      </div>
      <update-card id="update-card" />
      <slogan />
      <about id="about" />
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/home/SideMenu'
import QuickNav from '@/components/home/QuickNav'
import Carousel from '@/components/home/Carousel'
import UpdateCard from '@/components/home/UpdateCard'
import About from '@/components/common/About'
import Slogan from '@/components/home/Slogan'

export default {
  name: 'AppIndex',
  components: {
    SideMenu,
    QuickNav,
    Carousel,
    UpdateCard,
    About,
    Slogan
  }
}
</script>

<style scoped>
#side-menu {
  position: fixed;
  margin-left: 50%;
  left: -680px;
  top: 100px;
}

.home {
  width: 990px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -20px;
}

#header-div {
  padding-bottom: 20px;
  padding-left: 5px;
  background-color: white;
}
</style>
