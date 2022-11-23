import React from "react"
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Form() {
    const [formData, setFormData] = useState(
        {
            firstName: "", 
            lastName: "", 
            email: "", 
            password: "",
            gender: ""
        }
    )
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]:  value
            }
        })
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        // submitToApi(formData)
        setFormErrors(validate(formData));
        setIsSubmit(true);
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          console.log(formData);
        }
      }, [formErrors] );

      const navigate = useNavigate();
      function handOnSubmit () {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          navigate ('./info')
        }
      }
    
      const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
        if (!values.firstName) {
          errors.firstName = "First Name is Required!";
        }
        if (!values.lastName) {
            errors.lastName = "Last Name is Required!";
          }
        if (!values.email) {
          errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
          errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
          errors.password = "Password is required";
        } else if (!re.test(values.password)) {
          errors.password = "Password required Minimum eight characters, at least one capital letter, one lowercase letter, one number and one special character:";
        } 
        return errors;
      };
    
    return (
        <div className="container" >
        <form onSubmit={handleSubmit} className='form--data'>
            <h1>User Data</h1>
            <input
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                name="firstName"
                value={formData.firstName}
            />
            <p>{formErrors.firstName}</p>
            <input
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                name="lastName"
                value={formData.lastName}
            />
            <p>{formErrors.lastName}</p>
            <br/>
            <div className="select--">
            <label htmlFor="gender"><span id="gender--label">Gender :</span></label>
            <br />
            <select 
                id="gender" 
                value={formData.gender}
                onChange={handleChange}
                name="gender"
            >   <option>--Select--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="No Response">Prefer Not To Respond</option>
            </select>
            </div>
            <br />
            <input
                type="email"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={formData.email}
            />
            <p>{formErrors.email}</p>
            <input 
                type="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
                name="password"
            />
            <p><span id="password-container" >{formErrors.password}</span></p>
            <button className="btn" onClick={handOnSubmit} >Submit</button>
        </form>
        </div>
    )
}





// {<button className="btn">{Object.keys(formErrors).length===0 && isSubmit ?<Link to={"/info"}> Submit</Link> : "Submit"}</button>}