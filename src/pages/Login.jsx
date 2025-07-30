import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import login from "../assets/login.png";
import logo from "../assets/didi.png"
import axios from "axios";
import { toast } from "react-toastify";



const Login = () => {
  const { token, setToken, navigate, server_url } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState("Sign Up");

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async(e) => {
    e.preventDefault()

    try {
      if(currentState === "Sign Up"){
        const response = await axios.post(server_url + '/api/user/register', {name, email, password})

        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else{
          toast.error(response.data.message)
        }
      }else{
        const response = await axios.post(server_url + '/api/user/login', {email, password})

        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else[
          toast.error(response.data.message)
        ]
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(token){
      navigate('/')
    }
  }, [token])
  return (
    <div className="absolute t0p-0 left-0 h-full w-full z-50 bg-white">
      <div className="flex h-full w-full">
        <div className="w-1/2 hidden sm:block items-center gap-3">
          <img src={login} alt="" className="object-cover h-full w-full" />
        </div>

        <div className="flex w-full sm:w-1/2 items-center justify-center"> 
          <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5"  action="">
            <div className="w-full flex items-center gap-3 mb-4">
              <h3 className="bold-36">{currentState}</h3>
              <img src={logo} alt="" className="w-20 h-20 object-contain" />
            </div>
            {currentState === "Sign Up" && (
              <div className="w-full">
                <label htmlFor="name" className="medium-15">
                  Name
                </label>
                <input
                onChange={(e) => setName(e.target.value)}
                value={name}
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
                type="email"
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
                type="password"
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
