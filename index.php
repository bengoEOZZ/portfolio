<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Choose Your Mode</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #1a1a2e;
        }

        .container {
            text-align: center;
        }

        h1 {
            color: white;
            font-size: 2.5rem;
            margin-bottom: 20px;
        }

        .buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
        }

        .btn {
            padding: 15px 40px;
            font-size: 1.5rem;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: 0.3s;
            text-decoration: none;
            display: inline-block;
        }

        .btn.classic {
            background-color: #007bff;
        }

        .btn.classic:hover {
            background-color: #0056b3;
        }

        .btn.creative {
            background-color: #a633ff;
        }

        .btn.creative:hover {
            background-color: #7d1ecc;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Choose Your Mode</h1>
        <div class="buttons">
            <a href="indexOld.php" class="btn classic">Classic</a>
            <a href="indexNew.php" class="btn creative">Creative</a>
        </div>
    </div>

</body>
</html>
