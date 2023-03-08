var exit = document.getElementById('close');
var mini = document.getElementById('min');
var max = document.getElementById('max');
var eventsTab = document.getElementById('events');
var sequencesTab = document.getElementById('sequences');
var jobsTab = document.getElementById('jobs');
var settingsTab = document.getElementById('settings');
var deployTab = document.getElementById('deploy');
var eventFrame = document.getElementById('eventsframe');
var sequencesFrame = document.getElementById('sequencesframe');
var jobsFrame = document.getElementById('jobsframe');
var settingsFrame = document.getElementById('settingsframe');
var deployFrame = document.getElementById('deployframe');

eventFrame.onload = function() {
    eventFrame.style.height = eventFrame.contentWindow.document.body.scrollHeight + 'px';
}

sequencesFrame.onload = function() {
    sequencesFrame.style.height = sequencesFrame.contentWindow.document.body.scrollHeight + 'px';
}

jobsFrame.onload = function() {
    jobsFrame.style.height = jobsFrame.contentWindow.document.body.scrollHeight + 'px';
}
settingsFrame.onload = function() {
    settingsFrame.style.height = settingsFrame.contentWindow.document.body.scrollHeight + 'px';
}
deployFrame.onload = function() {
    deployFrame.style.height = deployFrame.contentWindow.document.body.scrollHeight + 'px';
}

function openControl(evt, ControlMethodName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(ControlMethodName).style.display = "block";
    evt.currentTarget.className += " active";
}
  
eventsTab.addEventListener('click', (event) => {
    var ifr=document.getElementsByName('eventsframe')[0];
    ifr.src=ifr.src;
    openControl(event, 'Events');
});

sequencesTab.addEventListener('click', (event) => {
    var ifr=document.getElementsByName('sequencesframe')[0];
    ifr.src=ifr.src;
    openControl(event, 'Sequences');
});

jobsTab.addEventListener('click', (event) => {
    var ifr=document.getElementsByName('jobsframe')[0];
    ifr.src=ifr.src;
    openControl(event, 'Jobs');
});

settingsTab.addEventListener('click', (event) => {
    var ifr=document.getElementsByName('settingsframe')[0];
    ifr.src=ifr.src;
    openControl(event, 'Settings');
});

deployTab.addEventListener('click', (event) => {
    var ifr=document.getElementsByName('deployframe')[0];
    ifr.src=ifr.src;
    openControl(event, 'Deploy');
});

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