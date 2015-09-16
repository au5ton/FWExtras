function scrollToBottom()
{
	var objDiv = document.getElementById("chatbox");
	objDiv.scrollTop = objDiv.scrollHeight;
	var pmBox = document.getElementById("pm");
	pmBox.scrollTop = pmBox.scrollHeight;
}
