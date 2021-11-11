import { useQuery,  gql} from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_USUARIO = gql`
    query Query {
        obtenerUsuario {
        nombre
        apellido
        id
        }
    }
`;

const Header = () => {

    const router = useRouter();

    //query apollo
    const {data, loading, client} = useQuery(OBTENER_USUARIO);

    //console.log(data);
    //console.log(loading);
    //console.log(error);

    //Proteger que no accedamos a data antes obtener resultados
    if (loading) return null

    //Si no hay informacion
    if(!data){
        
        router.push('/login')
    }

    const { nombre, apellido } = data.obtenerUsuario;

    const cerraSesion = () => {
        localStorage.removeItem('token');
        client.clearStore();
        router.push('/login')
    }

    return (  
        <div className="sm:flex sm:justify-between mb-6">
            <p className="mr-2 mb-5 lg:mb-0">Hola: {nombre} {apellido}</p>

            <button 
                onClick={() => cerraSesion()}
                type="button"
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
            >
                Cerrar Sesión
            </button>
        </div>
    );
}
 
export default Header;