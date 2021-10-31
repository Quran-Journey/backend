// This file handles the options registrations page
$(document).ready(function () {
    $("#choices").change(function () {
        var waiver;
        console.log($(this).val())
        switch ($(this).val()) {
            case "create-team":
                waiver = '../assets/waivers/soccerMensOver18.txt'
                showForm();
                break;
            case "register-for-team":
                window.location.replace("individualRegistration.html");
                break;
        }
        $(".register-terms").attr('src', waiver);
    });
}