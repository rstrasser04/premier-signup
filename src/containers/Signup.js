import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Signup.css";

export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    username: "",
    password: "",
    name: "",
    given_name: "",
    nickname: "",
    locale: "",
    address: "",
    birthdate: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.username.length > 0 &&
      fields.password.length > 0 &&
      fields.name.length > 0 &&
      fields.given_name.length > 0 &&
      fields.nickname.length > 0 &&
      fields.locale.length > 0 &&
      fields.address.length > 0 &&
      fields.birthdate.length > 0
    );
  }

  function validateConfirmationForm() {
    return fields.email.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.username,
        password: fields.password,
        attributes: {
          email: fields.email,
          name: fields.name,
          given_name: fields.given_name,
          nickname: fields.nickname,
          locale: fields.locale,
          address: fields.address,
          birthdate: fields.birthdate,
        },    
      });
      setIsLoading(false);
      setNewUser(newUser);
      userHasAuthenticated(true);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email);
      await Auth.signIn(fields.email);

      userHasAuthenticated(true);
      history.push("/profile");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <Form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode" size="lg">
        <Form.Label>Email Verification</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.email}
            disabled
          />
          <Form.Text muted>Please check the email above and click "Verify" below.</Form.Text>
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </Form>
    );
  }

  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="username" size="lg">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={fields.username}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        <Form.Group controlId="name" size="lg">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="name"
            onChange={handleFieldChange}
            value={fields.name}
          />
        </Form.Group>
        <Form.Group controlId="given_name" size="lg">
          <Form.Label>Bank Name</Form.Label>
          <Form.Control
            type="given_name"
            onChange={handleFieldChange}
            value={fields.given_name}
          />
        </Form.Group>
        <Form.Group controlId="nickname" size="lg">
          <Form.Label>Bank Title</Form.Label>
          <Form.Control
            type="nickname"
            onChange={handleFieldChange}
            value={fields.nickname}
          />
        </Form.Group>
        <Form.Group controlId="locale" size="lg">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="locale"
            onChange={handleFieldChange}
            value={fields.locale}
          />
        </Form.Group>
        <Form.Group controlId="address" size="lg">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="address"
            onChange={handleFieldChange}
            value={fields.address}
          />
        </Form.Group>
        <Form.Group controlId="birthdate" size="lg">
          <Form.Label>Seminar Date</Form.Label>
          <Form.Control
            type="birthdate"
            onChange={handleFieldChange}
            value={fields.birthdate}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </Form>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}
