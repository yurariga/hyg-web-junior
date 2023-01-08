function getImageAlt(img) {
    // console.log(img.alt)
    imageAlt = img.alt;
}

function renderRockets() {
    document.getElementById("labelListRockets").innerHTML = "SpaceX rockets list:";
    const mySearchResults = document.getElementById("rockets");
    while (mySearchResults.firstChild) {
        mySearchResults.removeChild(mySearchResults.firstChild);
    }
    // const myList = document.querySelector('ul')
    const myList = document.getElementById("rockets");
    num = 0;
    fetch("https://api.spacexdata.com/v4/rockets")
        // fetch('./data.json')
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            data.forEach((post) => {
                num++;
                myList.insertAdjacentHTML(
                    "beforeend",
                    `<li id="name${num}" class="rocketName">Name: ${post.name} 
                        <ul>
                            <li>First Flight: ${post.first_flight}</li>
                            <li id="description${num}" class="rocketDescription">Description: ${post.description}</li>
                            <li>Wikipedia: <a href="${post.wikipedia}" target="_blank">${post.name} Wikipedia descriprion (opens in new TAB)</a></li>
                            <li>Random image:<br><img src="${post.flickr_images[Math.floor(Math.random() * post.flickr_images.length)]}" alt="${post.name}" class="responsive" onclick="getImageAlt(this); openModal();"/></li>                
                        </ul>
            <br>
            </li>`
                );
            });
        });
}

function openModal1() {
    var myModal = document.getElementById("myModalContainer");
    //const body = document.querySelector("body");
    // console.log("Image clicked")
    // body.style.overflow = "hidden";
    myModalContainer.style.display = "block";
    // modalImg.src = this.src
    const myGrid = document.getElementById("grid");
    fetch("https://api.spacexdata.com/v4/rockets")
        // fetch('./data.json')
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            data.forEach((post) => {
                // console.log(`${post.flickr_images.length}`);
                for (let i = 0; i < `${post.flickr_images.length}`; i++) {
                    //console.log("Inside openmodal function ", imageAlt)
                    if (post.name == imageAlt) {
                        // console.log(imageAlt, typeof(imageAlt))
                        // console.log(post.name, typeof(post.name))
                        myGrid.insertAdjacentHTML(
                            "beforeend",
                            `<div><img src="${post.flickr_images[i]}" alt="${post.name}" class="responsive img-modal" /></div>`
                        );
                    }
                }
            });
        });
}

function closeModal1() {
    var myModal = document.getElementById("myModalContainer");
    console.log("Close button clicked");

    myModalContainer.style.display = "none";

    var myGrid = document.getElementById("grid");
    while (myGrid.firstChild) {
        myGrid.removeChild(myGrid.firstChild);
    }
}

function openModal() {
    const modal = document.querySelector('.modal');
        modal.showModal();
        const myGrid = document.getElementById("grid");
        while (myGrid.firstChild) {
            myGrid.removeChild(myGrid.firstChild);
        }
    fetch("https://api.spacexdata.com/v4/rockets")
        // fetch('./data.json')
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            data.forEach((post) => {
                // console.log(`${post.flickr_images.length}`);
                for (let i = 0; i < `${post.flickr_images.length}`; i++) {
                    //console.log("Inside openmodal function ", imageAlt)
                    if (post.name == imageAlt) {
                        // console.log(imageAlt, typeof(imageAlt))
                        // console.log(post.name, typeof(post.name))
                        myGrid.insertAdjacentHTML(
                            "beforeend",
                            `<div><img src="${post.flickr_images[i]}" alt="${post.name}" class="responsive img-modal" /></div>`
                        );
                    }
                }
            });
        });
}

function closeModal() {
        const closeModal = document.querySelector('.close-button');
        modal.close();
        
}

function searchForRocket() {
    //console.log("Search button clicked");
    const searchText = document.getElementById("searchRocket").value;
    // console.log(searchText.length);
    
    if (searchText.length == 0) {
        alert("Please enter search parameter")    
    }
    else {
        //console.log(`Searching for ${searchText}`);
    // console.log(typeof(searchText));
    document.getElementById("labelListRockets").innerHTML = `Search results (searched for '${searchText}'):`;

    const rocketList = document.querySelectorAll("li.rocketName");
    // console.log(rocketList, typeof rocketList, rocketList.length);
    var negativeResults = 0;
    // rocketList.forEach(element =>
    //     console.log(element.innerHTML)
    // );

    for (var i = 0; i < rocketList.length; i++) {
        console.log(`Iteration Nr${i + 1}`);
        // console.log(rocketList[i].firstChild.data);
        // console.log(rocketList[i].firstChild.data.slice(6));
        var rocketName = rocketList[i].firstChild.data.slice(6);
        // console.log(rocketName, typeof rocketName);
        if (rocketName.includes(`${searchText}`)) {
            console.log("Found in name");
        } else {
            var rocketDescription = document.getElementById(`description${i + 1}`).innerHTML.slice(13);
            //console.log(rocketDescription.slice(13));
            if (rocketDescription.includes(`${searchText}`)) {
                console.log("Found in description");
            }
            else {
                negativeResults++;
                console.log("Not Found");
                console.log("---REMONING NODE---")
                rocketList[i].remove();
            }
        }
    }

    if (negativeResults == rocketList.length) {
        const mySearchResults = document.getElementById("rockets");
        mySearchResults.insertAdjacentHTML(
            "beforeend",
            `<li><p>Nothing found</p></li>`
        );
    }
    }   
}
