import { Spinner } from 'react-bootstrap';

export default function Lodder() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: ' 90vh' }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
