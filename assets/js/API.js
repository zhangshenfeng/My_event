$.ajaxPrefilter(function (options) { 
   
    options.url = "http://ajax.frontend.itheima.net" + options.url
    console.log(options.url);
    if (options.url.includes("/my")) { 
        options.headers= {
            Authorization:localStorage.broken,
        }
    };
    options.complete=function (response) { 
        // console.log(response);

        //解构
        const { message, status } = response.responseJSON;
        // console.log(response.responseJSON);
        if (message==="身份认证失败！" && status===1) { 
            localStorage.removeItem("broken");
            location.href="/login.html"
        }
    }
})