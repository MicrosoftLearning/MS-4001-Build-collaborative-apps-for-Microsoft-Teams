---
lab:
    title: 'Create an Incoming Webhook'
    module: 'Exercise 2'
---

# Exercise 2: Create an Incoming Webhook

## Scenario

Suppose the IT Support team uses a third-party notification service to manage alerts and messages. Recently, the team decided to automate the process of posting messages to a Teams channel that is used for critical updates.  The third-party service is being designed to post messages via a webhook.  

## Exercise tasks

Your task is to create a new Incoming Webhook, named **Alerts**, to receive these messages.  You should also test the webhook to ensure it can accept and display a message with the string `"Testing the Alerts endpoint."` correctly. The team will update the service with the webhook endpoint URL when you complete your tasks.

You need to perform the following tasks to complete the exercise:

1. Register an Incoming Webhook.
2. Post a message to test the webhook.

**Estimated completion time:** 8 minutes

## Task 1: Register an Incoming Webhook

First, register an Incoming Webhook.

**Note:** If the Teams account you're using for this exercise doesn't already have a team with a channel in it, create a new channel before completing the following steps.

1. In Microsoft Teams, navigate to a channel where you can configure the webhook.
2. In the channel, select the **More options** menu then select **Connectors**.  (Note: use the menu within the channel, not the menu from the channel list.)
3. Search for `"webhook"` then select **Incoming Webhook**.

   :::image type="content" source="../../media/add-incoming-webhook.png" alt-text="Screenshot of Webhook in the search bar.":::

4. Select **Add**.
5. On the overview page, select **Add**.
6. In the channel, select the **More options** menu again then select **Connectors**.
7. Next to **Incoming Webhook** select **Configure**.
8. For the name enter **Alerts**.
9. Select **Create**.  Leave this window open so you can copy the URL during the next task.

You have configured an Incoming Webhook in the channel.

## Task 2: Post a message to test the webhook

To test the webhook, use PowerShell to send a message to the webhook endpoint.

1. Open **PowerShell**.
2. Run the following command to send the message.  Replace <YOUR WEBHOOK URL> with the URL from the webhook configuration window in Teams from the previous task:

     ```powershell
     Invoke-RestMethod -Method post -ContentType 'Application/Json' -Body '{"text":"Testing the Alerts endpoint."}' -Uri <YOUR WEBHOOK URL>
    ```

## Check your work

1. In the Microsoft Teams client, navigate to the **Conversations** tab of the configured channel.
2. Verify the presence of a message in the channel from `Alerts` that reads `"Testing the Alerts endpoint"`.

 :::image type="content" source="../../media/final-alert-message.png" alt-text="Screenshot of the Configured Permissions view in the Azure Portal.":::
