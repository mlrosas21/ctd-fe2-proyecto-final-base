import { obtenerNoticias } from "./fakeRest";
import { calculateMinutesAgo } from "../utils/calculateMinutes";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { INoticiasNormalizadas } from "../features/news/types";

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
