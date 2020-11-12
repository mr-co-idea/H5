# 单工程多项目 —— H5版（for Vue）

##### 单工程下，多个子项目，子项目相互独立，可共用工程的配置和common下的资源
##### 适用于结构相仿，代码重复性高的快速开发型H5项目
***
### 技术指南
* webpack + vue2 + vant
* babel + postcss
* inquirer
* sass + less (可选)
* jsx + ts (可选)
### 工程
#### 目录结构
    |-- build
      |-- config
	    |-- webpack.base.js                    (公共配置)
	    |-- webpack.dev.js                     (development环境配置)
	    |-- webpack.prod.js                    (production环境配置)
        |-- create.js                          (创建新的子项目脚本)
		|-- utils.js                           (工具)
      |-- project                              (子项目配置)
	    |-- demo.json                          (子项目配置文件)
		|-- projectA.json
	  |-- GUI                                  (预留：详情见底部)
	  |-- webpack.config.js                    (配置汇总)
    |-- dist                                   (打包输出目录)
	|-- public
	  |-- index.html
	|-- server                                 (服务：另行介绍)
	|-- src                                    (开发目录)
	  |-- common                               (公共资源目录)
	    |-- assets                             (静态资源)
		|-- components                         (公共组件)
		  |-- cpt_form                         (form组件,另行说明)
		  |-- othens...
		  |-- index.cpt.js                     (组件注册)
		|-- modules
		  |-- providers                        (网络请求)
		    |-- http-service.base.js           
		  |-- stores                           (store，在子项目引入，并通过命名空间注册)
		|-- pages
		|-- utils
	  |-- project                              (子项目目录)
	  |-- demo
	    |-- entry
		  |-- index.js                         (入口文件)
		|-- modules
		  |-- assets
		  |-- provider
		    |-- http-service.js                (请求配置)
			|-- interface.js                   (请求接口)
		  |-- router
		    |-- index.router.js
		  |-- store
		    |-- index.store.js                 (严格模式)
			|-- loginStore.js
		  |-- utils
		|-- views
		  |-- components
		  |-- app.vue
		  |-- index.vue
	  |-- projectA                             (目录结构同上)
	|-- .babelrc                               (babel配置)
	|-- postcss.config.js                      (postcss配置)
	|-- command.js                             (项目启动脚本)
	|-- tsconfig.json                          (ts配置文件)  
	|-- package.json
	|-- package-lock.json
	|-- readme.md                              (项目构建文档)  
	|-- README.md                              (项目使用文档)             

#### 工程搭建
1. 创建目录结构
2. 创建项目：`npm init`
3. 安装依赖：``

### 补充说明
#### GUI
* 采用vite + vue3 + antd + rollup + koa 进行构建
* 可以通过UI进行项目启动、项目管理、项目文档管理查看等
* 详见GUI工程
#### form组件封装
* 将会在另外的文档中说明
#### serve模拟后台服务
* 为什么不用mock？
考虑到在开发环境下，表单页填写后提交数据能存储下来，并下次可以直接读取，从灵活性出发，故而采用koa
* serve将单独存放，开发时可放入工程内，详见serve工程