var ref = document.getElementById('read');
var wv = document.getElementById('webview');
var table_list = new Array();
var loading = '<div class="loader"> <div class="loading_1"></div> <div class="loading_2">Finding DLMs</div> </div>'
ref.addEventListener('click', (event) => {
    loadData();
});

document.querySelector('#llm_table').addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === 'a') {
        var getID = event.target.id;
        window.electronAPI.send_id(getID);
    }
});

window.electronAPI.got_data("ping", (data) => {
    $('#llm_table').html(data);
    ref.disabled = false;
});

function loadData() {
    $('#llm_table').html(loading);
    window.electronAPI.refresh();
    ref.disabled = true;
};

$(document).ready(function(){
    loadData();
});

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