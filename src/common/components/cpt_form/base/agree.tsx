import Vue from "vue";
import Component from "vue-class-component";
import rules from "../rules/index.rules";

const AgreeProps = Vue.extend({
  props: {
    config: {
      type: Object,
      default() {
        return {
          type: "agree",
          text: "展示信息",
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
      type: Boolean,
      default() {
        return false;
      },
    },
  },
});

interface Check {
  state: boolean;
  info: string;
}

@Component
export default class Agree extends AgreeProps {
  protected check: Check = {
    state: true,
    info: "",
  };
  mounted() {
    try {
      this.config.checkHook(this.onCheck);
    } catch (e) {
      console.warn(e);
    }
    this.addRules();
  }
  addRules(): void {
    rules.use({
      "if-agree": function (val: string | boolean): Boolean {
        return val ? true : false;
      },
    });
  }
  async onCheck(): Promise<Object> {
    this.check = await rules.check({ "if-agree": true }, this.value);
    return this.check;
  }
  private async onChange(): Promise<void> {
    await this.$emit("change", !this.value);
    this.onCheck();
  }
  protected render(): Element {
    return (
      <div
        class={"agree-box-contain " + (this.check.state ? "" : "agree-error ") +
          (this.config["class"] || "")}
      >
        <van-checkbox
          {...{
            props: {
              value: this.value,
              shape: "square",
              iconSize: "40px",
            },
            on: {
              click: this.onChange,
            },
          }}
        >
          {this.$slots.default || this.config.text}
        </van-checkbox>
      </div>
    );
  }
}
