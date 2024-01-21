import { Bot } from "grammy";
import { generateSurahLink, validateSurah } from "./lib/hooks";

const express = require("express");
const PORT = 4040;

const app = express();
app.use(express.json());

const bot = new Bot("6772405032:AAEc5K4JC79-txX71yhurytzXffNzeyogQA");

// Handle the /start command.
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

// Handle text messages within the chat
bot.on("message", async (ctx) => {
  try {
    const surahName = ctx.message?.text?.trim() as string;

    // Validate surah existence
    const isValidSurah = await validateSurah(surahName);

    if (isValidSurah.isValid && isValidSurah.surahId !== null) {
      // Retrieve audio URL for the surah
      const audioUrl = await generateSurahLink(isValidSurah?.surahId);
      console.log(audioUrl);

      if (typeof audioUrl === "string") {
        // Send the voice message with caption
        await ctx.replyWithDocument(audioUrl, {
          caption: `Surah ${surahName}`,
        });
      } else if (typeof audioUrl === "boolean") {
        await ctx.reply("Error");
      }
    } else {
      await ctx.reply("Invalid surah name. Please enter a valid surah name.");
    }
  } catch (error: any) {
    await ctx.reply(error);
  }
});

bot.start();

app.listen(PORT, function (err: any) {
  if (err) console.log(err);
  console.log("Server listening on PORT:", PORT);
});

// bot.on("inline_query", async (ctx) => {
//   const query = ctx.inlineQuery.query.trim();
//   console.log("Work");

//   // Send a list of results, including the audio file
//   const result = InlineQueryResultBuilder.audio(
//     "surah",
//     "Surah Fatiha",
//     "https://server8.mp3quran.net/lhdan/001.mp3",
//     {
//       caption: "ئەمە سوڕەتی فاتیحەیە",
//     }
//   );

//   await ctx.answerInlineQuery([result]);
// });
