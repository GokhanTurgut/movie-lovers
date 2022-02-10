import { TextField, Button } from "@mui/material";

type Props = {}

const AddActor = (props: Props) => {
  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="container">
      <h2 className="main-title">Sign up to Movie Lovers</h2>
      <form className="form-base" onSubmit={submitHandler}>
        <TextField
          id="firstName"
          label="First Name"
          variant="outlined"
          // onChange={}
          // error={}
          // helperText={}
        />
        <TextField
          id="lastName"
          label="Last Name"
          variant="outlined"
          // onChange={}
          // error={}
          // helperText={}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          // onChange={}
          // error={}
          // helperText={}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          // onChange={}
          // error={}
          // helperText={}
        />
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          // onChange={}
          // error={}
          // helperText={}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default AddActor