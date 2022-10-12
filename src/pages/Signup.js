import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Form } from 'react-bootstrap';
import './signup.css';
import { registerUser } from '../utils/authUser';

const Signup = () => {
  const nationality = ['India', 'USA', 'canada'];
  const submitHandler = async (values) => {
    console.log(values);
        const res = await registerUser(values).catch((err) => {
      if (err) {
        alert(err);
        return false;
      }
    });
    console.log(res);
  };
  const SignupSchema = Yup.object().shape({
    firstname: Yup.string().min(2, 'Too Short!').required('Firstname is a required field.'),
    lastname: Yup.string().min(2, 'Too Short!').required('Lastname is a required field.'),
    email: Yup.string().email('Invalid email').required('Email is a required field.'),
    gender: Yup.string().oneOf(['male', 'female'], 'Please select gender!').required('Please select gender.'),
    password: Yup.string().min(6, 'Too Short!').required('Password is a required field.'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirma Password is a required field.'),
    nationality: Yup.string().required('Nationality is a required field.'),
    termcondition: Yup.bool().oneOf([true], 'You need to accept the terms and conditions'),
  });

  const initialFormState = {
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    password: '',
    passwordConfirmation: '',
    nationality: '',
    termcondition: false,
  };

  return (
    <>
      <Container>
        <div className="justify-content-center signup-center-cls" style={{ width: '37%' }}>
          <Formik initialValues={{ ...initialFormState }} validationSchema={SignupSchema} onSubmit={submitHandler}>
            {(formik) => {
              return (
                <Form className="needs-validation" onSubmit={formik.handleSubmit}>
                  <h2 className="text-center">Sign Up</h2>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      placeholder="Enter Firstname"
                      className="form-control"
                      isValid={formik.touched.firstname && !formik.errors.firstname}
                      isInvalid={formik.errors.firstname && formik.touched.firstname}
                      {...formik.getFieldProps('firstname')}
                    />

                    <Form.Control.Feedback type="invalid">{formik.errors.firstname}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      placeholder="Enter Lastname"
                      className="form-control"
                      isValid={formik.touched.lastname && !formik.errors.lastname}
                      isInvalid={formik.errors.lastname && formik.touched.lastname}
                      {...formik.getFieldProps('lastname')}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.lastname}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="Enter Email"
                      className="form-control"
                      isValid={formik.touched.email && !formik.errors.email}
                      isInvalid={formik.errors.email && formik.touched.email}
                      {...formik.getFieldProps('email')}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Field type="radio" name="gender" className="form-check-inline" value="male" />
                    <Form.Label>Male</Form.Label>
                    <Field type="radio" name="gender" className="form-check-inline" value="female" />
                    <Form.Label>Female</Form.Label>
                    {formik.errors.gender && formik.touched.gender ? (
                      <div className="error-message">{formik.errors.gender}</div>
                    ) : null}
                  </Form.Group>
                  {/* <Form.Group className="mb-3">
                  <Form.Check
                    inline
                    label="Male"
                    type="radio"
                    name="gender"
                    value="male"
                    isValid={formik.touched.gender && !formik.errors.gender}
                    isInvalid={formik.errors.gender && formik.touched.gender}
                    {...formik.getFieldProps('gender')}
                    // onChange={formik.handleSubmit}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.gender}</Form.Control.Feedback>
                  <Form.Check
                    inline
                    label="Female"
                    type="radio"
                    name="gender"
                    value="female"
                    isValid={formik.touched.gender && !formik.errors.gender}
                    isInvalid={formik.errors.gender && formik.touched.gender}
                    // onChange={formik.handleSubmit}
                  />
                  {formik.errors.gender && formik.touched.gender ? (
                    <div className="error-message">{formik.errors.gender}</div>
                  ) : null}
                </Form.Group> */}

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      className="form-control"
                      isValid={formik.touched.password && !formik.errors.password}
                      isInvalid={formik.errors.password && formik.touched.password}
                      {...formik.getFieldProps('password')}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="passwordConfirmation"
                      placeholder="Enter Confirm Password"
                      className="form-control"
                      isValid={formik.touched.passwordConfirmation && !formik.errors.passwordConfirmation}
                      isInvalid={formik.errors.passwordConfirmation && formik.touched.passwordConfirmation}
                      {...formik.getFieldProps('passwordConfirmation')}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.passwordConfirmation}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Select
                      aria-label="Default select example"
                      name="nationality"
                      isValid={formik.touched.nationality && !formik.errors.nationality}
                      isInvalid={formik.errors.nationality && formik.touched.nationality}
                      {...formik.getFieldProps('nationality')}
                    >
                      <option>Nationality</option>
                      {nationality.map((v, k) => {
                        return (
                          <option key={k} value={k}>
                            {v}
                          </option>
                        );
                      })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{formik.errors.nationality}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check
                      inline
                      label="Term and Conditions"
                      type="checkbox"
                      name="termcondition"
                      isValid={formik.touched.termcondition && !formik.errors.termcondition}
                      isInvalid={formik.errors.termcondition && formik.touched.termcondition}
                      {...formik.getFieldProps('termcondition')}
                    />
                    {formik.errors.termcondition && formik.touched.termcondition ? (
                      <div className="error-message">{formik.errors.termcondition}</div>
                    ) : null}
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100" disabled={!formik.isValid}>
                    Submit
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Container>
    </>
  );
};

export default Signup;
