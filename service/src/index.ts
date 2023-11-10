import { configureOpenAi } from "./ai/openAiConfig";
import { startServer } from "./api/server";
import { scrapeStory } from "./scraper/scraper";

const openAi = configureOpenAi();

async function main(){
    // const chatCompletion = await openAi.chat.completions.create({
    //     messages: [{ role: 'user', content: 'Say this is a test 🧪🧪🧪' }],
    //     model: 'gpt-3.5-turbo',
    //   });

    //   console.log(chatCompletion);
    startServer();
    
}

main();