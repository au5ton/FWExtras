function dateStringToHumanizedString(str) {
    var date_object = new Date(str);
    var normal_hour;
    var normal_minute;
    var AmPm;
    if(date_object.getHours() === 0) {
        normal_hour = '12';
        AmPm = 'AM';
    }
    else if(date_object.getHours() > 12) {
        normal_hour = (date_object.getHours()-12)+'';
        AmPm = 'PM';
    }
    else if(date_object.getHours() === 12) {
        normal_hour = date_object.getHours()+'';
        AmPm = 'PM';
    }
    else {
        normal_hour = date_object.getHours()+'';
        AmPm = 'AM';
    }
    if(date_object.getMinutes() < 10) {
        normal_minute = '0'+date_object.getMinutes();
    }
    else {
        normal_minute = date_object.getMinutes()+'';
    }
    return (date_object.getMonth()+1)+'/'+(date_object.getDate())+' '+normal_hour+':'+normal_minute+' '+AmPm;
}
var _escape = document.createElement('textarea');
function escapeHTML(html) {
    _escape.textContent = html;
    return _escape.innerHTML;
}

function unescapeHTML(html) {
    _escape.innerHTML = html;
    return _escape.textContent;
}

//Thanks: http://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}
