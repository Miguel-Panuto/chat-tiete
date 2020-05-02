const connection = require('../database/connection');
const ascendingOrder = (a, b) => {
    // if the next value is minor than the previous, 
    // that will be on the front of him on the front arr position
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else
        return 0;
}

module.exports = {
    async index() {
        const users = await connection('users').select('name', 'city');
        const cities = users.map(user => user.city).sort(ascendingOrder);
        const sortedCities = cities.filter((city, index) => cities.indexOf(city) === index);

        const usersPerCity = sortedCities.map(city => users.filter(user => user.city === city));

        return usersPerCity;
    }
}