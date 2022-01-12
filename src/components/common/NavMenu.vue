<template>
    <!-- router 属性：是否使用 vue-router 模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
    <el-menu
      :default-active="currentPath"
      router
      mode="horizontal"
      background-color="white"
      text-color="#222"
      active-text-color="red"
      style="min-width: 1300px">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
      <!-- <a href="#nowhere" style="color: #222;float: right;padding: 20px;">更多功能</a> -->
      <!-- <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></i> -->
      <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">White Jotter - Your Mind Palace</span>
      <el-input
        v-model="keywords"
        placeholder="快速搜索..."
        prefix-icon="el-icon-search"
        size="medium"
        style="width: 300px;position:absolute;margin-top: 12px;right: 18%"
      />
    </el-menu>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        // name 属性的值将会用于路由跳转
        {name: '/index', navItem: '首页'},
        {name: '/jotter', navItem: '笔记本'},
        {name: '/library', navItem: '图书馆'},
        {name: '/admin/dashboard', navItem: '管理中心'}
      ],
      keywords: ''
    }
  },
  computed: {
    currentPath () {
      var x = this.$route.path.indexOf('/', 1)
      if (x !== -1) {
        // e.g. /jotter/article will change to /jotter
        return this.$route.path.substring(0, x)
      } else {
        return this.$route.path
      }
    }
  }
}
</script>

<style scoped>

a {
  text-decoration: none;
}

span {
  pointer-events: none;
}

</style>
