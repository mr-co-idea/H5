<template>
  <div>
    <h1>测试</h1>
    <van-switch v-model="check" />
    <van-field
      :required="required"
      v-model="value"
      label="文本"
      placeholder="请输入用户名"
    />
  </div>
</template>
<script>
import { Switch } from "vant";
const _com = {};
_com[Switch.name] = Switch;
export default {
  data() {
    return {
      check: true,
      required: true,
      value: "",
    };
  },
  components: _com,
  methods: {
    testField() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      }).then(() => {
        this.required = false;
      });
    },
  },
  mounted() {
    this.testField();
  },
};
</script>