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
    const teacherRadio = document.getElementById('flexRadioDefault1');
    const studentRadio = document.getElementById('flexRadioDefault2');
    const educationQualificationInput = document.querySelector('.form.signup input[placeholder="Квалификация"]');
    const teachingExperienceInput = document.querySelector('.form.signup input[placeholder="Опыт преподавания"]');

    // Обработчик события изменения радио-кнопок
    teacherRadio.addEventListener('change', function() {
        if (teacherRadio.checked) {
            educationQualificationInput.disabled = false;
            teachingExperienceInput.disabled = false;
        }
    });

    studentRadio.addEventListener('change', function() {
        if (studentRadio.checked) {
            educationQualificationInput.disabled = true;
            teachingExperienceInput.disabled = true;
        }
    });

    registerButton.addEventListener('click', function() {
        const firstName = document.querySelector('.form.signup input[placeholder="Имя"]').value;
        const lastName = document.querySelector('.form.signup input[placeholder="Фамилия"]').value;
        const phoneNumber = document.querySelector('.form.signup input[placeholder="Телефон"]').value;
        const email = document.querySelector('.form.signup input[placeholder="Электронная почта"]').value;
        const password = document.querySelector('.form.signup input[placeholder="Пароль"]').value;
        const educationQualification = document.querySelector('.form.signup input[placeholder="Квалификация"]').value;
        const teachingExperience = document.querySelector('.form.signup input[placeholder="Опыт преподавания"]').value;

        const userData = {
            first_name: firstName,
            last_name: lastName,
            number: phoneNumber,
            email: email,
            password: password,
        };
        if (teacherRadio.checked) {
            userData.educationQualification = educationQualification;
            userData.teachingExperience = teachingExperience;
        }

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
function loginUser() {
    const email = document.querySelector('.form.login input[placeholder="Логин"]').value;
    const password = document.querySelector('.form.login input[placeholder="Пароль"]').value;

    const url = "http://localhost:8080/api/v1/user";
    const params = {
        email: email,
        password: password
    };
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const fullUrl = url + '?' + queryString;

    fetch(fullUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Пользователь с таким email и паролем не найден');
            }
        })
        .then(data => {
            console.log('Пользователь найден:', data);
            // Если пользователь найден, откройте другое окно
            localStorage.setItem('userInfo', JSON.stringify(data));
            window.location.href = 'events.html'; // Замените 'новая_страница.html' на адрес новой страницы
        })
        .catch(error => {
            console.error('Ошибка:', error.message);
            // Здесь можно вывести сообщение об ошибке пользователю
        });
}

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