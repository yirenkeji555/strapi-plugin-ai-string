import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { TextInput } from '@strapi/design-system/TextInput';
import { Stack } from '@strapi/design-system/Stack';
import { Button } from '@strapi/design-system/Button';
import { Textarea } from '@strapi/design-system';
import { auth, request } from '@strapi/helper-plugin';


export default function Index({
  name,
  error,
  description,
  onChange,
  value,
  intlLabel,
  attribute,
}) {
  const { formatMessage } = useIntl();
  const [prompt, setPrompt] = useState('');
  const [err, setErr] = useState(''); 
  const [loading, setLoading] = useState(false); 

  const generateText = async () => {
    setLoading(true);
    try {
      const response = await request(`/ai-string/generate-text`, {
        method: 'POST',
        body: {
          template: '',
          prompt: `${prompt}`,
          temperature: 0.7,
          aiType: 'Claude',
          maxTokens: parseFloat(attribute.options.length),
        },
      });
      const parsedResult = response.text || '';
      onChange({
        target: { name, value: parsedResult.trim(), type: attribute.type },
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      setErr(err.message);
    }
  }

  const clearGeneratedText = async () => {
    onChange({ target: { name, value: '', type: attribute.type } })
  }

  return (
    <Stack spacing={1}>
      <TextInput
        placeholder="Please write a prompt for content to generate"
        label={name}
        name="Prompt"
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      />
      <Stack spacing={2}>
        <Textarea
          placeholder={`Generated text for ${name}`}
          name="content"
          onChange={(e) =>
            onChange({
              target: { name, value: e.target.value, type: attribute.type },
            })
          }
        >
          {value}
        </Textarea>
        <Stack horizontal spacing={1}>
          <Button onClick={() => generateText()}>
            {loading ? 'Generating ...' : 'Generate'}
          </Button>
          <Button variant="secondary" onClick={() => clearGeneratedText()}>
            Clear
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
