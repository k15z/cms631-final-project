var Logger = {};

Logger.ip_info = {};
$.getJSON('//freegeoip.net/json/?callback=?', function (ip_info) {
    Logger.ip_info = ip_info;
});

Logger.navigator = {};
for (var i in navigator) Logger.navigator[i] = navigator[i];

Logger.log = function (data) {
    var event = {};
    event.data = data;
    event.context = {};
    event.context.ip_info = Logger.ip_info;
    event.context.location = window.location;
    event.context.navigator = Logger.navigator;
    event.context.timestamp = new Date().toLocaleString();
    console.log(event);

    // temporary endpoint for storage
    $.get("https://api.myjson.com/bins/toguh", function (arr) {
        arr.push(event);
        $.ajax({
            url: 'https://api.myjson.com/bins/toguh',
            type: 'PUT',
            data: JSON.stringify(arr),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
        });
    })
};