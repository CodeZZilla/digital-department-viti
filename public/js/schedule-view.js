
function fullscreenFunc() {
    let elem = document.querySelector("#schedule-container");
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`)
        })
    } else {
        document.exitFullscreen()
    }
}


var hoursContainer = document.querySelector('.hours')
var minutesContainer = document.querySelector('.minutes')
var tickElements = Array.from(document.querySelectorAll('.tick'))

var last = new Date(0)
last.setUTCHours(-1)


function updateTime () {
    var now = new Date

    var lastHours = last.getHours().toString()
    var nowHours = now.getHours().toString()
    if (lastHours !== nowHours) {
        updateContainer(hoursContainer, nowHours)
    }

    var lastMinutes = last.getMinutes().toString()
    var nowMinutes = now.getMinutes().toString()
    if (lastMinutes !== nowMinutes) {
        updateContainer(minutesContainer, nowMinutes)
    }
    last = now

}

function clock(){
    let date = new Date(),
        hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
        minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    document.getElementById('clock').innerHTML = hours + ':' + minutes;
}
setInterval(clock, 1000);

// function tick () {
//     tickElements.forEach(t => t.classList.toggle('tick-hidden'))
// }
//
// function updateContainer (container, newTime) {
//     var time = newTime.split('')
//
//     if (time.length === 1) {
//         time.unshift('0')
//     }
//
//
//     var first = container.firstElementChild
//     if (first.lastElementChild.textContent !== time[0]) {
//         updateNumber(first, time[0])
//     }
//
//     var last = container.lastElementChild
//     if (last.lastElementChild.textContent !== time[1]) {
//         updateNumber(last, time[1])
//     }
// }
//
// function updateNumber (element, number) {
//     //element.lastElementChild.textContent = number
//     var second = element.lastElementChild.cloneNode(true)
//     second.textContent = number
//
//     element.appendChild(second)
//     element.classList.add('move')
//
//     setTimeout(function () {
//         element.classList.remove('move')
//     }, 990)
//     setTimeout(function () {
//         element.removeChild(element.firstElementChild)
//     }, 990)
// }
//
// setInterval(updateTime, 1000)

// document.querySelector('.login').style.display = 'none'