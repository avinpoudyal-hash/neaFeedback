var graph_y_pos = 100;
let graph_index = 0;
let graph_index_y = 0;
var graph_x_pos = 100;
var count = 0;
var point_1 = 340;
let graph_Array_for_speed = JSON.parse(localStorage.getItem("SpeedArray"))
let graph_Array_for_y_speed = JSON.parse(localStorage.getItem("y_SpeedArray"))
let tempx = graph_Array_for_speed
let tempy = graph_Array_for_y_speed
var SpeedValue = 800;
var creationCount = 0
let graph_canvas = document.getElementById("GraphCanvas")
let pressed = false
let graph_context = graph_canvas.getContext("2d");
let alphaLevel = 1
var graph_window_height = window.innerHeight;
var graph_window_width = window.innerWidth;
var colourX = 'red'
var colourY = '#00FBFF';
graph_canvas.width = graph_window_width;
graph_canvas.height = graph_window_height;
let pressed2 = false
let pressed3 = false
let pressed4 = false
let pressed5 = false

graph_canvas.style.background = "rgba(255, 255, 255, 1)"

graph_context.strokeStyle = "red";


class graph_newCircle {
    constructor(graph_x_pos, graph_y_pos){   //constructor function to set up the circle
    this.graph_y_pos = graph_y_pos
    this.graph_x_pos = graph_x_pos
    }
    drawNew(graph_context){   //function to draw the circle
        graph_context.beginPath();    //begin drawing
        graph_context.globalAlpha = alphaLevel
        graph_context.arc(this.graph_x_pos, this.graph_y_pos, 4, 0, Math.PI * 2, false)
        graph_context.fillStyle = colourX;
        graph_context.fill();
        graph_context.strokeStyle = colourX;
        graph_context.stroke();   //draws the outline of the circle
        graph_context.closePath();    //ends drawing
    }
    drawing(graph_context){
        while (graph_index < graph_Array_for_speed.length) {
            this.graph_y_pos = 400 - (graph_Array_for_speed[graph_index] * 10);
            graph_index += 1;
            this.graph_x_pos += 4;
        this.drawNew(graph_context);
    }
}
}

class newWall {
    constructor(x_pos, y_pos, width, height){
    this.x_pos = x_pos
    this.y_pos = y_pos
    this.width = width
    this.height = height
    }
    drawNewWall(context){

        context.beginPath();    
        context.rect(this.x_pos, this.y_pos, this.width, this.height);
        context.strokeStyle = "black";
        context.stroke();   
        context.closePath();
    }
}

class xAxis {
    constructor(x_pos, y_pos, width, height){
    this.x_pos = x_pos
    this.y_pos = y_pos
    this.width = width
    this.height = height
    }
    drawXAxis(context){

        context.beginPath();    
        context.rect(this.x_pos, this.y_pos, this.width, this.height);
        context.strokeStyle = "black";
        context.stroke();   
        context.closePath();
    }
    draw_x_points(context){
        this.y_pos = 800
        for (let i = 0; i <= 16; i++){
            this.drawXAxis(context);
            this.y_pos -= 50;
        }
}
}
class graph_newCircle_yaxis {
    constructor(graph_x_pos, graph_y_pos){   //constructor function to set up the circle
    this.graph_y_pos = graph_y_pos
    this.graph_x_pos = graph_x_pos
    }
    drawNew(graph_context){   //function to draw the circle
        graph_context.beginPath();    //begin drawing
        graph_context.globalAlpha = alphaLevel
        graph_context.arc(this.graph_x_pos, this.graph_y_pos, 4, 0, Math.PI * 2, false)
        graph_context.fillStyle = colourY;
        graph_context.fill();
        graph_context.strokeStyle = colourY;
        graph_context.stroke();   //draws the outline of the circle
        graph_context.closePath();    //ends drawing
    }
    drawing(graph_context){
        if (graph_Array_for_y_speed.length == 0) {
            return;
        }
        while (graph_index_y < graph_Array_for_y_speed.length) {
            this.graph_y_pos = 400 - (graph_Array_for_y_speed[graph_index_y] * 10);
            graph_index_y += 1;
            this.graph_x_pos += 4;
        this.drawNew(graph_context);
    }
}
}

let drawWall = new newWall(100, 400, 1370, 1);
let first_points = new newWall (340, 400, 1, 10);
let second_points = new newWall (580, 400, 1, 10);
let third_points = new newWall (820, 400, 1, 10);
let fourth_points = new newWall (1060, 400, 1, 10);
let fifth_points = new newWall (1300, 400, 1, 10);
let yaxis = new newWall (100, 0, 1, 800);
let xaxis = new xAxis (90, 800, 10, 1);
let graph_draw_circle = new graph_newCircle(graph_x_pos, graph_y_pos)    //creates a new circle object
let graph_draw_circle_yaxis = new graph_newCircle_yaxis(graph_x_pos, graph_y_pos)    //creates a new circle object


//No longer animates or moves circle. only draws points on the graph (x/y axis)
function moveCircle() {
        graph_draw_circle_yaxis.drawing(graph_context);
        graph_draw_circle.drawing(graph_context);      
        first_points.drawNewWall(graph_context);
        second_points.drawNewWall(graph_context);
        third_points.drawNewWall(graph_context);
        fourth_points.drawNewWall(graph_context);
        fifth_points.drawNewWall(graph_context);
        yaxis.drawNewWall(graph_context);
        xaxis.draw_x_points(graph_context);
        drawWall.drawNewWall(graph_context);
}

//Draws whatever graphs was recently simulated.
function drawingFunction(){
            graph_index = 0
            graph_index_y = 0
            alphaLevel = 1
            graph_Array_for_speed = tempx
            graph_Array_for_y_speed = tempy
            graph_draw_circle.graph_x_pos = graph_x_pos;
            graph_draw_circle_yaxis.graph_x_pos = graph_x_pos;
            graph_draw_circle_yaxis.drawing(graph_context);
            graph_draw_circle.drawing(graph_context);
}

//Draws passed saved graphs with transparency. 
function drawingSaved() { 
            graph_index = 0
            graph_index_y = 0
            alphaLevel = 0.4
            graph_draw_circle.graph_x_pos = graph_x_pos;
            graph_draw_circle_yaxis.graph_x_pos = graph_x_pos;
            graph_draw_circle_yaxis.drawing(graph_context);
            graph_draw_circle.drawing(graph_context);
}

//colours and draws saved graphs based on which checkboxes are ticked. (1 - 5)
function CheckingGraphs() {
    if (pressed == true) { 
        colourX = '#ff4d00ff'
        colourY = '#005AFF'
        graph_Array_for_speed = JSON.parse(localStorage.getItem("SavedArray1_x"));
        graph_Array_for_y_speed = JSON.parse(localStorage.getItem("SavedArray1_y"));
        drawingSaved()
    }
    if (pressed2 == true) {
        colourX = '#FF006F'
        colourY = '#00ffc8ff'
        graph_Array_for_speed = JSON.parse(localStorage.getItem("SavedArray2_x"));
        graph_Array_for_y_speed = JSON.parse(localStorage.getItem("SavedArray2_y"));
        drawingSaved()
    }
    if (pressed3 == true) {
        colourX = '#ff00bfff'
        colourY = '#009b7fff'
        graph_Array_for_speed = JSON.parse(localStorage.getItem("SavedArray3_x"));
        graph_Array_for_y_speed = JSON.parse(localStorage.getItem("SavedArray3_y"));
        drawingSaved()
    }
    if (pressed4 == true) {
        colourX = '#810025ff'
        colourY = '#0051bbff'
        graph_Array_for_speed = JSON.parse(localStorage.getItem("SavedArray4_x"));
        graph_Array_for_y_speed = JSON.parse(localStorage.getItem("SavedArray4_y"));
        drawingSaved()
    }
    if (pressed5 == true) {
        colourX = '#b80000ff'
        colourY = '#0006a9ff'
        graph_Array_for_speed = JSON.parse(localStorage.getItem("SavedArray5_x"));
        graph_Array_for_y_speed = JSON.parse(localStorage.getItem("SavedArray5_y"));
        drawingSaved()
    }
}
let checkbox1 = document.getElementById("pastGraphs1") // checkbox for saved graph 1
let checkbox2 = document.getElementById("pastGraphs2") // checkbox for saved graph 2
let checkbox3 = document.getElementById("pastGraphs3") // checkbox for saved graph 3
let checkbox4 = document.getElementById("pastGraphs4") // checkbox for saved graph 4
let checkbox5 = document.getElementById("pastGraphs5") // checkbox for saved graph 5

// Checks to see when each checbox has been ticked. COPIED FOR ALL 5 CHECKBOXES WITH MINOR CHANGES
checkbox1.addEventListener('change', () => { 
    if (pressed == false) {
            pressed = true;
            graph_Array_for_speed = JSON.parse(localStorage.getItem("SavedArray1_x"));
            graph_Array_for_y_speed = JSON.parse(localStorage.getItem("SavedArray1_y"));
            colourX = '#ff4d00ff'
            colourY = '#005AFF'
            moveCircle()
            drawingSaved()
    }
    else if (pressed == true) {
            pressed = false
            graph_context.clearRect(0, 0, graph_canvas.width, graph_canvas.height)
            CheckingGraphs()
            colourX = 'red'
            colourY = '#00FBFF';
            drawingFunction()
            moveCircle()
    }
});

checkbox2.addEventListener('change', () => {
    if (pressed2 == false) {
            pressed2 = true;
            graph_Array_for_speed = JSON.parse(localStorage.getItem("SavedArray2_x"));
            graph_Array_for_y_speed = JSON.parse(localStorage.getItem("SavedArray2_y"));
            colourX = '#FF006F'
            colourY = '#00ffc8ff'
            moveCircle()
            drawingSaved()
    }
    else if (pressed2 == true) {
            pressed2 = false
            graph_context.clearRect(0, 0, graph_canvas.width, graph_canvas.height)
            CheckingGraphs()
            colourX = 'red'
            colourY = '#00FBFF';
            drawingFunction()
            moveCircle()
    }
    }
);    
checkbox3.addEventListener('change', () => {
    if (pressed3 == false) {
            pressed3 = true;
            graph_Array_for_speed = JSON.parse(localStorage.getItem("SavedArray3_x"));
            graph_Array_for_y_speed = JSON.parse(localStorage.getItem("SavedArray3_y"));
            colourX = '#ff00bfff'
            colourY = '#009b7fff'
            moveCircle()
            drawingSaved()
    }
    else if (pressed3 == true) {
            pressed3 = false
            graph_context.clearRect(0, 0, graph_canvas.width, graph_canvas.height)
            CheckingGraphs()
            colourX = 'red'
            colourY = '#00FBFF';
            drawingFunction()
            moveCircle()
    }
    }
);   
checkbox4.addEventListener('change', () => {
    if (pressed4 == false) {
            pressed4 = true;
            graph_Array_for_speed = JSON.parse(localStorage.getItem("SavedArray4_x"));
            graph_Array_for_y_speed = JSON.parse(localStorage.getItem("SavedArray4_y"));
            colourX = '#810025ff'
            colourY = '#0051bbff'
            drawingSaved()
            moveCircle()
    }
    else if (pressed4 == true) {
            pressed4 = false
            graph_context.clearRect(0, 0, graph_canvas.width, graph_canvas.height)
            CheckingGraphs()
            colourX = 'red'
            colourY = '#00FBFF';
            drawingFunction()
            moveCircle()
    }
    }
);
checkbox5.addEventListener('change', () => {
    if (pressed5 == false) {
            pressed5 = true;
            graph_Array_for_speed = JSON.parse(localStorage.getItem("SavedArray5_x"));
            graph_Array_for_y_speed = JSON.parse(localStorage.getItem("SavedArray5_y"));
            colourX = '#b80000ff'
            colourY = '#0006a9ff'
            drawingSaved()
    }
    else if (pressed5 == true) {
            pressed5 = false
            graph_context.clearRect(0, 0, graph_canvas.width, graph_canvas.height)
            CheckingGraphs()
            colourX = 'red'
            colourY = '#00FBFF';
            drawingFunction()
            moveCircle()
    }
    }
); 

//initial drawing of the graph walls
drawWall.drawNewWall(graph_context);
first_points.drawNewWall(graph_context);
second_points.drawNewWall(graph_context);
third_points.drawNewWall(graph_context);
fourth_points.drawNewWall(graph_context);
fifth_points.drawNewWall(graph_context);
yaxis.drawNewWall(graph_context);
xaxis.draw_x_points(graph_context);
moveCircle();