$(function () { 
    getUserInfo();
      // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
      const layer=layui.layer
    // 提示用户是否确认退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
      //do something
      // 1. 清空本地存储中的 broken
      localStorage.removeItem('broken')
      // 2. 重新跳转到登录页面
      location.href = '/login.html'

      // 关闭 confirm 询问框
      layer.close(index)
    })
  })
})
function getUserInfo() { 
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
       
        success(res) { 
            // console.log(res);
            if (res.status !==0) { 
                return layer.msg("res.message")
            }
            rendatavator(res.data)
        },
        err() { },
       
    })
};
function rendatavator(user) {
    // console.log(user);
    const username = user.username || user.nickname
    $("#welcome").html(username)
    if (user.user_pic) {
        $(".layui-nav-img").attr("src", user.user_pic).show()
        $(".text-avatar").hide()
    } else { 
        $(".layui-nav-img").hide();
        const firstName = username[0].toUpperCase()
        $(".text-avatar").html(firstName).show()
    }
}