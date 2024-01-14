
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginPage = () => {
  const responseGoogle = (response) => {
    console.log("Google resp",response);
  }

  return (
    <div className="">
          <div className="">
            <GoogleOAuthProvider 
                clientId={`${process.env.REACT_APP_CLIENT_ID}`}
                >
             <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  className=""
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
              ux_mode='redirect'
            />
            </GoogleOAuthProvider>
          </div>
    </div>
  )
}

export default GoogleLoginPage