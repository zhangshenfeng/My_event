$(function () { 
    const form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码格式不正确"],
        queRen: function (val) {
            if (val === $("[name=oldPwd]").val()) {
                return "不能和原密码一样"
            }
        },
        agains: function (val) {
            if (val !== $("[name=newPwd]").val()) {
                return "两次密码不一样"
            }
        }
    });
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
          method: 'POST',
          url: '/my/updatepwd',
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layui.layer.msg('更新密码失败！')
            }
            layui.layer.msg('更新密码成功！')
            // 重置表单
            $('.layui-form')[0].reset()
          }
        })
      })
})