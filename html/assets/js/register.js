// This file sends requests and handles dynamic displays for registration
// import fv from "./formValidation";

var guardian = false;

$(document).ready(function () {
  hideGuardian();
  $("#recieve-emails").prop("required", false);
  setup_alerts();
  $("#alert").hide();
  $("#birthday").change(function () {
    var age = getAge($(this).val());
    if (age < 18) {
      showGuardian();
    } else {
      hideGuardian();
    }
  });
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
    url: "https://muslimathleticassociation.org:3001/api/registration/temporary/subscribe",
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
      $("#alert").hide();
    };
  }
}
