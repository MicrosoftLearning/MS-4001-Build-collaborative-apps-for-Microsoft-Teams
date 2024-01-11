# Exercise 1: Create a Teams Tab

## Scenario

Suppose you have been asked to help the IT Support team. You need to modify the App.tsx file to ensure that a user's display name appears correctly after the user launches the app. 

## Exercise tasks

Retrieve the displayname by using the Teams context and sets the displayname by using the setUserName function.
 
Once you resolve this issue, you need to deploy the app to meet the following requirements:
 
- Provision the app in the RG1 resource group.
- Deploy the app and enable it for the entire organization.
- Ensure that the Teams app is preinstalled for all users.

You will need to complete the following tasks to complete the exercise:

- Create a configurable Teams tab
- Publish app package
- Enable the app package for the organization
- Install the app for all users in the organization


## Task 1: Provision Teams tab

1. Open the Company App in Visual Studio Code
2. Click on the Teams Toolkit Icon
3. Click on “Sign in to Microsoft 365” with the Office 365 Tenant credentials
4. Click on “Sign in to Azure” with the “Azure Portal” credentials
5. Create an environment “prod”
6. Click on “Provisioning”
7. Select RG1
8. Click on “Provision”
9. Verify if in the Azure Subscription’s Resource Group “RG1” you can find a storage account.

## Task 2: Publish app package

1. Open the Company App in Visual Studio Code
2. Click on the Teams Toolkit Icon
3. Click on “Sign in to Microsoft 365” with the Office 365 Tenant credentials
4. Click on “Sign in to Azure” with the “Azure Portal” credentials
5. Click on “Publish” to Prod
6. Verify in the Teams app catalog if you find an app called “Company Dashboard-prod" or “Company Dashboard-dev" that is in status “Blocked”.

## Task 3: Enable the app package for the organization

1. Signin to https://admin.teams.microsoft.com/ with your Microsoft 365 account
2. Click on “Teams apps” -> “Manage apps”
3. Search for “Company Dashboard” and open it
4. Click on “Publish”
5. Confirm with “Publish”
6. Verify in the Teams app catalog if you find an app called “Company Dashboard-prod" or “Company Dashboard-dev" that is in status “Allowed”.

## Task 4: Install the app for all users in the organization

1. Signin to https://admin.teams.microsoft.com/ with your Microsoft 365 account
2. Click on “Teams apps” -> “Setup policies”
3. Click on “Global (Org-wide default)
4. Under “Installed apps” click on “Add apps”
5. Search for “Company Dashboard” and add it
6. Verify if an app starting with “Company Dashboard(-dev) or (-prod)” has been added to the installed apps of the Global Org-wide default” setup policy
