import { FastField, Formik } from 'formik';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useMutation, useQuery } from 'react-query';
import { getPost, updatePost } from '../hooks/PostApi';
import Lodder from '../componets/Lodder';
import { toast } from 'react-toastify';
const EditPost = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const onSuccess = (res) => {
    navigate('/posts');
    toast('🦄 Post updated Successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };
  const onError = (err) => {
    console.log(err);
  };
  const {
    mutate: PostUpdate,
    isLoading: PostIsLoading,
    isError: PostIsError,
  } = useMutation(updatePost, { onSuccess, onError });

  const { isLoading, isError, data } = useQuery(['get-post', id], getPost);
  if (!data) {
    return null;
  }
  const validationSchema = Yup.object().shape({
    title: Yup.string().min(2, 'Too Short!').required('Title is a required field'),
    body: Yup.string().min(2, 'Too Short!').required('Body is a required field'),
  });

  if (isLoading || isError || PostIsLoading || PostIsError) {
    return <Lodder />;
  }
  const submitHandler = (value) => {
    const id = data.data.id;
    value.id = id;
    console.log(value);
    PostUpdate(value);
  };

  const initialFormState = {
    title: data.data.title,
    body: data.data.body,
  };
  return (
    <Container>
      <h2 className="text-center mb-3 mt-3">Edit Post</h2>
      <div className="justify-content-center" style={{ maxWidth: '650px', margin: '0 auto' }}>
        <Formik initialValues={initialFormState} validationSchema={validationSchema} onSubmit={submitHandler}>
          {({ values, errors, touched, handleSubmit, isSubmitting, handleChange, setFieldValue }) => {
            return (
              <Form className="needs-validation" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
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
