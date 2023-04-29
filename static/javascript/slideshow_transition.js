// * * * * * * * * * * Slidshow Transition * * * * * * * * * *
// get references to the container and all images
const container = $("#slideshow-container");
const images = container.find(".slideshow-image");
// set initial image index and display the first image
let currentIndex = 0;
images.eq(currentIndex).css("opacity", "1");
// create a function to show the next image
function showNextImage() {
    // hide the current image
    images.eq(currentIndex).css("opacity", "0");
    // increment the index, wrapping around if necessary
    currentIndex = (currentIndex + 1) % images.length;
    // show the next image
    images.eq(currentIndex).css("opacity", "1");
}
// call the showNextImage function every 8 seconds
setInterval(showNextImage, 8000);
// * * * * * * * * * * Slidshow END * * * * * * * * * *