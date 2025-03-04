import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { forModule } from 'storybook-addon-angularjs';

import Search from '@ovh-ux/ui-kit.search';

import readme from '@ovh-ux/ui-kit.search/README.md';
import { compileTemplate } from '../../../../src/utils';

import { objects } from '../../../_data/autocomplete.data.json';

const moduleName = 'search-webcomponent.stories';
angular.module(moduleName, [Search]);

export default {
  title: 'Design System/Components/Search/WebComponent',

  parameters: {
    docs: { iframeHeight: 200 },
    notes: readme,
  },
};

export const Simple = forModule(moduleName).createElement(
  () => compileTemplate(
    `
    <oui-search
      disabled="$ctrl.disabled"
      model="$ctrl.model"
      on-change="$ctrl.onChange(modelValue)"
      on-reset="$ctrl.onReset()"
      on-submit="$ctrl.onSubmit(modelValue)"
      placeholder="Placeholder example">
    </oui-search>`,
    {
      $ctrl: {
        disabled: boolean('Disabled state', false),
        onChange: action('onChange'),
        onReset: action('onReset'),
        onSubmit: action('onSubmit'),
      },
    },
  ),
);

export const Autocomplete = forModule(moduleName).createElement(
  () => compileTemplate(
    `
    <oui-search
      autocomplete="$ctrl.autocomplete"
      autocomplete-property="country.name"
      model="$ctrl.model"
      on-change="$ctrl.onChange(modelValue)"
      on-reset="$ctrl.onReset()"
      on-submit="$ctrl.onSubmit(modelValue)"
      placeholder="Search country name">
    </oui-search>`,
    {
      $ctrl: {
        autocomplete: objects,
        onChange: action('onChange'),
        onReset: action('onReset'),
        onSubmit: action('onSubmit'),
      },
    },
  ),
);
