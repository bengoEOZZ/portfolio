import { useEffect, useRef } from 'react';

function useSunRaysAnimation(rotation) {
    const intervalMapRef = useRef(new Map());
    const timeoutRef = useRef([]);
    const prevTimePeriodRef = useRef(null);

    useEffect(() => {
        // Calculate current hour from rotation
        const currentHour = ((12 + Math.floor((rotation % 360) / 15)) % 24);
        
        // Determine time period (0=morning, 1=afternoon, 2=evening)
        let currentTimePeriod;
        if (currentHour >= 0 && currentHour <= 12) {
            currentTimePeriod = 0; // Morning
        } else if (currentHour >= 13 && currentHour <= 18) {
            currentTimePeriod = 1; // Afternoon
        } else {
            currentTimePeriod = 2; // Evening
        }
        
        // Only reset animation if we cross a time period boundary
        const timePeriodChanged = prevTimePeriodRef.current !== null && 
                                 prevTimePeriodRef.current !== currentTimePeriod;
                                 
        // Store current time period for next comparison
        prevTimePeriodRef.current = currentTimePeriod;
        
        // Clear all animations when crossing time boundaries
        const resetAnimations = () => {
            // Clear all intervals
            intervalMapRef.current.forEach((interval) => clearInterval(interval));
            intervalMapRef.current.clear();
            
            // Clear all timeouts
            timeoutRef.current.forEach(timeout => clearTimeout(timeout));
            timeoutRef.current = [];
            
            // Reset opacity of all polygons to 0
            for (let rayNum = 1; rayNum <= 5; rayNum++) {
                for (let i = 1; i <= 150; i++) {
                    const polygon = document.querySelector(`polygon[id="ray${rayNum}-${i}"]`);
                    if (polygon) {
                        polygon.style.opacity = '0';
                    }
                }
            }
        };
        
        // If time period changed, reset animations
        if (timePeriodChanged) {
            resetAnimations();
        }

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

        const initialFadeInDuration = 1000;
        const delayBetweenRays = 200;
        
        // Define ray configurations based on time of day
        let rayConfigs;
        
        if (currentHour >= 0 && currentHour <= 12) {
            // Morning hours (00:00-12:00) configuration
            rayConfigs = {
                ray1: { length: 4, pattern: i => i + 1 },
                ray2: { length: 15, pattern: i => i + 1 },
                ray3: { length: 40, pattern: i => i + 1 },
                ray4: { length: 25, pattern: i => i + 1 },
                ray5: { length: 20, pattern: i => i + 1 }
            };
        } else if (currentHour >= 13 && currentHour <= 18) {
            // Afternoon hours (13:00-18:00) configuration
            rayConfigs = {
                ray1: { length: 15, pattern: i => i + 1 },
                ray2: { length: 70, pattern: i => i + 1 },
                ray3: { length: 105, pattern: i => i + 1 },
                ray4: { length: 76, pattern: i => i + 1 },
                ray5: { length: 57, pattern: i => i + 1 }
            };
        } else {
            // Evening/night hours (19:00-24:00) configuration
            rayConfigs = {
                ray1: { length: 15, pattern: i => i * 3 + 1 },
                ray2: { length: 70, pattern: i => i * 3 + 1 },
                ray3: { length: 105, pattern: i => i * 3 + 1 },
                ray4: { length: 76, pattern: i => i * 3 + 1 },
                ray5: { length: 57, pattern: i => i * 3 + 1 }
            };
        }
        
        // Get ray polygons based on current configuration
        const ray1Polygons = Array.from({ length: rayConfigs.ray1.length }, (_, i) => 
            document.querySelector(`polygon[id="ray1-${rayConfigs.ray1.pattern(i)}"]`)
        ).filter(Boolean);

        const ray2Polygons = Array.from({ length: rayConfigs.ray2.length }, (_, i) => 
            document.querySelector(`polygon[id="ray2-${rayConfigs.ray2.pattern(i)}"]`)
        ).filter(Boolean);

        const ray3Polygons = Array.from({ length: rayConfigs.ray3.length }, (_, i) => 
            document.querySelector(`polygon[id="ray3-${rayConfigs.ray3.pattern(i)}"]`)
        ).filter(Boolean);

        const ray4Polygons = Array.from({ length: rayConfigs.ray4.length }, (_, i) => 
            document.querySelector(`polygon[id="ray4-${rayConfigs.ray4.pattern(i)}"]`)
        ).filter(Boolean);

        const ray5Polygons = Array.from({ length: rayConfigs.ray5.length }, (_, i) => 
            document.querySelector(`polygon[id="ray5-${rayConfigs.ray5.pattern(i)}"]`)
        ).filter(Boolean);
        
        // Keep track of all timeouts to clear them when needed
        const setupAnimation = (polygons) => {
            polygons.forEach((polygon, index) => {
                const timeout = setTimeout(() => {
                    changeOpacityLoop(polygon, 0, 1, initialFadeInDuration);
                }, index * delayBetweenRays);
                
                timeoutRef.current.push(timeout);
            });
        };
        
        // Setup animations for all rays
        setupAnimation(ray1Polygons);
        setupAnimation(ray2Polygons);
        setupAnimation(ray3Polygons);
        setupAnimation(ray4Polygons);
        setupAnimation(ray5Polygons);
        
        return () => {
            // Cleanup on unmount
            intervalMapRef.current.forEach((interval) => clearInterval(interval));
            timeoutRef.current.forEach(timeout => clearTimeout(timeout));
        };
        
    }, [rotation]); // Re-run when rotation changes
}

export default useSunRaysAnimation;