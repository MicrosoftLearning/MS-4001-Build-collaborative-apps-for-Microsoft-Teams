# Exercise 2: Create an Incoming Webhook

## Scenario

Suppose the IT Support team uses a third-party notification service to manage alerts and messages. Recently, the team decided to automate the process of posting messages to a Teams channel that is used for critical updates.  The third-party service is being designed to post messages via a webhook.  

## Exercise tasks

Your task is to create a new Incoming Webhook, named **Alerts**, to receive these messages.  You should also test the webhook to ensure it can accept and display a message with the string `"Sample Alert!"` correctly. The team will update the service with the webhook endpoint URL when you complete your tasks.

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
4. Select **Add**.
5. On the overview page, select **Add**.
6. In the channel, select the **More options** menu again then select **Connectors**.
7. Next to **Incoming Webhook** select **Configure**.
8. For the name enter **Alerts**.
9. Select **Create**.
10. Copy the **URL** to use in the next task.
11. Select **Done**.

You have configured an Incoming Webhook in the channel.

## Task 2: Post a message to test the webhook

To test the webhook, use PowerShell to send a message to the webhook endpoint.

1. Open **PowerShell**.
2. Run the following command to send the message:

     ```powershell
     Invoke-RestMethod -Method post -ContentType 'Application/Json' -Body '{"text":"Testing the Alerts endpoint."}' -Uri https://prosoftsys1.webhook.office.com/webhookb2/a0f6a407-939a-4d21-a84d-634fbd9367ee@905bf77f-fff7-4edb-b176-d206023157ea/IncomingWebhook/cabcab233a3f45658e5cdaa4e040f66c/de75fac6-a625-41e6-8734-330b4f22c386
    ```

## Check your work

1. In the Microsoft Teams client, navigate to the **Conversations** tab of the configured channel.
2. Verify the presence of a message in the channel from `Alerts` that reads `"Hello World!"`.
