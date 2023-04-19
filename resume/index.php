<head>
    <h1 class="page-title">My Resume</h1>
    <link rel="stylesheet" type="text/css" href="/static/css/nav_style.css">
    <link rel="stylesheet" type="text/css" href="/static/css/footer_style.css">
    <link rel="stylesheet" type="text/css" href="/static/css/resume_style.css">
</head>
<body>
    <?php
		require __DIR__ . '../../navbar.php';
	?>
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
    <iframe id="resume-pdf" src="/static/documents/resume.pdf"></iframe>
    <?php
        require __DIR__ . '../../footer.php';
	?>
</body>