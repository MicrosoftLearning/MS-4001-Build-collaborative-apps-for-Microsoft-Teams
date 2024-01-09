---
lab:
    title: 'Build a Bot'
    module: 'Exercise 4'
---

# Exercise 1: Build a Bot

Suppose you have been asked to help the IT Support team. You need to add a new command named "winner” to the bot. The command must return the winner.json adaptive card. Once you have modified the code, provision the bot to RG1, and then deploy and enable the app for the entire organization.


## Overview

### Skilling Tasks

In this exercise, you will practice the following tasks:

<TODO: Finalize learning objectives>

- Create a bot that sends proactive messages to Microsoft Teams
- Create a conversational bot
- Create an adaptive card
- Register a new bot in Microsoft Azure


### Exercise tasks

You will need to complete the following tasks to complete the exercise:

- Configure the manifest
- Add a command in teamsbot.ts
- Provision the bot
- Enable the app package for the organization


## Task 1: Configure the manifest

1. Open the manifest.json under “app package”
2. Search for “commands” under “commandList” under “bots” and add a new command

    ```JavaScript
     {
                            "title": "winner",
                            "description": "Winner message"
                        }

3. Verify in the manifest if there is a new command with title “winner".


## Task 2: Add a Command in teamsbot.ts

1. Open the teamsBot.ts
2. Add an import statement

    ```JavaScript
    import rawWinnerCard from "./adaptiveCards/winner.json";
3. Add a new case on line 49

    ```JavaScript
     case "winner" { 
          const card = AdaptiveCards.declareWithoutData(rawWinnerCard).render();
          await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
          break;
        }
4. Verify In teamsBot.ts check the following line
	case “winner”:

## Task 3: Provision the bot

1.  Click on Teams Toolikt
2. Press the Provisioning button select “rg1”
3. Verify:Check in the resource group if you find a Azure Bot, App Service plan, and App Service resource type.
4. From Visual Studio code. press the “Publish” button
5. Verify: For publishing check in the app catalog if there is a “Bot-Dev” application that was approved.

## Task 4: Enable the app package for the organization

1. Signin to https://admin.teams.microsoft.com/ with your Microsoft 365 account
2. Click on “Teams apps” -> “Manage apps”
3. Search for “Bot-Dev” and open it
4. Click on “Publish”
5. Confirm with “Publish”
6. Verify in the Teams app catalog if you find an app called “Company Dashboard-prod" or “Company Dashboard-dev" that is in status “Allowed”.
