document.cookie = "myCookie=myValue; SameSite=None; Secure";

function nextPh(n) {
    location.href = "view?id="+n;
}

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const imageID = urlParams.get('id');
    if (imageID) {
        fetch("photos.csv")
            .then(response => response.text())
            .then(csvData => {
                Papa.parse(csvData, {
                    header: true,
                    complete: function(result) {
                        const photo = result.data.find(item => item.id === imageID);
                        if (photo) {
                            LoadImage();
                            let leftA = document.createElement('div');
                            leftA.id = 'left-arrow';
                            picture.append(leftA);
                            let rightA = document.createElement('div');
                            rightA.id = 'right-arrow';
                            picture.append(rightA);
                            const imgNum = Number(imageID);
                            if (imgNum > 1) {
                                leftA.addEventListener('click', function () {
                                    nextPh(imgNum - 1);
                                });
                                leftA.style.cursor = 'pointer';
                            } else {
                                leftA.style.backgroundImage = 'url(images/left_de.png)';
                            }
                            if (imgNum < 37) /* очевидный костыль */ {
                                rightA.addEventListener('click', function () {
                                    nextPh(imgNum + 1);
                                });
                                rightA.style.cursor = 'pointer';
                            } else {
                                rightA.style.backgroundImage = 'url(images/right_de.png)';
                            }
                            
                            picture.insertAdjacentHTML('afterend', `<p><a href="album?id=${photo.album_id}">Вернуться в альбом</a></p>`);
                            
                            if (photo.full_url) {
                                picture.insertAdjacentHTML('afterend', `<p><a href="https://drive.google.com/uc?export=view&id=${photo.full_url}">Скачать фулл</a></p>`);
                            } else {
                                picture.insertAdjacentHTML('afterend', `<p>У этого изображения нет фулла, либо оно само является фуллом.</p>`);
                            }

                            function LoadImage() {
                                let pic = document.createElement('img');
                                pic.src = `https://drive.usercontent.google.com/download?id=${photo.url}&export=view`;

                                pic.onload = function() {
                                    document.getElementById('loading').style.display = 'none';
                                    picture.append(pic);
                                };

                                pic.onerror = function() {
                                    document.getElementById('loading').style.display = 'none';
                                    report = document.createElement('p');
                                    report.innerHTML = `Шо-то у вас не в порядке. Попробуйте открыть ссылку вручную: <a href=${pic.src}>ссылка</a>`;
                                    picture.append(report);
                                }
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Ошибка при загрузке CSV-файла:', error));
    } else {
        document.getElementById('picture').innerHTML = `<p>При отправке параметра "id" здесь появится пикча.</p>`;
    }
});
