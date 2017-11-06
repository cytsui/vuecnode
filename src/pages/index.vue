<template>
  <div class="page-index">
    <Tab></Tab>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Tab } from '@/components/'

export default {
  name: 'index',
  components: {
    Tab
  }
}
</script>
