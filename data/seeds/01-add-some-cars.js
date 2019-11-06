
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { VIN: 'JF2GPACC2E9277386', make: "Ford", model: "Fiesta", mileage: 10000, transmissionType: "automatic", status: "pristine"},
        { VIN: '1FTEF14H2JPA14551', make: "BMW", model: "3 series", mileage: 2000 , transmissionType: "gear", status: "good condition"},
        { VIN: '3B7KF23Z82M360436', make: "Seat", model: "Ibiza", mileage: 20000, transmissionType: "gear", status: "a bit worse for wear"},
      ]);
    })
  };


      