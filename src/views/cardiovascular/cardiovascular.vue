<template>
  <tab-row></tab-row>
</template>

<script>
import tabRow from '@/components/tab/index'
import {tabSwitch} from "@/components/mixins/mixin";
export default {
  name: "cardiovascular",
  components : {'tab-row':tabRow},
  mixins : {tabSwitch}
}
</script>

<style scoped>

</style>
