import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import ResetPassword from "../Auth/ResetPassword";
import Error from "../../components/Error";
import LoaderButton from "../../components/LoaderButton";

import { useAppContext } from "../../libs/contextLib";
import { useFormFields } from "../../libs/hooksLib";

import { FaSignInAlt, FaUser, FaLock, FaEye } from "react-icons/fa"
import "./Auth.css";

export default function Login() {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: ""
  });
  const [error, setError] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  function validateForm() {
    return fields.username.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(fields.username, fields.password);
      userHasAuthenticated(true);
      history.go("/")
    } catch (e) {
      console.log(error)
      setError(e.message);
      setIsLoading(false);
    }
  }

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div className="main-content-login">
      <h1 style={{ textAlign: 'center'}}>
        <FaSignInAlt/> <br />
        User Login
      </h1>
      {error && <Error errorMessage={error}/>}
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Group size="lg" controlId="username">
          <Form.Label>Email or Username</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend"><FaUser/></InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              autoFocus
              type="username"
              placeholder="Username"
              value={fields.username}
              onChange={handleFieldChange}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend"><FaLock/></InputGroup.Text>
            </InputGroup.Prepend>
          <Form.Control
            type={passwordShown ? "text" : "password"}
            placeholder="Password"
            value={fields.password}
            onChange={handleFieldChange}
          />
          </InputGroup>
          <i className="login pw-show-hide" onClick={togglePasswordVisiblity}><FaEye title="Show/Hide"/></i>{" "}
        </Form.Group>
        <Link to="/password/forgot">Forgot password?</Link>
        <LoaderButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  );
}
