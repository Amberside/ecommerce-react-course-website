import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [mode, setMode] = useState("signup");
  const [ error, setError] = useState(null);

  const { signup, login } = useAuth();

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const navigate = useNavigate();

  function onSubmit(data){
    setError(null);
    let result;
    if (mode === "signup") {
      result = signup(data.email, data.password);

    } else {
      result = login(data.email, data.password);
    }
    if(result.success){
      navigate("/");
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">{ mode === "signup" ? "Sign Up" : "Login" }</h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="Email" className="form-label">Email</label>
              <input type="email" className="form-input" id="Email " {...register("email", {required: "Email is required"})}/>
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label"></label>
              <input 
                {...register("password", 
                  {required: "Password is required", 
                    minLength: { value: 8, message: "Password must be at least 8 Characters"},
                    maxLength: { value: 16, message: "Password must be less the 16 Characters"},
                  }
                )}
                type="password" 
                className="form-input" 
                id="password"
              />
              {errors.password && <span className="form-error">{errors.password.message}</span>}
            </div>
            <button className="btn btn-primary btn-large" type="submit">{ mode === "signup" ? "Sign Up" : "Login" }</button>
            <div className="auth-switch">
              {/* note: this span should be a button */}
              {
                mode === "signup" ?
                <p>Already have an account? <span className="auth-link" onClick={() => setMode("login")}>Login</span></p> :
                <p>Don't have an account? <span className="auth-link" onClick={() => setMode("signup")}>Sign Up</span></p>  
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth;