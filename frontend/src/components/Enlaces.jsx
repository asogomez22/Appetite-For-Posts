
import { Link } from 'react-router-dom';

function Enlace({ url = '/', nombre = 'Inicio'}) {
  return (
    <Link to={url} className={`hover:text-yellow-500 transition`}>
      {nombre}
    </Link>
  );
}
export default Enlace;
