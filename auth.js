/**import passport js for auth */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Person = require('./models/Person.js');

/**
 * use Passport Auth
 * done is callback function
 */
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    // console.log('Received Creds', username, password);

    const user = await Person.findOne({
      username: username
    });
    if (!user) {
      return done(null, false, {
        message: "Incorrect Username"
      });
    }

    // const isPasswordMatch = user.password === password ? true : false;

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return done(null, false, {
        message: "Incorrect Password"
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}))

/**for check auth passport.js 
 * 
 * local = startegy
 * session= false (bcoz we are not using session)
*/

const localStrategyMiddleware = passport.authenticate('local',{session:false});

module.exports = 
{
    passport,
    localStrategyMiddleware
};