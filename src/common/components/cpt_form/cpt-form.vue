<template>
  <div class="cpt-form-contain">
    <van-form>
      <div
        v-for="([key, item], idx) in formConfig"
        v-show="item.show == index"
        :key="idx"
        :class="[item.class || null, 'form-unit-content']"
      >
        <!-- 表单输入单元 -->

        <!-- 输入框 -->
        <cpt-input
          v-if="item.type ? item.type.indexOf('input') !== -1 : true"
          :config="item"
          :state="formEdit"
          :value="value[key]"
          @input="update(key, $event)"
        />
      </div>
    </van-form>
  </div>
</template>
<script>
import * as formBase from "./base/index.import";
import CptForm from "./class/form.class";
import OperateTitle from "./class/operate_title.class";
export default {
  props: {
    formConfig: {
      type: Map,
      default() {
        return new Map([
          [
            "input",
            {
              label: "输入框",
              placeholder: "请输入",
              required: false,
            },
          ],
        ]);
      },
    },
    formEdit: {
      type: Boolean,
      default() {
        return true;
      },
    },
    value: {
      type: Object,
      default() {
        return {
          input: "",
        };
      },
    },
  },
  data() {
    return {
      index: 1,
      allCheckFunc: {},
    };
  },
  model: {
    props: "value",
    event: "change",
  },
  beforeMount() {
    this.initialize();
  },
  methods: {
    update(key, data) {
      this.$emit("change", { ...this.value, [key]: data });
    },
    initialize() {
      const form = new CptForm(this.config);
      this.allCheckFunc = form.check;
      new OperateTitle(this.formConfig);
    },
    //form组件校验函数
    async submitHandler(obj) {
      let _keys = [];
      _keys = Object.keys(obj || this.allCheckFunc);
      const failed_info = {};
      let _result = true;
      for (let item of _keys) {
        let _rule = {
          state: true,
        };
        const func = this.allCheckFunc[item];
        try {
          _rule = await func();
        } catch (e) {
          console.warn(e);
        }
        if (!_rule.state) {
          _result = false;
          failed_info[item] = rule.info;
        }
      }
      _result ? this.$emit("submit") : this.$emit("failed", failed_info);
      return _result;
    },
  },
  components: {
    "cpt-input": formBase.cpt_input,
    "cpt-select": formBase.cpt_select,
  },
};
</script>
<style lang="less" scope>
@import "@common/assets/styles/cpt_form.sass";
</style>