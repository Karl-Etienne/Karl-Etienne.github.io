const timerSet = 300
var timer
var ellapsed = -1.0
var timerInt
var wpsInt
function timerTick()
{
    timer = timer - 1
    
    var m = Math.floor(timer/60)
    var s = Math.floor(timer%60)
    var paddedS = s < 10 ? "0"+s : s

    document.getElementById('timer').textContent = m+":"+paddedS;


    if (timer <= 10)
    {
        if (timer % 2 != 0)
        {
            document.getElementById('stats').style.backgroundColor = "rgba(139,0,0,0)";
        }
        else
        {
            document.getElementById('stats').style.backgroundColor = "rgba(139,0,0,255)";
        }
    }

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

var bestWps = 0
let samplesPerXSeconds = 20
var countArr = new Array(samplesPerXSeconds)
for(var i = 0; i < samplesPerXSeconds; i++){countArr[i] = 0}
var oldCount = 0
function wpsTick()
{
    ellapsed += 1.0/samplesPerXSeconds

    var wordCount = 0

    var aBoxes = document.getElementsByClassName('answerBox');

    for (b of aBoxes)
    {
        //Dafuq Javascript ?!?
        const words = b.value.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
        wordCount += words.length
    }

    let delta = wordCount - oldCount
    if(delta <= 0){delta = 0}
    oldCount = wordCount

    countArr.shift()
    countArr.push(delta)
    var sum=0;
    for(var i in countArr){sum = sum + countArr[i]}
    
    var currWps = sum
    document.getElementById('wordsPerSec').textContent = currWps+" MPS"

    if (bestWps < currWps)
    {
        bestWps = currWps
    }
    document.getElementById('bestPerSec').textContent = bestWps+" MPS[meilleur]"
    let estim = ((wordCount/ellapsed)*60).toFixed(2);
    document.getElementById('estimPerMin').textContent =(estim > 0 ? estim : "---") +" MPM[estimé]"

    if (timer == 0)
    {
        document.getElementById('wordsPerMin').textContent = (wordCount/timerSet*60)+" mots par minutes"
        
        document.getElementById('resultBanner').style.visibility = "visible";
        document.getElementById('resultBannerBar').style.visibility = "visible";
        document.getElementById('wordsPerMin').style.visibility = "visible";

        clearInterval(wpsInt)
        console.log(ellapsed)
    }
}

function beginAnswer()
{
    document.getElementById('toAnswer').style.visibility = "visible";
    document.getElementById('startButton').style.visibility = "collapse"
    document.getElementById('stats').style.visibility = "visible"
    

    timer = timerSet + 1
    timerInt = setInterval(timerTick,1000)
    wpsInt = setInterval(wpsTick,50)
    
    var aBoxes = document.getElementsByClassName('answerBox');
    for (b of aBoxes)
    {
        b.readOnly = false;
    }

    toVisibleToggle = false;
}

function getScen()
{
    return sessionStorage.getItem("currentScenario");
}
function makePage()
{
    const id = getScen();
    document.title = "Scenario "+id;

    document.getElementById("situation").textContent = scenarios[id].situation;
    document.getElementById("Q1").textContent = scenarios[id].q1;
    document.getElementById("Q2").textContent = scenarios[id].q2;
    document.getElementById("Q3").textContent = scenarios[id].q3;
}

const scenarios = {
    99: {
        situation:"Vieux test",
        q1: "Blablabla Mr.Freeman",
        q2: "Blablabla again, Mr.Freeman",
        q3: "Blablabla one last time... Mr.Freeman"
        },
    0: {
        situation:"Ceci est un problème exemple\
        qui peut servir à mieux tester\
        comment fonctionne le site web... Have fun!",
        q1: "Décrivez une situation où vous avez fait preuve de créativité",
        q2: "Quel est votre mot favoris dans la dictionnaire? Pourquoi?",
        q3: "Si vous pouviez coucher avec une amie, le feriez-vous? Expliquez pourquoi c'est une décision épaisse :D"
        }
    }