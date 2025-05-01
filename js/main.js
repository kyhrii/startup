// weather

function dateTime() {
	const date = new Date();
	let today = date.toDateString();
	let time = date.toLocaleTimeString();
	document.getElementById('date-time').innerHTML = '<p id="date">' + today + '</p><p id="time">' + time + '</p>';
	setTimeout(dateTime, 1000);
}

function weatherBalloon(cityID) {
	var apiKey = '8da13c86a8c5f4cc14398829b532fbcb'; //OpenWeather API key
	fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + apiKey)
		.then(function(resp) {
			return resp.json()
		})
		.then(function(data) {
			let weatherIcon = data.weather[0].icon;
			let tempK = parseFloat(data.main.temp);
			let tempC = Math.round(tempK - 273.15);
			let tempF = Math.round((tempK - 273.15) * 1.8) + 32;
			document.getElementById('weather').innerHTML = '<p id="location">' + data.name + '</p><p id="details" ' + 'title="' + tempF + '&deg;F">' + '<img src="https://openweathermap.org/img/wn/' + weatherIcon + '.png">' + data.weather[0].description + '<span class="separator">|</span>' + tempC + '&deg;C</p>';
		});
}

function traichu() {
	dateTime();
	weatherBalloon(1642911); //OpenWeather city ID
}

// dynamic greeting

document.addEventListener('DOMContentLoaded', function() {
    function updateGreeting() {
        const now = new Date();
        const hour = now.getHours();
        const greetingElement = document.getElementById('greeting');
        const timeMessageElement = document.getElementById('time-message');
        const body = document.body;
        
        // Remove all time-based classes
        body.classList.remove('morning', 'afternoon', 'evening', 'night');
        
        let greeting;
        let timeMessage;
        
        if (hour >= 5 && hour < 12) {
            greeting = "Good Morning!";
            timeMessage = "Hope you have a wonderful day ahead!";
            body.classList.add('morning');
        } else if (hour >= 12 && hour < 17) {
            greeting = "Good Afternoon!";
            timeMessage = "How's your day going so far?";
            body.classList.add('afternoon');
        } else if (hour >= 17 && hour < 21) {
            greeting = "Good Evening!";
            timeMessage = "Hope you had a great day!";
            body.classList.add('evening');
        } else {
            greeting = "Good Night!";
            timeMessage = "Time to rest and recharge!";
            body.classList.add('night');
        }
        
        greetingElement.textContent = greeting;
        timeMessageElement.textContent = timeMessage;
        
        // Add current time
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeMessageElement.textContent += ` It's currently ${timeString}.`;
    }
    
    // Update immediately
    updateGreeting();
    
    // Update every minute to keep current time accurate
    setInterval(updateGreeting, 60000);
});