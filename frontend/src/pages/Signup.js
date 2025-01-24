import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
function Signup() {
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [role,setrole] = useState("")

    const onEmailChange = (e) => {
        setemail(e.target.value)
    }
    const onPasswordChange = (e) => {
        setpassword(e.target.value)
    }
    const onRoleChange = (e)=>{
        setrole(e.target.value)
    }
    const signup = (e) => {

        e.preventDefault();
        const data = {
            email,password,role
        }
        axios.post("http://localhost:8000/auth/signup", data).then(function (data) {
            console.log("signup successfull")
            navigate("/")

        }).catch(function (err) {
            console.log(err)
        })

    }
    return (
        <div>
            <h1>Signup page</h1>
            <form onSubmit={(e) => signup(e)}>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control" value={email} onChange={(e) => onEmailChange(e)} />
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" value={password} onChange={(e) => onPasswordChange(e)} />
                </div>
                <div class="mb-3">
                    <label class="form-label">Role</label>
                    <input type="text" class="form-control" value={role} onChange={(e) => onRoleChange(e)} />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
                <div>
                    <p>Already have an account?? Login  <Link to="/">Here</Link></p>
                </div>
            </form>
        </div>
    )
}
export default Signup