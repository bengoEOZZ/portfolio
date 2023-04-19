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
			<h1 class="page-title" id="page-title">PROFESSIONAL SKILLS AND EXPERIENCE</h1>
			<p class="page-description">
				Welcome to my skills section, where you can learn more about my expertise and
				experience. In this section, I'll showcase my technical skills, industry knowledge,
				and professional achievements that have helped me become a well-rounded and
				knowledgeable individual. I have a diverse set of skills that I've developed
				over the years, whether you're a potential employer or just curious about what
				I can bring to the table, I invite you to explore this section and get to know
				me a little better.
			</p>
		</div>
	</div>
    <iframe id="resume-pdf" src="/static/documents/resume.pdf"></iframe>
    <?php
        require __DIR__ . '../../footer.php';
	?>
</body>