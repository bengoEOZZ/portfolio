import { useEffect, useRef } from 'react';

function useSunRaysAnimation() {
    const intervalMapRef = useRef(new Map());

    useEffect(() => {
        const changeOpacityLoop = (element, startOpacity, endOpacity, duration) => {
            let opacity = startOpacity;
            let direction = 1;
            const step = (endOpacity - startOpacity) / (duration / 50);

            if (intervalMapRef.current.has(element)) {
                clearInterval(intervalMapRef.current.get(element));
            }

            const interval = setInterval(() => {
                opacity += step * direction;
                element.style.opacity = opacity.toFixed(2);

                if (direction === 1 && opacity >= endOpacity) {
                    direction = -1;
                } else if (direction === -1 && opacity <= startOpacity) {
                    direction = 1;
                }
            }, 50);

            intervalMapRef.current.set(element, interval);
        };

        const initialFadeInDuration = 1000; // Duration for initial fade in
        const delayBetweenRays = 200; // Delay between each ray's animation

        // Get all Ray 1 polygons in order
        const ray1Polygons = Array.from({ length: 15 }, (_, i) => 
            document.querySelector(`polygon[id="ray1-${i + 1}"]`)
        ).filter(Boolean);

        const ray2Polygons = Array.from({ length: 70 }, (_, i) => 
            document.querySelector(`polygon[id="ray2-${i + 1}"]`)
        ).filter(Boolean);

        const ray3Polygons = Array.from({ length: 105 }, (_, i) => 
            document.querySelector(`polygon[id="ray3-${i + 1}"]`)
        ).filter(Boolean);

        const ray4Polygons = Array.from({ length: 76 }, (_, i) => 
            document.querySelector(`polygon[id="ray4-${i + 1}"]`)
        ).filter(Boolean);

        const ray5Polygons = Array.from({ length: 57 }, (_, i) => 
            document.querySelector(`polygon[id="ray5-${i + 1}"]`)
        ).filter(Boolean);

        // Sequential fade in for each polygon
        ray1Polygons.forEach((polygon, index) => {
            setTimeout(() => {
                changeOpacityLoop(polygon, 0, 1, initialFadeInDuration);
            }, index * delayBetweenRays);
        });

        ray2Polygons.forEach((polygon, index) => {
            setTimeout(() => {
                changeOpacityLoop(polygon, 0, 1, initialFadeInDuration);
            }, index * delayBetweenRays);
        });

        ray3Polygons.forEach((polygon, index) => {
            setTimeout(() => {
                changeOpacityLoop(polygon, 0, 1, initialFadeInDuration);
            }, index * delayBetweenRays);
        });

        ray4Polygons.forEach((polygon, index) => {
            setTimeout(() => {
                changeOpacityLoop(polygon, 0, 1, initialFadeInDuration);
            }, index * delayBetweenRays);
        });

        ray5Polygons.forEach((polygon, index) => {
            setTimeout(() => {
                changeOpacityLoop(polygon, 0, 1, initialFadeInDuration);
            }, index * delayBetweenRays);
        });
    }, []);
}

export default useSunRaysAnimation;