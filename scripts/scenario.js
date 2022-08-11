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

var bestWpm = 0
function wpmTick()
{
    var wordCount = 0

    var aBoxes = document.getElementsByClassName('answerBox');

    for (b of aBoxes)
    {
        wordCount+=b.value.split(" ").length-1
    }

    var currWpm = (wordCount/(ellapsed/60)).toFixed(2)
    document.getElementById('wordsPerMin').textContent = currWpm+" mots par minutes"

    if (bestWpm < currWpm){bestWpm = currWpm}
    document.getElementById('bestPerMin').textContent = bestWpm+" [meilleur]"

    if (timer == 0)
    {
        clearInterval(wpmInt)
    }
}

function beginAnswer()
{
    document.getElementById('toAnswer').style.visibility = "visible";
    document.getElementById('startButton').style.visibility = "collapse"
    document.getElementById('stats').style.visibility = "visible"
    

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