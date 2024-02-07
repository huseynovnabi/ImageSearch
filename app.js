const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imagelistWrapper = document.querySelector(".imagelist-wrapper");

runEventListeners();

function runEventListeners() {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear);
}

function search(e) {
    e.preventDefault();
    const value = searchInput.value.trim();
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET",
        headers: {
            Authorization: "Client-ID 6tL4L1iPiwjLkA7P0A3hq0cugisaXb0p1GOl0X5JKfU"
        }
    })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            Array.from(data.results).forEach(image => {
                // console.log(image.urls.small);
                addImageToUI(image.urls.small);
            });
        })
        .catch((error) => console.log(error));
}


function addImageToUI(url) {
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.setAttribute("src", url);

    div.appendChild(img);
    imagelistWrapper.appendChild(div)
}


function clear() {
    searchInput.value = "";
    // imagelistWrapper.innerHTML = "";
    Array.from(imagelistWrapper.children).forEach((child) => child.remove());
}
