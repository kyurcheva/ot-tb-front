'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('home', 'home.html', true),
            new Route('about', 'about.html'),
            new Route('hello','hello.html'),
            new Route('authorization', 'authorization.html'),
            new Route('adminHomePage', 'adminHomePage.html'),
            new Route('OTTBHomePage', 'OTTBHomePage.html')
        ]);
    }
    init();
}());

/*Отослать запрос к базе*/
