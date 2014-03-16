//declaration is before dom is ready
var adminOptions = new Object();
adminOptions.shrinkBoard = false;
var setAdminOption = function(adminOption, value)
{
    switch (adminOption)
    {
        case "shrinkBoard":
            adminOptions.shrinkBoard = value;
            if(value)
                document.querySelector("#board").classList.add("withAdminBar");
            else
                document.querySelector("#board").classList.remove("withAdminBar");
            break;
    }
}
_onReady(function() {
    var initAdminOptions = function() {

        switch(document.getElementById("adminOptions").querySelector(".shrinkBoard > input:checked").value)
        {
            case "true":
                adminOptions.shrinkBoard = true;
                break;
            default:
                adminOptions.shrinkBoard = false;
                break;
        }

    }
    var moveRight = function(el) {
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
        {
            el.style.opacity = 0;
            document.querySelector(nextCol).appendChild(el);
            if(el.id)location.href="#" + el.id;
            fadeIn(el);
        }
    }
    var moveLeft = function(el) {
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
        {
            el.style.opacity = 0;
            document.querySelector(nextCol).appendChild(el);
            if(el.id)location.href="#" + el.id;
            fadeIn(el);
        }
    }
    var dragSrcEl = null;
    function handleDragStart(e) {
        this.style.opacity = '0.4';  // this / e.target is the source node.

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData(Element, this);
    }
    function handleDrop(e) {
        // this / e.target is current target element.

        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }

        // See the section on the DataTransfer object.

        return false;
    }

    function handleDragEnd(e) {
        // this/e.target is the source node.
        fadeIn(this);
        [].forEach.call(dropables, function(col) {
            col.classList.remove('over');
        });
    }
    function handleDragOver(e) {
        this.classList.add('over');
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }
        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
        return false;
    }
    function handleDragEnter(e) {
        // this / e.target is the current hover target.
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');  // this / e.target is previous target element.
    }
    function handleDrop(e) {
        // this/e.target is current target element.

        if (e.stopPropagation) {
            e.stopPropagation(); // Stops some browsers from redirecting.
        }
        this.appendChild(dragSrcEl);
        return false;
    }
    var draggables = document.querySelectorAll('[draggable]');
    [].forEach.call(draggables, function(col) {
        col.addEventListener('dragstart', handleDragStart, false);
        col.addEventListener('dragend', handleDragEnd, false);
    });
    var dropables = document.querySelectorAll('[dropable]');
    [].forEach.call(dropables, function(col) {
        col.addEventListener('dragover', handleDragOver, false);
        col.addEventListener('dragenter', handleDragEnter, false);
        col.addEventListener('dragleave', handleDragLeave, false);
        col.addEventListener('drop', handleDrop, false);
    });

    var moveRightNodes = document.querySelectorAll(".moveRight");
    for (var i = 0; i < moveRightNodes.length; ++i) {
        moveRightNodes[i].addEventListener("click", function(event)
                                           {
                                               moveRight(this.parentNode);
                                           }, false);
    }
    var moveLeftNodes = document.querySelectorAll(".moveLeft");
    for (var i = 0; i < moveLeftNodes.length; ++i) {
        moveLeftNodes[i].addEventListener("click", function(event)
                                          {
                                              moveLeft(this.parentNode);
                                          }, false);
    }
    function handleHandleBarClick(e) {
        if(this.parentNode.classList.contains("closed"))
        {
            console.log(adminOptions.shrinkBoard);
            if(adminOptions.shrinkBoard)
                document.querySelector("#board").classList.add("withAdminBar");
            this.parentNode.classList.remove("closed");
            this.parentNode.classList.add("opened");
            this.querySelector("i").classList.remove("fa-angle-double-right");
            this.querySelector("i").classList.add("fa-angle-double-left");
        }
        else
        {
            console.log(adminOptions.shrinkBoard);
            if(adminOptions.shrinkBoard)
                document.querySelector("#board").classList.remove("withAdminBar");
            this.parentNode.classList.remove("opened");
            this.parentNode.classList.add("closed");
            this.querySelector("i").classList.remove("fa-angle-double-left");
            this.querySelector("i").classList.add("fa-angle-double-right");
        }
    }
    var handleBar = document.querySelector("#sidebar .handleBar");
    handleBar.addEventListener("click", handleHandleBarClick, false);
    initAdminOptions();
});

