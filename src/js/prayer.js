document.addEventListener("DOMContentLoaded", function() {
    // Handle manual address form submission
    document.getElementById('address-form').addEventListener('submit', function(event) {
      event.preventDefault();
      const address = document.getElementById('address').value;
  
      if (address) {
        fetchPrayerTimesByAddress(address);
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
  