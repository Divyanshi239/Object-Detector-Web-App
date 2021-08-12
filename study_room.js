status = "";
img = "";

objects = [];

function preload() {

    img = loadImage("studyRoom.jpg");
}

function setup() 
{
    canvas = createCanvas(600, 500);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
}

function modelLoaded() {
    console.log("Model Is Initialized!!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) 
    {
        console.log(error);
    }
    else 
    {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(img, 0, 0, 600, 500);


    if (status != "") {
        for (i = 0; i < objects.length; i++) 
        {
            document.getElementById("status").innerHTML = "Status: " + objects.length + " Object/s Detected";
            fill("red");
            percent = floor(objects[i].confidence * 100);
            console.log(percent);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 20);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}