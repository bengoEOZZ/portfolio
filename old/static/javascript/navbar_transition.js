const nav = document.querySelector('#navigation-header');
const navTop = nav.offsetTop;
function fixNav() {
    if (window.scrollY >= navTop) {
        document.body.classList.add('fixed-nav');
    } else {
        document.body.classList.remove('fixed-nav');
    }
}
window.addEventListener('scroll', fixNav);