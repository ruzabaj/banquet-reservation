import React from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Forms = ({ handleSubmit, onSubmit, register, errors, iconCLicked, isClicked }) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='login-form'>

            {/* register your input into the hook by invoking the "register" function */}
            <div className='form-group'>
                <label>Username : </label>
                <input defaultValue="" {...register("username")} className='form-control' />
            </div>

            {/* include validation with required or other standard HTML validation rules */}
            <div className='form-group'>
                <label>Password : </label>
                <div className='input-icon'>
                    <input type={isClicked ? "text" : "password"} className='form-control' id='password-input' 
                    {...register("password", { required: true })} />
                    <span onClick={iconCLicked} className='eye-icon'>{isClicked ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</span>
                </div>
            </div>

            {/* errors will return when field validation fails  */}
            {errors.password && <span className='error'>This field is required</span>}

            <input type="submit" className='btn-submit' onClick={handleSubmit} />
        </form>
    )
}

export default Forms