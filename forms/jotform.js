/*jslint nomen:false, debug:true, evil:true, vars:false, browser:true, forin:true, undef:false, white:false */
/**
 * JotForm Form object
 */
var JotForm = {
    /**
     * JotForm domain
     * @var String
     */
    url: "//www.jotform.com/", // Will get the correct URL from this.getServerURL() method
    /**
     * JotForm request server location
     * @var String
     */
    server: "//www.jotform.com/server.php", // Will get the correct URL from this.getServerURL() method
    /**
     * All conditions defined on the form
     * @var Object
     */
    conditions: {},
    /**
     * All calculations defined on the form
     * @var Object
     */
    calculations: {},
    /**
     * Condition Values
     * @var Object
     */
    condValues: {},
    /**
     * Progress bar object above form
     * @var Object
     */
    progressBar: false,
    /**
     * All JotForm forms on the page
     * @var Array
     */
    forms: [],
    /**
     * Will this form be saved on page changes
     * @var Boolean
     */
    saveForm: false,
    /**
     * Array of extensions
     * @var Array
     */
    imageFiles: ["png", "jpg", "jpeg", "ico", "tiff", "bmp", "gif", "apng", "jp2", "jfif"],
    /**
     * array of autocomplete elements
     * @var Object
     */
    autoCompletes: {},
    /**
     * Array of default values associated with element IDs
     * @var Object
     */
    defaultValues: {},
    /**
     * Debug mode
     * @var Boolean
     */
    debug: false,
    /**
     * Check if the focused inputs must be highligted or not
     * @var Boolean
     */
    highlightInputs: true,
    /**
     * it will disable the automatic jump to top on form collapse
     * @var Boolean
     */
    noJump: false,
    /**
     * Indicates that form is still under initialization
     * @var Boolean
     */
    initializing: true,
    /**
     * Keeps the last focused input
     * @var Boolean
     */
    lastFocus: false,
    /**
     * Form's payment type, if any
     * @var String
     */
    payment: false,
    /**
     * Status of multipage save
     * @var Boolean
     */
    saving: false,
    /**
     * Texts used in the form
     * @var Object
     */
    texts: {
        UsernameTaken: 'Username in use',
        confirmEmail: 'E-mail does not match',
        confirmPassword:'Password does not match',
        password:'Only alpha-numeric values allowed',
        passwordRange:'Must be between 5 and 12 characters',
        pleaseWait: 'Please wait...',
        confirmClearForm: 'Are you sure you want to clear the form',
        lessThan: 'Your score should be less than or equal to',
        incompleteFields: 'There are incomplete required fields. Please complete them.',
        required: 'This field is required.',
        requireOne: 'At least one field required.',
        requireEveryRow: 'Every row is required.',
        requireEveryCell: 'Every cell is required.',
        email: 'Enter a valid e-mail address',
       
        uploadExtensions: 'You can only upload following files:',
        noUploadExtensions: 'File has no extension file type (e.g. .txt, .png, .jpeg)',
        multipleFileUploads_typeError: '{file} has invalid extension. Only {extensions} are allowed.',
        multipleFileUploads_sizeError: '{file} is too large, maximum file size is {sizeLimit}.',
        multipleFileUploads_minSizeError: '{file} is too small, minimum file size is {minSizeLimit}.',
        multipleFileUploads_emptyError: '{file} is empty, please select files again without it.',
        multipleFileUploads_onLeave: 'The files are being uploaded, if you leave now the upload will be cancelled.',
        multipleFileUploads_fileLimitError: 'Only {fileLimit} file uploads allowed.',
        generalError: 'There are errors on the form. Please fix them before continuing.',
        generalPageError: 'There are errors on this page. Please fix them before continuing.',
 
    },
    paymentTexts: {
        couponApply: 'Apply',
        couponChange: 'Change',
        couponEnter: 'Enter Coupon',
        couponExpired: 'Coupon is expired. Please try another one.',
        couponInvalid: 'Coupon is invalid. Please try another one.',
        couponValid: 'Coupon is valid.',
        couponBlank: 'Please enter a coupon.',
        shippingShipping: 'Shipping',
        totalTotal: 'Total',
        totalSubtotal: 'Subtotal',
        taxTax: 'Tax'
    },
    /**
     * Find the correct server url from forms action url, if there is no form use the defaults
     */
    getServerURL: function () {
        var form = $$('.jotform-form')[0];
        var action;

        if (form) {
            if ((action = form.readAttribute('action'))) {
                if (action.include('submit.php') || action.include('server.php')) {
                    var n = !action.include('server.php') ? "submit" : "server";
                    this.server = action.replace(n + '.php', 'server.php');
                    this.url = action.replace(n + '.php', '');
                } else {
                    var d = action.replace(/\/submit\/.*?$/, '/');
                    this.server = d + 'server.php';
                    this.url = d;
                }

            }
        }
    },
    /**
     * Changes only the given texsts
     * @param {Object} newTexts
     */
    alterTexts: function (newTexts, payment) {
        if (payment) {
            Object.extend(this.paymentTexts, newTexts || {});
            this.changePaymentStrings(newTexts);
        } else {
            Object.extend(this.texts, newTexts || {});
        }
    },
    /**
     * A short snippet for detecting versions of IE in JavaScript
     * without resorting to user-agent sniffing
     */
    ie: function () {
        var undef,
            v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');

        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                all[0]
            );

        return v > 4 ? v : undef;
    },
    /**
     * Creates the console arguments
     */
    createConsole: function () {
        var consoleFunc = ['log', 'info', 'warn', 'error'];
        $A(consoleFunc).each(function (c) {
            this[c] = function () {
                if (JotForm.debug) {
                    if ('console' in window) {
                        try {
                            console[c].apply(this, arguments);
                        } catch (e) {
                            if (typeof arguments[0] == "string") {
                                console.log(c.toUpperCase() + ": " + $A(arguments).join(', '));
                            } else {
                                if (Prototype.Browser.IE) {
                                    alert(c + ": " + arguments[0]);
                                } else {
                                    console[c](arguments[0]);
                                }
                            }
                        }
                    }
                }
            };
        }.bind(this));

        if (JotForm.debug) {
            JotForm.debugOptions = document.readJsonCookie('debug_options');
        }
    },
    /**
     * Initiates the form and all actions
     */
    init: function (callback) {
        var ready = function () {
            try {
                this.populateGet();

                if (document.get.debug == "1") {
                    this.debug = true;
                }
                this.createConsole();

                this.getServerURL();

                this.checkJSON();

                if (callback) {
                    callback();
                }

                //will load editMode script dynamically
                if ((document.get.mode == "edit" || document.get.mode == "inlineEdit" || document.get.mode == 'submissionToPDF') && document.get.sid) {
                    this.editMode();
                }

                this.noJump = ("nojump" in document.get);
                this.uniqueID = this.uniqid();
                this.handleSavedForm();
                this.setTitle();
                this.setHTMLClass();
                this.getDefaults();

                if ($$('input[name="simple_fpc"]').length > 0) {
                    this.payment = $$('input[name="simple_fpc"]')[0].getAttribute('data-payment_type');
                }

                if (this.payment === "paypalpro") {
                    this.handlePaypalPro();
                    this.isFormEmbedded();
                }

                if (this.payment === "paypalexpress") {
                    this.handlePaypalExpress();
                    this.isFormEmbedded();
                }

                // If coupon button exists, load checkCoupon
                if ($('coupon-button')) {
                    this.handleCoupon();
                }

                if ($$('.paypal-button').length > 0 && $('use_paypal_button')) {
                    this.handlePaypalButtons();
                }

                this.handleFormCollapse();
                this.handlePages();

                if ($$('.form-product-has-subproducts').length > 0) {
                    this.handlePaymentSubProducts();
                }

                // If form is hosted in an iframe, calculate the iframe height
                if (window.parent && window.parent != window) {
                    this.handleIFrameHeight();
                    // this.removeCover();
                }

                this.jumpToPage();

                this.highLightLines();
                this.setButtonActions();
                this.initGradingInputs();
                this.initSpinnerInputs();
                this.initNumberInputs();
                this.setConditionEvents();
                this.setCalculationEvents();
                this.runAllCalculations();
                this.setCalculationResultReadOnly();
                this.prePopulations();
                this.handleAutoCompletes();
                this.handleTextareaLimits();
                this.handleDateTimeChecks();
                this.handleOtherOptions(); // renamed from handleRadioButtons
                this.setFocusEvents();
                this.disableAcceptonChrome();
                this.handleScreenshot();

                $A(document.forms).each(function (form) {
                    if (form.name == "form_" + form.id || form.name == "q_form_" + form.id) {
                        this.forms.push(form);
                    }
                }.bind(this));

                var hasCaptcha = $$('div[id^=recaptcha_input]').length;

                if (!hasCaptcha || $$('*[class*="validate"]').length > hasCaptcha) {
                    this.validator();
                }
                ;

                this.fixIESubmitURL();
                this.disableHTML5FormValidation();

                if ($('progressBar')) {
                    this.setupProgressBar();
                }

                // if there is a donation field 
                if ($$('input[id*="_donation"]').length > 0) {
                    this.handleDonationAmount();
                }
                //disable submit if nosubmit=true on request parameters
                if (getQuerystring('nosubmit')) {
                    $$('.form-submit-button').each(function (b) {
                        b.disable();
                    });
                }
                //display all sections
                //used for pdf generation
                if (getQuerystring('displayAllSections')) {
                    var sections = $$('.form-section');
                    // First hide all the pages
                    sections.each(function (section) {
                        section.setStyle({display: 'block'});
                    });
                }

                this.track();

            } catch (err) {
                JotForm.error(err);
            }

            this.initializing = false; // Initialization is over
        }.bind(this);

        if (document.readyState == 'complete' || (this.jsForm && document.readyState === undefined)) {
            ready();
        } else {
            document.ready(ready);
        }
    },
    handleIFrameHeight: function () {
        var height;
        if ($$('.form-collapse-table').length > 0) {
            height = $$('body')[0].getHeight();
        } else if ($$('.form-section').length > 1) {
            var maxHeight = 0;
            var body = $$('body')[0];
            var sections = $$('.form-section');

            // First hide all the pages
            sections.each(function (section) {
                section.setStyle({display: 'none'});
            });

            // Dislay each page sequentially, and find the body height
            sections.each(function (section) {
                section.setStyle({display: 'block'});
                if (maxHeight < body.getHeight()) {
                    maxHeight = body.getHeight();
                }
                section.setStyle({display: 'none'});
            });

            // Display the first page
            sections[0].setStyle({display: 'block'});
            height = maxHeight;
        } else {
            //height = $$('body').first().getHeight();

            //augment jQuery's height implementation
            var jQueryHeight = Math.max(
                Math.max(document.body["scrollHeight"], 0/*, document.documentElement["scrollHeight"]*/),
                Math.max(document.body["offsetHeight"], document.documentElement["offsetHeight"])
            );

            //height = Math.max(height, jQueryHeight);
            height = jQueryHeight;
        }

        // if this is a captcha verification page, set height to 300 
        height = ( document.title === 'Please Complete' ) ? 300 : height;
        if ("console" in window) {
            if ("log" in console) {
                console.log('Debug : setting height to ', height, ' from iframe');
            }
        }
        window.parent.postMessage('setHeight:' + height, '*');
    },
    removeCover: function () {
        $$('.form-cover-wrapper').each(function (el) {
            el.remove();
        });
        $$('.form-all').each(function (el) {
            el.removeClassName('top-cover').removeClassName('left-cover').removeClassName('right-cover');
        });
    },
    fixIESubmitURL: function () {
        try {
            // IE on XP does not support TLS SSL 
            // http://en.wikipedia.org/wiki/Server_Name_Indication#Support
            if (this.ie() <= 8 && navigator.appVersion.indexOf('NT 5.')) {
                $A(this.forms).each(function (form) {
                    if (form.action.include("s://submit.")) {
                        form.action = form.action.replace(/\/\/submit\..*?\//, "//secure.jotform.com/");
                    }
                });
            }
        } catch (e) {
        }
    },
    screenshot: false, // Cached version of screenshot
    passive: false, // States if wishbox iis getting screenshot passively
    onprogress: false, // Are we currently processing a screenshot?
    compact: false, // Use the compact mode of the editor
    imageSaved: false, // Check if the image saved by screenshot editor
    /**
     * Find screenshot buttons and set events
     * HIDE or SHOW according to the environment
     */
    handleScreenshot: function () {
        var $this = this;
        setTimeout(function () {
            $$('.form-screen-button').each(function (button) {
                //$this.getContainer(button).hide();
                // If window parent has feedback then show screenshot
                if (window.parent && window.parent.JotformFeedbackManager) {
                    $this.getContainer(button).show();
                    button.observe('click', function () {
                        $this.passive = false;
                        try {
                            $this.takeScreenShot(button.id.replace('button_', ''));
                        } catch (e) {
                            console.error(e);
                        }
                    });
                    setTimeout(function () {
                        $this.passive = !window.parent.wishboxInstantLoad;
                        $this.takeScreenShot(button.id.replace('button_', ''));
                    }, 0);
                }
            });
        }, 300);
    },
    getCharset: function (doc) {
        if (!doc) {
            doc = document;
        }

        return doc.characterSet || doc.defaultCharset || doc.charset || 'UTF-8';
    },
    /**
     * Convert number of bytes into human readable format
     *
     * @param integer bytes     Number of bytes to convert
     * @param integer precision Number of digits after the decimal separator
     * @return string
     */
    bytesToSize: function (bytes, precision) {
        var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        var posttxt = 0;
        if (bytes == 0) return 'n/a';
        if (bytes < 1024) {
            return Number(bytes) + " " + sizes[posttxt];
        }
        while (bytes >= 1024) {
            posttxt++;
            bytes = bytes / 1024;
        }
        return bytes.toFixed(precision || 2) + " " + sizes[posttxt];
    },
    /*
     * Disables HTML5 validation for stopping browsers to stop submission process
     * (fixes bug of pending submissions when jotform validator accepts email field
     * and browsers' own validator doesn't ) 
     */
    disableHTML5FormValidation: function () {
        $$("form").each(function (f) {
            f.setAttribute("novalidate", true);
        });
    },
    /**
     * When button clicked take the screenshot and display it in the editor
     */
    takeScreenShot: function (id) {
        var p = window.parent;          // parent window
        var pleaseWait = '<div id="js_loading" ' +
            'style="position:fixed; z-index:10000000; text-align:center; ' +
            'background:#333; border-radius:5px; top: 20px; right: 20px; ' +
            'padding:10px; box-shadow:0 0 5 rgba(0,0,0,0.5);">' +
            '<img src="' + this.url + 'images/loader-black.gif" />' +
            '<div style="font-family:verdana; font-size:12px;color:#fff;">' +
            'Please Wait' +
            '</div></div>';

        if (this.onprogress) {
            p.$jot(pleaseWait).appendTo('body');
            return;
        }

        if (p.wishboxCompactLoad) {
            this.compact = true;
        }

        if (this.screenshot) {
            if (this.compact) {
                p.$jot('.jt-dimmer').hide();
            } else {
                p.$jot('.jt-dimmer, .jotform-feedback-link, .jt-feedback').hide();
            }

            p.jotformScreenshotURL = this.screenshot.data;
            this.injectEditor(this.screenshot.data, this.screenshot.shotURL);
            return;
        }

        this.scuniq = JotForm.uniqid(); // Unique ID to be used in the screenshot
        this.scID = id;               // Field if which we will place the screen shot in
        var f = JotForm.getForm($('button_' + this.scID));
        this.sformID = f.formID.value;
        this.onprogress = true;
        var $this = this;             // Cache the scope
        //this.wishboxServer = '//ec2-107-22-70-25.compute-1.amazonaws.com/wishbox-bot.php'; 
        this.wishboxServer = 'http://screenshots.jotform.com/wishbox-server.php'; //kemal: made this http since https not working anyway
        //this.wishboxServer = "//beta23.jotform.com/server.php";//JotForm.server;
        // Create a form element to make a hidden post. We need this to overcome xDomain Ajax restrictions
        var form = new Element('form', {
            action: this.wishboxServer,
            target: 'screen_frame',
            id: 'screen_form',
            method: 'post',
            "accept-charset": 'utf-8'
        }).hide();
        // Create a syntethic doctype for page source. This is the most common doctype so I choose this
        var doc = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" >';
        // Hide Jotform specific page element on the parent, so they do not appear on screenshot

        /*if(this.compact){
         p.$jot('.jt-dimmer').hide();
         }else{*/
        p.$jot('.jt-dimmer, .jotform-feedback-link, .jt-feedback').hide();
        //}

        p.$jot('.hide-on-screenshot, .hide-on-screenshot *').css({'visibility': 'hidden'});
        // Read the source of parent window
        var parentSource = p.document.getElementsByTagName('html')[0].innerHTML;
        parentSource = parentSource.replace(/(<noscript\b[^>]*>.*?<\/noscript>)+/gim, '');         // remove single line tags
        parentSource = parentSource.replace(/(<noscript\b[^>]*>(\s+.*\s+)+)+<\/noscript>/gim, ''); // remove multi line tags
        p.$jot('.hide-on-screenshot, .hide-on-screenshot *').css({'visibility': 'visible'});
        parentSource = parentSource.replace(/(\<\/head\>)/gim, "<style>body,html{ min-height: 800px; }</style>$1");
        var ie = $this.ie();
        // When it's the broken IE use a totally different aproach but IE9 works correctly so skip it
        if (ie !== undefined && ie < 9) {
            parentSource = parentSource.replace(/(\<\/head\>)/gim, "<style>*{ border-radius:0 !important; text-shadow:none !important; box-shadow:none !important; }</style>$1");
        }

        if (this.passive) {
            p.$jot('.jt-dimmer, .jotform-feedback-link, .jt-feedback').show();
        } else {
            p.$jot('.jotform-feedback-link').show();
            p.$jot(pleaseWait).appendTo('body');
        }

        // create form elements and place the values respectively
        var html = new Element('textarea', {name: 'html'});

        var nozip = this.getCharset(p.document).toLowerCase() !== 'utf-8';

        if (nozip) {
            html.value = encodeURIComponent(doc + parentSource + "</html>");
            form.insert(new Element('input', {type: 'hidden', name: 'nozip'}).putValue("1"));
        } else {
            form.insert(new Element('input', {type: 'hidden', name: 'nozip'}).putValue("0"));
            html.value = encodeURIComponent(p.$jot.jSEND((doc + parentSource + "</html>")));
        }
        var charset = new Element('input', {type: 'hidden', name: 'charset'}).putValue(this.getCharset(p.document));
        var height = new Element('input', {type: 'hidden', name: 'height'}).putValue(parseFloat(p.$jot(p).height()));
        var scrollTop = new Element('input', {type: 'hidden', name: 'scrollTop'}).putValue(p.$jot(p).scrollTop());
        var url = new Element('input', {type: 'hidden', name: 'url'}).putValue(p.location.href);
        var uid = new Element('input', {type: 'hidden', name: 'uniqID'}).putValue(this.scuniq);
        var fid = new Element('input', {type: 'hidden', name: 'formID'}).putValue(this.sformID);
        var action = new Element('input', {type: 'hidden', name: 'action'}).putValue("getScreenshot");
        // This is the iframe that we will submit the form into
        var iframe = new Element('iframe', {name: 'screen_frame', id: 'screen_frame_id'}).hide();
        // When iframe is loaded it usually means screenshot is completed but we still need to make sure.
        iframe.observe('load', function () {
            // Let's check server if screenshot correctly created there
            $this.checkScreenShot();
        });

        if (p.wishboxInstantLoad && (ie === undefined || ie > 8)) {
            this.injectEditor(false, false);
        }

        // Insert all created elements on the page and directly submit the form
        form.insert(html).insert(height).insert(scrollTop).insert(action).insert(uid).insert(url).insert(fid).insert(charset);
        $(document.body).insert(form).insert(iframe);
        form.submit();
    },
    /**
     * Checks if JSON is available and loads it if not
     */
    checkJSON: function () {
        if (typeof JSON !== 'object') {
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.src = "/js/vendor/json2.js";
            $(document.body).appendChild(script);
        }
    },

    /**
     * Will get additional URL queries from SCRIPT embed or feedback widget
     */
    populateGet: function () {
        try {
            if ('FrameBuilder' in window.parent && "get" in window.parent.FrameBuilder && window.parent.FrameBuilder.get != []) {

                var outVals = {};
                var getVals = window.parent.FrameBuilder.get;
                $H(getVals).each(function (pair) {
                    if (typeof pair[1] === 'object') {
                        for (prop in pair[1]) {
                            outVals[pair[0] + "[" + prop + "]"] = pair[1][prop];
                        }
                    } else {
                        outVals[pair[0]] = pair[1];
                    }


                });
                document.get = Object.extend(document.get, outVals);
            }
        } catch (e) {
        }
    },
    
    /**
     * Php.js uniqueID generator
     * @param {Object} prefix
     * @param {Object} more_entropy
     */
    uniqid: function (prefix, more_entropy) {
        if (typeof prefix == 'undefined') {
            prefix = "";
        }
        var retId;
        var formatSeed = function (seed, reqWidth) {
            seed = parseInt(seed, 10).toString(16); // to hex str
            if (reqWidth < seed.length) {
                return seed.slice(seed.length - reqWidth);
            }
            if (reqWidth > seed.length) {
                return Array(1 + (reqWidth - seed.length)).join('0') + seed;
            }
            return seed;
        };
        if (!this.php_js) {
            this.php_js = {};
        }
        if (!this.php_js.uniqidSeed) {
            this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
        }
        this.php_js.uniqidSeed++;
        retId = prefix;
        retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
        retId += formatSeed(this.php_js.uniqidSeed, 5);
        if (more_entropy) {
            retId += (Math.random() * 10).toFixed(8).toString();
        }
        return retId;
    },
    
    /**
     * Handles the form being saved stuation
     */
    handleSavedForm: function () {

        if (!('session' in document.get) || !(document.get.session.length > 0)) {
            return;
        }
        JotForm.saveForm = true;

        var formIDField = $$('input[name="formID"]')[0];

        formIDField.insert({
            after: new Element('input', {
                type: 'hidden',
                name: 'session_id',
                id: "session"
            }).putValue(document.get.session)
        });

        formIDField.insert({
            after: new Element('input', {
                type: 'hidden',
                id: 'current_page',
                name: 'current_page'
            }).putValue(0)
        });

        var a = new Ajax.Jsonp(JotForm.url + 'server.php', {
            parameters: {
                action: 'getSavedSubmissionResults',
                formID: formIDField.value,
                sessionID: document.get.session,
                URLparams: window.location.href
            },
            evalJSON: 'force',
            onComplete: function (t) {
                var res = t.responseJSON;
                if (res.success) {
                    if (res.submissionID) {
                        formIDField.insert({
                            after: new Element('input', {
                                type: 'hidden',
                                name: 'submission_id',
                                id: 'submission_id'
                            }).putValue(res.submissionID)
                        });

                        try {
                            JotForm.editMode(res);
                        } catch (e) {
                            console.error(e);
                        }
                        JotForm.openInitially = res.currentPage - 1;
                    }

                }
            }
        });
    },
    
    /**
     * Place the form title on pages title to remove the Form text on there
     */
    setTitle: function () {
        // Do this only when page title is form. otherwise it can overwrite the users own title
        if (document.title == "Form") {
            var head;
            if ((head = $$('.form-header')[0])) {
                try {
                    document.title = head.innerHTML.stripTags().strip();
                    document.title = document.title.unescapeHTML();
                } catch (e) {
                    document.title = head.innerHTML;
                }
            }
        }
    },
    /*
     * Add browser class to html element.
     */
    setHTMLClass: function () {
        // only ie for now
        var ie = this.ie();
        if (ie) {
            $$('html')[0].addClassName('ie-' + ie);
        }
    },
    /**
     * Sets the last focus event to keep latest focused element
     */
    setFocusEvents: function () {
        $$('.form-radio, .form-checkbox').each(function (input) { //Neil: use mousedown event for radio & checkbox (Webkit bug:181934)
            input.observe('mousedown', function () {
                JotForm.lastFocus = input;
            })
        });
        $$('.form-textbox, .form-password, .form-textarea, .form-upload, .form-dropdown').each(function (input) {
            input.observe('focus', function () {
                JotForm.lastFocus = input;
            });
        });
    },
    /**
     * Disables Accept for Google Chrome browsers
     */
    disableAcceptonChrome: function () {
        if (!Prototype.Browser.WebKit) {
            return;
        }
        $$('.form-upload').each(function (input) {
            if (input.hasAttribute('accept')) {
                var r = input.readAttribute('accept');
                input.writeAttribute('accept', '');
                input.writeAttribute('file-accept', r);
            }
        });
    },

    /**
     * Populate hidden field with user's browser info
     */
    populateBrowserInfo: function (id) {
        var OS = "Unknown OS";
        if (navigator.appVersion.indexOf("iPhone") != -1) OS = "iOS iPhone";
        else if (navigator.appVersion.indexOf("iPad") != -1) OS = "iOS iPad";
        else if (navigator.appVersion.indexOf("Android") != -1) OS = "Android";
        else if (navigator.appVersion.indexOf("Win") != -1) OS = "Windows";
        else if (navigator.appVersion.indexOf("Mac") != -1) OS = "MacOS";
        else if (navigator.appVersion.indexOf("Linux") != -1) OS = "Linux";

        var browser = "Unknown Browser";
        if (navigator.userAgent.indexOf("MSIE") != -1) browser = "Internet Explorer";
        else if (navigator.userAgent.indexOf("Firefox") != -1) browser = "Firefox";
        else if (navigator.userAgent.indexOf("Chrome") != -1) browser = "Chrome";
        else if (navigator.userAgent.indexOf("Safari") != -1) browser = "Safari";
        else if (navigator.userAgent.indexOf("Opera") != -1) browser = "Opera";

        var offset = new Date().getTimezoneOffset();
        var sign = (offset < 0) ? "+" : "";
        var timeZone = 'GMT ' + sign + -(offset / 60);

        var lang = navigator.language || navigator.browserLanguage || navigator.userLanguage;

        var val = 'BROWSER: ' + browser + "\n";
        val += 'OS: ' + OS + "\n";
        val += 'LANGUAGE: ' + lang + "\n";
        val += 'RESOLUTION: ' + screen.width + "*" + screen.height + "\n";
        val += 'TIMEZONE: ' + timeZone + "\n";
        val += 'USER AGENT: ' + navigator.userAgent + "\n";
        if ($(id).value.length > 0)
            $(id).value += "\n";
        $(id).value += val;
    },

    /**
     * Collects all inital values of the fields and saves them as default values
     * to be restored later
     */
    getDefaults: function () {
        $$('.form-textbox, .form-dropdown, .form-textarea').each(function (input) {
            if (input.hinted || input.value === "") {
                return;
                /* continue; */
            }

            JotForm.defaultValues[input.id] = input.value;
        });

        $$('.form-radio, .form-checkbox').each(function (input) {
            if (!input.checked) {
                return;
                /* continue; */
            }
            JotForm.defaultValues[input.id] = input.value;
        });
    },
    /**
     * Enables or disables the Other option on radiobuttons/checkboxes
     */
    handleOtherOptions: function () {

        $$('.form-radio-other-input, .form-checkbox-other-input').each(function (inp) {
            inp.hint(inp.getAttribute('data-otherHint') || 'Other');
        });

        $$('.form-radio, .form-checkbox').each(function (input) {

            var id = input.id.replace(/input_(\d+)_\d+/gim, '$1');

            if (id.match('other_')) {
                id = input.id.replace(/other_(\d+)/, '$1');
            }

            if ($('other_' + id)) {
                var other = $('other_' + id);
                var other_input = $('input_' + id);
                var otherOption = input.type === 'radio' ? input : other;
                other_input.observe('keyup', function () {
                    other.value = other_input.value;
                });
                other_input.observe('blur', function () {
                    other_input.value = other_input.value || other_input.getAttribute('data-otherHint');
                });
                other_input.observe('click', function () {
                    $('other_' + id).checked = true;
                    other_input.value = other_input.value === other_input.getAttribute('data-otherHint') ? '' : other_input.value;
                });
                // perform only on the "Other" option if input is check box
                otherOption.observe('click', function () {

                    if (other.checked) {
                        other_input.select();
                    } else {
                        if (other_input.hintClear) {
                            other_input.hintClear();
                        }
                    }
                });
            }
        });
    },

    shuffleOptions: function (id) {
        var type = JotForm.getInputType(id);
        if (type === "radio" || type === "checkbox") {
            try {
                var options = $("id_" + id).select('.form-' + type + '-item');
                var length = $("id_" + id).down('.form-' + type + '-other-input') ? options.length - 1 : options.length; //don't shuffle "other"

                for (var i = 0; i < length - 1; i++) {
                    var toSwap = $("id_" + id).select('.form-' + type + '-item')[i];
                    var randy = Math.floor(Math.random() * length);
                    var swappedOut = options[randy].replace(toSwap);
                    var insertAfter = $("id_" + id).select('.form-' + type + '-item')[i].next() ? $("id_" + id).select('.form-' + type + '-item')[i].next() : $("id_" + id).select('.form-' + type + '-item')[i];
                    insertAfter.insert({after: swappedOut});
                }

                //deal with columns
                if ($("id_" + id).down('.form-multiple-column')) {
                    var columnCount = $("id_" + id).down('.form-multiple-column').readAttribute("data-columncount");
                    $("id_" + id).select('.form-' + type + '-item').each(function (item, i) {
                        item.setStyle({'clear': (i % columnCount == 0) ? 'left' : 'none'});
                    });
                }
            } catch (e) {
                console.log(e);
            }

        } else if (type === "select") {
            try {
                var clone = $('input_' + id).clone(true);
                $('input_' + id).update("");
                var length = clone.length;
                $('input_' + id).insert(clone[0].clone(true));
                for (var i = 1; i < length; i++) {
                    var randy = Math.floor(Math.random() * (clone.length - 1)) + 1;
                    $('input_' + id).insert(clone[randy].clone(true));
                    clone[randy].remove();
                }
            } catch (e) {
                console.log(e);
            }
        }
    },

    handleDateTimeChecks: function () {
        $$('[name$=\[month\]]').each(function (monthElement) {
            var questionId = monthElement.id.split('month_').last();
            var dateElement = $('id_' + questionId);
            if (!dateElement)
                return;

            var dayElement = dateElement.select('#day_' + questionId).first();
            var yearElement = dateElement.select('#year_' + questionId).first();
            var hourElement = dateElement.select('#hour_' + questionId).first();
            var minElement = dateElement.select('#min_' + questionId).first();
            var ampmElement = dateElement.select('#ampm_' + questionId).first();

            var dateTimeCheck = function (e) {
                var erroredElement = null;

                if (monthElement.value != "" || dayElement.value != "" || yearElement.value != "") {

                    var month = +monthElement.value;
                    var day = +dayElement.value;
                    var year = +yearElement.value;

                    if (isNaN(year) || year < 0) {
                        erroredElement = yearElement;
                    } else if ((isNaN(month) || month < 1 || month > 12) && (document.activeElement != monthElement && document.activeElement != dayElement)) {
                        erroredElement = monthElement;
                    } else if ((isNaN(day) || day < 1)) {
                        // timeout to get correct active element
                        setTimeout(function () {
                            if ((document.activeElement != monthElement && document.activeElement != dayElement)) {
                                erroredElement = dayElement;
                            }
                        }, 50)
                    } else {
                        switch (month) {
                            case 2:
                                if ((year % 4 == 0) ? day > 29 : day > 28) {
                                    erroredElement = dayElement;
                                }
                                break;
                            case 4:
                            case 6:
                            case 9:
                            case 11:
                                if (day > 30) {
                                    erroredElement = dayElement;
                                }
                                break;
                            default:
                                if (day > 31) {
                                    erroredElement = dayElement;
                                }
                                break;
                        }
                    }
                }

                if (!erroredElement && hourElement && minElement && (hourElement.value != "" || minElement.value != "")
                    && !(e.target && e.target === document.activeElement)) // do not produce an error yet if target is currently active
                {
                    var hour = (hourElement.value.strip() == '') ? -1 : +hourElement.value;
                    var min = (minElement.value.strip() == '') ? -1 : +minElement.value;
                    if (isNaN(hour) || (ampmElement ? (hour < 0 || hour > 12) : (hour < 0 || hour > 23))) {
                        erroredElement = hourElement;
                    } else if (isNaN(min) || min < 0 || min > 59) {
                        erroredElement = minElement;
                    }
                }

                if (erroredElement) {
                    if (erroredElement === hourElement || erroredElement === minElement) {
                        erroredElement.errored = false;
                        JotForm.errored(erroredElement, 'Enter a valid time');
                    } else {
                        erroredElement.errored = false;
                        JotForm.errored(erroredElement, 'Enter a valid date');
                    }
                    dateElement.addClassName('form-line-error');
                    dateElement.addClassName('form-datetime-validation-error');
                } else {
                    JotForm.corrected(monthElement);
                    JotForm.corrected(dayElement);
                    JotForm.corrected(yearElement);
                    if (hourElement && minElement) {
                        JotForm.corrected(hourElement);
                        JotForm.corrected(minElement);
                    }
                    dateElement.removeClassName('form-line-error');
                    dateElement.removeClassName('form-datetime-validation-error');
                }
            };

            //fired when date is changed by calendar
            dateElement.observe('date:changed', dateTimeCheck);

            monthElement.observe('change', dateTimeCheck);
            dayElement.observe('change', dateTimeCheck);
            yearElement.observe('change', dateTimeCheck);
            if (hourElement && minElement) {
                hourElement.observe('change', dateTimeCheck);
                minElement.observe('change', dateTimeCheck);
            }
        });
    },

    handleTextareaLimits: function () {
        $$('.form-textarea-limit-indicator span').each(function (el) {
            var inpID = el.id.split('-')[0];
            if (!$(inpID)) {
                return;
            } // cannot find the main element

            var minimum = el.readAttribute('minimum');
            var limit = el.readAttribute('limit');
            var input = $(inpID);
            var count;

            var countText = function (firstRun) {
                if (input.hasClassName('form-custom-hint')) {
                    el.update("0/" + (minimum ? minimum : limit));
                    return;
                }

                var contents;
                if (input.hasClassName("form-textarea") && input.up('div').down('.nicEdit-main')) { //rich text
                    contents = input.value.stripTags().replace(/&nbsp;/g, ' ');
                } else {
                    contents = input.value;
                }

                // remove html tags and space chars, to prevent wrong counts on text copied from MS WORD
                var cleaned_contents = contents.replace(/<.[^<>]*?>/g, ' ').replace(/&nbsp;|&#160;/gi, ' ');

                $(el.parentNode).removeClassName('form-textarea-limit-indicator-error');
                JotForm.corrected(el.up('.form-line').down('textarea'));

                var limitByType = function (type) {
                    var limitType = type == "min" ? el.readAttribute('typeMinimum') : el.readAttribute('type');
                    if (limitType == 'Words') {
                        count = $A(cleaned_contents.split(/\s+/)).without("").length;
                    } else if (limitType == 'Letters') {
                        count = cleaned_contents.length;
                    }
                    var limiting = false;
                    if (((type == "min" && count < minimum) || (type == "max" && count > limit)) && !(firstRun === true)) {
                        $(el.parentNode).addClassName('form-textarea-limit-indicator-error');
                        var minMax = type == "min" ? "Min" : "";
                        var lim = type == "min" ? minimum : limit;
                        var lettersWords = limitType === "Words" ? "word" : "character";
                        var msg = JotForm.texts[lettersWords + minMax + "LimitError"] + " " + lim;
                        JotForm.errored(el.up('.form-line').down('textarea'), msg + '.');
                        limiting = true;
                    }
                    el.update(count + "/" + ((minimum && count < minimum && type == "min") || limit == -1 ? minimum : limit));
                    return limiting;
                }
                var runMax = true;
                if (minimum && minimum > 0) {
                    runMax = !limitByType("min")
                }
                if (limit && limit > 0 && runMax) {
                    limitByType("max");
                }
            };
            countText(true);
            input.observe('change', countText);
            input.observe('focus', countText);
            input.observe('keyup', countText);

            //check whether rich text
            if (input.hasClassName("form-textarea") && input.up('div').down('.nicEdit-main')) {
                var cEditable = input.up('div').down('.nicEdit-main');
                cEditable.observe('keyup', function () {
                    input.value = cEditable.innerHTML;
                    countText();
                });
            }
        });
    },









    /**
     * Activates all autocomplete fields
     */
    handleAutoCompletes: function () {
        // Get all autocomplete fields
        $H(JotForm.autoCompletes).each(function (pair) {
            var el = $(pair.key); // Field itself

            el.writeAttribute('autocomplete', 'off');

            var parent = $(el.parentNode); // Parent of the field for list to be inserted
            var values = $A(pair.value.split('|')); // Values for auto complete

            var lastValue; // Last entered value
            var selectCount = 0; // Index of the currently selected element
            //parent.setStyle('position:relative;z-index:1000;'); // Set parent position to relative for inserting absolute positioned list
            var liHeight = 0; // Height of the list element

            // Create List element with must have styles initially
            var list = new Element('div', {
                className: 'form-autocomplete-list'
            }).setStyle({
                    listStyle: 'none',
                    listStylePosition: 'outside',
                    position: 'absolute',
                    zIndex: '10000'
                }).hide();

            var render = function () {

                var dims = el.getDimensions(); // Dimensions of the input box
                var offs = el.cumulativeOffset();

                list.setStyle({
                    top: ((dims.height + offs[1])) + 'px',
                    left: offs[0] + 'px',
                    width: ((dims.width < 1 ? 100 : dims.width) - 2) + 'px'
                });
                list.show();
            };

            // Insert list onto page
            // parent.insert(list);
            $(document.body).insert(list);

            list.close = function () {
                list.update();
                list.hide();
                selectCount = 0;
            };

            // Hide list when field get blurred
            el.observe('blur', function () {
                list.close();
            });

            // Search entry in values when user presses a key
            el.observe('keyup', function (e) {
                var word = el.value;
                // If entered value is the same as the old one do nothing
                if (lastValue == word) {
                    return;
                }
                lastValue = word; // Set last entered word
                list.update(); // Clean up the list first
                if (!word) {
                    list.close();
                    return;
                } // If input is empty then close the list and do nothing
                // Get matches

                var fuzzy = el.readAttribute('data-fuzzySearch') == 'Yes';
                var matches;

                if (fuzzy) {
                    matches = values.collect(function (v) {
                        if (v.toLowerCase().include(word.toLowerCase())) {
                            return v;
                        }
                    }).compact();
                } else {
                    matches = values.collect(function (v) {
                        if (v.toLowerCase().indexOf(word.toLowerCase()) == 0) {
                            return v;
                        }
                    }).compact();
                }
                // If matches found
                var maxMatches = el.readAttribute('data-maxMatches');
                if (maxMatches > 0) matches = matches.slice(0, maxMatches);
                if (matches.length > 0) {
                    matches.each(function (match) {
                        var li = new Element('li', {
                            className: 'form-autocomplete-list-item'
                        });
                        var val = match;
                        li.val = val;
                        try {
                            val = match.replace(new RegExp('(' + word + ')', 'gim'), '<b>$1</b>');
                        }
                        catch (e) {
                            JotForm.error(e);
                        }
                        li.insert(val);
                        li.onmousedown = function () {
                            el.value = match;
                            list.close();
                        };
                        list.insert(li);
                    });

                    render();

                    // Get li height by adding margins and paddings for calculating 10 item long list height
                    liHeight = liHeight || $(list.firstChild).getHeight() + (parseInt($(list.firstChild).getStyle('padding'), 10) || 0) + (parseInt($(list.firstChild).getStyle('margin'), 10) || 0);
                    // limit list to show only 10 item at once        
                    list.setStyle({
                        height: (liHeight * ((matches.length > 9) ? 10 : matches.length) + 4) + 'px',
                        overflow: 'auto'
                    });
                } else {
                    list.close(); // If no match found clean the list and close
                }
            });

            // handle navigation through the list
            el.observe('keydown', function (e) {

                //e = document.getEvent(e);
                var selected; // Currently selected item
                // If the list is not visible or list empty then don't run any key actions
                if (!list.visible() || !list.firstChild) {
                    return;
                }

                // Get the selected item
                selected = list.select('.form-autocomplete-list-item-selected')[0];
                if (selected) {
                    selected.removeClassName('form-autocomplete-list-item-selected');
                }

                switch (e.keyCode) {
                    case Event.KEY_UP: // UP
                        if (selected && selected.previousSibling) {
                            $(selected.previousSibling).addClassName('form-autocomplete-list-item-selected');
                        } else {
                            $(list.lastChild).addClassName('form-autocomplete-list-item-selected');
                        }

                        if (selectCount <= 1) { // selected element is at the top of the list
                            if (selected && selected.previousSibling) {
                                $(selected.previousSibling).scrollIntoView(true);
                                selectCount = 0; // scroll element into view then reset the number
                            } else {
                                $(list.lastChild).scrollIntoView(false);
                                selectCount = 10; // reverse the list
                            }
                        } else {
                            selectCount--;
                        }

                        break;
                    case Event.KEY_DOWN: // Down
                        if (selected && selected.nextSibling) {
                            $(selected.nextSibling).addClassName('form-autocomplete-list-item-selected');
                        } else {
                            $(list.firstChild).addClassName('form-autocomplete-list-item-selected');
                        }

                        if (selectCount >= 9) { // if selected element is at the bottom of the list
                            if (selected && selected.nextSibling) {
                                $(selected.nextSibling).scrollIntoView(false);
                                selectCount = 10; // scroll element into view then reset the number
                            } else {
                                $(list.firstChild).scrollIntoView(true);
                                selectCount = 0; // reverse the list
                            }
                        } else {
                            selectCount++;
                        }
                        break;
                    case Event.KEY_ESC:
                        list.close(); // Close list when pressed esc
                        break;
                    case Event.KEY_TAB:
                    case Event.KEY_RETURN:
                        if (selected) { // put selected field into the input bıx
                            el.value = selected.val;
                            lastValue = el.value;
                        }
                        list.close();
                        if (e.keyCode == Event.KEY_RETURN) {
                            e.stop();
                        } // Prevent return key to submit the form
                        break;
                    default:
                        return;
                }
            });
        });

    },

    /**
     * Fill fields from the get values prepopulate
     */
    prePopulations: function () {
        {       // Event simulator
            Element.prototype.triggerEvent = function (eventName) {
                if (document.createEvent) {
                    var evt = document.createEvent('HTMLEvents');
                    evt.initEvent(eventName, true, true);
                    return this.dispatchEvent(evt);
                }
                if (this.fireEvent) {
                    return this.fireEvent('on' + eventName);
                }
            }
        }
        $H(document.get).each(function (pair) {
            var stricterMatch = pair.key.length < 3 ? true : false; //this will prevent "a=fill" matching any name that starts with an a

            var n = stricterMatch ? '[name$="_' + pair.key + '"]' : '[name*="_' + pair.key + '"]';
            var strict = '[name$="_' + pair.key + '"]';
            var input;

            input = $$('.form-star-rating' + n)[0];
            if (input) {
                input.setRating(parseInt(pair.value));
                return;
            }

            input = $$('.form-slider' + n)[0]; //Add classname in builder?
            if (input) {
                input.setSliderValue(parseInt(pair.value));
                return;
            }

            if (pair.key == "coupon-input" && $('coupon-input')) {
                $('coupon-input').setValue(pair.value);
                $('coupon-button').triggerEvent('click');
                return;
            }


            input = $$('.form-textbox%s, .form-dropdown%s, .form-textarea%s, .form-hidden%s'.replace(/\%s/gim, strict))[0];
            if (!input) {
                input = $$('.form-textbox%s, .form-dropdown%s, .form-textarea%s, .form-hidden%s'.replace(/\%s/gim, n))[0];
            }

            if (!input && pair.key.indexOf("[") > 0) {
                var name = pair.key.substr(0, pair.key.lastIndexOf('['));
                if (name.length > 0 && $$("select[name*=" + name + "], input[name*=" + name + "]").length > 0) {
                    var index = pair.key.substr(pair.key.lastIndexOf('[') + 1).replace("]", "");
                    if ($$("select[name*=" + name + "], input[name*=" + name + "]").length > index) {
                        var type = $$("select[name*=" + name + "]").length > 0 ? "select" : $$("input[name*=" + name + "]")[index].type;

                        switch (type) {
                            case "select":
                                $$("select[name*=" + name + "]")[index].value = pair.value.replace(/\+/g, ' ');
                                break;
                            case "text":
                            case "tel":
                                $$("input[name*=" + name + "]")[index].value = pair.value.replace(/\+/g, ' ');
                                break;
                            case "radio":
                            case "checkbox":
                                if ((pair.value == "true" || pair.value == 1) && $$("input[name*=" + name + "]")[index]) {
                                    $$("input[name*=" + name + "]")[index].click();
                                }
                                break;
                        }
                    }
                }
            }

            if (input && input.readAttribute('data-type') == 'input-grading') {
                var grades = pair.value.split(',');
                var stub = input.id.substr(0, input.id.lastIndexOf('_') + 1);
                for (var i = 0; i < grades.length; i++) {
                    if ($(stub + i)) $(stub + i).value = grades[i];
                }
            } else if (input && (input.hasClassName('form-checkbox-other-input') || input.hasClassName('form-radio-other-input'))) {
                if (n.indexOf('[other]') > -1) {
                    input.value = pair.value.replace(/\+/g, ' ');
                    JotForm.defaultValues[input.id] = input.value;
                }
            } else if (input && input.hasClassName("form-textarea") && input.up('div').down('.nicEdit-main')) {
                input.up('div').down('.nicEdit-main').update(pair.value.replace(/\+/g, ' '));
            } else if (input) {
                input.value = pair.value.replace(/\+/g, ' ');
                JotForm.defaultValues[input.id] = input.value;
            }

            try {
                var formLine = input ? input.up('.form-line') : false;
                if (formLine && formLine.readAttribute('data-type') == "control_datetime" && formLine.down('input[id*="lite_mode_"]')) {
                    if (formLine.down('input[id*="year_"]').value != "" && formLine.down('input[id*="month_"]').value != "" && formLine.down('input[id*="day_"]').value != "") {
                        JotForm.formatDate({
                            date: new Date(formLine.down('input[id*="year_"]').value, formLine.down('input[id*="month_"]').value - 1, formLine.down('input[id*="day_"]').value),
                            dateField: formLine
                        });
                    }
                }
            } catch (e) {
                console.log(e);
            }

            $$('.form-textbox%s, .form-textarea%s, .form-hidden%s'.replace(/\%s/gim, n)).each(function (input) {
                //simulate 'keyup' event to execute conditions upon prepopulation
                input.triggerEvent('keyup');
            });
            $$('.form-dropdown%s'.replace(/\%s/gim, n)).each(function (input) {
                //simulate 'change' event to execute conditions upon prepopulation
                input.triggerEvent('change');
            });
            $$('.form-checkbox%s, .form-radio%s'.replace(/\%s/gim, n)).each(function (input) {
                //input.checked = $A(pair.value.split(',')).include(input.value);
                //Emre: when checkboxed is checked, total count does not increase on payment forms  (79814)
                if ($A(pair.value.split(',')).include(input.value)) {
                    input.click();
                } else if ($A(pair.value.split(',')).include('other')) {
                    if ((input.name.indexOf('[other]') > -1) || (input.id && input.id.indexOf('other_') > -1)) {
                        input.click(); //select other option
                    }
                }
            });

            //if textarea is hinted and has content remove the hint class
            if (input && input.hasClassName('form-textarea') && input.hasClassName('form-custom-hint') && input.hasContent) {
                input.removeClassName('form-custom-hint');
            }
        });
    },
   
    getInputType: function (id) {
        if (JotForm.typeCache[id]) {
            return JotForm.typeCache[id];
        }
        var type = false;
        if ($('id_' + id) && $('id_' + id).readAttribute('data-type') == "control_text") {
            type = 'html';
        } else if ($('input_' + id)) {
            type = $('input_' + id).nodeName.toLowerCase() == 'input' ? $('input_' + id).readAttribute('type').toLowerCase() : $('input_' + id).nodeName.toLowerCase();
            if ($('input_' + id).hasClassName("form-radio-other-input")) {
                type = "radio";
            }
            if ($('input_' + id).hasClassName("form-checkbox-other-input")) {
                type = "checkbox";
            }
            // Neil: set type for autocomplete fields
            if ($('input_' + id).hasClassName('form-autocomplete')) {
                type = "autocomplete";
            }

            if ($('input_' + id).hasClassName('form-slider')) {
                type = 'slider';
            }

            if ($('input_' + id).hasClassName('form-widget')) {
                type = 'widget';
            }

        } else if ($('input_' + id + '_pick') || ($('id_' + id) && $('id_' + id).readAttribute('data-type') == "control_datetime")) {
            type = 'datetime';
        } else if ($('input_' + id + '_month')) {
            type = 'birthdate';
        } else if ($('input_' + id + '_hourSelect')) {
            type = 'time';
        } else if ($("cid_" + id) && $("cid_" + id).getAttribute("data-type") == "control_collapse") {
            return 'collapse';
        } else if ($$('#id_' + id + ' .form-product-item').length > 0) {
            type = $$('#id_' + id + ' .form-product-item')[0].select('input')[0].readAttribute('type').toLowerCase();
        } else if ($$('#id_' + id + ' .form-address-table').length > 0) {
            type = 'address';
        } else if ($$('input[id^=input_' + id + '_]')[0] && $$('input[id^=input_' + id + '_]')[0].hasClassName('form-grading-input')) {
            type = 'grading';
        } else if ($$('#id_' + id + ' .pad').length > 0) {
            type = 'signature';
        } else {
            if ($$('#id_' + id + ' input')[0]) {
                type = $$('#id_' + id + ' input')[0].readAttribute('type').toLowerCase();
                if (type == "text" || type == 'tel') {
                    type = "combined";
                }
            } else if ($$('#id_' + id + ' select')[0]) {
                type = "select"; //select matrices
            }
        }
        JotForm.typeCache[id] = type;
        return type;
    },

    setFieldConditions: function (field, event, condition) {
        if (!JotForm.fieldConditions[field]) {
            JotForm.fieldConditions[field] = {
                event: event,
                conditions: []
            };
        }
        JotForm.fieldConditions[field].conditions.push(condition);
    },

    widgetsAsCalculationOperands: [],

    /*
     * Require or Unrequire a field
     */
    requireField: function (qid, req) {

        if (!$('id_' + qid)) return;

        $$('#id_' + qid + ' input, #id_' + qid + ' textarea, #id_' + qid + ' select').each(function (el) {

            //do not required non-necessary parts of combined field
            if (el.id === 'coupon-input'
                || (el.type === 'hidden' && !el.up('.form-star-rating') && !el.hasClassName('form-widget'))
                || el.hasClassName('form-checkbox-other-input') || el.hasClassName('form-radio-other-input')
                || $A(['prefix', 'middle', 'suffix', 'addr_line2', 'state']).any(function (name) {
                    return el.name.indexOf("[" + name + "]") > -1;
                })) {
                return;
            }

            //get all validations
            var validations = [];
            if (el.className.indexOf('validate[') > -1) {
                validations = el.className.substr(el.className.indexOf('validate[') + 9);
                validations = validations.substr(0, validations.indexOf(']')).split(/\s*,\s*/);
            } else {
                validations = [];
            }

            if (JotForm.getInputType(qid) == "file" && el.getAttribute("multiple") == "multiple" && el.up('.jf-required')) {
                el.up('.jf-required').className = el.up('.jf-required').className.replace(/validate\[required\]/gi, '');
                if (req) {
                    el.up('.jf-required').addClassName("validate[required]");
                } else {
                    el.up('.jf-required').removeClassName("form-validation-error");
                }
            }

            //remove all validation from class
            el.className = el.className.replace(/validate\[.*\]/, '');

            //remove required from validations array
            for (var i = validations.length - 1; i >= 0; i--) {
                if (validations[i] === 'required') {
                    validations.splice(i, 1);
                }
            }

            if (req) {
                validations.push('required'); //add required to validations
                if (el.hasClassName('form-widget')) {
                    el.addClassName('widget-required');
                }
            } else {
                el.removeClassName('form-validation-error');
                el.removeClassName('widget-required');
            }

            //add validations back to class
            if (validations.length > 0) {
                el.addClassName('validate[' + validations.join(',') + ']');
            }

            JotForm.setFieldValidation(el);
        });
        if (req) {
            if ($('label_' + qid) && !$('label_' + qid).down('.form-required')) {
                $('label_' + qid).insert('<span class="form-required">*</span>');
            }
        } else {
            if ($('label_' + qid) && $('label_' + qid).down('.form-required')) {
                $('label_' + qid).down('.form-required').remove();
            }

            //remove any existing errors
            if ($("id_" + qid).down('.form-error-message')) {
                $("id_" + qid).down('.form-error-message').remove();
            }
            $("id_" + qid).removeClassName('form-line-error');

            if ($$('.form-line-error').length == 0) {
                JotForm.hideButtonMessage();
            }
        }
    },
    setCalculationResultReadOnly: function () {
        $A(JotForm.calculations).each(function (calc, index) {
            if (calc.readOnly && $('input_' + calc.resultField) != null) {
                $('input_' + calc.resultField).setAttribute('readOnly', 'true');
            }
        });
    },
    setCalculationEvents: function () {
        var setCalculationListener = function (el, ev, calc) {
            $(el).observe(ev, function () {
                if (ev === "paste") { //same action as other events but wait for the text to be pasted
                    setTimeout(function () {
                        el.addClassName('calculatedOperand');
                        JotForm.checkCalculation(calc);
                    }, 10);
                } else {
                    el.addClassName('calculatedOperand');
                    JotForm.checkCalculation(calc);
                }
            });
        };

        $A(JotForm.calculations).each(function (calc, index) {
            if (!calc.operands) return;
            var ops = calc.operands.split(',');
            for (var i = 0; i < ops.length; i++) {

                var opField = ops[i];
                if (!opField || opField.empty() || !$('id_' + opField)) continue;

                var type = JotForm.calculationType(opField),
                    ev;

                switch (type) {
                    case "widget":
                        setCalculationListener($('id_' + opField), 'change', calc);
                        JotForm.widgetsAsCalculationOperands.push(opField);
                        break;

                    case 'radio':
                    case 'checkbox':
                        setCalculationListener($('id_' + opField), 'click', calc);
                        if ($('input_' + opField)) {
                            setCalculationListener($('id_' + opField), 'keyup', calc);
                        }
                        break;

                    case 'select':
                    case 'file':
                        if (Protoplus && Protoplus.getIEVersion && Protoplus.getIEVersion() == 8) {
                            setCalculationListener($('id_' + opField), 'click', calc);
                        } else {
                            setCalculationListener($('id_' + opField), 'change', calc);
                        }
                        break;

                    case 'datetime':
                        setCalculationListener($('id_' + opField), 'date:changed', calc);
                        $$("#id_" + opField + ' select').each(function (el) {
                            setCalculationListener($(el), 'change', calc);
                        });
                        break;

                    case 'time':
                    case 'birthdate':
                        $$("#id_" + opField + ' select').each(function (el) {
                            setCalculationListener($(el), 'change', calc, index);
                        });
                        break;

                    case 'address':
                        setCalculationListener($('id_' + opField), 'change', calc, index);
                        setCalculationListener($('id_' + opField), 'blur', calc, index);
                        setCalculationListener($('id_' + opField), 'keyup', calc, index);
                        $$("#id_" + opField + ' select').each(function (el) {
                            setCalculationListener($(el), 'change', calc, index);
                        });
                        break;

                    case 'number':
                        setCalculationListener($('id_' + opField), 'keyup', calc, index);
                        setCalculationListener($('id_' + opField), 'paste', calc, index);
                        setCalculationListener($('id_' + opField), 'click', calc, index);
                        break;

                    default:
                        setCalculationListener($('id_' + opField), 'change', calc, index);
                        setCalculationListener($('id_' + opField), 'blur', calc, index);
                        setCalculationListener($('id_' + opField), 'keyup', calc, index);
                        setCalculationListener($('id_' + opField), 'paste', calc, index);
                        break;
                }
            }
        });
    },
    runAllCalculations: function (ignoreEditable) {
        $A(JotForm.calculations).each(function (calc, index) {
            if (!(ignoreEditable && !calc.readOnly)) {
                JotForm.checkCalculation(calc);
            }
        });
    },
    
    
    
    
    /**
     * Sets all events and actions for form conditions
     */
    setConditionEvents: function () {
        try {
            $A(JotForm.conditions).each(function (condition) {

                if (condition.disabled == true) return; //go to next condition

                if (condition.type == 'field' || condition.type == 'calculation' || condition.type == 'require' || condition.type == 'mask') {

                    var fields = [];
                    $A(condition.terms).each(function (term) {
                        fields.push(term.field);

                        //add dyanmic {fields} to array to trigger events
                        if (condition.type == "field" && "value" in term && typeof term.value == "string") {
                            var val = term.value;
                            try {
                                val.replace(/\{.*?\}/gi, function (match, contents, offset, s) {
                                    var stripped = match.replace(/[\{\}]/g, "");
                                    var elements = $$('input[name$="_' + stripped + '"]');
                                    if (elements.length > 0) {
                                        var element = elements[0];
                                        var id = element.id;
                                        id = id.replace(/input_/, "");
                                        fields.push(id);
                                    }
                                });
                            } catch (e) {
                                console.log(condition);
                            }
                        }
                    });

                    $A(fields).each(function (id) {

                        switch (JotForm.getInputType(id)) {
                            case "widget":
                                JotForm.setFieldConditions('input_' + id, 'change', condition);
                                JotForm.widgetsWithConditions.push(id);
                                break;
                            case "combined":
                            case "email":
                                JotForm.setFieldConditions('id_' + id, 'autofill', condition);
                                break;
                            case "address":
                                JotForm.setFieldConditions('id_' + id, 'autofill', condition);
                                JotForm.setFieldConditions('input_' + id + '_country', 'change', condition);
                                break;
                            case "datetime":
                                JotForm.setFieldConditions('id_' + id, 'date:changed', condition);
                                break;
                            case "birthdate":
                                JotForm.setFieldConditions('input_' + id + '_day', 'change', condition);
                                JotForm.setFieldConditions('input_' + id + '_month', 'change', condition);
                                JotForm.setFieldConditions('input_' + id + '_year', 'change', condition);
                                break;
                            case "time":
                                JotForm.setFieldConditions('input_' + id + '_hourSelect', 'change', condition);
                                JotForm.setFieldConditions('input_' + id + '_minuteSelect', 'change', condition);
                                JotForm.setFieldConditions('input_' + id + '_ampm', 'change', condition);
                            case "select":
                            case "file":
                                if ($('input_' + id)) {
                                    JotForm.setFieldConditions('input_' + id, 'change', condition);
                                } else {
                                    $('id_' + id).select('select').each(function (el) {
                                        JotForm.setFieldConditions(el.id, 'change', condition);
                                    });
                                }
                                break;
                            case "checkbox":
                            case "radio":
                                JotForm.setFieldConditions('id_' + id, 'click', condition);
                                break;
                            case "number":
                                JotForm.setFieldConditions('input_' + id, 'number', condition);
                                break;
                            case "autocomplete": // Neil: Set custom event for autocomplete fields (classname: "form-autocomplete")
                                JotForm.setFieldConditions('input_' + id, 'autocomplete', condition);
                                break;
                            case "grading":
                                JotForm.setFieldConditions('id_' + id, 'keyup', condition);
                                break;
                            case "text":
                                JotForm.setFieldConditions('input_' + id, 'autofill', condition);
                                break;
                            default: // text, textarea, dropdown
                                JotForm.setFieldConditions('input_' + id, 'keyup', condition);
                        }
                    });

                } else {


                    if (document.get.mode == "edit" || document.get.mode == "inlineEdit") { //only run page condition on last page that a condition field exists so we don't jump prematurely based on populated data

                        var isLaterPage = function (current, testing) {
                            var nexts = $$('.form-pagebreak-next');
                            for (var i = 0; i < nexts.length; i++) {
                                var btn = nexts[i];
                                if (btn == current) return true;
                                if (btn == testing) return false;
                            }
                        };


                        var highestPage = false;
                        $A(condition.terms).each(function (term) {
                            var id = term.field;
                            if (term.field.indexOf("_") !== -1) {
                                id = term.field.split("_")[0];
                            }

                            var nextButton = JotForm.getSection($('id_' + id)).select('.form-pagebreak-next')[0];
                            if (!nextButton) {
                                return;
                            }
                            var pageNumber = parseInt(nextButton.id.substring(nextButton.id.lastIndexOf("_") + 1));
                            if (!highestPage || isLaterPage(highestPage, nextButton)) {
                                highestPage = nextButton;
                            }
                        });

                        if (highestPage) {
                            highestPage.observe('mousedown', function () {
                                JotForm.checkCondition(condition);
                            });
                        }
                    } else {
                        $A(condition.terms).each(function (term) {
                            var id = term.field;

                            // if this is a product quantity option (e.g. 4_quantity_1009_0)
                            if (term.field.indexOf("_") !== -1) {
                                // get ID (4)
                                id = term.field.split("_")[0];
                            }

                            if(!$('id_' + id)) {
                                return;
                            }

                            var nextButton = JotForm.getSection($('id_' + id)).select('.form-pagebreak-next')[0];
                            if (!nextButton) {
                                return;
                            }

                            nextButton.observe('mousedown', function () {
                                // JotForm.warn('Checking ' + $('label_' + id).innerHTML.strip());
                                JotForm.checkCondition(condition);
                            });
                        });
                    }
                }
            });

            $H(JotForm.fieldConditions).each(function (pair) {
                var field = pair.key;
                var event = pair.value.event;
                var conds = pair.value.conditions;

                // JotForm.info("Has Condition:", field, $(field));
                // If field is not found then continue
                if (!$(field)) {
                    return;
                }
                if (event == "autocomplete") { // if event type is trigger by autocomplete, listen to blur and keyup events
                    $(field).observe('blur', function () {
                        $A(conds).each(function (cond) {
                            JotForm.checkCondition(cond);
                        });
                    }).run('blur');
                    $(field).observe('keyup', function () {
                        $A(conds).each(function (cond) {
                            JotForm.checkCondition(cond);
                        });
                    }).run('keyup');
                } else if (event == "number") {
                    $(field).observe('change', function () {
                        $A(conds).each(function (cond) {
                            JotForm.checkCondition(cond);
                        });
                    }).run('change');
                    $(field).observe('keyup', function () {
                        $A(conds).each(function (cond) {
                            JotForm.checkCondition(cond);
                        });
                    }).run('keyup');
                } else if (event == "autofill") {
                    $(field).observe('blur', function () {
                        $A(conds).each(function (cond) {
                            JotForm.checkCondition(cond);
                        });
                    }).run('blur');
                    $(field).observe('keyup', function () {
                        $A(conds).each(function (cond) {
                            JotForm.checkCondition(cond);
                        });
                    }).run('keyup');

                    if (!(!Prototype.Browser.IE9 && !Prototype.Browser.IE10 && Prototype.Browser.IE)) {
                        $(field).observe('change', function () {
                            $A(conds).each(function (cond) {
                                JotForm.checkCondition(cond);
                            });
                        }).run('change');
                    }
                } else {
                    $(field).observe(event, function () {
                        $A(conds).each(function (cond) {
                            JotForm.checkCondition(cond);
                        });
                    }).run(event);
                }
            });
        } catch (e) {
            JotForm.error(e);
        }
    },


    formatDate: function (d) {
        var date = d.date;
        var month = JotForm.addZeros(date.getMonth() + 1, 2);
        var day = JotForm.addZeros(date.getDate(), 2);
        var year = date.getYear() < 1000 ? date.getYear() + 1900 : date.getYear();
        var id = d.dateField.id.replace(/\w+\_/gim, '');
        $('month_' + id).value = month;
        $('day_' + id).value = day;
        $('year_' + id).value = year;
        if ($('lite_mode_' + id)) {
            var lite_mode = $('lite_mode_' + id);
            var seperator = lite_mode.readAttribute('seperator');
            var format = lite_mode.readAttribute('format');

            var newValue = month + seperator + day + seperator + year;
            if (format == 'ddmmyyyy') {
                newValue = day + seperator + month + seperator + year;
            } else if (format == 'yyyymmdd') {
                newValue = year + seperator + month + seperator + day;
            }
            lite_mode.value = newValue;
        }

        $('id_' + id).fire('date:changed');
    },
    /**
     * Highlights the lines when an input is focused
     */
    highLightLines: function () {

        // Highlight selected line
        $$('.form-line').each(function (l, i) {
            l.select('input, select, textarea, div, table div, button').each(function (i) {

                i.observe('focus', function () {
                    if (JotForm.isCollapsed(l)) {
                        JotForm.getCollapseBar(l).run('click');
                    }
                    if (!JotForm.highlightInputs) {
                        return;
                    }
                    l.addClassName('form-line-active');
                    // for descriptions
                    if (l.__classAdded) {
                        l.__classAdded = false;
                    }
                }).observe('blur', function () {
                    if (!JotForm.highlightInputs) {
                        return;
                    }
                    l.removeClassName('form-line-active');
                });
            });
        });
    },
    /**
     * Gets the container FORM of the element
     * @param {Object} element
     */
    getForm: function (element) {
        element = $(element);
        if (!element.parentNode) {
            return false;
        }
        if (element && element.tagName == "BODY") {
            return false;
        }
        if (element.tagName == "FORM") {
            return $(element);
        }
        return JotForm.getForm(element.parentNode);
    },
    /**
     * Gets the container of the input
     * @param {Object} element
     */
    getContainer: function (element) {
        element = $(element);
        if (!element.parentNode) {
            return false;
        }
        if (element && element.tagName == "BODY") {
            return false;
        }
        if (element.hasClassName("form-line")) {
            return $(element);
        }
        return JotForm.getContainer(element.parentNode);
    },

    /**
     * Get the containing section the element
     * @param {Object} element
     */
    getSection: function (element) {
        element = $(element);
        if (!element.parentNode) {
            return false;
        }
        if (element && element.tagName == "BODY") {
            return false;
        }
        if ((element.hasClassName("form-section-closed") || element.hasClassName("form-section")) && !element.id.match(/^section_/)) {
            return element;
        }
        return JotForm.getSection(element.parentNode);
    },
    /**
     * Get the fields collapse bar
     * @param {Object} element
     */
    getCollapseBar: function (element) {
        element = $(element);
        if (!element.parentNode) {
            return false;
        }
        if (element && element.tagName == "BODY") {
            return false;
        }
        if (element.hasClassName("form-section-closed") || element.hasClassName("form-section")) {
            return element.select('.form-collapse-table')[0];
        }
        return JotForm.getCollapseBar(element.parentNode);
    },
    /**
     * Check if the input is collapsed
     * @param {Object} element
     */
    isCollapsed: function (element) {
        element = $(element);
        if (!element.parentNode) {
            return false;
        }
        if (element && element.tagName == "BODY") {
            return false;
        }
        if (element.className == "form-section-closed") {
            return true;
        }
        return JotForm.isCollapsed(element.parentNode);
    },
    /**
     * Check if the input is visible
     * @param {Object} element
     */
    isVisible: function (element) {
        element = $(element);
        if (!element.parentNode) {
            return false;
        }

        if (element.hasClassName('always-hidden')) {
            return false;
        }

        if (element && element.tagName == "BODY") {
            return true;
        }

        //exception for rich text editor because element is never visible
        if (element.hasClassName("form-textarea") && element.up('div').down('.nicEdit-main')
            && (element.up('.form-line') && JotForm.isVisible(element.up('.form-line')))) {

            return true;
        }

        if (element.style.display == "none" || element.style.visibility == "hidden") {
            return false;
        }

        return JotForm.isVisible(element.parentNode);
    },

    /**
     * check whether a current section has any widgets visible
     * @param  {object} section [the current section to check with]
     * @return {boolean}        [boolean value]
     */
    sectionHasVisibleiFrameWidgets: function (section) {
        var elements = section.select('.custom-field-frame');
        var hasVisible = false;
        elements.each(function (el) {
            if (JotForm.isVisible(el)) {
                hasVisible = true;
                throw $break;
            }
        });
        return hasVisible;
    },

    /**
     * Emre: to eneable/disable all submit buttons in multi-forms
     */
    enableDisableButtonsInMultiForms: function () {
        var allButtons = $$('.form-submit-button');
        allButtons.each(function (b) {
            if (b.up('ul.form-section')) {
                if (b.up('ul.form-section').style.display == "none") {
                    b.disable();
                } else {
                    if (b.className.indexOf("disabled") == -1) {
                        b.enable();
                    }
                }
            }
        });
    },

    /**
     * Enables back the buttons
     */
    enableButtons: function () {
        setTimeout(function () {
            $$('.form-submit-button').each(function (b) {
                b.enable();
                b.innerHTML = b.oldText;
            });
        }, 60);
    },

    /**
     * Sets the actions for buttons
     * - Disables the submit when clicked to prevent double submit.
     * - Adds confirmation for form reset
     * - Handles the print button
     */
    setButtonActions: function () {

        $$('.form-submit-button').each(function (b) {
            b.oldText = b.innerHTML;
            b.enable(); // enable previously disabled button

            //Emre: to provide sending form with with clicking "enter" button in Multi-page forms
            //JotForm.enableDisableButtonsInMultiForms();
            if (getQuerystring('qp') === "") {
                b.observe('click', function () {
                    setTimeout(function () {
                        //Emre: to display all submit buttons
                        if (!$$('.form-error-message')[0] && !$$('.form-textarea-limit-indicator-error')[0]) { //Emre: when limit text are is used, submit button doesn't work (51335)
                            var allButtons = $$('.form-submit-button');
                            allButtons.each(function (bu) {
                                bu.innerHTML = JotForm.texts.pleaseWait;
                                //Emre: submit button problem (51335)
                                bu.addClassName('lastDisabled');
                                bu.disable();
                            });
                        }
                    }, 50);
                });
            }
        });

        $$('.form-submit-reset').each(function (b) {
            b.onclick = function () {
                if (!confirm(JotForm.texts.confirmClearForm)) {
                    return false;
                } else if (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase()) && $('coupon-button')) {
                    // #529035 chrome browsers scroll down when pressing clear and if form has coupon field
                    return true;
                }

                //clear all errors after clear form called start feature request 154829
                $$(".form-line-error").each(function (tmp) {
                    tmp.removeClassName("form-line-error");

                });

                $$(".form-error-message", ".form-button-error").each(function (tmp) {
                    tmp.remove();
                });
                //clear all errors after form called end 
                //feature request 154940  must reset any form char limits for textareas start

                $$(".form-textarea-limit-indicator > span").each(function (tmp) {
                    var raw = tmp.innerHTML;
                    tmp.innerHTML = raw.replace(raw.substring(0, raw.indexOf("/")), "0");

                });

                //feature request implementation end

                //bugfix 187865  also reset grading tools total field
                $$("span[id^=grade_point_]").each(function (tmp) {
                    tmp.innerHTML = 0;
                });
                $$(".form-grading-error").each(function (tmp) {
                    tmp.innerHTML = ""; //also remove any previous grading errors
                });
                //bugfix end
                //note: TODO: instead of distinctively handling corner cases, it is best to fire a form change event that will trigger correct behaviour -kemal 


                //b#423200 ensure that radios/chks are reset to defaults when autofill is enabled
                var autofill = $$('form')[0].readAttribute('data-autofill');
                if (autofill) {
                    setTimeout(function () {
                        for (var inputId in JotForm.defaultValues) {
                            var input = $(inputId);
                            if (input && (input.type == "radio" || input.type == "checkbox")) {
                                input.checked = true;
                            }
                        }

                        //save all the current (empty) data
                        var formID = $$('form').first().readAttribute('id') + $$('form').first().readAttribute('name');
                        var autoFillInstance = AutoFill.getInstance(formID);
                        if (autoFillInstance) {
                            autoFillInstance.saveAllData()
                        }

                    }, 40);
                }

                setTimeout(function () {
                    $$('.custom-hint-group').each(function (element) { //redisplay textarea hints
                        element.hasContent = ( element.value && element.value.replace(/\n/gim, "<br>") != element.readAttribute('data-customhint')) ? true : false;
                        element.showCustomPlaceHolder();
                    });
                }, 30);


                //clear rich text
                setTimeout(function () {
                    $$('.nicEdit-main').each(function (richArea) {
                        var txtarea = richArea.up('.form-line').down('textarea');
                        if (txtarea) {
                            if (txtarea.hasClassName('custom-hint-group') && !txtarea.hasContent) {
                                richArea.setStyle({'color': '#babbc0'});
                            } else {
                                richArea.setStyle({'color': ''});
                            }
                            richArea.innerHTML = txtarea.value;
                        }
                    });
                }, 40);

                //reset payment
                setTimeout(function () {
                    if ($('coupon-button') && $('coupon-button').triggerEvent) {
                        $('coupon-button').triggerEvent("click");
                    }
                    if ($('payment_total')) {
                        JotForm.totalCounter(JotForm.prices);
                    }
                }, 40);

                // reset widget inputs
                setTimeout(function () {
                    $$('input.form-widget').each(function (node) {
                        node.value = '';
                        node.fire('widget:clear', {
                            qid: parseInt(node.id.split('_')[1])
                        });
                    });
                }, 40);

                setTimeout(function () {
                    $$('.currentDate').each(function (el) {
                        var id = el.id.replace(/day_/, "");
                        JotForm.formatDate({date: (new Date()), dateField: $('id_' + id)});
                    });
                    $$('.currentTime').each(function (el) {
                        if (el.up(".form-line")) {
                            var id = el.up(".form-line").id.replace("id_", "");
                            if ($("hour_" + id)) {
                                JotForm.displayLocalTime("hour_" + id, "min_" + id, "ampm_" + id);
                            } else {
                                JotForm.displayLocalTime("input_" + id + "_hourSelect", "input_" + id + "_minuteSelect", "input_" + id + "_ampm")
                            }
                        }
                    });
                }, 40);

                setTimeout(function () {
                    JotForm.runAllConditions();
                }, 50);
            };
        });

        $$('.form-submit-print').each(function (print_button) {

            print_button.observe("click", function () {
                $(print_button.parentNode).hide();
                //nicedit compatibility start: 
                var hidden_nicedits_arr = []; //nicedit.js rich text editors require special actions this will hold them to allow us to restore them to later stage
                var nicedit_textarea_to_hide = []; //after print completed textareas will be shown, we do not want nicedit textareas to be shown
                //nicedit compatibility end 

                //omer - detecting media print style rules
                /*
                 fileCount = document.styleSheets.length;
                 injectedCss = document.styleSheets[fileCount-1];
                 printStyle = '';

                 for(i=0; i<injectedCss.cssRules.length; i++) {
                 if(injectedCss.cssRules[i].media) {
                 if (injectedCss.cssRules[i].media[0]=="print") {
                 printStyle += injectedCss.cssRules[i].cssText;
                 }
                 }
                 }
                 */
                //omer

                $$('.form-textarea, .form-textbox').each(function (el) {

                    if (!el.type) { // type of slider is undefined
                        el.value = el.value || '0'; // to protect problem when slider has no value
                    }
                    //Emre: to prevent css problem on "Date Time" so <span> must be added(66610)
                    var dateSeparate;
                    if (dateSeparate = el.next('.date-separate')) {
                        dateSeparate.hide();
                    }
                    //Emre: we must specify "width" and "height" to prevent getting new line
                    var elWidth = "";
                    if (el.value.length < el.size) {
                        elWidth = "width:" + el.size * 9 + "px;";
                    }

                    //kemal: 'display:inline-block' added to prevent bug:219794 phone field prints miss aligned. display:inline-block only added el is of Phone Field
                    if (el.id.indexOf("_area") != -1 || el.id.indexOf("_phone") != -1 || (el.id.indexOf("_country") != -1 && el.readAttribute('type') == 'tel')) {
                        elWidth += " display:inline-block;"
                    }

                    //nicedit compatibility start: kemal: richtext editor compatibility: 1st check if el is form-textarea and also is a rich text editor
                    if (el.hasClassName("form-textarea") && "nicEditors" in window) { //"nicEditors" in window added for somehow if this check fails, do not give errors
                        $$("#cid_" + el.id.split("_")[1] + " > div:nth-child(1)").each(function (tmpel) {
                            if (tmpel.readAttribute("unselectable") == "on") {
                                for (var i = 0; i < nicEditors.editors.length; i++) {
                                    nicEditors.editors[i].nicInstances[0].saveContent();
                                }
                                //update richtext value
                                $$("#cid_" + el.id.split("_")[1] + " > div").each(function (richtextdivs) {
                                    richtextdivs.hide();
                                    hidden_nicedits_arr.push(richtextdivs); //push hidden divs to hidden_nicedits_arr to be later shown
                                });
                                nicedit_textarea_to_hide.push(el);// push textarea of nicedit, to be later hidden, because after print process completes we show all textareas by default
                            }
                        });
                    }
                    //nicedit compatibility end 


                    /*el.insert({
                     before: new Element('div', {
                     className: 'print_fields'
                     }).update(el.value.replace(/\n/g, '<br>')).setStyle('padding:1px 4px; min-height:18px;' + elWidth)
                     }).hide();*/
                });
                window.print();

                /*$$('.form-textarea, .form-textbox, .date-separate').invoke('show');

                 //nicedit compatibility start: also show hidden richtextEditor divs and hide richtextEditor textareas start
                 for(var i=0; i<hidden_nicedits_arr.length;i++){hidden_nicedits_arr[i].show();}
                 for(var i=0; i<nicedit_textarea_to_hide.length;i++){nicedit_textarea_to_hide[i].hide();}
                 //nicedit compatibility end

                 $$('.print_fields').invoke('remove');*/
                $(print_button.parentNode).show();
            });

        });
    },

    /**
     * These will correct any errors in a tool with a validations
     * especially in hidden mode. Thus it will ignore the said validation
     */
    hasHiddenValidationConflicts: function (input) {
        var hiddenOBJ = input.up('li.form-line');
        return hiddenOBJ && (hiddenOBJ.hasClassName('form-field-hidden') || hiddenOBJ.up('ul.form-section').hasClassName('form-field-hidden'));
    },

    /**
     * Handles the functionality of control_grading tool
     */
    initGradingInputs: function () {

        var _this = this;//JotForm object

        $$('.form-grading-input').each(function (item) {

            //register a blur event to validate the
            item.observe('blur', function () {
                item.validateGradingInputs();
            });
            item.observe('keyup', function () {
                item.validateGradingInputs();
            });

            //create a function that will check the validity of inputs
            //attach it to the items/grading inputs
            item.validateGradingInputs = function () {
                var item = this,
                    id = item.id.replace(/input_(\d+)_\d+/, "$1"),
                    total = 0,
                    _parentNode = $(item.parentNode.parentNode),
                    numeric = /^(\d+[\.]?)+$/,
                    isNotNumeric = false;

                //correct any errors first that is attach in the item obj
                item.errored = false;

                _parentNode.select(".form-grading-input").each(function (sibling) {
                    if (sibling.value && !numeric.test(sibling.value)) {
                        isNotNumeric = true;
                        throw $break;
                    }
                    total += parseFloat(sibling.value) || 0;
                });

                //check if hidden, if so return its valid
                if (_this.hasHiddenValidationConflicts(item)) return JotForm.corrected(item);

                //if not numeric then return an error
                if (isNotNumeric) {
                    return JotForm.errored(item, JotForm.texts.numeric);
                }

                if ($("grade_total_" + id)) {
                    //set the grade error notifier to empty
                    $("grade_error_" + id).innerHTML = "";
                    //set the allowed total to the grade_point notifier
                    var allowed_total = parseFloat($("grade_total_" + id).innerHTML);
                    $("grade_point_" + id).innerHTML = total;

                    if (total > allowed_total) {
                        //do the error display
                        $("grade_error_" + id).innerHTML = ' ' + JotForm.texts.lessThan + ' <b>' + allowed_total + '</b>.';
                        return JotForm.errored(item, JotForm.texts.gradingScoreError + " " + allowed_total);
                    }
                    else {
                        //remove error display
                        return JotForm.corrected(item);
                    }
                } else {
                    return JotForm.corrected(item);
                }
            }
        });
    },
    /**
     * Handles the functionality of control_spinner tool
     */
    initSpinnerInputs: function () {
        var _this = this;//JotForm object

        $$('.form-spinner-input').each(function (item) {

            //register a blur/change event to validate the data
            item.observe('blur', function () {
                item.validateSpinnerInputs();
            }).observe('change', function () {
                item.validateSpinnerInputs();
            });

            //register an event when the carret is clicked
            var c_parent = item.up('table.form-spinner'),
                c_up = c_parent.select('td.form-spinner-up')[0],
                c_down = c_parent.select('td.form-spinner-down')[0];

            c_up.observe('click', function (e) {
                item.validateSpinnerInputs();
            });
            c_down.observe('click', function (e) {
                item.validateSpinnerInputs();
            });

            //create a function that will check the validity of inputs
            //attach it to the items/spinner inputs
            item.validateSpinnerInputs = function () {
                var item = this,
                    id = item.id.replace(/input_(\d+)_\d+/, "$1"),
                    numeric = /^(-?\d+[\.]?)+$/,
                    numericDotStart = /^([\.]\d+)+$/,  //accept numbers starting with dot
                    userInput = item.value || 0;

                //correct any errors first that is attach in the item obj
                item.errored = false;

                //check if hidden, if so return its valid
                if (_this.hasHiddenValidationConflicts(item)) return JotForm.corrected(item);

                if (userInput && !numeric.test(userInput) && !numericDotStart.test(userInput)) {
                    return JotForm.errored(item, JotForm.texts.numeric);
                }

                //read the min and max val total, and check for inputs
                var min_val = parseInt(item.readAttribute('data-spinnermin')) || false,
                    max_val = parseInt(item.readAttribute('data-spinnermax')) || false;

                if (min_val && userInput < min_val) {
                    return JotForm.errored(item, JotForm.texts.inputCarretErrorA + " " + min_val);
                }
                else if (max_val && userInput > max_val) {
                    return JotForm.errored(item, JotForm.texts.inputCarretErrorB + " " + max_val);
                }
                else {
                    //remove error display
                    return JotForm.corrected(item);
                }
            }
        });
    },


    /**
     * Handles the functionality of control_number tool
     */
    initNumberInputs: function () {
        var _this = this;//JotForm object

        $$('.form-number-input').each(function (item) {

            //register a blur/change event to validate the data
            item.observe('blur', function () {
                item.validateNumberInputs();
            }).observe('change', function () {
                item.validateNumberInputs();
            }).observe('keyup', function () {
                item.validateNumberInputs();
            }).observe('keypress', function (event) {
                // Backspace, tab, enter, end, home, left, right
                // We don't support the del key in Opera because del == . == 46.
                var controlKeys = [8, 9, 13, 35, 36, 37, 39];
                // IE doesn't support indexOf
                var isControlKey = controlKeys.join(",").match(new RegExp(event.which));
                // Some browsers just don't raise events for control keys. Easy.
                // e.g. Safari backspace.
                if (!event.which || // Control keys in most browsers. e.g. Firefox tab is 0
                    (49 <= event.which && event.which <= 57) || // Always 1 through 9
                    (48 == event.which && $(this).attr("value")) || // No 0 first digit
                    (46 == event.which) || (45 == event.which) || (43 == event.which) || // ., -, +
                    isControlKey) { // Opera assigns values for control keys.

                    if((parseInt(this.value.length) >= parseInt(item.readAttribute('maxlength'))) || 
                        (event.which != 8 && event.which != 0 && (event.which < 45 || event.which > 57)) ){
                        event.preventDefault();
                    } else {
                        return;
                    }
                } else {
                    event.preventDefault();
                }
            });

            //create a function that will check the validity of inputs
            //attach it to the items/number inputs
            item.validateNumberInputs = function () {
                var item = this,
                    id = item.id.replace(/input_(\d+)_\d+/, "$1"),
                    numeric = /^(-?\d+[\.]?)+$/,
                    numericDotStart = /^([\.]\d+)+$/;  //accept numbers starting with dot

                //correct any errors first that is attach in the item obj
                item.errored = false;

                //check if hidden, if so return its valid
                if (_this.hasHiddenValidationConflicts(item)) return JotForm.corrected(item);

                if (item.value && !numeric.test(item.value) && !numericDotStart.test(item.value) && item.hinted !== true) {
                    return JotForm.errored(item, JotForm.texts.numeric);
                }

                //read the min and max val total, and check for inputs
                var min_val = parseInt(item.readAttribute('data-numbermin')),
                    max_val = parseInt(item.readAttribute('data-numbermax')),
                    max_len = parseInt(item.readAttribute('maxlength'));

                if (max_len && item.value && item.value.length > max_len) {
                    return JotForm.errored(item, JotForm.texts.maxDigitsError + " " + max_len);
                }
                else if (( min_val || min_val == 0 ) && parseInt(item.value) < min_val) {
                    // item.value = min_val;
                    return JotForm.errored(item, JotForm.texts.inputCarretErrorA + " " + min_val);
                }
                else if (( max_val || max_val == 0 ) && parseInt(item.value) > max_val) {
                    // item.value = max_val;
                    return JotForm.errored(item, JotForm.texts.inputCarretErrorB + " " + max_val);
                }
                else {

                    var error = false
                    if (item.up('.form-matrix-table')) {
                        item.up('.form-matrix-table').select('input').each(function (el) {
                            if ((el !== item) && el.hasClassName('form-validation-error')) {
                                error = true;
                            }
                        });

                    }
                    //remove error display
                    if (!error) {
                        return JotForm.corrected(item);
                    }
                }
            }
        });
    },
    /**
     * Handles the pages of the form
     */
    backStack: [],
    currentSection: false,

    handlePages: function () {
        var $this = this;
        var pages = [];
        var last;

        // 345261: by default, back button containers gets its width from the label to maintain alignment
        // if they are wider than half the form, resize them
        if ($$('.form-label-left').length > 0) {
            var labelWidth = parseInt($$('.form-label-left')[0].getStyle('width')),
                formWidth = parseInt($$('.form-all')[0].getStyle('width')),
                backButtonWidth = labelWidth > formWidth / 2 ? formWidth / 2 : labelWidth;
            $$('.form-pagebreak-back-container').each(function (back) {
                // resize only if no custom css has been used
                if (back.style.width === '') {
                    back.style.width = (backButtonWidth - 14) + 'px';
                }
            });
        }

        $$('.form-pagebreak').each(function (page, i) {
            var section = $(page.parentNode.parentNode);
            if (i >= 1) {
                // Hide other pages
                section.hide();
            } else {
                JotForm.currentSection = section;
            }
            pages.push(section); // Collect pages

            section.pagesIndex = i + 1;

            function stopEnterKey(evt) {
                var evt = (evt) ? evt : ((event) ? event : null);
                var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
                if (evt.keyCode == 13 && ["text", "radio", "checkbox", "select-one", "select-multiple"].include(node.type)) {
                    return false;
                }
                if (evt.keyCode == 13 && evt.target.hasClassName('form-pagebreak-next') && evt.target.triggerEvent) {
                    evt.target.triggerEvent('mousedown');
                }
            }

            document.onkeypress = stopEnterKey;

            section.select('.form-pagebreak-next').invoke('observe', 'click', function () { // When next button is clicked

                if (JotForm.saving) {
                    return;
                }
                if (JotForm.validateAll(JotForm.getForm(section), section) || getQuerystring('qp') !== "") {

                    if (window.parent && window.parent != window) {
                        window.parent.postMessage('scrollIntoView', '*');
                    }

                    if (JotForm.nextPage) {
                        JotForm.backStack.push(section.hide()); // Hide current
                        JotForm.currentSection = JotForm.nextPage.show();

                        //Emre: to prevent page to jump to the top (55389)
                        if (!$this.noJump) {
                            JotForm.currentSection.scrollIntoView(true);
                        }

                        JotForm.enableDisableButtonsInMultiForms();
                    } else if (section.next()) { // If there is a next page

                        JotForm.backStack.push(section.hide()); // Hide current
                        // This code will be replaced with condition selector
                        JotForm.currentSection = section.next().show();

                        // show widgets - kenneth: already handled under WidgetsServer.js
                        // JotForm.currentSection.select('.form-line').each(function(el) {
                        //     var id = el.id.split("_")[1];
                        //     if(JotForm.getInputType(id) === 'widget') {
                        //         JotForm.showWidget(id);
                        //     }
                        // });

                        //Emre
                        if (!$this.noJump && window.parent == window) {
                            JotForm.currentSection.scrollIntoView(true);
                        }

                        JotForm.enableDisableButtonsInMultiForms();
                    }

                    JotForm.nextPage = false;
                    if (JotForm.saveForm) {
                        JotForm.hiddenSubmit(JotForm.getForm(section));
                    }

                    JotForm.runAllCalculations(true);

                    if (JotForm.currentSection) {
                        JotForm.currentSection.select(".form-html").each(function (textEl) {
                            if (textEl.innerHTML.match(/google.*maps/gi)) { //google maps hack to get the iframe to redisplay in the right place
                                textEl.innerHTML = textEl.innerHTML;
                            }
                        });
                    }

                } else {
                    try {
                        $$('.form-button-error').invoke('remove');
                        $$('.form-pagebreak-next').each(function (nextButton) {
                            var errorBox = new Element('div', {className: 'form-button-error'});
                            errorBox.insert(JotForm.texts.generalPageError);
                            $(nextButton.parentNode.parentNode).insert(errorBox);
                        });
                    } catch (e) {
                        // couldnt find 'next button'
                    }
                }
            });

            section.select('.form-pagebreak-back').invoke('observe', 'click', function () { // When back button is clicked

                if (window.parent && window.parent != window) {
                    window.parent.postMessage('scrollIntoView', '*');
                }

                if (JotForm.saving) {
                    return;
                }
                section.hide();
                JotForm.currentSection = JotForm.backStack.pop().show();
                //Emre
                if (!$this.noJump && window.parent == window) {
                    JotForm.currentSection.scrollIntoView(true);
                }

                JotForm.nextPage = false;

                JotForm.enableDisableButtonsInMultiForms();

                if (JotForm.saveForm) {
                    JotForm.hiddenSubmit(JotForm.getForm(section));
                }
                //clear if there is an error bar near back-next buttons
                $$('.form-button-error').invoke('remove');

                setTimeout(function () {
                    JotForm.runAllCalculations(true); //so newly hidden fields may be excluded 
                }, 10);
            });
        });

        // Handle trailing page
        if (pages.length > 0) {
            var allSections = $$('.form-section:not([id^=section_])');
            if (allSections.length > 0) {
                last = allSections[allSections.length - 1];
            }

            // if there is a last page
            if (last) {
                last.pagesIndex = allSections.length;
                pages.push(last); // add it with the other pages
                last.hide(); // hide it until we open it
                var li = new Element('li', {
                    className: 'form-input-wide'
                });
                var cont = new Element('div', {
                    className: 'form-pagebreak'
                });
                var backCont = new Element('div', {
                    className: 'form-pagebreak-back-container'
                });
                var back = $$('.form-pagebreak-back-container')[0].select('button')[0];

                back.observe('click', function () {
                    if (JotForm.saving) {
                        return;
                    }
                    last.hide();
                    JotForm.nextPage = false;
                });

                backCont.insert(back);
                cont.insert(backCont);
                li.insert(cont);
                last.insert(li);
            }
        }
    },
    /**
     * Go straight to page on form load
     */
    jumpToPage: function () {
        var page = document.get.jumpToPage;
        var sections = $$('.form-section:not([id^=section_])');

        if (!(page && page > 1) || page > sections.length) return; //no page to jump to

        sections[0].hide();
        sections[page - 1].show();

        if (page > 2) JotForm.backStack = sections.splice(0, page - 1); //so the back button will go to the previous pages and not the first

        JotForm.runAllCalculations(true); //so newly hidden fields may be excluded 
    },
    /**
     * Handles the functionality of Form Collapse tool
     */
    handleFormCollapse: function () {
        var $this = this;
        var openBar = false;
        var openCount = 0;
        $$('.form-collapse-table').each(function (bar) {
            var section = $(bar.parentNode.parentNode);
            //section.setUnselectable();  //ntw - bug#209358  - If anyone knows why this line exists please tell me - prevents selection in firefox under collapses and I cannot see that it performs any other function
            if (section.className == "form-section-closed") {
                section.closed = true;
            } else {
                if (section.select('.form-collapse-hidden').length < 0) {
                    openBar = section;
                    openCount++;
                }
            }
            bar.observe('click', function () {

                if (section.closed) {
                    section.setStyle('overflow:visible; height:auto');
                    var h = section.getHeight();

                    if (openBar && openBar != section && openCount <= 1) {
                        openBar.className = "form-section-closed";
                        openBar.shift({
                            height: 60,
                            duration: 0.5
                        });
                        openBar.select('.form-collapse-right-show').each(function (e) {
                            e.addClassName('form-collapse-right-hide').removeClassName('form-collapse-right-show');
                        });
                        openBar.closed = true;
                    }
                    openBar = section;
                    section.setStyle('overflow:hidden; height:60px');
                    // Wait for focus
                    setTimeout(function () {
                        section.scrollTop = 0;
                        section.className = "form-section";
                    }, 1);

                    section.shift({
                        height: h,
                        duration: 0.5,
                        onStart: function () {
                            // ready every widget if any
                            section.select('.form-line[data-type=control_widget]').each(function (e) {
                                var field = e.id.split('_').last();
                                JotForm.showWidget(field);
                            });
                        },
                        onEnd: function (e) {
                            e.scrollTop = 0;
                            e.setStyle("height:auto;");
                            if (!$this.noJump) {
                                e.scrollIntoView();
                            }
                        },
                        onStep: function (e) {
                            // update frame height if embed
                            if (window.parent && window.parent != window) {
                                window.parent.postMessage('setHeight:' + $$('body')[0].getHeight(), '*');
                            }
                        }
                    });
                    section.select('.form-collapse-right-hide').each(function (e) {
                        e.addClassName('form-collapse-right-show').removeClassName('form-collapse-right-hide');
                    });
                    section.closed = false;

                    if (bar.errored) {
                        bar.select(".form-collapse-mid")[0].setStyle({
                            color: ''
                        }).select('img')[0].remove();
                        bar.errored = false;
                    }

                } else {

                    section.scrollTop = 0;
                    section.shift({
                        height: 60,
                        duration: 0.5,
                        onEnd: function (e) {
                            e.className = "form-section-closed";
                        },
                        onStep: function (e) {
                            // update frame height if embed
                            if (window.parent && window.parent != window) {
                                window.parent.postMessage('setHeight:' + $$('body')[0].getHeight(), '*');
                            }
                        }
                    });

                    //Emre: Added if because of preventing collapse open/close bug
                    if (openBar) {
                        openBar.select('.form-collapse-right-show').each(function (e) {
                            e.addClassName('form-collapse-right-hide').removeClassName('form-collapse-right-show');
                        });
                    }

                    section.closed = true;
                }
            });
        });
    },
    /**
     *  Handles Paypal Pro payment methods
     *  and field validations
     */
    handlePaypalPro: function () {
        if ($('creditCardTable')) {
            var thisForm = $$('.jotform-form')[0];
            var paymentFieldId = $$('input[name="simple_fpc"]')[0].value;
            Event.observe(thisForm, 'submit', function (event) {

                if (JotForm.isEditMode()) {
                    return true;
                }

                if (JotForm.isPaymentSelected()) {
                    // default error
                    var errors = "";
                    JotForm.corrected($$('.paymentTypeRadios')[0]);
                    // if no payment method is selected
                    if (!$$('.paymentTypeRadios')[0].checked && !$$('.paymentTypeRadios')[1].checked) {
                        errors = "You must select a payment method";
                    }
                    // if payment method is credit card
                    if ($('input_' + paymentFieldId + '_paymentType_credit').checked) {
                        $$('#id_' + paymentFieldId + ' [class*="cc"]').each(function (cc) {
                            if (!cc.getValue()) {
                                errors = "All fields are required";
                                throw $break;
                            }
                        });
                    }
                    // if there are errors
                    if (errors) {
                        JotForm.errored($$('.paymentTypeRadios')[0], errors);
                        Event.stop(event);
                    } else {
                        JotForm.corrected($$('.paymentTypeRadios')[0]);
                    }
                }
            });
            $$('.paymentTypeRadios').each(function (radio) {
                radio.observe('click', function () {
                    if (radio.checked && radio.value === "express") {
                        $('creditCardTable').hide();
                    }
                    // If credit is selected and payment total is greater than zero or if there is no discount coupon
                    if (radio.checked && radio.value === "credit" && ( JotForm.paymentTotal > 0 || Object.keys(JotForm.discounts).length === 0 )) {
                        $('creditCardTable').show();
                    }
                    JotForm.corrected($$('.paymentTypeRadios')[0]);
                    // toggle checkout buttons
                    JotForm.togglePaypalButtons(radio.checked && radio.value === "express");
                });
            });
        }
    },

    /**
     * Creates description boxes next to input boxes
     * @param {Object} input
     * @param {Object} message
     */
    description: function (input, message) {
        // v2 has bugs, v3 has stupid solutions
        if (message == "20") {
            return;
        } // Don't remove this or some birthday pickers will start to show 20 as description

        var lineDescription = false;
        if (!$(input)) {
            var id = input.replace(/[^\d]/gim, '');
            if ($("id_" + id)) {
                input = $("id_" + id);
                lineDescription = true;
            } else if ($('section_' + id)) {
                input = $('section_' + id);
                lineDescription = true;
            } else {
                return;
                /* no element found to display a description */
            }
        }

        if ($(input).setSliderValue) {
            input = $($(input).parentNode);
        }

        var cont = JotForm.getContainer(input);
        if (!cont) {
            return;
        }
        var right = false;

        var bubble = new Element('div', {className: 'form-description'});
        var arrow = new Element('div', {className: 'form-description-arrow'});
        var arrowsmall = new Element('div', {className: 'form-description-arrow-small'});
        var content = new Element('div', {className: 'form-description-content'});
        var indicator;

        if ("desc" in document.get && document.get.desc == 'v2') {
            right = true;
            cont.insert(indicator = new Element('div', {className: 'form-description-indicator'}));
            bubble.addClassName('right');
        }

        content.insert(message);
        bubble.insert(arrow).insert(arrowsmall).insert(content).hide();

        cont.insert(bubble);

        if ((cont.getWidth() / 2) < bubble.getWidth()) {
            bubble.setStyle('right: -' + ( cont.getWidth() - ( right ? 100 : 20 ) ) + 'px');
        }

        if (right) {
            var h = indicator.measure('height');
            arrow.setStyle('top:' + ((h / 2) - 20) + 'px');
            arrowsmall.setStyle('top:' + ((h / 2) - 17) + 'px');

            $(cont).mouseEnter(function () {
                cont.setStyle('z-index:10000');
                if (!cont.hasClassName('form-line-active')) {
                    cont.addClassName('form-line-active');
                    cont.__classAdded = true;
                }
                bubble.show();
            }, function () {
                if (cont.__classAdded) {
                    cont.removeClassName('form-line-active');
                    cont.__classAdded = false;
                }
                cont.setStyle('z-index:0');
                bubble.hide();
            });
            $(input).observe('keydown', function () {
                cont.setStyle('z-index:0');
                bubble.hide();
            });
        } else {
            if (lineDescription) {
                $(input).mouseEnter(function () {
                    cont.setStyle('z-index:10000');
                    bubble.show();
                }, function () {
                    cont.setStyle('z-index:0');
                    bubble.hide();
                });
            } else {
                $(cont).mouseEnter(function () {
                    cont.setStyle('z-index:10000');
                    bubble.show();
                }, function () {
                    cont.setStyle('z-index:0');
                    bubble.hide();
                });
                $(input).observe('keyup', function () {
                    cont.setStyle('z-index:0');
                    bubble.hide();
                });
                $(input).observe('focus', function () {
                    cont.setStyle('z-index:10000');
                    bubble.show();
                });
                $(input).observe('blur', function () {
                    cont.setStyle('z-index:0');
                    bubble.hide();
                });
            }
        }
    },

    /**
     * do all validations at once and stop on the first error
     * @param {Object} form
     * @param {string} scopeSelector, used for selector scopes on following selectors :
     *   form-textarea-limit-indicator-error and form-datetime-validation-error
     */
    validateAll: function (form, scopeSelector) {

        var _log = function () {
            if (window.location.href.indexOf('stripeDebug') !== -1) {
                console.log.apply(console, arguments);
            }
        }

        if (getQuerystring('qp') !== "") {
            return true;
        }
        var ret = true;

        if (scopeSelector == undefined) {
            scopeSelector = $$('body')[0];
        }

        scopeSelector.select('.form-textarea-limit-indicator-error').each(function(limitErr) {
            if(JotForm.isVisible(limitErr)) {
                _log('set to false because .form-textarea-limit-indicator-error');
                ret = false;
            }
        });

        if (scopeSelector.select('.form-datetime-validation-error').first()) {
            _log('set to false because .form-datetime-validation-error');
            ret = false;
        }

        if (window.signatureForm) {
            _log('signature form');
            var pads = jQuery(".pad");

            for (var i = 0; i < pads.length; i++) {
                var pad = pads[i];
                if (jQuery(pad).attr("data-required") === "true") {
                    if (jQuery(pad).parent().parent().parent().is(":visible")) {
                        var w = jQuery(pad).parent().parent()
                        if (jQuery(pad).jSignature('getData', 'base30')[1].length == 0 && !jQuery(pad).hasClass('edit-signature')) {
                            ret = false;
                            if (w.find(".form-line-error").length == 0) {
                                var preLink = ( JotForm.url.search("https") == -1 ) ? "http://max.jotfor.ms/" : "https://static-interlogyllc.netdna-ssl.com/";
                                w.append('<div class="form-line-error" style="float:left;margin-top:5px;">' +
                                    '<div class="form-error-message">' +
                                    '<img src="' + preLink + 'images/exclamation-octagon.png" align="left" style="margin-right:5px;">' +
                                    '<div class="form-error-arrow">' +
                                    '<div class="form-error-arrow-inner"></div>' +
                                    '</div>' +
                                    JotForm.texts.required +
                                    '</div></div>');
                            }
                        } else {
                            w.find(".form-line-error").remove();
                        }
                    }
                }
            }
        }

        if (window.JCFServerCommon !== undefined) {
            _log('widgets detected');
            var widgetInputs = $$('.widget-required, .widget-errored');
            widgetInputs.each(function (el) {
                if (JotForm.isVisible(el)) {
                    if ($(JotForm.currentSection) && $(JotForm.currentSection).select('.form-section').length > 0) {
                        if (el.up('.form-section').id === $(JotForm.currentSection).select('.form-section')[0].id) {
                            if (el.value.length === 0) {
                                ret = false;
                            }
                        }
                    } else {
                        if (el.up('.form-section').visible()) {
                            if (el.value.length === 0) {
                                ret = false;
                            }
                        }
                    }
                }
            });
        }

        var c = "";
        if (form && form.id) {
            c = "#" + form.id + " ";
        }

        $$(c + '*[class*="validate"]').each(function (input) {


            if (JotForm.payment && input.up('.form-line')) { //b#486482 only run on first payment input as that will iterate over all of the others
                var dataType = input.up('.form-line').getAttribute('data-type');
                if (dataType == "control_" + JotForm.payment) {
                    if (input.up('.form-line').select(input.tagName + '[class*="validate"]').first() != input) {
                        return;
                    }
                }
            }

            _log('looping inputs with validation :');
            _log(input);
            if (input.validateInput === undefined) {
                _log('no required continuing');
                return;
                /* continue; */
            }
            if (!(!!input.validateInput && input.validateInput())) {
                ret = JotForm.hasHiddenValidationConflicts(input);
                _log('ret setted ' + ret);
            }
        });
        _log('final ret value ' + ret);
        return ret;
    },

    /**
     * When an input is errored
     * @param {Object} input
     * @param {Object} message
     */
    errored: function (input, message) {

        input = $(input);

        if (input.errored) {
            return false;
        }

        if (input.runHint) {
            input.runHint();
        }
        /*else{
         //input.select();
         }*/

        if (this.url.search("https") == -1) {
            var preLink = "http://max.jotfor.ms/";
        } else {
            var preLink = "https://static-interlogyllc.netdna-ssl.com/";
            // var preLink = "https://www.jotform.com/";
        }

        if (JotForm.isCollapsed(input)) {

            var collapse = JotForm.getCollapseBar(input);
            if (!collapse.errored) {
                collapse.select(".form-collapse-mid")[0].insert({
                    top: '<img src="' + preLink + 'images/exclamation-octagon.png" align="bottom" style="margin-right:5px;"> '
                }).setStyle({color: 'red'});
                collapse.errored = true;
            }
        }
        var container = JotForm.getContainer(input);

        input.errored = true;
        input.addClassName('form-validation-error');
        container.addClassName('form-line-error');
        var insertEl = container;

        //if(JotForm.debug){
        insertEl = container.select('.form-input')[0];
        if (!insertEl) {
            insertEl = container.select('.form-input-wide')[0];
        }
        if (!insertEl) {
            insertEl = container;
        }
        //}
        insertEl.select('.form-error-message').invoke('remove');

        insertEl.insert(new Element('div', {
            className: 'form-error-message'
        }).insert('<img src="' + preLink + 'images/exclamation-octagon.png" align="left" style="margin-right:5px;"> ' + message).insert(
            new Element('div', {className: 'form-error-arrow'}).insert(new Element('div', {className: 'form-error-arrow-inner'}))));

        return false;
    },

    /**
     * When an input is corrected
     * @param {Object} input
     */
    corrected: function (input) {
        input = $(input);
        input.errored = false;

        var container = JotForm.getContainer(input);
        if (!container) {
            return true;
        }
        container.select(".form-validation-error").invoke('removeClassName', 'form-validation-error');
        container.removeClassName('form-line-error');
        container.select('.form-error-message').invoke('remove');

        if (JotForm.isCollapsed(input)) {
            var collapse = JotForm.getCollapseBar(input);
            if (collapse.errored && (collapse.up('.form-section-closed') && collapse.up('.form-section-closed').select('.form-validation-error').length == 0)) {
                collapse.select(".form-collapse-mid")[0].setStyle({
                    color: ''
                }).select('img')[0].remove();
                collapse.errored = false;
            }
        }

        setTimeout(function () {
            if ($$('.form-error-message').length == 0) {
                JotForm.hideButtonMessage();
            }
        }, 100);

        return true;
    },

    hideButtonMessage: function () {
        $$('.form-button-error').invoke('remove');
    },

    showButtonMessage: function () {
        this.hideButtonMessage();

        $$('.form-submit-button').each(function (button) {
            var errorBox = new Element('div', {className: 'form-button-error'});
            errorBox.insert('<p>' + JotForm.texts.generalError + '</p>');
            $(button.parentNode.parentNode).insert(errorBox);
        });
    },

    disableGoButton: function () {
        if (navigator.appVersion.indexOf("iPhone") != -1 || navigator.appVersion.indexOf("iPad") != -1 || navigator.appVersion.indexOf("Android") != -1) {
            $$('input').each(function (input) {
                input.observe('keypress', function (e) {
                    var code = (e.keyCode ? e.keyCode : e.which);
                    if (code === 13) {
                        e.preventDefault();
                    }
                });
            });
        }
    },

    /**
     * Sets all validations to forms
     */
    validator: function () {

        if (this.debugOptions && this.debugOptions.stopValidations) {
            this.info('Validations stopped by debug parameter');
            return true;
        }
        var $this = this;

        $A(JotForm.forms).each(function (form) { // for each JotForm form on the page 
            if (form.validationSet) {
                return;
                /* continue; */
            }

            form.validationSet = true;
            form.observe('submit', function (e) { // Set on submit validation
                try {
                    if ($$('.form-submit-button') && $$('.form-submit-button').length > 0) {
                        //only submit form if a submit button is visible
                        var aSubmitIsVisible = false;
                        $$('.form-submit-button').each(function (el) {
                            if (JotForm.isVisible(el.parentNode)) {
                                aSubmitIsVisible = true;
                                return;
                            }
                        });
                        if (!aSubmitIsVisible) {
                            JotForm.enableButtons();
                            e.stop();
                        }
                    }

                    if (!JotForm.validateAll(form)) {
                        JotForm.enableButtons();
                        JotForm.showButtonMessage();

                        if (JotForm.onSubmissionError) {
                            if (JotForm.onSubmissionError == "jumpToSubmit") {
                                var visSubmit = [];
                                $$('.form-submit-button').each(function (but) {
                                    if (JotForm.isVisible(but)) {
                                        visSubmit.push(but);
                                    }
                                    ;
                                });
                                if (visSubmit.length > 0) {
                                    if (visSubmit[visSubmit.length - 1].up('.form-line')) {
                                        visSubmit[visSubmit.length - 1].up('.form-line').scrollIntoView(false);
                                    } else {
                                        visSubmit[visSubmit.length - 1].scrollIntoView(false);
                                    }
                                }
                            } else if (JotForm.onSubmissionError == "jumpToFirstError") {
                                var firstError = $$('.form-error-message').first();
                                if (firstError && firstError.up('.form-line')) {
                                    firstError.up('.form-line').scrollIntoView();
                                }
                            }
                        }

                        $$('.custom-hint-group').each(function (elem) { //redisplay textarea hints
                            elem.showCustomPlaceHolder();
                        });

                        e.stop();
                        return;
                    }

                    //if 'other' not checked disable corresponding textbox
                    $$('.form-radio-other,.form-checkbox-other').each(function (el) {
                        if (!el.checked && el.next()) {
                            el.next().disable();
                        }
                    });

                    JotForm.runAllCalculations(true);

                    $$('textarea.form-textarea:first-child').each(function (el) {
                        if (el.value) {
                            function escapeHtml(text) {
                                return text
                                    .replace(/&/g, "&amp;")
                                    .replace(/</g, "&lt;")
                                    .replace(/>/g, "&gt;")
                                    .replace(/"/g, "&quot;")
                                    .replace(/'/g, "&#039;");
                            }

                            el.value = escapeHtml(el.value);
                            textEl = el.clone();
                            textEl.writeAttribute("disabled", "true");
                            textEl.innerHTML = el.value;
                            el.up().appendChild(textEl);
                            el.hide();
                        }
                    });

                    if ($$('input, select, textarea').length > 900) { //collapse matrices for long forms
                        $$('.form-matrix-table').each(function (matrixTable) {
                            var matrixObject = {};
                            matrixTable.select("input, select").each(function (input) {
                                var ids = input.id.split("_");
                                var x = ids[2];
                                var y = ids[3];
                                if (input.type == "radio") {
                                    if (input.checked) {
                                        matrixObject[x] = input.value;
                                    } else if (!(x in matrixObject)) {
                                        matrixObject[x] = false;
                                    }
                                } else {
                                    if (!(x in matrixObject)) {
                                        matrixObject[x] = {};
                                    }
                                    if (input.type == "checkbox") {
                                        matrixObject[x][y] = input.checked ? input.value : false;
                                    } else {
                                        matrixObject[x][y] = input.value;
                                    }
                                }
                                input.writeAttribute("disabled", "true");
                            });

                            try {
                                var name = matrixTable.down('input, select').readAttribute("name").split("[")[0];
                                var matrixArea = new Element("textarea").setStyle({display: 'none'});
                                matrixTable.insert({after: matrixArea});
                                matrixArea.value = JSON.stringify(matrixObject);
                                matrixArea.writeAttribute("name", name);
                            } catch (e) {
                                console.log(e);
                            }
                        });
                    }
                } catch (err) {
                    JotForm.error(err);
                    e.stop();
                    return;
                }

                //enable any disabled(readonly) time dropdowns so they are submitted with the form
                $$('.time-dropdown').each(function (el) {
                    el.enable();
                });
                $$('.form-checkbox, .form-radio').each(function (el) {
                    el.enable();
                });

                // We will clear the contents of hidden fields, users don't want see the hidden fields on subscriptions
                if (JotForm.clearFieldOnHide !== "dontClear") {
                    $$('.form-field-hidden input', '.form-field-hidden select', '.form-field-hidden textarea').each(function (input) {
                        if (input.name == "simple_fpc") { // do not clear this field's value
                            return;
                        }

                        //b#490576 if we are in edit mode retain hidden values
                        if (document.get.mode == "edit" || document.get.mode == "inlineEdit") {
                            return;
                        }

                        if (input.tagName == 'INPUT' && ['checkbox', 'radio'].include(input.type)) {
                            input.checked = false;
                        } else {
                            input.clear();
                        }
                    });
                }

                if (JotForm.compact && JotForm.imageSaved == false) {
                    e.stop();
                    window.parent.saveAsImage();
                    // JotForm.enableButtons();
                    $(document).observe('image:loaded', function () {
                        var block;
                        $(document.body).insert(block = new Element('div').setStyle('position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);'));
                        block.insert('<table height="100%" width="100%"><tr><td align="center" valign="middle" style="font-family:Verdana;color:#fff;font-size:16px;">Please Wait...</td></tr></table>');
                        setTimeout(function () {
                            form.submit();
                        }, 1000);
                    });
                    return;
                }

                //validation for grading when the form is submitted
                var grading_inputs = form.select('.form-grading-input');
                if (grading_inputs) {
                    grading_inputs.each(function (item) {
                        //call the validator function to validate the data
                        var validate = item.validateGradingInputs();
                        if (!validate) {
                            e.stop();//stop submitting the form
                        }
                    });
                }

                //validation fo spinners when the form is submitted
                var spinner_inputs = form.select('.form-spinner-input');
                if (spinner_inputs) {
                    spinner_inputs.each(function (item) {
                        //call the validator function to validate the data
                        var validate = item.validateSpinnerInputs();
                        if (!validate) {
                            e.stop();//stop submitting the form
                        }
                    });
                }

                //validation fo numbers when the form is submitted
                var number_inputs = form.select('.form-number-input');
                if (number_inputs) {
                    number_inputs.each(function (item) {
                        //call the validator function to validate the data
                        var validate = item.validateNumberInputs();
                        if (!validate) {
                            e.stop();//stop submitting the form
                        }
                    });
                }
            });

            // for each validation element
            $$('#' + form.id + ' *[class*="validate"]').each(function (input) {
                JotForm.setFieldValidation(input);
            });

            $$('.form-upload').each(function (upload) {

                try {

                    var required = !!upload.validateInput;
                    var exVal = upload.validateInput || Prototype.K;

                    upload.validateInput = function () {

                        //clean any errors first if any
                        upload.errored = false;

                        if (exVal() !== false) { // Make sure other validation completed

                            if (!upload.files) {
                                return true;
                            } // If files are not provied then don't do checks

                            var acceptString = upload.readAttribute('accept') || upload.readAttribute('file-accept') || "";
                            var maxsizeString = upload.readAttribute('maxsize') || upload.readAttribute('file-maxsize') || "";
                            var minsizeString = upload.readAttribute('minsize') || upload.readAttribute('file-minsize') || "";

                            var accept = acceptString.strip().toLowerCase().split(/\s*\,\s*/gim);
                            var maxsize = parseInt(maxsizeString, 10) * 1024;
                            var minsize = parseInt(minsizeString, 10) * 1024;

                            var file = upload.files[0];
                            if (!file) {
                                return true;
                            } // No file was selected

                            //Emre: to prevent extension of file problem in firefox7 (47183)
                            if (!file.fileName) {
                                file.fileName = file.name;
                            }

                            var ext = "";
                            if (JotForm.getFileExtension(file.fileName)) {
                                ext = JotForm.getFileExtension(file.fileName);
                            }
                            // allow file uploads with no file extension #567813
                            /*if (!ext){
                             return JotForm.errored(upload, JotForm.texts.noUploadExtensions);
                             }*/

                            if (acceptString != "*" && !accept.include(ext) && !accept.include(ext.toLowerCase())) {
                                return JotForm.errored(upload, JotForm.texts.uploadExtensions + '<br/>' + acceptString);
                            }

                            //check if validation if real image is set to yes
                            //if so check again if the meta data is correct and only if the extension is correct
                            var validateImage = upload.readAttribute('data-imagevalidate') || false;
                            var validatedImageExt = "jpeg, jpg, png, gif, bmp";
                            if ((accept.include(ext) || accept.include(ext.toLowerCase()) ) && //for the accepted extensions
                                validateImage && ( validateImage === 'yes' || validateImage === 'true' ) &&
                                (validatedImageExt.include(ext) || validatedImageExt.include(ext.toLowerCase()) ) && //for the accepted valid images
                                typeof window.FileReader != 'undefined' //only for modern browsers that supports it
                            ) {
                                //initiate the FileReader
                                var binary_reader = new FileReader();
                                binary_reader.onloadend = function (e) {
                                    function ab2str(buf) {
                                        var binaryString = '',
                                            bytes = new Uint8Array(buf),
                                            length = bytes.length;
                                        for (var i = 0; i < length; i++) {
                                            binaryString += String.fromCharCode(bytes[i]);
                                        }
                                        return binaryString;
                                    }

                                    var args = {
                                        filename: file.name,
                                        size: file.size,
                                        //convert string to binary
                                        binary: ab2str(e.target.result)
                                    };
                                    ImageInfo.loadInfo(args, function () {
                                        var info = ImageInfo.getAllFields(file.name);
                                        if (info.format === 'UNKNOWN') {
                                            return JotForm.errored(upload, "You have uploaded an invalid image file type.");
                                        }
                                    });
                                }
                                //read file as buffer array (binaryString is deprecated)
                                binary_reader.readAsArrayBuffer(file);
                            }

                            //Emre: to prevent file.fileSize being undefined in Firefox 7 (48526)
                            //Emre: to prevent file upload not to work in Firefox 3.
                            if (!file.fileSize) {
                                file.fileSize = file.size;
                            }

                            if (file.fileSize > maxsize) {
                                return JotForm.errored(upload, JotForm.texts.uploadFilesize + ' ' + maxsizeString + 'Kb');
                            }
                            if (file.fileSize < minsize) {
                                return JotForm.errored(upload, JotForm.texts.uploadFilesizemin + ' ' + minsizeString + 'Kb');
                            }

                            return JotForm.corrected(upload);
                        }
                    };

                    if (!required) {
                        upload.addClassName('validate[upload]');
                        upload.observe('blur', upload.validateInput);
                    }
                } catch (e) {

                    JotForm.error(e);

                }

            });
        });
    },


    /*
     * set validation function on field
     */
    setFieldValidation: function (input) {
        var $this = this;
        var reg = {
            email: /^\S[a-z0-9\/.!#$%&'*+\/=?\^_`{|}~\-]*(?:\.[a-z0-9!#$%&'*+\/=?\^_`{|}~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])$/i,
            password:/^[a-zA-Z0-9]+$/,
        };
        var validations = input.className.replace(/.*validate\[(.*)\].*/, '$1').split(/\s*,\s*/);

        input.validateInput = function (deep) {
            if (document.get.ignoreValidation && document.get.ignoreValidation === "true") {
                return true;
            }

            if (!JotForm.isVisible(input)) {
                return true; // if it's hidden then user cannot fill this field then don't validate
            }

            if (!$(input.parentNode).hasClassName('form-matrix-values')
                && !input.hasClassName('form-subproduct-option')
                && !(input.id.match(/_quantity_/) || input.id.match(/_custom_/))) // do not clean product options (bugfix#461798)
            {
                JotForm.corrected(input); // First clean the element
            }
            var vals = validations;

            if (input.hinted === true) {
                input.clearHint();
                setTimeout(function () {
                    input.hintClear();
                }, 150);
            } // Clear hint value if exists

            //change where it deploys
            //to first check the data  of this inputs before going to the next with a validate[*] class
            if (input.readAttribute('data-type') === 'input-spinner' && input.value) {
                return input.validateSpinnerInputs();
            }
            else if (input.readAttribute('data-type') === 'input-grading' && input.value) {
                return input.validateGradingInputs();
            }
            else if (input.readAttribute('data-type') === 'input-number' && input.value) {
                return input.validateNumberInputs();
            }
            // check minimum donation amount
            else if (input.readAttribute('data-min-amount')) {
                return input.validateMinimum();
            }

            if (input.up('.form-line').down('.form-textarea-limit-indicator-error')) {
                // JotForm.handleTextareaLimits handles this better
                input.triggerEvent('change');
                return;
            }

            //if (vals.include("Username"))   {}
            
            //Emre confirmation password (36639)
            if (vals.include("Password_Confirm")) {
                if (($('passwordID').value !== $('cpasswordID').value)) {
                    return JotForm.errored(input, JotForm.texts.confirmPassword);
                } 
                else if (($('cpasswordID').value) && (!reg.password.test($('cpasswordID').value))) {
                    return JotForm.errored(input, JotForm.texts.password);
                }
            }
            if (vals.include('passCharLimit')) {
                 if ((input.value.length<5) && (input.value.length>0)) {
                    return JotForm.errored(input, JotForm.texts.passwordRange);
                } 
                 if (input.value.length>12) {
                    return JotForm.errored(input, JotForm.texts.passwordRange);
                } 
            }
            //Emre confirmation email (36639)
            if (vals.include("Email_Confirm")) {
                if (($('emailID').value != $('emailID_confirm').value)) {
                    return JotForm.errored(input, JotForm.texts.confirmEmail);
                } else if (($('emailID_confirm').value) && (!reg.email.test($('emailID_confirm').value))) {
                    return JotForm.errored(input, JotForm.texts.email);
                }
            }
            if (vals.include("required")) {
                if (input.tagName == 'INPUT' && input.readAttribute('type') == "file") { // Upload
                    if (input.value.empty() && !input.uploadMarked) {
                        return JotForm.errored(input, JotForm.texts.required);
                    } else {
                        return JotForm.corrected(input);
                    }
                } else if (input.tagName == "INPUT" && (input.readAttribute('type') == "radio" || input.readAttribute('type') == "checkbox")) {

                    if ($(input.parentNode).hasClassName('form-matrix-values')) { // This is in a matrix

                        var ty = input.readAttribute('type');
                        var matrixRows = {};
                        var oneChecked = false;
                        var oneEmpty = false;
                        input.up('table').select('input').each(function (e) {
                            if (!(e.name in matrixRows)) {
                                matrixRows[e.name] = false;
                            }
                            if (matrixRows[e.name] !== true) {
                                matrixRows[e.name] = e.checked;
                            }
                            if (matrixRows[e.name] === true) {
                                oneChecked = true;
                            }
                            if ('value' in e && e.value.strip(" ").empty()) {
                                oneEmpty = true;
                            }
                        });
                        if (vals.include("requireOneAnswer")) {
                            if (!oneChecked)
                                return JotForm.errored(input, JotForm.texts.requireOne);
                        } else if (vals.include('requireEveryCell') && oneEmpty) {
                            return JotForm.errored(input, JotForm.texts.requireEveryCell);
                        } else if (!$H(matrixRows).values().all()) {
                            return JotForm.errored(input, JotForm.texts.requireEveryRow);
                        } else {
                            return JotForm.corrected(input);
                        }

                    } else {
                        var baseInputName = input.name.substr(0, input.name.indexOf('['));
                        var otherInputName = baseInputName + '[other]';
                        var checkboxArray = [];
                        // If 'Other' input exists;
                        if (document.getElementsByName(otherInputName)[0]) {
                            // Assign all checkboxes including 'Other' to array
                            checkboxArray = $A(document.getElementsByName(baseInputName + '[]'));
                            checkboxArray[checkboxArray.length] = document.getElementsByName(otherInputName)[0];
                            // Validate each checkbox
                            if (!checkboxArray.map(function (e) {
                                    return e.checked;
                                }).any()) {
                                return JotForm.errored(input, JotForm.texts.required);
                            }
                        } else {
                            if (!$A(document.getElementsByName(input.name)).map(function (e) {
                                    if (JotForm.isVisible(e)) {
                                        // if this is an sub product checkbox (expanded)
                                        if (e.readAttribute('type') === "checkbox" && e.value.indexOf('_expanded') > -1) {
                                            // if not selected
                                            if (!e.checked) {
                                                return false;
                                            } else {
                                                // check if any of the quantities are filled
                                                return $A($$('#' + e.id + '_subproducts .form-subproduct-quantity')).map(function (cb) {
                                                    return cb.getSelected().value > 0 || cb.value > 0;
                                                }).any();
                                            }
                                        } else {
                                            return e.checked;
                                        }
                                    }
                                }).any()) {
                                // for paypalpro payment type radio
                                if (input.hasClassName('paymentTypeRadios')) {
                                    return JotForm.errored(input, "Please select payment method.");
                                }
                                return JotForm.errored(input, JotForm.texts.required);
                            }
                        }

                    }
                } else if ((input.tagName == "INPUT" || input.tagName == "SELECT") && $(input.parentNode).hasClassName('form-matrix-values')) {
                    var matrixRows = {};
                    var oneEntry = false;
                    var oneEmpty = false;

                    input.up('table').select(input.tagName).each(function (e) {
                        if (!(e.name in matrixRows)) {
                            matrixRows[e.name] = false;
                        }
                        if (matrixRows[e.name] !== true) {
                            matrixRows[e.name] = (e.value && !e.value.strip(" ").empty());
                        }
                        if (matrixRows[e.name] === true) {
                            oneEntry = true;
                        }
                        if ('value' in e && e.value.strip(" ").empty()) {
                            oneEmpty = true;
                        }
                    });
                    if (vals.include("requireEveryRow") && !$H(matrixRows).values().all()) {
                        return JotForm.errored(input, JotForm.texts.requireEveryRow);
                    } else if (vals.include("requireOneAnswer") && !oneEntry) {
                        return JotForm.errored(input, JotForm.texts.requireOne);
                    } else if (vals.include('requireEveryCell') && oneEmpty) {
                        return JotForm.errored(input, JotForm.texts.requireEveryCell);
                    } else {
                        return JotForm.corrected(input);
                    }
                } else if ((input.tagName === "INPUT" || input.tagName === "SELECT") && input.hasClassName('form-subproduct-option')) {
                    // if this is a subproduct quantity option 
                    if (input.hasClassName('form-subproduct-quantity')) {
                        var qID = input.id.replace(/_[0-9]*_[0-9]*$/, '');
                        // if the corresponding checkbox is  checked
                        if ($(qID.replace(/_quantity/, '')).checked) {
                            // if any of the quantities are greater than 0
                            if ($A($$('[id*="' + qID + '"]')).map(function (vl) {
                                    return (vl.getSelected().value > 0 || vl.value > 0);
                                }).any()) {
                                return JotForm.corrected(input); // corrected
                            } else {
                                return JotForm.errored(input, JotForm.texts.required); // errored
                            }
                        }
                    }
                } else if (input.name && input.name.include("[")) {
                    try {
                        var cont = $this.getContainer(input);
                        // Ozan, bugfix: 133419, both input and select fields should be selected
                        var checkValues = cont.select('input,select[name*=' + input.name.replace(/\[.*$/, '') + ']').map(function (e) {
                            // If this is an address field and country is not United States or Canada 
                            // then don't require state name
                            if (e.hasClassName('form-address-state')) {
                                var country = cont.select('.form-address-country')[0].value;
                                if (country != 'United States' && country != 'Canada' && country != 'Please Select') {
                                    e.removeClassName('form-validation-error');
                                    e.__skipField = true;
                                    return false;
                                }
                            } else {
                                if (e.__skipField) {
                                    e.__skipField = false;
                                }
                            }

                            // If this is a custom quantity textbox
                            if (e.id.match(/input_[0-9]+_quantity_[0-9]+_[0-9]+/) && e.type == 'text') {

                                var cb = $(((e.id.replace('_quantity', '')).match(/input_[0-9]+_[0-9]+/))[0]);
                                var allProducts = $$('[id*="' + e.id.match(/input_[0-9]*/)[0] + '"][type="' + cb.getAttribute('type') + '"]');
                                // if this is a subproduct quantity
                                if (e.id.split("_").length === 6) {
                                    var subProductQty = $$('[id*="' + e.id.replace(/_[0-9]*_[0-9]*$/, "") + '"]');
                                }

                                if ((cb.checked && !subProductQty && (isNaN(e.value) || e.value == 0 || e.value.empty())) // if a product is selected and qty is not valid
                                    || (!allProducts.map(function (c) {
                                        return c.checked
                                    }).any()) // if there are no products selected
                                    || (cb.checked && subProductQty && !subProductQty.map(function (q) {
                                        return q.value > 0
                                    }).any()) // if this is a subproduct and none of the subproduct quantity are filled
                                ) {
                                    e.addClassName('form-validation-error');
                                    return true;
                                }
                            }
                            var innerVals = e.className.replace(/.*validate\[(.*)\].*/, '$1').split(/\s*,\s*/);
                            if (innerVals.include('required') && JotForm.isVisible(e)) {
                                if (e.value.empty() || e.value.strip() == 'Please Select') {
                                    e.addClassName('form-validation-error');
                                    return true;
                                }
                            }
                            e.removeClassName('form-validation-error');
                            return false;
                        });
                        // skip payment field validation on edit mode (b#446215)
                        if (JotForm.payment && cont.getAttribute('data-type').match(JotForm.payment)
                            && ["edit", "inlineEdit", "submissionToPDF"].indexOf(document.get.mode) > -1
                            && document.get.sid) {
                            return JotForm.corrected(input);
                        }

                        if (checkValues.any()) {
                            return JotForm.errored(input, JotForm.texts.required);
                        }
                    } catch (e) {
                        // This can throw errors on internet explorer
                        JotForm.error(e);
                        return JotForm.corrected(input);
                    }
                }
                if (input.__skipField) {
                    return JotForm.corrected(input);
                }
                if (input.tagName.toLowerCase() === 'textarea' && input.hasClassName('form-custom-hint') && !input.up('div').down('.nicEdit-main')) {
                    return JotForm.errored(input, JotForm.texts.required);
                }
                if (input.hasClassName("form-textarea") && input.up('div').down('.nicEdit-main')) { //rich text area
                    var val = input.up('div').down('.nicEdit-main').innerHTML.stripTags().replace(/\s/g, '').replace(/&nbsp;/g, '');
                    if (val.empty() || (input.readAttribute("data-customhint") && input.readAttribute("data-customhint") == input.up('div').down('.nicEdit-main').innerHTML)) {
                        return JotForm.errored(input, JotForm.texts.required);
                    }
                } else if ((!input.value || input.value.strip(" ").empty() || input.value.replace('<br>', '').empty() || input.value == 'Please Select') && !(input.readAttribute('type') == "radio" || input.readAttribute('type') == "checkbox") && !$(input.parentNode).hasClassName('form-matrix-values')) {
                    return JotForm.errored(input, JotForm.texts.required);
                }

                vals = vals.without("required");

            } else if (input.value.empty()) {
                // if field is not required and there is no value 
                // then skip other validations
                return true;
            }

            if (!vals[0]) {
                return true;
            }

            switch (vals[0]) {
                case "Password":
                    if (!reg.password.test(input.value)) {
                        return JotForm.errored(input, JotForm.texts.password);
                    }  
                    break;
                
                case "Email":
                    if (!reg.email.test(input.value)) {
                        return JotForm.errored(input, JotForm.texts.email);
                    }
                    break;
                default:
                // throw ("This validation is not valid (" + vals[0] + ")");
            }
            return JotForm.corrected(input);
        };
        var validatorEvent = function (e) {
            setTimeout(function () { // to let focus event to work
                if ($this.lastFocus && ($this.lastFocus == input || $this.getContainer($this.lastFocus) != $this.getContainer(input))) {
                    input.validateInput();
                } else if (input.type == "hidden" || input.type == 'file') {
                    input.validateInput(); // always run on hidden/upload elements
                }
            }, 10);
        };

        if (input.type == 'hidden' || input.type == 'file') {
            input.observe('change', validatorEvent);
        } else {
            input.observe('blur', validatorEvent);
        }
        if (input.type == 'checkbox' || input.type == 'radio') {
            input.observe('click', function () {
                input.validateInput();
            });
        }

        if (input.hasClassName("form-textarea") && input.up('div').down('.nicEdit-main')) { //rich text area
            input.up('div').down('.nicEdit-main').observe('blur', validatorEvent);
        }

        if (input.up('.form-spinner')) {
            var spinnerEvent = function () {
                input.validateInput();
            };
            input.up('.form-spinner').down('.form-spinner-up').observe('click', spinnerEvent);
            input.up('.form-spinner').down('.form-spinner-down').observe('click', spinnerEvent);
        }
    },


 
   

    track: function (w, d) {
        var self = this;

        // var JotFormTrackerObject = window['JotFormTrackerObject'];
        // var _buildSourceOptions = JotFormTrackerObject['options'];
        var _form = $$('.jotform-form')[0];
        var _formID = _form.getAttribute('id');
        var _referer;
        var _location;

        try {
            _referer = encodeURIComponent(document.referrer);
        } catch (e) {
            _referer = 'undefined'
        }

        try {
            _location = encodeURIComponent(window.top.location.href);
        } catch (e) {
            _location = 'undefined'
        }

        var _screenHeight = window.screen.height;
        var _screenWidth = window.screen.width;

        if (!_formID) {
            return false;
        }
        if (_form) {
            var uuid = generateUUID();
            insertAfter(createImageEl(uuid), _form);
            createEventID(uuid);
        }
        function insertAfter(newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }

        function createImageEl(uuid) {
            var base = '//events.jotform.com/';
            if (self.jsForm) {
                base = base + 'jsform/';
            } else {
                base = base + 'form/';
            }
            var src = base + _formID + '/';
            var resolutionStr;
            if (_screenHeight && _screenWidth) {
                resolutionStr = _screenWidth + 'x' + _screenHeight;
            }
            src = src + '?ref=' + encodeURIComponent(_referer);
            if (resolutionStr) {
                src = src + '&res=' + encodeURIComponent(resolutionStr);
            }
            if (uuid) {
                src = src + '&eventID=' + encodeURIComponent(uuid);
            }

            src = src + '&loc=' + encodeURIComponent(_location);

            var img = new Image();
            img.src = src;
            img.style.display = 'none';
            return img;
        }

        function createEventID(uuid) {
            var inputEl = document.createElement('input');
            inputEl.setAttribute('type', 'hidden');
            inputEl.setAttribute('name', 'event_id');
            inputEl.value = uuid;
            _form.appendChild(inputEl);
        }

        function generateUUID() {
            return 1 * new Date() + '_' + _formID + '_' + randomString(7);
        }

        function randomString(len) {
            charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var randomString = '';
            for (var i = 0; i < len; i++) {
                var randomPoz = Math.floor(Math.random() * charSet.length);
                randomString += charSet.substring(randomPoz, randomPoz + 1);
            }
            return randomString;
        }
    }
};
function getQuerystring(key, default_) {
    if (default_ == null) default_ = "";
    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var qs = regex.exec(window.location.href);
    if (qs == null)
        return default_;
    else
        return qs[1];
}
// We have to put this event because it's the only way to catch FB load
window.fbAsyncInit = JotForm.FBInit.bind(JotForm);
