import React, { Component, useState } from 'react';
import { Auth } from "aws-amplify";
// import {styles} from './index.css';
import { useAppContext } from "./contextLib";

function SignIn() {

    const { userHasAuthenticated, setGivenName, setFamilyName, setIdToken } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [page, setPage] = useState("signIn");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [activationCode, setActivationCode] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            var user = await Auth.signIn(email, password);
            console.log(user);
            userHasAuthenticated(true);
            setGivenName(user.attributes.given_name);
            setFamilyName(user.attributes.family_name);
            setIdToken(user.signInUserSession.idToken.jwtToken);

        } catch (e) {
            alert(e.message);
        }
    }

    function validatePasswords() {
        var regExp = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$");
        if (regExp.test(newPassword)) {
            console.log(newPassword, confirmPassword)
            if (newPassword == confirmPassword) {
                console.log("match")
                return 0;
            }
            else { console.log("No match"); return 2; }
        }
        else { console.log("Fail"); return 1; }
    }

    async function handleSignUp(event) {
        event.preventDefault();
        var passwordCheck = validatePasswords();
        if (passwordCheck == 0) {
            // Signup
            try {
                const user = await Auth.signUp({
                    username: newEmail,
                    password: newPassword,
                    attributes: {
                        family_name: lastName,
                        given_name: firstName
                    }
                });
                console.log({ user });
            } catch (error) {
                console.log('error signing up:', error);
            }
        }
        else if (passwordCheck == 1) {
            // Password doesn't match regexp
            window.alert("Password must contain one uppercase letter, one lowercase letter and one number");
            return false;
        }
        else if (passwordCheck == 2) {
            // Password doesn't match confirm
            window.alert("Passwords do not match");
            return false;
        }

    }

    async function handleConfirmation(event) {
        event.preventDefault();
        await Auth.confirmSignUp(newEmail, activationCode);
        setPage("signIn");
    }

    if (page == "signIn") {
        return (
            <>
                <nav className="navbar navbar-light text-white bg-primary">
                    <h2>TagStore</h2>
                </nav>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-12 col-md-4 offset-md-4">
                            <form className="form-signin text-center" onSubmit={handleSubmit}>
                                <h1 className="display-4">TagStore</h1>
                                <h4 className="mb-3 font-weight-normal">Please sign in</h4>
                                <label className="sr-only">Email address</label>
                                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" required autoFocus />
                                <label className="sr-only">Password</label>
                                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                                <button className="btn btn-primary btn-block" type="submit">Sign in</button>
                                <hr />
                                <p>Don't have an account?</p>
                                <button className="btn btn-primary btn-block" onClick={() => setPage("signUp")}>Sign up!</button>
                                <hr />
                                <p>Have a confirmation code?</p>
                                <button className="btn btn-primary btn-block" onClick={() => setPage("activate")}>Activate account</button>

                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else if (page == "signUp") {
        return (
            <>
                <nav className="navbar navbar-light text-white bg-primary">
                    <h2>TagStore</h2>
                </nav>
                <div className="container mt-3">
                    <form onSubmit={handleSignUp}>
                        <div className="row">
                            <div className="col-12">
                                <h3>Personal Details</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label for="firstName">First Name</label>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label for="lastName">Last Name</label>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12">
                                <h3>Login Credentials</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label for="confirmPassword">Confirm Password</label>
                                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12 col-md-4">
                                <button type="submit" className="btn btn-primary btn-block">Sign-up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <nav className="navbar navbar-light text-white bg-primary">
                    <h2>TagStore</h2>
                </nav>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-12 col-md-4 offset-md-4">
                            <form className="form-signin text-center" onSubmit={handleConfirmation}>
                                <h1 className="display-4">TagStore</h1>
                                <h4 className="mb-3 font-weight-normal">Activate Account</h4>
                                <label className="sr-only">Email Address</label>
                                <input type="email" className="form-control" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="Email Address" required autoFocus />
                                <label className="sr-only">Activation Code</label>
                                <input type="text" className="form-control" value={activationCode} onChange={e => setActivationCode(e.target.value)} placeholder="Activation Code" required autoFocus />
                                <button className="btn btn-primary btn-block">Activate account</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default SignIn;