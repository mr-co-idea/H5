<template>
  <!-- 可操作标题 -->
  <div :class="['form-title-operate', config.class || '']">
    <div
      left
      class="title-operate-content"
      v-if="config.preFunc ? true : config.location === 'start' ? false : true"
      @click="onPre"
    >
      <van-icon name="arrow-left" />
      上一步
    </div>
    <span>{{ config.title }}</span>
    <div
      right
      class="title-operate-content"
      v-if="config.nextFunc ? true : config.location === 'end' ? false : true"
      @click="onNext"
    >
      下一步
      <van-icon name="arrow" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      default() {
        return {
          title: "只读标题",
          location: "", //operateClass会进行处理
          nextFunc: null,
          preFunc: null,
          stepCheck: {}, //operateClass会进行处理
        };
      },
    },
    value: {
      type: String | Number,
      default() {
        return 1;
      },
    },
    check: {
      type: Function,
      default() {
        return () => true;
      },
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      data: "",
    };
  },
  methods: {
    async onNext(value) {
      if (await this.check(this.config.stepCheck)) {
        if (this.config.nextFunc) {
          this.config.nextFunc();
        } else {
          this.$emit("change", this.value + 1);
        }
      }
    },
    onPre(value) {
      if (this.config.preFunc) {
        this.config.preFunc();
      } else {
        this.$emit("change", this.value - 1);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$backgroundColor: #ededed;
.form-title-operate {
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  background-color: $backgroundColor;
  text-align: center;
  line-height: 40px;
  color: #333333;
  font-weight: bold;
  .title-operate-content {
    position: absolute;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 5px;
    line-height: 40px;
    font-size: 14px;
    color: #1c88ea;
    font-weight: 400;
    &:hover {
      background-color: gainsboro;
      color: black;
    }
    &[left] {
      left: 0;
    }
    &[right] {
      right: 0;
    }
  }
}
</style>