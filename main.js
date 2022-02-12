video = "";
status = "";
object = [];

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(600, 450);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 600, 450);

    if(status!=""){
        objectDetector.detect(video, gotResult);

        for(var i=0; i<object.length; i++){
            stroke("#03fc62");
            noFill();
            strokeWeight(3);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            accuracy = floor(object[i].confidence * 100);
            strokeWeight(1);
            text(object[i].label+" "+ accuracy +"% ", object[i].x + 15, object[i].y + 15);
        }
        document.getElementById("num").innerHTML = object.length+" object/s";
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded(){
    console.log("model is loaded");
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    status = true;
    video.loop();
    video.speed(1.5);
    video.volume(1);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results;
    }
}