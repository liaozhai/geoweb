(function () {
    'use strict';

    function message(msg) {                    
        alert(msg);
    }

    window.addEventListener('load', function() {
        var btn = document.getElementById('button');
        btn.addEventListener('click', function() {
            var t = document.getElementById('text');
            message(t.value);
        });    
    });

})();
//# sourceMappingURL=index.js.map
