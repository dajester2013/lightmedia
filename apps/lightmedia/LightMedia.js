const EventEmitter = require("events");
const electron = require("electron");
const {BrowserWindow, app} = electron;
const fs = require("fs");
const lowdb = require("lowdb");
const fileAsync = require("lowdb/lib/file-async")
const dbdefaults = require("./DefaultDb");

// SYMBOLS
const S_DB                  = Symbol();

const S_LIGHTMEDIA_DIR      = Symbol();
const S_REPORTS_DIR         = Symbol();
const S_LIBRARY_DIR         = Symbol();

const S_DISPLAY_PRIMARY     = Symbol();
const S_DISPLAY_SECONDARY   = Symbol();
const S_DISPLAY_TERTIARY    = Symbol();


// KEYS
const KEY_DISPLAY_PRIMARY   = "primary";
const KEY_DISPLAY_SECONDARY = "secondary";
const KEY_DISPLAY_TERTIARY  = "tertiary";


// PRIVATE METHODS
function loadDirectories() {
    app[S_LIGHTMEDIA_DIR]  = app.getPath("home") + "/.lightmedia";
    app[S_REPORTS_DIR]     = app[S_LIGHTMEDIA_DIR] + "/reports";
    app[S_LIBRARY_DIR]     = app[S_LIGHTMEDIA_DIR] + "/library";

    // ensure the directories exist
    
    fs.mkdir(app[S_LIGHTMEDIA_DIR], "0755", err=>{
        if (err && err.code != "EEXIST") throw err;
    });
    fs.mkdir(app[S_REPORTS_DIR], "0755", err=>{
        if (err && err.code != "EEXIST") throw err;
    });
    fs.mkdir(app[S_LIBRARY_DIR], "0755", err=>{
        if (err && err.code != "EEXIST") throw err;
    });
}

function loadDatabase() {
    app[S_DB] = lowdb(app[S_LIGHTMEDIA_DIR] + "/lightmedia.db",{
        storage: fileAsync
    });
    
    app[S_DB].defaults(dbdefaults).value();
}

function loadDisplays() {
    app[S_DISPLAY_PRIMARY] = electron.screen.getPrimaryDisplay();
    
    let nonprimaries = electron.screen.getAllDisplays().filter(d => d.id != app[S_DISPLAY_PRIMARY].id);

    app[S_DISPLAY_SECONDARY] = nonprimaries.length ? nonprimaries[0] : app[S_DISPLAY_PRIMARY];
    app[S_DISPLAY_TERTIARY] = nonprimaries.length>1 ? nonprimaries[1] : app[S_DISPLAY_SECONDARY];
}

function loadApps(lm) {
    require("../console/app").start();
}

// PUBLIC INTERFACE
module.exports = new class LightMedia extends EventEmitter {
    start() {
        this.windows = {};

        loadDirectories(); 
        loadDatabase(); 
        loadDisplays();
        loadApps();

        //TODO: reload displays if numbers changed...

        this.emit("started", this);
    }

    getDisplay(display) {
        switch(display) {
            case KEY_DISPLAY_PRIMARY: return app[S_DISPLAY_PRIMARY];
            case KEY_DISPLAY_SECONDARY: return app[S_DISPLAY_SECONDARY];
            case KEY_DISPLAY_TERTIARY: return app[S_DISPLAY_TERTIARY];

            default:
                display = paresInt(display);
                let all = electron.screen.getAllDisplays();
                
                return (display > all.length)   ? all.length
                                                : all[display];

        }
    }

    readSetting(setting) {
        return app[S_DB].get(`settings.${setting}`).value();
    }

    updateSetting(setting, value) {
        value || null;
        app[S_DB].set(`settings.${setting}`, value).value();
    }

    registerWindow(name, window) {
        this.windows[name] = window;
    }
}