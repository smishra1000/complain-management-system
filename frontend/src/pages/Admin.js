import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
function AdminComplaintList() {
    const [cmplnts, setCmplnts] = useState([])
    const [searchKey, setsearchKey] = useState("")
    const [categories, setCategories] = useState(["All", "Tech", "Science", "Bio"])
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
    const navigate = useNavigate();
    useEffect(() => {
        getAllCmplnts()
    }, [])
    const getAllCmplnts = () => {
        axios.get("http://localhost:8000/complaints/all").then(function (res) {
            setCmplnts(res.data)
        }).catch(function (err) {
            console.log(err)
        })
    }
    const goToLogout = () => {
        navigate("/login")
    }
    const deleteCmplnt = (e, cmplnt) => {
        axios.delete(`http://localhost:8000/complaints/deleteCmplnt/${cmplnt._id}`).then(function (res) {
            getAllCmplnts()
        }).catch(function (err) {
            console.log(err)
        })
    }
    const changeSearchKey = (e) => {
        setsearchKey(e.target.value)
    }
    const searchCmplnts = (e) => {
        e.preventDefault();
        if (searchKey !== "") {
            axios.get(`http://localhost:8000/complaints/searchByTitle/${searchKey}`).then(function (res) {
                setCmplnts(res.data)
            }).catch(function (err) {
                console.log(err)
            })
        } else {
            getAllCmplnts()
        }
    }
    const getByCategory = (e, category, index) => {
        setSelectedCategoryIndex(index)
        console.log(category)
        axios.get(`http://localhost:8000/complaints/searchByCategory/${category}`).then(function (res) {
            setCmplnts(res.data)
        }).catch(function (err) {
            console.log(err)
        })
    }


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-9">
                    <h3>All Complaints</h3>
                </div>
                <div className="col-md-3" style={{ textAlign: "right" }}>

                    <button className="btn btn-danger btn-sm" onClick={() => goToLogout()}>Logout</button>
                </div>

            </div>
            <div className="row">
                <div className="col-md-6">
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search By Title" aria-label="Search" onChange={(e) => changeSearchKey(e)} value={searchKey} />
                        <button class="btn btn-outline-success" type="submit" onClick={(e) => searchCmplnts(e)}>Search</button>
                    </form>
                </div>
                <div className="col-md-6" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {categories.map((category, index) => {
                        return (
                            <span className={selectedCategoryIndex === index ? 'badge rounded-pill bg-success' : 'badge rounded-pill bg-secondary'} style={{ cursor: "pointer" }} onClick={(e) => getByCategory(e, category, index)}>{category}</span>
                        )
                    })

                    }
                </div>
            </div>


            <ul className="list-group">
                {cmplnts && cmplnts.map((cmplnt) => {
                    return (
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="cmplnt-image">
                                        <img src={`http://localhost:8000/uploads/${cmplnt.image}`} alt="Description" style={{ height: '200px' }} />
                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <h2>{cmplnt.title}</h2>
                                    <p>{cmplnt.content}</p>
                                    <div className="row">
                                        <p>Author:<span className="badge text-bg-warning">{cmplnt.author}</span></p>
                                        <p>Category:<span className="badge text-bg-danger">{cmplnt.category}</span></p>
                                    </div>

                                    <a href="#" className="btn btn-primary">Read more</a>

                                </div>
                                <div className="col-md-2 d-flex flex-column justify-content-start align-items-start">
                                    <button className="btn btn-sm btn-danger mb-2" onClick={(e) => deleteCmplnt(e, cmplnt)}>Delete</button>
                
                                    <button className="btn btn-sm btn-info mt-4"style={{ marginTop: "40px" }} >Solve the Issue </button>
                                </div>


                            </div>
                        </li>


                    )
                })}



            </ul>




        </div>

    )
}
export default AdminComplaintList