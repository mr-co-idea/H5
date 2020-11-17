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
        <!-- 下拉框 -->
        <cpt-select
          v-if="item.type === 'select'"
          :config="item"
          :state="formEdit"
          :value="value[key]"
          @change="update(key, $event)"
        />
        <!-- 图片上传 -->
        <cpt-load
          v-if="item.type ? item.type.indexOf('idcard') !== -1 : false"
          :config="item"
          :state="formEdit"
          :value="value[key]"
          @change="update(key, $event)"
        />
        <!-- 同意框 -->
        <cpt-agree
          v-if="item.type === 'agree'"
          :config="item"
          :value="value[key]"
          @change="update(key, $event)"
        >
          <slot :name="key"></slot>
        </cpt-agree>
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
      const form = new CptForm(this.formConfig);
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
    "cpt-load": formBase.cpt_load,
    "cpt-agree": formBase.cpt_agree,
  },
};
</script>
<style lang="sass" scope>
@import "@common/assets/styles/cpt_form.sass";
</style>