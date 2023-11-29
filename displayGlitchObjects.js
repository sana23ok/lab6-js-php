document.addEventListener('DOMContentLoaded', function() {
    // Read collected glitch data from the file
    fetch('collected_glitch_data.json')
        .then(response => response.json())
        .then(data => displayGlitchObjects(data))
        .catch(error => console.error('Error fetching JSON:', error));
});

function displayGlitchObjects(glitchData) {
    let outputContainer = document.getElementById('outputContainer');

    glitchData.forEach(function (obj, index) {
        createGlitchObject(obj.text, obj.color, obj.shadowColor1, obj.shadowColor2, obj.time, obj.order, obj.marg, outputContainer);
    });
}
