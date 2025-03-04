import filter from 'lodash/filter';

function getElementsByClassName(element, tag, className) {
  return filter(element.find(tag), (x) => angular.element(x).hasClass(className));
}

function getCloseButton(element) {
  return getElementsByClassName(element, 'button', 'oui-message__close-button')[0];
}

function getBody(element) {
  return angular.element(getElementsByClassName(element, 'div', 'oui-message__body')[0]).text();
}

function getIcons(element, className) {
  return getElementsByClassName(element, 'span', className);
}

function isMessageDisplayed(element) {
  return getElementsByClassName(element, 'div', 'oui-message').length > 0;
}

describe('ouiMessage', () => {
  let TestUtils;
  beforeEach(angular.mock.module('oui.message'));
  beforeEach(angular.mock.module('oui.test-utils'));

  beforeEach(inject((_TestUtils_) => {
    TestUtils = _TestUtils_;
  }));

  describe('Component', () => {
    it('should display text message from transclusion', () => {
      const message = 'My message';
      const element = TestUtils.compileTemplate(`<oui-message>${message}</oui-message>`);

      expect(getBody(element)).toBe(message);
    });

    describe('when info type', () => {
      it('should display info icon', () => {
        const element = TestUtils.compileTemplate('<oui-message type="info"></oui-message>');

        expect(getIcons(element, 'oui-icon-info-circle').length).toBe(1);
      });
    });

    describe('when success type', () => {
      it('should display success icon', () => {
        const element = TestUtils.compileTemplate('<oui-message type="success"></oui-message>');

        expect(getIcons(element, 'oui-icon-success-circle').length).toBe(1);
      });
    });

    describe('when error type', () => {
      it('should display error icon', () => {
        const element = TestUtils.compileTemplate('<oui-message type="error"></oui-message>');

        expect(getIcons(element, 'oui-icon-error-circle').length).toBe(1);
      });
    });

    describe('when warning type', () => {
      it('should display warning icon', () => {
        const element = TestUtils.compileTemplate('<oui-message type="warning"></oui-message>');

        expect(getIcons(element, 'oui-icon-warning-circle').length).toBe(1);
      });
    });

    describe('when dismissable property is defined', () => {
      it('should show the close button if no value', () => {
        const element = TestUtils.compileTemplate('<oui-message dismissable></oui-message>');
        expect(getCloseButton(element)).toBeDefined();
      });

      it('should show the close button if property is true', () => {
        const element = TestUtils.compileTemplate('<oui-message dismissable="true"></oui-message>');
        expect(getCloseButton(element)).toBeDefined();
      });

      it('should not show the close button if property is false', () => {
        const element = TestUtils.compileTemplate('<oui-message dismissable="false"></oui-message>');
        expect(getCloseButton(element)).not.toBeDefined();
      });

      it('should dismiss message when close button is clicked', () => {
        const element = TestUtils.compileTemplate('<oui-message dismissable></oui-message>');

        getCloseButton(element).click();

        expect(isMessageDisplayed(element)).toBe(false);
      });

      it('should assign binding value to aria-label attribute on close button', () => {
        const closeButtonLabel = 'My label';
        const element = TestUtils.compileTemplate(`<oui-message aria-close-button-label="${closeButtonLabel}" dismissable></oui-message>`);

        expect(angular.element(getCloseButton(element)).attr('aria-label')).toBe(closeButtonLabel);
      });

      it('should raise on-dismiss event after close button is clicked', () => {
        const onDismissSpy = jasmine.createSpy('onDismissSpy');
        const element = TestUtils.compileTemplate('<oui-message on-dismiss="$ctrl.onDismiss()" dismissable></oui-message>', {
          onDismiss: onDismissSpy,
        });

        getCloseButton(element).click();

        expect(onDismissSpy).toHaveBeenCalled();
      });
    });
  });
});
