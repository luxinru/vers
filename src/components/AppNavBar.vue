<template>
  <van-nav-bar
    :title="title"
    left-arrow
    :border="false"
    @click-left="$router.back()"
  />
</template>

<script>
export default {
  name: 'AppNavBar',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
