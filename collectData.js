function saveObjectFormsData(allObjects) {

    console.log(allObjects);
    let dataToSave={};
    let i=1;
    // for(let obj of allObjects){
    //     dataToSave[`obj${i}`]=obj;
    //     i+=1;
    // }

    for(let obj of allObjects){
        dataToSave[`obj${i}`]=obj;
        i+=1;
    }


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
