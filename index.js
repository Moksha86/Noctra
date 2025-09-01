const { Telegraf } = require('telegraf');

// 🔑 Вставьте сюда токен, полученный от @BotFather
const BOT_TOKEN = "ВАШ_ТОКЕН_БОТА";
if (!BOT_TOKEN) {
  throw new Error("Необходимо указать токен бота. Получите его у @BotFather.");
}

const bot = new Telegraf(BOT_TOKEN);

// 📌 Обработчик команды /start
bot.start((ctx) => {
  ctx.reply('🌙 Привет! Я — Noctra, твой астрологический ассистент. Задай вопрос звёздам ✨');
});

// 📌 Обработчик входящих текстовых сообщений
bot.on('text', (ctx) => {
  const userMessage = ctx.message.text;
  ctx.reply(`🔮 Ты написал: "${userMessage}"\n✨ Звёзды готовят для тебя ответ...`);
});

// 🚀 Запуск бота
bot.launch()
  .then(() => console.log("✅ Бот Noctra успешно запущен"))
  .catch((err) => console.error("❌ Ошибка запуска бота:", err));
