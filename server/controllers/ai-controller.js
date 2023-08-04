'use strict';

module.exports = ({ strapi }) => ({
  async generate(ctx) {
    const reqBody = ctx.request.body;
    let aiType = strapi.plugin('ai-string').config('aiType');
    reqBody['aiType'] = aiType || 'Claude';
    const { prompt, temperature, maxTokens } = reqBody;
    if (aiType && prompt && temperature && maxTokens) {
      try {
        return await strapi
          .service('api::ai-setting.ai-setting')
          .generateText(reqBody);
      } catch (err) {
        console.log(err);
        return err;
        // ctx.throw(500, err);
      }
    }
    return ctx.throw(
      400,
      'Either the prompt, temperature, aiType or maxToken parameter is missing'
    );
  },
});
