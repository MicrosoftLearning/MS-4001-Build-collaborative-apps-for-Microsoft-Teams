import { Attachment, CardFactory } from 'botbuilder';

export function createDynamicSearchCard(): Attachment {
     return CardFactory.adaptiveCard({
         $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
         version: '1.6',
         type: 'AdaptiveCard',
         body: [
             {
                 text: 'Please search for temperature using ZIP Code.',
                 wrap: true,
                 type: 'TextBlock'
             },
             {
                 columns: [
                     {
                         width: 'stretch',
                         items: [
                             {
                                 choices: [],
                                 'choices.data': {
                                     type: 'Data.Query',
                                     dataset: 'locations',
                                     value: 'value'
                                 },
                                 id: 'choiceSelect',
                                 type: 'Input.ChoiceSet',
                                 placeholder: 'ZIP Code',
                                 label: 'ZIP Code search',
                                 isRequired: false,
                                 errorMessage: 'There was an error test.',
                                 isMultiSelect: false,
                                 style: 'filtered'                                
                             }
                         ],
                         type: 'Column'
                     }
                 ],
                 type: 'ColumnSet'
             }
         ],
         actions: [
             {
                 id: 'submitdynamic',
                 type: 'Action.Submit',
                 title: 'Submit',
                 data: {
                     verb: 'DynamicSubmit'
                 }
             }
         ]
     });
 }