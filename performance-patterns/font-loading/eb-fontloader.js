(function(w, d) {
    w.EB = w.EB || {};
    EB.renderFonts = function(fs) {
        var h = '', s = d.createElement('style');
        for (var i = 0, f; f = fs[i]; i++) {
            h += (
                "@font-face{font-family:'Benton Sans';font-weight:"+f.weight+";font-style:"+f.style+";"+
                "src:local('Benton Sans'),local('BentonSans'),url(data:application/font-woff;base64,"+f.base64+")format('woff');}"
            );
        }
        s.innerHTML = h;
        d.getElementsByTagName('head')[0].appendChild(s);
        document.documentElement.className += ' font-has-loaded';
    };
    if (w.localStorage) {
        var fs = JSON.parse(localStorage.getItem('benton-12-03-2014'));
        if (fs) { EB.renderFonts(fs) } else {
            EB.shouldRenderFonts = true;
            var s = d.createElement('script');
            s.src = "/static-dj/django/js/src/eb/fonts/benton.js";
            d.getElementsByTagName('head')[0].appendChild(s);
            setTimeout(function() {
                EB.shouldRenderFonts = false;
            }, 3000);
        }
    }
})(window, document);