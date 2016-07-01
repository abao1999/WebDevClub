<?php
include ('register-exec.php');
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Sign Up for Web Dev Club</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="../../images/laptopicon.png" type="image/png"/>
        <link rel="stylesheet" type="text/css" href="form-designer-style.css"/>
    </head>
    <body>
        <section id="header">
            <h2>Sign Up Now And Create A Free Account</h2>
            <form action="../../index.php">
                <button class="account_buttons" type="submit">
                    Home
                </button>
            </form>
        </section>
        <section id="signup-form">
            <script src="../../forms/prototype.js" type="text/javascript"></script>
            <script src="../../forms/protoplus.js" type="text/javascript"></script>
            <script src="../../forms/jotform.js" type="text/javascript"></script>
            <script type="text/javascript">
                JotForm.init(function () {
                    setTimeout(function () {
                        $('input_1').hint('ex: myname@example.com');
                    }, 20);
                    setTimeout(function () {
                        $('input_5').hint('ex: 23');
                    }, 20);
                    JotForm.clearFieldOnHide = "disable";
                    JotForm.onSubmissionError = "jumpToSubmit";
                });
            </script>
            <form class="jotform-form" action="" method="post" name="form_51926711195155" id="51926711195155" accept-charset="utf-8">
                <input type="hidden" name="formID" value="51926711195155" />
                <div class="form-all">
                    <ul class="form-section page-section">

                        <li class="form-line jf-required">
                            <label class = "form-label">
                                Username
                                <span class="form-required">
                                    *
                                </span>
                            </label>
                            <div class="form-input-wide jf-required">
                                <input type="text" class=" form-textbox validate[required, Username, passCharLimit]" placeholder = "username" name="username" />
                            </div>
                        </li>
                        <li>
                            <div class = form-button-error><?php echo $error; ?></div>
                        </li>
                        <li class="form-line jf-required">
                            <label class = "form-label">
                                Password
                                <span class="form-required">
                                    *
                                </span>
                            </label>
                            <div class="form-input-wide jf-required">
                                <input placeholder = "password" type="text" class=" form-textbox validate[required, Password, passCharLimit]" id="passwordID" name="password" value = "<?php echo (isset($_POST['password'])) ? $_POST['password'] : ''; ?>" />
                            </div>
                        </li>  

                        <li class="form-line jf-required" > 
                            <label class = "form-label">
                                Confirm Password
                                <span class="form-required">
                                    *
                                </span>
                            </label>
                            <div class="form-input-wide jf-required">
                                <input placeholder ="confirm" type = "text" class="form-textbox validate[required, Password, Password_Confirm, passCharLimit]" id="cpasswordID" name ="cpassword" value = "<?php echo (isset($_POST['cpassword'])) ? $_POST['cpassword'] : ''; ?>"/>
                            </div>
                        </li>
                        <li class="form-line jf-required">
                            <label class = "form-label">
                                First Name
                                <span class="form-required">
                                    *
                                </span>
                            </label>
                            <div class="form-input-wide jf-required">
                                <span style="vertical-align: top">
                                    <input class="form-textbox validate[required]" name="fname" value = "<?php echo (isset($_POST['fname'])) ? $_POST['fname'] : ''; ?>"/>
                                </span>
                            </div>
                        </li>
                        <li class="form-line">
                            <label class = "form-label">
                                Last Name
                            </label>
                            <div class="form-input-wide">
                                <span style="vertical-align: top">
                                    <input class="form-textbox" name="lname" value = "<?php echo (isset($_POST['lname'])) ? $_POST['lname'] : ''; ?>"/>
                                </span>
                            </div>
                        </li>
                        <li class="form-line jf-required">
                            <label class = "form-label" id="email">
                                E-mail
                                <span class="form-required">
                                    *
                                </span>
                            </label>
                            <div id="cid_0" class="form-input-wide jf-required">
                                <input type="email" class=" form-textbox validate[required, Email]" id="emailID" name="email" value = "<?php echo (isset($_POST['email'])) ? $_POST['email'] : ''; ?>"/>
                            </div>
                        </li>

                        <li class="form-line jf-required" data-type="control_email">
                            <label class = "form-label" id="email">
                                Confirm Email
                                <span class="form-required">
                                    *
                                </span>
                            </label>
                            <div id="cid_0" class="form-input-wide jf-required">
                                <input type="email" class="form-textbox validate[required, Email, Email_Confirm]" id="emailID_confirm" name = "cemail" value = "<?php echo (isset($_POST['cemail'])) ? $_POST['cemail'] : ''; ?>"/>
                            </div>
                        </li>
                        <li class="form-line">
                            <label class = "form-label">
                                Secret Registration Code
                                <span class="form-required">
                                    *
                                </span>
                            </label>
                            <div class="form-input-wide">
                                <span style="vertical-align: top">
                                    <input class="form-textbox validate[required]" name="secretcode" value = "<?php echo (isset($_POST['secretcode'])) ? $_POST['secretcode'] : ''; ?>"/>
                                </span>
                            </div>
                        </li>
                        <li>
                            <div class = form-button-error><?php echo $wrongcode; ?></div>
                        </li>
                        <li class="form-line " id="terms&conditions">
                            <div class="form-input-wide ">
                                <div style="width:100%; text-align:left;">
                                    <label>
                                        By Clicking Submit, You Agree to the <a target = "policy" href = "TermsAndConditions.html">Terms and Conditions</a>
                                    </label>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="form-buttons-wrapper">
                                <input style = "margin-left:36px; width:300px;" type="submit" class="form-submit-button" value = "Submit" name = "Submit"/>
                            </div>
                        </li>

                    </ul>
                </div>
            </form>
            <br><br><br><br><br><br>
            <!-- Change the width and height values to suit you best -->
            <div class="typeform-widget" data-url="https://anthonybao1999.typeform.com/to/AkwGmC" data-text="WebDevClub Survey" style="width:100%;height:800px;"></div>
            <script>(function () {
                    var qs, js, q, s, d = document, gi = d.getElementById, ce = d.createElement, gt = d.getElementsByTagName, id = 'typef_orm', b = 'https://s3-eu-west-1.amazonaws.com/share.typeform.com/';
                    if (!gi.call(d, id)) {
                        js = ce.call(d, 'script');
                        js.id = id;
                        js.src = b + 'widget.js';
                        q = gt.call(d, 'script')[0];
                        q.parentNode.insertBefore(js, q)
                    }
                })()
            </script>
            <div style="font-family: Sans-Serif;font-size: 12px;color: #999;opacity: 0.5; padding-top: 5px;">Powered by <a href="http://www.typeform.com/?utm_campaign=typeform_AkwGmC&amp;utm_source=website&amp;utm_medium=typeform&amp;utm_content=typeform-embedded&amp;utm_term=English" style="color: #999" target="_blank">Typeform</a></div>
        </section>
        <footer id="footer">
            <h1> Web Dev Club </h1>
            <br><br>
            <p>Phone: (602)-819-5728</p>
            <p>Email: <a href="mailto:anthonybao1999@gmail.com">anthonybao1999@gmail.com</a></p>
            <p>Email: <a href="mailto:richardbao419@gmail.com">richardbao419@gmail.com</a></p>
            <p>Email: <a href="mailto:njohns132@gmail.com">njohns132@gmail.com</a></p>
            <a target="social media 1" href="https://www.facebook.com/pages/Web-Dev-Club/1611907219084201?skip_nax_wizard=true"><i class="fa fa-facebook fa-2x"></i></a>
            <p> Thank you for visiting </p>
            <a href="#">Back to top</a>
        </footer>
        <div style="background:black; text-align:center; color:white!important; width:100%; padding:20px;">
            <p>Content Copyright 2015 Anthony Bao and Richard Bao. All rights reserved</p>
        </div>
    </body>
</html>