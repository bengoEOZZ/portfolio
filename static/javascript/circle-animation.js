document.addEventListener("DOMContentLoaded", () => {
    const buttonsWrapper = document.querySelector(".buttons-wrapper");
    const buttons = document.querySelectorAll(".btn");
    const radius = 600; // Radius of the circular path
    const centerX = buttonsWrapper.offsetWidth / 2; // Center of the wrapper (horizontal)
    const centerY = buttonsWrapper.offsetHeight / 2; // Center of the wrapper (vertical)
    let angle = 0; // Starting angle

    // Initial positions: Start at the center
    buttons.forEach((button) => {
        button.style.position = "absolute";
        button.style.left = `${centerX - button.offsetWidth / 2}px`;
        button.style.top = `${centerY - button.offsetHeight / 2}px`;
    });

    // Animate buttons outward into a circular layout
    setTimeout(() => {
        buttons.forEach((button, index) => {
            const offset = (index * Math.PI * 2) / buttons.length; // Spread buttons evenly
            const x = centerX + radius * Math.cos(offset) - button.offsetWidth / 2;
            const y = centerY + radius * Math.sin(offset) - button.offsetHeight / 2;

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
            const x = centerX + radius * Math.cos(angle + offset) - button.offsetWidth / 2;
            const y = centerY + radius * Math.sin(angle + offset) - button.offsetHeight / 2;

            button.style.left = `${x}px`;
            button.style.top = `${y}px`;
        });

        angle += 0.01; // Adjust speed of rotation
        requestAnimationFrame(animateButtons); // Keep animating
    }
});