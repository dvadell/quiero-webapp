import { toHtml } from './markdown.js';

let quiero = {}
const getDescription = (title) => {
    fetch('/api/v1/' + title)
             .then( (res) => res.json())
             .then( (json) => {
                quiero  = {...json[0], title: title}
                // document.getElementById('description').innerHTML = toHtml(json[0].description);
                // document.getElementById('pros').innerHTML = toHtml(json[0].pros);
                // document.getElementById('cons').innerHTML = toHtml(json[0].cons);
                document.getElementById('description').innerHTML = toHtml(quiero.description);
                document.getElementById('pros').innerHTML = toHtml(quiero.pros);
                document.getElementById('cons').innerHTML = toHtml(quiero.cons);
             })
}

const getRawData = (title) => {
    return fetch('/api/v1/' + title)
             .then( (res) => res.json())
}

const putRawData = (data) => {
    console.log(data)
    fetch('/api/v1/' + title, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(data)
    })
}

title = document.getElementById('title').innerText;
getDescription(title);

['description', 'pros', 'cons'].forEach( m => {
    document.getElementById(m + '-icon').onclick = e => {
        let element = document.getElementById(m)
        let icon    = document.getElementById(m + '-icon')
        if (icon.classList.contains('fa-edit')) {
            console.log('Clicked Edit', m)
            getRawData(title).then( json => {
                element.innerHTML = '<textarea name="' + m + '" class="form-control">' + quiero[m] + '</textarea>'
                icon.className = 'fa fa-upload'
            })
        } else {
            // upload icon clicked
            console.log('Clicked Upload', m)
            quiero[m] = document.getElementById(m).children[0].innerHTML
            putRawData(quiero)
            icon.className = 'fa fa-edit'
        }
    }
})

