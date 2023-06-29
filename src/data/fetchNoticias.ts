import { obtenerNoticias } from "./fakeRest";
import { calculateMinutesAgo } from "../utils/calculateMinutes";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { INoticiasNormalizadas } from "../features/news/types";

/**
 * Obtiene las noticias de forma asíncrona desde una fuente de datos simulada.
 * @returns {Promise<INoticiasNormalizadas[]>} Una promesa que se resuelve con un array de noticias normalizadas.
 */
export const fetchNoticias = async (): Promise<INoticiasNormalizadas[]> => {
  const respuesta = await obtenerNoticias();
  const data = respuesta.map((n) => {
    return {
      id: n.id,
      titulo: `${capitalizeFirstLetter(n.titulo)}`,
      descripcion: n.descripcion,
      fecha: `Hace ${calculateMinutesAgo(n.fecha)} minutos`,
      esPremium: n.esPremium,
      imagen: n.imagen,
      descripcionCorta: n.descripcion.substring(0, 100),
    };
  });

  return data;
};
