import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

const errorMessages = {
  email: "Please enter a valid email address",
  password: "Password must be strong",
};

export default function Login() {
  const [form, setForm] = useState(initialForm);

  const navigate = useNavigate();

  const [notChecked, setNotChecked] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState(false);

  const regexEmail = /^[^\s@]+@([^\s@]+\.)+[^\s@]{2,}$/;
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

  useEffect(() => {});

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === "checkbox" ? event.target.checked : value;
    setForm({ ...form, [name]: value });
    if (event.target.type === "checkbox") setNotChecked(!event.target.checked);
    if (event.target.name === "email") {
      setIsValid(regexEmail.test(event.target.value));
    }
    if (event.target.name === "password") {
      setErrors(!strongPasswordRegex.test(event.target.value));
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    if (errors) return;
    navigate("/success");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={!isValid}
        />
        {isValid == false ? (
          <FormFeedback>{errorMessages.email}</FormFeedback>
        ) : (
          ""
        )}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={errors}
        />
        {errors == true ? (
          <FormFeedback>{errorMessages.password}</FormFeedback>
        ) : (
          ""
        )}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={notChecked}
          valid={!notChecked}
        />{" "}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button disabled={notChecked || !isValid || errors} color="primary">
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
