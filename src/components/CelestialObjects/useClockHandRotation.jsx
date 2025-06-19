import { useState, useRef, useEffect } from 'react';

const useClockHandRotation = () => {
    // Calculate initial rotation based on current time
    const getInitialRotation = () => {
        const now = new Date();
        const hours = now.getHours();
        return (hours * 15) % 360; // Each hour = 15 degrees (360/24 hours)
    };

    const [rotation, setRotation] = useState(getInitialRotation());
    const [isHolding, setIsHolding] = useState(false);
    const rotationIntervalRef = useRef(null);
    
    // Handle mouse down - start rotation
    const handleMouseDown = () => {
        setIsHolding(true);
    };
    
    // Handle mouse up - stop rotation
    const handleMouseUp = () => {
        setIsHolding(false);
    };
    
    // Effect to handle continuous rotation
    useEffect(() => {
        if (isHolding) {
            // Start continuous rotation when holding mouse
            rotationIntervalRef.current = setInterval(() => {
                setRotation(prev => prev + 2); // Rotate 2 degrees per interval
            }, 30); // Update every 30ms for smooth rotation
        } else if (rotationIntervalRef.current) {
            // Stop rotation when mouse released
            clearInterval(rotationIntervalRef.current);
        }
        
        // Clean up interval on unmount
        return () => {
            if (rotationIntervalRef.current) {
                clearInterval(rotationIntervalRef.current);
            }
        };
    }, [isHolding]);

    return {
        rotation,
        handleMouseDown,
        handleMouseUp
    };
};

export default useClockHandRotation;