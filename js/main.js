function openNav() {
    document.getElementById("sidebar").style.width = "160px";
    document.getElementById("sidebar").style.padding = "20px";
    document.getElementById("x").style.visibility = "visible";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("sidebar").style.padding = "0";
    document.getElementById("x").style.visibility = "hidden";
}