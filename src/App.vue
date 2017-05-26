<template>
  <div id="app">
  <div class="header">
      <span class="header-title">{{appName}}</span>
  </div>
  <clock></clock>
   </div>
</template>

<script>
import clock from './components/clock.vue'

export default {
  name: 'app',
  data () {
    return {
      appName: '番茄闹钟'
    }
  },
  components: {
        clock
    }
}
</script>

<style>
::-webkit-scrollbar-track-piece {
    background: #f5f5f5;
    border-left: 1px solid #d2d2d2;
}

::-webkit-scrollbar {
    width: 8px;
    height: 13px;
}

::-webkit-scrollbar-thumb {
    background: #c2c2c2;
    background-clip: padding-box;
    border: 1px solid #bfb8b8;
    min-height: 28px;
}

::-webkit-scrollbar-thumb:hover {
    border: 1px solid #636363;
    background: #929292;
}
.clearfix:after {
    content: "";
    display: block;
    clear: both;
}

body {
    font-family: "楷体", "Microsoft Yahei", "微软雅黑", Arial, sans-serif!important;
    font-size: 16px;
    /*background: linear-gradient(to bottom, rgba(100, 100, 100, 0.2) 0%, rgba(255, 255, 255, 0.5) 40%, #ffffff 100%);*/
}
.header {
    padding: 15px 0 10px 15px;
    color: #f11313;
    font-size: 35px;
    text-align: center;
}
</style>
