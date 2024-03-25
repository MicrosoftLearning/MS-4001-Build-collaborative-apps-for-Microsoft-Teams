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

1. Open Visual Studio Code.
1. On the sidebar, select the **Microsoft Teams** icon to open the **TEAMS TOOLKIT** panel.
1. Click **Create a New App** button.
1. From the **New Project** menu, select **Bot** then select **Chat Command** to build a command bot.
1. For Programming Language, select **TypeScript**.
1. For **workspace folder** select or create a folder to store your project files on your computer.
1. For **Application name**, enter **SupportCommandBot** then press **Enter**. Teams Toolkit will scaffold a new app and open the project folder in Visual Studio Code.
1. You may receive a message from Visual Studio Code that asks if you trust the authors of the files in this folder. Select the **Yes, I trust the authors** button to continue.
1. Review the project directories and files using the Explorer in Visual Studio Code to familiarize yourself with the source code.

## Task 2: Configure the manifest

Define a `ResetPassword` command in the app manifest:

1. Open the file `manifest.json` from the `appPackage` folder.
2. In the `bots` object, locate `commandLists`.  There is currently a single command titled `helloWorld`.
3. Replace `commands` with the following code, so that it includes a new `ResetPassword` command as follows:

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

## Task 5: Register the new command

Each new command needs to be configured in the `ConversationBot`, which powers the conversational flow of the command bot template.

1. Navigate to the `src/internal/initialize.ts` file.
2. Add the following import statement on line 2:

    `import { ResetPasswordCommandHandler } from "../resetPasswordCommandHandler";`
3. On line 20, update the `commands` array of the `command` property to include a statement to initialize the new handler: `new ResetPasswordCommandHandler().  The updated `command` object should be as follows:

   ```json
   command: {    enabled: true,    commands: [new HelloWorldCommandHandler(), new ResetPasswordCommandHandler()],  },
    ```

## Task 6: Switch to ngrok from dev tunnel (optional)

If your development environment does not support Teams Toolkit dev tunnel, you can replace dev tunnel with ngrok.

1. Follow these steps to install ngrok:
   1. Go to the [ngrok website](https://ngrok.com/) and sign up for an account.
   1. Download the ngrok executable for your operating system.
   1. Extract the downloaded file to a directory of your choice.
   1. For Windows environment, add the directory where `ngrok.exe` is located to the system's PATH environment variable 
      ```powershell
      setx PATH "$Env:path;<ngrok_full_path>"
      ```
      _In PowerShell environment, replace `<your_auth_token>` with the authentication token provided on the ngrok website._
      > To apply this environment variable change, you need to restart terminals and **Visual Studio Code** for the current project.

   1. Open a terminal or command prompt and run the following command to authenticate your ngrok account:
      ```shell
      ngrok config add-authtoken <your_auth_token>
      ```
      _Replace `<your_auth_token>` with the authentication token provided on the ngrok website._
   1. To start a tunnel, run the following command:
      ```shell
      ngrok http <port_number>
      ```
      _Replace `<port_number>` with the port number your app is running on._
   1. Ngrok will generate a forwarding URL that you can use to access your app from the internet.
      ```shell
      Forwarding      http://<random_string>.ngrok-free.app -> http://localhost:<port_number>
      ```
   1. Click `Ctrl + C` to disconnect the ngrok tunnel.
1. Navigate to the `.vscode` folder then open the `task.json` file. Update `Start local tunnel` task:
   ```json
    {
        "label": "Start local tunnel",
        "type": "shell",
        "command": "ngrok http 3978 --log=stdout --log-format=logfmt",
        "isBackground": true,
        "problemMatcher": {
            "pattern": [
                {
                    "regexp": "^.*$",
                    "file": 0,
                    "location": 1,
                    "message": 2
                }
            ],
            "background": {
                "activeOnStart": true,
                "beginsPattern": "starting web service",
                "endsPattern": "started tunnel|failed to reconnect session"
            }
        }
    }
   ```
1. Navigate to the `teamsapp.local.yml` file in root folder. Add the following action in the first step of the provision lifecycle
   - Windows
     ```yml
     provision:
       - uses: script
         with:
           shell: powershell
           run: |
                for ($i = 1; $i -le 10; $i++) {
                    $endpoint = (Invoke-WebRequest -Uri "http://localhost:4040/api/tunnels" | Select-String -Pattern 'https://[a-zA-Z0-9 -\.]*\.ngrok-free\.app').Matches.Value
                    if ($endpoint) {
                        break
                    }
                    sleep 10
                }
                if (-not $endpoint) {
                    echo "ERROR: Failed to find tunnel endpoint after 10 attempts."
                    exit 1
                } else {
                    echo "::set-teamsfx-env BOT_ENDPOINT=$endpoint"
                    echo "::set-teamsfx-env BOT_DOMAIN=$($endpoint.Substring(8))"
                }
     ```
   - Linux and macOS
     ```yml
     provision:
        - uses: script
            with:
            run: |
                for i in {1..10}; do
                    endpoint=$(curl -s localhost:4040/api/tunnels | grep -o 'https://[a-zA-Z0-9 -\.]*\.ngrok-free\.app')
                    if [ -n "$endpoint" ]; then
                        break
                    fi
                    sleep 10
                done
                if [ -z "$endpoint" ]; then
                    echo "ERROR: Failed to find tunnel endpoint after 10 attempts."
                    exit 1
                else
                    echo "::set-teamsfx-env BOT_ENDPOINT=$endpoint"
                    echo "::set-teamsfx-env BOT_DOMAIN=${endpoint:8}"
                fi
     ```
## Check your work

Run your app locally to test the functionality:

1. In the **LIFECYCLE** menu, select **Preview Your Teams App** (or use the `F5` key) then select **Debug in Teams ()** with your preferred browser.  
2. Teams Toolkit will provision and run your app locally in a browser.
3. On the app installation dialog in the browser, select **Add** to install your Teams app.  Teams opens a conversation with your bot installed.
4. Enter or select the command `resetPassword`.
5. Verify that the bot replies with an adaptive card containing password reset instructions.
