<template>
  <div>
    <cpt-form v-model="value" :formEdit="formEdit" :formConfig="formConfig" />
    <van-button @click="$router.push('/test')">跳转</van-button>
    <van-button @click="testFunc">测试</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formEdit: true,
      test: [{ a: 1 }],
      value: {
        load: {
          idcardfront: [],
          idcardreverse: [],
        },
        // select:'a'
      },
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
          "load",
          {
            type: "load-idcard",
            leftIcon: "info-o",
            label: "身份证正反面上传",
            required: true,
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
            // new Map([
            //   ["a", "选项一"],
            //   ["b", "选项二"],
            // ]),
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
          "agree",
          {
            type: "agree",
            text: "我同意...",
          },
        ],
      ]),
    };
  },
  mounted() {
    this.testSelect();
  },
  activated() {
    console.info(this.test);
  },
  methods: {
    testFunc() {
      this.formConfig.get("input").required = false; //测试必填属性改变后，视图是否刷新
    },
    testSelect() {
      const that = this;
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            code: 0,
            data: [
              { key: "a", val: "选项一" },
              { key: "b", val: "选项二" },
            ],
          });
        }, 1000);
      }).then((res) => {
        const map = new Map();
        res.data.map((item) => {
          map.set(item.key, item.val);
        });
        const select = that.formConfig.get("select");
        that.value = { ...this.value, ["select"]: res.data[0].key }; //测试下拉框动态赋值
        setTimeout(() => {
          select.columns = map;
        }, 1000);
      });
    },
  },
  watch: {
    value(val) {
      console.info(val);
    },
  },
};
</script>
<style lang="less" scope>
</style>