function save() {
    $.ajax({
        url: '/admin/user/edit',
        method: 'post',
        dataType: 'json',
        data: {
            idUser: $('#idUser').val(),
            number: $('#numberDepartment').val(),
            description: $('#descriptionDepartment').val()
        },
        success: function (title) {
            $('#title').text(title)
            $('#status').text('Збережено')
        }
    })
}