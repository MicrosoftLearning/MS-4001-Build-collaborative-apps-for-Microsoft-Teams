---
lab:
    title: 'Create an Incoming Webhook'
    module: 'Exercise 2'
---

# Exercise 1: Create an Incoming Webhook

Imagine you are a software developer working with the IT Support team of a large organization. The team uses a third-party notification service to manage alerts and messages. Recently, the team decided to automate the process of posting messages to a Teams channel that is used for critical updates.

The third-party service is being designed to post messages via a webhook.  Your task is to create a new incoming webhook, named **Alerts**, to receive these messages.  You should also test the webhook to ensure it can accept and display a message with the string "Sample Alert!" correctly. The service will be updated with the webhook endpoint URL when you complete your tasks.

## Objectives

In this exercise, you practice how to:

- Create an incoming webhook

**Estimated completion time:** 

## Prerequisites

- Admin access to a Microsoft 365 tenant suitable for development and testing
- Microsoft Teams
- PowerShell
- Experience using Microsoft Teams

## Exercise tasks

You need to perform the following tasks to complete the exercise:

## Task 1: Register an incoming webhook

First, register an incoming webhook.

> [!NOTE]
> If the Teams account you're using for this exercise doesn't already have a team with a channel in it, create a new channel before completing the following steps.

1. In Microsoft Teams, navigate to a channel where you can configure the webhook.
2. In the channel, select the **More options** menu then select **Connectors**.  (Note: use the menu within the channel, not the menu from the channel list.)
3. Search for "webhook" then select **Incoming Webhook**.  Select **Add**.
4. On the overview page, select **Add**.
5. In the channel, select the **More options** menu again then select **Connectors**.
6. Next to **Incoming Webhook** select **Configure**.
7. For the name enter **"Alerts"**.
8. Select **Create**.
9. Copy the **URL** to use in the next task.
10. Select **Done**.

## Task 2: Post a Message

1. Open the cmd shell
2. Start powershell
3. Run:

 Invoke-RestMethod -Method post -ContentType 'Application/Json' -Body '{"text":"Hello World!"}' -Uri https://prosoftsys1.webhook.office.com/webhookb2/a0f6a407-939a-4d21-a84d-634fbd9367ee@905bf77f-fff7-4edb-b176-d206023157ea/IncomingWebhook/cabcab233a3f45658e5cdaa4e040f66c/de75fac6-a625-41e6-8734-330b4f22c386

4. Verify by  checking that there should be a message in the channel from “External”


