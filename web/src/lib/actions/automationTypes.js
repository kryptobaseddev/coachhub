// src/lib/actions/automationTypes.js
export const AutomationActionTypes = {
    LIGHTS: {
      type: 'lights',
      targets: ['all', 'individual'],
      actions: ['on', 'off', 'set']
    },
    CLIMATE: {
      type: 'climate',
      targets: ['individual'],
      actions: ['set', 'off']
    },
    SHADES: {
      type: 'shades',
      targets: ['all', 'individual'],
      actions: ['open', 'close', 'set']
    },
    FLOOR_HEAT: {
      type: 'floor_heat',
      targets: ['individual'],
      actions: ['on', 'off', 'set']
    }
  };
  
  export const AutomationTriggerTypes = {
    SCHEDULE: 'schedule',
    EVENT: 'event',
    CONDITION: 'condition'
  };