<template>
  <el-container>
    <el-header>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="$router.push('/')">
          Geodata
        </el-menu-item>
        <el-menu-item index="2" @click="$router.push('/config')">
          Config
        </el-menu-item>
      </el-menu>
    </el-header>
    
    <el-main>
      <router-view/>
    </el-main>

  </el-container>
</template>

<style lang="scss">
  html, body {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
</style>
