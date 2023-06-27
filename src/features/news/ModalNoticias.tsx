import { SuscribeImage, CloseButton as Close } from "../../assets";
import {
  CloseButton,
  TarjetaModal,
  ContenedorModal,
  DescripcionModal,
  ImagenModal,
  TituloModal,
  BotonSuscribir,
  CotenedorTexto,
} from "./styled";
import { IModalNoticiasProps } from "./types";

const ModalNoticias = ({ modal, closeModal }: IModalNoticiasProps) => {
  const handleSuscribirClick = () => {
    setTimeout(() => {
      alert("Suscripto!");
      closeModal();
    }, 1000);
  };

  const handleModalClose = () => {
    closeModal();
  };

  return (
    <ContenedorModal>
      <TarjetaModal>
        <CloseButton onClick={handleModalClose}>
          <img src={Close} alt="close-button" />
        </CloseButton>
        {modal?.esPremium ? (
          <>
            <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
            <CotenedorTexto>
              <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
              <DescripcionModal>
                Suscríbete a nuestro newsletter y recibe noticias de nuestros personajes favoritos.
              </DescripcionModal>
              <BotonSuscribir onClick={handleSuscribirClick}>
                Suscríbete
              </BotonSuscribir>
            </CotenedorTexto>
          </>
        ) : (
          <>
            <ImagenModal src={modal?.imagen} alt="news-image" />
            <CotenedorTexto>
              <TituloModal>{modal?.titulo}</TituloModal>
              <DescripcionModal>{modal?.descripcion}</DescripcionModal>
            </CotenedorTexto>
          </>
        )}
      </TarjetaModal>
    </ContenedorModal>
  );
};

export default ModalNoticias;
