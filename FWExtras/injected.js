/*

onSumResponse()
create an object named xhReq with a property responseText
fool fluff's code into thinking it got the result of a xmlhttpreq
i dunnno about private aliases, i feel like it would end up making the chat
filled with screenshots of how they renamed people or something
or better yet make a XHR yourself and name it xhReq, then call onSumReponse(), or
rewrite the code yourself (better option)
its in scripts/auto_refresh_home.js
*/

function scrollToBottom()
{
	var objDiv = document.getElementById("chatbox");
	objDiv.scrollTop = objDiv.scrollHeight;
	var pmBox = document.getElementById("pm");
	pmBox.scrollTop = pmBox.scrollHeight;
	console.log("Tried to scroll to the bottom.");
}
var titleText = "";
var notifs = 0;
function processResponse(serverResponse)
{
	console.log("Processing response...");
	console.log(serverResponse);
	if(serverResponse !== "[[]]")
	{
		if(serverResponse == "logout")
		{
			window.location.href = "scripts/logout.php";
			return;
		}
		var obj = JSON.parse(serverResponse);
		var user_id = obj[0];
		var username = obj[1];
		var chat = obj[2];
		var pm = obj[3];
		for(var i = 0; i < chat.length; i++)
		{
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
				content.setAttribute('onclick', 'expandMessage(this)');
				content.style.color = "#" + chat[i]['color'];
				content.style.backgroundColor = "#" + chat[i]['secondary_color'];
				content.style.fontFamily = chat[i]['font'];
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
				content.setAttribute('onclick', 'expandMessage(this)');
				content.style.color = "#" + chat[i]['color'];
				content.style.backgroundColor = "#" + chat[i]['secondary_color'];
				content.style.fontFamily = chat[i]['font'];
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
			document.getElementById("chatbox").appendChild(newmsg);
		}
		if(chat.length > 0)
		{
			//var chatDiv = document.getElementById("chatbox");
			//chatDiv.scrollTop = chatDiv.scrollHeight;
			document.getElementById("chatbox").style.backgroundColor = "#FFFFFF";
			setTimeout(function(){document.getElementById("chatbox").style.backgroundColor = "#1C1C1C";}, 250);
			setTimeout(function(){document.getElementById("chatbox").style.backgroundColor = "#FFFFFF";}, 500);
			setTimeout(function(){document.getElementById("chatbox").style.backgroundColor = "#1C1C1C";}, 750);
			document.getElementById("chat_sound").play();
			notifs += chat.length;
		}

		for(var i = 0; i < pm.length; i++)
		{
			var pmtime = document.createElement("DIV");
			pmtime.setAttribute('class', "pm_time");
			var namelink = document.createElement("A");
			namelink.setAttribute('class', "pm_user");
			namelink.setAttribute('href', "#");
			namelink.setAttribute('onclick', "setRecepient(this.innerHTML);return false;");
			var msg = document.createElement("DIV");
			msg.setAttribute('class', "pm_msg");
			if(username.toLowerCase() == pm[i]['from_user'].toLowerCase())
			{
				namelink.style.color = "#" + pm[i]['to_color'];
				namelink.style.backgroundColor = "#" + pm[i]['to_secondary'];
				namelink.style.fontFamily = pm[i]['to_font'];
				namelink.appendChild(document.createTextNode(pm[i]['send_to']));
			}
			else
			{
				namelink.style.color = "#" + pm[i]['color'];
				namelink.style.backgroundColor = "#" + pm[i]['secondary_color'];
				namelink.style.fontFamily = pm[i]['font'];
				namelink.appendChild(document.createTextNode(pm[i]['from_user']));
			}
			pmtime.appendChild(namelink);
			pmtime.appendChild(document.createTextNode(" - "));
			pmtime.appendChild(document.createTextNode(pm[i]['date']));
			msg.style.color = "#" + pm[i]['color'];
			msg.style.backgroundColor = "#" + pm[i]['secondary_color'];
			msg.style.fontFamily = pm[i]['font'];
			msg.appendChild(document.createTextNode(pm[i]['content']));
			if(pm[i]['attachmentid'] != '0')
			{
				var attdiv = document.createElement("DIV");
				attdiv.setAttribute('class', "attachment_pm");
				var a = document.createElement("A");
				a.setAttribute('href', "getattachment.php?file=" + pm[i]['url_filename']);
				a.setAttribute('target', "_blank");
				a.style.color = "#" + pm[i]['color'];
				a.appendChild(document.createTextNode(pm[i]['filename']));
				attdiv.appendChild(a);
				attdiv.appendChild(document.createTextNode(" ("));
				var span = document.createElement("SPAN");
				span.style.color = "#" + pm[i]['color'];
				span.appendChild(document.createTextNode(pm[i]['size']));
				attdiv.appendChild(span);
				attdiv.appendChild(document.createTextNode(")"));
				msg.appendChild(attdiv);
			}
			document.getElementById("pm").appendChild(pmtime);
			document.getElementById("pm").appendChild(msg);
		}
		if(pm.length > 0)
		{
			//var pmDiv = document.getElementById("pm");
			//pmDiv.scrollTop = pmDiv.scrollHeight;
			document.getElementById("pm_sound").play();
			notifs += chat.length;
		}
		if(notifs > 0 && (pm.length > 0 || chat.length > 0))
		{
			document.title = "(" + notifs + ") " + titleText;
		}
	}
	console.log("Response should be finished processing.");
}

(function main() {

	var sendButton = $("[name='chat_submit']");
	var sendButtonType;
	var chatTextBox = $("#chat_text");
	var tempCount = 0;

	function refreshChat() {
		console.log("Refreshing chat...");
		jQuery.get("scripts/auto_refresh_home.php",function(res){
			console.log("Chat diff retrieved.");
			processResponse(res);
		});
	}

	if(window.location.pathname === "/home.php") {
		//Refresh chat button
		var refreshButton = document.createElement("span");
		refreshButton.setAttribute("id","refresh_button");
		refreshButton.setAttribute("class", "refresh-button");
		refreshButton.setAttribute("title","Refresh the chat");
		refreshButton.innerHTML = "@";

		$("[name='chat_submit']").after(refreshButton);
		$("#refresh_button").on("click",refreshChat);
	}
	else if(window.location.pathname === "/user.php") {
		//Aliases
		var currentUser = $("#js_username").html();
		var aliasButton = document.createElement("span");
		aliasButton.setAttribute("id","alias_button");
		aliasButton.setAttribute("title","Edit this user's alias");
		aliasButton.innerHTML = "+";
		$("#js_username").after(aliasButton);

		var aliasLabel = document.createElement("div");
		aliasLabel.setAttribute("id","alias_label");
		aliasLabel.setAttribute("title","This is this user's alias. Click to refresh.");
		if(Cookies.get("alias_"+currentUser) !== undefined && Cookies.get("alias_"+currentUser) !== null) {
			aliasLabel.innerHTML = Cookies.get("alias_"+currentUser);
		}
		$("#alias_button").after(aliasLabel);

		$("#alias_button").on("click", function(){
			if(Cookies.get("alias_"+currentUser) !== undefined) {
				alert("This user already has an alias. This will overwrite their current alias. Press cancel to cancel. Leave empty for no alias.");
			}
			var input = prompt("Enter an alias for "+currentUser+":","");
			console.log(input);
			Cookies.set("alias_"+currentUser,input);
			$("#alias_label").trigger("click");
		});

		$("#alias_label").on("click", function(){
			if(Cookies.get("alias_"+currentUser) !== undefined && Cookies.get("alias_"+currentUser) !== null) {
				aliasLabel.innerHTML = Cookies.get("alias_"+currentUser);
			}
			else {
				aliasLabel.innerHTML = "";
			}
		});

	}

})();
