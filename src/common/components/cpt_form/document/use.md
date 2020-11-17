# form组件使用手册

## form
* 组件基于vant,校验规则已重构
* formConfig，组件的配置，类型为Map，new Map([[key,val]])，key为字段，和value中等同，val为当前子组件的配置信息
* value，表单数据，可为空对象，双向数据绑定
* formEdit表单是否可编辑，true/false
* 示例 
   ```
   new Map([
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
        ]);
   ```

## 校验（支持异步校验）

* 校验通过后触发submit事件，失败触发failed事件（failed事件参数为校验不通过的info）
* cpt_form文件夹下的rules/index.rules.js中存放全局校验，使用时
   ```
   rules:{
	   [校验名]:true
   }
   ```
* 局部注册组件 通过`import rules from '@rules/index.rules'`引入rules，
   ```
   rules.use({
	   [自定义校验名]:function(){
		   return [true/false]
	   }
   })
   ```
   可以使多个对象，或者对象里面放置多个属性
* 子组件校验函数钩子，可通过在val中添加checkHook获取
* form组件的校验支持全部校验和局部校验，传参`{...[校验字段]，[key]:true}`

## 子组件
### input 
* 基本属性可参见vant，或查看input组件的props
* type默认为空或者为input时被渲染，为input-***时即为相应类型，eg: input-tel,类型为tel输入框
* 基本属性可参见vant，或查看input组件的props
### select
* 基本属性可参见vant，或查看input组件的props
* type为select
* 基本属性可参见vant，或查看input组件的props
* columns为组件的下拉选项，类型为Map，key为字段，val为要显示的信息
### load
* 当type为type-[idcard/businesslicense/face]分别为身份证、营业执照、人脸
* 添加新的图片上传 type-[新上传],config中添加`loadConfig:new Map()`来添加新配置，Map中
的key命名的图片放置在common的images下
### agree
* 必须
* config中text可以添加文本
* 可以通过插槽添加内容 name为当前agree的字段名

