var myName;

// page controls
$('#message-send').on('click', function () {
    var msg = $('#message-box').val();
    if (msg !== undefined && msg.length > 0) {
        myHubProxy.invoke('SendMessage', msg)
        $('#message-box').val('');
    }
});

// main proxy for this chat server
var myHubProxy = $.connection.hub.createHubProxy('GoatingHub');

// bind incoming messages to functions
myHubProxy.on('connected', function (msg) { addMemberToChat(msg); });
myHubProxy.on('chatName', function (msg) { console.log(msg); $('#main-chat-title').text(msg); })
myHubProxy.on('receiveMessage', function (msg) { addToChat(msg); });
myHubProxy.on('disconnected', function (msg) { addToChat(msg); })
myHubProxy.on('myName', function (msg) { myName = msg; });

$.connection.hub.start().done(function () {
    myHubProxy.invoke('Connected');
    myHubProxy.invoke('ChatName');
    myHubProxy.invoke('MyName')
});

// message, class
function addToChat(msg) {

    if (msg.substring(0, 5) === myName) {
        $('#chat-window').append('<div class="message-sent">' + msg + '</div><div class="message-received-time">' + getDate() + '</div></div>');
    }
    else {
        $('#chat-window').append('<div class="message-received"><div class="message-received-text">' + msg + '</div><div class="message-received-time">' + getDate() + '</div></div>');
    }
}

function addMemberToChat(msg) {
    $('#chat-window').append('<div class="message-new-member">' + msg + '</div>');
}

function getDate()
{
    var today = new Date(Date.now());
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return time;
}

window.onbeforeunload = function (e) {
    myHubProxy.invoke('Disconnect');
};