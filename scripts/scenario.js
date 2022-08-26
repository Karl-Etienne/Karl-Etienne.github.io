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
    4: {
        situation:"\"ON EST SURVEILLÉS!\" vous lisez sur une pancarte tenue par un homme sur la bord de la rue. Vous êtes à une lumière rouge. \
        Depuis votre voiture, vous entendez l'homme crier: \"JETEZ VOS TÉLÉPHONES! LIBÉREZ VOUS DE BIG BROTHER!\" \
        Vous croisez son regard... Soudainement, il commence à donner des coups de sa pancarte sur votre véhicule!",
        q1: "Comment réagissez-vous?",
        q2: "Partagez-vous l'opinion de l'homme?",
        q3: "Vrai ou faux? En ce moment, au Québec, les troubles de santé mentale sont plus importants que les autres types de problèmes de santé."
        },
    5: {
        situation:"C'est une journée importante au travail: c'est votre évaluation en vue d'une possible promotion! Vous êtes dans \
        le bureau de votre supérieur. Il débute en vous expliquant qu'il vous avait d'abord offert un emploi dans la compagnie puisqu'il \
        avait vu en vous un grand potentiel. Il poursuit toutefois en indiquant que ce potentiel ne s'est clairement pas réalisé. Il dit \
        que vos résultats sont minables, que vous êtes une déception et qu'il en est à deux doigts de vous renvoyer...",
        q1: "Avez-vous déjà sous-performé? Pour quelle raison?",
        q2: "Votre employeur devrait-il vous renvoyer ou vous offrir une dernière chance?",
        q3: "Si vous aviez à renvoyer un employé, comment le feriez-vous?"
        },
    6: {
        situation:"Vous êtes dans votre maison en fin de soirée. Votre partenaire et vous êtes sur le point d'aller vous coucher, mais \
        en passant devant la porte fermée de la chambre de votre enfant de 16 ans, vous l'entendez dire: \"Osti m'a le tuer! Je te \
        le jure qu'il va crever!\"",
        q1: "Entrez-vous dans la chambre pour confronter votre enfant?",
        q2: "Selon vous, est-ce que la \"liberté d'expression\" permet de dire tout ce que l'on veut?",
        q3: "Devrions-nous restreindre l'accès aux jeux vidéo \"17 ans et plus\" à des enfants de 15~16 ans? Pourquoi?"
        },
    7: {
        situation:"Votre amie vous a invité à un festival de music électronique pour le week-end. C'est trippant! Un \
        moment donné, votre amie vous dit qu'elle doit passer aux toilettes... Peu de temps après son retour, elle agit de \
        façon étrange. Elle qui est normalement plus réservée, elle semble soudainement plus énergétique qu'à l'habitude. \
        Elle vous partage à quel point \"elle se sent bien\" et elle commence à danser avec de purs étrangers autour de vous...",
        q1: "Est-ce que le changement de comportement de votre amie vous inquiète ou ça vous rassue de la voir si heureuse?",
        q2: "Si vous étiez en charge du festival, quelles mesures metteriez-vous en place afin de limiter la consommation excessive?",
        q3: "Vrai ou faux? Toute drogue devrait être illégale. Expliquez votre choix."
        },
    8: {
        situation:"Vous êtes infirmier à l'hôpital. Votre étage est en confinement puisque vous hébergez les patients \
        positifs à la Covid. La consigne est claire: il est important de revêtir votre ÉPI afin d'éviter la contamination!\
        En marchant dans le corridor, vous remarquez un collègue dans une chambre qui porte la jaquette, les gants, le masque N95, mais ne\
         porte pas de lunettes de sécurité...",
        q1: "Que faites-vous? Pourquoi?",
        q2: "Décrivez, selon vous, les problèmes pouvant découler de ce type de négligence.",
        q3: "Êtes-vous trop prudent, pas assez ou juste assez? Pourquoi?"
        },
    9: {
        situation:"Un couple d'amis viennent tout juste de mettre naissance à leur premier enfant. Toutefois, dû à des \
        complications à l'accouchement, le médecin a averti que l'enfant présentera probablement un retard mental. La mère \
        vous partage sa grande tristesse. Elle s'était imaginé son enfant en pleine santé, des moments heureux en famille, \
        une vie normale... Mais maintenant, elle dit sentir un poid énorme sur ses épaules, comme quoi elle devra toujours \
        gérer les innombrables rendez-vous médicaux et les difficultés quotidiennes de son enfant. Elle énonce même qu'elle \
        regrette avoir eu l'enfant...",
        q1: "Selon vous, jusqu'à quel moment est-ce qu'une femme peut faire appel à l'avortement? Pourquoi?",
        q2: "Si le couple n'arrive visiblement pas à s'occuper de l'enfant, offrirez-vous de prendre en charge l'enfant \
        d'une manière ou d'une autre?",
        q3: "Que dites-vous à votre amie afin de l'assister dans sa détresse?"
        },
    10: {
        situation:"De nos jours, il est possible de devoir attendre plus de 2 ans afin d'obtenir un examen de \
        résonance magnétique en centre hospitalier... Cela peut prendre moins d'une semaine en clinique privée.",
        q1: "Selon vous, que devrions-nous faire afin de bonifier la qualité des services offert dans le \
        système de santé publique au Québec?",
        q2: "Devrions-nous obliger les mieux nantis à payers leurs examens médicaux?",
        q3: "Pour ou contre un régime national de soins dentaires"
        },
    11: {
        situation:"Vous êtes en grande discussion avec votre voisin. Vous le remercier de bien vouloir s'occuper \
        de votre demeure durant les 2 semaines où vous serez en vacances à Hawaii. Lorsque vous lui expliquez \
        que vous profiterez d'un aller direct dans un énorme Boeing 777, la fille adolescente du voisin s'exprime \
        fortement: \"Donc tu vas brûler tout ce kérosène là juste pour ton p'tit plaisir? Osti d'égoïste! Moi je vais devoir vivre \
        sur une planète surchauffée et détruite à cause de gens comme toi!\"",
        q1: "Vous sentiriez-vous mal de faire ce type de voyage suite au commentaire de la jeune fille?",
        q2: "Quelles actions posez-vous afin de réduire votre impact sur le réchauffement climatique?",
        q3: "Est-ce qu'un québécois moyen devrait s'inquiéter du moyen de transport qu'il choisit sachant que la Chine \
        a un impact largement plus important que lui sur le taux de polution généré?"
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