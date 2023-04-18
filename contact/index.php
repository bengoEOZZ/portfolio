<head>
    <h1 class="page-title">Let's Connect</h1>
    <link rel="stylesheet" type="text/css" href="/static/css/nav_style.css">
    <link rel="stylesheet" type="text/css" href="/static/css/contact_style.css">
</head>

<body>
    <?php
		require __DIR__ . '../../navbar.php';
	?>
    
    <!-- *********************** Contact Section *********************** -->
    <div id="contact-info">
        <div class="contact-info-section">
            <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <svg id="linkedin-icon" class="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
            </svg>
            <p class="contact-link-text">
                <a class="contact-link" href="https://www.linkedin.com/in/benjamin-tiong-493aa7232/" target="_blank">linkedin.com/in/benjamin-tiong/</a>
            </p>
        </div>
        <div class="contact-info-section">
            <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <svg id="email-icon" class="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
            </svg>
            <p class="contact-link-text">
                <a class="contact-link" href="mailto:benjamintiong2019@gmail.com" target="_blank">benjamintiong2019@gmail.com</a>
            </p>
        </div>
        <div class="contact-info-section">
            <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <svg id="phone icon" class="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
            </svg>
            <p class="contact-link-text">
                <a class="contact-link" href="tel:437-771-8035" target="_blank">(437) 771-8035</a>
            </p>
        </div>
    </div>
    <!-- ***************************** END ***************************** -->


    <br>
    <div style="text-align:center; font-size: 24px;"><b>OR</b></div>


    <!-- *********************** Contact Form *********************** -->
    <form id="contact-form" class="section" method="POST" action="https://api.web3forms.com/submit" target="_blank">
        <input type="hidden" name="access_key" value="b04a14fc-2e89-4a9c-a6e2-040689b7321e">
        <br>
        <label for="name">Name</label>
        <input type="text" name="name">
        <br>
        <label for="email">Email</label>
        <input type="email" name="email" required>
        <br>
        <label for="message">Message</label>
        <textarea name="message" rows="5" required></textarea>
        <br>
        <button type="submit">Send</button>
    </form>
    <!-- *************************** END *************************** -->
</body>