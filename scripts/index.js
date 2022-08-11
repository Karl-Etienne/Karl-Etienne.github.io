function setScen(caller)
{
    sessionStorage.setItem("currentScenario", caller.textContent);
}

function loadContent()
{
    var scenarios = document.getElementById('newScenarios')
    
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)">0</button></a>');

    scenarios = document.getElementById('legacyScenarios')
    
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)">99</button></a>');
}
