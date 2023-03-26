import { LoadingButton } from "@mui/lab";
import { Alert, Box, Checkbox, Container, FormControlLabel, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { signup } from "../../utils/users/usersAPICalls";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
export default function SignupForm() {
  // HOOKS
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    checkbox: false,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [errorAPIList, setErrorAPIList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // FUNCTIONS
  const handleChange = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrorAPIList([]);
    setErrorMsg("");
    if (inputs.password != inputs.passwordConfirm) {
      setErrorMsg("Both passwords needs to match");
    } else if (inputs.checkbox === false) {
      setErrorAPIList(["You need to accept the terms and conditions"]);
    } else {
      setErrorMsg("");
      setErrorAPIList([]);
      setLoading(true);
      const response = await signup(inputs.username, inputs.email, inputs.password);

      if (response.error) {
        console.log(response);
        setErrorAPIList(response.message);
        setLoading(false);
      } else {
        return navigate(`/verifyEmail/${inputs.email}`);
      }
    }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    } else {
      setErrorAPIList([]);
    }
  };

  // RETURN
  return (
    <Container fixed sx={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField name="username" label="Username" margin="normal" variant="standard" value={inputs.username} onChange={handleChange} required />
        <TextField name="email" label="Email address" margin="normal" variant="standard" value={inputs.email} type="email" onChange={handleChange} required />
        <TextField name="password" label="Password" margin="normal" variant="standard" type="password" value={inputs.password} onChange={handleChange} required error={errorMsg !== ""} helperText={errorMsg} />
        <TextField name="passwordConfirm" label="Password confirmation" margin="normal" variant="standard" type="password" value={inputs.passwordConfirm} onChange={handleChange} required error={errorMsg !== ""} helperText={errorMsg} />
        <Box>
          <Checkbox value={inputs.checkBox} onChange={handleChange} name="checkbox" />
          <Typography variant="body2" sx={{ display: "inline", textAlign: "left" }}>
            I agree to the{" "}
            <Link to="/cgu" style={{ textDecoration: "underline" }}>
              Polynote Terms and Conditions
            </Link>
          </Typography>
        </Box>
        <LoadingButton loading={loading} type="submit" variant="contained" color="secondary" sx={{ margin: "20px" }}>
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
