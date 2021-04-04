'use strict';

(function () {
    function init() {
        var router = new Router([
            //new Route('home', 'home.html', true),
            new Route('authorization', 'authorization.html', true),
            new Route('adminHomePage', 'adminHomePage.html'),
            new Route('OTTBHomePage', 'OTTBHomePage.html'),
            new Route('templateDesktop', 'templateDesktop.html'),
            new Route('createTemplate', 'createTemplate.html'),
            new Route('existingTables', 'existingTables.html'),
            new Route('createDesktop', 'createDesktop.html'),
            new Route('desktop', 'desktop.html')
        ]);
    }
    init();
}());

/*Отослать запрос к базе*/

