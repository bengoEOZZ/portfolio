window.onload = () => {
    const sunSvg = document.querySelector(".sun-svg");

    if (sunSvg) {
        let opacity = 1;
        let fadingOut = true;

        setInterval(() => {
            if (fadingOut) {
                opacity -= 0.05;
                if (opacity <= 0.3) {
                    fadingOut = false;
                }
            } else {
                opacity += 0.05;
                if (opacity >= 1) {
                    fadingOut = true;
                }
            }
            sunSvg.style.opacity = opacity.toFixed(2);
        }, 100); // Adjust the interval for smoother or faster transitions
    }
};