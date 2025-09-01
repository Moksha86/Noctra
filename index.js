// index.js
const { Telegraf } = require('telegraf');
const axios = require('axios');

// 🔑 Токен Telegram бота от @BotFather
const BOT_TOKEN = "ВАШ_ТОКЕН_БОТА";
if (!BOT_TOKEN) throw new Error("Не указан токен бота.");

// 🛸 Настройки Voiceflow
const VF_API_KEY = "ВАШ_VOICEFLOW_API_KEY";
const VF_VERSION_ID = "ВАШ_VOICEFLOW_VERSION_ID"; // обычно "production"

const bot = new Telegraf(BOT_TOKEN);

// 📌 Команда /start
bot.start((ctx) => {
  ctx.reply('🌙 Привет! Я — Noctra, твой астрологический ИИ-ассистент. Задай вопрос звёздам ✨');
});

// 📌 Обработка текстовых сообщений
bot.on('text', async (ctx) => {
  const userMessage = ctx.message.text;

  try {
    // 🔗 Запрос к Voiceflow
    const response = await axios.post(
      `https://general-runtime.voiceflow.com/state/user/${ctx.from.id}/interact`,
      { type: "text", payload: userMessage },
      { headers: { Authorization: VF_API_KEY, versionID: VF_VERSION_ID } }
    );

    // 📝 Извлечение ответа от Voiceflow
    const replyMessage = response.data?.[0]?.payload?.message || "✨ Звёзды пока молчат...";
    ctx.reply(replyMessage);

  } catch (err) {
    console.error("❌ Ошибка при обращении к Voiceflow:", err);
    ctx.reply("⚡ Упс! Что-то пошло не так, попробуй ещё раз.");
  }
});

// 🚀 Запуск бота
bot.launch()
  .then(() => console.log("✅ Бот Noctra запущен и готов к диалогу"))
  .catch((err) => console.error("❌ Ошибка запуска бота:", err));

// 🔔 Обработка остановки (CTRL+C)
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

