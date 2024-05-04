import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Message } from 'semantic-ui-react';
import AuthValidation from '../utils/AuthValidation';
import "../App.css";
import firebase from "firebase";
import { auth } from "./../firebase";
class SignIn extends Component {
    state = {
        username: '',
        password: '',
        digicode: '',
        alertMessage: '',
        status: '',
        phoneNumber: '',
        otp: "",
    final: "",
    isOtpSend: false,
        loggedIn: false
    }
    sendOtp = async (phone) => {
        let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
        auth
          .signInWithPhoneNumber(phone, verify)
          .then((result) => {
            this.setState({ final: result });
            alert("code sent");
            this.setState({ isOtpSend: true });
    
            // setshow(true);
          })
          .catch((err) => {
            alert(err);
            window.location.reload();
          });
      };
    
      ValidateOtp = () => {
        if (this.state.otp === null || this.state.final === null) return;
        this.state.final
          .confirm(this.state.otp)
          .then(async (result) => {
            // success
            this.setState({ isOtpSend: false });
            alert("code");
            this.onSignIn();
           
          })
          .catch((err) => {
            alert("Wrong code");
          });
      };

      onSignUp = async () => {
        //this.setState({ signedUp: false });
        console.log("onSignUp");
        if (this.state.phoneNumber === "") {
          return;
        } else {
          console.log("onSignUp +++");
          await this.sendOtp(this.state.phoneNumber);
        }
        // if (this.state.username !== '' && this.state.password !== '' && this.state.digicode !== '') {
        //     let username = this.state.username.trim();
        //     let password = this.state.password.trim();
        //     let digicode = this.state.digicode.trim();
    
        //     //===
        //     if (password.length < 8) {
        //         this.setState({
        //             alertMessage: "at least 8 characters for password",
        //             status: 'failed',
        //             password: '',
        //             digicode: '',
        //         });
        //         return;
        //     } else {
    
        //     } if (digicode.length !== 6) {
        //         this.setState({
        //             alertMessage: "6 digit required for digicode",
        //             status: 'failed',
        //             digicode: ''
        //         });
        //         return
        //     } else {
        //         console.log("Checking Account Existance...")
        //         console.log(this.props.account)
        //         let userAddress = await this.props.contract.methods.getUserAddress()
        //             .call({ from: this.props.account });
        //         console.log(userAddress);
    
        //         if (userAddress !== '0x0000000000000000000000000000000000000000') {
        //             this.setState({
        //                 alertMessage: 'this account already exists',
        //                 status: 'failed',
        //                 username: '',
        //                 password: '',
        //                 digicode: '',
        //             });
    
        //             return;
        //         } else {
    
        //             let hash = await AuthenticationHash(username, this.props.account, password, digicode, this.props.web3);
    
        //             await this.props.contract.methods.register(hash).send({ from: this.props.account });
    
        //             this.setState({
        //                 username: '',
        //                 password: '',
        //                 digicode: '',
        //                 status: 'success',
        //                 alertMessage: "Signup successful",
        //                 signedUp: true
        //             });
    
        //             this.props.accountCreated(this.state.signedUp);
        //             return;
        //         }
        //     }
        // }
      };

    onSignIn = async () => {

        if (this.state.username !== '' && this.state.password !== '' && this.state.digicode !== '') {
            let username = this.state.username.trim() + "-" + this.state.phoneNumber.trim();
            let password = this.state.password.trim();
            let digicode = this.state.digicode.trim();

            let usernameToSend = username;

            //===
            if (password.length < 8) {
                this.setState({
                    alertMessage: "at least 8 characters for password",
                    status: 'failed',
                    password: '',
                    digicode: '',
                });
                return;
            } else {

            } if (digicode.length !== 6) {
                this.setState({
                    alertMessage: "6 digit required for digicode",
                    status: 'failed',
                    digicode: ''
                });
                return
            } else {
                let userAddress = await this.props.contract.methods.getUserAddress()
                    .call({ from: this.props.account });

                if (userAddress === '0x0000000000000000000000000000000000000000') {
                    this.setState({
                        alertMessage: 'Account does not exists',
                        status: 'failed',
                        username: '',
                        password: '',
                        digicode: '',
                    });
                    return;
                } else {
                    let validated = await
                        AuthValidation(
                            username,
                            this.props.account,
                            password, digicode,
                            this.props.web3,
                            this.props.contract
                        );

                    if (!validated) {
                        this.setState({
                            alertMessage: 'Incorrect log in',
                            status: 'failed',
                            username: '',
                            password: '',
                            digicode: '',
                        });
                        return
                    } else {
                        this.setState({
                            username: '',
                            password: '',
                            digicode: '',
                            status: 'success',
                            alertMessage: "Sign in successful",
                            loggedIn: true
                        });

                        this.props.userSignedIn(
                            this.state.loggedIn,
                            usernameToSend
                        );

                        return;
                    }
                }
            }
        }


        this.setState({
            username: '',
            password: '',
            digicode: ''
        })
    }
    render() {
        return (
            <div className="sign-up">
                Sign in to your account
                <div className='signup-form'>
                    <Card fluid centered>
                        <Card.Content>
                            <Form size='large'>
                                {
                                    this.state.alertMessage !== '' && this.state.status === 'failed' ?
                                        <Message negative>
                                            {this.state.alertMessage}
                                        </Message> :
                                        this.state.alertMessage !== '' && this.state.status === 'success' ?
                                            <Message positive>
                                                {this.state.alertMessage}
                                            </Message> :
                                            console.log('')
                                }
                                <Form.Field required>
                                    <input
                                        type='text'
                                        placeholder='username'
                                        value={this.state.username}
                                        autoComplete="username"
                                        onChange={e => this.setState({ username: e.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field required>
                                    <input
                                        type='password'
                                        placeholder='password'
                                        value={this.state.password}
                                        autoComplete="current-password"
                                        onChange={e => this.setState({ password: e.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field required>
                                    <input
                                        type='text'
                                        placeholder='6 digit code'
                                        value={this.state.digicode}
                                        autoComplete="digicode"
                                        onChange={e => this.setState({ digicode: e.target.value })}
                                    />
                                </Form.Field>
                                {!this.state.isOtpSend && (
                  <Form.Field>
                    <input
                      required
                      type="text"
                      placeholder="Phone Number"
                      value={this.state.phoneNumber}
                      autoComplete="digicode"
                      onChange={(e) =>
                        this.setState({ phoneNumber: e.target.value })
                      }
                    />
                  </Form.Field>
                )}
                {this.state.isOtpSend && (
                  <Form.Field>
                    <input
                      required
                      type="text"
                      placeholder="OTP"
                      value={this.state.otp}
                      onChange={(e) => this.setState({ otp: e.target.value })}
                    />
                  </Form.Field>
                )}
                                <Form.Field>
                                    <Button type='submit' primary fluid size='large' onClick={!this.state.isOtpSend ? this.onSignUp : this.ValidateOtp}>
                                        Sign in
                                    </Button>
                                </Form.Field>
                                {!this.state.isOtpSend && <div id="recaptcha-container"></div>}


                            </Form>
                        </Card.Content>
                    </Card>
                    {
                        this.props.signedUp ?
                            console.log() :
                            <div className="signin-onUp">
                                Don't have an account? <Link to='/sign-up'>Sign up</Link>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export default SignIn
