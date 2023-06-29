import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
import {
  BioButton,
  BioButtonWrapper,
  BioDescripcion,
  BioImage,
  BioName,
  BioWrapper,
} from "./Bio.styled";

/**
 * Componente Bio que muestra información biográfica de personajes de Los Simpsons.
 * @returns {JSX.Element} El componente Bio renderizado.
 */
const Bio = () => {
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );

  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
    setBioActiva(INFO_SIMPSONS[nombre]);

  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre: string) => (
      <BioButton
        key={nombre as string}
        onClick={() => onClick(nombre as NombresSimpsons)}
        active={bioActiva.id === nombre}
      >
        {nombre}
      </BioButton>
    ));
  };

  return (
    <BioWrapper>
      <BioButtonWrapper>{crearBotones()}</BioButtonWrapper>
      <div>
        <div>
          <BioImage src={bioActiva.image} alt={bioActiva.nombre} />
        </div>
        <div>
          <BioName>{bioActiva.nombre}</BioName>
          <BioDescripcion>{bioActiva.descripcion}</BioDescripcion>
        </div>
      </div>
    </BioWrapper>
  );
};

export default Bio;
