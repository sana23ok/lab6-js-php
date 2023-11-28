function createObjectForms() {
    // Get the number of objects from the main form
    let numberOfObjects = parseInt(document.getElementById('numberOfObjects').value);

    // Get the container for object forms
    let objectFormsContainer = document.getElementById('objectFormsContainer');

    // Remove the previous "Create Objects" button if it exists
    let previousButtonContainer = document.getElementById('buttonContainer');
    if (previousButtonContainer) {
        previousButtonContainer.remove();
    }

    // Clear previous content
    objectFormsContainer.innerHTML = '';

    // Create forms for each object
    for (let i = 1; i <= numberOfObjects; i++) {
        let objectForm = document.createElement('form');
        objectForm.id = 'objectForm_' + i;

        objectForm.innerHTML = `
        <label for="text_${i}">Text for Object ${i}:</label>
        <input type="text" id="text_${i}" value="Object ${i}" required>

        <label for="color_${i}">Colors:</label>
        <input type="color" id="color_${i}" value="#000000">

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

    // Append the button container after the forms container
    objectFormsContainer.insertAdjacentElement('afterend', buttonContainer);
}

function createObjects() {
    // Get the number of objects from the main form
    let numberOfObjects = parseInt(document.getElementById('numberOfObjects').value);

    // Get information from each object form and create objects
    let createdObjects = [];
    for (let i = 1; i <= numberOfObjects; i++) {
        let text = document.getElementById('text_' + i).value;
        let color = document.getElementById('color_' + i).value;
        let time = document.getElementById('time_' + i).value;
        let order = document.getElementById('order_' + i).value;
        let marg = document.getElementById('marg_' + i).value;

        let newObject = {
            text: text,
            color: color,
            time: time,
            order: order,
            marg: marg
        };

        createdObjects.push(newObject);
    }

    // Sort objects based on the order property
    createdObjects.sort((a, b) => a.order - b.order);

    // Display information about created objects
    let outputContainer = document.getElementById('outputContainer');
    outputContainer.innerHTML = ''; // Clear previous content in the output container

    createdObjects.forEach(function (obj, index) {
        createGlitchObject(obj.text, obj.color, obj.time, obj.order, obj.marg, outputContainer);
    });
}

function createGlitchSpan(glitch, clip, top, left, opacity, animation) {
    let span = document.createElement('span');
    // span.textContent = "aaa";
    span.classList.add(glitch);
    // span.style.position = 'absolute';
    span.style.clipPath = `polygon(${clip})`;
    span.style.top = top;
    span.style.left = left;
    span.style.opacity = opacity;
    span.style.animation = `glitch ${animation} infinite`;

    return span;
}
function createGlitchObject(text, color, time, order, margin, outputContainer) {
    let container = document.createElement('div');
    container.classList.add('container');
    container.style.textAlign = 'center';
    container.style.margin = margin + 'px';

    let glitchText = document.createElement('div');
    glitchText.textContent = text;
    glitchText.classList.add('glitch');
    glitchText.style.fontSize = '2.5rem';
    glitchText.style.fontWeight = 'bold';
    glitchText.style.textTransform = 'uppercase';
    glitchText.style.position = 'relative';
    glitchText.style.textShadow = `0.05em 0 0 ${color}, -0.03em -0.04em 0 ${color}, 0.025em 0.04em 0 ${color}`;
    glitchText.style.animation = `glitch ${time}ms infinite`;

    let span1 = createGlitchSpan('glitch', '0 0, 100% 0, 100% 35%, 0 35%', '-0.04em', '-0.03em', '0.75', '500ms');
    let span2 = createGlitchSpan('glitch', '0 65%, 100% 65%, 100% 100%, 0 100%', '0.04em', '0.03em', '0.75', '375ms');

    glitchText.appendChild(span1);
    glitchText.appendChild(span2);

    container.appendChild(glitchText);

    outputContainer.appendChild(container);
}
