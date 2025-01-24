import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const onEmailChange = (e) => {
        setemail(e.target.value)
    }
    const onPasswordChange = (e) => {
        setpassword(e.target.value)
    }
    const login = (e) => {

        e.preventDefault();
        const data = {
            email, password
        }
        axios.post("http://localhost:8000/auth/login", data).then(function (data) {
            if (data.data.success === true) {
                console.log(data)
                localStorage.setItem("authData", JSON.stringify({ token: data.data.token, role: data.data.role }))
                navigate("/complaintlist")
            }

        }).catch(function (err) {
            console.log(err)
        })

    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <form onSubmit={(e) => login(e)}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => onEmailChange(e)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => onPasswordChange(e)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <div>
                        <p>
                            Don't have an account? Sign up <Link to="/signup">Here</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login