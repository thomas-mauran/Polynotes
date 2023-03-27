import { LoadingButton } from "@mui/lab";
import { Alert, Container, TextField, Snackbar } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../../utils/users/usersAPICalls";
import { login as loginUtils } from "../../utils/auth/utils";
import { login as loginReducer } from "../../redux/reducers/authReducer";

export default function LoginForm() {
  // Hooks
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [errorAPIList, setErrorAPIList] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Functions
  const handleChange = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setErrorMsg("");
    setLoading(true);
    const response = await login(inputs.email, inputs.password);

    if (response.error) {
      setErrorAPIList(response.message);
      setLoading(false);
    } else {
      // Store the jwt
      const { username, email, access_token, user_id } = response.data;
      loginUtils(username, email, access_token, user_id);

      return navigate(`/workspace/`);
    }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    } else {
      setErrorAPIList([]);
    }
  };

  // Return
  return (
    <Container fixed sx={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField name="email" label="Email address" margin="normal" variant="standard" value={inputs.email} type="email" onChange={handleChange} required />
        <TextField name="password" label="Password" margin="normal" variant="standard" type="password" value={inputs.password} onChange={handleChange} required error={errorMsg !== ""} helperText={errorMsg} />
        <LoadingButton loading={loading} type="submit" variant="contained" color="secondary" sx={{ margin: "20px" }}>
          Login
        </LoadingButton>
      </form>
      <Snackbar open={errorAPIList.length > 0} onClose={handleClose}>
        <div>
          {errorAPIList.map((errorMsg, index) => (
            <Alert key={index} severity="error" onClose={handleClose}>
              {errorMsg}
            </Alert>
          ))}
        </div>
      </Snackbar>
    </Container>
  );
}
