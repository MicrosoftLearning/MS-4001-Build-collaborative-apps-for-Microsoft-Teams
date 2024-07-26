import { MemoryStorage, TurnContext } from "botbuilder";
import * as path from "path";
import config from "../config";

// See https://aka.ms/teams-ai-library to learn more about the Teams AI library.
import { Application, ActionPlanner, OpenAIModel, PromptManager, DefaultConversationState, TurnState } from "@microsoft/teams-ai";

// Register project information item related handlers
interface ProjectInformation {
  projectName: string;
  tasksAccomplished: string;
  tasksComing: string;
  blockingIssues: string;
}

// Strongly type the applications turn state
interface ConversationState extends DefaultConversationState {
  greeted: boolean;
  projectInformation: ProjectInformation;
}
type ApplicationTurnState = TurnState<ConversationState>;

// Create AI components
const model = new OpenAIModel({
  azureApiKey: config.azureOpenAIKey,
  azureDefaultDeployment: config.azureOpenAIDeploymentName,
  azureEndpoint: config.azureOpenAIEndpoint,

  useSystemMessages: true,
  logRequests: true,
});
const prompts = new PromptManager({
  promptsFolder: path.join(__dirname, "../prompts"),
});
const planner = new ActionPlanner({
  model,
  prompts,
  defaultPrompt: "chat",
});

// Define storage and application
const storage = new MemoryStorage();
const app = new Application({
  storage,
  ai: {
    planner,
  },
});

// List for /reset command and then delete the conversation state
app.message('/reset', async (context: TurnContext, state: ApplicationTurnState) => {
  state.deleteConversationState();
  await context.sendActivity("Your project information has been cleared.");
});

// Define the method for updating project information
app.ai.action("updateProjectInformation", async (context: TurnContext, state: ApplicationTurnState, parameters: ProjectInformation) => {
  const conversation = ensureStateInitialized(state);
  if (parameters){
    if (parameters.projectName) {
      conversation.projectInformation.projectName = parameters.projectName;
    }
    if (parameters.tasksAccomplished) {
      conversation.projectInformation.tasksAccomplished = parameters.tasksAccomplished;
    } 
    if (parameters.tasksComing) {
      conversation.projectInformation.tasksComing = parameters.tasksComing;
    }
    if (parameters.blockingIssues) {
      conversation.projectInformation.blockingIssues = parameters.blockingIssues;
    }
    return `Project information was updated. Think about your next action`;
  }
});

// This method is used to make sure that the conversation state is initialized.
function ensureStateInitialized(state: ApplicationTurnState): ConversationState {
  if (state.conversation.projectInformation == undefined) {
    state.conversation.projectInformation = {
      projectName: "",
      tasksAccomplished: "",
      tasksComing: "",
      blockingIssues: "",
    };
  }
  return state.conversation;
}

export default app;
