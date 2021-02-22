# 酒店预订系统-微信小程序
该仓库为酒店预订系统的微信小程序，其Vue后台和Node.js服务端如下：
> [Vue前台](https://github.com/xkcease/hotel-management)
> [Node.js服务端](https://github.com/xkcease/hotel-server)

## 功能
1.  登录 
2.	首页
3.	预订页
4.	详细 
5.	我的
6.	to be continued

## 目录
```shell
hotel-weapp
│  app.js
│  app.json
│  app.wxss
│  project.config.json
│  README.md
│  sitemap.json
│
├─image
│      avatar.png
│      home.png
│      home_selected.png
│      minus.png
│      my.png
│      my_selected.png
│      plus.png
│      reserve.png
│      reserve_selected.png
│
├─pages
│  ├─confirm                      
│  │      confirm.js
│  │      confirm.json
│  │      confirm.wxml
│  │      confirm.wxss
│  │
│  ├─home
│  │      home.js
│  │      home.json
│  │      home.wxml
│  │      home.wxss
│  │
│  ├─my
│  │      my.js
│  │      my.json
│  │      my.wxml
│  │      my.wxss
│  │
│  └─reserve
│          reserve.js
│          reserve.json
│          reserve.wxml
│          reserve.wxss
│
└─utils
        dateTool.js                      // 日期格式工具
        http.js                          // axios封装
        request.js                       // 请求封装
        util.js
```

