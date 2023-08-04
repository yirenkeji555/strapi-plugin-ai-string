'use strict';

module.exports = ({ strapi }) => ({

  async generateText(prompt, max_tokens) {
    return { choices: [{ text: 'hello' +  prompt }] };
  }

});
