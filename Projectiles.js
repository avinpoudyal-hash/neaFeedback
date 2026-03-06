var x_pos = 100
var y_pos = 400
var speed = 0
var mass = 10
var elasticity = elasticityValue
var elasticityValue = 0
let restitution = 0.6
let timer = 0
let gravity = 0
let friction = 0
let CircleDrawn = false
friction = 0.3
index = 0
var Array_of_y_speed = []
var Array_of_x_speed = []
var theta = 0
var radians = theta * (Math.PI / 180);
var initial_x_speed = 0;
var initial_y_speed = 0;
var SavedArray1_x = []
var SavedArray1_y = []
var SavedArray2_x = []
var SavedArray2_y = []
var SavedArray3_x = []
var SavedArray3_y = []
var SavedArray4_x = []
var SavedArray4_y = []
var SavedArray5_x = []
var SavedArray5_y = []
var SavedCount = 0
var isPaused = false;

function PauseCheck() {
    if (isPaused == false) {
        cancelAnimationFrame(drawObjects);
        isPaused = true;
        return;
    }
    else if (isPaused == true) {
        isPaused = false;
        drawObjects();
        return;
    }
}

const PauseButton = document.getElementById("Pause");
PauseButton.addEventListener("click", PauseCheck);



//INPUT FUNCTION BELOW

function input(){
    theta = prompt("Enter angle value (in degrees):");
    if (theta == null) {    //user pressed cancel
        alert("cancelled");
        return false;
    }
    verify = Number(theta);     //converts input to number for verification
    if (!Number.isFinite(verify)) {     //checks if input is a valid number
        alert("Invalid value inputted, cancelling...");
        theta = 0;  //sets speed to 0 if invalid
        return false;
    }
    if (verify < 0) {   //checks if input is less than 0
        alert("Under 0 inputted, setting to 0");    //alerts user
        theta = 0;  //sets speed to 0
        radians = theta * (Math.PI / 180);
    }
    if (verify > 90){   //checks if input is greater than 15
        alert("number too high, setting to 90")     //alerts user
        theta = 90;    
        radians = theta * (Math.PI / 180);
    }
    if (verify >= 0 && verify <=90) {   //valid input range
        theta = verify;     //sets speed to inputted value
        radians = theta * (Math.PI / 180);
    }

    speed = prompt("Enter speed value:");
    if (speed == null) {    //user pressed cancel
        alert("cancelled");
        return false;
    }
    verify = Number(speed);     //converts input to number for verification
    if (!Number.isFinite(verify)) {     //checks if input is a valid number
        alert("Invalid value inputted, cancelling...");
        speed = 0;  //sets speed to 0 if invalid
        return false;
    }
    if (verify < 0) {   //checks if input is less than 0
        alert("Under 0 inputted, setting to 0");    //alerts user
        speed = 0;  //sets speed to 0
        radians = theta * (Math.PI / 180);
    }
    if (verify > 50){   //checks if input is greater than 15
        alert("number too high, setting to 50")     //alerts user
        speed = 50;     //sets speed to 15 (max speed)
        initial_x_speed = speed * Math.cos(radians);
        initial_y_speed = speed * Math.sin(radians);
    }
    if (verify >= 0 && verify <=50) {   //valid input range
        speed = verify;     //sets speed to inputted value
        initial_x_speed = speed * Math.cos(radians);
        initial_y_speed = speed * Math.sin(radians);
        if (verify == 0){   //checks if speed is 0
            alert("speed is 0, circle will not move");  //alerts user that the circle will not move
        }
    }

    return true;
}


//DRAWING CODE BELOW

let canvas = document.getElementById("TestScreen")
    // Makes the canvas the screen shown on the "Test.html" file
let context = canvas.getContext("2d");
    // This makes it so that the object can be drawn, as it is a 2d surface

var window_height = window.innerHeight;
var window_width = window.innerWidth;
    // This sets the width and height of the window

canvas.width = window_width;
canvas.height = window_height;
    // This code makes the size of the canvas equal to the size of the window 

canvas.style.background = "rgba(255, 255, 255, 1)"
    // Sets the colout of the canvas

context.strokeStyle = "red";
context.fillStyle = "red";
context.fillRect(0, 655, canvas.width, canvas.height - 655); // Draws the ground

class newCircle {
    constructor(x_pos, y_pos, speed, elasticity, gravity, mass, friction, restitution){   //constructor function to set up the circle
    this.x_pos = x_pos
    this.y_pos = y_pos
    this.speed = speed
    this.elasticity = elasticity
    this.gravity = gravity
    this.mass = mass
    this.friction = friction
    this.restitution = restitution
    this.radians 
    }
    drawNew(context){   //function to draw the circle

        context.beginPath();    //begin drawing
        context.arc(this.x_pos, this.y_pos, 30, 0, Math.PI * 2, false)  //draws circle at x_pos, y_pos with radius 50
        context.fillStyle = 'red';
        context.fill();
        context.strokeStyle = 'black'
        context.stroke();   //draws the outline of the circle
        context.closePath();    //ends drawing
    }
    movement(context){  //function to move the circle
        if (this.x_pos + 30 >= canvas.width) { 
            this.speed = -this.speed * this.elasticity;
            this.x_pos = canvas.width - 31;
        }
        if (this.x_pos - 30 <= 0) { 
            this.speed = -this.speed * this.elasticity;
            this.x_pos = 31;
        }
        if (this.y_pos + 30 >= 655) {
            this.gravity = -this.gravity * this.elasticity;
            this.y_pos = 655 - 29;
        }
        if (this.y_pos - 30 <= 0) {
            this.gravity = -this.gravity * this.elasticity;
            this.y_pos = 31;
        }

        this.x_pos += this.speed;
        this.y_pos += this.gravity;
        this.gravity = this.gravity + 0.1633333
        if (this.y_pos + 30 >= 655) {
            if (this.speed < 0) {
                let speedDecrease = this.friction * 9.8 * (this.restitution) / 60
                this.speed += speedDecrease
            }
            else {
                let speedDecrease = this.friction * 9.8 * (this.restitution) / 60
                this.speed -= speedDecrease
            }
        }
        if (this.speed > -0.05 && this.speed < 0.05) {
            this.speed = 0
        }
        if (this.gravity > -0.17 && this.gravity < 0.17 && this.y_pos + 30 >= 655) {
            this.gravity = 0
        }
        Array_of_x_speed[index] = this.speed;
        Array_of_y_speed[index] = this.gravity;
        index += 1;
        this.drawNew(context);      //draws the circle at the new position
        context.fillRect(0, 655, canvas.width, canvas.height - 655); // Draws the ground
        
    }
}

class newWall {
    constructor(x_pos, y_pos, width, height){   //constructor function to set up the wall
    this.x_pos = x_pos
    this.y_pos = y_pos
    this.width = width
    this.height = height
    }
    drawNewWall(context){   //function to draw the wall

        context.beginPath();    //begin drawing
        context.rect(this.x_pos, this.y_pos, this.width, this.height);  //draws rectangle at x_pos, y_pos with width and height
        context.strokeStyle = "black";
        context.stroke();   //draws the outline of the rectangle
        context.fillStyle = "purple";
        context.fill();
        context.closePath();    //ends drawing
    }
}

let draw_circle = new newCircle(x_pos, y_pos, speed, elasticity, gravity, mass, friction, restitution)    //creates a new circle object


function drawObjects() {     //function to animate the circle
    if (isPaused) {
        return;
    }
    else {
        requestAnimationFrame(drawObjects);      //calls drawObjects again for the next frame
        requestAnimationFrame(elasticityUpdate)
        context.clearRect(0, 0, canvas.width, canvas.height);   //clears the canvas for the next frame
        draw_circle.movement(context);      // calls the movement function to update position and draw the circle
        const speedDisplay = document.getElementById("SpeedValue");
        speedDisplay.textContent = draw_circle.speed.toFixed(2);
        const FallingSpeed = document.getElementById("YSpeedValue");
        FallingSpeed.textContent = draw_circle.gravity.toFixed(2);
        const ElasticityTag = document.getElementById("ElasticityValue");
        ElasticityTag.textContent = elasticity
        //drawWall.drawNewWall(context);
    }
}

const DrawButton = document.getElementById("Draw");     //Gets the Draw button from the HTML
DrawButton.addEventListener("click", () => {  //Checks when the button is clicked
    if (CircleDrawn == false){
        if (input() == true){       //Calls the input function to get speed from user
            elasticityValue = document.getElementById("ElasticitySlider").value
            draw_circle.elasticity = elasticityValue
            draw_circle.speed = initial_x_speed;      //updates the circle's speed with the user input
            draw_circle.gravity = -initial_y_speed;  //updates the circle's gravity with the user input
            alert("Initial X Speed: " + initial_x_speed.toFixed(2) + "\nInitial Y Speed: " + (-initial_y_speed).toFixed(2));
            drawObjects();       //Calls the drawObjects function to start the animation
            CircleDrawn = true;
        }
        }
    }
);

const SignOut = document.getElementById("signOut");
SignOut.addEventListener("click", () => {
    loggedInProj = localStorage.getItem("login")
    if (loggedInProj == 'true') {
        localStorage.setItem("login", false);
        localStorage.setItem("LogCount", 3);
        alert("You have been logged out.");
    }
    else {
        alert("You are not logged in.");
    }
});

function elasticityUpdate() {
        requestAnimationFrame(elasticityUpdate)
        elasticityValue = document.getElementById("ElasticitySlider").value
        const ElasticityTag = document.getElementById("ElasticityValue");
        ElasticityTag.textContent = elasticityValue
}
const GraphButton = document.getElementById("GraphButton");
GraphButton.addEventListener("click", () => {
    localStorage.setItem("SpeedArray", JSON.stringify(Array_of_x_speed));
    localStorage.setItem("y_SpeedArray", JSON.stringify(Array_of_y_speed));
    SavedCount = Number(localStorage.getItem("SavedCount", (SavedCount)))
    let saving = confirm("Would you like to save the graph of this simulation under Saved Values "+ (SavedCount + 1))
    if (saving) {
        if (SavedCount == 0) {
            localStorage.setItem("SavedArray1_x", JSON.stringify(Array_of_x_speed))
            localStorage.setItem("SavedArray1_y", JSON.stringify(Array_of_y_speed))
            SavedCount += 1
            SavedCount = Number(localStorage.setItem("SavedCount", (SavedCount)))
        }
        else if (SavedCount == 1) {
            localStorage.setItem("SavedArray2_x", JSON.stringify(Array_of_x_speed))
            localStorage.setItem("SavedArray2_y", JSON.stringify(Array_of_y_speed))
            SavedCount += 1
            SavedCount = Number(localStorage.setItem("SavedCount", (SavedCount)))
        }
        else if (SavedCount == 2) {
            localStorage.setItem("SavedArray3_x", JSON.stringify(Array_of_x_speed))
            localStorage.setItem("SavedArray3_y", JSON.stringify(Array_of_y_speed))
            SavedCount += 1
            SavedCount = Number(localStorage.setItem("SavedCount", (SavedCount)))
        }
        else if (SavedCount == 3) {
            localStorage.setItem("SavedArray4_x", JSON.stringify(Array_of_x_speed))
            localStorage.setItem("SavedArray4_y", JSON.stringify(Array_of_y_speed))
            SavedCount += 1
            SavedCount = Number(localStorage.setItem("SavedCount", (SavedCount)))
        }
        else if (SavedCount == 4) {
            localStorage.setItem("SavedArray5_x", JSON.stringify(Array_of_x_speed))
            localStorage.setItem("SavedArray5_y", JSON.stringify(Array_of_y_speed))
            SavedCount = 0
            SavedCount = Number(localStorage.setItem("SavedCount", (SavedCount)))
        }
        else {
            
        }
    }
});
elasticityUpdate();