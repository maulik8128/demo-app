import { FastField, Formik } from 'formik';
import { Button, Container, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getPost } from '../hooks/PostApi';
import Lodder from '../componets/Lodder';
let call = false;
const EditPost = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const onSuccess = (data) => {
    console.log(data.data, 'dasda');
    setPostData(data.data);
  };
  console.log(postData);
  const onError = (error) => {
    console.log(error);
  };
  const { isLoading } = useQuery(['get-post', id], getPost, { onError, onSuccess });

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(2, 'Too Short!').required('Title is a required field'),
    body: Yup.string().min(2, 'Too Short!').required('Body is a required field'),
  });

  const initialFormState = {
    title: '',
    body: '',
  };
  const submitHandler = () => {};
  if (isLoading) {
    return <Lodder/>;
  }
  return (
    <Container>
      <h2 className="text-center mb-3 mt-3">Edit Post</h2>
      <div className="justify-content-center" style={{ maxWidth: '650px', margin: '0 auto' }}>
        <Formik initialValues={{ ...initialFormState }} validationSchema={validationSchema} onSubmit={submitHandler}>
          {({ values, errors, touched, handleSubmit, isSubmitting, handleChange, setFieldValue }) => {
            if (!call) {
              if (postData) {
                console.log(postData['title'], 'call');
                const fields = ['title', 'body'];
                fields.forEach((field) => {
                  console.log(postData[field]);
                  setFieldValue(field, postData[field], false);
                });
                call = true;
              }
            }

            return (
              <Form className="needs-validation" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    className="form-control"
                    value={values.title}
                    isValid={touched.title && !errors.title}
                    isInvalid={errors.title && touched.title}
                    onChange={handleChange}
                  />
                  {errors.name && touched.name ? <div className="error-message">{errors.name}</div> : null}
                  <FastField
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    className="form-control"
                    values={values.title}
                  />
                  {errors.title && touched.title ? <div className="error-message">{errors.title}</div> : null}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Body</Form.Label>
                  <FastField component="textarea" name="body" placeholder="Enter text" className="form-control" />
                  {errors.body && touched.body ? <div className="error-message">{errors.body}</div> : null}
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
                  {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  Update
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
};

export default EditPost;
