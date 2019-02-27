
let put = function(filename){
let fileElement = document.getElementById(`put-${filename}`);

    let file = fileElement.files[0];
    let reader = new FileReader();
    let fileByteArray = [];
    reader.readAsArrayBuffer(file);
    reader.onloadend = function (evt) {
        if (evt.target.readyState === FileReader.DONE) {
            let arrayBuffer = evt.target.result,
                array = new Uint8Array(arrayBuffer);
            for (let i = 0; i < array.length; i++) {
                fileByteArray.push(array[i]);
            }
        }
        let uint8 = new Uint8Array(fileByteArray);
        console.log(uint8);
        let blob =new Blob([uint8]) ;
        console.log(blob.size);
        let xhr = new XMLHttpRequest();
        xhr.open('PUT',`/files/${filename}`,true);
        console.log(blob);
        xhr.send(blob);
    };





};

generateList = function (file) {
    let buttons = `<td>
        <form action='/files/${file.name}' method='get'>
            <input style="display: none" type="submit" id='post-${file.name}'> 
            <label for='post-${file.name}'>
                <i class=\"fas fa-download\"></i>
            </label>
        </form>
                </td>` +
        `<td>
                
                <input type="file" id="put-${file.name}" name="put-file">
                <input onclick="put('${file.name}')" type="submit">
                <i class="fas fa-pen"></i>
                </td>` +


        `<td>
         //Add to file (POST)
        <form action='/files/${file.name}' method='post'>
            <input type=\"file\" id='post-${file.name}'> 
            <label for='post-${file.name}'>
                <i class=\"fas fa-plus-circle\"></i>
            </label>
            <input type='submit'>
        </form>
        </td>` +


        `<td onclick='copy(${file.name})' >
        <input type="file" id="copy-"${file.name}>
        
        <i class=\"far fa-copy\"></i></td>` +
        "<td><i class=\"fas fa-people-carry\"></i></td>";
    let timeModified = new Date(file['modified']);
    let size = file.size + ' bytes';
    if (file.size > 1024) {
        size = Math.trunc(file.size / 1024) + ' kb'
    }
    if (file.size / 1024 > 1024) {
        size = Math.trunc(file.size / (1024 * 1024)) + " mb";
    }
    let obj = $(buttons);
    obj.attr("filename", file.name);
    let tableRow = $("<tr></tr>").addClass(file["type"]);

    tableRow.append(`<td>${file.name}</td>`)
        .append(`<td>${size}</td>`).append(`<td>${timeModified.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })}</td>`).append(obj);
    $('tbody').append(tableRow)

};
$.ajax({
    url: '/files',
    dataType: 'json',
    jsonpCallback: 'MyJSONPCallback', // specify the callback name if you're hard-coding it
    success: function (data) {
        console.log(data);
        data['fileList'].forEach((item, i) => {
            generateList(item);
            //  $('ul').append(`<li>${JSON.stringify(item)}</li>`)
        })

    }
});

