alert('SceneScene1.js loaded');

//Globals
cur_article = 0;
last_article = null;

//this.arrayArticles = [];

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
		//case sf.key.KEY_RETURN:
		case sf.key.RED:
			article_comments = $('#article' + cur_article + "a.comments" );
			link_to_comments = article_comments.attr("herf");
			alert("going to comments with: " + link_to_comments);
			window.location = "http://www.reddit.com/" + link_tocomments + ".json";
			sf.scene.show('comments', {permalink : link_to_comments } );    // goto comments
		    sf.scene.focus('comments');
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
  //  this.arrayArticles.push(info);    
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
        $(article).append('<p class="Comments"> <a class="comments" href="' + info.permalink + '">'+ info.num_comments + '</a></p>');
        
        
        $(article).append('<a class="permalink" + href"' + info.permalink + '"/>');
        
        //<div class="entry unvoted"><p class="title">
        //<a class="title loggedin" href="http://i.imgur.com/dDlMmE9.jpg" tabindex="1">I'm in Shanghai and they are experiencing the worst air pollution on record. This is the view out my hotel window. The building you can barely see is about 1/4 mile away.</a> <span class="domain">(<a href="/domain/i.imgur.com/">i.imgur.com</a>)</span></p><p class="tagline">submitted <time title="Fri Dec 6 05:25:04 2013 UTC" datetime="2013-12-06T05:25:04+00:00">7 hours</time> ago by <a href="http://www.reddit.com/user/mepper" class="author id-t2_4g3lx">mepper</a><span class="userattrs"></span> to <a href="http://www.reddit.com/r/WTF/" class="subreddit hover">WTF</a></p><ul class="flat-list buttons"><li class="first"><a class="comments" href="http://www.reddit.com/r/WTF/comments/1s81n7/im_in_shanghai_and_they_are_experiencing_the/" target="_parent">2131 comments</a></li><li class="share"><span class="share-button toggle" style=""><a class="option active login-required" href="#" tabindex="100" onclick="return toggle(this, share, cancelShare)">share</a><a class="option " href="#">cancel</a></span></li><li><form action="/post/save" method="post" class="state-button save-button"><input type="hidden" name="executed" value="unsave"><span><a href="javascript:void(0)" onclick="toggle_save(this)">save</a></span></form></li><li><form action="/post/hide" method="post" class="state-button hide-button"><input type="hidden" name="executed" value="hidden"><span><a href="javascript:void(0)" onclick="change_state(this, 'hide', hide_thing);">hide</a></span></form></li><li><form class="toggle report-button " action="#" method="get"><input type="hidden" name="executed" value="reported"><span class="option main active"><a href="#" class="togglebutton" onclick="return toggle(this)">report</a></span><span class="option error">are you sure?  <a href="javascript:void(0)" class="yes" onclick="change_state(this, &quot;report&quot;, hide_thing, undefined, null)">yes</a> / <a href="javascript:void(0)" class="no" onclick="return toggle(this)">no</a></span></form></li></ul><div class="expando" style="display: none"><span class="error">loading...</span></div></div>
        
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