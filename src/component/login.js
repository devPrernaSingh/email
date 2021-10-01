import React, { Component } from 'react';
import './CSS/login.css';
import { faLock, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from '../common/header';

class Login extends Component {
    constructor(props){
        super(props);
         this.state={
             formValues: {},
             isEmailRegistered: false,
         }
    }
    
    handleForm = (event) => {
      const { formValues } = this.state;
      const { name, value } = event.target;
      formValues[name] = value;
    }

    otpHandler = () => {
        const emailCheck = /[A-Za-z._0-9]{3,}@[A-za-z]{3,}[.]{1}[A-Za-z.]{2,6}/;
        let  { email } = this.state.formValues; 
        this.setState({ isEmailRegistered: false})
        if(emailCheck.test(email)){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify({ email})
            };
            
            fetch('https://staging.vyaparapp.in/api/ns/auth/check-user', requestOptions)
                .then(response => response.json())
                .then(data => {                  
                    if(data.statusCode === 200){
                        this.setState({ isEmailRegistered: true})
                    }
                })
                .catch(error => console.log(error))
        }
    }

    verifyOtp = () => {

        let  { email,otp, } = this.state.formValues;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                otp: otp,
                email: email
              })
        };
        
        fetch('https://staging.vyaparapp.in/api/ns/auth/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                let auth_token = data.auth_token;
                if(data.statusCode === 200){
                    document.cookie = `auth_token = ${data.data.auth_token}`;
                    window.location.href = '/email'
                }
            })
            .catch(error => console.log(error))
    }

 
    render() {
        let { isEmailRegistered } = this.state;
        return (
            <div className='login_bucket text-center d-block justify-content-center mt-5 pt-5' >
                <div>
                    <Header />
                </div>
                <FontAwesomeIcon icon={faUsers}  className='mt-5 mx-auto usersIcon'/>
                
                <div className=''>
                    <h4 className='text-light'>Login</h4>
                    <p className='text-white font-italic isOtpSend'>OTP send successfuly</p>
                </div>
                { !isEmailRegistered ? (
                    <div id='userEmailId'>
                        <div className="textbox d-flex mx-auto"> 
                            <FontAwesomeIcon icon={faUser} className='iconStyle userIcon' id='elementID'/>
                            <input type="email" placeholder='Email' name="email" className='border-0 input_field' onChange={this.handleForm} autoFocus={true} />
                        </div>
            
                        <button className='mt-5 border-0 sendOtpButton' onClick={this.otpHandler}>Send OTP </button>
                    </div>
                ):
                    <div id='otpContainr'>
                        <div className="textbox d-flex bg-white mx-auto"> 
                            <FontAwesomeIcon icon={faLock} className='iconStyle passIcon'/>
                            <input type="password" placeholder='OTP' onChange={this.handleForm} name='otp' className='border-0 input_field'  />
                        </div>
                        
                        <button className='mt-5 authCheck border-0'  onClick={this.verifyOtp}>Verify OTP</button>
                    </div>
                }
            </div>
        )
    }
}

export default Login;