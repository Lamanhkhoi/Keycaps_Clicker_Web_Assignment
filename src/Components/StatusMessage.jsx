import { Alert, Spinner } from 'react-bootstrap'

export default function StatusMessage({ loading = false, error = '' }) {
  if (loading) {
    return <Spinner animation="border" role="status" />
  }
  if (error !== '') {
    return <Alert variant="danger">{error}</Alert>
  }
  return null
}
