import React, { Component } from 'react';
function SignUp() {
    return (
        <form action="#!">
            <div className="row">
                <div className="col-12">
                    <h3>Personal Details</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label for="firstName">First Name</label>
                        <input type="text" name="firstName" id="firstName" className="form-control" />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label for="lastName">Last Name</label>
                        <input type="text" name="lastName" id="lastName" className="form-control" />
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
                            <input type="email" name="email" id="email" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" className="form-control" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label for="confirmPassword">Confirm Password</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-md-4">
                        <button type="submit" className="btn btn-primary btn-block">Sign-up</button>
                    </div>
                </div>
        </form>
    )
}
export default SignUp;