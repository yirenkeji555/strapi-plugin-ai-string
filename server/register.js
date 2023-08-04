'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'text-ai2',
    plugin: 'ai-string',
    type: 'string',
  });
};
