<template>
  <div :class="[check.state ? null : 'form-unit-error', config.class || '']">
    <van-field
      v-show="
        config.visable === true || config.visible === false
          ? config.visible
          : true
      "
      :required="config.required"
      :label="config.label"
      :placeholder="config.placeholder || '请输入'"
      :left-icon="config.leftIcon"
      :right-icon="showPicker ? 'arrow-up' : 'arrow-down'"
      readonly
      :clickable="state"
      :clearable="state ? config.clearable : false"
      :value="disposeValue(value)"
      @click="state ? onShowPicker(config) : null"
    />
    <!-- 下拉框 -->
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import rules from "@rules/index.rules";
export default {
  props: {
    config: {
      type: Object,
      default() {
        return {
          required: false,
          label: "输入框",
          placeholder: "请输入",
          columns: new Map([
            ["a", "测试a"],
            ["b", "测试b"],
          ]),
          leftIcon: "info-o",
          rules: {},
          clearable: true,
          type: null,
        };
      },
    },
    state: {
      type: Boolean,
      default() {
        return true;
      },
    },
    value: {
      type: String,
      default() {
        return "";
      },
    },
  },
  model: {
    prop: "value",
    event: "input",
  },
  data() {
    return {
      check: {
        state: true,
        info: "",
      },
      showPicker: false,
      columns: [],
      columnsCache: new Map(),
    };
  },
  mounted() {
    try {
      this.config.checkHook(this.onCheck);
    } catch (e) {
      console.warn(e);
    }
  },
  methods: {
    async onCheck() {
      this.check = await rules.check(this.config.rules, this.value);
      return this.check;
    },
    disposeValue(value) {
      return this.config.columns.get(value);
    },
    async onConfirm(value) {
      this.showPicker = false;
      if (value !== "暂无选项") {
        await this.$emit("change", this.columnsCache.get(value));
      }
      this.onCheck();
    },
    onCancel() {
      this.showPicker = false;
      this.onCheck();
    },
    onShowPicker(value) {
      const map = new Map();
      let _arr = [];
      try {
        if (value.columns.size > 0) {
          for (let [key, val] of value.columns.entries()) {
            _arr.push(val);
            map.set(val, key);
          }
        } else {
          _arr.push("暂无选项");
        }
      } catch (e) {
        console.warn(e);
      }
      this.columns = _arr;
      this.showPicker = true;
      this.columnsCache = map;
    },
  },
  computed: {
    type() {
      if (this.config.type && this.config.type.split("-"[1])) {
        return this.config.type.split("-")[1];
      } else {
        return "text";
      }
    },
  },
};
</script>