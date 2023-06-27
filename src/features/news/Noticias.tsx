import { TarjetaNoticia, FechaTarjetaNoticia, DescripcionTarjetaNoticia, ImagenTarjetaNoticia, TituloTarjetaNoticia, ContenedorNoticias, ListaNoticias, TituloNoticias, BotonLectura } from "./styled";
import ModalNoticias from "./ModalNoticias";
import { useModal } from "../../hooks/useModal";
import { INoticiasNormalizadas } from "./types";
import { useNoticias } from "../../hooks/useNoticias";

const Noticias = () => {
  const { modal, openModal, closeModal } = useModal<INoticiasNormalizadas>();
  const [noticias, isLoading] = useNoticias();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <TarjetaNoticia>
            <ImagenTarjetaNoticia src={n.imagen} />
            <TituloTarjetaNoticia>{n.titulo}</TituloTarjetaNoticia>
            <FechaTarjetaNoticia>{n.fecha}</FechaTarjetaNoticia>
            <DescripcionTarjetaNoticia>{n.descripcionCorta}</DescripcionTarjetaNoticia>
            <BotonLectura onClick={() => openModal(n)}>Ver más</BotonLectura>
          </TarjetaNoticia>
        ))}
        {modal ? <ModalNoticias modal={modal} closeModal={closeModal} /> : null}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
