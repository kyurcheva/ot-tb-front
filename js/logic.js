$('.login-block #auth-btn').click(function () {
    console.log('Клик на кнопку');
});

function test(){
    console.log('Клик на кнопку2');
    /*$.ajax({
        type: "POST",
        data: $("#auth").serialize() + '&role=user',
        url: "https://httpbin.org/post",
        success: function(response){
                    //console.log(response);
                    console.log(response.form['role']);
                    switch (response.form['role']){
                        case 'admin':
                            window.location.hash = '#adminHomePage'
                        case 'user':
                            window.location.hash = '#OTTBHomePage'
                    }

                    //console.log(this.data);
                    //window.location.hash = '#adminHomePage';

            }
    });*/
    /*
        $.ajax({
        type: "GET",
        url: "http://localhost:8080/example/service",
        success: function(response){
            console.log(response);

            window.location.hash = '#adminHomePage'

        }
    });*/

    var json2 = JSON.stringify({
        "username": $("[name = username]").val(),
        "password": $("[name = password]").val()
    });


    $.ajax({
        type: "POST",
        contentType: "application/json",
        dataType: 'json',
        //data: { "username": $("[name = username]").val(), "password": $("[name = password]").val()},
        data: json2,
        url: "http://localhost:8080/login",
        success: function(response){
            console.log(response.role);
            switch (response.role){
                case 'ADMIN':
                    window.location.hash = '#adminHomePage';
                    break;
                case 'user':
                    window.location.hash = '#OTTBHomePage';
                    break;

            }
        }
    });

}