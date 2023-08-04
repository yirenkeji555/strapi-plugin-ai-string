import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import PluginIcon from './components/PluginIcon';


const name = pluginPkg.strapi.name;

export default { 
  register(app) {
    
    app.customFields.register({
      name: 'text-ai2',
      pluginId: 'ai-string',
      type: 'string',
      intlLabel: {
        id: 'ai-string.text-ai2.label',
        defaultMessage: 'AiTextarea',
      },
      intlDescription: {
        id: 'ai-string.text-ai2.description',
        defaultMessage: 'Fill Textarea From AI!',
      },
      icon: PluginIcon, // don't forget to create/import your icon component
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-component" */ './components/Input'
          ),
      },
      options: {
        base: [
          /*
            Declare settings to be added to the "Base settings" section
            of the field in the Content-Type Builder
          */
          {
            sectionTitle: {
              id: 'ai-string.text-ai2.length',
              defaultMessage: 'Text Length',
            },
            items: [
              // Add settings items to the section
              {
                intlLabel: {
                  id: 'ai-string.text-ai2.length.label',
                  defaultMessage: 'Select the length of your text',
                },
                name: 'options.length',
                type: 'select',
                value: '64', // these are tokens, 1 token is roughly 4 english words so this goes to approx 250 words
                options: [
                  {
                    key: '250 words',
                    value: '250',
                    metadatas: {
                      intlLabel: {
                        id: 'ai-string.text-ai2.length.250',
                        defaultMessage: '250 words',
                      },
                    },
                  },
                  {
                    key: '500 words',
                    value: '500', // these are tokens, 1 token is roughly 4 english words so this goes to approx 500 words
                    metadatas: {
                      intlLabel: {
                        id: 'ai-string.text-ai2.length.500',
                        defaultMessage: '500 words',
                      },
                    },
                  },
                  {
                    key: '1000 words',
                    value: '1000', // these are tokens, 1 token is roughly 4 english words so this goes to approx 500 words
                    metadatas: {
                      intlLabel: {
                        id: 'ai-string.text-ai2.length.1000',
                        defaultMessage: '1000 words',
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  },

  

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
