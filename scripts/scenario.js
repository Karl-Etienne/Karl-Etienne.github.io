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

    document.getElementById('lastPerMin').textContent = "-.--"+" MPM"
    document.getElementById('bestPerMin').textContent = "-.--"+" MPM [best]"
    document.getElementById('meanPerMin').textContent = "-.--"+" MPM [moy]"
    document.getElementById('stats').style.visibility = "visible"
    

    timer = timerSet
    timerInt = setInterval(timerTick,timerTickSet)
    wpmInt = setInterval(wpmTick,wpmTickSet)
    
    var aBoxes = document.getElementsByClassName('answerBox')
    for (b of aBoxes)
    {
        b.readOnly = false
    }

    toVisibleToggle = false
}


//5 min = 300 sec
const timerSet = 300
const MILLISEC_IN_SEC = 1000
const timerTickInSec = 1
const timerTickSet = timerTickInSec*MILLISEC_IN_SEC
const wpmTickInSec = 5
const wpmTickSet = wpmTickInSec*MILLISEC_IN_SEC
var timer
var ellapsed = -1.0
var timerInt
var wpmInt
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
        wpmInt = setInterval(wpmTick,1)
    }
}

var bestPerMin = 0
var periodsArr = new Array()
const average = arr => arr.reduce((a, b) => a + b) / arr.length;
var oldCount = 0
function wpmTick()
{
    var wordCount = 0

    for (b of document.getElementsByClassName('answerBox'))
    {
        //Dafuq Javascript ?!?
        const words = b.value.split(/(\s+)/).filter( function(e) { return e.trim().length > 0 } )
        wordCount += words.length
    }

    if (timer <= 0)
    {
        document.getElementById('wordsPerMin').textContent = (wordCount/timerSet*60).toFixed(0)+" MPM"
        
        document.getElementById('resultBanner').style.visibility = "visible"
        document.getElementById('resultBannerBar').style.visibility = "visible"
        document.getElementById('wordsPerMin').style.visibility = "visible"

        clearInterval(wpmInt)
        return
    }

    let delta = wordCount - oldCount
    oldCount = wordCount

    var lastPerMin = (delta/wpmTickInSec*60)
    periodsArr.push(lastPerMin)
    
    document.getElementById('lastPerMin').textContent = lastPerMin+" MPM"

    if (bestPerMin < lastPerMin)
    {
        bestPerMin = lastPerMin
    }

    document.getElementById('bestPerMin').textContent = bestPerMin+" MPM [best]"

    document.getElementById('meanPerMin').textContent = average(periodsArr).toFixed(0) +" MPM [moy]"
}

function mouseOverEmphasis(button){button.style.color = "red"}
function stopMouseOverEmphasis(button){button.style.color = ""}

const scenarios = {
    99: {
        situation:"Test boboche",
        q1: "Blablabla Mr.Freeman",
        q2: "Never gonna give you up, never gonna...?",
        q3: "You ever wonder what the bottom of an avatar shoe looks like?"
        },
    0: {
        situation:"Problème simple pour vous acclimater au site! Vous avez 5 min pour répondre à 3 questions.",
        q1: "Vrai ou faux? Un vol peut être justifié.",
        q2: "Donnez-vous de la monnaie aux sans-abris que vous croisez dans la rue? Pourquoi?",
        q3: "Dans quelle(s) situation(s) pouvons-nous dire que \"la fin justifie les moyens?\""
        }
    }