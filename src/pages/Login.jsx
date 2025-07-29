import React, { useContext, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import login from "../assets/login.png";

const Login = () => {
  const { token, setToken, navigate } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState("Sign Up");
  return (
    <div className="absolute t0p-0 left-0 h-full w-full z-50 bg-white">
      <div className="flex h-full w-full">
        <div className="w-1/2 hidden sm:block ">
          <img src={login} alt="" className="object-cover h-full w-full" />
        </div>

        <div className="flex w-full sm:w-1/2 items-center justify-center"> 
          <form className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5"  action="">
            <div className="w-full mb-4">
              <h3 className="bold-36">{currentState}</h3>
            </div>
            {currentState === "Sign Up" && (
              <div className="w-full">
                <label htmlFor="name" className="medium-15">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
                  required
                />
              </div>
            )}

            <div className="w-full">
              <label htmlFor="email" className="medium-15">
                Email
              </label>
              <input
                type="text"
                placeholder="email"
                className="w-full px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
                required
              />
            </div>

            <div className="w-full">
              <label htmlFor="password" className="medium-15">
                Password
              </label>
              <input
                type="text"
                placeholder="password"
                className="w-full px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
                required
              />
            </div>
            {currentState === "Sign Up" && (
              <div className="w-full">
              <label htmlFor="confirm-password" className="medium-15">
                Confirm Password
              </label>
              <input
                type="text"
                placeholder="confirmPassword"
                className="w-full px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
                required
              />
            </div>
            )}
            
            <button className="btn-dark w-full mt-5 !py-[9px] !rounded-lg">
              {currentState === "Sign Up" ? "Sign Up" : "Login"}
            </button>
            <div className="w-full flex flex-col gap-y-3">
              <div className="underline medium-15">Forgot your password?</div>
              {currentState === "Login" ? (
                <div className="underline medium-15">
                  Don't have an account?
                  <span onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">Create Account</span>
                </div>
              ) : (
                <div className="underline medium-15">
                  Already hava an Account?
                  <span onClick={() => setCurrentState('Login')} className="cursor-pointer">Login here</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
