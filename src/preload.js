// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
    refresh: () => ipcRenderer.send('refresh'),
    closeWin: () => ipcRenderer.send('closeWin'),
    minWin: () => ipcRenderer.send('minWin'),
    maxWin: () => ipcRenderer.send('maxWin'),
    got_data: (channel, func) =>{
        let validChannels = ['ping'];
        if (validChannels.includes(channel)) {
          ipcRenderer.on(channel, (event, data) => func(data))
        }
    } 
});
  // we can also expose variables, not just functions
