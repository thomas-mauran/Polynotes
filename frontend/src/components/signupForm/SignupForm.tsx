import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Container, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { signup } from "../../utils/users/usersAPICalls";

export default function SignupForm() {
  // Hooks
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [errorAPIList, setErrorAPIList] = useState([]);

  const [loading, setLoading] = useState(false);

  // Functions
  const handleChange = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (inputs.password != inputs.passwordConfirm) {
      setErrorMsg("Both passwords needs to match");
    } else {
      setErrorMsg("");
      setErrorAPIList([]);
      setLoading(true);
      const response = await signup(inputs.username, inputs.email, inputs.password);

      if (response.error) {
        setErrorAPIList(response.message);
      } else {
        console.log("good");
      }
      setLoading(false);
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
        <TextField name="username" label="Username" margin="normal" variant="standard" value={inputs.username} onChange={handleChange} required />
        <TextField name="email" label="Email address" margin="normal" variant="standard" value={inputs.email} type="email" onChange={handleChange} required />
        <TextField name="password" label="Password" margin="normal" variant="standard" type="password" value={inputs.password} onChange={handleChange} required error={errorMsg !== ""} helperText={errorMsg} />
        <TextField name="passwordConfirm" label="Password confirmation" margin="normal" variant="standard" type="password" value={inputs.passwordConfirm} onChange={handleChange} required error={errorMsg !== ""} helperText={errorMsg} />
        <LoadingButton loading={loading} type="submit" variant="contained" color="info" sx={{ margin: "20px" }}>
          Signup
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
