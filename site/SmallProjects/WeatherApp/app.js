window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperaturedegree = document.querySelector('.temperature-degree');
    let locationtimezone = document.querySelector('.location-timezone');
    let temperaturedescription = document.querySelector('.temperature-description');
    let iconimage = document.querySelector('.icon');
    let temperaturesection = document.querySelector('.temperature');
    let temperaturespan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ab1c5e8f17970e990b0bebdb3c51e54b`;
            fetch(api).then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {temp} = data.main;
                const {description,icon} = data.weather[0];
                const name = data.name;
                const {country} = data.sys;
                
                temperaturedegree.textContent = (temp - 273.15).toFixed(2);
                temperaturedescription.textContent = description.toUpperCase();
                locationtimezone.textContent = name + ", " + country;
                iconimage.style.backgroundImage = `url('http://openweathermap.org/img/wn/${icon}@2x.png')`;

                temperaturesection.addEventListener('click', () => {
                    if (temperaturespan.textContent === 'C'){
                        temperaturespan.textContent = 'F';
                        temperaturedegree.textContent = ((temperaturedegree.textContent*(9/5)) + 32).toFixed(2);
                    }else {
                        temperaturespan.textContent = 'C';
                        temperaturedegree.textContent = ((temperaturedegree.textContent - 32)*(5/9)).toFixed(2);
                    }
                });


                
            });
        });
    }
});