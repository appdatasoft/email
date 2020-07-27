import React, { Component } from 'react';
import {
  FormControl, Button, Grid, Card,Snackbar,
  TextField, Typography
} from '@material-ui/core';
// import '@material-ui/core';

const post = async (data) => {
  const { url } = data;
  console.log(data);
  delete data.url;

  const params = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  const response = await fetch(url, params);

  if (response.status < 200 && response.status >= 300) {
    const res = await response.json();

    throw new Error(res);
  } else {
    console.log("success");
  }

  return response.json();
};

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      submitted: false,
      fields: { name: 'vamshi', email: 'tt@tt.com', message: 'some ex message' },
      nameError: false,
      emailError: false,
      messageError: false
    };

  }

  isEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    }
    return (false)
  }

  validate(name, email, message) {
    let isValid = true;
    if (name.trim() === '') {
      isValid = false;
      this.setState({ nameError: true });
    } else {
      this.setState({ nameError: false });
    }
    if (message.trim() === '' || message == null) {
      isValid = false;
      this.setState({ messageError: true });
    } else {
      this.setState({ messageError: false });
    }
    if (!this.isEmail(email)) {
      isValid = false;
      this.setState({ emailError: true });
    } else {
      this.setState({ emailError: false });
    }

    return isValid;





  }
  submitForm(event) {
    // event.preventDeault();

    const formElement = event.target;
    console.log(formElement.elements);
    // const {name, email, message} = formElement.elements;

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    console.log(name, email, message);

    if (this.validate(name, email, message)) {
      console.log("success detials");

      // build the request payload which includes the url of the end-point we want to hit
      const payload = {
        url: '/api/contact',
        name: name,
        email: email,
        message: message
      };
      console.log(payload);

      // call the post helper function which returns a promise, which we can use to update the
      // state of our component once returned
      post(payload)
        .then(() => {
          // on success, clear any errors and set submitted state to true
          console.log("in success");
          this.setState({ error: null, submitted: true });
          document.getElementById("name").value = '';
          document.getElementById("email").value = '';
          document.getElementById("message").value = '';
        })
        .catch(error => {
          // on error, update error state with the error message and set submitted to false
          this.setState({ error: error.message, submitted: false });
        });
    } else {
      console.log("invalid inputs");
    }

  }

  render() {
    return (
      <>
        <Grid container justify="space-around" spacing={4}>
          <Grid item xs={12} sm={6} md={5} lg={4}  >
            <Card xs={6} style={{ marginTop: "80px", backgroundColor: "rgb(250,250,255)", padding: "20px" }}>
              <FormControl xs={12} sm={12} md={12} lg={12} xl={12} spacing={4}>
                <Grid container spacing={3} direction="column" justify="space-around">
                  <Grid item>
                    <Typography variant="h5" >
                      Submit Details to Contact Us !
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField error={this.state["nameError"]} fullWidth={true} id="name" label="Name" variant="outlined" /> </Grid>
                  <Grid item><TextField error={this.state["emailError"]} type="email" fullWidth={true} id="email" label="Email" variant="outlined" /></Grid>
                  <Grid item> <TextField error={this.state["messageError"]} multiline fullWidth={true} id="message"
                    rows={4} label="Message" variant="outlined" /></Grid>

                  <Grid item><Button onClick={(e) => this.submitForm(e)} variant="contained" color="primary">Submit Details</Button></Grid>
                  <Grid item>
                    {/* <Snackbar autoHideDuration={6000} >
                      
                        This is a success message!
                      
                    </Snackbar> */}
                  </Grid>
                </Grid>
              </FormControl>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default FormComponent;