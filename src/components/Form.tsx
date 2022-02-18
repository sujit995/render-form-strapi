import React from 'react'
import { BsPaperclip } from 'react-icons/bs';
import '../styles/form.css';

type Props = {}


const Form = (props: Props) => {
  return (
    <div className="form_container">
      <div className="col-lg-8 p-auto m-auto">
        <h4 className="col-lg-6 heading">SUBMIT YOUR APPLICATION</h4>
        <div className="d-flex">
          <label className="col-lg-3">Resume/CV<span>✱</span></label>
          <div className="file__wrapper">
                <button className="upload__button" disabled><BsPaperclip style={{color:'#515357',marginRight:'13px'}}/>attach resume/cv</button>
                <input className="file__input" type='file' accept='application/pdf' />
          </div>
        </div>
        <div className="d-flex mt-4">
          <label className="col-lg-3">Full Name<span>✱</span></label>
          <input type="text" className="col-lg-6" id="formInput" />
        </div>
        <div className="d-flex mt-4">
          <label className="col-lg-3">Email<span>✱</span></label>
          <input type="text" className="col-lg-6" id="formInput" />
        </div>
        <div className="d-flex mt-4">
          <label className="col-lg-3">Phone</label>
          <input type="text" className="col-lg-6" id="formInput" />
        </div>
        <div className="d-flex mt-4">
          <label className="col-lg-3">Current Company</label>
          <input type="text" className="col-lg-6" id="formInput" />
        </div>
      </div>

      <div className="col-lg-8 p-auto m-auto">
        <h4 className="col-lg-6 heading">Links</h4>
        <div className="d-flex mt-4">
          <label className="col-lg-3">LinkedIn URL</label>
          <input type="text" className="col-lg-6" id="formInput" />
        </div>
        <div className="d-flex mt-4">
          <label className="col-lg-3">Twitter URL</label>
          <input type="text" className="col-lg-6" id="formInput" />
        </div>
        <div className="d-flex mt-4">
          <label className="col-lg-3">Github URL</label>
          <input type="text" className="col-lg-6" id="formInput" />
        </div>
        <div className="d-flex mt-4">
          <label className="col-lg-3">Portfolio URL</label>
          <input type="text" className="col-lg-6" id="formInput" />
        </div>
        <div className="d-flex mt-4">
          <label className="col-lg-3">Other Website</label>
          <input type="text" className="col-lg-6" id="formInput" />
        </div>
      </div>

      <div className="col-lg-8 p-auto m-auto">
        <h4 className="col-lg-6 heading">PREFERRED PRONOUNS</h4>
        <div className="col-lg-10">
            <label>If you'd like, please share your pronouns with us.</label>
            <input className="form-control" placeholder="Type your Response" />
        </div>
      </div>

      <div className="col-lg-8 p-auto m-auto pt-4">
        <h4 className="col-lg-6 heading">PREFERRED PRONOUNS</h4>
        <div className="col-lg-10">
          <textarea className="form-control rounded-0" id="formControlTextarea" placeholder="Add a cover letter or anything else you want to share." style={{ height:'130px'}}></textarea>
        </div>
      </div>

      <div className="col-lg-8 m-auto pt-4">
        <hr className="col-lg-10"/>
      </div>

      <div className="col-lg-8 m-auto">
        <h4 className="col-lg-10 heading">U.S. EQUAL EMPLOYMENT OPPORTUNITY INFORMATION <span style={{ fontSize:'.8rem'}}>(Completion is voluntary and will not subject you to adverse treatment)</span></h4>
        <p className="col-lg-10">Our company values diversity. To ensure that we comply with reporting requirements and to learn more about how we can increase diversity in our candidate pool, we invite you to voluntarily provide demographic information in a confidential survey at the end of this application. Providing this information is optional. It will not be accessible or used in the hiring process, and has no effect on your opportunity for employment.</p>
      </div>

      <div className="col-lg-8 p-auto m-auto">
        <div className="d-flex mt-4">
          <label className="col-lg-3">Gender</label>
          <select className="col-lg-6 selectpicker">
            <option title="Combo 1">Select...</option>
            <option title="Combo 2">Male</option>
            <option title="Combo 3">Female</option>
            <option title="Combo 4">Decline to self-identify</option>
          </select>
        </div>
        <div className="d-flex mt-4">
          <label className="col-lg-3">Race</label>
          <select className="col-lg-6 selectpicker">
            <option>Select ...</option>
            <option>Hispanic or Latino</option>
            <option>White (Not Hispanic or Latino)</option>
            <option>Black or African American (Not Hispanic or Latino)</option>
            <option>Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)</option>
            <option>Asian (Not Hispanic or Latino)</option>
            <option>American Indian or Alaska Native (Not Hispanic or Latino)</option>
            <option>Two or More Races (Not Hispanic or Latino)</option>
            <option>Decline to self-identify</option>
          </select>
        </div>
        <div className="d-flex mt-4">
          <label className="col-lg-3">Gender</label>
          <select className="col-lg-6 selectpicker">
            <option>Select ...</option>
            <option>I am a veteran</option>
            <option>I am not a veteran</option>
            <option>Decline to self-identify</option>
          </select>
        </div>
      </div>
      <div className="container bg-light">
        <div className="col-md-12 text-center mt-4 pt-4">
            <button type="button" className="btn btn">Submit Application</button>
        </div>
    </div>
    </div>
  )
}

export default Form