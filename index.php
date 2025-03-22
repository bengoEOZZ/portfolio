<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Portfolio</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Poppins', sans-serif;
            background: #fff;
            color: #111;
            text-align: center;
        }

        .container {
            padding: 5rem 2rem;
        }

        h1 {
            font-size: 4rem;
            font-weight: 600;
            display: inline-block;
            border-bottom: 10px solid #007bff;
            margin-bottom: 2rem;
        }

        .intro {
            max-width: 600px;
            margin: 0 auto;
            font-size: 1.2rem;
            line-height: 1.8;
        }

        .buttons {
            margin: 3rem 0;
        }

        .btn {
            text-decoration: none;
            color: #111;
            padding: 1rem 2rem;
            border: 2px solid #111;
            margin: 0.5rem;
            display: inline-block;
            transition: 0.3s;
        }

        .btn:hover {
            background: #111;
            color: #fff;
        }

        .socials {
            margin-top: 4rem;
        }

        .socials a {
            margin: 0 1rem;
            font-size: 2rem;
            text-decoration: none;
            color: #111;
        }

        .socials a:hover {
            color: #007bff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello World...</h1>

        <p class="intro">I'm <strong>Benjamin Tiong</strong>, a web developer passionate about crafting beautiful and functional digital experiences. Explore my work and get to know me!</p>

        <div class="buttons">
            <a href="#about" class="btn">About</a>
            <a href="#projects" class="btn">Coding</a>
            <a href="#contact" class="btn">Projects</a>
            <a href="#contact" class="btn">Contact</a>
        </div>

        <div class="socials">
            <a href="https://github.com/yourgithub" target="_blank">&#x1F5C3;</a>
            <a href="https://linkedin.com/in/yourlinkedin" target="_blank">&#x1F465;</a>
            <a href="mailto:your@email.com">✉️</a>
        </div>
    </div>
</body>
</html>