export class FetchData {
    async getData() {
        const key = 'ac50b41b27f0449bb45193306231303';
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=auto:ip&days=7`;
        const newApi = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${'location'}/next5days?unitGroup=us&include=days%2Ccurrent&key=Q2ANF9YAZURFRRTLS85QB5LXJ&contentType=json`;

        const locationApi =`http://api.weatherapi.com/v1/search.json?key=ac50b41b27f0449bb45193306231303&q=${'City name'}`;
        
        const response = await fetch(url);
        const rs = await response.json();

        return rs;
        
    };
}


