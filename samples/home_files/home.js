var pmForm = 0;
var mcServer = 219;
var onlineUsers = 0;
var officialMembers = -219;
var team = -254;
var leaderSummary = 0;
var weekly = 254;
var monthly = 508;
var alltime = 762;
var expandMessages = 0;

function bottomLeftBoxLeft()
{
	if(document.getElementById("official_members") === null)
	{
		if(onlineUsers < 0)
		{
			onlineUsers += 219;
			document.getElementById("online_users").style.left = onlineUsers + "px";
			mcServer +=219;
			document.getElementById("minecraft_server").style.left = mcServer + "px";
		}
	}
	else
	{
		if(onlineUsers < 219)
		{
			onlineUsers += 219;
			document.getElementById("online_users").style.left = onlineUsers + "px";
			mcServer +=219;
			document.getElementById("minecraft_server").style.left = mcServer + "px";
			officialMembers += 219;
			document.getElementById("official_members").style.left = officialMembers + "px";
		}
	}
}

function bottomLeftBoxRight()
{
	if(document.getElementById("official_members") === null)
	{
		if(onlineUsers > -219)
		{
			onlineUsers -= 219;
			document.getElementById("online_users").style.left = onlineUsers + "px";
			mcServer -=219;
			document.getElementById("minecraft_server").style.left = mcServer + "px";
		}
	}
	else
	{
		if(onlineUsers > -219)
		{
			onlineUsers -= 219;
			document.getElementById("online_users").style.left = onlineUsers + "px";
			mcServer -=219;
			document.getElementById("minecraft_server").style.left = mcServer + "px";
			officialMembers -= 219;
			document.getElementById("official_members").style.left = officialMembers + "px";
		}
	}
}

function leaderboardLeft()
{
	if(leaderSummary < 254)
	{
		leaderSummary += 254;
		document.getElementById("leaderboard_summary").style.left = leaderSummary + "px";
		weekly += 254;
		document.getElementById("leaderboard_weekly").style.left = weekly + "px";
		team += 254;
		document.getElementById("leaderboard_teams").style.left = team + "px";
		monthly += 254;
		document.getElementById("leaderboard_monthly").style.left = monthly + "px";
		alltime += 254;
		document.getElementById("leaderboard_alltime").style.left = alltime + "px";
	}
}

function leaderboardRight()
{
	if(leaderSummary > -762)
	{
		leaderSummary -= 254;
		document.getElementById("leaderboard_summary").style.left = leaderSummary + "px";
		weekly -= 254;
		document.getElementById("leaderboard_weekly").style.left = weekly + "px";
		team -= 254;
		document.getElementById("leaderboard_teams").style.left = team + "px";
		monthly -= 254;
		document.getElementById("leaderboard_monthly").style.left = monthly + "px";
		alltime -= 254;
		document.getElementById("leaderboard_alltime").style.left = alltime + "px";
	}
}

function expandMessage(e)
{
	if(expandMessages == 0)
	{
		e.style.overflow = "auto";
		expandMessages = 1;
	}
	else
	{
		expandMessages = 0;
		e.style.overflow = "hidden";
	}
}

function showChatFile()
{
	document.getElementById("chat_file_link").style.display = "none";
	document.getElementById("chat_text").style.width = "396px";
	document.getElementById("chat_file").style.display = "inline";
}

function showPmForm()
{
	if(pmForm == 0)
	{
		document.getElementById("pm").style.height = "205px";
		document.getElementById("pm_form").style.display = "block";
		pmForm = 1;
	}
	else
	{
		document.getElementById("pm").style.height = "280px";
		//document.getElementById("pm_form").style.display = "none";
		pmForm = 0;
	}
}

function showScore(mode)
{
	if(mode == 1)
	{
		document.getElementById("sotd_score_box").style.opacity = "100";
		document.getElementById("sotd_score_box").style.visibility = "visible";
	}
	else
	{
		document.getElementById("sotd_score_box").style.opacity = "0";
		document.getElementById("sotd_score_box").style.visibility = "hidden";
	}
}

function scrollToBottom()
{
	var objDiv = document.getElementById("chatbox");
	objDiv.scrollTop = objDiv.scrollHeight;
	var pmBox = document.getElementById("pm");
	pmBox.scrollTop = pmBox.scrollHeight;
}

function setRecepient(to)
{
	pmForm = 0;
	showPmForm();
	document.getElementById("pm_to").value = to;
}