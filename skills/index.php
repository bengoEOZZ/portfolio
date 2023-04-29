<head>
	<!-- Title -->
	<h1 class="page-title" id="page-title">Skills</h1>
	<!-- Navbar Styles -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet">
	<!-- Styles -->
	<link rel="stylesheet" type="text/css" href="/static/css/nav_style.css">
	<link rel="stylesheet" type="text/css" href="/static/css/footer_style.css">
	<link rel="stylesheet" type="text/css" href="/static/css/skills_style.css">
	<!-- JQuery -->
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>
	<!-- NAvBAR -->
	<?php
		require __DIR__ . '../../navbar.php';
	?>
	<!-- NAVBAR END -->

	<!-- SKILLS HEADER -->
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
	<!-- SKILLS HEADER END -->
  	
	<div class="skills-container">
		<!-- SKILLS MENU -->
		<aside id="fixed-left" class="left">
			<ul>
				<li><a href="#Python">Python</a></li>
				<li><a href="#HTML">HTML</a></li>
				<li><a href="#Java">Java</a></li>
				<li><a href="#C">C</a></li>
				<li><a href="#C++">C++</a></li>
				<li><a href="#Linux">Linux</a></li>
				<li><a href="#SQL">SQL</a></li>
			</ul>
		</aside>
		<!-- SKILLS MENU END -->

		<!-- SKILLS TABLE -->
		<main class="content">
			<table id="Python"><tr><th>Python</th><th>Experience</th></tr><tr><td>
				<ul>
					<li>A high-level, general-purpose programming language that has gained immense popularity due to its its simplicity and ease of use</li>
					<li>Its syntax is straightforward and readable</li>
					<li>Using Python, I implement most of my algorithms to get a base structure and understanding of the structure</li>
				</ul></td><td>
				<ul>
					<li>I've taken courses in Python, usually introductory courses due to its simplicity</li>
					<li>I've developed a game in Python using PyGame, I designed gameplay based on mouse and keyboard inputs given by the player of the game to control movement, decisions, and game states</li>
				</ul></td></tr><tr>
			</table>
			<br>
			<table id="HTML"><tr><th>HTML</th><th>Experience</th></tr><tr><td>
				<ul>
					<li>HTML (Hypertext Markup Language) is a standard markup language used for creating web pages and web applications</li>
					<li>I've used HTML in conjunction with other web technologies such as CSS (Cascading Style Sheets) for styling and layout, and JavaScript for interactivity and dynamic behavior</li>
				</ul></td><td>
				<ul>
					<li>I've created multiple websites through HTML and CSS styling (with JavaScript functionality)</li>
					<li>I've taken a course in Human-Computer Interaction, requiring me to design a website with UI and UX based off the targeted user audience</li>
				</ul></td></tr><tr>
			</table>
			<br>
			<table id="Java"><tr><th>Java</th><th>Experience</th></tr><tr><td>
				<ul>
					<li>An object-oriented language, emphasizing the use of objects to represent data and perform operations</li>
					<li>It has automatic memory management, so the user won't have to mangage it themselves</li>
					<li>
						Using Java, I recognize it as the best language to design data stuctures and implement their functionality
					</li>
				</ul></td><td>
				<ul>
					<li>I've taken courses in Java, related especially to the concept of OOP (Object Oriented Programming)
					</li>
					<li>I've developed all the base data structures in Java and extended upon their functionality
					</li>
				</ul></td></tr><tr>
			</table>
			<br>
			<table id="C"><tr><th>C</th><th>Experience</th></tr><tr><td>
				<ul>
					<li>A low-level programming language widely used for system programming</li>
					<li>Used as a staple and default in embedded programming</li>
				</ul></td><td>
				<ul>
					<li>I've taken a course in C, using system-level programming with memory management</li>
				</ul></td></tr><tr>
			</table>
			<br>
			<table id="C++"><tr><th>C++</th><th>Experience</th></tr><tr><td>
				<ul>
					<li>An object-oriented language that supports classes, templates, and inheritance.</li>
					<li>C++ is widely used in the development of operating systems, game development, and scientific applications</li>
				</ul></td><td>
				<ul>
					<li>I've taken a course in C++, creating a Trivia Quiz Game with a functional buzzer system and and interactive GUI
					</li>
				</ul></td></tr><tr>
			</table>
			<br>
			<table id="Linux"><tr><th>Linux</th><th>Experience</th></tr><tr><td>
				<ul>
					<li>A free and open-source operating system based on the Unix operating system</li>
					<li>It is highly configurable and can be adapted to suit a wide range of needs</li>
					<li>Using Bash, I have developed experience in shell scripting in the Linux shell</li>
				</ul></td><td>
				<ul>
					<li>I've taken a course in System Level Programming, working with the Bash shell and the Linux system</li>
				</ul></td></tr><tr>
			</table>
			<br>
			<table id="SQL"><tr><th>SQL</th><th>Experience</th></tr><tr><td>
				<ul>
					<li>SQL (Structured Query Language) is a programming language used for managing and manipulating relational databases</li>
					<li>It performs tasks such as creating databases, tables, and views, as well as querying, inserting, updating and deleting data from databases</li>
				</ul></td><td>
				<ul>
					<li>I've taken a course in Database Management Systems, working with SQL and querying and creating tables, later developed into a final prototype for a website application</li>
				</ul></td></tr><tr>
			</table>
			<!-- SKILLS SCRIPTS -->
			<script src="/static/javascript/skills_active.js"></script>
			<script src="/static/javascript/skills_menu_scroll.js"></script>
			<!-- SKILLS SCRIPTS END -->
		</main>
		<!-- SKILLS TABLE END -->
	</div>

	<!-- FOOTER -->
	<?php
        require __DIR__ . '../../footer.php';
	?>
	<!-- FOOTER END -->

	<!-- SCRIPTS-->
	<script src="/static/javascript/navbar_transition.js"></script>
	<!-- SCRIPTS END -->
</body>