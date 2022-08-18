function loadContent()
{
    var scenarios = document.getElementById('newScenarios')
    
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">1</button></a>')
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">2</button></a>')
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">3</button></a>')

    scenarios = document.getElementById('legacyScenarios')
    
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">0</button></a>')
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">99</button></a>')
}

function mouseOverEmphasis(button){button.style.color = "darkred"}
function stopMouseOverEmphasis(button){button.style.color = ""}

function setScen(caller)
{
    caller.style.color="";
    sessionStorage.setItem("currentScenario", caller.textContent)
}
