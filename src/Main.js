import electron from "electron";
import LightMedia from "./apps/lightmedia/LightMedia";

function main() {
    LightMedia.start();
}

electron.app.on('ready', main);