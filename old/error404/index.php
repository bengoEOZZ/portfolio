<head>
  <!-- Title -->
	<h1 class="page-title" id="page-title">Error</h1>
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet">
  <!-- Styles -->
  <link rel="stylesheet" type="text/css" href="/static/css/nav_style.css">
  <link rel="stylesheet" type="text/css" href="/static/css/footer_style.css">
  <link rel="stylesheet" type="text/css" href="/static/css/error_style.css">
</head>

<body>
  <!-- NAVBAR -->
  <?php
		require __DIR__ . '../../navbar.php';
	?>
  <!-- NAVBAR END -->

  <!-- ERROR -->
  <div class = "Error">
    <h1 id = "Error-Header">404</h1>
    <h2 id = "Error-SubHeader">Page not found</h2>
    <p id = "Error-paragraph">The page you are looking for does not exist.</p>
    <p><a href="/">Visit Homepage</a></p>
  </div>
  <!-- ERROR END -->

  <!-- FOOTER -->
  <?php
		require __DIR__ . '../../footer.php';
	?>
  <!-- FOOTER END -->

  <!-- SCRIPTS-->
	<script src="/static/javascript/navbar_transition.js"></script>
	<!-- SCRIPTS END -->
</body>