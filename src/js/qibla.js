document.addEventListener('DOMContentLoaded', function() {
    function initMap(lat, lng) {
        const mapOptions = {
            center: { lat: lat, lng: lng },
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        const map = new google.maps.Map(document.getElementById('qibla-map'), mapOptions);
    }

    function calculateQibla(lat, lon) {
        const meccaLat = 21.4225;
        const meccaLon = 39.8262;

        const phi = lat * Math.PI / 180;
        const lambda = lon * Math.PI / 180;
        const phiMecca = meccaLat * Math.PI / 180;
        const lambdaMecca = meccaLon * Math.PI / 180;

        const qiblaAngle = Math.atan2(
            Math.sin(lambdaMecca - lambda),
            Math.cos(phi) * Math.tan(phiMecca) - Math.sin(phi) * Math.cos(lambdaMecca - lambda)
        );

        return (qiblaAngle * 180 / Math.PI + 360) % 360;
    }

    function displayQiblaDirection(qiblaDirection) {
        const qiblaDirectionElem = document.getElementById('qibla-direction');
        qiblaDirectionElem.textContent = `Qibla Direction: ${qiblaDirection.toFixed(2)}°`;
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const qiblaDirection = calculateQibla(lat, lon);
        displayQiblaDirection(qiblaDirection);
        initMap(lat, lon);
    }, function(error) {
        console.error('Error getting geolocation:', error);
        document.getElementById('qibla-direction').textContent = 'Error fetching Qibla direction. Please try again later.';
    });
});
