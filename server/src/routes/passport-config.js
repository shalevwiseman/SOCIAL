const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy

function initialize(passport, getUserByEmail, getUserByID) {
    console.log('Initialized')
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        
        if (user == null) {
            
            return done(null, false, { message: 'No user with that email' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new localStrategy({ usernameField: 'email' },authenticateUser))
    passport.serializeUser((user, done) => done(null,user.id)) // serializeUser is used to determine which data of the user object should be stored in the session.
    passport.deserializeUser((id, done) => {
        return done(null,getUserByID(id))
    }) // deserializeUser is used to retrieve the whole object via that key.
}
module.exports = initialize