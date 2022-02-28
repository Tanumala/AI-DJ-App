function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,modelLoaded);

    posenet.on("pose",gotPoses);

}

function modelLoaded()
{
    console.log("Model is loaded");
}

function draw()
{
    image(video,0,0,600,500);
    fill("#ebe336");
    stroke("#f53b12");
    if(score_left_wrist > 0.2)
    {
    circle(left_wristX,left_wristY,20);
    number = Number(left_wristX);
    remove_decimal = floor(number);
    volume = remove_decimal/500;
    song.setVolume(volume);
    document.getElementById("volume").innerHTML = " Volume = " + volume;
    }
    if(score_right_wrist > 0.2)
    {
    circle(right_wristX,right_wristY,20);
   if(right_wristY > 0 && right_wristY <= 100)
   {
       document.getElementById("speed").innerHTML = "Speed = " + "0.5x";
       song.rate(0.5);
   }
   else if(right_wristY > 100 && right_wristY <= 200)
   {
       document.getElementById("speed").innerHTML = "Speed = " + "1x";
       song.rate(1);
   }
   else if(right_wristY > 200 && right_wristY <= 300)
   {
       document.getElementById("speed").innerHTML = "Speed = " + "1.5x";
       song.rate(1.5);
   }
   else if (right_wristY > 300 && right_wristY <= 400)
   {
       document.getElementById("speed").innerHTML = "Speed = " + "2x";
       song.rate(2);
   }
   else if(right_wristY > 400 && right_wristY <= 500)
   {
       document.getElementById("speed").innerHTML = "Speed = " + "2.5x";
       song.rate(2.5);
   }
}
}

song = "";
left_wristX = 0;
left_wristY = 0;
right_wristX = 0;
right_wristY = 0;
score_left_wrist = 0;
score_right_wrist = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(result)
{
    if(result.length > 0)
    {
        console.log(result);
        score_left_wrist = result[0].pose.keypoints[9].score;
        left_wristX = result[0].pose.leftWrist.x;
        left_wristY = result[0].pose.leftWrist.y;

        right_wristX = result[0].pose.rightWrist.x;
        right_wristY = result[0].pose.rightWrist.y;

        console.log("left wrist x = "+ left_wristX  + " left wrist y = "+ left_wristY );
        console.log("right wrist x = "+ right_wristX + " right wrist y = "+ right_wristY);
        console.log(score_left_wrist);

        score_right_wrist = result[0].pose.keypoints[10].score;
        console.log(score_right_wrist);
    }
}

