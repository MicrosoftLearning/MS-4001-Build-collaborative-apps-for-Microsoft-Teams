---
lab:
    title: 'Create a Teams Tab'
    module: 'Exercise 3'
---

# Exercise 1: Create a Teams Tab

## Scenario

Suppose the IT Support team would like to use a tab to help users review information they need when submitting support tickets.  The team needs users' locale codes for processing and reporting on support tickets. The team has asked you to create a Teams tab that displays a user's locale code.  The app will be updated to display additional information at a later date.

## Exercise tasks

Your task is to create a Teams tab app that retrieves the user's locale, using the Teams context, and displays it in a personal tab.

You will need to complete the following tasks to complete the exercise:

1. Create a tab app using Teams Toolkit for Visual Studio Code.
1. Update the app to retrieve and display the user's locale.

**Estimated completion time:** 10 minutes

## Task 1: Create a tab app using Teams Toolkit for Visual Studio Code

1. Open Visual Studio Code.
1. On the sidebar, select the **Microsoft Teams** icon to open the **TEAMS TOOLKIT** panel.
1. Select **Create a New app**, and then select **Tab**.
1. Select **Basic Tab** from the list of available options.
1. For the programming language, select **TypeScript**.
2. For **Workspace folder**, select **Default folder**.
3. For **Application name**, enter **UserInfoApp**.

A notification appears when all folders and files have been scaffolded successfully, and a new instance of Visual Studio Code opens the new project folder.

In the **EXPLORER** panel, the *src* folder contains the source code for your app. Files outside the *src* folder are server related, such as the bot.

## Task 2: Update the app to retrieve and display the user's locale

Now, you can add the desired functionality to the tab app.

1. Navigate to the `src` > `views` folder then open the `hello.html` file.
1. Locate the `<div>` element and update it to contain the following elements in between the `<div>` and the `</div>` tags:

    ```html
        <h1>Hello, User</h1>
      <span>
        <h2>Review your locale code:</h2>
        <p id="locale"></p>
      </span>
    ```

1. Navigate to the `src` > `scripts` folder then open the `teamsapp.js` file.
1. Replace the contents of the file with the following code:

    ```typescript
        (function () {
          "use strict";
        
          // Call the initialize API first
          microsoftTeams.app.initialize().then(function () {
            microsoftTeams.app.getContext().then(function (context) {
              if (context?.app?.locale) {
                updateLocale(context.app.locale);
              }
              else{
                updateLocale("unknown");
              }
            });
          });
        
          function updateLocale(locale) {
            if(locale){
              document.getElementById("locale").innerHTML = "Locale: " + locale;
            }
          }
        })();
    ```

    This code uses the **context** object to retrieve the user's locale, and updates the HTML to display the locale code.

## Check your work

Run your app in debug mode to test the functionality.

1. In Visual Studio Code, select the **Microsoft Teams** icon to open the **TEAMS TOOLKIT** panel.

2. In the **ACCOUNTS** section, select **Sign in to Azure**. In the dialog that opens, select the **Sign in** button and enter your Microsoft 365 credentials.

   Teams Toolkit requires a Microsoft 365 work or school account with Global Administrator privileges.

3. Start running your app with the debugger attached by using one of these methods:

   - Select the F5 key.
   - In Visual Studio Code, select **Run** > **Start debugging**.
   - In the **ENVIRONMENT** section of Teams Toolkit, open the *local* folder, and then and select the browser of your choice.

4. After Visual Studio Code performs some checks, with actions viewable on the **Console** tab, a new browser window opens. In the **UserInfoApp** dialog, select the **Add** button to install the app in Teams for preview.

The app is now viewable on the sidebar. The app is pre-configured with two tabs: **Personal Tab** and **About**. Verify that the locale code is displayed in the tab.
