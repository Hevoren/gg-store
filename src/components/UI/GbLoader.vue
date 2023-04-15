<template>
  <div class="loader-container">
    <div class="loader"><h1>GABELLA</h1></div>
  </div>
</template>

<script>
export default {
  name: "GbLoader"
}

</script>

<style scoped>
* {
  font-size: 54px;
  color: white;
}

.loader-container{
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: black;
}

.loader{
  margin-top: 100px;
  opacity: 0;
  animation: ani 1.5s forwards;
}
@keyframes ani {
  0% {opacity: 0;}
  100% {opacity: 1;}
}
</style>