<head>
    <!-- Title -->
    <h1 class="page-title">Resume</h1>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet">
    <!-- Styles -->
    <link rel="stylesheet" type="text/css" href="/static/css/nav_style.css">
    <link rel="stylesheet" type="text/css" href="/static/css/footer_style.css">
    <link rel="stylesheet" type="text/css" href="/static/css/resume_style.css">
</head>
<body>
    <!-- NAVBAR -->
    <?php
		require __DIR__ . '../../navbar.php';
	?>
    <!-- NAVBAR END -->

    <!-- SCROLL PROMPT -->
    <div class="scroll-prompt">
		<p>Scroll down</p>
		<div class="scroll-icon">⬇️</div>
	</div>
    <!-- SCROLL PROMPT END -->

    <!-- RESUME HEADER -->
    <div class="header-container">
		<div class="page-background"></div>
		<div class="page-container">
			<h1 class="page-title" id="page-title">RESUME</h1>
			<p class="page-description">
                This resume is a comprehensive representation of my skills,
                achievements, and experiences that I have accumulated throughout my career.
                I believe that my diverse skillset, coupled with my passion for coding
                and dedication to continuous learning, make me a strong candidate for any role.
			</p>
		</div>
	</div>
    <!-- RESUME HEADER END -->

    <!-- RESUME -->
    <iframe id="resume-pdf" src="/static/documents/Resume.pdf"></iframe>
    <!-- RESUME END -->
    
    <!-- FOOTER -->
    <?php
        require __DIR__ . '../../footer.php';
	?>
    <!-- FOOTER END -->

    <!-- SCRIPTS -->
    <script src="/static/javascript/navbar_transition.js"></script>
    <!-- SCRIPTS END -->
</body>
