<template>
  <div class="cmodal">
    <transition name="fade">
      <div class="cmodal-mask" v-show="visible" @click="mask"></div>
    </transition>
    <div class="cmodal-content" v-show="visible">
      <a class="cmodal-close-icon" @click="close"></a>
      <div class="cmodal-hd">
        <div class="cmodal-hd-inner">{{ title }}</div>
      </div>
      <div class="cmodal-bd">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.cmodal-close-icon {
  cursor: pointer;
  display: block;
  position: absolute;
  z-index: 2;
  top: 16px;
  right: 16px;
  width: 20px;
  height: 20px;
  background: url('../../assets/close-n.svg') no-repeat;
  background-size: 20px 20px;
  transition: background-image 300ms;
  &:hover {
    background-image: url('../../assets/close-h.svg');
  }
}
.cmodal-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
}

.cmodal-content {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 520px;
  z-index: 2;
  background: #fff;
  border-radius: 8px;
  text-align: center;
  .cmodal-hd {
    position: relative;
    padding: 16px 14px;
    font-size: 15px;
    font-weight: 600;
    border-bottom: 1px solid #e6e6e6;
  }
  .cmodal-bd {
    padding: 16px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<script>
import popupManager from './popup-manager'

export default {
  name: 'modal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题',
      required: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    autoReset: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.value
    }
  },

  watch: {
    value(val) {
      console.log('watch modal value:', val)
      this.visible = val
    },

    visible(val) {
      console.log('watch modal visible:', val)
      if (val) {
        popupManager.setIndex(this)
      } else {
        // popupManager.closeModal(this)
      }
    }
  },

  methods: {
    close() {
      this.visible = false
      this.$emit('input', false)
    },

    mask() {
      this.close()
    }
  }
}
</script>

