export function saveObjectFormsData() {
    const objectForms = document.querySelectorAll('form');
    console.log(objectForms);
    let dataToSave = [];

    objectForms.forEach((form, index) => {
        const text = form.querySelector(`#text_${index + 1}`).value;
        const color = form.querySelector(`#color_${index + 1}`).value;
        const shadowColor1 = form.querySelector(`#shadowColor1_${index + 1}`).value;
        const shadowColor2 = form.querySelector(`#shadowColor2_${index + 1}`).value;
        const time = form.querySelector(`#time_${index + 1}`).value;
        const order = form.querySelector(`#order_${index + 1}`).value;
        const marg = form.querySelector(`#marg_${index + 1}`).value;

        let formData = {
            text: text,
            color: color,
            shadowColor1: shadowColor1,
            shadowColor2: shadowColor2,
            time: time,
            order: order,
            marg: marg
        };

        dataToSave.push(formData);
    });

    console.log(dataToSave);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "collect_glitch_data.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Data for object forms saved successfully");
        } else {
            console.error("Error while saving data for object forms");
        }
    };

    xhr.send(JSON.stringify(dataToSave));
}
