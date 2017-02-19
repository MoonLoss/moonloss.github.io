
var OriginTitile = document.title,titleTime;

function onVisibilityChange() {
  if (document.hidden) {
        //$('[rel="shortcut icon"]').attr("href", "//www.dreamwings.cn/queue/wp-content/uploads/2016/05/fail.ico");
        document.title = "(/≧▽≦/)不要离开我！";
        clearTimeout(titleTime);
    } else {
        //$('[rel="shortcut icon"]').attr("href", "//www.ihewro.com/favicon.ico");
        document.title = "True Me" + OriginTitile;
        titleTime = setTimeout(function() {
            document.title = OriginTitile;
        },
        2000);
    }
}

document.addEventListener("visibilitychange",onVisibilityChange);
