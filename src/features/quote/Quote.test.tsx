/** @jest-environment jsdom */
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { generateHandlers } from "../../mocks/handler";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { render } from "../../test-utils";
import Cita from "./Cita";
import { MENSAJE_CARGANDO, NOMBRE_INVALIDO, NO_ENCONTRADO } from "./constants";

const { handlers, randomQuote } = generateHandlers();
export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Cita", () => {
  describe("Cuando la query se esta ejecutando", () => {
    it("debería renderizar correctamente el mensaje de cargando", async () => {
      render(<Cita />);
      const button = screen.getByLabelText(/obtener cita aleatoria/i);

      userEvent.click(button);
      await waitFor(() => {
        const loading = screen.getByText(MENSAJE_CARGANDO);
        expect(loading).toBeInTheDocument();
      });
    });
  });

  describe("Cuando se da click al botón de 'Obtener cita aleatoria'", () => {
    it("Debería renderizar correctamente una cita aleatoria", async () => {
      render(<Cita />);
      const button = screen.getByLabelText(/obtener cita aleatoria/i);
      const citaRandom = randomQuote[0].quote;

      userEvent.click(button);
      await waitFor(() => {
        const cita = screen.getByText(citaRandom);
        expect(cita).toBeInTheDocument();
      });
    });
  });

  describe("Cuando escribimos el nombre de un personaje de los Simpsons en el input", () => {
    it("Debería mostrar el botón 'Obtener cita' en lugar de 'Obtener cita aleatoria'", async () => {
      render(<Cita />);
      const input = screen.getByRole("textbox");

      userEvent.type(input, "Homer");
      await waitFor(() => {
        const buttonCita = screen.getByLabelText(/obtener cita/i);
        expect(buttonCita).toBeInTheDocument();
      });
      await waitFor(() => {
        const buttonCitaAleatoria = screen.queryByText(
          "Obtener cita aleatoria"
        );
        expect(buttonCitaAleatoria).not.toBeInTheDocument();
      });
    });

    it("debería renderizar una cita del Simpson ingresado", async () => {
      render(<Cita />);
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "Troy" } });
      const buttonCita = screen.getByLabelText(/obtener cita/i);
      userEvent.click(buttonCita);
      await waitFor(() => {
        const author = screen.getByTestId("author");
        expect(author).toHaveTextContent("Troy McClure");
      });
    });
  });

  describe("Cuando presionamos el botón de borrar", () => {
    it("Debería limpiar el input de personaje", async () => {
      render(<Cita />);
      const input = screen.getByRole("textbox");
      const buttonBorrar = screen.getByLabelText(/borrar/i);

      fireEvent.change(input, { target: { value: "Lionel" } });
      expect(input).toHaveAttribute("value", "Lionel");
      userEvent.click(buttonBorrar);
      await waitFor(() => {
        expect(input).toHaveAttribute("value", "");
      });
    });
  });

  describe("Cuando escribimos números en el input", () => {
    it("debería renderizar un mensaje de error", async () => {
      render(<Cita />);
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "123456" } });
      const buttonCita = await screen.findByLabelText(/obtener Cita/i);
      userEvent.click(buttonCita);
      await waitFor(() => {
        const mensajeError = screen.getByText(NOMBRE_INVALIDO);
        expect(mensajeError).toBeInTheDocument();
      });
    });
  });

  describe("Cuando intentamos buscar citas de un personaje que no existe", () => {
    it("Debería renderizar un mensaje de 'No se encontró ninguna cita'", async () => {
      render(<Cita />);
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "Carolina" } });
      const buttonCita = await screen.findByLabelText("Obtener Cita");
      userEvent.click(buttonCita);
      await waitFor(() => {
        const mensajeError = screen.getByText(NO_ENCONTRADO);
        expect(mensajeError).toBeInTheDocument();
      });
    });
  });
});
