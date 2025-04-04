// ************************** Skills Menu Scroll **************************
// get the element to make fixed
var fixedElement = document.getElementById("fixed-left");

// get the offset of the element from the top of the page
var fixedElementOffsetTop = fixedElement.offsetTop;

// listen for scroll events
window.addEventListener("scroll", function () {
    // check if the user has scrolled past the offset of the fixed element
    if (window.pageYOffset >= fixedElementOffsetTop) {
        // apply the fixed position
        fixedElement.style.position = "fixed";
        fixedElement.style.top = "0";
    } else {
        // remove the fixed position
        fixedElement.style.position = "static";
    }
});