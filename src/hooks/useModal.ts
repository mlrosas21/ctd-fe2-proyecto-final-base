import { useState } from "react";

export const useModal = <T>() => {
  const [modal, setModal] = useState<T | null>(null);

  const openModal = (data: T) => {
    setModal(data);
  };

  const closeModal = () => {
    setModal(null);
  };

  return { modal, openModal, closeModal };
};

