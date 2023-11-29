import { saveObjectFormsData } from './collectData.js';

function createObjectForms() {
    // Get the number of objects from the main form
    let numberOfObjects = parseInt(document.getElementById('numberOfObjects').value);

    // Get the container for object forms
    let objectFormsContainer = document.getElementById('objectFormsContainer');

    let previousButtonContainer = document.getElementById('buttonContainer');
    let previousGlitchContainer = document.getElementById('outputContainer');
    if (previousButtonContainer) {
        previousButtonContainer.remove();
    }

    // if (previousGlitchContainer) {
    //     previousGlitchContainer.remove();
    // }

    // Clear previous content
    objectFormsContainer.innerHTML = '';

    for (let i = 1; i <= numberOfObjects; i++) {
        let objectForm = document.createElement('form');
        objectForm.id = 'objectForm_' + i;

        objectForm.innerHTML = `
        <label for="text_${i}">Text for Object ${i}:</label>
        <input type="text" id="text_${i}" value="Object ${i}" required>

        <label for="color_${i}">Main Color:</label>
        <input type="color" id="color_${i}" value="#000000">

        <label for="shadowColor1_${i}">Shadow Color 1:</label>
        <input type="color" id="shadowColor1_${i}" value="#00fffc">

        <label for="shadowColor2_${i}">Shadow Color 2:</label>
        <input type="color" id="shadowColor2_${i}" value="#fc00ff">

        <label for="time_${i}">Animation Speed (ms):</label>
        <input type="number" id="time_${i}" value="500" required>

        <label for="order_${i}">Order:</label>
        <input type="number" id="order_${i}" value="${i}" required>
        
        <label for="marg_${i}">Margin:</label>
        <input type="number" id="marg_${i}" value="10" required>
    `;

        // Append form to the container
        objectFormsContainer.appendChild(objectForm);
    }


    // Create a new container for the button
    let buttonContainer = document.createElement('div');
    buttonContainer.id = 'buttonContainer';

    // Add a button to create objects
    let createObjectsButton = document.createElement('button');
    createObjectsButton.textContent = 'Create Objects';
    createObjectsButton.addEventListener('click', createObjects);
    buttonContainer.appendChild(createObjectsButton);

    // Create a new container for the output
    let outputContainer = document.createElement('div');
    outputContainer.id = 'outputContainer';

    // Append the button container after the forms container
    objectFormsContainer.insertAdjacentElement('afterend', buttonContainer);
}

function createObjects() {
    // Get the number of objects from the main form
    let createdObjects = [];
    let numberOfObjects = parseInt(document.getElementById('numberOfObjects').value);
    for (let i = 1; i <= numberOfObjects; i++) {
        // Use an IIFE to create a new scope for each iteration
        (function (i) {
            let text = document.getElementById('text_' + i).value;
            let color = document.getElementById('color_' + i).value;
            let shadowColor1 = document.getElementById('shadowColor1_' + i).value;
            let shadowColor2 = document.getElementById('shadowColor2_' + i).value;
            let time = document.getElementById('time_' + i).value;
            let order = document.getElementById('order_' + i).value;
            let marg = document.getElementById('marg_' + i).value;

            let newObject = {
                text: text,
                color: color,
                shadowColor1: shadowColor1,
                shadowColor2: shadowColor2,
                time: time,
                order: order,
                marg: marg
            };

            createdObjects.push(newObject);
        })(i);
    }
    // Sort objects based on the order property
    createdObjects.sort((a, b) => a.order - b.order);

    // Display information about created objects
    let outputContainer = document.getElementById('outputContainer');
    outputContainer.innerHTML = ''; // Clear previous content in the output container

    createdObjects.forEach(function (obj, index) {
        createGlitchObject(obj.text, obj.color, obj.shadowColor1, obj.shadowColor2, obj.time, obj.order, obj.marg, outputContainer);
        saveGlitchObject(obj);
        addGlitchKeyframe(obj.shadowColor1, obj.shadowColor2);
    });

    saveObjectFormsData();
}

function createDynamicGlitchSpan(clip, translateX, translateY, opacity, animation) {
    let span = document.createElement('span');
    span.classList.add('glitch');
    span.style.position = 'absolute';
    span.style.clipPath = `polygon(${clip})`;
    span.style.transform = `translate(${translateX}px, ${translateY}px)`; // Add 'px' units to translate values
    span.style.opacity = opacity;
    span.style.animation = `glitch ${animation} infinite`;

    return span;
}


function createGlitchObject(text, color, shadowColor1, shadowColor2, time, order, margin, outputContainer) {
    let container = document.createElement('div');
    container.classList.add('container');
    container.style.textAlign = 'center';
    container.style.marginTop = margin + 'px';
    container.style.marginBottom = margin + 'px';

    let glitchText = document.createElement('div');
    glitchText.textContent = text;
    glitchText.style.color = color;
    glitchText.classList.add('glitch');
    glitchText.style.fontSize = '4rem';
    glitchText.style.fontWeight = 'bold';
    glitchText.style.textTransform = 'uppercase';
    glitchText.style.position = 'relative';
    glitchText.style.textShadow = `0.05em 0 0 ${shadowColor1}, -0.03em -0.04em 0 ${shadowColor2}, 0.025em 0.04em 0 ${shadowColor1}, 0.025em 0.04em 0 ${shadowColor2}`;
    glitchText.style.animation = `glitch_${order} ${time}ms infinite`;

    let span1 = createDynamicGlitchSpan('0 0, 100% 0, 100% 35%, 0 35%', '-0.04em', '-0.03em', '0.75', '500ms');
    let span2 = createDynamicGlitchSpan('0 65%, 100% 65%, 100% 100%, 0 100%', '0.04em', '0.03em', '0.75', '375ms');

    glitchText.appendChild(span1);
    glitchText.appendChild(span2);

    container.appendChild(glitchText);

    outputContainer.appendChild(container);
    addGlitchKeyframe(shadowColor1, shadowColor2, order);
}

function addGlitchKeyframe(shadowColor1, shadowColor2, order) {
    // Create a style element
    let style = document.createElement('style');
    style.type = 'text/css';

    // Define the keyframes with dynamic shadow colors
    style.innerHTML = `
        @keyframes glitch_${order} {
            0% {
                text-shadow: 0.05em 0 0 ${shadowColor1}, -0.03em -0.04em 0 ${shadowColor2}, 0.025em 0.04em 0 ${shadowColor1};
            }
            15% {
                text-shadow: 0.05em 0 0 ${shadowColor1}, -0.03em -0.04em 0 ${shadowColor2}, 0.025em 0.04em 0 ${shadowColor1};
            }
            16% {
                text-shadow: -0.05em -0.025em 0 ${shadowColor1}, 0.025em 0.035em 0 ${shadowColor2}, -0.05em -0.05em 0 ${shadowColor1};
            }
            49% {
                text-shadow: -0.05em -0.025em 0 ${shadowColor1}, 0.025em 0.035em 0 ${shadowColor2}, -0.05em -0.05em 0 ${shadowColor1};
            }
            50% {
                text-shadow: 0.05em 0.035em 0 ${shadowColor1}, 0.03em 0 0, 0 -0.04em 0 ${shadowColor2};
            }
            99% {
                text-shadow: 0.05em 0.035em 0 ${shadowColor1}, 0.03em 0 0, 0 -0.04em 0 ${shadowColor2};
            }
            100% {
                text-shadow: -0.05em 0 0 ${shadowColor1}, -0.025em -0.04em 0 ${shadowColor2}, -0.04em -0.025em 0 ${shadowColor1};
            }
        }
    `;

    // Append the style element to the head of the document
    document.head.appendChild(style);
}


function saveGlitchObject(glitchObject) {
    // Convert object to JSON
    let json = JSON.stringify(glitchObject);

    // Send JSON to the server
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "collect_glitch_data.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(json);

    // Optionally, you can handle the server response here
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Object saved successfully:", xhr.responseText);
        }
    };
}

