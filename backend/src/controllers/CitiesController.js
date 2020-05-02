const connection = require('../database/connection');
const ascendingOrder = require('../utils/ascendigOrder');

module.exports = {
    // This method will extract the users and put then with same people from your city
    async index() {
        // Find on DB users
        const users = await connection('users').select('name', 'city');
        // Unique array of cities
        const cities = users.map(user => user.city).sort(ascendingOrder);
        // Unique cities, non repeated city
        const sortedCities = cities.filter((city, index) => cities.indexOf(city) === index);

        // And user put in the same city
        const usersPerCity = sortedCities.map(city => users.filter(user => user.city === city));


        /**
         * The result will be like
         *  [
         *      [{ name: 'name', city: 'São Paulo'},
         *      {name: 'another user', city: 'São Paulo'}],
         * 
         *      [{ name: 'and another user', city: 'Mogi das Cruzes'}]
         *  ]
         */
        return usersPerCity;
    }
}