import { useEffect, useRef } from 'react';

function useOrbitAnimation(buttonsRef, buttonClassName) {
    const animationRef = useRef(null);
    const angleRef = useRef(0);

    useEffect(() => {
        const buttonsWrapper = buttonsRef.current;
        if (!buttonsWrapper) return;

        // Use the scoped class name
        const buttons = buttonsWrapper.querySelectorAll(`.${buttonClassName}`);
        const horizontalRadius = 900;
        const verticalRadius = 600;
        const centerX = buttonsWrapper.offsetWidth / 2;
        const centerY = buttonsWrapper.offsetHeight / 2;
        let forceZIndex = true;

        // Initial positions
        buttons.forEach((button) => {
            button.style.position = "absolute";
            button.style.left = `${centerX - button.offsetWidth / 2}px`;
            button.style.top = `${centerY - button.offsetHeight / 2}px`;
        });

        // Animate buttons outward
        const timeoutId = setTimeout(() => {
            buttons.forEach((button, index) => {
                const offset = (index * Math.PI * 2) / buttons.length;
                const x = centerX + horizontalRadius * Math.cos(offset) - button.offsetWidth / 2;
                const y = centerY + verticalRadius * Math.sin(offset) - button.offsetHeight / 2;

                button.style.transition = "all 1.5s ease";
                button.style.left = `${x}px`;
                button.style.top = `${y}px`;
            });

            // Start circular motion
            function animateButtons() {
                buttons.forEach((button, index) => {
                    const offset = (index * Math.PI * 2) / buttons.length;
                    const x = centerX + horizontalRadius * Math.cos(angleRef.current + offset) - button.offsetWidth / 2;
                    const y = centerY + verticalRadius * Math.sin(angleRef.current + offset) - button.offsetHeight / 2;

                    button.style.left = `${x}px`;
                    button.style.top = `${y}px`;

                    if (!forceZIndex) {
                        const tolerance = 15;
                        button.style.zIndex = y < centerY - tolerance ? 4 : 15;
                    }
                });

                angleRef.current += 0.01;
                animationRef.current = requestAnimationFrame(animateButtons);
            }

            animateButtons();
        }, 1000);

        // Stop forcing z-index
        const zIndexTimeout = setTimeout(() => {
            forceZIndex = false;
        }, 3500);

        // Cleanup
        return () => {
            clearTimeout(timeoutId);
            clearTimeout(zIndexTimeout);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [buttonsRef, buttonClassName]);
}

export default useOrbitAnimation;