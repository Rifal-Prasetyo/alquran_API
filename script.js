// $.ajax({
//     url: 'https://al-quran-8d642.firebaseio.com/data.json?print=pretty',
//     succes: results => {
//         let cards = '';
//         results.forEach( q => {
//             cards += `<div class="col-md-4">
//                         <div class="card" style="width: 18rem;">
//                             <div class="card-body">
//                             <h5 class="card-title">${q.asma}</h5>
//                             <p class="card-text text-muted">${q.arti}</p>
//                             <a href="#" class="btn btn-primary">Buka Surat</a>
//                             </div>
//                         </div>
//                     </div>`
//         });
//         console.log(results);
//         $('.quran').html(cards);
//     },
//     error: (e) => {
//         console.log(e.responeText)
//     }
// });

function getAllSurah(url, succes, error){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                succes(xhr.response)
            }
        } else {
            error();
        }
    }
    xhr.open('get', url, true);
    xhr.send();
}

function getSurah(surat, succes, error){
    let get = `https://al-quran-8d642.firebaseio.com/surat/${surat}.json?print=pretty`
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                succes(xhr.response)
            }
        } else {
            error();
        }
    }
    xhr.open('get', get, true);
    xhr.send();
}

getAllSurah('https://al-quran-8d642.firebaseio.com/data.json?print=pretty', (result) => {
    let results = JSON.parse(result);
    let cards = '';
    results.forEach(m => {
        cards += `<div class="col-md-4">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                        <h5 class="card-title">${m.asma}</h5>
                        <p class="card-text text-muted">${m.arti}</p>
                        <a  onclick=(tampilSurah(${m.nomor})) class="btn btn-primary">Buka Surat</a>
                        </div>
                    </div>
                </div>`
    });
    let target = document.querySelector('.quran');
    target.innerHTML = cards;

}, (e) => {
    console.log(e.responeText);
})

function tampilSurah(surat) {
    getSurah(surat, (result) => {
        document.querySelector('.quran').style.display = 'none';
        document.querySelector('.surat').style.display = 'block';
        const suratTampil = JSON.parse(result);
        let tampil = '';
        suratTampil.forEach(s => {
            tampil += `<div class="alert alert-light" role="alert">
                            ${s.ar} <br>
                            arti : ${s.id} <br>
                            ${s.tr}
                        </div>`
        let target = document.querySelector('.surat');
        target.innerHTML = tampil;
        })
    }, () => {

    })
}