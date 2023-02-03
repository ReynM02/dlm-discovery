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