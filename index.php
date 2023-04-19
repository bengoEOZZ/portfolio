<head>
    <link rel="stylesheet" type="text/css" href="/static/css/nav_style.css">
    <link rel="stylesheet" type="text/css" href="/static/css/footer_style.css">
    <link rel="stylesheet" type="text/css" href="/static/css/home_style.css">
    <!-- Font for Project Card -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Google Fonts: Lora -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet">
    <!-- JQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>
    <!-- RE-DEFINED JUST FOR INDEX PAGE (NEEDED FOR HOSTING) -->
    <nav id="navigation-header">
        <div id="navbar">
            <div id="navtitle">
                <a id="navtitle-link" href="<?= '/' ?>">
                    <img id="nav-logo" src="/static/images/Logo.png">
                </a>
            </div>
            <ul id="navbar-links-desktop">
                <li class="navitem">
                    <a class="navlink" href="<?= '/' ?>">HOME</a>
                    <div class="sub-menu">
                        <a href="#slideshow-container">Discover Who I Am</a>
                        <a href="#card-container">More About Me</a>
                        <a href="#about-container">Profile Card</a>
                    </div>
                </li>
                <li class="navitem">
                    <a class="navlink" href='/skills'>SKILLS</a>
                    <div class="sub-menu">
                        <a href="/skills/#Python">Python</a>
                        <a href="/skills/#HTML">HTML</a>
                        <a href="/skills/#Java">Java</a>
                        <a href="/skills/#C">C</a>
                        <a href="/skills/#C++">C++</a>
                        <a href="/skills/#Linux">Linux</a>
                        <a href="/skills/#SQL">SQL</a>
                    </div>
                </li>
                <li class="navitem">
                    <a class="navlink" href='/resume'>RESUME</a>
                </li>
                <li class="navitem">
                    <a class="navlink" href='/projects'>PROJECTS</a>
                </li>
                <li class="navitem">
                    <a class="navlink" href='/contact'>CONTACT ME</a>
                </li>
            </ul>
        </div>
    </nav>
    <!-- * * * * * END * * * * * -->

    <!-- Slideshow -->
    <div id="slideshow-container">
        <img class="slideshow-image" src="/static/images/slideshow-1.jpeg">
        <img class="slideshow-image" src="/static/images/slideshow-2.jpeg">
        <img class="slideshow-image" src="/static/images/slideshow-3.jpeg">
        <img class="slideshow-image" src="/static/images/slideshow-4.jpeg">
    </div>
    <!-- END -->

    <!-- CARDS FOR ABOUT ME!!! -->
    <div id="card-container" class="container">
        <div class="box">
            <div class="box-overlay"></div>
            <img class="box-image" src="/static/images/comp.png">
            <div class="box-content">
            <h3>About Me</h3>
            <p>I'm Benjamin Tiong, a programming professional with a passion for coding.
                Being a 3rd year student pursuing a Bachelor's Degree in Computer Science
                has enabled me to gain an in-depth understanding of the field, and I am
                excited to put my knowledge into practice.</p>
            </div>
        </div>
        <div class="box">
            <div class="box-overlay"></div>
            <img class="box-image" src="/static/images/work.png">
            <div class="box-content">
            <h3>Experience</h3>
            <p>
				I have honed my skills by working on various projects, ranging from professional
                websites to user-targeted applications, I am always looking for opportunities to professionally develop my skills further and help others achieve their goals in the process.
				I believe that sharing knowledge and skills is crucial in achieving success in any field.</p>
            </div>
        </div>
        <div class="box">
            <div class="box-overlay"></div>
            <img class="box-image" src="/static/images/gym.png">
            <div class="box-content">
            <h3>Health</h3>
            <p>
				In my spare time, I have developed a keen interest in fitness and nutrition. I hit the gym on a regular basis
				and maintain a well-balanced diet consisting of protein and vegetables. This has helped me stay healthy and energized,
				which is essential for performing well in my academic and professional endeavors.</p>
            </div>
        </div>
        <div class="box">
            <div class="box-overlay"></div>
            <img class="box-image" src="/static/images/media.png">
            <div class="box-content">
            <h3>Media</h3>
            <p>Besides fitness and nutrition, I also enjoy watching mainstream TV shows, as they offer a great way to
				stay up-to-date with current trends and popular culture.</p>
            </div>
        </div>
    </div>
    <!-- CARDS END -->

    <!-- Card -->
	<div id="about-container" class="about-container">
        <div class="about-blank"></div>
        <div class="about-text"><br><br><br>
        <h1>Looking for help<br>on a project or position?</h1><br>
            <p>I'm here to help you. As a skilled developer, I have a wealth of experience<br><br><br>
            and knowledge that can be leveraged to help you achieve your goals.<br><br><br>
            Whether you're working on a web development project or creating and maintaining<br><br><br>
            an application in the tech industry, I can provide you with guidance and support<br><br><br>
            to help you succeed. Next to this is a profile card, where you can<br><br><br>
            learn more about what I have to offer and get in touch with me directly by clicking
            the button to the right.<br><br><br>
            I believe I can make you goals a reality.
            </p>
        </div>
        <div class="about-card">
            <img src="/static/images/ben.png" alt="John" style="width:100%">
            <h1>Benjamin Tiong</h1>
            <p class="card-title">Student, Computer Science</p>
            <p>Queen's University</p>
            <i class="fa fa-envelope"></i>
            <i class="fa fa-linkedin"></i>
            <i class="fa fa-phone"></i>
            <p><a href='/contact' id="contact-button"><button>CONTACT</button></a></p>
        </div>
	</div>
    <!-- Card END -->

    <!-- REDEFINING FOOTER FOR WEBHOSTING PURPOSES -->
    <footer>
        <div class="footer">
            <img id="foot-logo" src="/static/images/Logo.png">
            <p>&copy; 2023 Benjamin Tiong. All rights reserved.</p>
        </div>
    </footer>
    <!-- FOOTER END -->

    <script>
        // * * * * * * * * * * Slidshow Transition * * * * * * * * * *
        // get references to the container and all images
        const container = $("#slideshow-container");
        const images = container.find(".slideshow-image");
        // set initial image index and display the first image
        let currentIndex = 0;
        images.eq(currentIndex).css("opacity", "1");
        // create a function to show the next image
        function showNextImage() {
            // hide the current image
            images.eq(currentIndex).css("opacity", "0");
            // increment the index, wrapping around if necessary
            currentIndex = (currentIndex + 1) % images.length;
            // show the next image
            images.eq(currentIndex).css("opacity", "1");
        }
        // call the showNextImage function every 8 seconds
        setInterval(showNextImage, 8000);
        // * * * * * * * * * * Slidshow END * * * * * * * * * *

        // * * * * * * * * * * Navbar Transition * * * * * * * * * *
        const nav = document.querySelector('#navigation-header');
        const navTop = nav.offsetTop;
        function fixNav() {
            if (window.scrollY >= navTop) {
                document.body.classList.add('fixed-nav');
            } else {
                document.body.classList.remove('fixed-nav');
            }
        }
        window.addEventListener('scroll', fixNav);
        // * * * * * * * * * * Navbar END * * * * * * * * * *
    </script>
</body>