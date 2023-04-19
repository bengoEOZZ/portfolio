<head>
  <link rel="stylesheet" type="text/css" href="/static/css/nav_style.css">
  <link rel="stylesheet" type="text/css" href="/static/css/footer_style.css">
  <link rel="stylesheet" type="text/css" href="/static/css/error_style.css">
</head>

<body>
  <?php
		require __DIR__ . '../navbar.php';
	?>
  <div class = "Error">
    <h1 id = "Error-Header">404</h1>
    <h2 id = "Error-SubHeader">Page not found</h2>
    <p id = "Error-paragraph">The page you are looking for does not exist.</p>
    <p><a href="/">Visit Homepage</a></p>
  </div>
  <?php
		require __DIR__ . '../footer.php';
	?>
</body>