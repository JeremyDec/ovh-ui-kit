describe('ouiCheckbox', () => {
  let $timeout;
  let TestUtils;

  beforeEach(angular.mock.module('oui.checkbox'));
  beforeEach(angular.mock.module('oui.test-utils'));

  beforeEach(inject((_$timeout_, _TestUtils_) => {
    $timeout = _$timeout_;
    TestUtils = _TestUtils_;
  }));


  const getCheckboxInputElement = (element) => element[0].querySelector('input[type=checkbox]');
  const getCheckboxLabelElement = (element) => element[0].querySelector('label');
  const getCheckboxTextContainerElement = (element) => element[0].querySelector('.oui-checkbox__text');
  const getCheckboxDescriptionElement = (element) => element[0].querySelector('.oui-checkbox__description');
  const getCheckboxFooterElement = (element) => element[0].querySelector('.oui-checkbox__footer');

  describe('Component', () => {
    it('should have an element with default classname', () => {
      const element = TestUtils.compileTemplate('<oui-checkbox></oui-checkbox>');

      $timeout.flush();

      expect(element.hasClass('oui-checkbox')).toBe(true);
    });

    describe('id attribute', () => {
      it('should generate an id for the input and label when undefined', () => {
        const element = TestUtils.compileTemplate('<oui-checkbox></oui-checkbox>');

        const checkboxElement = getCheckboxInputElement(element);
        expect(angular.element(checkboxElement).prop('id')).toMatch(/^ouiCheckbox\d+$/);

        const checkboxLabelElement = getCheckboxLabelElement(element);
        expect(angular.element(checkboxLabelElement).attr('for')).toMatch(/^ouiCheckbox\d+$/);
      });

      it('should set the id for the input and label when defined', () => {
        const element = TestUtils.compileTemplate('<oui-checkbox id="test"></oui-checkbox>');

        const checkboxElement = getCheckboxInputElement(element);
        expect(angular.element(checkboxElement).prop('id')).toBe('test');

        const checkboxLabelElement = getCheckboxLabelElement(element);
        expect(angular.element(checkboxLabelElement).attr('for')).toBe('test');
      });
    });

    describe('name attribute', () => {
      it('should set the name attribute on input when defined', () => {
        const element = TestUtils.compileTemplate('<oui-checkbox name="test"></oui-checkbox>');

        const checkboxElement = getCheckboxInputElement(element);
        expect(angular.element(checkboxElement).prop('name')).toBe('test');
      });
    });

    describe('transclude value', () => {
      it("should display a text inside the checkbox's text container", () => {
        const element = TestUtils.compileTemplate('<oui-checkbox>test</oui-checkbox>');

        const textContainerCheckboxElement = getCheckboxTextContainerElement(element);
        expect(angular.element(textContainerCheckboxElement).text().trim()).toBe('test');
      });
    });

    describe('description attribute', () => {
      it("should display the checkbox's description container when empty", () => {
        const element = TestUtils.compileTemplate('<oui-checkbox></oui-checkbox>');

        const descriptionCheckboxElement = getCheckboxDescriptionElement(element);
        expect(angular.element(descriptionCheckboxElement).length).toBe(0);
      });

      it("should display a text inside the checkbox's description container", () => {
        const element = TestUtils.compileTemplate('<oui-checkbox description="test"></oui-checkbox>');

        const descriptionCheckboxElement = getCheckboxDescriptionElement(element);
        expect(angular.element(descriptionCheckboxElement).text().trim()).toBe('test');
      });
    });

    describe('footer attribute', () => {
      it("should display the checkbox's footer container when empty", () => {
        const element = TestUtils.compileTemplate('<oui-checkbox></oui-checkbox>');

        const footerCheckboxElement = getCheckboxFooterElement(element);
        expect(angular.element(footerCheckboxElement).length).toBe(0);
      });

      it("should not display the checkbox's footer container when not empty and not in thumbnail mode", () => {
        const element = TestUtils.compileTemplate('<oui-checkbox footer="test"></oui-checkbox>');

        const footerCheckboxElement = getCheckboxFooterElement(element);
        expect(angular.element(footerCheckboxElement).length).toBe(0);
      });

      it("should display a text inside the checkbox's footer container", () => {
        const element = TestUtils.compileTemplate('<oui-checkbox footer="test" thumbnail="true"></oui-checkbox>');

        const footerCheckboxElement = getCheckboxFooterElement(element);
        expect(angular.element(footerCheckboxElement).text().trim()).toBe('test');
      });
    });

    describe('model attribute', () => {
      it('should display an unchecked checkbox when no model', () => {
        const element = TestUtils.compileTemplate('<oui-checkbox></oui-checkbox>');

        const checkboxElement = getCheckboxInputElement(element);
        const $checkboxElement = angular.element(checkboxElement);

        expect($checkboxElement.prop('checked')).toBe(false);
        expect($checkboxElement.prop('indeterminate')).toBe(false);
      });

      it('should display a checked checkbox when true', () => {
        const element = TestUtils.compileTemplate('<oui-checkbox model="$ctrl.checked"></oui-checkbox>', {
          checked: true,
        });

        const checkboxElement = getCheckboxInputElement(element);
        const $checkboxElement = angular.element(checkboxElement);

        expect($checkboxElement.prop('checked')).toBe(true);
        expect($checkboxElement.prop('indeterminate')).toBe(false);
      });

      it('should display a an unchecked checkbox when false', () => {
        const element = TestUtils.compileTemplate('<oui-checkbox model="$ctrl.checked"></oui-checkbox>', {
          checked: false,
        });

        const checkboxElement = getCheckboxInputElement(element);
        const $checkboxElement = angular.element(checkboxElement);

        expect($checkboxElement.prop('checked')).toBe(false);
        expect($checkboxElement.prop('indeterminate')).toBe(false);
      });

      it('should display a indeterminate checkbox when null', () => {
        const element = TestUtils.compileTemplate('<oui-checkbox model="$ctrl.indeterminate"></oui-checkbox>', {
          indeterminate: null,
        });

        const checkboxElement = getCheckboxInputElement(element);
        expect(angular.element(checkboxElement).prop('indeterminate')).toBe(true);
      });

      it('should be updated when clicked', () => {
        const context = {
          currentModel: false,
        };

        const element = TestUtils.compileTemplate('<oui-checkbox model="$ctrl.currentModel"></oui-checkbox>', context);
        const $ctrl = TestUtils.getElementController(element);

        const checkboxElement = getCheckboxInputElement(element);
        const $checkboxElement = angular.element(checkboxElement);

        $checkboxElement.prop('checked', true);
        $checkboxElement.triggerHandler('click'); // NG 1.6
        $checkboxElement.triggerHandler('change'); // NG 1.7

        expect($ctrl.currentModel).toBe(true);
      });
    });

    describe('disabled attribute', () => {
      it('should display an active checkbox when no attribute', () => {
        const element = TestUtils.compileTemplate('<oui-checkbox></oui-checkbox>');

        const checkboxElement = getCheckboxInputElement(element);
        expect(angular.element(checkboxElement).prop('disabled')).toBe(false);
      });

      it('should display a disabled checkbox when defined but no value', () => {
        const element = TestUtils.compileTemplate('<oui-checkbox disabled></oui-checkbox>');

        const checkboxElement = getCheckboxInputElement(element);
        expect(angular.element(checkboxElement).prop('disabled')).toBe(true);
      });

      it('should display a disabled checkbox when true', () => {
        const element = TestUtils.compileTemplate('<oui-checkbox disabled="$ctrl.disabled"></oui-checkbox>', {
          disabled: true,
        });

        const checkboxElement = getCheckboxInputElement(element);
        expect(angular.element(checkboxElement).prop('disabled')).toBe(true);
      });

      it('should display an active checkbox when false', () => {
        const element = TestUtils.compileTemplate('<oui-checkbox disabled="$ctrl.notDisabled"></oui-checkbox>', {
          notDisabled: false,
        });

        const checkboxElement = getCheckboxInputElement(element);
        expect(angular.element(checkboxElement).prop('disabled')).toBe(false);
      });
    });

    describe('thumbnail attribute', () => {
      it('should have an element with `oui-checkbox_thumbnail` classname', () => {
        const element = TestUtils.compileTemplate('<oui-checkbox thumbnail></oui-checkbox>');

        $timeout.flush();
        expect(element.hasClass('oui-checkbox_thumbnail')).toBe(true);
      });
    });

    describe('inline attribute', () => {
      it('should display an inline checkbox', () => {
        const element = TestUtils.compileTemplate('<oui-checkbox inline></oui-checkbox>');

        $timeout.flush();
        expect(element.hasClass('oui-checkbox_inline')).toBe(true);
      });
    });

    describe('on-change attribute', () => {
      it('should trigger callback when the checkbox is clicked', () => {
        const onChangeSpy = jasmine.createSpy('onChangeSpy');

        const element = TestUtils.compileTemplate('<oui-checkbox on-change="$ctrl.onChange(modelValue)"></oui-checkbox>', {
          onChange: onChangeSpy,
        });

        const checkboxElement = getCheckboxInputElement(element);
        const $checkboxElement = angular.element(checkboxElement);

        $checkboxElement.prop('checked', true);
        $checkboxElement.triggerHandler('click'); // NG 1.6
        $checkboxElement.triggerHandler('change'); // NG 1.7

        expect(onChangeSpy).toHaveBeenCalledWith(true);
      });
    });

    describe('Validation', () => {
      it('should apply a required validation with the required attribute without value', () => {
        const element = TestUtils.compileTemplate('<oui-checkbox required></oui-checkbox>');

        const checkboxElement = getCheckboxInputElement(element);
        expect(angular.element(checkboxElement).prop('required')).toBe(true);
      });

      it('should apply a required validation with the required attribute when true', () => {
        const element = TestUtils.compileTemplate(`
                        <oui-checkbox required="$ctrl.isRequired"></oui-checkbox>
                    `, {
          isRequired: true,
        });

        const checkboxElement = getCheckboxInputElement(element);
        expect(angular.element(checkboxElement).prop('required')).toBe(true);
      });

      it('should apply a required validation with the required attribute when true', () => {
        const element = TestUtils.compileTemplate(`
                        <oui-checkbox required="$ctrl.isRequired"></oui-checkbox>
                    `, {
          isRequired: false,
        });

        const checkboxElement = getCheckboxInputElement(element);
        expect(angular.element(checkboxElement).prop('required')).toBe(false);
      });

      it('should be done if required attribute is defined', () => {
        const element = TestUtils.compileTemplate(`<form name="form">
                        <oui-checkbox name="checkbox" required="$ctrl.isRequired"></oui-checkbox>
                    </form>
                    `, {
          isRequired: true,
        });

        const { form } = element.scope();
        const checkboxElement = getCheckboxInputElement(element);
        const $checkboxElement = angular.element(checkboxElement);

        expect(form.$valid).toBeFalsy();

        $checkboxElement.prop('checked', true);
        $checkboxElement.triggerHandler('click'); // NG 1.6
        $checkboxElement.triggerHandler('change'); // NG 1.7
        expect(form.$valid).toBeTruthy();
      });
    });
  });
});
