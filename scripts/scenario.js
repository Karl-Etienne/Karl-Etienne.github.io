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
    1: {
        situation:"Vous êtes dans un bar avec 2 amis. La télévision affiche \
        aux nouvelles que la police recherche activement les personnes responsables \
        d'avoir déboulonné une statue d'un politicien historique perçu \
        comme raciste. Votre premier ami s'exclame: \"Bienfait! J'aurais aimé y être pour participer!\" \
        Le second semble surpris et répond sur un ton défensif: \"Es-tu sérieux? C'est un geste \
        de pure violence et un grand manque de respect à notre nation, à notre histoire!\"",
        q1: "Avez-vous déjà été témoin de racisme autour de vous? Comment pouvons-nous éliminer \
         ce type de problème dans le milieu de la santé selon vous?",
        q2: "Vos amis vous demandent votre opinion sur le sujet. À qui donnez-vous raison? Pourquoi?",
        q3: "Une personne appeurée vous approche rapidement et vous parle, \
        mais dans une langue complètement étrangère. Que faites-vous?"
        },
    2: {
        situation:"Un beau jour d'été, vous êtes assis sur un banc aux abords d'une résidence \
        pour personnes âgées. Il fait très chaud au soleil, mais heureusement, vous avez votre bouteille d'eau. \
        Vous voyez une préposée sortir de l'établissement avec un résident en chaise roulante. Elle \
        s'arrête un peu plus loin et sort son cellulaire. Elle embarque dans une discussion et \
        porte peu attention au résident. Après un certain temps, vous entendez le résident: \"\
        Madame! J'ai très soif, il fait chaud!\" Elle l'ignore. \"MADAME! J'ai vraiment soif!\" \
        Elle lui répond rapidement: \"Aille! Vous pouvez pas boire d'eau sans surveillance et j'en ai pas! \
        Profitez donc du soleil et laissez moi tranquille\". Le résident vous regarde et vous dit: \
        \"S'il vous plaît! Pourriez-vous me laisser un peu de votre eau?\"",
        q1: "Est-ce que vous donneriez de votre eau au résident?",
        q2: "Selon vous, de quelle façon devrions-nous prendre soin nos personnes âgées au Québec?",
        q3: "Si dans la situation vous étiez médecin, auriez-vous réagit de manière différente? Pourquoi?"
        },
    3: {
        situation:"Vous travaillez dans une grande firme de jeux vidéo. La date de sortie de votre \
        projet courant approche à grands pas, mais votre équipe se bute jours après jours à un problème \
        majeur. Le jeu ne peut sortir sans avoir résolu ce problème. Un jour, un membre de votre équipe \
        lance un grand soupir de satisfaction; il a résolu le problème!!! Il vous montre le jeu qui \
        fonctionne alors sans erreur! Il soumet sa solution pour révision. Lors de la révision, \
        on vous interpelle puisque le système a détecté qu'il s'agissait d'un plagiat ligne pour ligne \
        d'une solution trouvée sur Stack Overflow...",
        q1: "Si vous étiez \"team lead\", comment approcheriez-vous cette situation?",
        q2: "Que faites vous pour assurer que vos projets se terminent dans les délais prévus?",
        q3: "Le plagiaire devrait faire face à quels types de conséquences selon-vous?"
        },
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
        },
    999: {
        situation:"",
        q1: "",
        q2: "",
        q3: ""
    }
    }