
const { NlpManager } = require("node-nlp");
const moment = require('moment')

// Make a instance
const manager = new NlpManager({ languages: ["en"], forceNER: true });


const hora = moment().format('HH:mm:ss')


// Training the model
async function trainNLP() {
  
  // Greetings
  manager.addDocument("en", "Hello", "greetings.hello");
  manager.addDocument("en", "Hi", "greetings.hello");
  manager.addDocument("en", "Whats up", "greetings.hello");

  manager.addAnswer("en", "greetings.hello", "Hi! How are you?");

  // About time
  manager.addDocument("en", "What time is it?", "time.askTime");
  manager.addAnswer("en", "time.askTime", `Agora são ${hora}`);

  // About weather
  manager.addDocument("en", "How about the weather?", "weather.askWeather");
  manager.addDocument("en", "What is the forecast?", "weather.askWeather");

  manager.addAnswer("en", "weather.askWeather", "I cannot preview the weather, but you can ask me something else!");

  // About leave
  manager.addDocument("en", "Get out", "end.conversation");
  manager.addDocument("en", "Bye", "end.conversation");

  manager.addAnswer("en", "end.conversation", "See you soon! Nice to talk you!");

  // Train and save
  console.log("Training the model...");
  await manager.train();
  manager.save();
  console.log("Done!");
}

trainNLP();