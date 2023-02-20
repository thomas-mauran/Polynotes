import { LoadingButton } from "@mui/lab";
import {Container, TextField } from "@mui/material";
import { useState } from "react";

export default function LoginForm() {
  // Hooks
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);


  // Functions
  const handleChange = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

        setErrorMsg('')
        setLoading(true)
        console.log('submited')


  };

  // Return
  return (
    <Container fixed sx={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField name="email" label="Email address" margin="normal" variant="standard" value={inputs.email} type="email" onChange={handleChange} required />
        <TextField name="password" label="Password" margin="normal" variant="standard" type="password" value={inputs.password} onChange={handleChange} required error={errorMsg !== ""} helperText={errorMsg}/>
        <LoadingButton loading={loading} type="submit" variant="contained" color="info" sx={{ margin: "20px" }}>
          Login
        </LoadingButton>
      </form>
    </Container>
  );
}
