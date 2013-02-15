var socket = io.connect(window.location.origin);

socket.on('error', function (err) {
    console.error(err);
});

socket.on('connect', function () {
    jQuery('#update').prepend('Me: <strong>Hi...</strong>' );
    socket.emit('hi');

    socket.on('init', function (data) {
        console.log(data);
        jQuery('#update').prepend('<p>&gt; ' + data.message.toString() + '</p>' );
    });
    
    socket.on('pgsql', function(data) {
        console.log(data);
        jQuery('#update').prepend(data.geometry.toString() + ' ' + data.properties.toString());
    });
});