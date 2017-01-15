(function () {

    var supportOutput = document.querySelector("#suppport-output"),
        positionOutput = document.querySelector("#position-output"),
        findPositionButton = document.querySelector("#btn-find-position");

    if (!navigator.geolocation) {
        supportOutput.innerHTML = "Twoja przegladarka nie wspiera Geolokalizacji!";
        supportOutput.classList.add("alert-danger");
    } else {
        supportOutput.innerHTML = "Twoja przegladarka wspiera Geolokalizację!";
        supportOutput.classList.add("alert-success");
    }


    function geoSuccessSrc(position) {

        positionOutput.innerHTML = "";

        var latitude = position.coords.latitude,
            longitude = position.coords.longitude,
            link = document.createElement("a");
        
        positionOutput.innerHTML = "Twoja pozycja to: " + latitude + ", " + longitude;
        link.setAttribute("href", `https://www.bing.com/maps?cp=${latitude}~${longitude}`);
        link.innerHTML = " Link do mapy z twoim położeniem";

        positionOutput.appendChild(link);

    }

   

    function geoError(errorObj) {

        var errorMessage;

        switch (errorObj.code) {
            case errorObj.PERMISSION_DENIED:
                errorMessage = "Brak pozwolenia na znalezienie lokalizacji.";
                break;

            case errorObj.POSITION_UNAVAILABLE:
                errorMessage = "Brak dostępu do sieci.";
                break;

            case errorObj.TIMEOUT:
                errorMessage = "Przekroczono czas oczekiwania.";
                break;
        }

        positionOutput.innerHTML = "<strong>Wystąpił błąd: </strong>" + errorMessage;

    }

    var option = {
        timeout: 1000
    }


    findPositionButton.onclick = function () {

        navigator.geolocation.getCurrentPosition(geoSuccessSrc, geoError, option);

    }

})();