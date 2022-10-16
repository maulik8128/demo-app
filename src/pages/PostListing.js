import { faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Container, Spinner, Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { useMutation, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import './PostListing.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deletePost, getPosts } from '../hooks/PostApi';
import Lodder from '../componets/Lodder';

const PostListing = () => {
  const [data, setData] = useState(null);
  const onSuccess = (data) => {
    setData(data.data);
  };
  const onError = (error) => {
    console.log(error);
  };

  const { isLoading, isFetching } = useQuery(['posts'], getPosts, {
    onSuccess,
    onError,
  });

  const deleteRecord = (id) => {
    console.log(id);
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
  const { mutate: deleteData } = useMutation(deletePost, {
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  if (isLoading) {
    return (
        <Lodder/>
    );
  }
  return (
    <Container>
      <h1 className="text-center mb-3 mt-3">Posts Listings</h1>
      <Table responsive="sm" striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tital</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((data, i) => {
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
