const passport = require('passport');

module.exports = ()=>{
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });   
}