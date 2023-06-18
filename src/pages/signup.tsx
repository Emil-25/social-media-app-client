import SignUp from "@/components/auth/signup";
import { LoggedRoute } from "@/components/protectedRoute";

function Signup() {
  return (
    <SignUp />
  )
}

export default LoggedRoute(Signup)
