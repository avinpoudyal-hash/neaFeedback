var usernameStorage = ''
var passwordStorage = ''
var loggedIn = false

const generateHash = (string) => {
  let hash = 0;
  for (const char of string) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0;
  }
  return hash;
};

const submitButton = document.getElementById('submitLogin');
submitButton.addEventListener('click', async () => {
    username1 = document.getElementById('username').value;
    password1 = document.getElementById('password').value;
    usernameStorage = generateHash(username1)
    passwordStorage = generateHash(password1)
    outcome = await fetch("http://127.0.0.1:5000/check", {
        method:"POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: usernameStorage,
            password: passwordStorage
        })
    })
    data1 = await outcome.json()
    console.log(data1)
    loggedIn = localStorage.getItem("login")
    if (logCount != 0) {
        loggedIn = localStorage.getItem("login")
        if (loggedIn == 'true') {
        alert("You are already logged in!")
    }
    else {
        if (data1 == false) {
            if (logCount == 1) {
                username2 = document.getElementById("username")
                alert("Number of attempts exceeded.")
                logCount -= 1
                localStorage.setItem("LogCount", logCount)

            }
            else { 
                logCount -= 1
                alert("incorrect Username or Password. You have "+ logCount+ " try(ies) left")
                localStorage.setItem("LogCount", logCount)
                loggedIn = false
                localStorage.setItem("login", loggedIn)
            }
        }
        if (data1 == true) { 
            alert("Successfully logged in!")
            loggedIn = true
            localStorage.setItem("login", loggedIn)
        }
        }
    }});

logCount = Number(localStorage.getItem("LogCount"))
if (logCount == 0 && loggedIn == false) {
    username2 = document.getElementById("username")
    username2.remove()
    password2 = document.getElementById("password")
    password2.remove()
    submitButton2 = document.getElementById("submitLogin")
    submitButton2.remove()
    userLabel = document.getElementById("userLabel")
    userLabel.remove()
    passLabel = document.getElementById("passLabel")
    passLabel.remove()
    title = document.getElementById("title")
    title.remove()
    redirect = document.getElementById("redirect")
    redirect.textContent = "Number of attempts exceeded. Create a new account here."
}
logCount = Number(localStorage.getItem("LogCount"))