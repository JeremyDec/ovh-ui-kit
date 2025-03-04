import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { forModule } from 'storybook-addon-angularjs';

import Field from '@ovh-ux/ui-kit.field';
import FormActions from '@ovh-ux/ui-kit.form-actions';
import SelectPicker from '@ovh-ux/ui-kit.select-picker';

import readme from '@ovh-ux/ui-kit.select-picker/README.md';
import { compileTemplate } from '../../../../src/utils';

import image from '../../../_assets/ovh.svg';

// Create mock module for the stories
const moduleName = 'select-picker-webcomponent.stories';
angular.module(moduleName, [
  SelectPicker,

  // For examples
  Field,
  FormActions,
]);

export default {
  title: 'Design System/Components/Select Picker/WebComponent',

  parameters: {
    docs: { iframeHeight: 650 },
    notes: readme,
  },
};

export const Default = forModule(moduleName).createElement(
  () => compileTemplate(
    `
    <oui-select-picker
      disabled="$ctrl.disabled"
      name="ouiSelectPicker1"
      model="$ctrl.model"
      label="Value A"
      on-change="$ctrl.onChange(modelValue)"
      values="$ctrl.values1">
    </oui-select-picker>

    <oui-select-picker
      disabled="$ctrl.disabled"
      name="ouiSelectPicker1"
      model="$ctrl.model"
      label="Value B"
      on-change="$ctrl.onChange(modelValue)"
      values="$ctrl.values2">
    </oui-select-picker>

    <oui-select-picker
      disabled="$ctrl.disabled"
      name="ouiSelectPicker1"
      model="$ctrl.model"
      label="Value C"
      on-change="$ctrl.onChange(modelValue)"
      values="$ctrl.values3">
    </oui-select-picker>`,
    {
      $ctrl: {
        disabled: boolean('Disabled state', false),
        model: 'Value A',
        onChange: action('onChange'),
        values1: ['Value A'],
        values2: ['Value B'],
        values3: ['Value C'],
      },
    },
  ),
);

export const MultipleValues = forModule(moduleName).createElement(
  () => compileTemplate(
    `
    <oui-select-picker
      disabled="$ctrl.disabled"
      name="ouiSelectPicker1"
      match="name"
      model="$ctrl.model"
      label="Value A"
      on-change="$ctrl.onChange(modelValue)"
      values="$ctrl.values1">
    </oui-select-picker>

    <oui-select-picker
      disabled="$ctrl.disabled"
      name="ouiSelectPicker1"
      match="name"
      model="$ctrl.model"
      label="Value B"
      on-change="$ctrl.onChange(modelValue)"
      values="$ctrl.values2">
    </oui-select-picker>

    <oui-select-picker
      disabled="$ctrl.disabled"
      name="ouiSelectPicker1"
      match="name"
      model="$ctrl.model"
      placeholder="Select"
      label="Value C"
      on-change="$ctrl.onChange(modelValue)"
      values="$ctrl.values3">
    </oui-select-picker>`,
    {
      $ctrl: {
        disabled: boolean('Disabled state', false),
        model: { id: 'a1', name: 'Value A (Variant 1)' },
        onChange: action('onChange'),
        values1: [
          { id: 'a1', name: 'Value A (Variant 1)' },
          { id: 'a2', name: 'Value A (Variant 2)' },
        ],
        values2: [{ id: 'b1', name: 'Value B (Variant 1)' }],
        values3: [
          { id: 'c1', name: 'Value C (Variant 1)' },
          { id: 'c2', name: 'Value C (Variant 2)' },
          { id: 'c3', name: 'Value C (Variant 3)' },
        ],
      },
    },
  ),
);

MultipleValues.storyName = 'Multiple values';

export const WithDescription = forModule(moduleName).createElement(
  () => compileTemplate(
    `
    <oui-select-picker
      disabled="$ctrl.disabled"
      name="ouiSelectPicker1"
      model="$ctrl.model"
      label="Value A"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis nibh eget lorem maximus imperdiet. Maecenas tincidunt sodales risus a commodo. Nullam tincidunt libero nisl, a pulvinar mi finibus cursus. Interdum et malesuada fames ac ante ipsum primis in faucibus."
      values="$ctrl.values1">
    </oui-select-picker>

    <oui-select-picker
      disabled="$ctrl.disabled"
      name="ouiSelectPicker1"
      model="$ctrl.model"
      label="Value B"
      description="Donec bibendum, dolor vel interdum volutpat, dolor elit porta nisi, ac tincidunt lorem ante at libero. Etiam dolor lectus, convallis a enim nec, tincidunt pharetra libero. Vestibulum placerat tortor ac orci pulvinar sodales eget sed odio. Aenean fermentum libero ex, porta sagittis orci mollis id."
      values="$ctrl.values2">
    </oui-select-picker>`,
    {
      $ctrl: {
        disabled: boolean('Disabled state', false),
        model: 'Value A',
        values1: ['Value A'],
        values2: ['Value B'],
      },
    },
  ),
);

WithDescription.storyName = 'With description';

export const WithPicture = forModule(moduleName).createElement(
  () => compileTemplate(
    `
      <oui-select-picker
        disabled="$ctrl.disabled"
        label="Picture"
        model="$ctrl.model"
        name="ouiSelectPicker1"
        picture="{{::$ctrl.image}}"
        values="['picture']">
      </oui-select-picker>

      <oui-select-picker
        disabled="$ctrl.disabled"
        label="Icon"
        model="$ctrl.model"
        name="ouiSelectPicker1"
        picture="oui-icon oui-icon-ovh"
        values="['icon']">
      </oui-select-picker>

      <oui-select-picker
        disabled="$ctrl.disabled"
        label="Transclude"
        model="$ctrl.model"
        name="ouiSelectPicker1"
        values="['transclude']">
        <oui-select-picker-picture>
          <span class="oui-badge oui-badge_success">Lorem ipsum</span>
        </oui-select-picker-picture>
      </oui-select-picker>`,
    {
      $ctrl: {
        disabled: boolean('Disabled state', false),
        model: 'picture',
        image,
      },
    },
  ),
);

WithPicture.storyName = 'With picture';

export const WithSection = forModule(moduleName).createElement(
  () => compileTemplate(
    `
    <oui-select-picker
      disabled="$ctrl.disabled"
      name="ouiSelectPicker1"
      model="$ctrl.model"
      label="Value A"
      description="Description"
      values="$ctrl.values1">
      <oui-select-picker-section>Section 1</oui-select-picker-section>
      <oui-select-picker-section>Section 2</oui-select-picker-section>
    </oui-select-picker>

    <oui-select-picker
      disabled="$ctrl.disabled"
      name="ouiSelectPicker1"
      model="$ctrl.model"
      label="Value B"
      description="Description"
      values="$ctrl.values2">
      <oui-select-picker-section>Section 1</oui-select-picker-section>
      <oui-select-picker-section>Section 2</oui-select-picker-section>
    </oui-select-picker>`,
    {
      $ctrl: {
        disabled: boolean('Disabled state', false),
        model: 'Value A',
        values1: ['Value A'],
        values2: ['Value B'],
      },
    },
  ),
);

WithSection.storyName = 'With section';

export const WithFooter = forModule(moduleName).createElement(
  () => compileTemplate(
    `
    <oui-select-picker
      disabled="$ctrl.disabled"
      name="ouiSelectPicker1"
      model="$ctrl.model"
      label="Value A"
      values="$ctrl.values1"
      footer="Lorem ipsum">
    </oui-select-picker>

    <oui-select-picker
      disabled="$ctrl.disabled"
      name="ouiSelectPicker1"
      model="$ctrl.model"
      label="Value B"
      values="$ctrl.values2">
      <oui-select-picker-footer>
        Lorem ipsum<br />
        <small>Dolor sit amet</small>
      </oui-select-picker-footer>
    </oui-select-picker>`,
    {
      $ctrl: {
        disabled: boolean('Disabled state', false),
        model: 'Value A',
        values1: ['Value A'],
        values2: ['Value B'],
      },
    },
  ),
);

WithFooter.storyName = 'With footer';

export const FullExample = forModule(moduleName).createElement(
  () => compileTemplate(
    `
    <oui-select-picker
      disabled="$ctrl.disabled"
      name="ouiSelectPicker1"
      match="name"
      model="$ctrl.model"
      label="Value A"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis nibh eget lorem maximus imperdiet. Maecenas tincidunt sodales risus a commodo. Nullam tincidunt libero nisl, a pulvinar mi finibus cursus. Interdum et malesuada fames ac ante ipsum primis in faucibus."
      on-change="$ctrl.onChange(modelValue)"
      values="$ctrl.values1">
      <oui-select-picker-section>Section 1</oui-select-picker-section>
      <oui-select-picker-section>Section 2</oui-select-picker-section>
      <oui-select-picker-footer>
        Lorem ipsum<br />
        <small>Dolor sit amet</small>
      </oui-select-picker-footer>
    </oui-select-picker>

    <oui-select-picker
      disabled="$ctrl.disabled"
      name="ouiSelectPicker1"
      match="name"
      model="$ctrl.model"
      label="Value B"
      description="Donec bibendum, dolor vel interdum volutpat, dolor elit porta nisi, ac tincidunt lorem ante at libero. Etiam dolor lectus, convallis a enim nec, tincidunt pharetra libero. Vestibulum placerat tortor ac orci pulvinar sodales eget sed odio. Aenean fermentum libero ex, porta sagittis orci mollis id."
      on-change="$ctrl.onChange(modelValue)"
      values="$ctrl.values2">
      <oui-select-picker-picture>
        <span class="oui-badge oui-badge_success">Best seller</span>
      </oui-select-picker-picture>
      <oui-select-picker-section>Section 1</oui-select-picker-section>
      <oui-select-picker-section>Section 2</oui-select-picker-section>
      <oui-select-picker-footer>
        Lorem ipsum<br />
        <small>Dolor sit amet</small>
      </oui-select-picker-footer>
    </oui-select-picker>`,
    {
      $ctrl: {
        disabled: boolean('Disabled state', false),
        model: { id: 'a1', name: 'Value A (Variant 1)' },
        onChange: action('onChange'),
        values1: [
          { id: 'a1', name: 'Value A (Variant 1)' },
          { id: 'a2', name: 'Value A (Variant 2)' },
        ],
        values2: [{ id: 'b1', name: 'Value B (Variant 1)' }],
      },
    },
  ),
);

FullExample.storyName = 'Full example';


export const Validation = forModule(moduleName).createElement(
  () => compileTemplate(
    `
    <form novalidate name="form">
      <oui-field>
        <oui-select-picker
          name="ouiSelectPicker1"
          disabled="$ctrl.disabled"
          match="name"
          model="$ctrl.model"
          on-change="$ctrl.onChange(modelValue)"
          values="$ctrl.values1"
          required>
          <oui-select-picker-label>Value A</oui-select-picker-label>
          <oui-select-picker-footer>Pellentesque habitant morbi tristique</oui-select-picker-footer>
        </oui-select-picker>

        <oui-select-picker
          name="ouiSelectPicker1"
          disabled="$ctrl.disabled"
          match="name"
          model="$ctrl.model"
          on-change="$ctrl.onChange(modelValue)"
          values="$ctrl.values2"
          required>
          <oui-select-picker-label>Value B</oui-select-picker-label>
          <oui-select-picker-footer>Pellentesque habitant morbi tristique</oui-select-picker-footer>
        </oui-select-picker>
      </oui-field>

      <oui-form-actions></oui-form-actions>
    </form>`,
    {
      $ctrl: {
        disabled: boolean('Disabled state', false),
        model: undefined,
        values1: [
          { id: 'a1', name: 'Value A (Variant 1)' },
          { id: 'a2', name: 'Value A (Variant 2)' },
        ],
        values2: [{ id: 'b1', name: 'Value B (Variant 1)' }],
        onChange: action('onChange'),
      },
    },
  ),
);
