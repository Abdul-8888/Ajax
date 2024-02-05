document.getElementById('fetchData').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default button action

    // Get the user input from the form
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    // Set up the AJAX request
    const xhr = new XMLHttpRequest();
    const url = `https://archive-api.open-meteo.com/v1/era5?latitude=${latitude}&longitude=${longitude}&start_date=2021-01-01&end_date=2021-12-31&hourly=temperature_2m`;

    // Configure the request
    xhr.open('GET', url, true);

    // Set up what happens when the request is successful
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Parse the JSON response
            const data = JSON.parse(xhr.responseText);

            // Assuming the API returns the dates and hours in an array named 'time'
            const temperatures = data.hourly.temperature_2m;
            const timestamps = data.hourly.time;

            let resultsHTML = '';

            for (let i = 0; i < temperatures.length; i++) {
                // Convert the timestamp to a Date object
                let date = new Date(timestamps[i]);
                let dateStr = date.toISOString().substring(0, 10); // Extract the date part
                let hourStr = date.toISOString().substring(11, 13); // Extract the hour part
                
                // Create a string for each date, hour, and temperature entry
                resultsHTML += `<p>Date: ${dateStr}, Hour: ${hourStr}:00, Temperature: ${temperatures[i]}°C</p>`;
            }

            // Update the DOM with the date, hour, and temperature data
            document.getElementById('result').innerHTML = resultsHTML;
        } else {
            // Handle errors
            document.getElementById('result').textContent = 'Error fetching data.';
        }
    };

    // Set up what happens in case of an error
    xhr.onerror = function() {
        // Handle network errors
        document.getElementById('result').textContent = 'Network Error.';
    };

    // Send the request
    xhr.send();
});
