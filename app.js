const { NlpManager } = require("node-nlp");

const manager = new NlpManager({ languages: ["en"], forceNER: true });
const readline = require("readline-sync");


manager.load("model.nlp");

async function chat() {
  console.log("Welcome to chatbot! Please ask me something or type 'exit' to quit.");
  
  while (true) {
    const userInput = readline.question("You: ");
    
    // Terminate if type exit
    if (userInput.toLowerCase() === "exit") {
      console.log("Chatbot: See you soon!.");
      break;
    }

    // process the user input
    const response = await manager.process("en", userInput);
    
    // shows the response
    console.log("Chatbot:", response.answer || "Sorry, I did not understand your question.");
  }
}

chat();