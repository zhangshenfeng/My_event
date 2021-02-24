$(function () { 
    $("#linkLogin").on("click", function () { 
        $(".reg-box").show()
        $(".login-box").hide()
    })
    $("#linkReg").on("click", function () { 
        $(".reg-box").hide()
        $(".login-box").show()
    })

    const form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6~12位，且不能出现空格"],
        repwd: function (val) {
            const vals = $(".reg-box [name=password]").val()
            if (vals !== val) {
                return "两次密码不一致"
            }
        }
    });
    
 //注册
    $("#form-all").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/reguser",
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val()
            },
            success: res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                    
                }
                layer.msg("注册成功，请登录")
               
                // $(".login-box [name=username]").val($(".reg-box [name=username]").val())
                // $(".login-box [name=password]").val($(".reg-box [name=password]").val())
                localStorage.setItem("names", $(".reg-box [name=username]").val());
                localStorage.setItem("psds", $(".reg-box [name=password]").val());
                $("#linkReg").click();
            }

        });
        
        // $("#form-lg [name=username]").val()=
    });
    //登录
    $("#form-lg").on("submit", function (e) { 
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                    
                }
                localStorage.setItem("broken", res.token);
                location.href="index.html"
            }

        });
        
        // $("#form-lg [name=username]").val()=
    })

})

