<head>
    <!-- Title -->
    <h1 class="page-title">Home</h1>
    <!-- Navbar Styles -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet">
    <!-- Styles -->
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
    <!-- NAVBAR -->
    <?php
		require __DIR__ . '/navbar.php';
	?>
    <!-- NAVBAR END -->

    <!-- SLIDESHOW -->
    <div id="slideshow-container">
        <img class="slideshow-image" src="/static/images/slideshow-1.jpeg">
        <img class="slideshow-image" src="/static/images/slideshow-2.jpeg">
        <img class="slideshow-image" src="/static/images/slideshow-3.jpeg">
        <img class="slideshow-image" src="/static/images/slideshow-4.jpeg">
    </div>
    <!-- SLIDESHOW END -->

    <!-- CARDS -->
    <div id="card-container" class="container">
        <div class="box">
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
            <img class="box-image" src="/static/images/media.png">
            <div class="box-content">
            <h3>Media</h3>
            <p>Besides fitness and nutrition, I also enjoy watching mainstream TV shows, as they offer a great way to
				stay up-to-date with current trends and popular culture.</p>
            </div>
        </div>
    </div>
    <!-- CARDS END -->

    <!-- PROFILE CARD -->
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
    <!-- PROFILE CARD END -->

    <!-- FOOTER -->
    <?php
        require __DIR__ . '/footer.php';
	?>
    <!-- FOOTER END -->

    <!-- SCRIPTS -->
    <script src="/static/javascript/navbar_transition.js"></script>
    <script src="/static/javascript/slideshow_transition.js"></script>
    <!-- SCRIPTS END -->
</body>