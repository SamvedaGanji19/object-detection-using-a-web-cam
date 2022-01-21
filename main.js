img="";
Status="";
object=[];
function preload(){
img=loadImage("dog_cat.jpg");
}

function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();

objectDetector=ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML="status: detecting objects";
}

function draw(){
image(video,0,0,380,380);
if(Status!=" "){
    R=random(255);
    G=random(255);
    B=random(255);
    objectDetector.detect(video,gotResults);
    for(i=0;i<object.length;i++){
        document.getElementById("status").innerHTML="status : objects detected";
        document.getElementById("number_object").innerHTML="number_objects : "+object.length;
        fill(R,G,B);
        percent=floor(object[i].confidence*100);
        text(object[i].label +" "+percent+"%",object[i].x+15,object[i].y+15);
        noFill();
        stroke(R,G,B);
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
    }
}
}
function modelLoaded(){
console.log("Model Loaded!");
Status=true;

}
function gotResults(error,results){
    if(error){
     console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}
