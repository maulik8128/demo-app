import { faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { useMutation, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import './PostListing.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deletePost, getPosts } from '../hooks/PostApi';
import Lodder from '../componets/Lodder';
import { toast } from 'react-toastify';

const PostListing = () => {
  const { isLoading, isError, data, refetch } = useQuery(['posts'], getPosts);

  const deleteRecord = (id) => {
    confirmAlert({
      title: '',
      message: 'Are you sure you want delete post',
      closeOnClickOutside: false,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteData(id);
          },
        },
        {
          label: 'No',
        },
      ],
      closeOnEscape: true,
      keyCodeForClose: [8, 32],
      overlayClassName: 'overlay-custom-class-name',
    });
  };
  const onSuccess = (res) => {
    refetch();
    toast('🦄 Delete Successfully', {
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
  const { mutate: deleteData } = useMutation(deletePost, {
    onSuccess,
    onError,
  });
  if (isLoading || isError) {
    return <Lodder />;
  }
  if (!data) {
    return <div />;
  }
  return (
    <Container>
      <h1 className="text-center mb-3 mt-3">Posts Listings</h1>
      <Table responsive="sm" striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.data.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{data.id}</td>
                  <td>{data.title}</td>
                  <td>{data.body}</td>
                  <td>
                    <div className="link-wrapper-cls">
                      <Link to={`/edit-post/${data.id}`} mr="auto">
                        <FontAwesomeIcon icon={faUserPen} />
                      </Link>
                      <div onClick={() => deleteRecord(data.id)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                <h3 className="p-2">No Post Found</h3>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default PostListing;
