const electron = require('electron');
const LightMedia = require('../lightmedia/LightMedia');
const {BrowserWindow} = electron;

module.exports = class ConsoleApp extends BrowserWindow {
    static start() {
        LightMedia.registerWindow("console", new ConsoleApp());
    }

    constructor() {
        super({
            center:true
        });

        this.loadURL(`file:///${__dirname}/index.html`);
    }

};