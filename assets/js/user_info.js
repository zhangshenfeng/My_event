$(function () { 
    let form = layui.form;
    form.verify({
        nickname: function (val) {
            if (val.length > 6) {
                return "用户名不能大于六位"
            }
        }
    });
    initUserInfo()
    function initUserInfo() { 
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: res => { 
                if (res.status !== 0) { 
                    return layer.msg("获取用户信息失败")
                }
                console.log(res);
                form.val("formUserInfo",res.data)
            }
        })
    };
    $("#chongxhi").on("click", function (e) {
        e.preventDefault()
        initUserInfo()
    });
    $(".layui-form").on("submit", function (e) { 
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data:$(this).serialize(),
            success: res => { 
                if (res.status !== 0) { 
                    return layer.msg(res.message)
                }
                console.log(res);
                // form.val("formUserInfo",res.data)
                window.parent.getUserInfo()
            }
        })
    })
})