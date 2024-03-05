document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.row');
  
    // Clear all existing content before appending new content
    container.innerHTML = '';
  
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
            countries.forEach(country => {
  
                const card = document.createElement('div')
                card.classList.add('col-lg-4', 'col-sm-12');
                card.setAttribute('id', 'card');
  
                const cardBody = document.createElement('div');
                cardBody.classList.add('card', 'card-header', 'card-body');
                cardBody.setAttribute('id', 'cardbody');
  
                const name = document.createElement('h4');
                name.textContent = country.name.common;
                name.setAttribute('id', 'name');
  
                const flag = document.createElement('img');
                flag.src = country.flags.svg;
                flag.alt = country.name.common + ' Flag';
                flag.setAttribute('id', 'flag');
  
                const capital = document.createElement('p');
                capital.textContent = 'Capital: ' + country.capital;
                capital.setAttribute('id', 'capital');
  
                const region = document.createElement('p');
                region.textContent = 'Region: ' + country.region;
                region.setAttribute('id', 'region');
  
                const latlng = document.createElement('p');
                latlng.textContent = 'Latlng: ' + country.latlng.join(', ');
                latlng.setAttribute('id', 'lating');
  
                const countryCode = document.createElement('p');
                countryCode.textContent = 'Country Code: ' + country.cca2;
                countryCode.setAttribute('id', 'countrycode');
  
  
                const button = document.createElement('button');
                button.classList.add('btn', 'btn-primary');
                button.textContent = 'Click for Weather';
                button.setAttribute('id', 'button');
  
                button.onclick = function () {
                    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=bc5ab89f40d71cffa9e48b504f3be748`)
                        .then(response => response.json())
                        .then(weatherData => {
  
  
                            const weather = document.createElement('p');
                            weather.textContent = `Weather in ${country.name.common}: ${weatherData.weather[0].description}`;
                            weather.setAttribute('id', 'weather');
                            cardBody.appendChild(weather);
  
                        })
                        .catch(error => {
                            console.error('Error fetching weather data:', error);
                        });
                };
  
                cardBody.appendChild(name);
                cardBody.appendChild(flag);
                cardBody.appendChild(capital);
                cardBody.appendChild(region);
                cardBody.appendChild(latlng);
                cardBody.appendChild(countryCode);
                cardBody.appendChild(button);
  
  
  
                card.appendChild(cardBody);
  
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
        });
  })