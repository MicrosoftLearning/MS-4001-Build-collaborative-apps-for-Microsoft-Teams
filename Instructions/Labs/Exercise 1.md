# Exercise 1: Implement a message extension that retrieves data from Microsoft Graph

Suppose you have been asked to help the IT Support team build a message extension that allows team members to insert user data into messages using adaptive cards.  In this exercise, you will implement a message extension that retrieves user data from Microsoft Graph.  The solution has already been scaffolded using Teams Toolkit, but you will need to make changes to implement functionality.

## Overview

### Skilling Tasks

In this exercise, you will practice the following tasks:

<TODO: Finalize learning objectives>

- Create a search-based message extension
- Retrieve user information using Microsoft Graph
- Authenticate Microsoft Graph using a Teams app
- Configure permissions for Microsoft Graph

### Exercise tasks

You will need to complete the following tasks to complete the exercise:

- Complete the search functionality
- Provision the message extension
- Configure permissions to access Microsoft Graph
- Run and test the app

## Sign in to Azure and your Microsoft 365 tenant

<TODO: Add sign in instructions>

## Task 1: Complete the search functionality

The Teams app solution has already been scaffolded by another member of the team using Teams Toolkit.  In this task, you'll complete the search functionality.

1. Navigate to the **TeamsBot.ts** file.
2. Locate the comment **"//Add Assignment for the searchContext variable:"** and add the following line of code on the next line to assign the search query value to the searchContext variable:

    ```JavaScript
    searchContext = query.parameters[0].value;
    ```

## Task 2: Provision the message extension

Next, you need to provision the resources required for the message extension.

1. In Visual Studio code, access the **Teams Toolkit** and sign-in to Microsoft 365 and Azure.
2. Select **Provision** and then select **RG1**.  

    When provisioning is complete, a new app registration should be created in your tenant. (+ app secret, etc.)

## Task 3: Configure permissions to retrieve Microsoft Graph data

1. Sign into the Azure portal at [portal.azure.com](portal.azure.com) using your Microsoft 365 admin account.
2. In the left navigation menu, navigate to **Microsoft Entra ID.**
3. Navigate to **Manage > App registrations.**
4. Select the app registration that was created during provisioning, titled **QueryDeptWithMESSO.**
5. Navigate to **Manage > API permissions.**
6. Select **+Add a permission.**
7. Select **Microsoft Graph.**
8. Select **Delegated permissions.**
9. Locate the permissions listed under **User** and select the **User.Read.All** permission amd then select the **Add permissions** button.

## Check your work

<TODO: Insert steps to run the app>
