alert('Scenecomments.js loaded');

this.permalink = null;
samplelink = "http://www.reddit.com/r/learnprogramming/comments/1s8k2y/trying_to_understand_something_about_reddits_code/";
function Scenecomments() {

};

function parse_comments(data, textStatus, jqXHR) {
    // Handle each article
  //  $(data.data.children).each(handle_article);    
    
 }



Scenecomments.prototype.initialize = function () {
	alert("Scenecomments.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	$('#list').sfList({
		data:['item1', 'item2', 'item3'],
		index:0
	});
};

Scenecomments.prototype.handleShow = function (data) {
	alert("Scenecomments.handleShow()");
	alert("link" + data.permalink);
	this.permalink = data.permalink;
	 $.getJSON("http://www.reddit.com/r/learnprogramming/comments/1s8k2y/trying_to_understand_something_about_reddits_code/.json", null, null);
	 alert('samplelink' + samplelink);
	 window.location = this.samplelink;
	// this function will be called when the scene manager show this scene
};

Scenecomments.prototype.handleHide = function () {
	alert("Scenecomments.handleHide()");
	// this function will be called when the scene manager hide this scene
};

Scenecomments.prototype.handleFocus = function () {
	alert("Scenecomments.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

Scenecomments.prototype.handleBlur = function () {
	alert("Scenecomments.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

Scenecomments.prototype.handleKeyDown = function (keyCode) {
	alert("Scenecomments.handleKeyDown(" + keyCode + ")");
	// TODO : write a key event handler when this scene get focused
	switch (keyCode) {
		case sf.key.LEFT:
			break;
		case sf.key.RIGHT:
			break;
		case sf.key.UP:
			break;
		case sf.key.DOWN:
			break;
		case sf.key.ENTER:
			window.location = this.permalink;
			break;
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};
