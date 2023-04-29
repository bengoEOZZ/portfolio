<head>
    <!-- Title -->
    <h1 class="page-title">Projects</h1>
    <!-- Navbar Styles -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet">
    <!-- Styles -->
    <link rel="stylesheet" type="text/css" href="/static/css/nav_style.css">
    <link rel="stylesheet" type="text/css" href="/static/css/footer_style.css">
    <link rel="stylesheet" type="text/css" href="/static/css/project_style.css">
</head>
<body>
    <!-- NAVBAR -->
    <?php
		require __DIR__ . '../../navbar.php';
	?>
    <!-- NAVBAR END -->

    <!-- PROFILE HEADER -->
    <div class="header-container">
		<div class="page-background"></div>
		<div class="page-container">
			<h1 class="page-title" id="page-title">PROJECTS</h1>
			<p class="page-description">
                Here you will find a collection of my past and current projects.
                Each project has been a unique learning experience. From software
                development to web design, these projects showcase my skills
                and interests. Feel free to explore and delve deeper into my 
                professional experience.
			</p>
		</div>
	</div>
    <!-- PROFILE HEADER END -->

    <img class="project-card-image" src="/static/images/not_done.jpg">

    <!-- FOOTER -->
    <?php
        require __DIR__ . '../../footer.php';
	?>
    <!-- FOOTER END -->

    <!-- SCRIPTS -->
    <script src="/static/javascript/navbar_transition.js"></script>
    <!-- SCRIPTS END -->
</body>