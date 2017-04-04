// When the user hits return, send the "text-entered"
// message to main.js.
// The message payload is the contents of the edit box.
var set = document.getElementById("set");
var unset = document.getElementById("unset");
set.addEventListener("click", function(){
    var proxy = document.getElementById("proxy").value;
    var port = document.getElementById("port").value;
    var data =  [proxy, port];
    self.port.emit("text-entered", data);
},false);

unset.addEventListener("click", function(){
    var data = ["unset"];
    self.port.emit("text-entered", data);
},false);

// Listen for the "show" event being sent from the
// main add-on code. It means that the panel's about
// to be shown.
//
// Set the focus to the text area so the user can
// just start typing.
self.port.on("show", function onShow() {
    set.focus();
});
