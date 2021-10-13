function saveAudience(){
    $.post("/admin/schedule/allAudiencesByUserName", {username: $('#username').val()}, function (audiences) {
        $.each(audiences, function (key, value) {
            let getData = $('#' + value.audienceTitle).val()
            let groupInAudience = getData !== '' ? getData : 'null'
            $.ajax({
                url: '/admin/audience/save',
                method: 'post',
                dataType: 'json',
                data: {id: value._id, groupInAudience: groupInAudience},
                success: function () { }
            });
        })
        document.location.href = '/admin/schedule/view/' + $('#username').val();
    })
}