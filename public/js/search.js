function searchClick(){
    $.post('/search/params', {
        usersId: $('#selectUsersId').val(),
        groups: $('#selectGroups').val(),
        typesId: $('#selectTypesId').val(),
        numberLessons: $('#selectNumberLessons').val()
    }, (res) => {
        $('#tableBody').empty()
        let contentHTML = ''
        let counter = 1
        for (let item of res){
            contentHTML += `<tr>
                    <th scope="row">${counter++}</th>
                    <td>${item.title}</td>
                    <td>${item.teacher}</td>
                    <td>${item.type}</td>
                    <td>${item.group}</td>
                    <td>${item.numberLesson}</td>
                    <td>${item.departmentNumber}</td>
                    <td>${item.audience}</td>
                </tr>`
        }
        $('#tableBody').append(contentHTML)
    })
}