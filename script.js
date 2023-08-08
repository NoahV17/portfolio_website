function myFunction() {
    let text = document.getElementById("myInput").value;
    document.getElementById("demo").innerHTML = "You wrote: " + text;
}

window.onscroll = function() {scrolling()};

function scrolling() {
    let pos = window.scrollY;
    const elem = document.getElementById("bubbles");
    if (pos < 500) {
        elem.style.width = pos + "px";
        elem.style.height = pos + "px";
    } 
    console.log("workingww");
}

