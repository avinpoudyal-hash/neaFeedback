var x_pos = 1
var y_pos = 200
var speed = 0
var mass = 10
let restitution = 0.6
let timer = 0
let gravity = 0
let friction = 0
let SquareDrawn = false
friction = ((mass * 9.8) * restitution) / 60
let index = 0
var Array_of_y_speed = []
var Array_of_x_speed = []
var theta = 60
var radians = 0
var initial_x_speed = 0;
var initial_y_speed = 0;
var LineC = 0
var LineX = 0
var LineM = 0
let gravityStorage = 0
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
var y_speed = 0

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



function input(){
    theta = prompt("Enter angle value (in degrees):");
    if (theta == null) { 
        alert("cancelled");
        return false;
    }
    verify = Number(theta);    
    if (!Number.isFinite(verify)) {     //checks if input is a valid number
        alert("Invalid value inputted, setting to 0");
        theta = 0;  //sets theta to 0 if invalid
        return false;
    }
    if (verify < 0) {   
        alert("Under 0 inputted, setting to 0");    //alerts user
        theta = 0;  //sets theta to 0
    }
    if (verify > 89){   
        alert("number too high, setting to 89")     //alerts user
        theta = 89;     
    }
    if (verify >= 0 && verify <=90) {   
        theta = verify;     
        radians = theta * (Math.PI / 180);
    }

    speed = prompt("Enter speed value:");
    if (speed == null) {    //user pressed cancel
        alert("cancelled");
        return false;
    }
    verify = Number(speed);     //converts input to number for verification
    if (!Number.isFinite(verify)) {     //checks if input is a valid number
        alert("Invalid value inputted, setting to 0");
        speed = 0;  //sets speed to 0 if invalid
        return false;
    }
    if (verify < -15) {   //checks if input is less than 0
        alert("Under -15 inputted, setting to -15");    //alerts user
        speed = -15;  //sets speed to -10
        radians = theta * (Math.PI / 180);
        initial_x_speed = speed * Math.cos(radians);
    }
    if (verify > 15){   //checks if input is greater than 15
       alert("number too high, setting to 15")     //alerts user
       speed = 15;     //sets speed to 15 (max speed)
       radians = theta * (Math.PI / 180);
       initial_x_speed = speed * Math.cos(radians)
       initial_y_speed = speed * Math.sin(radians)
    }
    if (verify >= -15 && verify <=15) {   //valid input range
        speed = verify;     //sets speed to inputted value
        initial_x_speed = speed * Math.cos(radians);
        initial_y_speed = speed * Math.sin(radians)
        if (verify == 0){   //checks if speed is 0
            alert("speed is 0, Square will not move");  //alerts user that the Square will not move
        }
    }

    return true;
}

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

function LineEquation(){
    let LineX1 = drawTriangle.point1_x;
    let LineY1 = drawTriangle.point1_y;
    let LineX2 = drawTriangle.point2_x;
    let LineY2 = drawTriangle.point2_y;
    console.log("line x1", LineX1, "line x2:", LineX2, "line y1:", LineY1, "line y2:", LineY2)
    LineM = -((LineY2 - LineY1) / (LineX2 - LineX1)) // (655 - 200) / (735 - 0) = (455 / 735) (?????)
    return LineM
}

class newSquare {
    constructor(x_pos, y_pos, speed, gravity, mass, friction, restitution, radians, LineC, LineM, LineX, gravityStorage, y_speed){   //constructor function to set up the Square
    this.x_pos = x_pos
    this.y_pos = y_pos
    this.speed = speed
    this.gravity = gravity
    this.mass = mass
    this.friction = friction
    this.restitution = restitution
    this.radians = radians
    this.LineC = LineC
    this.LineX = LineX
    this.LineM = LineM
    this.gravityStorage = gravityStorage
    this.y_speed = y_speed
    }
    drawNew(context){   //function to draw the Square
        context.save()
        context.translate(this.x_pos + 30, this.y_pos + 30)
        context.rotate(this.radians)
        context.translate(-(this.x_pos + 30), -(this.y_pos + 30))
        context.beginPath();    //begin drawing
        context.rect(this.x_pos, this.y_pos, 60, 60)  //draws Square at x_pos, y_pos with width 60
        context.fillStyle = 'red';
        context.fill();
        context.stroke();   //draws the outline of the Square
        context.closePath();    //ends drawing 
        context.restore()
    }
    movement(context){  //function to move the Square
        // ANYTHING RELATED TO MOTION GOES HERE
        // IF STATEMENT CONTAINS 'LINEC/X/Y/M' TO GET THE LINE EQUATION OF THE SLOPE
        let LineX1 = drawTriangle.point1_x;
        let LineY1 = drawTriangle.point1_y;
        let LineX2 = drawTriangle.point2_x;
        let LineY2 = drawTriangle.point2_y;
        this.LineC = 655 - (LineX2 * (Math.tan(this.radians)))
        this.LineM = LineM = -((LineY2 - LineY1) / (LineX2 - LineX1))
        let SlopeYValue = (-this.LineM * this.x_pos) +this.LineC //gets the y value of the slope at the Square's current x position
        this.y_pos += this.gravity;

        let nextSlopeY = (-this.LineM * this.x_pos) + this.LineC; //gets the y value of the slope at the Square's next x position
                                                                  //USED TO CHECK IF NEXT POSITIONS IS 'INSIDE' SLOPE
        // COLLISION DETECTION
        if (SlopeYValue > this.y_pos + 55) {
            this.gravity += 0.1633333333;
            Array_of_y_speed[index] = this.gravity;
            index += 1;
        }
        if (SlopeYValue <= this.y_pos + 55) {
            this.y_pos = nextSlopeY - 55;
            this.gravity = 0
            if (this.speed > 0.05){
                let speedDecrease = (9.8 * (Math.sin(this.radians) - (this.restitution) * Math.cos(this.radians))) / 60
                this.speed += speedDecrease
                this.x_pos += this.speed
                this.gravity = 10000 //Sets gravity extremely high, to 'stick' square to slope. No effect to calculations
            }
            else if (this.speed < -0.05) {
                let speedDecrease = (9.8  *(Math.sin(this.radians) + (this.restitution) * Math.cos(this.radians))) / 60
                this.speed += speedDecrease
                this.x_pos += this.speed
            }
            else if (this.speed < 0.05 && this.speed > -0.05){
                let speedDecrease = (9.8 * (Math.sin(this.radians) - (this.restitution) * Math.cos(this.radians))) / 60

                if (this.radians > Math.atan(this.restitution) || this.restitution == 0) {
                    this.speed += speedDecrease
                    this.x_pos += this.speed
                }
                else {
                    this.speed = 0
                }
            }
            this.y_speed = (this.speed * Math.tan(this.radians));
            Array_of_y_speed[index] = this.y_speed;
            Array_of_x_speed[index] = this.speed;
            index += 1;
        }
        this.drawNew(context);      //draws the Square at the new position
        context.fillStyle = 'red'
        context.fillRect(0, 655, canvas.width, canvas.height - 655); // Draws the ground
    }
}
class newTriangle {
    constructor(point1_x, point1_y, point2_x, point2_y, point3_x, point3_y, point4_x, point4_y, radians){
        this.point1_x = point1_x
        this.point1_y = point1_y
        this.point2_x = point2_x
        this.point2_y = point2_y
        this.point3_x = point3_x
        this.point3_y = point3_y
        this.point4_x = point4_x
        this.point4_y = point4_y
        this.radians = radians

    }
    updatePoints() {
        this.point1_y = 655 - (this.point2_x * (Math.tan(this.radians)))
    }

    drawNewTriangle(context){ //POINT 2 X AND Y ARE CONSTANT NEVER CHANGE THEM!!!!
        //4 points used here to make sure a triangle that goes off the screen is correctly filled.
        this.updatePoints();
        context.beginPath()
        context.strokeStyle = "black"
        context.moveTo(this.point1_x, this.point1_y)
        context.lineTo(this.point2_x, this.point2_y)
        context.lineTo(this.point3_x, this.point3_y)
        context.lineTo(this.point4_x, this.point4_y)
        context.lineTo(this.point1_x, this.point1_y)
        context.stroke()
        context.fillStyle = "yellow"
        context.fill()
        context.closePath()
    }
    drawNewBounds(context){
        context.beginPath()
        context.strokeStyle = "black"
        context.moveTo(this.point1_x, this.point1_y)
        context.lineTo(this.point2_x, this.point2_y)
        context.lineTo(this.point3_x, this.point3_y)
        context.lineTo(this.point4_x, this.point4_y)
        context.lineTo(this.point1_x, this.point1_y)
        context.stroke()
        context.closePath()
    }
}

let draw_square = new newSquare(x_pos, y_pos, speed, gravity, mass, friction, restitution, radians, LineC, LineX, LineM, gravityStorage, y_speed)    //creates a new Square object
let drawTriangle = new newTriangle(0, 200, 2 * canvas.width/3, 655, 0, 655, 0, 0, radians)
let drawBounds = new newTriangle(0,0, canvas.width, 0, canvas.width, 655, 0, 655)

function drawObjects() {     //function to animate the Square
    if (isPaused) {
        return;
    }
    else {
        requestAnimationFrame(drawObjects);      //calls drawObjects again for the next frame
        requestAnimationFrame(frictionUpdate)
        context.clearRect(0, 0, canvas.width, canvas.height);   //clears the canvas for the next frame
        draw_square.movement(context);      // calls the movement function to update position and draw the square
        drawTriangle.drawNewTriangle(context);
        drawBounds.drawNewBounds(context)
        const speedDisplay = document.getElementById("SpeedValue");
        speedDisplay.textContent = draw_square.speed.toFixed(2);
        const YspeedDisplay = document.getElementById("YSpeedValue");
        YspeedDisplay.textContent = draw_square.y_speed.toFixed(2);
    }
}

const DrawButton = document.getElementById("Draw");     //Gets the Draw button from the HTML
DrawButton.addEventListener("click", () => {  //Checks when the button is clicked
    if (SquareDrawn == false){
        if (input() == true){       //Calls the input function to get speed from user
            let startX = canvas.width / 3;
            frictionValue = document.getElementById("FrictionSlider").value
            draw_square.speed = speed 
            draw_square.gravity = initial_y_speed;
            drawTriangle.radians = radians
            draw_square.radians = radians
            drawTriangle.updatePoints();
            let LineX1 = drawTriangle.point1_x;
            let LineY1 = drawTriangle.point1_y;
            let LineX2 = drawTriangle.point2_x;
            let LineY2 = drawTriangle.point2_y;

            let LineM = (LineY2 - LineY1) / (LineX2 - LineX1);
            let LineC = LineY1 - (LineM * LineX1);
            draw_square.y_pos = (LineM * startX + LineC) - 50;
            draw_square.x_pos = startX;
            draw_square.gravity = 0;
            draw_square.gravityStorage = initial_y_speed
            draw_square.restitution = frictionValue
            alert("Initial X Speed: " + initial_x_speed.toFixed(2) + "  Initial Y Speed: " + (-initial_y_speed).toFixed(2));
            drawObjects();       //Calls the drawObjects function to start the animation
            SquareDrawn = true;
        }
        }
    }
);

function frictionUpdate() {
        requestAnimationFrame(frictionUpdate)
        frictionValue = document.getElementById("FrictionSlider").value
        const FrictionTag = document.getElementById("FrictionValue");
        FrictionTag.textContent = frictionValue
}


const GraphButton = document.getElementById("GraphButton");
GraphButton.addEventListener("click", () => {
    localStorage.setItem("SpeedArray", JSON.stringify(Array_of_x_speed));
    localStorage.setItem("y_SpeedArray", JSON.stringify(Array_of_y_speed));
});
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

// All of the below code is for saving graphs to "SavedArray1-5_x/y"
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
drawTriangle.drawNewTriangle(context);
drawBounds.drawNewBounds(context)
draw_square.drawNew(context)
frictionUpdate()