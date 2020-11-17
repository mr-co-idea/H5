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
      :placeholder="config.placeholder || '请选择'"
      :left-icon="config.leftIcon"
      :readonly="state ? false : true"
      :clearable="state ? false : true"
      :value="value"
      :type="type"
      @input="$emit('input', $event.trim())"
      @blur="onCheck"
    />
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