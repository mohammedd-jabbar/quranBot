const { Bot } = require("grammy");
const { generateSurahLink, validateSurah } = require("./lib/hooks");
const express = require("express");

const PORT = 4040;

const app = express();
app.use(express.json());

const bot = new Bot("APIKEY");

// Handle the /start command.
bot.command("start", (ctx: any) => ctx.reply("Welcome! Up and running."));

// Handle text messages within the chat
bot.on("message", async (ctx: any) => {
  try {
    const surahName = ctx.message?.text?.trim();

    // Validate surah existence
    const isValidSurah = await validateSurah(surahName);

    if (isValidSurah.isValid && isValidSurah.surahId !== null) {
      // Retrieve audio URL for the surah
      const audioUrl = await generateSurahLink(isValidSurah?.surahId);

      if (typeof audioUrl === "string") {
        // Send the voice message with caption
        await ctx.replyWithDocument(audioUrl, {
          caption: `Surah ${surahName}`,
        });
      } else if (typeof audioUrl === "object") {
        await ctx.reply(audioUrl?.linkData);
      }
    } else {
      await ctx.reply("Invalid surah name. Please enter a valid surah name.");
    }
  } catch (error) {
    await ctx.reply(error);
  }
});

bot.start();

app.listen(PORT, function (err: any) {
  if (err) console.log(err);
  console.log("Server listening on PORT:", PORT);
});
