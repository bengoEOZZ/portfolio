<head>
    <meta charset="UTF-8">
    <title>My Portfolio</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
    <script src="/static/javascript/circle-navbar.js"></script>
    <script src="/static/javascript/circle-animation.js"></script>
    <script src="/static/javascript/sun-rays.js"></script>
    <link rel="stylesheet" type="text/css" href="/static/css/index_style.css">
    <link rel="stylesheet" type="text/css" href="/static/css/navbar_new.css">
</head>
<body>
    
    <div class="container" id="draggable">
        <img src="/static/images/Ben.svg" alt="Benjamin Tiong SVG" class="planet" id="draggable"></img>
        <div class="left-content">
            <h1 class="left-text">Hello World...</h1>
            <p class="intro">I'm <strong>Benjamin Tiong</strong>, a passionate software developer whose creativity orbits around the endless possibilities of code and innovation. Dive into my universe, where I bring my most and explore the stories behind the pixels that bring my projects to life. Let's embark on a journey of discovery and inspiration together!</p>
        </div>

        <img src="/static/images/earth.svg" alt="Earth" class="earth-svg">
        <div class="sun-rays"></div>
        <img src="/static/images/sun.svg" alt="Sun" class="sun-svg">
        <!--<div id="mydiv">
            <div id="mydivheader">Click here to move</div>
            <p>Move</p>
            <p>this</p>
            <p>DIV</p>
        </div>-->

        <!-- Buttons that will circle around 
        <div class="buttons-wrapper">
            <a href="#about" class="btn">About</a>
            <a href="#coding" class="btn">Coding</a>
            <a href="#projects" class="btn">Projects</a>
            <a href="#contact" class="btn">Contact</a>
        </div>-->

        <div class="buttons-wrapper">
            <a href="#about" class="btn">
                <img src="/static/images/Shield.svg" alt="About Shield" class="btn-shield">
                <span class="btn-text">About</span>
            </a>
            <a href="#coding" class="btn">
                <img src="/static/images/Shield.svg" alt="Coding Shield" class="btn-shield">
                <span class="btn-text">Coding</span>
            </a>
            <a href="#projects" class="btn">
                <img src="/static/images/Shield.svg" alt="Projects Shield" class="btn-shield">
                <span class="btn-text">Projects</span>
            </a>
            <a href="#contact" class="btn">
                <img src="/static/images/Shield.svg" alt="Contact Shield" class="btn-shield">
                <span class="btn-text">Contact</span>
            </a>
        </div>

        <!--<nav class="navbar">
            <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#coding">Coding</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>-->
    </div>
    <!--<script src="/static/javascript/drag.js"></script>-->
</body>
</html>