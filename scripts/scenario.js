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
        situation:"Vous ??tes dans un bar avec 2 amis. La t??l??vision affiche \
        aux nouvelles que la police recherche activement les personnes responsables \
        d'avoir d??boulonn?? une statue d'un politicien historique per??u \
        comme raciste. Votre premier ami s'exclame: \"Bienfait! J'aurais aim?? y ??tre pour participer!\" \
        Le second semble surpris et r??pond sur un ton d??fensif: \"Es-tu s??rieux? C'est un geste \
        de pure violence et un grand manque de respect ?? notre nation, ?? notre histoire!\"",
        q1: "Avez-vous d??j?? ??t?? t??moin de racisme autour de vous? Comment pouvons-nous ??liminer \
         ce type de probl??me dans le milieu de la sant?? selon vous?",
        q2: "Vos amis vous demandent votre opinion sur le sujet. ?? qui donnez-vous raison? Pourquoi?",
        q3: "Une personne appeur??e vous approche rapidement et vous parle, \
        mais dans une langue compl??tement ??trang??re. Que faites-vous?"
        },
    2: {
        situation:"Un beau jour d'??t??, vous ??tes assis sur un banc aux abords d'une r??sidence \
        pour personnes ??g??es. Il fait tr??s chaud au soleil, mais heureusement, vous avez votre bouteille d'eau. \
        Vous voyez une pr??pos??e sortir de l'??tablissement avec un r??sident en chaise roulante. Elle \
        s'arr??te un peu plus loin et sort son cellulaire. Elle embarque dans une discussion et \
        porte peu attention au r??sident. Apr??s un certain temps, vous entendez le r??sident: \"\
        Madame! J'ai tr??s soif, il fait chaud!\" Elle l'ignore. \"MADAME! J'ai vraiment soif!\" \
        Elle lui r??pond rapidement: \"Aille! Vous pouvez pas boire d'eau sans surveillance et j'en ai pas! \
        Profitez donc du soleil et laissez moi tranquille\". Le r??sident vous regarde et vous dit: \
        \"S'il vous pla??t! Pourriez-vous me laisser un peu de votre eau?\"",
        q1: "Est-ce que vous donneriez de votre eau au r??sident?",
        q2: "Selon vous, de quelle fa??on devrions-nous prendre soin nos personnes ??g??es au Qu??bec?",
        q3: "Si dans la situation vous ??tiez m??decin, auriez-vous r??agit de mani??re diff??rente? Pourquoi?"
        },
    3: {
        situation:"Vous travaillez dans une grande firme de jeux vid??o. La date de sortie de votre \
        projet courant approche ?? grands pas, mais votre ??quipe se bute jours apr??s jours ?? un probl??me \
        majeur. Le jeu ne peut sortir sans avoir r??solu ce probl??me. Un jour, un membre de votre ??quipe \
        lance un grand soupir de satisfaction; il a r??solu le probl??me!!! Il vous montre le jeu qui \
        fonctionne alors sans erreur! Il soumet sa solution pour r??vision. Lors de la r??vision, \
        on vous interpelle puisque le syst??me a d??tect?? qu'il s'agissait d'un plagiat ligne pour ligne \
        d'une solution trouv??e sur Stack Overflow...",
        q1: "Si vous ??tiez \"team lead\", comment approcheriez-vous cette situation?",
        q2: "Que faites vous pour assurer que vos projets se terminent dans les d??lais pr??vus?",
        q3: "Le plagiaire devrait faire face ?? quels types de cons??quences selon-vous?"
        },
    4: {
        situation:"\"ON EST SURVEILL??S!\" vous lisez sur une pancarte tenue par un homme sur la bord de la rue. Vous ??tes ?? une lumi??re rouge. \
        Depuis votre voiture, vous entendez l'homme crier: \"JETEZ VOS T??L??PHONES! LIB??REZ VOUS DE BIG BROTHER!\" \
        Vous croisez son regard... Soudainement, il commence ?? donner des coups de sa pancarte sur votre v??hicule!",
        q1: "Comment r??agissez-vous?",
        q2: "Partagez-vous l'opinion de l'homme?",
        q3: "Vrai ou faux? En ce moment, au Qu??bec, les troubles de sant?? mentale sont plus importants que les autres types de probl??mes de sant??."
        },
    5: {
        situation:"C'est une journ??e importante au travail: c'est votre ??valuation en vue d'une possible promotion! Vous ??tes dans \
        le bureau de votre sup??rieur. Il d??bute en vous expliquant qu'il vous avait d'abord offert un emploi dans la compagnie puisqu'il \
        avait vu en vous un grand potentiel. Il poursuit toutefois en indiquant que ce potentiel ne s'est clairement pas r??alis??. Il dit \
        que vos r??sultats sont minables, que vous ??tes une d??ception et qu'il en est ?? deux doigts de vous renvoyer...",
        q1: "Avez-vous d??j?? sous-perform??? Pour quelle raison?",
        q2: "Votre employeur devrait-il vous renvoyer ou vous offrir une derni??re chance?",
        q3: "Si vous aviez ?? renvoyer un employ??, comment le feriez-vous?"
        },
    6: {
        situation:"Vous ??tes dans votre maison en fin de soir??e. Votre partenaire et vous ??tes sur le point d'aller vous coucher, mais \
        en passant devant la porte ferm??e de la chambre de votre enfant de 16 ans, vous l'entendez dire: \"Osti m'a le tuer! Je te \
        le jure qu'il va crever!\"",
        q1: "Entrez-vous dans la chambre pour confronter votre enfant?",
        q2: "Selon vous, est-ce que la \"libert?? d'expression\" permet de dire tout ce que l'on veut?",
        q3: "Devrions-nous restreindre l'acc??s aux jeux vid??o \"17 ans et plus\" ?? des enfants de 15~16 ans? Pourquoi?"
        },
    7: {
        situation:"Votre amie vous a invit?? ?? un festival de music ??lectronique pour le week-end. C'est trippant! Un \
        moment donn??, votre amie vous dit qu'elle doit passer aux toilettes... Peu de temps apr??s son retour, elle agit de \
        fa??on ??trange. Elle qui est normalement plus r??serv??e, elle semble soudainement plus ??nerg??tique qu'?? l'habitude. \
        Elle vous partage ?? quel point \"elle se sent bien\" et elle commence ?? danser avec de purs ??trangers autour de vous...",
        q1: "Est-ce que le changement de comportement de votre amie vous inqui??te ou ??a vous rassue de la voir si heureuse?",
        q2: "Si vous ??tiez en charge du festival, quelles mesures metteriez-vous en place afin de limiter la consommation excessive?",
        q3: "Vrai ou faux? Toute drogue devrait ??tre ill??gale. Expliquez votre choix."
        },
    8: {
        situation:"Vous ??tes infirmier ?? l'h??pital. Votre ??tage est en confinement puisque vous h??bergez les patients \
        positifs ?? la Covid. La consigne est claire: il est important de rev??tir votre ??PI afin d'??viter la contamination!\
        En marchant dans le corridor, vous remarquez un coll??gue dans une chambre qui porte la jaquette, les gants, le masque N95, mais ne\
         porte pas de lunettes de s??curit??...",
        q1: "Que faites-vous? Pourquoi?",
        q2: "D??crivez, selon vous, les probl??mes pouvant d??couler de ce type de n??gligence.",
        q3: "??tes-vous trop prudent, pas assez ou juste assez? Pourquoi?"
        },
    9: {
        situation:"Un couple d'amis viennent tout juste de mettre naissance ?? leur premier enfant. Toutefois, d?? ?? des \
        complications ?? l'accouchement, le m??decin a averti que l'enfant pr??sentera probablement un retard mental. La m??re \
        vous partage sa grande tristesse. Elle s'??tait imagin?? son enfant en pleine sant??, des moments heureux en famille, \
        une vie normale... Mais maintenant, elle dit sentir un poid ??norme sur ses ??paules, comme quoi elle devra toujours \
        g??rer les innombrables rendez-vous m??dicaux et les difficult??s quotidiennes de son enfant. Elle ??nonce m??me qu'elle \
        regrette avoir eu l'enfant...",
        q1: "Selon vous, jusqu'?? quel moment est-ce qu'une femme peut faire appel ?? l'avortement? Pourquoi?",
        q2: "Si le couple n'arrive visiblement pas ?? s'occuper de l'enfant, offrirez-vous de prendre en charge l'enfant \
        d'une mani??re ou d'une autre?",
        q3: "Que dites-vous ?? votre amie afin de l'assister dans sa d??tresse?"
        },
    10: {
        situation:"De nos jours, il est possible de devoir attendre plus de 2 ans afin d'obtenir un examen de \
        r??sonance magn??tique en centre hospitalier... Cela peut prendre moins d'une semaine en clinique priv??e.",
        q1: "Selon vous, que devrions-nous faire afin de bonifier la qualit?? des services offert dans le \
        syst??me de sant?? publique au Qu??bec?",
        q2: "Devrions-nous obliger les mieux nantis ?? payers leurs examens m??dicaux?",
        q3: "Pour ou contre un r??gime national de soins dentaires"
        },
    11: {
        situation:"Vous ??tes en grande discussion avec votre voisin. Vous le remercier de bien vouloir s'occuper \
        de votre demeure durant les 2 semaines o?? vous serez en vacances ?? Hawaii. Lorsque vous lui expliquez \
        que vous profiterez d'un aller direct dans un ??norme Boeing 777, la fille adolescente du voisin s'exprime \
        fortement: \"Donc tu vas br??ler tout ce k??ros??ne l?? juste pour ton p'tit plaisir? Osti d'??go??ste! Moi je vais devoir vivre \
        sur une plan??te surchauff??e et d??truite ?? cause de gens comme toi!\"",
        q1: "Vous sentiriez-vous mal de faire ce type de voyage suite au commentaire de la jeune fille?",
        q2: "Quelles actions posez-vous afin de r??duire votre impact sur le r??chauffement climatique?",
        q3: "Est-ce qu'un qu??b??cois moyen devrait s'inqui??ter du moyen de transport qu'il choisit sachant que la Chine \
        a un impact largement plus important que lui sur le taux de polution g??n??r???"
        },
    12: {
        situation:"L'??quipement de votre centre multiservices de sant?? et de services sociaux local est reconnu pour ??tre... \
        v??tuste. Plusieurs appareils sont anciens, mais toujours fonctionnels. Malgr?? que cela soit souvent rapport?? ?? la\
        direction, celle-ci r??pond toujours que \"si le service peut ??tre offert avec l'??quipement en place, aucun changement\
         ne sera apport??\"... Plusieurs patients sont pourtant inquiets de ne pas recevoir le meilleur traitement possible. \
        R??cemment, une famille ais??e de la r??gion a annonc?? vouloir offrir plusieurs millions de dollars en dons majeurs au courant \
        des prochaines ann??es afin de mettre ?? jour l'??quipement du centre. Leur seule condition: chaque \
        patient doit ressortir du centre avec un ballon o?? il est inscrit \"Merci famille Des??tang! Vous m'avez sauv?? la vie!\"",
        q1: "Si vous ??tiez en charge du dossier, accepteriez-vous l'offre? Pourquoi?",
        q2: "Devons-nous attendre que l'??quipement m??dical brise avant de le remplacer?",
        q3: "Pour ou contre la centralisation de la gestion dans le syst??me de sant?? au Qu??bec?"
        },
    13: {
        situation:"Vous roulez ?? pleine vitesse sur l'autoroute. La circulation est dense, mais fluide. En approchant d'un viaduc, \
        vous appercevez une personne qui enjambe la barri??re et semble vouloir sauter! La prochaine sortie accessible \
        se situe ?? une distance d'environ 8 km.",
        q1: "Comment r??agissez-vous?",
        q2: "D??crivez une situation stressante sur laquelle vous n'aviez pas le contr??le. Comment avez-vous g??r?? cette situation?",
        q3: "Si vous ??tiez plut??t en train de traverser ce viaduc, auriez-vous agi diff??rement?"
        },
    14: {
        situation:"Vous profitez d'une belle journ??e ensoleill??e pour aller marcher au parc pr??s de chez vous. \
        Sur le bord de la rue, vous appercevez un homme dans une camionnette blanche qui semble discuter avec une jeune fillette \
        qui jouait seule.",
        q1: "Est-ce que cette situation vous inqui??te? Pourquoi?",
        q2: "Selon vous, est-ce que les pr??dateurs sexuels m??ritent n??cessairement la prison ou si uniquement la th??rapie suffirait?",
        q3: "Pour ou contre les gadgets et/ou applications qui permettent aux parents de suivre l'emplacement et les activit??s de leurs enfants? Pourquoi?"
        },
    15: {
        situation:"Vous ??tes le g??rant d'une boutique sp??cialis??e en vente d'articles de sport. En d??but d'apr??s-midi, vous \
        recevez un appel de l'employ?? qui devait faire le quart de soir. Il vous annonce qu'il ne pourra pas rentrer puisqu'il vit \
        un deuil. En le questionnant, il vous avoue ??tre boulvers?? par la mort de la Reine ??lizabeth II... Il dit avoir un grand respect \
        pour la monarchie et que vous ne pouvez pas agir contre ses valeurs...",
        q1: "Selon vous, quelle est l'importance r??elle du Roi en tant que chef de l'??tat canadien?",
        q2: "Respectez-vous le deuil de votre employ??? Est-ce que vous lui laiss?? le cong???",
        q3: "Avez-vous d??j?? eu ?? \"forcer\" quelqu'un ?? agir contre ses valeurs/ses volont??s? Quelle est la meilleure approche selon vous?"
        },
    16: {
        situation:"Vous ??tes coordonateur aux ??tudiants dans une ??cole secondaire. Vous ??tes seul dans votre bureau en train \
        de consulter vos courriels quand la jeune Oc??ane, 13 ans, entre dans votre bureau en panique. Elle vous confie avoir \
        eu une relation sexuelle compl??te non prot??g??e avec un ??tudiant de 15 ans de la m??me ??cole... Ses amies l'avaient mise au d??fi de \"perdre \
        sa virginit?? avant ses 14 ans\" (qu'elle f??tera seulement dansgit 1 mois). En absence de ses menstruations, elle a fait un test de \
        grossesse qui affiche positif... Elle se dit d??gout??e ?? l'id??e d'??tre enceinte et ne pas ??tre pr??te ?? devenir maman!",
        q1: "Selon vous, quelles sont les cons??quences principales de la sexualisation pr??coce chez les jeunes adolescents?",
        q2: "Contactez-vous les parents d'Oc??ane afin de les mettre au courant? Pourquoi?",
        q3: "Si Oc??ane avait plut??t ??t?? heureuse ?? l'id??e de devenir maman, l'auriez-vous soutenue dans sa d??marche? Comment?"
        },
    99: {
        situation:"Test boboche",
        q1: "Blablabla Mr.Freeman",
        q2: "Never gonna give you up, never gonna...?",
        q3: "You ever wonder what the bottom of an avatar shoe looks like?"
        },
    0: {
        situation:"Probl??me simple pour vous acclimater au site! Vous avez 5 min pour r??pondre ?? 3 questions.",
        q1: "Vrai ou faux? Un vol peut ??tre justifi??.",
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