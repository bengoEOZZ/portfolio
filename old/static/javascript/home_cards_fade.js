// * * * * * * * * * * Fade In Transition * * * * * * * * * *
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleVisibility() {
    var boxes = document.querySelectorAll('.box');
    for (var i = 0; i < boxes.length; i++) {
        if (isElementInViewport(boxes[i])) {
            boxes[i].classList.add('box-show');
            boxes[i].classList.remove('box-hidden');
            boxes[i].style.transitionDelay = i * 0.1 + 's'; // Add delay based on index
        } else {
            boxes[i].classList.remove('box-show');
            boxes[i].classList.add('box-hidden');
            boxes[i].style.transitionDelay = ''; // Remove delay if not in viewport
        }
    }
}

window.addEventListener('scroll', handleVisibility);
window.addEventListener('resize', handleVisibility);
window.addEventListener('load', handleVisibility);
// * * * * * * * * * * END * * * * * * * * * *