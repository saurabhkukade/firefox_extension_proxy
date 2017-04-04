var data = require("sdk/self").data;
var services = require("sdk/preferences/service");
// Construct a panel, loading its content from the "text-entry.html"
// file in the "data" directory, and loading the "get-text.js" script
// into it.
var text_entry = require("sdk/panel").Panel({
    contentURL: data.url("text-entry.html"),
    contentScriptFile: data.url("get-text.js")
});

// Create a button
require("sdk/ui/button/action").ActionButton({
    id: "show-panel",
    label: "Show Panel",
    icon: {
	"16": "./icon-16.png",
	"32": "./icon-32.png",
	"64": "./icon-64.png"
    },
    onClick: handleClick
});

// Show the panel when the user clicks the button.
function handleClick(state) {
    text_entry.show();
}

// on click add-on icon, panel will be dispalyed
text_entry.on("show", function() {
    text_entry.port.emit("show","saurabh");
});

// Called when data will be returned.
// param 1: unset or (proxy adress,port) :: [String]
text_entry.port.on("text-entered", function (data) {
    if(data[0] != "unset"){
	console.log("setting proxy = ",data[0],data[1]);
	set_proxy(data[0],parseInt(data[1]));
    }
    else{
	console.log("calling unset_proxy");
	unset_proxy();
    }
    text_entry.hide();
});


//set proxy will be called if user wants to set proxy
// param: 1. server_ip :: String
// param: 2. server_ip :: Int
//this function will set the proxy
function set_proxy(server_ip, server_port){
    services.set('network.proxy.type',1);
    services.set('network.proxy.http',server_ip);
    services.set('network.proxy.http_port',server_port);
    console.log("proxy is set");
    return true;
}

//set proxy will be called if user wants to clear proxy
//This function will clear the proxy and will set to 'use
//system proxy.

function unset_proxy(){
    services.set('network.proxy.type',5);
    console.log("proxy is unset");
    return true;
}
