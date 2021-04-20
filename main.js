var prediction1 = "YO"
var prediction2 = "WASSUP"
Webcam.set(
    {
        width: 350,
        height: 300,
        image_format: 'jpeg',
        jpeg_quality: 90
    })
camera = document.getElementById("camera")
Webcam.attach('#camera')

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id = "result_photo" src = "' + data_uri + '"</img>'
    })
}

console.log("ml5 version:", ml5.version)
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/B2ar7Ka4I/model.json", modelLoaded)

function modelLoaded() {
    console.log("YASS MODEL LOADED PEPALS")
}

function check() {
    speak()
}

function speak() {
    synth = window.speechSynthesis
    speakData1 = "First prediction is " + prediction1
    speakData2 = "Second prediction is " + prediction2
    utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2)
    synth.speak(utterThis)
}

function check() {
    img = document.getElementById("result_photo")
    classifier.classify(img, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }

    else {
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML = results[0].label
        document.getElementById("result_emotion_name2").innerHTML = results[1].label

        prediction1 = results[0].label
        prediction2 = results[1].label
        if (prediction1 == "Nice") {
            document.getElementById("emoji_prediction1").innerHTML = "&#128545;"
        }
        if (prediction1 == "Thumbs Up") {
            document.getElementById("emoji_prediction1").innerHTML = "&#128546;"
        }
        if (prediction1 == "Peace") {
            document.getElementById("emoji_prediction1").innerHTML = "&#128512;"
        }




        if (prediction2 == "Nice") {
            document.getElementById("emoji_prediction2").innerHTML = "&#128545;"
        }
        if (prediction2 == "Thumbs Up") {
            document.getElementById("emoji_prediction2").innerHTML = "&#128546;"
        }
        if (prediction2 == "Peace") {
            document.getElementById("emoji_prediction2").innerHTML = "&#128512;"
        }


        speak();
    }
}