<template>
  <!-- 提示信息 -->
  <div
    :class="['form-tips-line', config.class || '']"
    v-html="config.text"
  ></div>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      default() {
        return {
          type: "tips",
          text: "提示内容",
          class: "",
        };
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.form-tips-line {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  font-weight: 400px;
  color: #cccccc;
  text-indent: 1em;
  background: #ffffff;
}
</style>