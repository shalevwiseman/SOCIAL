import { useRef, useState, useEffect } from "react";
import { faCheck,faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "./api/axios";



// validate user input
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,30}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,50}$/;
const REGISTER_URL = '/register';


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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(REGISTER_URL,JSON.stringify({username: user, email: email, password: pwd}),
            {
                headers: { 'Content-Type': 'application/json' },
                 withCredentials: true
            }
            );
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            // clear the form
            setUser('');
            setEmail('');
            setPwd('');
            setMatchPwd('');


        } catch (err) {
            if (!err?.response) {
                setErrMsg('Network error. Please try again later.');
            } else if (err.response.status === 409) {
                setErrMsg("Username or email already exists. Please try again.");
            }else {
                setErrMsg("Something went wrong. Please try again later.");
            }
            errRef.current.focus();
        }

    };

    return (
        <section> 
            
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                
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

                        
                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatchPwd && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatchPwd || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatchPwd ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchPwdFocus(true)}
                            onBlur={() => setMatchPwdFocus(false)}
                        />
                        <p id="confirmnote" className={matchPwdFocus && !validMatchPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <label htmlFor="email">
                            Email:
                            <span className={validEmail ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validEmail || !email ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value = {email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must be a valid email address.
                        </p>

                        <button
                        // if any of the input is invalid, disable the button
                        disabled={!validName || !validEmail || !validPwd || !validMatchPwd ? true : false}
                        >Sing Up</button>

            </form>
            Already registered?<br />
            <span className="line">
                {/*put router link here*/}
                <a href="#put here link to the sing in page">Sing In</a>
            </span>

        
        </section>
    );
};

export default Register;