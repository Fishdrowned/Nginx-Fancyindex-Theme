function getQueryVars() {
    var result = {};
    var queryString = window.location.search.substring(1);
    var vars = queryString.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof result[pair[0]] === "undefined") {
            result[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof result[pair[0]] === "string") {
            result[pair[0]] = [result[pair[0]], decodeURIComponent(pair[1])];
            // If third or later entry with this name
        } else {
            result[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return result;
}

function httpGet(url) {
    var content = "";
    if (window.XMLHttpRequest) {
        // for IE7+, Firefox, Chrome, Opera, Safari
        var http = new XMLHttpRequest();
    } else {
        // for IE6, IE5
        http = new ActiveXObject("Microsoft.XMLHTTP");
    }
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            content = http.responseText;
        }
    };
    http.open("GET", url, false);
    http.send();
    return content;
}

function render(content) {
    var script = document.createElement("script");
    document.getElementById("md-content").innerHTML = content;
    script.src = "/.fancy/strapdown/strapdown.js";
    document.body.appendChild(script);
}
