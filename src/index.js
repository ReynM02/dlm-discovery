const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { table } = require('console');
const {spawn} = require('child_process');
var connected_ip = '';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: path.join(__dirname, 'images/SVLICON.ico'),
    minWidth: 550,
    show: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const splash = new BrowserWindow({
    width: 810,
    height: 250,
    transparent: true,
    icon: path.join(__dirname, 'images/SVLICON.ico'),
    resizable: false,
    frame: false,
    alwaysOnTop: true
  });
  splash.loadURL(path.join(__dirname, 'splash.html'));
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  Menu.setApplicationMenu(null);
  mainWindow.once('ready-to-show', () => {
    sleep(1300).then(() => {
      splash.destroy();
      mainWindow.show();
    });
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('sent_id', (event, id) => {
  console.log(id);
  connected_ip = id;
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on('refresh', (event) => {
  const webContents = event.sender
  const python = spawn(path.join(__dirname, 'findIPs/findIPs.exe'));
  python.stderr.on("data", (data) => {
    console.error(data.toString())
  })
  python.on('close', (code) => {
    const data = fs.readFileSync(path.join(__dirname, 'findIPs/controllerList.csv'), {encoding:'utf-8', flag:'r'});
    var employee_data = data.split(/\r?\n|\r/);
    var table_data = '<table class="table table-bordered table-striped">';
        table_data += '<th>'+"IP Address"+'</th>';
        table_data += '<th>'+"MAC Address"+'</th>';
        table_data += '<th>'+"Description"+'</th>';

    for(var count = 0; count<employee_data.length-1; count++)
    {
        table_data += '</tr>';
        var cell_data = employee_data[count].split(",");

        for(var cell_count=0; cell_count<cell_data.length; cell_count++)
        {
            if (cell_count === 0 )
            {
                //figure out the link here to the web page here
                //table_data += '<td>'+'<a href="http://DLM:dlmconfig@' +cell_data[cell_count]+'/LLMControl.html" target="_blank" rel="noopener noreferrer" style="height:100%;width:100%">'+ cell_data[cell_count] + '</a>' +'</td>' ;
                table_data += '<td>'+'<a id="'+ cell_data[cell_count] +'" href="./ControlPage/DLMControlpage.html">'+ cell_data[cell_count] + '</a>' +'</td>' ;
            }
            else
            {
                table_data += '<td>'+cell_data[cell_count]+'</td>';
            }
        }
    }
    table_data += '</table>';
    webContents.send('ping', table_data);
    //event.returnValue = table_data;
  });

});

ipcMain.on('closeWin', (event) => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});

ipcMain.on('minWin', (event) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.minimize();
});

ipcMain.on('maxWin', (event) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  if(win.isMaximized == true){
    win.b 
  }else{
    win.maximize();
  }
});
