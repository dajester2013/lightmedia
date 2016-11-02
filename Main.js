const electron = require("electron");
const {BrowserWindow, app, Menu} = electron;
const LightMedia = require("./apps/lightmedia/LightMedia");

function main() {
    LightMedia.start();
}

app.on('ready', main);