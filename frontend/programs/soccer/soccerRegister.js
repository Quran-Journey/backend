// This file sends requests and handles dynamic displays for registration
// import fv from "./formValidation";

$(".accordion-header-title").click(function () {
    if ($(".accordion-header-icon").css("transform") == "none") {
        $(".accordion-header-icon").css("transform", "rotate(180deg)");
    } else {
        $(".accordion-header-icon").css("transform", "");
    }
});

$(document).ready(function () {
    setup_alerts();
    $("#captain-alert").hide();

    // Auth stuff
    const firebaseConfig = {
        apiKey: "AIzaSyBY5rpkm50plJUxUFdx91dp9K_l7B3xTKc",
        authDomain: "maacrm-ba986.firebaseapp.com",
        projectId: "maacrm-ba986",
        storageBucket: "maacrm-ba986.appspot.com",
        messagingSenderId: "666734854469",
        appId: "1:666734854469:web:be4babb95d28feed1afe2c",
        measurementId: "G-9BDKFXTM5H",
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
});

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function showGuardian() {
    guardian = true;
    $("#guardian-title").show(400);
    $("#guardian-info").show(400);
    $("#guardian-sign").show(400);
    $("#guardian-terms").prop("required", true);
    $("#guardian-phone").prop("required", true);
    $("#guardian-email").prop("required", true);
    $("#guardian-name").prop("required", true);
}

function hideGuardian() {
    guardian = false;
    $("#guardian-info").hide(400);
    $("#guardian-title").hide(400);
    $("#guardian-sign").hide(400);
    $("#guardian-terms").prop("required", false);
    $("#guardian-phone").prop("required", false);
    $("#guardian-email").prop("required", false);
    $("#guardian-name").prop("required", false);
}

function checkTerms() {
    var terms = $(".term-check").get();
    for (var i = 0; i < terms.length; i++) {
        if ($(terms[i]).is(":visible") && $(terms[i]).is(":required")) {
            if (!$(terms[i]).is(":checked")) {
                console.log("Not all required terms have been checked.");
                $("#alert-message").html(
                    "Please select all required consent checks. <br> Please contact us at info@maaweb.org if you think there is an issue."
                );
                $("#alert").slideDown();
                return false;
            }
        }
    }
    return true;
}

function register(member) {
    if (!checkTerms()) {
        return false;
    }

    if ($("#first_name").val() == "" || $("#last_name").val() == "") {
        $("#alert-message").html(
            "Please fill in your first and last name." +
                "<br> Please contact us at info@maaweb.org if you think there is an issue."
        );
        $("#alert").slideDown();
        return false;
    }

    if (
        $("#guardian-info").is(":visible") &&
        ($("#guardian-name").val() == "" ||
            $("#guardian-phone").val() == "" ||
            $("#guardian-email").val() == "")
    ) {
        $("#alert-message").html(
            "Please fill in your guardian information." +
                "<br> Please contact us at info@maaweb.org if you think there is an issue."
        );
        $("#alert").slideDown();
        return false;
    }

    var email_consent = $("#recieve-emails").is(":checked");
    console.log(email_consent);
    console.log(toString(email_consent));

    $.ajax({
        url: "httpss://muslimathleticassociation.org:3001/api/registration/temporary/subscribe",
        data: {
            first_name: $("#first_name").val(),
            last_name: $("#last_name").val(),
            phone: $("#phone").val(),
            email: $("#email").val(),
            birthday: $("#birthday").val(),
            gender: "Female",
            program: "Yoga",
            payment: 0,
            team_name: "",
            datetime: new Date().toISOString().slice(0, 19).replace("T", " "),
            subscription: 1,
            consent: [
                { given: "true", purpose: "Yoga Agreement" },
                { given: email_consent, purpose: "Yoga Sponsor Contact" },
            ],
            guardian: {
                email: $("#guardian-email").val(),
                phone: $("#guardian-phone").val(),
                full_name: $("#guardian-name").val(),
            },
        },
        type: "POST",
        dataType: "text json",
    })
        .done((data) => {
            console.log(data);
            console.log(data.error);
            if (data.success == true) {
                $("#alert-message").html(
                    data.error +
                        "<br> Please contact us at info@maaweb.org if you think there is an issue."
                );
                $("#alert").slideDown();
                $("#register-button").hide();
            } else {
                $("#alert-message").html(
                    data.error +
                        "<br> Please contact us at info@maaweb.org if you think there is an issue."
                );
                $("#alert").slideDown();
            }
        })
        .catch((error) => {
            console.log("Registration failed.", error.responseJSON.error);
            $("#alert-message").html(
                error.responseJSON.error +
                    "<br> Please contact us at info@maaweb.org if you think there is an issue."
            );
            $("#alert").slideDown();
        });
}

function setup_alerts() {
    var close = document.getElementsByClassName("closebtn");
    var i;

    // Loop through all close buttons
    for (i = 0; i < close.length; i++) {
        // When someone clicks on a close button
        close[i].onclick = function () {
            $("#captain-alert").hide();
        };
    }
}

function errorSlide(eDivName, eMessageDiv, errorMessage) {
    $(eMessageDiv).html(
        errorMessage +
            "<br> Please contact us at info@maaweb.org if you think there is an issue."
    );
    $(eDivName).slideDown();
}

async function createCaptainAccount() {
    const email = $("#captain-email").val();
    const password = $("#captain-password").val();
    const first_name = $("#captain-first_name").val();
    const last_name = $("#captain-last_name").val();
    const phone = $("#captain-phone").val();
    const birthday = $("#captain-birthday").val();
    let person;

    if (password.length < 8) {
        errorSlide(
            "#captain-alert",
            "#captain-alert-message",
            "Password must be atleast 8 characters long"
        );
        return;
    }

    console.log(email, password);

    $.ajax({
        url: "https://muslimathleticassociation.org:3001/api/addPerson",
        data: {
            email: email,
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            birthday: birthday,
            gender: "male",
        },
        type: "POST",
        dataType: "text json",
    })
        .done((result) => {
            if (result.success) {
                console.log("success", result);
                createFirebaseAccount(email, password);
            } else if (result.ecode == 1) {
                createFirebaseAccount(email, password);
            } else {
                console.log("error", result);
                errorSlide(
                    "#captain-alert",
                    "#captain-alert-message",
                    result.error
                );
            }
        })
        .catch((result) => {
            console.log(result);
            if (result.responseJSON.ecode == 1) {
                createFirebaseAccount(email, password);
                return;
            }
            errorSlide(
                "#captain-alert",
                "#captain-alert-message",
                result.responseJSON.error
            );
        });
}

async function createFirebaseAccount(email, password) {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log(userCredential);
            var user = userCredential.user;
            return user.getIdToken().then((idToken) => {
                console.log(idToken);
                return fetch(
                    "https://muslimathleticassociation.org:3001/api/login",
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            idToken,
                            email: email,
                        }),
                    }
                ).then(() => {
                    $("#create-captain-account").hide();
                    $(".create-team").show();
                    $("#captain-alert").hide();
                });
            });
        })
        .then(() => {
            return firebase.auth().signOut();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            if (error.code == "auth/email-already-in-use") {
                login(email, password);
                return;
            }
            errorSlide(
                "#captain-alert",
                "#captain-alert-message",
                errorMessage
            );
        });
}

async function login(email, password) {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
            return user.getIdToken().then((idToken) => {
                console.log(idToken);
                return fetch(
                    "https://muslimathleticassociation.org:3001/api/login",
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            idToken,
                            email: email,
                        }),
                    }
                ).then(() => {
                    $("#create-captain-account").hide();
                    $(".create-team").show();
                    $("#captain-alert").hide();
                });
            });
        })
        .then(() => {
            return firebase.auth().signOut();
        })
        .catch((err) => {
            console.log(err.message);
            errorSlide("#captain-alert", "#captain-alert-message", err.message);
        });
}

function createTeam() {
    let cookies = getCookieValues();
    const team = $("#team-name").val();
    console.log(cookies);
    let p = cookies.person_id;
    if (team.length < 3) {
        errorSlide(
            "#captain-alert",
            "#captain-alert-message",
            "Team name must be atleast 3 characters long"
        );
        return;
    }
    $.ajax({
        url: "https://muslimathleticassociation.org:3001/api/team/create",
        data: {
            person_id: p,
            team_name: team,
            subscription: 1,
            team_capacity: 12,
            datetime: Date.now(),
        },
        type: "POST",
        dataType: "text json",
    })
        .done((result) => {
            console.log(result);
            $("#register-team-button").slideUp();
            errorSlide(
                "#captain-alert",
                "#captain-alert-message",
                result.error
            );
        })
        .catch((result) => {
            console.log(result);
            errorSlide(
                "#captain-alert",
                "#captain-alert-message",
                result.responseJSON.error
            );
        });
}

function getCookieValues() {
    str = document.cookie.split("; ");
    var result = {};
    for (var i = 0; i < str.length; i++) {
        var cur = str[i].split("=");
        result[cur[0]] = cur[1];
    }
    return result;
}
