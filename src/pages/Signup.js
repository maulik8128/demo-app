import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Form, Image } from 'react-bootstrap';
import './signup.css';
import { useMutation } from 'react-query';
import { registerUser } from '../hooks/PostApi';
import Lodder from '../componets/Lodder';
import { useState } from 'react';

const Signup = () => {
  const [img, setImg] = useState(null);
  const nationality = ['India', 'USA', 'canada'];
  const submitHandler = async (values) => {
    console.log(values);
    mutate(values);
  };
  
  const onSuccess = (res) => {
    console.log(res);
  };
  const onError = (err) => {
    console.log(err);
  };
  const { mutate, isLoading, isError } = useMutation(registerUser, { onSuccess, onError });
  if (isLoading || isError) {
    return <Lodder />;
  }
  const FILE_SIZE = 1600 * 1024;
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
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
    avatar: Yup.mixed()
      .required('Profile picture is required')
      .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
      .test(
        'fileFormat',
        'Only the following formats are accepted: .jpeg, .jpg, .png',
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
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
    avatar: '',
  };

  return (
    <>
      <Container>
        <div className="justify-content-center signup-center-cls" style={{ maxWidth: '380px' }}>
          <Formik
            initialValues={{ ...initialFormState }}
            validationSchema={SignupSchema}
            onSubmit={submitHandler}
            encType="multipart/form-ata"
          >
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
                    <Form.Check
                      inline
                      label="Male"
                      type="radio"
                      name="gender"
                      value="male"
                      isValid={formik.touched.gender && !formik.errors.gender}
                      isInvalid={formik.errors.gender && formik.touched.gender}
                      onChange={formik.handleChange}
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
                      onChange={formik.handleChange}
                    />
                    <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                      {formik.errors.gender}
                    </Form.Control.Feedback>
                  </Form.Group>

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
                    <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                      {formik.errors.termcondition}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Profile picture</Form.Label>
                    <Image src={img} style={{ maxWith: '100px', maxHeight: '100px' ,margin:"15px" }} className="display-img-cls"/>
                    <Form.Control
                      type="file"
                      name="avatar"
                      placeholder="Enter Confirm Password"
                      className="form-control"
                      isValid={formik.touched.avatar && !formik.errors.avatar}
                      isInvalid={formik.errors.avatar && formik.touched.avatar}
                      onChange={(event) => {
                        formik.setFieldValue('avatar', event.currentTarget.files[0]);
                        if (event.target.files && event.target.files[0]) {
                          let reader = new FileReader();
                          reader.onload = (e) => {
                            setImg(e.target.result);
                          };
                          reader.readAsDataURL(event.target.files[0]);
                        }
                      }}
                    />
                    <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                      {formik.errors.avatar}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={!(formik.isValid && formik.dirty)}
                  >
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
