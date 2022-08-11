function setScen(caller)
{
    sessionStorage.setItem("currentScenario", caller.textContent);
}

function loadContent()
{
    var scenarios = document.getElementById('newScenarios')
    
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)">5</button></a>');
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)">6</button></a>');
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)">7</button></a>');
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)">88</button></a>');

    scenarios = document.getElementById('legacyScenarios')
    
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)">1</button></a>');
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)">2</button></a>');
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)">3</button></a>');
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)">4</button></a>');
}
