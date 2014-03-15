_onReady(function() {
    
    var moveRight = function(el) {
        fadeOut(el.querySelector(".moveRight"));
        fadeOut(el.querySelector(".moveLeft"));
        _console.log("moving right");
        var nextCol = "";
        var classList = el.parentNode.className;
        var end = false;
        if(classList.indexOf("column_todo")>=0)
            nextCol = ".column_inProgress";
        else if(classList.indexOf("column_inProgress")>=0)
            nextCol = ".column_toVerify";
        else if(classList.indexOf("column_toVerify")>=0)
            nextCol = ".column_done";
        else if(classList.indexOf("column_done")>=0)
            end = true;
        if(!end)
            document.querySelector(nextCol).appendChild(el);
        
    }
    var moveLeft = function(el) {
        fadeOut(el.querySelector(".moveRight"));
        fadeOut(el.querySelector(".moveLeft"));
        _console.log("moving left");
        var nextCol = "";
        var classList = el.parentNode.className.split(' ');
        var end = false;
        if(classList.indexOf("column_todo")>=0)
            end = true;
        else if(classList.indexOf("column_inProgress")>=0)
            nextCol = ".column_todo";
        else if(classList.indexOf("column_toVerify")>=0)
            nextCol = ".column_inProgress";
        else if(classList.indexOf("column_done")>=0)
            nextCol = ".column_toVerify";
        if(!end)
            document.querySelector(nextCol).appendChild(el);
    }
    var nodes = document.querySelectorAll(".note");
    for (var i = 0; i < nodes.length; ++i) {
        nodes[i].onmouseenter = function(e)
        {
            var targ = getEventTarget(e);
            while(targ.className.indexOf("note")<0)
            {
                targ = targ.parentNode;
            }
            fadeIn(targ.querySelector(".moveRight"));
            fadeIn(targ.querySelector(".moveLeft"));
        }
        nodes[i].onmouseleave = function(e)
        {
            var targ = getEventTarget(e);
            while(targ.className.indexOf("note")<0)
            {
                targ = targ.parentNode;
            }
            
            fadeOut(targ.querySelector(".moveRight"));
            fadeOut(targ.querySelector(".moveLeft"));
        }
    }
    var moveRightNodes = document.querySelectorAll(".moveRight");
    for (var i = 0; i < moveRightNodes.length; ++i) {
        moveRightNodes[i].onclick = function(e)
        {
            var targ = getEventTarget(e);
            while(targ.className.indexOf("note")<0)
            {
                targ = targ.parentNode;
            }
            moveRight(targ);
        }
    }
    var moveLeftNodes = document.querySelectorAll(".moveLeft");
    for (var i = 0; i < moveLeftNodes.length; ++i) {
        moveLeftNodes[i].onclick = function(e)
        {
            var targ = getEventTarget(e);
            while(targ.className.indexOf("note")<0)
            {
                targ = targ.parentNode;
            }
            moveLeft(targ);
        }
    }
    var temp = document.querySelectorAll(".moveLeft i, .moveRight i");
    for (var i = 0; i < temp.length; ++i) {
        temp[i].style.marginTop = temp[i].parentNode.offsetHeight/2 - 8;
    }
});