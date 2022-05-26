<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  
};
</script>

<style>
body{
  margin:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
}
.answer table {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
.answer table td,
.answer table th {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 3px 5px;
}
.answer table th {
  border-bottom: 2px solid #ccc;
  text-align: center;
  background-color: #f1f1f1;
}
img{
  max-width: 100%;
  max-height:100%;
}
</style>
