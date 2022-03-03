import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form';
import '../styles/inputform.css';

interface Props{
  type:string;
  label:string;
  style?:string;
  placeholder?:string;
  register?:UseFormRegister<FieldValues>;
  error?:{[key: string]: any};
  
}

const checkRequired =(label:string):boolean=>{
  switch(label){
      case 'Full Name':
      case 'Resume/CV':
      case 'Email':
      return true;
  }
  return false;
}

const getValidation = (label:string)=>{
  var obj: {[key: string]: any} = {};
  switch(label){
      case 'Full Name':
          obj.required = true;
          obj.minLength = 10;
          obj.pattern = /[a-zA-Z][a-zA-Z ]+/
          return obj;
      case 'Email':
          obj.required = true;
          obj.pattern=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
          return obj;
      case 'Phone':
          obj.pattern=/^(\+[\d]{1,4})[1-9]\d{3,13}$/
          obj.required=true
          return obj;
      case 'LinkedIn URL' :
          obj.pattern=/((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/
          return obj;
          
      default : return obj;
  }
}

const toPascalCase = (sentence:string) => sentence
.split(' ')
.map(word => word[0]
.toUpperCase()
.concat(word.slice(1)))
.join('');

export const InputForm:React.FC<Props> = ({type,label,placeholder,register,error}):JSX.Element => {
  return (
    <>
      <div className="row d-flex mx-auto mt-4">
      <label className="col-lg-3 mt-2">{label}{checkRequired(label)?<span className="star">✱</span>:null}</label>
      <input className="col-lg-7" id="formInput" { ...register?{...register(toPascalCase(label),getValidation(label))}:null } type={type} placeholder={placeholder} />
            {error?error[toPascalCase(label)]?.type === 'required' && <p style={{color:'red', minWidth:'300px'}}>This Field is required</p>:null}
            {error?error[toPascalCase(label)]?.type === 'pattern' && <p style={{color:'red', minWidth:'300px'}}>{label==='Phone'?`Invalid Phone number`:`Invalid ${label}`}</p>:null}
            {error?error[toPascalCase(label)]?.type === 'minLength' && <p style={{color:'red', minWidth:'300px'}}>Value cant be less than 10 characters</p>:null}
      </div>
    </>
  )
}

export default InputForm