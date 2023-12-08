import { useRef, useState, useEffect } from "react";
import { faCheck,faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import e from "cors";


// validate user input
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,30}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{5,50}$/;


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

// set states for user input
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState(false);
    const [validMatchPwd, setValidMatchPwd] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    // check if user name is valid
    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    // check if email is valid
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email]);

    // check if password is valid and if it matches
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatchPwd(match);
    }, [pwd, matchPwd]);

// check if there is any error message
    useEffect(() => {
        setErrMsg('');
    }, [userFocus, emailFocus, pwdFocus, matchPwdFocus]);

    return (
        <section> 
            
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form>
                <label htmlFor="username">
                    Username:
                        <span className={validName ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validName || !user ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>

                </label>
                    <input
                        type="text"
                        // id is used for label htmlFor (need to be the same)
                        id="username"
                        // ref is used for focus
                        ref={userRef}
                        // value is used for user input
                        autoComplete="off"
                        // this will provide the event object and we can use it to get the value
                        onChange={(e) => setUser(e.target.value)}
                        required
                        // aria-invalid is used for screen reader to read the error message
                        aria-onInvalid={validName ? "false" : "true"}
                        // full description of the error message
                        aria-describedby="uidnote"
                        // setting the focus
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instruction" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Username must be 4-30<br />
                            characters long and can only contain letters, numbers, hyphens, and underscores.
                        </p>
            </form>

        
        </section>
    );
};

export default Register;