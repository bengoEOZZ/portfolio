document.addEventListener("DOMContentLoaded", () => {
    const buttonsWrapper = document.querySelector(".buttons-wrapper");
    const navbar = document.querySelector(".navbar");

    // Add click event to buttons
    buttonsWrapper.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn")) {
            // Hide the buttons wrapper
            buttonsWrapper.style.opacity = "0";
            buttonsWrapper.style.transform = "scale(0)";

            // Wait for the transition to complete, then hide the buttons
            setTimeout(() => {
                buttonsWrapper.style.display = "none";

                // Show the navigation bar
                navbar.classList.add("active");
            }, 500); // Matches the CSS transition duration
        }
    });
});