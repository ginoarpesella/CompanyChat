var site_module = function () {
    var one;

    function init() {
        $('#message-box').focus();
    }

    function updateScroll() {
        var element = document.getElementById('chat-scroll');
        element.scrollTop = element.scrollHeight;
    }

    return {
        init: init,
        updateScroll: updateScroll
    }
}();

$(document).ready(function () {
    site_module.init();
});

