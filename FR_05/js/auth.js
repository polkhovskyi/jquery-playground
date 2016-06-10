$.fn.createAuth = function (options) {
    $(document).ready(function () {
        var settings = $.extend({
            loginPopupClass: "login-popup",
            loginLinkSelector: "a.login-window",
            loginFormId: "login",
            registerFormId: "register",
            loginServerError: "serverValidationResult",
            registerServerError: "serverValidationResult",

        }, options);

        var loginServerError = "#" + settings.loginServerError;
        var registerServerError = "#" + settings.registerServerError;
        var loginForm = $('#' + settings.loginFormId);
        var registerForm = $('#' + settings.registerFormId);
        var jqhlogin = $("#hlogin");
        $(settings.loginLinkSelector).click(function () {
            var closeBox = function () {
                var str = '#mask, .' + settings.loginPopupClass;
                $(str).fadeOut(300, function () {
                    $('#mask').remove();
                });
            };
            var loginBox = $(this).attr('href');
            var jqloginbox = $(loginBox);
            jqloginbox.fadeIn(300);
            var popMargTop = (jqloginbox.height() + 24) / 2;
            var popMargLeft = (jqloginbox.width() + 24) / 2;
            jqloginbox.css({
                'margin-top': -popMargTop,
                'margin-left': -popMargLeft
            });

            $('body').append('<div id="mask"></div>');
            $('#mask').fadeIn(300).on('click', function () {
                closeBox();
            });

            loginForm.validate({
                rules: {
                    myEmail: {
                        required: true,
                        email: true
                    },
                    myPassword: {
                        required: true
                    }
                },
                errorElement: 'span',
                errorClass: 'help-block',
                errorPlacement: function (error, element) {
                    if (element.parent('.input-group').length) {
                        error.insertAfter(element.parent());
                    } else {
                        error.insertAfter(element);
                    }
                },
                submitHandler: function (form) {
                    // here we should send data to server and get response
                    var email = form.myEmail.value,
                        emails = ["glen@marketo.com", "george@bush.gov", "me@god.com", "aboutface@cooper.com", "steam@valve.com", "bill@gates.com"];
                    var jqform = $(form);
                    if ($.inArray(email, emails) == -1) {
                        jqform.find(loginServerError).html("<span class='help-block'>Invalid email/password!</div>");
                    } else {
                        jqform.find(loginServerError).html("");
                        jqhlogin.html('<p class="good">You are logged in as ' + email + '</p>');

                        closeBox();
                    }

                    return false;
                }
            });

            registerForm.validate({
                rules: {
                    myEmail: {
                        required: true,
                        email: true
                    },
                    myRegisterPassword: {
                        required: true
                    },
                    confirmMyPassword: {
                        required: true,
                        equalTo: "#myRegisterPassword"
                    }
                },
                errorElement: 'span',
                errorClass: 'help-block',
                errorPlacement: function (error, element) {
                    if (element.parent('.input-group').length) {
                        error.insertAfter(element.parent());
                    } else {
                        error.insertAfter(element);
                    }
                },
                submitHandler: function (form) {
                    // here we should send data to server and get response
                    jqhlogin.html('<p class="good">Thanks for the registration. You are logged in as ' + form.myEmail.value + '</p>');
                    closeBox();
                    return false;
                }
            });

            return false;
        });
    });

}
