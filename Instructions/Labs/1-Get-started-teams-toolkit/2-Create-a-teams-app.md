# Exercise 2: Create a Teams app from a sample in the gallery

Teams Toolkit for Visual Studio Code provides a collection of samples that are ready for you to explore and create your base app from. In this exercise, you'll create your first Microsoft Teams app from the Samples gallery.

Follow one of the tasks below to create a Teams app from a sample or to create a new Teams app using Teams Toolkit.

## Task 1: Create an app from a sample

1. In the Visual Studio Code sidebar, select the **Teams Toolkit** button to open Teams Toolkit.
2. In Teams Toolkit for Visual Studio Code, select **View Samples** to view a catalog of sample apps.
   :::image type="content" source="../../media/view-samples.png" alt-text="Screenshot of the option to view samples.":::
3. Find a sample that interests you and select the screenshot to open the page for that sample.  In order to get up and running quickly, select a sample that lists "Ready for debug" under the sample title on the sample's detail page.  (Other samples will list "Manual configurations required").
4. On the sample page, select **Create** and choose a folder for saving your project. The project will be scaffolded in this local folder.
    :::image type="content" source="../../media/create-sample.png" alt-text="Screenshot of creating an app from a sample.":::
5. When the scaffolding is done, you'll see a new Visual Studio Code window with the Hello World Bot project loaded.  After the project has been scaffolded, you might get a message from Visual Studio Code that asks if you trust the authors of the files in this folder. Select the **Yes, I trust the authors** button to continue.
    :::image type="content" source="../../media/trust-authors.png" alt-text="Screenshot of the trust authors dialog.":::
6. Now you can view the project code, which includes:

- The Teams app code.
- Deployment and manifest files inside the appPackage folder.
- Environment variables inside the env folder.
- A README file that provides required steps to run, debug, and deploy the app.

    :::image type="content" source="../../media/bot-project-code.png" alt-text="Screenshot of a scaffolded app.":::

## Task 2: Create a new Teams app

You may also create a new Teams app using Teams Toolkit.

1. In Teams Toolkit, select **Create a New App**.
2. On the New Project menu, select** **Message extension**.
3. When prompted to select a capability, select **Custom Search Results**.
4. When prompted to select an option, select **Start with a Bot**.
5. When prompted to select a programming language, select **TypeScript**.
6. When prompted to select a folder, select **Default folder** or choose a different file location.
7. **Enter an application name** of your choice for your message extension app and select **enter**.
8. Teams Toolkit will scaffold a new app and open the project folder in Visual Studio Code.
9. You may receive a message from Visual Studio Code that asks if you trust the authors of the files in this folder. Select the **Yes, I trust the authors** button to continue.
10. Now you can view the project code, which includes:

- The Teams app code.
- Deployment and manifest files inside the appPackage folder.
- Environment variables inside the env folder.
- A README file that provides required steps to run, debug, and deploy the app.
