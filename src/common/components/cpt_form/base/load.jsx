import rules from "@rules/index.rules";

const cptLoad = {
  props: {
    config: {
      type: Object,
      default() {
        return {
          required: true,
          label: "图片上传",
          leftIcon: "notes-o",
          rules: {},
          type: "load-idcard",
          loadCallBack: {},
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
      type: String | Object,
      default() {
        return {};
      },
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      check: {
        state: true,
        info: "",
      },
    };
  },
  render() {
    const that = this;

    const exitConfig = new Map([
      [
        "idcard",
        new Map([
          ["idcardfront", { maxCount: 1, disabled: !that.state }],
          ["idcardreverse", { maxCount: 1, disabled: !that.state }],
        ]),
      ],
      [
        "businesslicense",
        new Map([["businesslicense", { maxCount: 1, disabled: !that.state }]]),
      ],
      ["face", new Map([["face", { maxCount: 1, disabled: !that.state }]])],
    ]);

    //load组件增加非空校验
    if (this.config.rules && this.config.rules["non-empty"]) {
      this.config.rules["load-non-empty"] = true;
      rules.use({
        "load-non-empty": function (val) {
          const keys = Object.keys(val);
          let _result = true;
          for (let item of keys) {
            _result = (val[item] !== "" && val[item] !== undefined &&
                val[item] != null && val[item].length !== 0)
              ? true
              : false;
            if (!_result) return false;
          }
          return _result;
        },
      });
    }

    //数据绑定
    const update = (key, data) => {
      this.$emit("change", { ...this.value, [key]: data });
    };

    //load校验回调
    try {
      this.config.checkHook(async function onCheck() {
        that.check = await rules.check(that.config.rules, this.value);
        return that.check;
      });
    } catch (e) {
      console.warn(e);
      console.info("请给%ccptform%c组件传值", "color:orange", "color:red");
    }

    //load组件类型
    const type = this.config.type.split("-")[1];

    //load单元组件
    const load = (type, data, onLoad, onDelete, config) => {
      const loadConfig = exitConfig.get(type) || config.loadConfig;
      let _DOM = [];
      [...loadConfig].map(([key, val]) => {
        const obj = {};
        Object.assign(val, {
          afterRead: (val) => {
            onLoad.call(obj, val, key);
          },
          beforeDelete: (val) => {
            onDelete.call(obj, key);
          },
          fileList: data[key],
        });

        _DOM.push(
          <div class="form-load-image">
            <van-uploader {...{ props: val }}>
              <div
                class={(this.check.state ? null : "form-load-error"),
                  "preload-image-contain"}
              >
                <img src={require(`@images/${key}.png`)} />
              </div>
            </van-uploader>
          </div>,
        );
      });
      return _DOM;
    };

    //上传后回调
    function onLoad(val, key) {
      update(key, [val]);
      that.config.loadCallBack ? that.config.loadCallBack(val, key) : null;
    }
    //删除前回调
    function onDelete(key) {
      update(key, []);
    }

    //删除多余配置并深拷贝，此处需要添加订阅
    const props = Object.assign({}, this.config);
    ["rules", "loadCallBack", "type"].map((e) => delete props[e]);

    //组件配置
    const config = {
      props: props,
      scopedSlots: {
        input: () => (<div class="form-load-contain">
          {load(type, this.value, onLoad, onDelete, this.config)}
        </div>),
      },
    };

    //返回load组件
    return (
      <van-field {...config} />
    );
  },
};
export default cptLoad;
