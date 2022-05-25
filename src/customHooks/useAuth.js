
const useAuth = () => {
 const user=localStorage.getItem("token")
        
  return user
}

export default useAuth