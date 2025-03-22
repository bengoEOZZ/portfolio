<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Portfolio</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
    <script src="/static/javascript/circle-navbar.js"></script>
    <script src="/static/javascript/circle-animation.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Poppins', sans-serif;
            background: #1a1a2e; /* Dark background */
            color: #e0e0e0; /* Light text for better contrast */
            text-align: center;
        }

        body:active {
            cursor: grabbing; /* Cursor when dragging */
        }

        /* Center the container and text */
        .container {
            position: relative;
            height: 100vh; /* Full viewport height */
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }


        .center-content {
            position: absolute;
            z-index: 10; /* Ensure the text is above the buttons */
            width: 300px; /* Adjusted width to make it skinnier */
        }

        .center-text {
            font-size: 2.5rem;
            font-weight: bold;
            margin: 0;
        }
        
        h1 {
            font-size: 4rem;
            font-weight: 600;
            display: inline-block;
            border-bottom: 10px solid #007bff; /* Bright blue underline */
            margin-bottom: 2rem;
            color: #ffffff; /* White text for the heading */
        }

        .intro {
            max-width: 600px;
            margin: 1rem auto 0;
            font-size: 1.2rem;
            line-height: 1.8;
            color: #b0b0b0; /* Softer light gray for paragraph text */
        }

        /* Circular layout for buttons */
        .buttons-wrapper {
            position: relative;
            height: 300px;
            width: 300px;
            margin: 0 auto; /* Center the buttons-wrapper */
            transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .btn {
            position: absolute;
            width: 100px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border: 2px solid #007bff; /* Bright blue border */
            border-radius: 20px;
            text-decoration: none;
            color: #007bff; /* Bright blue text */
            background: transparent; /* Transparent background */
            transition: all 0.3s ease;
            cursor: grab; /* Show grab cursor */
        }

        /* Hover effect for buttons */
        .btn:hover {
            background: #007bff; /* Bright blue background on hover */
            color: #ffffff; /* White text on hover */
            transform: scale(1.2); /* Slight zoom */
            box-shadow: 0 0 15px rgba(0, 123, 255, 0.6); /* Glow effect */
        }

        .btn:active {
            cursor: grabbing; /* Show grabbing cursor when dragging */
        }

        .socials {
            margin-top: 4rem;
        }

        .socials a {
            margin: 0 1rem;
            font-size: 2rem;
            text-decoration: none;
            color: #111;
        }

        .socials a:hover {
            color: #007bff;
        }

        /* Hidden navigation bar */
        .navbar {
            display: none; /* Initially hidden */
            background-color: #1a1a2e; /* Match the background */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 1rem 2rem;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .navbar ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            gap: 2rem;
        }

        .navbar ul li a {
            text-decoration: none;
            color: #007bff; /* Bright blue text */
            font-weight: bold;
            padding: 0.5rem 1rem;
            border: 2px solid transparent;
            transition: all 0.3s ease;
        }

        .navbar ul li a:hover {
            background: #007bff; /* Bright blue background on hover */
            color: #ffffff; /* White text on hover */
            border-color: #007bff;
        }

        /* Show navigation bar when active */
        .navbar.active {
            display: block;
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>
<body>
    
    <div class="container" id="mydiv">
        <div class="center-content">
            <h1 class="center-text">Hello World...</h1>
            <p class="intro">I'm <strong>Benjamin Tiong</strong>, a software developer passionate about crafting beautiful and functional digital experiences. Explore my work and get to know me!</p>
        </div>

        <!--<div id="mydiv">
            <div id="mydivheader">Click here to move</div>
            <p>Move</p>
            <p>this</p>
            <p>DIV</p>
        </div>-->

        <!-- Buttons that will circle around -->
        <div class="buttons-wrapper">
            <a href="#about" class="btn">About</a>
            <a href="#coding" class="btn">Coding</a>
            <a href="#projects" class="btn">Projects</a>
            <a href="#contact" class="btn">Contact</a>
        </div>

        <!-- Placeholder for the navigation bar -->
        <nav class="navbar hidden">
            <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#coding">Coding</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </div>
    <script src="/static/javascript/drag.js"></script>
</body>
</html>