document.addEventListener('DOMContentLoaded', function () {
    getData();
    setInterval(getData, 5000);
});

function getData() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "get_collected_glitch_data.php", true);
    let retrievedData;
    xhr.onload = function () {
        if (xhr.status === 200) {
            retrievedData = JSON.parse(xhr.responseText);
            console.log("Glitch object data retrieved successfully:", retrievedData);

            // Handle the retrieved data as needed
            displayGlitchData(retrievedData);
        } else {
            console.error("Error while retrieving glitch object data");
        }
    };

    xhr.send();
}

function displayGlitchData(glitchData) {
    let outputContainer = document.getElementById('outputContainer');
    console.log(glitchData);
    const container=document.querySelector('#outputContainer');
    outputContainer.innerHTML = '';

    for(let obj in glitchData){
        console.log(glitchData[obj]);

        createGlitchObject(glitchData[obj].text, glitchData[obj].color, glitchData[obj].shadowColor1, glitchData[obj].shadowColor2,glitchData[obj].time, glitchData[obj].order, glitchData[obj].marg, container);
        addGlitchKeyframe(glitchData[obj].shadowColor1, glitchData[obj].shadowColor2);
        // const div = document.createElement('div')
        // div.className='container';
        // div.innerHTML = glitchData[obj];
        // outputContainer.append(div);
    }

    // glitchData.forEach(function (obj, index) {
    //     //createGlitchObject(obj.text, obj.color, obj.shadowColor1, obj.shadowColor2, obj.time, obj.order, obj.marg, outputContainer);
    //     console.log(obj.text, obj.color, obj.shadowColor1, obj.shadowColor2, obj.time, obj.order, obj.marg, outputContainer);
    // });
}
