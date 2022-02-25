import { BsPaperclip } from 'react-icons/bs';
import { useState, useEffect } from "react";
import '../styles/form.css';
import { useForm } from 'react-hook-form';
import InputForm from './InputForm';
import ReCAPTCHA from "react-google-recaptcha";
import { db, storage } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { UUID } from 'uuid-generator-ts';
import { AiOutlineInfoCircle } from 'react-icons/ai';


type Props = {}


const gender = ['Male', 'Female', 'Decline to self identify']
const race = ['Hispanic or Latino', 'White (Not Hispanic or Latino)', 'Black or African American (Not Hispanic or Latino)', 'Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)', 'Asian (Not Hispanic or Latino)', 'American Indian or Alaska Native (Not Hispanic or Latino)', 'Two or More Races (Not Hispanic or Latino)']
const veteran = ['I am a veteran', 'I am not a verteran', 'Decline to self identify']


const Form = (props: Props) => {

  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();

  const [isCaptchaClicked, setIsCaptchaClicked] = useState(false);
  const [showCaptchaError, setShowCaptchaError] = useState(false);
  const [raceDescription, setRaceDescription] = useState(false);
  const [resumeLabel, setResumeLabel] = useState('Attach Resume/CV')
  const [resumeError, setResumeError] = useState('null')

  const onChange = () => {
    setIsCaptchaClicked(true);
    setShowCaptchaError(false);
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsCaptchaClicked(false)
      reset()
    }
  }, [isSubmitSuccessful, reset])

  const addData = (data: any) => {

    if (isCaptchaClicked) {
      const storageRef = ref(storage, new UUID().getDashFreeUUID())
      const uploadTask = uploadBytesResumable(storageRef, data.Resume[0])

      uploadTask.on('state_changed',
        (snapshot) => (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => {
          console.log('something went wrong', error)
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            data.Resume = downloadURL;
            addDoc(collection(db, 'candidates'), data)
              .then(() => {
                alert('added to database')

              }).catch((e) => {
                alert("error" + e)
                const deleteRef = ref(storage, downloadURL)
                deleteObject(deleteRef)
              })
          });
        }
      )
      setIsCaptchaClicked(false);
    } else {
      setShowCaptchaError(true);
    }
  }


  const onInputChage = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      setResumeLabel(e.currentTarget.files[0].name)
      if (e.currentTarget.files[0].type !== 'application/pdf')
        setResumeError('Invalid File Format')
      else if (e.currentTarget.files[0].size > 5 * 1024 * 1024)
        setResumeError('File size is greater than 5MB')
      else
        setResumeError('null')
    } else {
      setResumeError('This field is required')
    }
  }


  return (
    <div className="form_container">
      <form onSubmit={handleSubmit((data) => {
        if (Object.keys(errors).length == 0 && resumeError === 'null') {
          addData(data)
        }
      })}>
        <div className="col-lg-8 p-auto m-auto">
          <h4 className="col-lg-6 heading">SUBMIT YOUR APPLICATION</h4>
          <div className="row d-flex mt-4 m-3">
            <label className="col-lg-3">Resume/CV<span className="star">✱</span></label>
            <div className="col-lg-6 file__wrapper">
              <button className="upload__button" disabled><BsPaperclip style={{ color: '#515357', marginRight: '13px' }} />{resumeLabel}</button>
              <input className="file__input" type='file' accept='application/pdf' onInput={(e) => onInputChage(e)} {...register('Resume')} />
              {errors.Resume && <p>{errors.picture.message}</p>}
            </div>
          </div>
          <InputForm type='text' label='Full Name' register={register} error={errors} />
          <InputForm type='email' label='Email' register={register} error={errors} />
          <InputForm type='text' label='Phone' register={register} error={errors} />
          <InputForm type='text' label='Current Company' register={register} error={errors} />
        </div>

        <div className="col-lg-8 p-auto m-auto">
          <h4 className="col-lg-6 heading">Links</h4>
          <InputForm type='url' label='LinkedIn URL' register={register} error={errors} />
          <InputForm type='url' label='Twitter URL' register={register} error={errors} />
          <InputForm type='url' label='GitHub URL' register={register} error={errors} />
          <InputForm type='url' label='Portfolio URL' register={register} error={errors} />
          <InputForm type='url' label='Other website' register={register} error={errors} />
        </div>

        <div className="col-lg-8 p-auto m-auto">
          <h4 className="col-lg-6 heading">PREFERRED PRONOUNS</h4>
          <div className="col-lg-10">
            <label>If you'd like, please share your pronouns with us.</label>
            <input className="form-control shadow-none" placeholder="Type your Response" />
          </div>
        </div>

        <div className="col-lg-8 p-auto m-auto pt-4">
          <h4 className="col-lg-6 heading">PREFERRED PRONOUNS</h4>
          <div className="col-lg-10">
            <textarea className="form-control rounded-0 shadow-none" id="formControlTextarea" placeholder="Add a cover letter or anything else you want to share." style={{ height: '130px' }} {...register('TextArea', { minLength: 30 })} />
            {errors?.TextArea?.type === 'minLength' && <p style={{ color: 'red' }}>Min Length should be 30 characters</p>}
          </div>
        </div>

        <div className="col-lg-8 m-auto">
          <h4 className="col-lg-10 heading">U.S. EQUAL EMPLOYMENT OPPORTUNITY INFORMATION &nbsp;&nbsp; <span style={{ fontSize: '.8rem', }}>(Completion is voluntary and will not subject you to adverse treatment)</span></h4>
          <p className="col-lg-10">Our company values diversity. To ensure that we comply with reporting requirements and to learn more about how we can increase diversity in our candidate pool, we invite you to voluntarily provide demographic information in a confidential survey at the end of this application. Providing this information is optional. It will not be accessible or used in the hiring process, and has no effect on your opportunity for employment.</p>
        </div>

        <div className="col-lg-8 p-auto m-auto">
          <div className="row d-flex mt-4 m-3">
            <label className="col-lg-3">Gender</label>
            <select className="col-lg-6 selectpicker" {...register('Gender', { required: true })}>
              <option title="Combo 1">Select...</option>
              {
                gender.map(item => <option value={item}>{item}</option>)
              }
              {errors?.Gender && <p>Select Gender Value</p>}
            </select>
          </div>
          <div className="row d-flex mt-4 m-3">
            <label className="col-lg-3">Race&nbsp;&nbsp;<AiOutlineInfoCircle style={{ cursor: 'pointer' }} onClick={() => setRaceDescription(!raceDescription)} /></label>
            <select className="col-lg-6 selectpicker" {...register('Race')}>
              <option>Select ...</option>
              {race.map(item => <option value={item}>{item}</option>)}
            </select>
            {
              raceDescription ?
                <div className="row d-flex mt-4">
                  <label className="col-lg-3"></label>
                  <ul className="col-lg-6" style={{ listStyle: 'none' }}>
                    <li>
                      <div>Hispanic or Latino</div>
                      <div style={{ color: '#555659', fontSize: '12px', marginTop: '5px' }}>
                        A person of Cuban, Mexican, Puerto Rican, South or Central American, or other Spanish culture or origin regardless of race.
                      </div>
                    </li>
                    <li>
                      <div style={{ marginTop: '5px' }}>White (Not Hispanic or Latino)</div>
                      <div style={{ color: '#555659', fontSize: '12px', marginTop: '5px' }}>
                        A person having origins in any of the original peoples of Europe, the Middle East, or North Africa.
                      </div>
                    </li>
                    <li>
                      <div style={{ marginTop: '5px' }}>Black or African American (Not Hispanic or Latino)</div>
                      <div style={{ color: '#555659', fontSize: '12px', marginTop: '5px' }}>
                        A person having origins in any of the black racial groups of Africa.
                      </div>
                    </li>
                    <li>
                      <div style={{ marginTop: '5px' }}>Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)</div>
                      <div style={{ color: '#555659', fontSize: '12px', marginTop: '5px' }}>A person having origins in any of the peoples of Hawaii, Guam, Samoa, or other Pacific Islands.</div>
                    </li>
                    <li>
                      <div style={{ marginTop: '5px' }}>Asian (Not Hispanic or Latino)</div>
                      <div style={{ color: '#555659', fontSize: '12px', marginTop: '5px' }}>A person having origins in any of the original peoples of the Far East, Southeast Asia, or the Indian Subcontinent, including, for example, Cambodia, China, India, Japan, Korea, Malaysia, Pakistan, the Philippine Islands, Thailand, and Vietnam.</div>
                    </li>
                    <li>
                      <div style={{ marginTop: '5px' }}>American Indian or Alaska Native (Not Hispanic or Latino)</div>
                      <div style={{ color: '#555659', fontSize: '12px', marginTop: '5px' }}>A person having origins in any of the original peoples of North and South America (including Central America), and who maintain tribal affiliation or community attachment.</div>
                    </li>
                    <li>
                      <div style={{ marginTop: '5px' }}>Two or More Races (Not Hispanic or Latino)</div>
                      <div style={{ color: '#555659', fontSize: '12px', marginTop: '5px' }}>All persons who identify with more than one of the above five races.</div>
                    </li>
                  </ul>
                </div>
                : null
            }

          </div>
          <div className="row d-flex mt-4 m-3">
            <label className="col-lg-3">Veteran Status</label>
            <select className="col-lg-6 selectpicker" {...register('Veteran')}>
              <option>Select ...</option>
              {veteran.map(item => <option value={item}>{item}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-4 pt-4" style={{ textAlign: "center" }}>
          <ReCAPTCHA
            sitekey="6LeunJ4eAAAAANvbVY0arNQLaXnK9Rpzz0nrDXl3"
            onChange={onChange}
            style={{ display: 'inline-block' }}
          />
          {showCaptchaError ? <p>Captcha not clicked</p> : <></>}
        </div>
        <div className="container bg-light">
          <div className="col-md-12 text-center mt-4 pt-4">
            <button type="submit" className="btn">Submit Application</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Form;