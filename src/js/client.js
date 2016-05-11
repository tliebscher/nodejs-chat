$(document).ready(function(){
    // get websocket
    var socket = io.connect();
    // new message received
    socket.on('chat', function (data) {
        var time = new Date(data.time);
        $('#content').append(
            $('<li></li>').append(
                // time
                $('<span>').text('[' +
                    (time.getHours() < 10 ? '0' + time.getHours() : time.getHours())
                    + ':' +
                    (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes())
                    + '] '
                ),
                // name
                $('<b>').text(typeof(data.name) != 'undefined' ? data.name + ': ' : 'undefined name: '),
                // text
                $('<span>').text(data.text))
        );
        // scroll down
        $('body').scrollTop($('body')[0].scrollHeight);
    });
    // send text message
    function send(){
        // read input fields
        var name = $('#name').val();
        var text = $('#text').val();
        // send to socket
        socket.emit('chat', { name: name, text: text });
        // clear text input
        $('#text').val('');
    }
    // at click on send button
    $('#send').click(send);
    // of hitting the return key
    $('#text').keypress(function (e) {
        if (e.which == 13) {
            send();
        }
    });
});