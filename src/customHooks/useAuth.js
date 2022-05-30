// import { useContext } from "react"
// import AuthContext from "../contexts/AuthProvider"

const useAuth = () => {
  // const {auth,setAuth}=useContext(AuthContext)
  const accessToken=localStorage.getItem("token")

  // accessToken?setAuth({accessToken,islogged:true}):setAuth({})

        
  return accessToken;
}

export default useAuth