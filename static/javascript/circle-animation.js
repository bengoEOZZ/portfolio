window.onload = () => {
    const buttonsWrapper = document.querySelector(".buttons-wrapper");
    const buttons = document.querySelectorAll(".btn");
    const horizontalRadius = 800; // Horizontal radius for the oval path
    const verticalRadius = 400; // Vertical radius for the oval path
    const centerX = buttonsWrapper.offsetWidth / 2; // Center of the wrapper (horizontal)
    const centerY = buttonsWrapper.offsetHeight / 2; // Center of the wrapper (vertical)
    let angle = 0; // Starting angle

    // Initial positions: Start at the center
    buttons.forEach((button) => {
        button.style.position = "absolute";
        button.style.left = `${centerX - button.offsetWidth / 2}px`;
        button.style.top = `${centerY - button.offsetHeight / 2}px`;
    });

    // Animate buttons outward into an oval layout
    setTimeout(() => {
        buttons.forEach((button, index) => {
            const offset = (index * Math.PI * 2) / buttons.length; // Spread buttons evenly
            const x = centerX + horizontalRadius * Math.cos(offset) - button.offsetWidth / 2;
            const y = centerY + verticalRadius * Math.sin(offset) - button.offsetHeight / 2;

            button.style.transition = "all 1.5s ease"; // Smooth transition
            button.style.left = `${x}px`;
            button.style.top = `${y}px`;
        });

        // Start circular motion after the animation
        animateButtons();
    }, 1000); // Delay before animating outward

    // Circular motion animation
    function animateButtons() {
        buttons.forEach((button, index) => {
            const offset = (index * Math.PI * 2) / buttons.length; // Spread buttons evenly
            const x = centerX + horizontalRadius * Math.cos(angle + offset) - button.offsetWidth / 2;
            const y = centerY + verticalRadius * Math.sin(angle + offset) - button.offsetHeight / 2;

            button.style.left = `${x}px`;
            button.style.top = `${y}px`;
            button.style.zIndex = y < centerY ? 4 : 15; // Adjust z-index based on vertical position
        });

        angle += 0.01; // Adjust speed of rotation
        requestAnimationFrame(animateButtons); // Keep animating
    }
};