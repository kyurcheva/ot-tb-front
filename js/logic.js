
$('.login-block #auth-btn').click(function () {
    console.log('Клик на кнопку');
});

$('.dropdown').click(function(){
    $('.dropdown-menu').toggleClass('show');
    console.log("Клик на роль");
});



$('.navbar-left-nav').on('click', '.dropdown', function (){
   console.log('fjjodj');
});



function goHome(){
    $("#sign-in-link").show();
    $(".navbar-left-nav").children().last().remove();
    window.location.hash = '#home';
}



function loadHomePage(userInfo) {
    switch (userInfo.role) {
        case 'ADMIN':
            window.location.hash = '#adminHomePage';
            $("#sign-in-link").hide();
            $(".navbar-left-nav").append("<li class=\"nav-item active\">\n" +
                "                    <a id=\"user-icon\" class=\"navbar-brand\" href=\"#\">\n" +
                "                        <span>Admin <i class=\"fa fa-user-circle\"></i></span>\n" +
                "                    </a>\n" +
                "                </li>");


            break;
        case 'OTTB_USER':
            window.location.hash = '#OTTBHomePage';
            $("#sign-in-link").hide();
        /*$(".navbar-left-nav").append("<li class=\"nav-item active\">\n" +
            "                    <a id=\"user-icon\" class=\"navbar-brand\" href=\"#\">\n" +
            "                        <span>OTTBUser <i class=\"fa fa-user-circle\"></i></span>\n" +
            "                    </a>\n" +
            "                </li>");*/
           $(".navbar-left-nav").append("<li id=\"info-user\" class=\"nav-item active\">\n" +
               "                    <div class=\"dropdown\">\n" +
               "<div class=\"btn-group dropleft\">\n" +
               "  <button id=\"user-login-btn-info\" type=\"button\" class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
               "                        <span>OTTBUser <i class=\"fa fa-user-circle\"></i></span>\n" +
               "</button>" +
                "                       <div class=\"dropdown-menu\">\n" +
               "                            <form id=\"form-info-user\" class=\"\">\n" +
               "                                <div class=\"form-group\">\n" +
               "                                    <p>Login: " + userInfo.username + "</p>\n" +
               "                                    <p>Имя: " + userInfo.firstName + "</p>\n" +
               "                                    <p>Фамилия: " + userInfo.lastName + "</p>\n" +
               "                                    <p>Отчество: " + userInfo.patronymic +"</p>\n" +
               "                                </div>\n" +
               "                                <div class=\"form-group\">\n" +
               "                                    <p>Email: " + userInfo.email +"</p>\n" +
               "                                <button type=\"button\" class=\"btn btn-primary\">Log out</button>\n" +
               "                            </form>\n" +
               "                        </div>" +
               "                    </div>\n" +
               "                </li>");
           break;

   }
    }



function auth() {
    console.log('Клик на кнопку2');

    var json2 = JSON.stringify({
        "username": $("[name = username]").val(),
        "password": $("[name = password]").val()
    });
    //Запрос на получение ID
    $.ajax({
        type: "POST",
        contentType: "application/json",
        dataType: 'json',
        //data: { "username": $("[name = username]").val(), "password": $("[name = password]").val()},
        data: json2,
        url: "http://localhost:8080/login",
        success: function (response) {
            console.log(response);
            //Запрос на получение роли и юзер-инфо
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/user/info?id=" + response.id,
                success: function (responseInfo) {
                    console.log(responseInfo);
                    console.log(responseInfo.role);
                    loadHomePage(responseInfo);
                }
            });
        }
    });
}
