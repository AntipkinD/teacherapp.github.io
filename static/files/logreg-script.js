const container = document.querySelector(".container"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    login = document.querySelector(".login-link");

//   js code to show/hide password and change icon
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if (pwField.type === "password") {
                pwField.type = "text";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                })
            } else {
                pwField.type = "password";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                })
            }
        })
    })
})

// js code to appear signup and login form
signUp.addEventListener("click", () => {
    container.classList.add("active");
});
login.addEventListener("click", () => {
    container.classList.remove("active");
});
document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.querySelector('.form.signup input[type="button"]');

    registerButton.addEventListener('click', function() {
        const firstName = document.querySelector('.form.signup input[placeholder="Имя"]').value;
        const lastName = document.querySelector('.form.signup input[placeholder="Фамилия"]').value;
        const phoneNumber = document.querySelector('.form.signup input[placeholder="Телефон"]').value;
        const email = document.querySelector('.form.signup input[placeholder="Электронная почта"]').value;
        const password = document.querySelector('.form.signup input[placeholder="Пароль"]').value;

        const userData = {
            first_name: firstName,
            last_name: lastName,
            number: phoneNumber,
            email: email,
            password: password
        };

        // Отправка данных на сервер
        fetch('http://localhost:8080/api/v1/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при сохранении пользователя');
                }
                console.log('Пользователь успешно сохранен');
            })
            .catch(error => {
                console.error('Произошла ошибка:', error);
            });
    });
});

// jQuery code to appear and disappear fields
$(document).ready(function () {
    $('.form-check-label').change(function () {
        if ($('#flexRadioDefault2').prop("checked")) {
            $('#onlyteacher').fadeOut(200)
        }
        else {
            $('#onlyteacher').fadeIn(200)
        }
    })
})