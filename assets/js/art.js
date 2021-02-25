$(function () {
    initArtCateList()
    const form = layui.form

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    };

    var indexAdd = null
    $("#wenZhangStyle").on("click", function () {
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "300px"],
            title: "添加类别",
            content: $("#dialog-add").html()
        })
    });
    $("body").on("submit", "#form-add", function (e) {
        // debugger
        e.preventDefault()
        // debugger
        $.ajax({
            type: "POST",
            data: $(this).serialize(),
            url: "/my/article/addcates",
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("添加分类成功");
                initArtCateList();
                // indexAdd = null;
                console.log(indexAdd);
                layer.close(indexAdd)
            }
        })
    });
    /* 编辑 */
    var indexEdit = null;
    $('tbody').on('click', '.btn-edit', function () {  /* // 弹出一个修改文章分类信息的层  */
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        //点击编辑进行渲染
        var id = $(this).attr('data-id')// 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) { form.val('form-edit', res.data) }
        })

    })
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    });
    //删除
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    });
})