var ref = document.getElementById('read');
var wv = document.getElementById('webview');
ref.addEventListener('click', (event) => {
    loadData();
});

function loadData() {
    data = window.electronAPI.refresh();
    $('#llm_table').html(data);
}

$(document).ready(function(){
    loadData();
});

var exit = document.getElementById('close');
var mini = document.getElementById('min');
var max = document.getElementById('max');
var fullScreen = false;

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