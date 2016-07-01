<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Try it yourself editor</title>
        <link rel="stylesheet" href="editorStyleSheet.css">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    </head>
    <body>
        <div id="codeEditorSection">
            <button onclick="runCode();" type="button" id="runButton"><i class="fa fa-play"></i> &nbsp;Run Code</button>
            <div class="editorRegion">
                <strong class="ArmyStrong">Code &nbsp;&nbsp; <i id="options" class="fa fa-gear"></i> 
                </strong>
                &nbsp;&nbsp;<a id="questionMark1">?</a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a id="description1" style="display:none; margin-top:6px; font-size:12px; color:ghostwhite; float:right;">Handcrafted with pride by real humans.</a>
                <div id="optionsMenu" class="hidden" style="margin-top:16px;">
                    <i id="font" class="fa fa-font"></i>
                    <form>
                        <input type="range" name="changeFontSize" id="changeFontSize" value="12" min="0" max="30" step="1" onchange="rangevalue.value = value + 'px'">
                        <output id="rangevalue">12px</output>
                    </form>
                </div>
                <br><br>
                <div>
                    <textarea name="sourceCode" id="sourceCode">
<!DOCTYPE HTML>
<html>
    <head>
        <title>HTML/CSS/JS Editor v. 1.0</title>
    </head>
    <body>
        <h1>Hello!</h1>
        <p>Write HTML, CSS or JavaScript code here and click 'Run Code'.</p>
    </body>
</html>
                    </textarea>
                </div>
            </div>
            <div id="outputBox" class="editorRegion Topify"> 
                <strong class="ArmyStrong">Output &nbsp; &nbsp;<i id="font" class="fa fa-expand"></i></strong>
                <div class="hidden" id="expansionDescription">
                    Expands the Output window. Press ESC key to minimize or toggle.
                </div>
                <br><br>
                <div>
                    <iframe name="targetCode" id="targetCode"></iframe>
                </div>
            </div>
        </div>
        <script type="text/javascript">
            function runCode() {
                var content = document.getElementById('sourceCode').value;
                var iframe = document.getElementById('targetCode');
                iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
                iframe.document.open();
                iframe.document.write(content);
                iframe.document.close();
                return false;
            }
            runCode();
        </script>
        <script>
            $('#options').click(function () {
                $('#optionsMenu').slideToggle();
                $('#codeEditorSection').toggleClass('extendSome');
            });
            $('#changeFontSize').on('change', function () {
                $('#sourceCode').css({
                    "font-size": $(this).val() + "px"
                });
            });
            $('.fa-expand').hover(function () {
                $('#expansionDescription').slideToggle();
            });
            $('.fa-expand').click(function () {
                $('body').scrollTop(0);
                $('#targetCode').toggleClass('growIFrame');
                $('body').toggleClass('disableScroll');
                $('#outputBox').toggleClass('Topify');
                $('.editorRegion').toggleClass('reAbsolutify');
            });
            $(document).keyup(function (e) {
                if (e.keyCode === 27) {
                    $('body').scrollTop(0);
                    $('#targetCode').toggleClass('growIFrame');
                    $('body').toggleClass('disableScroll');
                    $('#outputBox').toggleClass('Topify');
                    $('.editorRegion').toggleClass('reAbsolutify');
                }
            });
            $('#questionMark1').hover(function () {
                $('#description1').slideToggle();
            });
        </script>
    </body>
</html>