document.addEventListener("DOMContentLoaded", () => {
    // Select polygons for Group 1 (Ray 1 to Ray 15)
    const raysGroup1 = Array.from(document.querySelectorAll("polygon[id^='ray1']"));

    // Select polygons for Group 2 (Ray 16 onwards)
    const raysGroup2 = Array.from(document.querySelectorAll("polygon[id^='ray2']"));

    // Select polygons for Group 3
    const raysGroup3 = Array.from(document.querySelectorAll("polygon[id^='ray3']"));

    // Store interval IDs for each ray
    const intervalMap = new Map();

    // Function to gradually change opacity in a loop
    function changeOpacityLoop(element, startOpacity, endOpacity, duration) {
        let opacity = startOpacity;
        let direction = 1; // 1 for increasing, -1 for decreasing
        const step = (endOpacity - startOpacity) / (duration / 50); // Adjust step size

        // Clear any existing interval for this element
        if (intervalMap.has(element)) {
            clearInterval(intervalMap.get(element));
        }

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

        // Store the interval ID for this element
        intervalMap.set(element, interval);
    }

    // Calculate the total duration for each group so they finish together
    const totalDuration = 10000; // Total duration for all groups to complete (in milliseconds)
    const group1Duration = totalDuration; // Slow opacity change for Group 1
    const group2Duration = totalDuration; // Slow opacity change for Group 2
    const group3Duration = totalDuration; // Slow opacity change for Group 3

    // Loop through each polygon in Group 1 and apply the fade-in/out effect
    raysGroup1.forEach((ray, index) => {
        setTimeout(() => {
            changeOpacityLoop(ray, 0, 1, group1Duration); // Slow opacity change
        }, index * 50); // Fast appearance
    });

    // Loop through each polygon in Group 2 and apply the fade-in/out effect
    raysGroup2.forEach((ray, index) => {
        setTimeout(() => {
            changeOpacityLoop(ray, 0, 1, group2Duration); // Slow opacity change
        }, index * 50); // Fast appearance
    });

    // Loop through each polygon in Group 3 and apply the fade-in/out effect
    raysGroup3.forEach((ray, index) => {
        setTimeout(() => {
            changeOpacityLoop(ray, 0, 1, group3Duration); // Slow opacity change
        }, index * 50); // Fast appearance
    });

    // After 10,000ms, switch to faster flickering with 1000ms duration and random delays
    setTimeout(() => {
        const allRays = [...raysGroup1, ...raysGroup2, ...raysGroup3];
        allRays.forEach((ray) => {
            const randomDelay = Math.random() * 1000; // Random delay between 0 and 1000ms
            setTimeout(() => {
                changeOpacityLoop(ray, 0.3, 1, 1000); // Faster flickering between 30% and 100% opacity
            }, randomDelay);
        });
    }, totalDuration); // Start faster flickering after 10,000ms
});