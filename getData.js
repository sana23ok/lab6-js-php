document.addEventListener('DOMContentLoaded', function () {
    getData();
    setInterval(getData, 60000);
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

    glitchData.forEach(function (obj, index) {
        //createGlitchObject(obj.text, obj.color, obj.shadowColor1, obj.shadowColor2, obj.time, obj.order, obj.marg, outputContainer);
        console.log(obj.text, obj.color, obj.shadowColor1, obj.shadowColor2, obj.time, obj.order, obj.marg, outputContainer);
    });
}
