import React, { useState, useRef } from 'react';
import './Login.css';

// حل مشكلة تعريف الصور في TypeScript
import bgImage from './../assets/packground.jpg'; 
import enrLogo from '../assets/logo.png'; 

const Login: React.FC = () => {
  const [showPass, setShowPass] = useState<boolean>(false);

  // تعريف الـ Refs مع قيمة ابتدائية null
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // دالة التعامل مع ضغطات المفاتيح
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>, 
    nextField: React.RefObject<HTMLInputElement | null> | null
  ): void => {
    if (e.key === 'Enter') {
      e.preventDefault();  
      if (nextField && nextField.current) {
        nextField.current!.focus();  
      } else {
        // تنفيذ عملية تسجيل الدخول
        console.log("Login triggered");
      }
    }
  };

  return (
    <div className="login-container  mt-16" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="overlay ">
        <div className="login-card">
          
          <div className="logo-section">
            <img src={enrLogo} alt="ENR Logo" className="main-logo" />
            <h1 className="brand-name">ENR</h1>
            <div className="subtitle-container">
              <div className="line"></div>
              <span className="subtitle">TICKETS</span>
              <div className="line"></div>
            </div>
          </div>

          <h2 className="login-title">Login to ENR Tickets</h2>

          <div className="form-wrapper">
            
            <div className="input-group">
              <div className="icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <input 
                ref={emailRef}
                type="email" 
                placeholder="Email" 
                className="clean-input" 
                onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              />
            </div>

            <div className="input-group">
              <div className="icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <input 
                ref={passwordRef}
                type={showPass ? "text" : "password"} 
                placeholder="Password" 
                className="clean-input" 
                onKeyDown={(e) => handleKeyDown(e, null)}
              />
              <div className="eye-icon" style={{ cursor: 'pointer' }} onClick={() => setShowPass(!showPass)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </div>
            </div>

            <div className="forgot-pass">
              <a href="#">Forgot password?</a>
            </div>

            <button className="login-button" type="button">Login</button>

            <div className="divider">
              <div className="line"></div>
              <span>Or sign in via</span>
              <div className="line"></div>
            </div>

            <div className="social-group">
              <div className="social-circle">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="google" />
              </div>
              <div className="social-circle fb">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="facebook" />
              </div>
              <div className="social-circle">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="apple" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;