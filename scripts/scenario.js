function makePage()
{
    const id = getScen()
    document.title = "Scenario "+id
    document.getElementById("scenarioTitle").textContent = document.title

    document.getElementById("situation").textContent = scenarios[id].situation
    document.getElementById("Q1").textContent = scenarios[id].q1
    document.getElementById("Q2").textContent = scenarios[id].q2
    document.getElementById("Q3").textContent = scenarios[id].q3
}

function getScen()
{
    return sessionStorage.getItem("currentScenario")
}

function beginAnswer()
{
    document.getElementById('toAnswer').style.display = "flex"
    document.getElementById('startButtonCont').style.display = "none"
    document.getElementById('stats').style.visibility = "visible"
    

    timer = timerSet + 1
    timerInt = setInterval(timerTick,1000)
    wpsInt = setInterval(wpsTick,50)
    
    var aBoxes = document.getElementsByClassName('answerBox')
    for (b of aBoxes)
    {
        b.readOnly = false
    }

    toVisibleToggle = false
}


//5 min = 300 sec
const timerSet = 300
const timerTickSet = 1000
const wpsTickSet = 50
var timer
var ellapsed = -1.0
var timerInt
var wpsInt
function timerTick()
{
    timer = timer - 1
    
    const m = Math.floor(timer/60)
    const s = Math.floor(timer%60)
    const paddedS = s < 10 ? "0"+s : s
    document.getElementById('timer').textContent = m+":"+paddedS

    if (timer <= 10)
    {
        document.getElementById('stats').style.backgroundColor = (timer % 2 == 0 ? "rgba(139,0,0,255)" : "rgba(139,0,0,0)")
    }

    if (timer == 0)
    {
        alert("Time's up") 
        
        var aBoxes = document.getElementsByClassName('answerBox')
        for (b of aBoxes)
        {
            b.readOnly = true
        }

        clearInterval(timerInt)
    }
}

var bestWps = 0
let samplesPerwpsTick = timerTickSet/wpsTickSet
var countArr = new Array(samplesPerwpsTick)
for(var i = 0; i < samplesPerwpsTick; i++){countArr[i] = 0}
var oldCount = 0
function wpsTick()
{
    ellapsed += 1.0/samplesPerwpsTick

    var wordCount = 0

    for (b of document.getElementsByClassName('answerBox'))
    {
        //Dafuq Javascript ?!?
        const words = b.value.split(/(\s+)/).filter( function(e) { return e.trim().length > 0 } )
        wordCount += words.length
    }

    let delta = wordCount - oldCount
    if(delta <= 0){delta = 0}
    oldCount = wordCount

    countArr.shift()
    countArr.push(delta)
    
    var currWps=0
    for(var i in countArr){currWps = currWps + countArr[i]}
    document.getElementById('wordsPerSec').textContent = currWps+" MPS"

    if (bestWps < currWps)
    {
        bestWps = currWps
    }

    document.getElementById('bestPerSec').textContent = bestWps+" MPS [best]"
    let estim = ((wordCount/ellapsed)*60).toFixed(2)
    document.getElementById('estimPerMin').textContent =(estim > 0 ? estim : "---") +" MPM [est.]"

    if (timer == 0)
    {
        document.getElementById('wordsPerMin').textContent = (wordCount/timerSet*60)+" MPM"
        
        document.getElementById('resultBanner').style.visibility = "visible"
        document.getElementById('resultBannerBar').style.visibility = "visible"
        document.getElementById('wordsPerMin').style.visibility = "visible"

        clearInterval(wpsInt)
    }
}

function mouseOverEmphasis(button){button.style.color = "red"}
function stopMouseOverEmphasis(button){button.style.color = ""}

const scenarios = {
    99: {
        situation:"Viiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiieux test",
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