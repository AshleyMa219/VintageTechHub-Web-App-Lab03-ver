import {useAuthContext} from "./Auth";
import {Navigate} from "react-router-dom";

function Protected({children}) {
  const {authed} = useAuthContext();
  if (authed) {
    return children;
  }
  return <Navigate to={'/login'} />
}

export default Protected;