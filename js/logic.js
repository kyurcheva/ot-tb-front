$('.dropdown').click(function(){
    $('.dropdown-menu').toggleClass('show');
    console.log("Клик на роль");
});

window.addEventListener('hashchange', function(e) {

    if (window.location.hash != '#templateDesktop'){
        $('body').children('.point').remove();
        $('body').children('.content-template-list').remove();
    }
    if (window.location.hash != '#existingTables'){
        $('body').children('.table-desktop').remove();
    }
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
const plus = '+';
const min = '-';

function appendDom(container, jsonData) {
    for (var i = 0; i <jsonData.length; i++) {
        /*var $divParent  = $("<ul class='elem'><li></li></ul>");
        $divParent.children().last().text(jsonData[i].name).attr('id',jsonData[i].name );
        if (jsonData[i].children) {
            appendDom($divParent.children().last(), jsonData[i].children);
        }*/

        var $divParent  = $("<div class='point'><ch>-</ch><span></span></div>");
        $divParent.attr('id',jsonData[i].name );
        $divParent.find('span').text(jsonData[i].name);
        if (jsonData[i].children) {
            appendDom($divParent, jsonData[i].children);
        }
        container.append($divParent);
    }
}

function appendElement(container, jsonData){
    for (var i = 0; i <jsonData.length; i++) {
        /*var $divParent  = $("<ul class='elem'><li></li></ul>");
        $divParent.children().last().text(jsonData[i].name).attr('id',jsonData[i].name );
        if (jsonData[i].children) {
            appendDom($divParent.children().last(), jsonData[i].children);
        }*/

        var $divParent  = $("<ul class=\"Container\">\n" +
            "  <li class=\"Node ExpandOpen\">\n" +
            "    <div class=\"Expand\"><i class=\"fa fa-chevron-circle-right\" aria-hidden=\"true\"></i></div>\n" +
            "    <div class=\"Content\"><span>   </span></div>\n" +
            "  </li>\n" +
            "</ul>\n");
        $divParent.attr('id',jsonData[i].name );
        $divParent.find('.Content').text(jsonData[i].name);
        if (jsonData[i].children) {
            appendElement($divParent.find('.Node'), jsonData[i].children);
        }
        container.append($divParent);
    }
}

function appendElementCheck(container, jsonData){
    for (var i = 0; i <jsonData.length; i++) {
        /*var $divParent  = $("<ul class='elem'><li></li></ul>");
        $divParent.children().last().text(jsonData[i].name).attr('id',jsonData[i].name );
        if (jsonData[i].children) {
            appendDom($divParent.children().last(), jsonData[i].children);
        }*/

        var $divParent  = $("<ul class=\"Container\">\n" +
            "  <li class=\"Node ExpandOpen\">\n" +
            "    <div class=\"Expand\"><input type=\"checkbox\" class=\"form-check-input\"></div>\n" +
            "    <div class=\"Content\"><span>   </span></div>\n" +
            "  </li>\n" +
            "</ul>\n");
        $divParent.attr('id',jsonData[i].name );
        $divParent.find('.Content').text(jsonData[i].name);
        if (jsonData[i].children) {
            appendElementCheck($divParent.find('.Node'), jsonData[i].children);
        }
        container.append($divParent);
    }
}





var json22 = {
    "name": "template",
    "organization": "all",
    "creationDate": "2021-04-01T20:28:57.776+00:00",
    "modifiedDate": "2021-04-01T20:28:57.776+00:00",
    "folderStructure": [
    {
        "name": "element1",
        "children": [
            {
                "name": "element1.1",
                "children": [
                    {
                        "name": "element1.1.1",
                        "children": null,
                        "creationDate": "2021-04-01T20:28:57.776+00:00",
                        "modifiedDate": "2021-04-01T20:28:57.776+00:00"
                    }
                ],
                "creationDate": "2021-04-01T20:28:57.776+00:00",
                "modifiedDate": "2021-04-01T20:28:57.776+00:00"
            },
            {
                "name": "element1.2",
                "children": null,
                "creationDate": "2021-04-01T20:28:57.776+00:00",
                "modifiedDate": "2021-04-01T20:28:57.776+00:00"
            }
        ],
        "creationDate": "2021-04-01T20:28:57.776+00:00",
        "modifiedDate": "2021-04-01T20:28:57.776+00:00"
    },
    {
        "name": "element2",
        "children": null,
        "creationDate": "2021-04-01T20:28:57.776+00:00",
        "modifiedDate": "2021-04-01T20:28:57.776+00:00"
    },
    {
        "name": "element3",
        "children": null,
        "creationDate": "2021-04-01T20:28:57.776+00:00",
        "modifiedDate": "2021-04-01T20:28:57.776+00:00"
    },
    {
        "name": "element4",
        "children": null,
        "creationDate": "2021-04-01T20:28:57.776+00:00",
        "modifiedDate": "2021-04-01T20:28:57.776+00:00"
    },
    {
        "name": "element5",
        "children": null,
        "creationDate": "2021-04-01T20:28:57.776+00:00",
        "modifiedDate": "2021-04-01T20:28:57.776+00:00"
    }
]
};

//////////////////При нажатии на шаблон виртуальных столов

var $templateDesktop;
var templateMarker = true;
$(document).on('click', '#template-point', function(e) {
    //По хорошему, тут нужно сначала отправить запрос. И есть вернется null отображать диалоговое окно
    //appendDom($('body'), json22.folderStructure);
    /*
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/template",
        success: function (response) {
            console.log(response);
            window.location.hash = '#templateDesktop';
            console.log('Привте');
            console.log(response.folderStructure);
            appendDom($('body'), response.folderStructure);
        },
        error: function (e) {
            alert('Ошибка сервера');
        },
        complete: function(){
            appendDom($('body'), json22.folderStructure);
        }
    });*/


    if (templateMarker) {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/template",
            success: function (response) {
                console.log(response);
                window.location.hash = '#templateDesktop';
                console.log('Привте');
                console.log(response.folderStructure);
                //appendDom($('body'), response.folderStructure);
                //$('body').append("<div class=\'content-template-list\'></div>");
                $('script:first').before("<div class=\'content-template-list content-width-2\'></div>");
                var ctl = $('body').children('.content-template-list');
                appendElement(ctl, response.folderStructure);
                $templateDesktop = $('body').find('.content-template-list');
                console.log(templateDesktop);
               // appendElement($('body'), response.folderStructure);
               // $('body').append("</div>");
            },
            error: function (e) {
                alert('Ошибка сервера');
            }
        });
    } else{
        if (confirm('Шаблон отсутствует. Хотите создать?')){
            console.log("страница");
            window.location.hash = "#createTemplate";
        } else{
            console.log("отмена");
        }
    }
});

///Шаблон виртуального стола, клик по элементу. Свернуть\развернуть список
$(document).on('click', '.Expand', function(e) {
    console.log($(e.target).parent());

        if ($(e.target).parent().children('.Node').hasClass('hide')){
            $(e.target).parent().children('.Node').show();
            $(e.target).parent().children('.Node').removeClass('hide');
        }
        else {
            $(e.target).parent().children('.Node').hide();
            $(e.target).parent().children('.Node').addClass('hide');
        }
});


//Клик по "Список вирутальных столов"
$(document).on('click', '#list-desktop-point', function(e) {
    window.location.hash = "#existingTables";
    $('body').append("<div class=\"content-width-2 table-desktop\">" +
        "<table class=\"table\">\n" +
        "  <thead>\n" +
        "    <tr>\n" +
        "      <th scope=\"col\">Название виртуального стола</th>\n" +
        "      <th scope=\"col\">Субподрядная организация</th>\n" +
        "      <th scope=\"col\">Дата создания</th>\n" +
        "      <th scope=\"col\"></th>\n" +
        "    </tr>\n" +
        "  </thead>\n" +
        "  <tbody>\n" +
        "    <tr>\n" +
        "      <th scope=\"row\"><a class=\"name-desktop\">Виртуальный стол 1</a></th>\n" +
        "      <td>Организация 1</td>\n" +
        "      <td>04.04.2021</td>\n" +
        "      <td><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i><ch> | </ch><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></td>\n" +
        "    </tr>\n" +
        "    <tr>\n" +
        "      <th scope=\"row\"><a class=\"name-desktop\">Виртуальный стол 2</a></th>\n" +
        "      <td>Организация 2</td>\n" +
        "      <td>03.04.2021</td>\n" +
        "      <td><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i><ch> | </ch><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></td>\n" +
        "    </tr>\n" +
        "    <tr>\n" +
        "      <th scope=\"row\"><a class=\"name-desktop\">Виртуальный стол 3</a></th>\n" +
        "      <td>Организация 3</td>\n" +
        "      <td>02.04.2021</td>\n" +
        "      <td><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i><ch> | </ch><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></td>\n" +
        "    </tr>\n" +
        "    <tr>\n" +
        "      <th scope=\"row\"><button id=\"create-desktop\" type=\"button\" class=\"btn btn-primary\">Создать новый <i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button></th>\n" +
        "      <td></td>\n" +
        "      <td></td>\n" +
        "      <td></td>\n" +
        "    </tr>\n" +
        "  </tbody>\n" +
        "</table>" +
        "</div>");
});

$(document).on('click', '.name-desktop', function(e) {
    window.location.hash = "#desktop";
});


//Клик на кнопку "Создать новый виртуальный стол"
$(document).on('click', '#create-desktop', function(e) {
   window.location.hash = "#createDesktop";
    console.log('Create desktop');
    $('script:first').before("<div class=\"content-width-2\">\n" +
        "    <div class=\"title-page\">\n" +
        "        <h2>Страница создания виртуального стола</h2>\n" +
        "    </div>\n" +
        "    <form>\n" +
        "        <div class=\"row\">\n" +
        "            <div class=\"col-6\">\n" +
        "                <div class=\"form-group\">\n" +
        "                    <label for=\"desktop-name\">Название</label>\n" +
        "                    <input type=\"text\" class=\"form-control\" id=\"desktop-name\" placeholder=\"Example input\">\n" +
        "                </div>\n" +
        "                <div class=\"form-group\">\n" +
        "                    <label for=\"desktop-organization\">Организация</label>\n" +
        "                    <input type=\"text\" class=\"form-control\" id=\"desktop-organization\" placeholder=\"Example input\">\n" +
        "                </div>\n" +
        "            </div>\n" +
        "            <div class=\"col-6\">\n" +
        "                <!--<div class=\"form-group\">\n" +
        "                    <label for=\"text-area-template\">Шаблон виртуального стола</label>\n" +
        "                    <textarea class=\"form-control\" id=\"text-area-template\" rows=\"10\"></textarea>\n" +
        "                </div>-->\n" +
        "                <div class=\"form-group\">\n" +
        "                    <div class=\"create-desktop-template\"></div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <div class=\"row\">\n" +
        "            <div class=\"col center\">\n" +
        "                <button id=\"save-desktop\" type=\"button\" class=\"btn btn-primary\">Сохранить</button>\n" +
        "                <button type=\"button\" class=\"btn btn-primary\">Отмена</button>\n" +
        "            </div>\n" +
        "            <div class=\"col\">\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </form>\n" +
        "</div>");
        appendElementCheck($(".create-desktop-template"), json22.folderStructure);

});

//При клике чекбокса в списка иерархии устанавливается класс на родительский ul
$(document).on('click', '.form-check-input', function(e) {
    if ($(e.target).prop('checked')){
        $(e.target).parent().parent().parent().addClass('checked');
    } else {
        $(e.target).parent().parent().parent().removeClass('checked');
    }
    //console.log($(e.target).parent().parent().parent());
});


//функция генерации массива из выбранной иехархии папок при создании виртуальног стола
var array = [];
function lili(parent, array){
    for (var i = 0; i < parent.length; i++){
            if (parent.eq(i).hasClass('checked')){

                var object = {
                    name: parent.eq(i).attr('id'),
                    children: []
                };
                array.push(object);
                //console.log(array);
                lili(parent.eq(i).children('li').children('ul'), array[i]['children']);
            }
    }
    return array;
}



//Клик на кнопку "Сохранить шаблон"
$(document).on('click', '#save-template', function(e) {
    window.location.hash = "#templateDesktop";
    //Тут должен быть Post завтрос отправляющий на бек шаблон виртуального стола
});
//Клик на кнопку "Отмена сохранения"
$(document).on('click', '#cancel-template', function(e) {
    window.location.hash = "#adminHomePage";
});
//Клик на кнопку "Сохранить виртуальный стол"
$(document).on('click', '#save-desktop', function(e) {
    array = [];
    console.log(lili($('.create-desktop-template').children('ul'), array));

    //Здесь должен быть подзапрос POST с отправкой, наименования, огранизации и структуры. Структура получается в lili
});




/*
$(document).on('click', '#save-desktop', function(e) {
    window.location.hash = "#desktop";
});
*/
//console.log($); // Проверка, загружена ли вообще jQuery

