import { useEffect, useState } from "react";
import { fetchNoticias } from "../data/fetchNoticias";
import { INoticiasNormalizadas } from "../features/news/types";

/**
 * Hook personalizado para obtener noticias y gestionar el estado de carga.
 * @returns {[INoticiasNormalizadas[], boolean]} Una array que contiene un array de noticias normalizadas y un booleano indicando el estado de carga.
 */
export const useNoticias = (): [INoticiasNormalizadas[], boolean] => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        setIsLoading(true);
        const data = await fetchNoticias();
        setNoticias(data);
      } catch (error) {
        throw new Error("Error al obtener noticias")
      } finally {
        setIsLoading(false);
      }
    };

    obtenerNoticias();
  }, []);

  return [noticias, isLoading];
};
