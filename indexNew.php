<head>
    <meta charset="UTF-8">
    <title>My Portfolio</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
    <script src="/static/javascript/circle-navbar.js"></script>
    <script src="/static/javascript/circle-animation.js"></script>
    <!--script src="/static/javascript/light-alternate.js"></script>-->
    <link rel="stylesheet" type="text/css" href="/static/css/index_style.css">
    <link rel="stylesheet" type="text/css" href="/static/css/navbar_new.css">
</head>
<body>
    
    <div class="container">
        <img src="/static/images/Ben.svg" alt="Benjamin Tiong SVG" class="planet" id="draggable"></img>
        <div class="left-content">
            <h1 class="left-text">Hello World...</h1>
            <p class="intro">I'm <strong>Benjamin Tiong</strong>, 
            a software developer whose work orbits around the possibilities of code and innovation.
            Dive into my universe, and discover more about me.</p>
        </div>

        <img src="/static/images/earth2.svg" alt="Earth" class="earth-svg">
        <!--<div class="sun-rays"></div>-->
        <img src="/static/images/sun.svg" alt="Earth" class="sun-svg">
        <div class="sun-svg">
            <?php include 'static/images/sun-rays.svg'; ?>
        </div>

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

        <div class="floating-remarks">
            <div class="remark">if (user.isCurious) { explore(); }</div>
            <div class="remark">try { learn(); } catch (failure) { grow(); }</div>
            <div class="remark">if (world.needsChange) { buildSolution(); }</div>
            <div class="remark">do { expandPerspective(); } while (truth.isVast);</div>
            <div class="remark">for (idea in ideas) { innovate(idea); }</div>
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
    
</body>
</html>