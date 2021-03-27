$('.dropdown').click(function(){
    $('.dropdown-menu').toggleClass('show');
    console.log("Клик на роль");
});

//Click LOG OUT
$('.navbar-left-nav').on('click', '#btn-log-out', function(){
    console.log('logout');
    $("#sign-in-link").show();
    $(".navbar-left-nav").children().last().remove();
    window.location.hash = '#home';
});

function goHome(){
    //$("#sign-in-link").show();
    //$(".navbar-left-nav").children().last().remove();
    //window.location.hash = '#home';

}

//Отображение формы с инфо пользователя
function infoMenu(userInfo){
    $("#sign-in-link").hide();
    /*$(".navbar-left-nav").append("<li id=\"info-user\" class=\"nav-item active\">\n" +
        "                    <div class=\"dropdown\">\n" +
        "<div class=\"btn-group dropdown\">\n" +
        "  <button id=\"user-login-btn-info\" type=\"button\" class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
        "                        <span>OTTBUser <i class=\"fa fa-user-circle\"></i></span>\n" +
        "</button>" +
        "                       <div class=\"dropdown-menu\">\n" +
        "                            <form id=\"form-info-user\" class=\"\">\n" +
        "                                <div class=\"form-group\">\n" +
        "                                    <p><u><b>Login:  </b></u>" + userInfo.username + "</p>\n" +
        "<hr>" +
        "                                    <p><u><b>Имя:  </b></u>" + userInfo.firstName + "</p>\n" +
        "                                    <p><u><b>Фамилия:  </b></u>" + userInfo.lastName + "</p>\n" +
        "                                    <p><u><b>Отчество:  </b></u>" + userInfo.patronymic +"</p>\n" +
        "                                    <p><u><b>Email:  </b></u>" + userInfo.email +"</p>\n" +
        "                                </div>\n" +


        "                                <div class=\"form-group btn-log-out\">\n" +
        "                                    <button type=\"button\" class=\"btn btn-primary\">Log out</button>\n" +
        "                                </div>\n" +
        "                            </form>\n" +
        "                    </div>\n" +
        "                </li>");*/


    $(".navbar-left-nav").append("<li id=\"info-user\" class=\"nav-item active\">\n" +
        "                    <div class=\"dropdown\">\n" +
        "<div class=\"btn-group dropdown\">\n" +
        "  <button id=\"user-login-btn-info\" type=\"button\" class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
        "                        <span>" + userInfo.username +" <i id=\"icon-user\" class=\"fa fa-user-circle\"></i></span>\n" +
        "</button>" +
        "                       <div class=\"dropdown-menu\">\n" +
        "                            <form id=\"form-info-user\" class=\"\">\n" +
        "                               <div class=\"row\">\n" +
        "                                  <div class=\"col\">" +
        "<b>" + userInfo.firstName + " " +  userInfo.lastName + " " + userInfo.patronymic + "</b>\n" +
        "                                      <hr>" +
        "                                  </div>\n" +
        "                                </div>\n" +
        "                                <div class=\"row\">\n" +
        "                                  <div class=\"col col-3\">\n" +
        "                                       Login:\n" +
        "                                  </div>\n" +
        "                                  <div class=\"col col-9\">\n" +
        userInfo.username +
        "                                  </div>\n" +
        "                                </div>\n" +
        "                                <div class=\"row\">\n" +
        "                                    <div class=\"col-3\">\n" +
        "                                        Email:\n" +
        "                                    </div>\n" +
        "                                    <div class=\"col-9\">\n" +
        userInfo.email +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                                <div class=\"row\">\n" +
        "                                    <div class=\"col-3\">\n" +
        "                                        Role:\n" +
        "                                    </div>\n" +
        "                                    <div class=\"col-9\">\n" +
        userInfo.role +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                                <div class=\"row\">\n" +
        "                                     <div class=\"col btn-log-out\">\n" +
        "                                       <button id=\"btn-log-out\" type=\"button\" class=\"btn btn-primary\">Log out</button>\n" +
        "                                     </div>\n" +
        "                                 </div>" +
        "                            </form>\n" +
        "                    </div>\n" +
        "                </li>");
}



//Выбор домашней страницы в соответсвии с ролью
function loadHomePage(userInfo) {
    switch (userInfo.role) {
        case 'ADMIN':
            window.location.hash = '#adminHomePage';
            infoMenu(userInfo);
            break;
        case 'OTTB_USER':
           window.location.hash = '#OTTBHomePage';
           infoMenu(userInfo);
           break;

   }
    }


//Авторизация
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
                },
                error: function(e){
                    alert('Ошибка сервера');
                }
            });
        },
        error: function (e){
            alert('Неправильный логин или пароль! Попробуйте еще раз');
            $('#auth')[0].reset();
        }
    });
}
