import { rest } from "msw";
import { API_URL } from "../app/constants";
import { randomQuote, mockQuotes } from "./quotes";

export const generateHandlers = () => {
  const handlers = [
    rest.get(API_URL, (req, res, ctx) => {
      const character = req.url.searchParams.get("character");

      if (character === null) {
        return res(ctx.json(randomQuote), ctx.delay(150));
      }

      if (character) {
        console.log(character);
        
        const quote = mockQuotes.find((quote) => quote.character.includes(character));
        return res(ctx.json([quote]));
      }

      return res(ctx.status(200), ctx.json(randomQuote));
    }),
  ];

  return { handlers, randomQuote };
};
