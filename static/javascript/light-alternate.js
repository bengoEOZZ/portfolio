document.addEventListener("DOMContentLoaded", () => {
    // Select all polygons with IDs starting with "ray"
    const rays = Array.from(document.querySelectorAll("polygon[id^='ray']"));

    // Function to gradually change opacity in a loop
    function changeOpacityLoop(element, startOpacity, endOpacity, duration) {
        let opacity = startOpacity;
        let direction = 1; // 1 for increasing, -1 for decreasing
        const step = (endOpacity - startOpacity) / (duration / 50); // Adjust step size

        const interval = setInterval(() => {
            opacity += step * direction;
            element.style.opacity = opacity.toFixed(2);

            // Reverse direction when reaching the target opacity
            if (direction === 1 && opacity >= endOpacity) {
                direction = -1; // Start decreasing
            } else if (direction === -1 && opacity <= startOpacity) {
                direction = 1; // Start increasing
            }
        }, 50); // Adjust interval speed
    }

    // Loop through each polygon and apply the fade-in/out effect
    rays.forEach((ray, index) => {
        setTimeout(() => {
            changeOpacityLoop(ray, 0, 1, 1000); // Fade in and out each ray over 1 second
        }, index * 500); // Delay each fade by 0.5 seconds
    });
});