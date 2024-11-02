$(document).ready(function() {
    // Initially disable the Register button
    $("#sbmt").prop("disabled", true);

    // Event handlers for input fields
    $("#form_email").on("input", function() {
       validateEmail();
       enableDisableRegisterButton();
    });

    $("#form_username").on("input", function() {
       validateUserName();
       enableDisableRegisterButton();
    });

    $("#form_password").on("input", function() {
       validatePassword();
       enableDisableRegisterButton();
    });

    $("#form_confirm_password").on("input", function() {
       validateConfirmPassword();
       enableDisableRegisterButton();
    });

    function validateEmail() {
       var email = $("#form_email").val();
       var emailPattern = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;
       if (emailPattern.test(email) && email !== '') {
          $("#email_error_message").text("");
          $("#form_email").css("border", "1px solid #ccc");
       } else {
          $("#email_error_message").text("Please enter a valid northeastern email address.");
          $("#form_email").css("border", "1px solid red");
       }
    }

    function validateUserName() {
       var username = $("#form_username").val();
       var usernamePattern = /^[a-zA-Z0-9]+$/; // Allow only letters and numbers
       var minLength = 5; // Minimum username length
       var maxLength = 20; // Maximum username length

       if (usernamePattern.test(username) && username.length >= minLength && username.length <= maxLength) {
          $("#username_error_message").text("");
          $("#form_username").css("border", "1px solid #ccc");
       } else {
          if (!usernamePattern.test(username)) {
             $("#username_error_message").text("User Name should only contain letters and numbers.");
          } else if (username.length < minLength) {
             $("#username_error_message").text("User Name should be at least " + minLength + " characters.");
          } else if (username.length > maxLength) {
             $("#username_error_message").text("User Name should not exceed " + maxLength + " characters.");
          }
          $("#form_username").css("border", "1px solid red");
       }
    }

    function validatePassword() {
       var password = $("#form_password").val();
       if (password.length >= 6 && password.length <= 10) {
          $("#password_error_message").text("");
          $("#form_password").css("border", "1px solid #ccc");
       } else {
          $("#password_error_message").text("Password must be between 6 and 10 characters.");
          $("#form_password").css("border", "1px solid red");
       }
    }

    function validateConfirmPassword() {
       var confirmPassword = $("#form_confirm_password").val();
       var password = $("#form_password").val();
       if (confirmPassword === password) {
          $("#confirm_password_error_message").text("");
          $("#form_confirm_password").css("border", "1px solid #ccc");
       } else {
          $("#confirm_password_error_message").text("Passwords do not match.");
          $("#form_confirm_password").css("border", "1px solid red");
       }
    }

    function enableDisableRegisterButton() {
       // Enable the Register button only if all fields are valid
       if ($("#email_error_message").text() === "" &&
          $("#username_error_message").text() === "" &&
          $("#password_error_message").text() === "" &&
          $("#confirm_password_error_message").text() === "") {
          $("#sbmt").prop("disabled", false);
       } else {
          $("#sbmt").prop("disabled", true);
       }
    }
 });

 $("#registration_form").submit(function() {
    // Check if all fields are valid
    if ($("#email_error_message").text() === "" &&
       $("#username_error_message").text() === "" &&
       $("#password_error_message").text() === "" &&
       $("#confirm_password_error_message").text() === "") {
       // After successful registration
       var username = $("#form_username").val(); // Get the username from the form
       window.sessionStorage.setItem("username", username); // Set the username in sessionStorage

       // Redirect to calculator.html
       window.location.href = "calculator.html";
       return false; // Prevent the form from submitting
    } else {
       alert("Please correct the errors in the form.");
       return false; // Prevent the form from submitting
    }
 });
 $(document).ready(function () {
   var username = window.sessionStorage.getItem("username");
   $("#headerText").html("Welcome " + sessionStorage.getItem("username"));

   $(".operation").on("click", function () {
       var x = parseFloat($('#x').val()); // Parse input values as floats for decimal support
       var y = parseFloat($('#y').val()); // Parse input values as floats for decimal support
       var operation = $(this).val();

       const calculate = (x, y, operation) => {
           switch (operation) {
               case "Add":
                   return x + y;
               case "Subtract":
                   return x - y;
               case "Multiply":
                   return x * y;
               case "Divide":
                   return y !== 0 ? x / y : "Cannot divide by zero";
               default:
                   return "Invalid operation";
           }
       };

       $("#result").val(calculate(x, y, operation));
   });
});

function validateInputs(object, type, nameType) {
   var pattern = /^([0-9]+(\.[0-9]+)?|[+\-*/])+$/; // Adjusted pattern to allow decimal numbers
   var name = "errorMsg" + nameType;
   var errorMsg = document.getElementById(name);
   errorMsg.textContent = "";

   switch (type) {
       case 1:
           if (!object.value.trim().match(pattern)) {
               object.style.border = "5px solid #F90A0A";
               errorMsg.textContent = "Only numbers are allowed, please enter valid input values.";
               object.value = "";
           } else {
               object.style.border = "";
           }
           break;

       case 2:
           if (!object.value.trim().match(pattern)) {
               object.style.border = "5px solid red";
               errorMsg.textContent = "Only numbers are allowed, please enter valid input values.";
               object.value = "";
           } else {
               object.style.border = "";
           }
           break;
   }
}
