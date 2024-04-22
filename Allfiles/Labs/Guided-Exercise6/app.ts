import { ActivityTypes, TurnContext } from "botbuilder";
import { createStaticSearchCard } from "./cards/staticSearchCard";
import { createDynamicSearchCard } from "./cards/dynamicSearchCard";
import axios from "axios";
// See https://aka.ms/teams-ai-library to learn more about the Teams AI library.
import { Application, TurnState, AdaptiveCardSearchResult } from "@microsoft/teams-ai";
const app = new Application();

interface SubmitData {
    choiceSelect?: string;
}

app.message(/static/i, async (context, _state) => {
    const attachment = createStaticSearchCard();
    await context.sendActivity({ attachments: [attachment] });
});

app.message(/dynamic/i, async (context, _state) => {
    const attachment = createDynamicSearchCard();
    await context.sendActivity({ attachments: [attachment] });
});

// Listen for query from dynamic search card
app.adaptiveCards.search('locations', async (context: TurnContext, state: TurnState, query) => {
    // Format search results
    const locations: AdaptiveCardSearchResult[] = [];
    // Execute query
    const searchQuery = query.parameters['queryText'] ?? '';
    if (searchQuery.length < 4) {
        return locations;
    }   

    const response = await axios.get(
        `https://zip-api.eu/api/v1/codes/postal_code=US-${searchQuery}*`
    );

    interface DataObject {
        state: string;
        place_name: string;
        postal_code: string;
        lat:string
        lng:string
    };

    //response data is an array of objects or an object
    response.data = Array.isArray(response.data) ? response.data : [response.data];
    response.data.forEach((obj: DataObject) => {
        const result: AdaptiveCardSearchResult = {
            title: `${obj.postal_code} - ${obj.place_name}, ${obj.state}`,
            value: `${obj.postal_code}|${obj.place_name}|${obj.lat}|${obj.lng}`
        };
        locations.push(result);
    });

    // Return search results
    return locations;
});

// Listen for submit buttons
app.adaptiveCards.actionSubmit('DynamicSubmit', async (context, _state, data: SubmitData) => {
    let [postalCode, placeName, lat, lon] = data.choiceSelect?.split('|') ?? [];
    await context.sendActivity(`The dynamically selected place is: ${placeName}`);
    const weatherLocation = await axios.get(
        `https://api.weather.gov/points/${lat},${lon}`
    );
    const forcast = await axios.get(weatherLocation.data.properties.forecast);
    await context.sendActivity(`The weather in ${placeName}: ${forcast.data.properties.periods[0].detailedForecast}`);
    });

    app.adaptiveCards.actionSubmit('StaticSubmit', async (context, _state, data: SubmitData) => {
    await context.sendActivity(`The statically selected option is: ${data.choiceSelect}`);
    });

    // Listen for ANY message to be received. MUST BE AFTER ANY OTHER HANDLERS
    app.activity(ActivityTypes.Message, async (context, _state) => {
    await context.sendActivity(`Try saying "static search" or "dynamic search".`);
});

export default app;