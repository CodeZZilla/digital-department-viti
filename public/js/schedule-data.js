let date = new Date()
let interval = null
$(document).ready(function () {
    date = new Date()
    loadData(date.toISOString().split('T')[0])
    interval = setInterval(loadData, 10000, date.toISOString().split('T')[0])
});

let mapColorsByIdTypes = new Map([
    ['615713c9d4053d2db0d12c67', 'gradient-red'],
    ['615713c9d4053d2db0d12c69', 'gradient-green'],
    ['615713c9d4053d2db0d12c6a', 'gradient-blue'],
    ['615713c9d4053d2db0d12c6b', 'gradient-orange'],
    ['615713c9d4053d2db0d12c6c', 'gradient-dark'],
    ['null', 'gradient-custom']
])


let lessonsLocal;
function loadData(date) {
    $.ajax({
        url: '/admin/schedule/getDataByIdUser',
        method: 'post',
        dataType: 'json',
        data: {date: date, idUser: $('#idUser').val()},
        success: function (lessons) {
            if(!array_compare(lessonsLocal, lessons)){
                lessonsLocal = lessons.slice();
                // lessons[0].idType  может давать undefined
                document.querySelectorAll('.lines').forEach(e => e.remove())
                $.post("/admin/schedule/allAudiencesByUserName", {username: $('#username').val()}, function (audiences) {
                    let classNameAppendAll = 'lines'
                    let classHeightCard = 'height-card'
                    if(audiences.length > 7){
                        classNameAppendAll = 'lines-1'
                        classHeightCard = 'height-card-9'
                    }
                    let htmlAppend = ''
                    $.each(audiences, function (key, value) {
                        htmlAppend +=
                            `<div class="row ${classNameAppendAll}">
                            <div class="col-1 d-flex">
                                <p class="h1 font-weight-bold my-auto mx-auto text-center">${value.audienceTitle}</p>
                            </div>`
                        for (let numberLesson = 1; numberLesson <= 4; numberLesson++) {
                            let lesson = lessons.find(x =>
                                x.idAudience === value._id &&
                                x.date === date &&
                                x.numberLesson === numberLesson)
                            if (lesson !== undefined) {
                                //проверка на сампо (во время пар)
                                if(lesson.idType !== undefined && lesson.idType === '615713c9d4053d2db0d12c6b'){
                                    htmlAppend += `<div class="col d-flex">
            <div class="col-sm-12 my-auto mx-auto card px-0 gradient-orange border ${classHeightCard}"
                 style="border-radius: 10px">
                <p class="h1 font-weight-bold text-light my-auto mx-auto card-title">${lesson.group}</p>
            </div>
        </div>`
                                }else {
                                    let styleCard = 'gradient-custom'
                                    if (lesson.idType !== undefined) {
                                        styleCard = mapColorsByIdTypes.get(lesson.idType)
                                    }
                                    let sizeGroupHelper = ''
                                    if(lesson.group.length > 3){
                                        sizeGroupHelper = 'style="font-size: 2.18vw; text-align: center"'
                                    }
                                    let group = lesson.group.length > 4 ? lesson.group.replace(',', ' ') : lesson.group
                                    htmlAppend += `<div class="col d-flex">
            <div class="col-sm-12 my-auto mx-auto card px-0 ${styleCard} border ${classHeightCard}"
                 style="border-radius: 10px">
                <div class="row g-0 no-gutters mx-0 px-0">
                    <div class="col-md-5 d-flex">
                        <p class="h1 font-weight-bold text-light my-auto mx-auto card-title" ${sizeGroupHelper}>${group}</p>
                    </div>
                    <div class="col-md-7 d-flex">
                        <div class="my-auto mx-auto">
                            <p class="h3 text-center text-light">${lesson.title.length > 5 ? lesson.title.substr(0, 5) + '.' : lesson.title}</p>
                            <p class="h5 text-center text-light">${lesson.teacher.length > 10 ? lesson.teacher.substr(0, 10) + '..' : lesson.teacher}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
                                }
                            }else {
                                htmlAppend += `<div class="col d-flex">
            <div class="col-sm-12 my-auto mx-auto card px-0 gradient-custom border ${classHeightCard}"
                 style="border-radius: 10px">
                <p class="h1 font-weight-bold text-light my-auto mx-auto card-title">Вільна</p>
            </div>
        </div>`
                            }
                        }
                        htmlAppend += `<div class="col d-flex">
            <div class="col-sm-12 my-auto mx-auto card px-0 gradient-orange border ${classHeightCard}"
                 style="border-radius: 10px">
                <p class="h1 font-weight-bold text-light my-auto mx-auto card-title">${value.groupInAudience === 'null' ? 'Вільна' : value.groupInAudience}</p>
            </div>
        </div>
        <div class="w-100"></div>
    </div>`
                    })
                    $('#schedule-container').append(htmlAppend)
                })
            }
        }
    })
}

function btnClick(id){
    date = new Date();
    if (id === 'btn-1') {
        $('#dropdownButton').text('Сьогодні')
        loadData(date.toISOString().split('T')[0])
        clearInterval(interval)
        interval = setInterval(loadData, 10000, date.toISOString().split('T')[0])
    } else if (id === 'btn-2') {
        $('#dropdownButton').text('Завтра')
        date.setDate(date.getDate() + 1);
        loadData(date.toISOString().split('T')[0]);
        clearInterval(interval)
        interval = setInterval(loadData, 10000, date.toISOString().split('T')[0])
    } else if (id === 'btn-3') {
        $('#dropdownButton').text('Післязавтра')
        date.setDate(date.getDate() + 2);
        loadData(date.toISOString().split('T')[0]);
        clearInterval(interval)
        interval = setInterval(loadData, 10000, date.toISOString().split('T')[0])
    }
}



function array_compare(a, b) {
    try {
        if(a.length !== b.length)
            return false;

        for(let i = 0, len = a.length; i < len; i++) {
            if (!deepEqual(a[i], b[i])) {
                console.log('не однакові')
                return false;
            }
        }

        return true
    }catch (error){
        return false
    }

}

function deepEqual (obj1, obj2){
    return JSON.stringify(obj1)===JSON.stringify(obj2);
}
