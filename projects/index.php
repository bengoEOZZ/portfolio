<head>
    <!-- Title -->
    <h1 class="page-title">Projects</h1>
    <!-- Fonts -->
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

    <!-- SCROLL PROMPT -->
    <div class="scroll-prompt">
		<p>Scroll down</p>
		<div class="scroll-icon">⬇️</div>
	</div>
    <!-- SCROLL PROMPT END -->

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

    <!-- PROJECTS -->
    <div id="project-gallery">
        <br id="QBB">
        <div class="project-card">
            <img class="project-card-image" src="/static/gifs/QBNB.gif">
            <div class="project-card-text">
                <div class="project-card-line">
                    <h2 class="project-card-title">QB&B - Housing Web Application</h2>
                    <a href="https://github.com/bengoEOZZ/qbnb" target="_blank"><svg class="export-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg></a>
                </div>
                <p class="project-card-description">
                    <ul>
                        <li>Part of a development team tasked with designing and building an online application called qB&B, which is similar to AirB&B.</li><br>
                        <li>The application allows registered users to create listings for vacation house/apartment rentals, which can be booked by other users through the platform.</li><br>
                        <li>Transactions represent successful bookings, and verified guests can leave reviews. User payments are made directly through their balance on the application, and users can add money to their account through online banking.</li><br>
                        <li>Regarding security testing, SQL injection testing was conducted, which would be tested with pytest test cases using backend unit testing. To test for SQL injection, we would run a fuzzy test against the backend APIs to check for SQL injections.</li><br>
                        <li>For deployment, web application was deployed using Docker containers, which allows the bundling of all dependencies into a single image. Finally, the web application container was published to DockerHub, which allows others to run the application on their own machines using Docker.</li>
                    </ul>
                </p>
            </div>
        </div>
        <div class="project-background" id="QBUZZ">
            <div class="project-card">
                <img class="project-card-image-qbuzz" src="/static/gifs/QBUZZ.gif">
                <div class="project-card-text">
                    <div class="project-card-line">
                        <h2 class="project-card-title">QBUZZ - Trivia Game Phone Application</h2>
                        <svg class="export-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8l0 0z"/></svg><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    </div>
                    <p class="project-card-description">
                        <ul>
                            <li>The Trivia game is a software application that allows players to participate in a fun and interactive quiz competition.</li><br>
                            <li>Designed to be highly functional and adaptable to various trivia game rules and sets. It utilizes a buzzer system where players or teams can buzz in to answer questions. The buzzer system is smartly programmed to lock out other team's buzzers when a team has buzzed in to answer a question.</li><br>
                            <li>The Trivia game was designed and developed using C++ and Python programming languages. The application's GUI was created using Python to give it an appealing visual appearance. Meanwhile, the C++ code was used to construct the base functionality of the game to ensure seamless operation.</li><br>
                            <li>The game is highly dynamic and interactive, allowing for individual or team play. Players can form teams to compete against each other or play individually. This feature adds to the game's appeal and allows players to have a more enjoyable experience.</li><br>
                            <li>Allows moderators to choose from a pre-existing question bank or upload their own questions. This feature adds a high degree of customization to the game, enabling moderators to tailor the questions to their liking or to fit a particular theme or category.</li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>
        <br id="SE">
        <div class="project-card">
            <img class="project-card-image" src="/static/gifs/SE.gif">
            <div class="project-card-text">
                <div class="project-card-line">
                    <h2 class="project-card-title">Stressful Escape - 2D Game</h2>
                    <a href="https://github.com/bengoEOZZ/stressful_escape" target="_blank"><svg class="export-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg></a>
                </div>
                <p class="project-card-description">
                    <ul>
                        <li>The design and purpose of the game "Stressful Escape" is to provide players with a creative child-like experience and mentality that takes them through realizing the hardships and obstacles towards maturing into an adult.</li><br>
                        <li>The game is developed as a 2D adventure game using Pygame, a popular Python library for game development.</li><br>
                        <li>The game features various mini-games, each with unique gameplay mechanics designed to reflect different challenges of a young student with a creatve mind. The mini-games are meant to be challenging, forcing players to think critically and strategically to progress through the game.</li><br>
                        <li>To enhance the player experience, a few self-designed sprites are used to create an aesthetically pleasing environment. These sprites add a unique touch to the game and help players immerse themselves in the game's world.</li><br>
                    </ul>
                </p>
            </div>
        </div>
    </div>
    <!-- PROJECTS END -->

    <!-- FOOTER -->
    <?php
        require __DIR__ . '../../footer.php';
	?>
    <!-- FOOTER END -->

    <!-- SCRIPTS -->
    <script src="/static/javascript/navbar_transition.js"></script>
    <script src="/static/javascript/project_fade.js"></script>
    <!-- SCRIPTS END -->
</body>