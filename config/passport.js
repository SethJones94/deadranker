const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Account = require('./models/account');
const config = require('/config/database');

module.exports = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Account.findOne({id: jwt_payload.id}, (err, account) => {
      if (err) {
        return done(err, false);
      }
      if (account) {
        done(null, account);
      } else {
        done(null, false);
      }
    });
  }));
};
