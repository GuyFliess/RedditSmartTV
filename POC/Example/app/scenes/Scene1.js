alert('SceneScene1.js loaded');

//Globals
cur_article = 0;
last_article = null;

// Functions
function SceneScene1() {

};

SceneScene1.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene1.handleKeyDown(" + keyCode + ")");
	// TODO : write a key event handler when this scene get focused
	switch (keyCode) {
		case sf.key.LEFT:
			break;
		case sf.key.RIGHT:
			break;
		case sf.key.UP:
			if (cur_article > 0) {
				unmarkSelector($('#article'+cur_article));
	            cur_article--;
	            markSelector($('#article'+cur_article));
	        }
			break;
		case sf.key.DOWN:
			if (cur_article < 25) {
				unmarkSelector($('#article'+cur_article));
	            cur_article++;
	            markSelector($('#article'+cur_article));
	        }
			break;
		case sf.key.ENTER:
			article_title = $('#article'+ cur_article + " a.title");
			window.location = article_title.attr("href");
			break;
		case sf.
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};

function markSelector(x) {
    x.css("backgroundColor", "#FFFF99");
    x.css("borderColor", "#FF6666");
} 

function unmarkSelector(x) {
    if (null != x) {
        x.css("backgroundColor", "");
        x.css("borderColor", "");
    }
}

function handle_article( index ) {
    info = this.data;
        
    // Start article
    $("#siteTable").append('<div id=article'+index+' class="thing link">');
    article = $('#article'+index);
    
    // Add the rank
    $(article).append('<span class="rank">' + (index+1) + '</span>');
    
    // Add the score + voting buttons
    //$(article).append('<div class="midcol">');
    //$(article).append('<div class="arrow up login-required">U</div>');
    //$(article).append('<div class="score unvoted">' + info.score + '</div>');
    //$(article).append('<div class="arrow down login-required">D</div>');
    //$(article).append('</div>');
    
    // Add the thumbnail
    if (info.thumbnail != "") {
        $(article).append('<a class="thumbnail default" href="' + info.url + '">);<img width="70" height="46" alt="" src="' + info.thumbnail + '"></a>');
    }
    
    // Add the entry
    $(article).append('<div class="entry">');
        
        // Add title
        $(article).append('<p class="title"> <a class="title" href="' + info.url + '"> ' + info.title + '</a></p>');   
    
        // Add tagline
        $(article).append('<p class="tagline"> submitted by ' + info.author + '</p>');
        
        // Add buttons
        
    // End the entry
    $(article).append('<div class="clearleft"></div>');
    $(article).append('</div>');
    
    // End article
    $("#siteTable").append('</div>');
    $("#siteTable").append('<div class="clearleft"></div>');
    
}

function parse_reddit(data, textStatus, jqXHR) {
    // Handle each article
    $(data.data.children).each(handle_article);    
 }

SceneScene1.prototype.initialize = function () {
	alert("SceneScene1.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
};

SceneScene1.prototype.handleShow = function (data) {
	alert("SceneScene1.handleShow()");
	
	// Get the main page articles
    $.getJSON("http://www.reddit.com/.json", null, parse_reddit);
};

SceneScene1.prototype.handleHide = function () {
	alert("SceneScene1.handleHide()");
	// this function will be called when the scene manager hide this scene
};

SceneScene1.prototype.handleFocus = function () {
	alert("SceneScene1.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneScene1.prototype.handleBlur = function () {
	alert("SceneScene1.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};