# 踩坑记录

### 使用keepAlive后，this指向问题
* 第一次进入界面，触发mouted，this指向初始化的实例
* 之后进入界面，触发actived，this指向缓存的实例
* 缓存的实例 !== 初始化的实例

### 观察者模式
* 在vue中通过额外的方法处理数据，需要考虑该方法的触发
* 只有自建订阅才能保证数据更改，方法会被触发

### 在vue监听
* 在vue中Map没有被监听，如果map值发生改变触发更新，需要劫持触发
* Map中的对象不会在vue中被监听

### select组件
* key是双向绑定的，但val没有，需要key改变的时候触发
* columns值改变时也应触发刷新
* 采用数据劫持刷新