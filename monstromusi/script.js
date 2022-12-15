fetch("posts.json")
    .then((response) => response.json())
    .then((data) => {
        const metaData = data;
        console.log(metaData);
    })
    .catch((error) => {
        console.log("ERROR: " + error);
    }) ;