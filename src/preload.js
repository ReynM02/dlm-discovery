// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
    refresh: () => ipcRenderer.sendSync('refresh'),
    closeWin: () => ipcRenderer.send('closeWin'),
    minWin: () => ipcRenderer.send('minWin'),
    maxWin: () => ipcRenderer.send('maxWin')
});
  // we can also expose variables, not just functions
