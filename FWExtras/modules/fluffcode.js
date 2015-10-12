/*
*  FluffCode.js
*
*  Manages all functions that are made originally by Fluff, and tweaked here
*
*/

xhReq=new XMLHttpRequest();
var titleText = "";
var notifs = 0;
var lastnotif = 0;
var lastcbpid;

function onSumResponse2(serverResponse, forceapply)
{
    //if (xhReq.readyState != 4)  { return; }
    //var serverResponse = xhReq.responseText;
    if(serverResponse !== "[[]]")
    {
        if(serverResponse == "logout")
        {
            window.location.href = "scripts/logout.php";
            return;
        }
        var obj = JSON.parse(serverResponse);
        serverResponse = "[[]]";
        var user_id = obj[0];
        var username = obj[1];
        var chat = obj[2];
        var pm = obj[3];
        var chatid = obj[4];
        var pmtime = obj[5];
        for(var i = 0; i < chat.length; i++)
        {
            if(chat[i]['id'] > lastcbpid || forceapply === true)
            {
                console.log('1 new message, posting creating element for new message');
                lastcbpid = chat[i]['id'];
                var newmsg = document.createElement("DIV");
                newmsg.setAttribute('class', "msg_container");
                var timediv = document.createElement("DIV");
                timediv.setAttribute('class', "time");
                timediv.appendChild(document.createTextNode(chat[i]['date']));
                var clearfloat = document.createElement("DIV");
                clearfloat.setAttribute('class', "clearfloat");
                if(user_id == chat[i]['user_id'])
                {
                    var spacer = document.createElement("DIV");
                    spacer.setAttribute('class', "spacer_sent");
                    var content = document.createElement("DIV");
                    content.setAttribute('class', "msg_sent");
                    content.setAttribute('data-msgid', chat[i]['id']);
                    content.setAttribute('onclick', 'expandMessage(this)');
                    content.style.color = "#" + chat[i]['color'];
                    content.style.backgroundColor = "#" + chat[i]['secondary_color'];
                    content.style.fontFamily = getFont(chat[i]['font']); //We need CSS values
                    content.appendChild(document.createTextNode(chat[i]['content']));
                    var pic = document.createElement("DIV");
                    pic.setAttribute('class', 'prof_pic_sent');
                    pic.backgroundColor = "#" + chat[i]['secondary_color'];
                    var img = document.createElement("IMG");
                    img.setAttribute('width', '40');
                    //img.setAttribute('height', '40');
                    img.setAttribute('src', 'img/profile/' + chat[i]['pic']);
                    pic.appendChild(img);
                    var a_prof = document.createElement("A");
                    a_prof.setAttribute('href', 'img/profile/' + chat[i]['username']);
                    a_prof.appendChild(pic);
                    if(chat[i]['attachmentid'] != '0')
                    {
                        var att_div = document.createElement("DIV");
                        att_div.setAttribute('class', 'attachment_sent');
                        var a = document.createElement("A");
                        a.style.color = "#" + chat[i]['color'];
                        var link = "getattachment.php?file=" + chat[i]['url_filename'];
                        a.setAttribute('href', link);
                        a.setAttribute('target', "_blank");
                        a.appendChild(document.createTextNode(chat[i]['filename']));
                        att_div.appendChild(a);
                        att_div.appendChild(document.createTextNode(" ("));
                        var span1 = document.createElement("SPAN");
                        span1.style.color = "#" + chat[i]['color'];
                        span1.appendChild(document.createTextNode(chat[i]['size']));
                        att_div.appendChild(span1);
                        att_div.appendChild(document.createTextNode(") Downloads: "));
                        var span2 = document.createElement("SPAN");
                        span2.style.color = "#" + chat[i]['color'];
                        span2.appendChild(document.createTextNode(chat[i]['hits']));
                        att_div.appendChild(span2);
                        content.appendChild(att_div);
                    }
                    newmsg.appendChild(spacer);
                    newmsg.appendChild(timediv);
                    newmsg.appendChild(content);
                    newmsg.appendChild(a_prof);
                    newmsg.appendChild(clearfloat);
                }
                else
                {
                    var a_prof = document.createElement("A");
                    a_prof.setAttribute('href', 'user.php?name=' + chat[i]['username']);
                    var pic = document.createElement("DIV");
                    pic.setAttribute('class', 'prof_pic_rcvd');
                    pic.backgroundColor = "#" + chat[i]['secondary_color'];
                    var img = document.createElement("IMG");
                    img.setAttribute('width', '40');
                    //img.setAttribute('height', '40');
                    img.setAttribute('src', 'img/profile/' + chat[i]['pic']);
                    pic.appendChild(img);
                    a_prof.appendChild(pic);
                    var content = document.createElement("DIV");
                    content.setAttribute('class', "msg_rcvd");
                    content.setAttribute('data-msgid', chat[i]['id']);
                    content.setAttribute('onclick', 'expandMessage(this)');
                    content.style.color = "#" + chat[i]['color'];
                    content.style.backgroundColor = "#" + chat[i]['secondary_color'];
                    content.style.fontFamily = getFont(chat[i]['font']); //We need CSS values
                    content.appendChild(document.createTextNode(chat[i]['content']));
                    var spacer = document.createElement("DIV");
                    spacer.setAttribute('class', "spacer_rcvd");
                    if(chat[i]['attachmentid'] != '0')
                    {
                        var att_div = document.createElement("DIV");
                        att_div.setAttribute('class', 'attachment_rcvd');
                        var a = document.createElement("A");
                        a.style.color = "#" + chat[i]['color'];
                        var link = "getattachment.php?file=" + chat[i]['url_filename'];
                        a.setAttribute('href', link);
                        a.setAttribute('target', "_blank");
                        a.appendChild(document.createTextNode(chat[i]['filename']));
                        att_div.appendChild(a);
                        att_div.appendChild(document.createTextNode(" ("));
                        var span1 = document.createElement("SPAN");
                        span1.style.color = "#" + chat[i]['color'];
                        span1.appendChild(document.createTextNode(chat[i]['size']));
                        att_div.appendChild(span1);
                        att_div.appendChild(document.createTextNode(") Downloads: "));
                        var span2 = document.createElement("SPAN");
                        span2.style.color = "#" + chat[i]['color'];
                        span2.appendChild(document.createTextNode(chat[i]['hits']));
                        att_div.appendChild(span2);
                        content.appendChild(att_div);
                    }
                    newmsg.appendChild(a_prof);
                    newmsg.appendChild(content);
                    newmsg.appendChild(timediv);
                    newmsg.appendChild(spacer);
                    newmsg.appendChild(clearfloat);
                }
                notifs++;
                document.getElementById("chatbox").appendChild(newmsg);
            }
        }
    }
}
function fetchXMLReq()
{
    xhReq.open("GET", "scripts/auto_refresh_home.php", true);
    xhReq.onreadystatechange = onSumResponse;
    xhReq.send(null);
}
function setTitle()
{
    titleText = document.getElementsByTagName("TITLE")[0].innerHTML;
    fetchXMLReq();
    //setInterval("fetchXMLReq()", 10000);
    //setTimeout("Rez_inspired_logout()", 1800000);
}

function Rez_inspired_logout()
{
    window.location.href = "scripts/logout.php";
    return;
}

function scrollToBottom()
{
	var objDiv = document.getElementById("chatbox");
	objDiv.scrollTop = objDiv.scrollHeight;
	var pmBox = document.getElementById("pm");
	pmBox.scrollTop = pmBox.scrollHeight;
}

function getFont(font_val)
{
	var font = "Arial";
	var name = "undefined";
	switch(font_val)
	{
		case '1':
			font = "Arial, Helvetica, sans-serif";
			name = "Arial";
			break;
		case '2':
			font = "'Palatino Linotype', 'Book Antiqua', Palatino, serif";
			name = "Palatino Linotype";
			break;
		case '3':
			font = "Tahoma, Geneva, sans-serif";
			name = "Tahoma";
			break;
		case '4':
			font = "Georgia, serif";
			name = "Georgia";
			break;
		case '5':
			font = "'Times New Roman', Times, serif";
			name = "Times New Roman";
			break;
		case '6':
			font = "'Comic Sans', 'Comic Sans MS', 'Chalkboard', 'ChalkboardSE-Regular', sans-serif";
			name = "Comic Sans MS";
			break;
		case '7':
			font = "Impact, Charcoal, sans-serif";
			name = "Impact";
			break;
		case '8':
			font = "'Lucida Sans Unicode', 'Lucida Grande', sans-serif";
			name = "Lucida Sans";
			break;
		case '9':
			font = "'Trebuchet MS', Helvetica, sans-serif";
			name = "Trebuchet MS";
			break;
		case '10':
			font = "Verdana, Geneva, sans-serif";
			name = "Verdana";
			break;
		case '11':
			font = "'Courier New', Courier, monospace";
			name = "Courier New";
			break;
		case '12':
			font = "'Lucida Console', Monaco, monospace";
			name = "Lucida Console";
			break;
		case '13':
			font = "Copperplate, 'Copperplate Gothic', sans-serif";
			name = "Copperplate Gothic";
			break;
		case '14':
			font = "'Gill Sans', 'Gill Sans MT', sans-serif";
			name = "Gill Sans";
			break;
		case '15':
			font = "script, cursive, sans-serif";
			name = "Cursive";
			break;
	}
	return font;
}
