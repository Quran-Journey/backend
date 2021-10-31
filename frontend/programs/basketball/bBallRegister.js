const API_URL = "http://localhost:3001/api"; // This should be an env variable.

async function apiPOST(path, body = {}) {
    return await $.ajax({
        url: API_URL + path,
        type: "POST",
        data: body,
        cache: false,
        dataType: "text json",
    })
        .done((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(err.responseJSON);
            return err.responseJSON;
        });
}

async function apiGET(path) {
    return await $.ajax({
        url: API_URL + path,
        type: "GET",
        dataType: "text json",
    })
        .done((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(err.responseJSON);
            return err.responseJSON;
        });
}

// The above code is also in utils.js and should be replaced by that file when we figure out imports.

$(".accordion-header-title").click(function () {
    if ($(".accordion-header-icon").css("transform") == "none") {
        $(".accordion-header-icon").css("transform", "rotate(180deg)");
    } else {
        $(".accordion-header-icon").css("transform", "");
    }
});

$(document).ready(async function () {
    let colors = [
        "PINK/GRAY",
        "PURPLE/GOLD",
        "PURPLE",
        "GREEN",
        "YELLOW",
        "RED",
        "BLUE",
        "ORANGE",
        "BLACK",
        "BEIGE",
    ];
    colors.sort();
    let colors_dropdown = $("#jersey_color");
    for (var color = 0; color < colors.length; color++) {
        console.log(colors[color]);
        colors_dropdown.append(
            $("<option></option>")
                .attr("value", colors[color])
                .text(colors[color])
        );
    }
    await getTeams(colors);
    setup_alerts();
    $("#captain-alert").hide();
    $("#player-alert").hide();
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

function checkTerms(person) {
    // person can either be "captain" or "player"
    var terms = $(`.${person}-term-check`).get();
    for (var i = 0; i < terms.length; i++) {
        if ($(terms[i]).is(":visible") && $(terms[i]).is(":required")) {
            if (!$(terms[i]).is(":checked")) {
                console.log("Not all required terms have been checked.");
                $(`#${person}-alert-message`).html(
                    "Please select all required consent checks. <br> Please contact us at info@maaweb.org if you think there is an issue."
                );
                $(`#${person}-alert`).slideDown();
                return false;
            }
        }
    }
    return true;
}

function getTime() {
    return new Date().toISOString().slice(0, 19).replace("T", " ");
}

function registration_validation(inputs, person) {
    if (!checkTerms(person)) {
        return false;
    }
    keys = Object.keys(inputs);
    values = Object.values(inputs);
    for (let v = 0; v < values.length; v++) {
        console.log(keys[v], values[v]);
        if (!values[v] && !(person=="player" && keys[v] == "color")) {
            $(`#${person}-alert-message`).html(
                `${keys[v]
                    .split("_")
                    .join(
                        " "
                    )} must be filled in <br> Phone or Text 416-556-6718 or Email info@maaweb.org if you think there is an issue.`
            );
            $(`#${person}-alert`).slideDown();
            return false;
        }
    }

    if (
        $("#guardian-info").is(":visible") &&
        ($("#guardian-name").val() == "" ||
            $("#guardian-phone").val() == "" ||
            $("#guardian-email").val() == "")
    ) {
        $(`#${person}-alert-message`).html(
            "Please fill in your guardian information." +
                "<br> Phone or Text 416-556-6718 or Email info@maaweb.org if you think there is an issue."
        );
        $(`#${person}-alert`).slideDown();
        return false;
    }
    return true;
}

async function register(person) {
    console.log(person);
    let input = {
        first_name: $(`#${person}-first_name`).val(),
        last_name: $(`#${person}-last_name`).val(),
        phone: $(`#${person}-phone`).val(),
        email: $(`#${person}-email`).val(),
        birthday: $(`#${person}-birthday`).val(),
        color: $(`#jersey_color`).val(),
        gender: `Male`,
        program: `Basketball`,
        team_name: $(`#${person}-team-name`).val(),
        team: $(`#${person}-team-name`).val(),
        datetime: getTime(),
        group_id: 2,
        subscription: 2,
        team_capacity: 10,
        consent: [
            { given: "true", purpose: "Basketball League Agreement" },
            { given: "true", purpose: "Basketball Contact" },
        ],
        guardian: {
            email: $("#guardian-email").val(),
            phone: $("#guardian-phone").val(),
            full_name: $("#guardian-name").val(),
        },
    };
    // We should probably ensure that the captains is 18+ too
    if (registration_validation(input, person)) {
        return await apiPOST(`/team/${person}`, input).then(async (res) => {
            return await handleRes(res, person);
        });
    }
}

async function handleRes(res, person) {
    $(`#${person}-alert-message`).html(
        `${res.error} <br> Phone or Text 416-556-6718 or Email info@maaweb.org if you think there is an issue.`
    );
    $(`#${person}-alert`).slideDown()
    let returning = $(`#${person}-attendance`).val();
    if (res.success && returning == "Yes") {
        window.location =
            "https://checkout.square.site/merchant/MLX4BNZVQWGK4/checkout/OJDNT6YTB4ESJXOZDHUL5KDU";
    } else if (res.success) {
        window.location =
            "https://checkout.square.site/merchant/MLX4BNZVQWGK4/checkout/2XPWG2VXYRNORLXOIFT63GSL";
    }
}

function setup_alerts() {
    var captain_close = document.getElementsByClassName("captain-closebtn");
    var player_close = document.getElementsByClassName("player-closebtn");
    var i;

    // Loop through all close buttons
    for (i = 0; i < captain_close.length; i++) {
        // When someone clicks on a close button
        captain_close[i].onclick = function () {
            $(".captain-alert").hide();
        };
    }

    for (i = 0; i < player_close.length; i++) {
      // When someone clicks on a close button
      player_close[i].onclick = function () {
          $(".player-alert").hide();
      };
  }
}

// function errorSlide(eDivName, eMessageDiv, errorMessage) {
//     $(eMessageDiv).html(
//         errorMessage +
//             "<br> Please contact us at info@maaweb.org if you think there is an issue."
//     );
//     $(eDivName).slideDown();
// }

function getCookieValues() {
    str = document.cookie.split("; ");
    var result = {};
    for (var i = 0; i < str.length; i++) {
        var cur = str[i].split("=");
        result[cur[0]] = cur[1];
    }
    return result;
}

async function getTeams(colors) {
    let dropdown = $("#player-team-name");
    let colors_dropdown = $("#jersey_color");
    // var colors was defined when the document loaded.
    dropdown.empty();
    dropdown.append(
        $("<option></option>").attr("value", "").text("Select your team")
    );
    let competition = "Gaurd Up League (Men's)";
    await apiGET(`/${competition.split(" ").join("%20")}/getTeams`)
        .then((res) => {
            teams = [];
            picked_colors = [];
            for (var team = 0; team < res.data.length; team++) {
                teams.push(res.data[team].team_name);
                picked_colors.push(res.data[team].color);
                console.log(res.data[team]);
            }
            teams.sort();
            for (var team = 0; team < teams.length; team++) {
                dropdown.append(
                    $("<option></option>")
                        .attr("value", teams[team])
                        .text(teams[team])
                );
            }
            console.log(picked_colors);
            if (picked_colors) {
                colors_dropdown.empty();
            }
            for (var color = 0; color < colors.length; color++) {
                if (picked_colors.indexOf(colors[color]) == -1) {
                    console.log(colors[color]);
                    colors_dropdown.append(
                        $("<option></option>")
                            .attr("value", colors[color])
                            .text(colors[color])
                    );
                }
            }
            let spots = 10 - teams.length;
            $(".spots").text(`Spots left: ${spots}`);
            $(".spots").addClass("spots-fetched");
        })
        .catch((res) => {
            console.log("Could not fetch teams.", res);
        });
}
