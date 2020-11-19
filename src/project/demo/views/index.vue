<template>
  <div>
    <cpt-form v-model="value" :formEdit="formEdit" :formConfig="formConfig" />
    <!-- <van-button @click="$router.push('/test')">跳转</van-button> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      formEdit: true,
      value: {},
      formConfig: new Map([
        [
          "operateTitle-1",
          {
            type: "operateTitle",
            title: "第一页",
          },
        ],
        [
          "readTitle",
          {
            type: "readTitle",
            title: "标题",
          },
        ],
        [
          "tips",
          {
            type: "tips",
            text: "我是提示组件",
          },
        ],
        [
          "input",
          {
            label: "输入框",
            placeholder: "请输入",
            required: true,
            leftIcon: "info-o",
          },
        ],
        [
          "select",
          {
            label: "选择框",
            type: "select",
            columns: new Map(),
            placeholder: "请选择",
            required: false,
            leftIcon: "info-o",
          },
        ],
        [
          "period",
          {
            label: "身份证有效期",
            type: "period",
            placeholder: "请选择",
            required: false,
            leftIcon: "info-o",
          },
        ],
        [
          "operateTitle-2",
          {
            type: "operateTitle",
            title: "第二页",
          },
        ],
        [
          "load",
          {
            type: "load-idcard",
            leftIcon: "info-o",
            label: "身份证正反面上传",
          },
        ],
        [
          "agree",
          {
            type: "agree",
            text: "我同意...",
          },
        ],
      ]),
    };
  },
};
</script>
<style lang="less" scope>
</style>