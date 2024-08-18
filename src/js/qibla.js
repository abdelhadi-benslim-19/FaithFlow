document.addEventListener('DOMContentLoaded', function() {
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
        if (qiblaDirectionElem) {
            qiblaDirectionElem.textContent = `Qibla Direction: ${qiblaDirection.toFixed(2)}°`;
        }

        // Rotate compass to point towards the Qibla direction
        const compassElem = document.getElementById('compass');
        if (compassElem) {
            compassElem.style.transform = `rotate(${qiblaDirection}deg)`;
        }
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const qiblaDirection = calculateQibla(lat, lon);
        displayQiblaDirection(qiblaDirection);
    }, function(error) {
        console.error('Error getting geolocation:', error);
        const qiblaDirectionElem = document.getElementById('qibla-direction');
        if (qiblaDirectionElem) {
            qiblaDirectionElem.textContent = 'Error fetching Qibla direction. Please try again later.';
        }
    });
});
