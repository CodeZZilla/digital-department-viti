$(document).ready(function () {
    document.getElementById("dateSave").valueAsDate = new Date();
    changeData(document.getElementById("dateSave").valueAsDate.toISOString().split('T')[0]);
});

$(window).load(function () {
    $('#load-spinner').hide();
});

$(document).ajaxStart(function () {
    $('#load-spinner').show();
}).ajaxStop(function () {
    $('#load-spinner').hide();
});

function saveEvent() {
    let date = new Date($('#dateSave').val());
    console.log(date.toISOString().split('T')[0]);
    $.get("/admin/schedule/allAudiences", function (data) {
        let arr = [];
        $.each(data, function (k, v) {
            for (let j = 1; j <= 4; j++) {
                let form = $('#form_' + v._id + '_' + j);

                let numberLesson = j;
                let audience = v._id;
                let type = form.children(".first").children(".first-2").children(".type-less").val();
                let group = form.children(".first").children(".first-1").children(".group").val();
                let teacher = form.children('.second').children('.second-2').children('.teacher').val();
                let title = form.children('.second').children('.second-1').children('.title').val();
                if (group === '' && teacher === '' && title === '' && type === 'null') { } else {
                    arr.push({
                        date: date.toISOString().split('T')[0],
                        idAudience: audience,
                        numberLesson: numberLesson,
                        idType: (type === 'null') ? '' : type,
                        title: title,
                        teacher: teacher,
                        group: group
                    });
                }
            }
        });

        $.ajax({
            url: '/admin/schedule/saveAll',           /* Куда пойдет запрос */
            method: 'post',             /* Метод передачи (post или get) */
            dataType: 'json',          /* Тип данных в ответе (xml, json, script, html). */
            data: {arr: arr, date: date.toISOString().split('T')[0]},          /* Параметры передаваемые в запросе. */
            success: function (info) {
                console.log(info)
            }
        });
    });
}

function changeData(date) {
    $.ajax({
        url: '/admin/schedule/getData',           /* Куда пойдет запрос */
        method: 'post',             /* Метод передачи (post или get) */
        dataType: 'json',          /* Тип данных в ответе (xml, json, script, html). */
        data: {date: date},          /* Параметры передаваемые в запросе. */
        success: function (data) {   /* функция которая будет выполнена после успешного запроса.  */
            console.log(data);
            $.get("/admin/schedule/allAudiences", function (audiences) {
                $.each(audiences, function (key, value) {
                    for (let j = 1; j <= 4; j++) {
                        let form = $('#form_' + value._id + '_' + j);
                        form.children(".first").children(".first-2").children(".type-less").val('');
                        form.children(".first").children(".first-1").children(".group").val('');
                        form.children('.second').children(".second-2").children('.teacher').val('');
                        form.children('.second').children(".second-1").children('.title').val('');
                    }
                });
                if (data.length !== 0) {
                    $.each(data, function (key, value) {
                        let form = $('#form_' + value.idAudience + '_' + value.numberLesson);
                        // $.post('/admin/schedule/getTypeById', {id: value.idType}, (type) => {
                        // })
                        form.children(".first").children(".first-2").children(".type-less").val(value.idType);
                        form.children(".first").children(".first-1").children(".group").val(value.group);
                        form.children('.second').children(".second-2").children('.teacher').val(value.teacher);
                        form.children('.second').children(".second-1").children('.title').val(value.title);
                    });
                }
            })
        }
    });
}