import { rest } from "msw";
import { API_URL } from "../app/constants";

export const generateHandlers = () => {
  const randomQuote = [
      {
        quote: "Ahh! Sweet liquor eases the pain.",
        character: "Troy McClure",
        image:
          "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FTroyMcClure.png?1497567511112",
        characterDirection: "Right",
      },
    ],
    handlers = [
      
      rest.get(API_URL, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(randomQuote)
        );
      }),
    ];

  return { handlers, randomQuote };
};