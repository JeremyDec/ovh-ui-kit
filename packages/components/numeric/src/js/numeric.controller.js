import { addBooleanParameter, addDefaultParameter } from '@ovh-ux/ui-kit.core/src/js/component-utils';

// By design, value is restricted to [0, 99999] interval
const MIN_VALUE = 0;
const MAX_VALUE = 99999;
const MIN_WIDTH = 3;
const STEP = 1;

export default class {
  constructor($attrs, $element, $log, $scope, $timeout) {
    'ngInject';

    this.$attrs = $attrs;
    this.$element = $element;
    this.$log = $log;
    this.$id = $scope.$id;
    this.$timeout = $timeout;
  }

  $onInit() {
    addDefaultParameter(this, 'id', `ouiNumeric${this.$id}`);
    addDefaultParameter(this, 'min', MIN_VALUE);
    addDefaultParameter(this, 'max', MAX_VALUE);
    addDefaultParameter(this, 'step', STEP);
    addBooleanParameter(this, 'disabled');

    if (!angular.isNumber(this.min)) {
      if (angular.isDefined(this.min)) {
        this.$log.warn(`Invalid attribute min, expected number got '${this.min}'`);
      }
      this.min = MIN_VALUE;
    }

    if (!angular.isNumber(this.max)) {
      if (angular.isDefined(this.max)) {
        this.$log.warn(`Invalid attribute max, expected number got '${this.max}'`);
      }
      this.max = MAX_VALUE;
    }

    if (!angular.isNumber(this.step)) {
      if (angular.isDefined(this.step)) {
        this.$log.warn(`Invalid attribute step, expected number got '${this.step}'`);
      }
      this.step = STEP;
    }

    if (!angular.isNumber(this.model)) {
      if (angular.isDefined(this.model)) {
        this.$log.warn(`Invalid attribute model, expected number got '${this.model}'`);
      }

      // if model is undefined, initialize it with min value
      this.setModelValue(this.min);
    }

    if (angular.isDefined(this.$attrs.disabled) && angular.isUndefined(this.disabled)) {
      this.disabled = true;
    }

    // used to trigger only onChange when necessary and
    // reset input if invalid characters are used
    this.previousValue = this.model;
  }

  $postLink() {
    // Sometimes the digest cycle is done before dom manipulation,
    // So we use $timeout to force the $apply
    this.$timeout(() => this.$element
      .addClass('oui-numeric')
      .removeAttr('id')
      .removeAttr('name'));
  }

  getWidth() {
    // We calculate the width of the input
    // based on the digits of the max number
    let inputWidth = MIN_WIDTH;

    if (this.max && angular.isNumber(this.max)) {
      const maxString = this.max.toString();
      inputWidth = maxString.length || MIN_WIDTH;
    }

    return `${inputWidth}ch`;
  }

  setModelValue(value) {
    // updates model and displayed value
    this.model = value;

    // only trigger onChange if model value changed
    if (this.previousValue !== this.model && angular.isFunction(this.onChange)) {
      this.onChange({
        modelValue: this.model,
      });
    }

    this.previousValue = this.model;
  }

  increment() {
    if (angular.isNumber(this.model)) {
      this.setModelValue(this.model + this.step);
    } else {
      this.setModelValue(this.min);
    }
  }

  decrement() {
    if (angular.isNumber(this.model)) {
      this.setModelValue(this.model - this.step);
    } else {
      this.setModelValue(this.min);
    }
  }

  onInputChanged() {
    // dont call onChange method for invalid value
    if (this.model !== null
      && angular.isNumber(this.model)
      && this.model >= this.min
      && this.model <= this.max) {
      this.setModelValue(this.model);
    }
  }
}
