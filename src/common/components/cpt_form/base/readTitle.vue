<template>
  <!-- 只读标题 -->
  <div :class="['form-title-read', config.class || '']">
    {{ config.title }}
  </div>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      default() {
        return {
          title: "只读标题",
        };
      },
    },
  },
};
</script>
<style lang="scss" scoped>
$backgroundColor: #ededed;
.form-title-read {
  width: 100%;
  height: 40px;
  background-color: $backgroundColor;
  line-height: 40px;
  color: #999999;
  text-align: left;
  font-weight: bold;
  font-size: 14px;
  text-indent: 1em;
}
</style>