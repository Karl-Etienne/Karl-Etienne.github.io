var timer = 300
var ellapsed = -1
var timerInt
var wpmInt
function timerTick()
{
    timer = timer - 1
    ellapsed += 1
    
    var m = Math.floor(timer/60)
    var s = Math.floor(timer%60)
    var paddedS = s < 10 ? "0"+s : s

    document.getElementById('timer').textContent = m+":"+paddedS;

    if (timer == 0)
    {
        alert("Time's up") 
        
        var aBoxes = document.getElementsByClassName('answerBox');
        for (b of aBoxes)
        {
            b.readOnly = true;
        }

        clearInterval(timerInt)
    }
}

function wpmTick()
{
    var wordCount = 0

    var aBoxes = document.getElementsByClassName('answerBox');

    for (b of aBoxes)
    {
        wordCount+=b.value.split(" ").length-1
    }

    document.getElementById('wordsPerMin').textContent = "Mots par minutes: "+(wordCount/(ellapsed/60))

    if (timer == 0)
    {
        clearInterval(wpmInt)
    }
}

function beginAnswer()
{
    document.getElementById('toAnswer').style.visibility = "visible";
    document.getElementById('startButton').style.visibility = "collapse"
    document.getElementById('timer').style.visibility = "visible"
    document.getElementById('wordsPerMin').style.visibility = "visible"
    

    timer = timer + 1
    timerInt = setInterval(timerTick,1000)
    wpmInt = setInterval(wpmTick,100)
    
    var aBoxes = document.getElementsByClassName('answerBox');
    for (b of aBoxes)
    {
        b.readOnly = false;
    }

    toVisibleToggle = false;
}
