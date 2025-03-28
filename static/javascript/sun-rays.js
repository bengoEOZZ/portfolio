document.addEventListener("DOMContentLoaded", () => {
    const sunRays = document.querySelector('.sun-rays');

    setInterval(() => {
        const opacity = Math.random() * 0.5 + 0.5; // Random opacity between 0.5 and 1
        sunRays.style.opacity = opacity.toFixed(2);
    }, 200); // Adjust interval for faster or slower flickering
});