document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const albumID = urlParams.get('id');
    if (albumID) {
        fetch("albums.csv")
            .then(response => response.text())
            .then(csvData => {
                Papa.parse(csvData, {
                    header: true,
                    complete: function(result) {
                        const album = result.data.find(item => item.id === albumID);
                        if (album) {
                            document.getElementById('title').innerHTML = `<h2>${album.title}</h2>`;
                            document.getElementById('description').innerHTML = `<p>${album.description}</p>`;
                            LoadImagePanel(album.id);
                        }
                    }
                });
            })
            .catch(error => console.error('Ошибка при загрузке CSV-файла:', error));
    }
});

function LoadImagePanel(albumID) {
    fetch("photos.csv")
        .then(response => response.text())
        .then(data => {
            Papa.parse(data, {
                header: true,
                complete: function(results) {
                    results.data
                        .filter(photo => photo.album_id === albumID)
                        .forEach(photo => {
                            let newThumb = document.createElement('div');
                            newThumb.className = "thumb";
                            newThumb.innerHTML = `<a href="view?id=${photo.id}">
                                <img src="images/thumbnails/${photo.album_id}/${photo.id}.jpg">
                            </a>`;
                            thumbsPanel.append(newThumb);
                        })
                }
            })
        })
        .catch(error => console.error('Ошибка при загрузке CSV-файла:', error));
}