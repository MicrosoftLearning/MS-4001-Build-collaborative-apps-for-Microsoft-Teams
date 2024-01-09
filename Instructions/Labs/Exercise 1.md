---
lab:
    title: 'Implement a message extension that retrieves data from Microsoft Graph'
    module: 'Exercise 1'
---

# Exercise 1: Implement a message extension that retrieves data from Microsoft Graph

Suppose you have been asked to help the IT Support team build a message extension that allows team members to insert user data into messages using adaptive cards.  In this exercise, you will implement a message extension that retrieves user data from Microsoft Graph.  The solution has already been scaffolded using Teams Toolkit, but you will need to make changes to implement functionality.

## Objectives

In this exercise, you practice how to:

- Create an incoming webhook

**Estimated completion time:** 

- Create a search-based message extension
- Retrieve user information using Microsoft Graph
- Authenticate Microsoft Graph using a Teams app
- Configure permissions for Microsoft Graph

### Exercise tasks

You need to perform the following tasks to complete the exercise:

- Complete the search functionality.
- Provision the message extension.
- Configure permissions to access Microsoft Graph.
- Run and test the app.

## Sign in to Azure and your Microsoft 365 tenant

<TODO: Add sign in instructions>
Use your Microsoft 365 account to sign in to Teams. If you're using a Microsoft 365 developer program tenant, the admin account you set up while registering is your Microsoft 365 account.

## Review the project

A message extension app has been scaffolded using Teams Toolkit.  The app has also been updated to retrieve data from Microsoft Graph.

Review the project directories and files in the Explorer area of Visual Studio Code and familiarize yourself with the source code.  Key files and folders include:

| Folder / File | Contents |
| --- | --- |
| `teamsapp.yml` | Main project file describes your application configuration and defines the set of actions to run in each lifecycle stage. |
| `teamsapp.local.yml` | This overrides `teamsapp.yml` with actions that enable local execution and debugging. |
| `.vscode/` | VSCode files for local debug. |
| `appPackage/` | The app package files, including the Teams app manifest. |
| `infra/` | Templates for provisioning Azure resources. |
| `index.js` | Application entry point and `restify` handler. |
| `teamsBot.js` | Teams activity handler.  |

## Task 1: Complete the search functionality
<explain override of function with SSO to call Graph>The following code snippet shows how to override handleTeamsMessagingExtensionQuery that extends from TeamsActivityHandler, and use handleMessageExtensionQueryWithSSO provided by TeamsFx SDK to sign in to get an access token:

```typescript
const authConfig: OnBehalfOfCredentialAuthConfig = {
  authorityHost: process.env.M365_AUTHORITY_HOST,
  clientId: process.env.M365_CLIENT_ID,
  tenantId: process.env.M365_TENANT_ID,
  clientSecret: process.env.M365_CLIENT_SECRET,
 };
 const loginUrl = process.env.INITIATE_LOGIN_ENDPOINT;
 public async handleTeamsMessagingExtensionQuery(context: TurnContext, query: any): Promise<any> {
  return await handleMessageExtensionQueryWithSSO(context, authConfig, loginUrl, 'User.Read', 
    async (token: MessageExtensionTokenResponse) => {
      // ... continue to query with access token ...
    });
 }
```

The solution is missing code to store the value of the search query string for use in the Graph query.  Update the code to store this value in a variable named  `searchQuery`.
1. Navigate to the **TeamsBot.ts** file.
2. In the `handleTeamsMessagingExtensionQuery` method, locate the comment **// Define the searchQuery variable:** and add the following line of code on the next line to assign the search query value to the searchQuery variable:

    ```JavaScript
    const searchQuery = query.parameters[0].value;
    ```

3. The code that follows this line uses this value to query Microsoft Graph.

## Task 2: Provision the message extension

Next, you need to provision the resources required for the message extension.

1. In Visual Studio code, access the **Teams Toolkit** and sign-in to Microsoft 365 and Azure.
2. Select **Provision** and then select **RG1**.  

    When provisioning is complete, a new app registration should be created in your tenant. (+ app secret, etc.)

## Task 3: Configure permissions to retrieve Microsoft Graph data

1. Sign into the Azure portal at [portal.azure.com](portal.azure.com) using your Microsoft 365 admin account.
2. In the left navigation menu, navigate to **Microsoft Entra ID**.
3. Navigate to **Manage > App registrations > All registrations**.
4. Select the app registration that was created during provisioning.  It is titled --TODO-- **QueryDeptWithMESSO** based on the `name` value provided in the `provision` section of your `teamsapp.yml`/`teamsapp.local.yml` file.
5. Navigate to **Manage > API permissions.**
6. Select **+Add a permission.**
7. Select **Microsoft Graph.**
8. Select **Delegated permissions.**
9. Locate the permissions listed under **User** and select the **User.Read.All** permission amd then select the **Add permissions** button.

## Check your work

Build and run your app locally to test your app and check your work.

1. Select the **F5** key to start debugging.  Alternatively, to select a specific debug option, navigate to the the Teams Toolkit sidebar. Under **Development**, select **Preview your Teams app (F5).**  In the dropdown menu that appears under the Command Palette, select your preferred debug option.
2. When you run the app for the first time, all dependencies are downloaded, and the app is built. A browser window opens when the build is complete. This process can take three to five minutes to complete.
3. Teams displays a window with your app's description and permission requirements.  Select **Add** to add the app.
4. Teams loads your message extension in a message.
5. Enter a letter or two into the search bar to search for an org user in your tenant.
6. Select a result.  The resulting card will be inserted into the compose area for you to send.

