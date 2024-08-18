document.addEventListener("DOMContentLoaded", function() {
    // Handle manual address form submission
    document.getElementById('address-form').addEventListener('submit', function(event) {
      event.preventDefault();
      const address = document.getElementById('address').value;
  
      if (address) {
        fetchPrayerTimesByAddress(address);
      }
    });
  
    // Handle location detection button click
    document.getElementById('detect-location').addEventListener('click', function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchPrayerTimesByLocation, handleGeolocationError);
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    });
  });
  
  function fetchPrayerTimesByAddress(address) {
    const apiUrl = `http://api.aladhan.com/v1/timingsByAddress?address=${encodeURIComponent(address)}&method=2`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const prayerTimes = data.data.timings;
        displayPrayerTimes(prayerTimes);
      })
      .catch(error => console.error('Error fetching prayer times:', error));
  }
  
  function fetchPrayerTimesByLocation(position) {
    const { latitude, longitude } = position.coords;
    const apiUrl = `http://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const prayerTimes = data.data.timings;
        displayPrayerTimes(prayerTimes);
      })
      .catch(error => console.error('Error fetching prayer times:', error));
  }
  
  function handleGeolocationError(error) {
    console.error('Geolocation error:', error);
    alert('Unable to retrieve your location.');
  }
  
  function displayPrayerTimes(prayerTimes) {
    const prayerTimesContainer = document.getElementById('prayer-times');
    
    prayerTimesContainer.innerHTML = `
      <ul class="list-group">
        <li class="list-group-item">Fajr: ${prayerTimes.Fajr}</li>
        <li class="list-group-item">Dhuhr: ${prayerTimes.Dhuhr}</li>
        <li class="list-group-item">Asr: ${prayerTimes.Asr}</li>
        <li class="list-group-item">Maghrib: ${prayerTimes.Maghrib}</li>
        <li class="list-group-item">Isha: ${prayerTimes.Isha}</li>
      </ul>
    `;
  }
  