<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Portfolio</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
    <script src="/static/javascript/circle-navbar.js"></script>
    <script src="/static/javascript/circle-animation.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Poppins', sans-serif;
            background: #1a1a2e; /* Dark background */
            color: #e0e0e0; /* Light text for better contrast */
            text-align: center;
        }

        .circle-background {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px; /* Adjust the size of the circle */
            height: 500px; /* Make it a perfect circle */
            background: rgba(0, 123, 255, 0.1); /* Light blue with transparency */
            border-radius: 50%; /* Makes it a circle */
            z-index: 5; /* Ensure it is behind the text */
        }
        body:active {
            cursor: grabbing; /* Cursor when dragging */
        }

        /* Center the container and text */
        .container {
            position: relative;
            height: 100vh; /* Full viewport height */
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }


        .center-content {
            position: absolute;
            z-index: 10; /* Ensure the text is above the buttons */
            width: 300px; /* Adjusted width to make it skinnier */
        }

        .center-text {
            font-size: 2.5rem;
            font-weight: bold;
            margin: 0;
        }
        
        h1 {
            font-size: 4rem;
            font-weight: 600;
            display: inline-block;
            border-bottom: 10px solid #007bff; /* Bright blue underline */
            margin-bottom: 2rem;
            color: #ffffff; /* White text for the heading */
        }

        .intro {
            max-width: 600px;
            margin: 1rem auto 0;
            font-size: 1.2rem;
            line-height: 1.8;
            color: #b0b0b0; /* Softer light gray for paragraph text */
        }

        /* Circular layout for buttons */
        .buttons-wrapper {
            position: relative;
            height: 300px;
            width: 300px;
            margin: 0 auto; /* Center the buttons-wrapper */
            transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .btn {
            position: absolute;
            width: 100px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border: 2px solid #007bff; /* Bright blue border */
            border-radius: 20px;
            text-decoration: none;
            color: #007bff; /* Bright blue text */
            background: transparent; /* Transparent background */
            transition: all 0.3s ease;
            cursor: grab; /* Show grab cursor */
        }

        /* Hover effect for buttons */
        .btn:hover {
            background: #007bff; /* Bright blue background on hover */
            color: #ffffff; /* White text on hover */
            transform: scale(1.2); /* Slight zoom */
            box-shadow: 0 0 15px rgba(0, 123, 255, 0.6); /* Glow effect */
        }

        .btn:active {
            cursor: grabbing; /* Show grabbing cursor when dragging */
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

        /* Hidden navigation bar */
        .navbar {
            display: none; /* Initially hidden */
            background-color: #1a1a2e; /* Match the background */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 1rem 2rem;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .navbar ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            gap: 2rem;
        }

        .navbar ul li a {
            text-decoration: none;
            color: #007bff; /* Bright blue text */
            font-weight: bold;
            padding: 0.5rem 1rem;
            border: 2px solid transparent;
            transition: all 0.3s ease;
        }

        .navbar ul li a:hover {
            background: #007bff; /* Bright blue background on hover */
            color: #ffffff; /* White text on hover */
            border-color: #007bff;
        }

        /* Show navigation bar when active */
        .navbar.active {
            display: block;
            opacity: 1;
            transform: translateY(0);
        }
        .svg-position {
            position: absolute;
            top: 200%;
            left: 225%;
            transform: translate(-50%, -50%);
        }
    </style>
</head>
<body>
    
    <div class="container" id="draggable">
        <div class="circle-background">
        <?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events"
version="1.1" baseProfile="full"
viewBox="0 0 800 800" 
width="800mm" height="600mm"
class="svg-position">
<polygon points="20 65 45 11 127 0 18 108 70 167 151 49 " fill="rgb(2,37,72)" opacity="0.0524141188918148" />
<polygon points="155 7 59 111 138 37 116 44 29 32 70 60 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="132 78 147 163 18 167 153 200 129 56 42 55 " fill="rgb(81,78,77)" opacity="0.9880626896158355" />
<polygon points="118 123 137 25 85 3 66 10 18 183 62 200 " fill="rgb(26,22,20)" opacity="0.31982758224579033" />
<polygon points="146 120 149 47 130 20 131 128 20 108 92 186 " fill="rgb(27,23,23)" opacity="0.8386191960792841" />
<polygon points="137 200 107 57 36 23 109 11 60 107 34 94 " fill="rgb(22,0,0)" opacity="0.30317833238090675" />
<polygon points="139 29 58 8 152 78 14 135 101 179 114 132 " fill="rgb(5,1,2)" opacity="0.968156167455529" />
<polygon points="140 30 116 118 0 153 84 187 106 44 153 79 " fill="rgb(9,1,2)" opacity="0.9596435671536716" />
<polygon points="68 4 38 19 97 51 139 190 54 156 103 9 " fill="rgb(51,43,47)" opacity="0.7671151888545029" />
<polygon points="96 167 45 184 114 27 10 24 129 127 9 102 " fill="rgb(232,224,253)" opacity="0.15479843844081032" />
<polygon points="156 200 156 140 0 162 0 0 156 0 21 145 " fill="rgb(0,172,92)" opacity="0.028725301003795112" />
<polygon points="156 0 62 106 80 2 149 29 54 15 156 200 " fill="rgb(48,60,57)" opacity="0.40396060632664654" />
<polygon points="13 140 35 91 0 0 0 200 156 200 7 168 " fill="rgb(0,19,23)" opacity="0.16837732785572856" />
<polygon points="114 102 20 85 142 145 30 122 138 114 30 23 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="70 4 109 153 21 55 156 93 156 200 106 10 " fill="rgb(26,11,22)" opacity="0.21905685517058027" />
<polygon points="107 88 28 200 43 6 19 100 0 169 0 79 " fill="rgb(41,61,65)" opacity="0.03353824187510002" />
<polygon points="62 115 4 197 116 161 131 19 0 152 0 95 " fill="rgb(0,29,25)" opacity="0.019450572657129017" />
<polygon points="130 0 44 11 15 75 13 116 27 81 56 0 " fill="rgb(0,0,11)" opacity="0.028062599792211262" />
<polygon points="108 10 113 82 41 124 104 189 56 86 94 122 " fill="rgb(95,85,95)" opacity="0.6089801442116036" />
<polygon points="17 134 143 114 76 170 12 199 97 36 112 80 " fill="rgb(191,206,207)" opacity="0.32568064936015007" />
<polygon points="22 55 72 51 65 134 90 44 34 81 23 92 " fill="rgb(33,28,28)" opacity="0.34199558160807575" />
<polygon points="0 144 106 57 156 0 0 0 29 75 7 133 " fill="rgb(41,58,56)" opacity="0.22541525925913009" />
<polygon points="26 76 139 113 42 84 60 67 146 116 28 76 " fill="rgb(4,2,2)" opacity="0.38343352042977674" />
<polygon points="109 127 15 186 86 198 129 77 77 89 61 150 " fill="rgb(1,0,2)" opacity="0.26830200616275257" />
<polygon points="56 153 149 106 15 184 96 158 106 19 45 66 " fill="rgb(229,241,245)" opacity="0.20117285606110924" />
<polygon points="93 90 64 68 98 31 109 47 122 200 3 84 " fill="rgb(193,200,196)" opacity="0.2810253701341263" />
<polygon points="39 104 5 83 92 7 23 60 101 59 62 124 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="79 183 115 95 8 144 43 128 144 120 122 159 " fill="rgb(2,4,2)" opacity="0.1959920827123398" />
<polygon points="85 189 148 115 36 86 2 144 83 46 75 3 " fill="rgb(1,6,7)" opacity="0.13899432041887172" />
<polygon points="36 89 0 171 9 56 4 120 39 151 62 50 " fill="rgb(20,8,14)" opacity="0.31559546337868416" />
<polygon points="15 102 25 43 6 84 110 101 75 40 101 156 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="28 127 150 162 41 182 142 26 70 3 83 163 " fill="rgb(16,15,15)" opacity="0.1327737422460824" />
<polygon points="156 97 133 182 29 111 71 163 52 106 3 9 " fill="rgb(250,253,252)" opacity="0.08990119118848372" />
<polygon points="29 188 97 184 128 20 71 2 126 54 136 143 " fill="rgb(17,15,17)" opacity="0.6936085737780759" />
<polygon points="29 54 127 130 44 11 127 19 45 55 27 92 " fill="rgb(25,13,13)" opacity="0.3119024718038077" />
<polygon points="97 96 3 68 104 175 109 136 130 98 19 150 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="23 38 132 78 131 61 33 78 96 18 84 185 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="23 176 156 197 156 166 28 193 56 113 28 103 " fill="rgb(72,71,72)" opacity="0.6347723134540033" />
<polygon points="78 22 40 122 0 139 17 190 76 187 21 172 " fill="rgb(2,1,1)" opacity="0.4715853700756669" />
<polygon points="155 200 12 200 35 10 16 167 22 168 50 175 " fill="rgb(1,1,0)" opacity="0.5638680619551883" />
<polygon points="109 198 116 173 152 66 135 131 123 47 2 153 " fill="rgb(182,195,187)" opacity="0.11115559035210998" />
<polygon points="99 123 3 193 66 140 0 200 0 128 56 127 " fill="rgb(59,62,60)" opacity="0.5404415283384185" />
<polygon points="38 80 31 87 21 76 95 29 130 20 152 86 " fill="rgb(28,25,24)" opacity="0.26080559724083163" />
<polygon points="4 139 61 176 147 34 16 176 155 96 114 155 " fill="rgb(238,220,208)" opacity="0.029857001617086043" />
<polygon points="76 120 70 0 12 174 8 0 153 136 39 77 " fill="rgb(209,221,217)" opacity="0.1302055893003311" />
<polygon points="25 13 95 131 149 75 87 168 23 179 128 53 " fill="rgb(230,220,211)" opacity="0.07461482806647224" />
<polygon points="155 83 71 143 67 146 0 200 156 200 117 128 " fill="rgb(49,50,46)" opacity="0.396740545337926" />
<polygon points="73 6 32 40 21 55 56 7 113 67 153 63 " fill="rgb(22,26,25)" opacity="0.4210003612211144" />
<polygon points="114 77 156 122 141 90 67 63 40 191 117 102 " fill="rgb(201,217,210)" opacity="0.0563066684211333" />
<polygon points="104 124 17 48 9 172 94 153 77 53 129 19 " fill="rgb(226,253,226)" opacity="0.03313500922027668" />
<polygon points="79 78 42 199 100 95 124 120 139 68 139 121 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="27 74 15 64 125 78 93 6 130 97 65 46 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="47 186 117 70 64 77 55 17 90 100 62 146 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="82 37 47 172 56 196 32 125 52 10 20 12 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="127 170 26 10 5 118 26 50 57 34 75 175 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="52 57 33 26 97 151 138 88 5 154 128 40 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="44 105 103 181 36 184 40 70 92 180 49 184 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="39 66 3 56 153 64 52 148 16 98 81 109 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="25 51 112 75 115 112 102 162 78 198 140 7 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="18 65 50 22 88 156 137 146 100 131 63 8 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="141 3 152 23 83 84 127 176 49 108 24 182 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="54 61 119 68 102 61 77 69 148 111 81 132 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="127 140 26 1 114 25 127 154 114 139 140 168 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="142 104 78 35 49 56 52 25 134 46 120 136 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="132 35 85 8 19 164 146 16 65 122 39 179 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="48 138 88 183 9 184 54 4 153 51 26 3 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="61 133 54 34 147 156 108 119 53 183 99 68 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="11 14 30 60 130 73 145 144 78 168 103 151 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="136 161 103 189 16 10 12 85 86 52 85 108 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="125 129 6 26 10 82 132 89 12 146 51 26 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="76 64 22 79 134 133 96 94 53 82 112 10 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="59 100 117 80 8 96 109 101 3 77 25 53 " fill="rgb(0,0,0)" opacity="0.008421643498367049" />
<polygon points="23 92 22 126 142 15 51 165 125 54 75 182 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="66 184 29 40 108 96 101 80 155 118 25 163 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="105 93 16 90 145 71 86 112 2 24 116 159 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="140 13 116 155 31 1 144 66 119 61 122 163 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="15 145 91 128 97 175 26 26 93 29 107 45 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="86 187 145 192 33 54 85 175 64 125 1 169 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="113 46 133 72 92 166 92 192 136 41 106 183 " fill="rgb(0,0,0)" opacity="0.04937442058331443" />
<polygon points="16 172 133 30 33 150 142 7 53 70 113 170 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="106 54 82 179 126 62 119 26 98 159 104 178 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="72 30 46 88 103 72 132 162 9 123 55 197 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="82 38 98 198 14 193 60 74 143 157 6 129 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="79 111 18 118 32 60 40 136 79 20 6 22 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="74 57 57 167 62 30 101 9 11 112 39 182 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="91 112 5 131 28 10 102 170 23 126 103 98 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="93 181 135 1 55 46 126 52 65 47 86 8 " fill="rgb(0,48,0)" opacity="0.01361247026186252" />
<polygon points="31 8 77 108 56 81 28 45 92 50 3 89 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="96 200 43 46 32 190 146 163 133 49 96 48 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="60 105 22 117 123 178 144 46 104 25 40 4 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="26 97 42 125 10 56 128 37 113 172 59 137 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="96 154 36 43 81 129 20 170 143 83 69 34 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="105 20 105 15 135 138 79 151 16 129 152 189 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="128 198 117 12 98 139 103 88 133 117 20 19 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="123 184 81 188 37 22 76 116 63 19 107 45 " fill="rgb(181,0,245)" opacity="0.0033771493687440035" />
<polygon points="71 105 58 38 9 19 138 10 131 31 28 26 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="53 5 100 171 51 49 134 85 138 88 2 136 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="78 151 82 117 70 137 133 124 88 46 61 82 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="53 81 147 118 15 153 26 69 13 1 114 65 " fill="rgb(0,0,0)" opacity="0.001" />
<polygon points="58 114 94 173 121 7 101 47 87 200 16 58 " fill="rgb(0,0,0)" opacity="0.001" />
</svg>
        </div>
        <div class="center-content">
            <h1 class="center-text">Hello World...</h1>
            <p class="intro">I'm <strong>Benjamin Tiong</strong>, a software developer passionate about crafting beautiful and functional digital experiences. Explore my work and get to know me!</p>
        </div>

        <!--<div id="mydiv">
            <div id="mydivheader">Click here to move</div>
            <p>Move</p>
            <p>this</p>
            <p>DIV</p>
        </div>-->

        <!-- Buttons that will circle around -->
        <div class="buttons-wrapper">
            <a href="#about" class="btn">About</a>
            <a href="#coding" class="btn">Coding</a>
            <a href="#projects" class="btn">Projects</a>
            <a href="#contact" class="btn">Contact</a>
        </div>

        <!-- Placeholder for the navigation bar -->
        <nav class="navbar hidden">
            <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#coding">Coding</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </div>
    <script src="/static/javascript/drag.js"></script>
</body>
</html>