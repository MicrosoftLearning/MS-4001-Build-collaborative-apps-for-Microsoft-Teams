# Exercise 1: Create an Incoming Webhook

Suppose you have been asked to help the IT Support team. You need to configure a Finance team to ensure that a third-party notification service can post messages to the Finance team’s external channel by using a webhook named External. Test whether the webhook for the external channel can accept messages by using the Invoke-RestMethod PowerShell cmdlet. Specify the payload by specifying the following parameters: -ContentType 'Application/Json' -Body '{"text":"Hello World!"}'.

## Overview

### Skilling Tasks

In this exercise, you will practice the following tasks:

<TODO: Finalize learning objectives>

- Create an incoming webhook
- Create an outgoing webhook
- Process data received from an incoming webhook 
- Send data to an outgoing webhook


### Exercise tasks

You will need to complete the following tasks to complete the exercise:

- Build Webhooks
- Post a meswsage


## Task 1: Build Webhooks

1. Open teams
2. Select the ellipse for the Finance Team External Channel.
3. Select Connectors
4. Search for webhook
5. Select Add for incoming webhook
6. Select add again
7. Select the ellipse for the Finance Team External Channel.
8. Select Connectors
9. Select Configure for incoming webhook
10. For the name enter: External
11. Select Create
12. Copy the URL for use in the next part.
13. Select Done
14) Verify by  searching for the incoming webhook in the connectors for the channel.



## Task 2: Post a Message

1. Open the cmd shell
2. Start powershell
3. Run:

 Invoke-RestMethod -Method post -ContentType 'Application/Json' -Body '{"text":"Hello World!"}' -Uri https://prosoftsys1.webhook.office.com/webhookb2/a0f6a407-939a-4d21-a84d-634fbd9367ee@905bf77f-fff7-4edb-b176-d206023157ea/IncomingWebhook/cabcab233a3f45658e5cdaa4e040f66c/de75fac6-a625-41e6-8734-330b4f22c386

4. Verify by  checking that there should be a message in the channel from “External”


