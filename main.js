var song ="";
var left_wrist_x =0;
var left_wrist_y =0;
var right_wrist_x =0;
var right_wrist_y =0;

function setup(){
    canvas = createCanvas(400, 300);
    canvas.position(275, 260);


    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on("pose", gotposes);
}

function draw(){
    image(video, 0, 0, 400, 300);
    fill("#98AFC7");
    stroke("#98AFC7");
    circle(right_wrist_x, right_wrist_y, 20);

    if(right_wrist_y>0 && right_wrist_y<=100){
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    }

    else if(right_wrist_y>100 && right_wrist_y<=100){
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(1);
    }

    else if(right_wrist_y>200 && right_wrist_y<=300){
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(1.5);
    }
    
    else if(right_wrist_y>300 && right_wrist_y<=400){
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(2);
    }

    else if(right_wrist_y>400 && right_wrist_y<=500){
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(2.5);
    }
    if(scoreleftwrist>0.2){
    circle(left_wrist_x, left_wrist_y, 20);
    inNumberleft_wrist_y = number(left_wrist_y);
    remove_decimals = floor(inNumberleft_wrist_y);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume is " + volume;
    song.setVolume(volume);
}
}

function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setvolume(1);
    song.rate(1);
}

function modelloaded(){
    console.log("poseNet is initialized");
}

function gotposes(results){
if(results.length>0){
    console.log(results);
    scoreleftwrist = results[0].pose.keypoints[9].score;
    console.log("scoreleftwrist = " + scoreleftwrist);


    left_wrist_x = results[0].pose.leftWrist.x;
    left_wrist_y = results[0].pose.leftWrist.y;
    console.log("left wrist x " + left_wrist_x + "left wrist y " + left_wrist_y);

    right_wrist_x = results[0].pose.rightWrist.x;
    right_wrist_y = results[0].pose.rightWrist.y;
    console.log("right wrist x " + right_wrist_x + "right wrist y " + right_wrist_y);
}



}