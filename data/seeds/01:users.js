
exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        { username: "saorse", password: "lfh208hflkhajgh3lhrljhalfkoijorijlakghflagh", department: "Gardaí"},
        { username: "siobhán", password: "kahfl;khjel;khtoiwthirohwlkjlsgkjlskjglkgj", department: "Gardaí"},
        { username: "nóirín", password: "iu2hk23jh5jk,nsgn,nbvpvoagjhsgshglsgllkfglkj", department: "Gardaí"},
      ]);
    });
};
