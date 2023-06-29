import { useState } from "react";

/**
 * Hook para gestionar el estado de un modal.
 * @template T - El tipo de datos pasados al modal.
 * @returns {Object} Un objeto que contiene el estado del modal y métodos correspondientes.
 */
export const useModal = <T>() => {
  const [modal, setModal] = useState<T | null>(null);

  /**
   * Abre el modal y establece los datos.
   * @param {T} data - Los datos que se pasarán al modal.
   * @returns {void}
   */
  const openModal = (data: T) => {
    setModal(data);
  };

  /**
   * Cierra el modal y reinicia los datos.
   * @returns {void}
   */
  const closeModal = () => {
    setModal(null);
  };

  return { modal, openModal, closeModal };
};
