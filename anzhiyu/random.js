var posts=["2022/08/28/Git/Git命令/","2022/08/28/Git/Git简介/","2023/03/10/Git/Git配置远程SSH连接/","2023/06/24/java/FastJson/","2024/11/03/java/GitHub OAuth/","2024/10/02/java/SpringBoot部署到Tomcat/","2023/06/21/java/maven安装/","2023/06/27/java/使用Java进行json的读取于写入/","2023/01/30/linux/CentOS7系统安装/","2024/05/09/云盘/123云盘API封装/","2022/08/01/前端/BFC/","2022/07/11/前端/H5代码高亮加行号/","2022/07/10/前端/元素关系/","2023/10/12/前端/日历小案例/","2022/08/12/前端/静态网页统计访问次数/","2024/06/26/工具/NVM/","2024/09/21/数据结构/B树与B+树/","2023/11/14/算法/滑动窗口算法/","2023/02/03/算法/经典算法/","2023/03/21/随记/CPU流泪器/","2022/07/10/随记/Edge游览器扩展报错/","2023/02/05/随记/OneDriver直链/","2023/02/16/随记/Rewards刷积分脚本/","2023/01/04/随记/Typora图片上传/","2022/07/23/随记/VScode问题/","2022/08/08/随记/Win10小知识/","2023/09/27/随记/cloudflare内网穿透/","2023/05/08/随记/好玩的注释/","2022/08/05/随记/无绑定邮箱更改Epic绑定邮箱/","2022/08/19/随记/游览器从输入URL到页面展示过程/","2023/02/08/随记/白嫖office365/","2023/04/19/随记/通过Cloudflare加速GitHub个人仓库/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };