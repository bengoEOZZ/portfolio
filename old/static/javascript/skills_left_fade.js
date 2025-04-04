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
    var boxes = document.querySelectorAll('.left');
    for (var i = 0; i < boxes.length; i++) {
        if (isElementInViewport(boxes[i])) {
            boxes[i].classList.add('left-show');
            boxes[i].classList.remove('left-hidden');
        } else {
            boxes[i].classList.remove('left-show');
            boxes[i].classList.add('left-hidden');
        }
    }
}

window.addEventListener('scroll', handleVisibility);
window.addEventListener('resize', handleVisibility);
window.addEventListener('load', handleVisibility);
// * * * * * * * * * * END * * * * * * * * * *