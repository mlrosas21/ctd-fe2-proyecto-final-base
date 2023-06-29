import { useState } from "react";
import { shallowEqual } from "react-redux";
import { Boton, Input, AutorCita, ContenedorCita, TextoCita } from "./styled";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  obtenerCitaDelEstado,
  limpiar,
  obtenerEstadoDelPedido,
  obtenerCitaDeLaAPI,
} from "./citaSlice";
import { obtenerMensaje } from "./utils";

/**
 * Componente Cita que muestra una cita aleatoria o una cita específica de un autor.
 * @returns {JSX.Element} El componente Cita renderizado.
 */
function Cita() {
  const [valorInput, setValorInput] = useState("");
  const { cita = "", personaje = "" } =
    useAppSelector(obtenerCitaDelEstado, shallowEqual) || {};
  const estadoPedido = useAppSelector(obtenerEstadoDelPedido);

  const dispatch = useAppDispatch();

  const onClickObtenerCita = () => dispatch(obtenerCitaDeLaAPI(valorInput));

  const onClickBorrar = () => {
    dispatch(limpiar());
    setValorInput("");
  };

  return (
    <ContenedorCita>
      <TextoCita>{obtenerMensaje(cita, estadoPedido)}</TextoCita>
      <AutorCita data-testid="author">{personaje}</AutorCita>
      <Input
        aria-label="Author Cita"
        value={valorInput}
        onChange={(e) => setValorInput(e.target.value)}
        placeholder="Ingresa el nombre del autor"
      />
      <Boton
        aria-label={valorInput ? "Obtener Cita" : "Obtener cita aleatoria"}
        onClick={onClickObtenerCita}
      >
        {valorInput ? "Obtener Cita" : "Obtener cita aleatoria"}
      </Boton>
      <Boton aria-label="Borrar" onClick={onClickBorrar} secondary={true}>
        Borrar
      </Boton>
    </ContenedorCita>
  );
}
export default Cita;
