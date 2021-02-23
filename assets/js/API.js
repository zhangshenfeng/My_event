$.ajaxPrefilter(function (options) { 
   
    options.url = "http://ajax.frontend.itheima.net/api" + options.url
    console.log(options.url);
})