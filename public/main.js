const { app, BrowserWindow } = require('electron')
const socket = require('./sockets')
const path = require('path')
const url = require('url');

function createWindows () {
  // Create the browser window.
  const winBack = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  })

  const winFront = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  })

  const startUrl = app.isPackaged
  ? url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  : "http://localhost:3000";

  //load the index.html from a url
  winBack.loadURL(startUrl + '?monitor=back');
  winFront.loadURL(startUrl);
  // Open the DevTools.
  if (!app.isPackaged) {
    winFront.webContents.openDevTools()
    winBack.webContents.openDevTools()
  }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {  
  createWindows();
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    // createWindows()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.