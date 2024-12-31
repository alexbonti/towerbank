import { useNavigate } from 'react-router-dom';
import FloorDetail from './Floor/FloorDetail';

export default function FloorDetailWrapper() {
  const navigate = useNavigate();
  return <FloorDetail onBack={() => navigate(-1)} />;
}