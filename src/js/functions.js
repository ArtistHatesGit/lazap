let img;


function loadFile(event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
    img = event.target.files[0].path;

    ipcRenderer.send('update-profile', {
        username: document.getElementById('text').value,
        pfp: event.target.files[0].path,
    });
}

document.getElementById('text').addEventListener('change', (e) => {
    ipcRenderer.send('update-profile', {
        username: e.target.value,
        pfp: img,
    });
});

ipcRenderer.on('load-profile', (event, data) => {
    document.getElementById('output').src = data.pfp === 'default' ? '../img/default-profile.svg' : data.pfp;
    document.getElementById('text').value = data.username;
    if (!img) img = data.pfp;
});