



function openContent(event, contentName) {
    var i;              // counter
    var tabcontent;
    var tablinks;


    // hide currently visible content
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // set all buttons to inactive
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }


    document.getElementById(contentName).style.display = "block";
    event.currentTarget.className += " active";
}