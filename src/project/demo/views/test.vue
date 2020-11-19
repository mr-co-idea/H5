<template>
  <div>
    <h1>测试</h1>
	<van-switch v-model="check" />
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
    };
  },
  components: _com,
};
</script>