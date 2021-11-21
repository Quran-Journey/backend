$(document).ready(function () {
    setup_alerts();
    $("#alert").hide();

});

function setup_alerts() {
    var close = document.getElementsByClassName("closebtn");
    var i;

    // Loop through all close buttons
    for (i = 0; i < close.length; i++) {
        // When someone clicks on a close button
        close[i].onclick = function () {
            $('#alert').hide();
        }
    }
}

function contactus() {
    $.ajax({
        url: "https://muslimathleticassociation.org:3001/api/mail/contactus",
        method: "POST",
        data: {
            email: $("#email").val(),
            subject: $("#subject").val(),
            name: $("#name").val(),
            message: $("#message").val()
        },
        type: "https"
    }).then((response) => {
        console.log(response)
        if (response == 200) {
            console.log("Registration input is valid. User May continue registration.");
            // "Thank you for contacting us, we have recieved your message, we will be in contact with you shortly."
            $('#alert-message').html("Thank you for contacting us, we have recieved your message, we will be in contact with you shortly." + '<br> Please contact us at info@maaweb.org if you think there is an issue.')
            $('#alert').slideDown();
            $('#send-message').hide();
        }
    })
}