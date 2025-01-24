import axios from 'axios'
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"


function EditCmplnt() {
    const [cmplntData, setCmplntData] = useState({ title: "", content: "", author: "", image: "" ,category:""})
    const params = useParams()
    const navigate = useNavigate()
    console.log(params)
    useEffect(() => {
        axios.get(`http://localhost:8000/complaints/cmplntById/${params.id}`).then(function (res) {
            console.log(res)
            setCmplntData((prev) => {
                return {
                    ...prev,
                    title: res.data.title,
                    content: res.data.content,
                    author: res.data.author,
                    category: res.data.category,
                    image: res.data.image
                }
            })
        }).catch(function (err) {
            console.log(err)
        })
    }, [])
    const onFeildChange = (e) => {
        setCmplntData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const saveEditedCmplnt = (e) => {
        axios.put(`http://localhost:8000/complaints/edit/${params.id}`, cmplntData).then(function (data) {
            console.log("cmplnt updated successfully")
            navigate("/complaintlist")
        }).catch(function (err) {
            console.log(err)
        })
    }
    return (
        <div className="container">
            <div className="row" style={{ border: "2px solid #ddd" }}>
                <div className="col-md-6">
                    <div className="leftside" style={{ height: '400px', background: 'teal' }}>
                        <h1 className="text-center">Complaint Edit form</h1>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">

                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" aria-describedby="emailHelp" name="title" value={cmplntData.title} onChange={(e) => onFeildChange(e)} />
                        </div>

                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label className="form-label">content</label>

                            <textarea className="form-control" rows="7" name="content" value={cmplntData.content} onChange={(e) => onFeildChange(e)}></textarea>
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-3">
                            <label className="form-label">Author</label>
                            <textarea className="form-control" rows="1" name="author" value={cmplntData.author} onChange={(e) => onFeildChange(e)} ></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <textarea className="form-control" rows="1" name="category" value={cmplntData.category} onChange={(e) => onFeildChange(e)} ></textarea>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(e) => saveEditedCmplnt(e)}>Edit</button>
                </div>

            </div>



        </div>

    )
}
export default EditCmplnt