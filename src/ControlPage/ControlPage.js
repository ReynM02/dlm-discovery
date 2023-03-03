var exit = document.getElementById('close');
var mini = document.getElementById('min');
var max = document.getElementById('max');

exit.addEventListener('click', (event) => {
    window.electronAPI.closeWin();
    console.log("clicked");
});

mini.addEventListener('click', (event) => {
    window.electronAPI.minWin();
    console.log("clicked");
});

max.addEventListener('click', (event) => {
    window.electronAPI.maxWin();
    console.log("clicked");
    
});