<template>
  <div class="mixins-page">
    <p>混合练习：</p>
    <Modal
      v-model="showA"
      title="Title"
      :maskClosable="false"
    >
      <p> Modal A</p>
      <a @click="closeModalA"> 关闭</a>
    </Modal>
    <p><span @click="handleAClick">显示Modal A</span></p>
  </div>
</template>

<style lang="less" scoped></style>

<script>
import Modal from '@/components/mixins/modal'

export default {
  name: 'mixins',
  components: {
    Modal
  },
  data() {
    return {
      showA: false
    }
  },

  methods: {
    handleAClick() {
      this.showA = true
    },
    closeModalA() {
      this.showA = false
    }
  },

  watch: {
    showA(val) {
      console.log(`watch mixins-modal showA:`, val)
    }
  }
}
</script>
