### 工程使用手册

#### 一、指令说明
> **A. npm run [dev/build/...] [项目名]**
>> * 项目名非必填
>> eg: `npm run dev demo` or `npm run dev`

> **B. npm run create [项目名]**
>> * 项目名非必填
>> eg: `npm run create newproject` or `npm run create`
>> eg: `默认复制demo.json中的配置
#### 二、配置子项目
* 在文件 `build/project/[项目名].json` 中配置项目
* 可以自定义启动环境，eg:testDev，注意：自定义指令中必须包含 dev/Dev | build/Build
* dev代表development,build代表production
#### 三、使用说明
> **1. 文件引入**
> > * '@common' -> 'common文件夹路径'
> > * '@images' -> 'common下images文件夹路径'
> > * '@project' -> '子项目文件夹路径'
> > * '@modules' -> '子项目中modules文件夹路径'
> > * '@views' -> '子项目中views文件夹路径'
> > * '@providers' -> '子项目中providers文件夹路径'
> > *  如需自定义，请在webpack.base.js中添加

> **2. common中组件注册**
> > * 在子项目中的components/index.js中 引入 common/components/index.cpt.js的createPlugins方法
> > * createPlugins('cpt-form','demo'),使用哪个组件，就将组件名当做函数的参数，`cpt-`可写可不写
> > * 将方法回调引入main.js中，通过Vue.use(func)注册

> **3. common中http-service.base.js使用说明**
>> * 非必须引用
>> 函数createRequest中，有三个参数,均非必填，分别是
>>>baseURL: 请求地址    
>>>req: 可覆盖request中已有的请求拦截器      
>>>res: 可覆盖request中已有的相应拦截器
