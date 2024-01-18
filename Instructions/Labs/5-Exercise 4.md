---
lab:
    title: 'Build a Bot'
    module: 'Exercise 4'
---

# Exercise 4: Build a Bot

## Scenario

Suppose the IT Support team you are supporting receives a high volume of common, repetitive queries from employees across the organization. These queries often involve simple issues like password resets, software installation instructions, or troubleshooting common errors.

To streamline the process and reduce the workload on your team, you decide to create a bot that can handle these common queries in Microsoft Teams.

You decide to add an initial command to the bot named "resetPassword". When a user types this command, the bot will respond with step-by-step instructions on how to reset their password. This allows users to solve their issue without needing to contact the IT Support team directly, freeing up your team to handle more complex issues.

In addition to the "resetPassword" command, you plan to add more commands to handle other common queries, turning the bot into a comprehensive self-service tool for the organization's employees.

## Exercise tasks

You need to complete the following tasks to complete the exercise:

1. Create the bot using Teams Toolkit
2. Configure the manifest
3. Create an Adaptive Card
4. Handle the command

**Estimated completion time:** 17 minutes

## Task 1: Create a bot using Teams Toolkit

Use the Command Bot template to create a new bot:

1. In Visual Studio Code, navigate to **Teams Toolkit** in the sidebar.
2. In Teams Toolkit, in the **Development** menu, select **Create a New App**.
3. From the **New Project** menu, select **Bot** then select **Chat Command** to build a command bot.
4. For Programming Language, select **TypeScript**.
5. For **workspace folder** select or create a folder to store your project files on your computer.
6. For **Application name**, enter **SupportCommandBot** then press **Enter**.  Teams Toolkit creates and scaffolds your bot project.
7. Review the project directories and files using the Explorer in Visual Studio Code to familiarize yourself with the source code.

## Task 2: Configure the manifest

Define a `ResetPassword` command in the app manifest:

1. Open the file `manifest.json` from the `appPackage` folder.
2. In the `bots` object, locate `commandLists`.  There is currently a single command titled `helloWorld`.
3. Update `commands` with a new `ResetPassword` command:

    ```typescript
            "commands": [
                {
                    "title": "helloWorld",
                    "description": "A helloworld command to send a welcome message"
                },
                {
                    "title": "resetPassword",
                    "description": "Request instructions to reset your password"
                }
            ]
    ```

## Task 3: Create an Adaptive Card

Create an Adaptive Card to be sent in response to the `ResetPassword` command:

1. In `src`/`adaptiveCards`, create a new file named `resetPassword.json`.
2. Add the following content to the file and save it:

   ```json
    {
        "type": "AdaptiveCard",
        "body": [
            {
                "type": "TextBlock",
                "size": "Medium",
                "weight": "Bolder",
                "text": "Reset Password Instructions"
            },
            {
                "type": "TextBlock",
                "text": "1. Navigate to the login page and select 'Forgot Password'.",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "text": "2. Enter your email or username and select 'Submit'.",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "text": "3. Check your email for a password reset link and select it.",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "text": "4. Enter and confirm your new password, then select 'Save'.",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "text": "5. Log in with your new password.",
                "wrap": true
            }
        ],
        "actions": [
            {
                "type": "Action.OpenUrl",
                "title": "Go to Login Page",
                "url": "https://www.adaptivecards.io/designer/"
            }
        ],
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.4"
    }
   ```

## Task 4: Handle the command

Next, handle the command in the bot's source code using the `TeamsFxBotCommandHandler` class.  Import the `resetPasswordCard` from the json file and render it when the command is invoked:

1. In the `src` folder, create a new file named `resetPasswordCommandHandler.ts`.
2. Add the following import statements to the file, including a statement to import the raw `resetPassword` card you created:

   ```typescript
   import { Activity, CardFactory, MessageFactory, TurnContext } from "botbuilder";
    import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
    import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
    import rawResetPasswordCard from "./adaptiveCards/resetPassword.json";
   ```

3. Below the import statements, add the following code to implement the command handler, then save the file:

   ```typescript
       export class ResetPasswordCommandHandler implements TeamsFxBotCommandHandler {
          triggerPatterns: TriggerPatterns = "resetPassword";
        
          async handleCommandReceived(
            context: TurnContext,
            message: CommandMessage
          ): Promise<string | Partial<Activity> | void> {
            console.log(`App received message: ${message.text}`);
        
            const resetPasswordCard = AdaptiveCards.declareWithoutData(rawResetPasswordCard).render();
            await context.sendActivity({ attachments: [CardFactory.adaptiveCard(resetPasswordCard)] });
          }
        }
   ```

## Check your work

Run your app locally to test the functionality:

1. In the **LIFECYCLE** menu, select **Preview Your Teams App** (or use the `F5` key) then select **Debug in Teams ()** with your preferred browser.  
2. Teams Toolkit will provision and run your app locally in a browser.
3. On the app installation dialog in the browser, select **Add** to install your Teams app.  Teams opens a conversation with your bot installed.
4. Enter or select the command `resetPassword`.
5. Verify that the bot replies with an adaptive card containing password reset instructions.
