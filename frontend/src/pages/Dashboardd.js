import axios from 'axios'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


function Dashboardd() {

    const [cmplntData, setcmplntData] = useState({ title: "", content: "", author: "", image :"",category:"" })
    const navigate = useNavigate();

    const onFeildChange = (e) => {
        setcmplntData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const goToCmplntList=(e)=>{
        navigate("/complaintlist")
    }

    const saveCmplnt = (e) => {
        axios.post("http://localhost:8000/complaints/create", cmplntData).then(function (data) {
            console.log("cmplnt created successfully")
            navigate("/complaintlist")
        }).catch(function (err) {
            console.log(err)
        })
    }
    const onFileChange = (e) =>{
        console.log(e)
        const formData = new FormData()
        formData.append("cmplntimage",e.target.files[0])
        axios.post("http://localhost:8000/complaints/imageupload", formData).then(function (data) {
            console.log("image uploaded successfully")
            setcmplntData((prev) => {
                return {
                    ...prev,
                    image:data.data.image
                }
            })
            
        }).catch(function (err) {
            console.log(err)
        })
    }
    return (
        <div className="container">
            <div className="row" style={{ border: "2px solid #ddd" }}>
                <div className="col-md-6">
                    <div className="leftside" style={{ height: '400px', background: 'teal' }}>
                        <h1 className="text-center">Complaint register form</h1>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">

                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" aria-describedby="emailHelp" name="title" value={cmplntData.title} onChange={(e) => onFeildChange(e)} />
                            <div id="emailHelp" className="form-text"></div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label className="form-label">content</label>

                            <textarea className="form-control" rows="7" value={cmplntData.content} name="content" onChange={(e) => onFeildChange(e)}></textarea>
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-3">
                            <label className="form-label">Author</label>
                            <textarea className="form-control" rows="1" value={cmplntData.author} name="author" onChange={(e) => onFeildChange(e)} ></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <textarea className="form-control" rows="1" value={cmplntData.category} name="category" onChange={(e) => onFeildChange(e)} ></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label className="form-label">upload image</label>
                            <input className="form-control" type="file" rows="1"name="category" onChange={(e) => onFileChange(e)} ></input>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={(e) => saveCmplnt(e)}>Create</button>

                </div>
               
                
            </div>
            <button type="text" className="btn btn-primary" onClick={(e) => goToCmplntList(e)}>Back</button>
           
        </div>

    )
}
export default Dashboardd