<template>
  <transition name="loading">
    <div class="loading-component" v-show="show">
      <div class="loading-bg"></div>
      <div class="loading-icon">loading...</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loading',
  props: ['show']
}
</script>

<style lang="less" scoped>
.loading-component {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9999;
  .loading-bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    z-index: 1;
  }
  .loading-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #ffffff;
    z-index: 2;
    transform: translate(-50%, -50%);
  }
}

.loading-enter-active,
.loading-leave-active {
  transition: opacity 300ms;
}

.loading-enter,
.loading-leave-to {
  opacity: 0;
}
</style>

