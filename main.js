import { apiKey } from "./private"
const main = document.querySelector('main')
const apodEl = document.querySelector('.apod')
const roverList = document.querySelector('.rover-list')
const errorMsg = document.querySelector('.error-msg')
const dateInput = document.querySelector('#date-input')
const submitButton = document.querySelector('#submit-button')

const apiKey = 'wfXijQSHw3imdZkGf8MC9bldT0C7plzvKL6ffGGe'
const apodURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
const roverURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2023-01-15&api_key=${apiKey}`;  

async function fetchData(url, handleData) {
    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(`HTTP  Error! Status: ${response.status}`);
        }

        const data = await response.json();
        handleData(data);
    }   catch(error) {
        errorMsg.style.display="block";
        errorMsg.innerHTMLhtml = "There is an error wwith your fetch," + error;
    }
}

function handleApodData (data) {
    const html = `
    <img src =" ${data.url}" alt="apod">
    <p>${data.title}</p>
    `;
    apodEl.insertAdjacentHTML("beforeend",html);
}

function handleRoverData(data){
    roverList.innerHTML = "";
    if(!data.photos.length) {
        roverList.innerHTML=
        "<li>No photos were taken on this date. Please select another date. </li>"
    } else {
    const photos= data.photos
        .map(photo => `<li><img src=" ${photo.img_src}" alt="Rover photo"></li>`)
        .join("");
    roverList.insertAdjacentHTML("beforeend", photos);
    }
}

//Fetch and Display APOD
fetchData(apodURL,handleApodData);

submitButton.addEventListener("click", function(){
    const date = dateInput.value;
    const roverURL = ` https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${apiKey}`;

    fetchData(roverURL, handleRoverData);
});
