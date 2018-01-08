var myName;

var transport = signalR.TransportType.WebSockets;
var connection = new signalR.HubConnection('/goatingChat');
    //new signalR.HubConnection('http://' + document.location.host + '/goatingChat', { transport: transport });


// page controls
$('#message-send').on('click', function () {
    var msg = $('#message-box').val();
    if (msg !== undefined && msg.length > 0) {
        connection.invoke('SendMessage', msg)
        $('#message-box').val('');
        addMyMessageToChat(msg)
    }
});

// bind incoming messages to functions
connection.on('connected', function (msg) { addRemoveMemberToChat(msg); });
connection.on('chatName', function (msg) { $('#main-chat-title').text(msg); })
connection.on('receiveMessage', function (msg) { addToChat(msg); });
connection.on('disconnected', function (msg) { addRemoveMemberToChat(msg); })
connection.on('myName', function (msg) { myName = msg; });

connection.start().then(function () {
    connection.invoke('Connected');
    connection.invoke('ChatName');
    connection.invoke('MyName')
});

// message, class
function addToChat(msg) {
    /// <summary>Adds a received message to the active chat.</summary>  
    /// <param name="msg" type="string">The message to add.</param>  
    $('#chat-window').append('<div class="message-received"><div class="message-received-text"><i class="fa fa-user-secret" aria-hidden="true"></i>' + msg + '</div><div class="message-time">' + getDate() + '</div></div>');
}

function addMyMessageToChat(msg) {
    /// <summary>Adds a sent message to the active chat.</summary>  
    /// <param name="msg" type="string">The message to add.</param> 
    $('#chat-window').append('<div class="message-sent"><div class="message-sent-text"><i class="fa fa-user-secret" aria-hidden="true"></i>' + myName + ': ' + msg + '</div><div class="message-time">' + getDate() + '</div></div>');
}

function addRemoveMemberToChat(msg) {
    /// <summary>Adds a member added or removed to the active chat.</summary>  
    /// <param name="msg" type="string">The message to add.</param>  
    $('#chat-window').append('<div class="message-new-member">' + msg + '</div>');
}

function getDate() {
    /// <summary>Gets a hh:mm:ss time stamp</summary>
    /// <returns type="string">Time stamp</returns>  
    var today = new Date(Date.now());
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return time;
}

window.onbeforeunload = function (e) {
    connection.invoke('Disconnect');
};