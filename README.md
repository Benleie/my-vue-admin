## todolist
+ pagination layout通过slot添加'共有多少条记录'
+ 学习navmenu的写法 src/layout
+ JSON.stringify 换行美化




## json-server
+ ``
+ score?_page=2&_limit=5
+ /score?id=1&id=2&id=3
+ /score?_sort=chinese&_order=desc
+ /score?_sort=chinese&_order=desc&_start=21&_limit=2
+ /score?_sort=chinese&_order=desc&_start=21&_end=2
+ /score?name_like=sa 对某个字段进行查询
+ /score?q=sa  

## element
+ dialog
  + dialog虽然是v-show，但内容是懒渲染的，第一次打开之后才会将slot挂载到DOM
  + .sync修改符必用
+ pagination
  + 文档读起来比较别扭，改变了currentPage才能触发current-change，那怎样改变currentPage呢，用户自己改变行不行？肯定不行啊，只能通过点击左右以及Pager的页数来改变currentPage

## done
+ 关闭husky
  + git hooks  pre-commit  .sample不执行
