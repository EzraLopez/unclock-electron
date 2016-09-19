const electron = require('electron');
// Module to control application life.
const {app} = electron; // same as electron.app
// Module to create native browser window.
const {BrowserWindow} = electron; // same as electron.BrowserWindow

// Keep a global reference of the window object to avoid having the window
// closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 400});

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  //win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, windows are usually stored in an
    // array if the app supports multi windows, this is the time when
    // the corresponding element should be deleted.
    win = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win == null) {
    createWindow();
  }
})

// Include the rest of the app's specific main process code in this
// file or in separate files using require.
