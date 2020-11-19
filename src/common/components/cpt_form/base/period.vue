<template>
  <div :class="[ruleTotal ? null : 'form-period-error', config.class || '']">
    <div class="form-period-validity">
      <div :class="ruleStart ? null : 'form-unit-error'">
        <van-field
          :value="startTime(value)"
          :required="config.required"
          :label="config.label || '有效期'"
          :placeholder="config.placeholder || '开始时间'"
          :left-icon="config.leftIcon"
          readonly
          :clickable="state"
          @click="state ? onShowPicker(0) : null"
          :clearable="state ? config.clearable : false"
        />
      </div>
      -
      <div :class="ruleEnd ? null : 'form-unit-error'">
        <van-field
          :value="endTime(value)"
          :placeholder="config.placeholder || '截止时间'"
          readonly
          :clickable="state"
          @click="state ? onShowPicker(1) : null"
          :clearable="state ? config.clearable : false"
        />
      </div>
    </div>
    <van-popup v-model="showPopup" position="bottom">
      <van-datetime-picker
        v-model="time"
        type="date"
        :title="title[index]"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import rules from "@rules/index.rules";
import { Toast } from "vant";
export default {
  props: {
    config: {
      type: Object,
      default() {
        return {
          required: false,
          label: "有效期",
          placeholder: "选择时间",
          leftIcon: "info-o",
          rules: {},
          clearable: true,
          type: "period",
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
      time: new Date(),
      title: ["请选择开始时间", "请选择截止时间"],
      dataCache: new Map([
        ["start", ""],
        ["end", ""],
      ]),
      index: 0,
      ruleStart: true,
      ruleEnd: true,
      ruleTotal: true,
      showPopup: false,
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2080, 10, 1),
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
      let _result = true;
      this.check = await rules.check(
        this.config.rules,
        this.dataCache.get(this.index === 0 ? "start" : "end")
      );
      if (this.check.state) {
        this.index == 0 ? (this.ruleStart = true) : (this.ruleEnd = true);
      } else {
        this.index == 0 ? (this.ruleStart = false) : (this.ruleEnd = false);
      }
      if (this.dataCache.get("end")) {
        if (this.dataCache.get("start") >= this.dataCache.get("end")) {
          this.check.state = false;
          this.ruleTotal = false;
          Toast.fail("截止时间不能早于开始时间");
        } else {
          this.ruleTotal = true;
        }
      }
      return this.check;
    },
    onShowPicker(index) {
      this.index = index;
      this.showPopup = true;
    },
    onConfirm(value) {
      const year = value.getFullYear().toString();
      let _month = value.getMonth() + 1;
      let _date = value.getDate();
      _month < 10 ? (_month = "0" + _month) : _month;
      _date < 10 ? (_date = "0" + _date) : _date;
      const currentTime = year + "." + _month + "." + _date;
      let _result;
      if (this.index === 0) {
        this.dataCache.set("start", currentTime);
        this.onCheck();
        this.index = 1;
        _result = currentTime + "-" + this.dataCache.get("end");
      } else if (this.index === 1) {
        this.dataCache.set("end", currentTime);
        this.onCheck();
        this.index = 0;
        _result = this.dataCache.get("start") + "-" + currentTime;
      }
      this.$emit("change", _result);
      this.time = new Date();
      this.showPopup = false;
    },
    onCancel() {
      this.showPopup = false;
      this.onCheck();
    },
    startTime(val) {
      const newVal = val.split("-")[0];
      if (newVal) {
        this.dataCache.set("start", newVal);
        return newVal;
      }
    },
    endTime(val) {
      const newVal = val.split("-")[1];
      if (newVal) {
        this.dataCache.set("end", newVal);
        return newVal;
      }
    },
  },
};
</script>
<style lang="scss">
.form-period-validity {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #cccccc;
  .van-cell {
    &:nth-of-type(1) {
      flex: 2;
      input {
        text-align: center;
      }
      .van-field__value {
        display: flex;
        align-items: center;
      }
    }
    &:nth-of-type(2) {
      flex: 1;
      input {
        text-align: center;
      }
    }
  }
}
.form-period-error {
  input {
    color: red;
  }
}
</style>