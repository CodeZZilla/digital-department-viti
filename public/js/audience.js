function addAudience() {
    $.post("/admin/audience/add", {audienceTitle: $('#number-audience-add').val()})
        .done(function (audiences) {
            drawTableContent(audiences)
            $('#number-audience-add').val('')
        });
}

function rmAudience(el) {
    $.get('/admin/audience/rm/' + el.className.split(' ')[2], (audiences) => {
        drawTableContent(audiences)
    })
}

function drawTableContent(audiences) {
    $('#tbodyContent').empty()
    if (audiences.length !== 0) {
        for (let i = 0; i < audiences.length; i++) {
            $('#tbodyContent').append(
                `<tr>
                </tr>
                <th scope="row">${i + 1}</th>
                <th>${audiences[i].audienceTitle}</th>
                <th>
                <button type="button" class="btn btn-danger ${audiences[i]._id}"
                                    onclick="rmAudience(this)">
                                Видалити
                            </button>
                            <button type="button" class="btn btn-danger ${audiences[i]._id}"
                                    onclick="editAudience(this)" data-target="#editModal" data-toggle="modal">
                                Редагувати
                            </button>
                </th>
                </tr>`)
        }
    }
}

function editAudience(el) {
    let idAudience = el.className.split(' ')[2]
    $.get('/admin/audience/' + idAudience, (audience) => {
        $('#inputEditAudience').val(audience.audienceTitle)
        $('#inputEditAudienceId').val(audience._id)
    })
}

function saveAudience() {
    let id = $('#inputEditAudienceId').val()
    let newAudience = $('#inputEditAudience').val()

    $.post("/admin/audience/save",
        {
            id: id,
            audienceTitle: newAudience,
            groupInAudience: 'null'
        })
        .done(function (audiences) {
            drawTableContent(audiences)
            $('#inputEditAudience').val('')
        });
}
