const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { table } = require('console');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "./src/images/SVLICON.ico",
    minWidth: 375,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  Menu.setApplicationMenu(null)

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


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on('refresh', (event) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
    const data = fs.readFileSync('./src/controllerList.csv', {encoding:'utf-8', flag:'r'});
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
                table_data += '<td>'+'<a href="http://' +cell_data[cell_count]+'/LLMControl.html" style="height:100%;width:100%">'+ cell_data[cell_count] + '</a>' +'</td>' ;
            }
            else
            {
                table_data += '<td>'+cell_data[cell_count]+'</td>';
            }
        }
    }
    table_data += '</table>';
    event.returnValue = table_data;
    //let $ = require('cheerio').load('./index.html');
    //$('#llm_table').html(table_data);
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
  if(win.fullScreen == true){
    win.fullScreen = false;
  }else{
    win.fullScreen = true;
  }
});
