function loadContent()
{
    var scenarios = document.getElementById('newScenarios')
    
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">10</button></a>')
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">11</button></a>')
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">16</button></a>')

    scenarios = document.getElementById('legacyScenarios')
    
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">1</button></a>')
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">2</button></a>')
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">3</button></a>')
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">4</button></a>')
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">5</button></a>')
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">6</button></a>')
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">7</button></a>')
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">8</button></a>')
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">9</button></a>')
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">12</button></a>')
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">13</button></a>')
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">14</button></a>')
    scenarios.insertAdjacentHTML('beforeend', '<a href="scenario.html"><button class="casperProblems" onclick="setScen(this)" onmouseenter="mouseOverEmphasis(this)" onmouseleave="stopMouseOverEmphasis(this)">15</button></a>')
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
