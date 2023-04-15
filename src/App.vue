<template>
  <div class="all">
    <gg-topbar />
    <router-view />
  </div>
</template>

<script>
import GgTopbar from "@/components/TopBar";
export default {
  name: "GgApp",
  components: {
    GgTopbar,
  },
};
</script>

<style>
.all {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding-top: 30px;
}
</style>
