var usernameStorage = ''
var passwordStorage = ''

const generateHash = (string) => {
  let hash = 0;
  for (const char of string) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0;
  }
  return hash;
};


const submitButton = document.getElementById('submit_button');
submitButton.addEventListener('click', () => {
    username1 = document.getElementById('new_username').value;
    password1 = document.getElementById('new_password').value;
    conf_password1 = document.getElementById('conf_password').value;
    if (password1 !== conf_password1) {
        alert('Passwords do not match. Please try again.');
        return;
    }
    else if (password1.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }
    else if (username1 == '' || password1 == '' || conf_password1 == '') {
        alert('All fields are required.');
        return;
    }
    else {
        usernameStorage = generateHash(username1)
        passwordStorage = generateHash(password1)
        fetch("http://127.0.0.1:5000/save", {
            method:"POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: usernameStorage,
                password: passwordStorage
            })
        });
        alert("Successfully registered!")
        loginCount = 3
        localStorage.setItem("LogCount", loginCount)
        window.location.href = "login.html"

    }
})
