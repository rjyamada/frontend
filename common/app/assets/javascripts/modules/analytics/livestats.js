/*global Event:true */
define(['modules/storage'], function (storage) {

    var Session = function () {
        
        var key = 'gu.session',
            isNewSession = function () {
                if (window.sessionStorage && !!window.sessionStorage.getItem(key)) {
                    return false;
                } else {
                    window.sessionStorage.setItem(key, "true");
                    return true;
                }
            };

        return {
            isNewSession: isNewSession
        };
    };

    var LiveStats = function (config) {

        var c = config || {},
            url = config.beaconUrl,
            path = '/px.gif',
            body = document.body,
            platform = 'nextgen',
            sessionLength = 30,
            createImage = function(url) {
                var image = new Image();
                image.id = 'js-err';
                image.className = 'u-h';
                image.src = url;
            },
            makeUrl = function(properties) {
                var query = [];
                for (var name in properties) {
                    query.push(name + '=' + encodeURIComponent(properties[name]));
                }
                return url + path + '?' + query.join('&');
            },
            log = function() {
                if (new Session().isNewSession()) {
                    url += makeUrl({ type: 'session', platform: platform });
                } else {
                    url += makeUrl({ type: 'view', platform: platform });
                }
                createImage(url);
            };

        return {
            log: log
        };

    };

    return LiveStats;
});