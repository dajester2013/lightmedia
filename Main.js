const electron = require("electron");
const {BrowserWindow, app} = electron;

function main() {
    app.windows = {};

    app.windows.console = new BrowserWindow({});

    app.windows.stage = new BrowserWindow({frame: false});

    app.windows.words = new BrowserWindow({transparent: true, frame: false, parent: app.windows.stage});

    app.windows.console.on('closed', $=>app.quit());

/*    app.windows.alerts.maximize();*/

    app.windows.stage.webContents.executeJavaScript('document.write("stage")');
    app.windows.words.webContents.executeJavaScript('document.write("<br />words")');
 /*   app.windows.alerts.webContents.executeJavaScript('document.write("<br /><br />alerts")');*/

    /*app.windows.stage.hide();
    app.windows.words.hide();
    app.windows.alerts.hide();*/

    app.windows.console.loadURL('http://google.com');
    app.windows.stage.loadURL('data:text/html,stage');
    app.windows.words.loadURL('data:text/html,<style>* {background:orange;}</style><br />words');
    /*app.windows.alerts.loadURL('data:text/html,<br /><br />alerts');*/
    app.windows.console.openDevTools();
    app.windows.console.setPosition(electron.screen.getPrimaryDisplay().workArea.x, 0);

    
    app.windows.words.maximize();
    app.windows.stage.maximize();
    app.windows.words.focus();

    app.windows.console.maximize();
}

app.on('ready', main);