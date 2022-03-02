
import axios from "axios";


export const uploadData=async(sendData:any)=>{
    
    let data = new FormData()
    data.append('files',sendData.Resume[0])

    const  upload_resume = await axios({
        method:"POST",
        url:'http://localhost:1337/api/upload',
        data:data
    })
    sendData.Resume = upload_resume.data[0]
    uploadForm(sendData)   
}

const uploadForm=async(formData:any)=>{

    var sendData: {[key: string]: any} = {};
    sendData.data = formData;
    
    const upload_status = await axios({
        method:"POST",
        url:'http://localhost:1337/api/forms',
        data:sendData
    })
    console.log(upload_status)
}