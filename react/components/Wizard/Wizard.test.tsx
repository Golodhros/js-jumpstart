import { type ReactNode, type FC } from 'react';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
  WizardProvider,
  WizardStepsContainer,
  WizardNavigation,
  WizardProviderProps,
  Step,
  getTitledTestIds,
  useWizard,
  type WizardStepProps,
} from './Wizard';

const steps: ReactNode[] = [
  <div key={1}>Step 1</div>,
  <div key={2}>Step 2</div>,
  <div key={3}>Step 3</div>,
];

const WIZARD_TITLE = 'test';
const TEST_IDS = getTitledTestIds(WIZARD_TITLE);

const setup = (
  overrideProviderProps: Partial<WizardProviderProps> = {},
  withNavigation: boolean = false,
) => {
  const user = userEvent.setup();
  const defaultProps: Partial<WizardProviderProps> = {
    title: WIZARD_TITLE,
  };
  const props = {
    ...defaultProps,
    ...overrideProviderProps,
  } as WizardProviderProps;

  render(
    <WizardProvider {...props}>
      <WizardStepsContainer>
        {steps.map((step, index) => (
          <Step key={index} animate>
            {step}
          </Step>
        ))}
      </WizardStepsContainer>
      {withNavigation && <WizardNavigation />}
    </WizardProvider>,
  );

  return { user };
};

const CustomStepWithGoToNavigationExample: FC<WizardStepProps> = ({
  children,
}) => {
  const { goToStep, currentStep } = useWizard();

  return (
    <Step animate={false}>
      <div className='p5'>
        {children}
        <div className='flex space-x-5'>
          <button onClick={() => goToStep(currentStep - 1)}>
            Go to Previous Step
          </button>
          <button onClick={() => goToStep(1)}>Go To Step 2</button>
          <button onClick={() => goToStep(currentStep + 1)}>
            Go to Next Step
          </button>
        </div>
      </div>
    </Step>
  );
};
const CustomStepWithNavigationExample: FC<WizardStepProps> = ({ children }) => {
  const { goToNextStep, goToPrevStep, testIds } = useWizard();

  return (
    <Step animate={false}>
      <div className='p-5'>
        <div className='p-3'>{children}</div>
        <div className='flex space-x-5'>
          <button
            onClick={goToPrevStep}
            data-testid={testIds.NAVIGATION_PREV_BUTTON}
          >
            Previous
          </button>
          <button
            onClick={goToNextStep}
            data-testid={testIds.NAVIGATION_NEXT_BUTTON}
          >
            Next
          </button>
        </div>
      </div>
    </Step>
  );
};

describe('Wizard', () => {
  console.error = jest.fn();
  describe('renders', () => {
    it('renders the initial step', () => {
      setup();

      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.queryByText('Step 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Step 3')).not.toBeInTheDocument();
    });

    describe('when adding navigation', () => {
      it('renders the navigation', async () => {
        setup({}, true);

        expect(screen.getByTestId(TEST_IDS.NAVIGATION)).toBeInTheDocument();
      });
    });

    describe('when passing a custom initial step', () => {
      it('renders the custom initial step', () => {
        setup({ initialStep: 1 });

        expect(screen.getByText('Step 2')).toBeInTheDocument();
      });
    });
  });

  describe('behavior', () => {
    describe('when the user clicks the "Next" button', () => {
      it('navigates to the next step', async () => {
        const { user } = setup({}, true);

        const nextButton = screen.getByTestId(TEST_IDS.NAVIGATION_NEXT_BUTTON);
        await user.click(nextButton);
        expect(screen.getByText('Step 2')).toBeInTheDocument();
      });

      it('calls the onStepChange callback', async () => {
        const onStepChange = jest.fn();
        const { user } = setup({ onStepChange }, true);

        const nextButton = screen.getByTestId(TEST_IDS.NAVIGATION_NEXT_BUTTON);
        await user.click(nextButton);

        expect(onStepChange).toHaveBeenCalled();
        expect(onStepChange).toHaveBeenCalledWith(0, 1);
      });

      describe('when the user is on the last step', () => {
        it('does not navigate to the next step', async () => {
          const { user } = setup({ initialStep: 2 }, true);

          const nextButton = screen.getByTestId(
            TEST_IDS.NAVIGATION_NEXT_BUTTON,
          );
          await user.click(nextButton);
          expect(screen.getByText('Step 3')).toBeInTheDocument();
        });

        it('does not call the onStepChange callback', async () => {
          const onStepChange = jest.fn();
          const { user } = setup({ onStepChange, initialStep: 2 }, true);

          const nextButton = screen.getByTestId(
            TEST_IDS.NAVIGATION_NEXT_BUTTON,
          );
          await user.click(nextButton);

          expect(onStepChange).not.toHaveBeenCalled();
        });

        describe('when the steps are custom', () => {
          it('does not navigate to the next step', async () => {
            const user = userEvent.setup();
            render(
              <WizardProvider title={WIZARD_TITLE}>
                <WizardStepsContainer>
                  <CustomStepWithNavigationExample>
                    Custom step 1
                  </CustomStepWithNavigationExample>
                  <CustomStepWithNavigationExample>
                    Custom step 2
                  </CustomStepWithNavigationExample>
                </WizardStepsContainer>
              </WizardProvider>,
            );

            const nextButton = screen.getByTestId(
              TEST_IDS.NAVIGATION_NEXT_BUTTON,
            );
            await user.click(nextButton);
            const nextButtonAgain = screen.getByTestId(
              TEST_IDS.NAVIGATION_NEXT_BUTTON,
            );
            await user.click(nextButtonAgain);
            expect(screen.getByText('Custom step 2')).toBeInTheDocument();
          });
        });
      });
    });

    describe('when the user clicks the "Next" button twice', () => {
      it('navigates two steps away', async () => {
        const { user } = setup({}, true);

        const nextButton = screen.getByTestId(TEST_IDS.NAVIGATION_NEXT_BUTTON);
        await user.click(nextButton);
        await user.click(nextButton);
        expect(screen.getByText('Step 3')).toBeInTheDocument();
      });

      it('calls the onStepChange callback twice', async () => {
        const onStepChange = jest.fn();
        const { user } = setup({ onStepChange }, true);

        const nextButton = screen.getByTestId(TEST_IDS.NAVIGATION_NEXT_BUTTON);
        await user.click(nextButton);
        await user.click(nextButton);

        expect(onStepChange).toHaveBeenCalled();
        expect(onStepChange).toHaveBeenCalledTimes(2);
        expect(onStepChange).toHaveBeenNthCalledWith(1, 0, 1);
        expect(onStepChange).toHaveBeenNthCalledWith(2, 1, 2);
      });
    });

    describe('when the user clicks the "Previous" button', () => {
      it('navigates to the previous step', async () => {
        const { user } = setup({ initialStep: 1 }, true);

        const prevButton = screen.getByTestId(TEST_IDS.NAVIGATION_PREV_BUTTON);
        await user.click(prevButton);
        expect(screen.getByText('Step 1')).toBeInTheDocument();
      });

      it('calls the onStepChange callback', async () => {
        const onStepChange = jest.fn();
        const { user } = setup({ onStepChange, initialStep: 1 }, true);

        const prevButton = screen.getByTestId(TEST_IDS.NAVIGATION_PREV_BUTTON);
        await user.click(prevButton);

        expect(onStepChange).toHaveBeenCalled();
        expect(onStepChange).toHaveBeenCalledWith(1, 0);
      });

      describe('when the user is on the first step', () => {
        it('does not navigate to the previous step', async () => {
          const { user } = setup({}, true);

          const prevButton = screen.getByTestId(
            TEST_IDS.NAVIGATION_PREV_BUTTON,
          );
          await user.click(prevButton);
          expect(screen.getByText('Step 1')).toBeInTheDocument();
        });

        it('does not call the onStepChange callback', async () => {
          const onStepChange = jest.fn();
          const { user } = setup({ onStepChange }, true);

          const prevButton = screen.getByTestId(
            TEST_IDS.NAVIGATION_PREV_BUTTON,
          );
          await user.click(prevButton);

          expect(onStepChange).not.toHaveBeenCalled();
        });

        describe('when the steps are custom', () => {
          it('does not navigate to the previous step', async () => {
            const user = userEvent.setup();
            render(
              <WizardProvider title={WIZARD_TITLE}>
                <WizardStepsContainer>
                  <CustomStepWithNavigationExample>
                    Custom step 1
                  </CustomStepWithNavigationExample>
                  <CustomStepWithNavigationExample>
                    Custom step 2
                  </CustomStepWithNavigationExample>
                </WizardStepsContainer>
              </WizardProvider>,
            );

            const prevButton = screen.getByTestId(
              TEST_IDS.NAVIGATION_PREV_BUTTON,
            );
            await user.click(prevButton);
            expect(screen.getByText('Custom step 1')).toBeInTheDocument();
          });
        });
      });
    });

    describe('when the user clicks the "Go to Next Step" button', () => {
      it('jumps to that specific step', async () => {
        const user = userEvent.setup();
        render(
          <WizardProvider title={WIZARD_TITLE}>
            <WizardStepsContainer>
              <CustomStepWithGoToNavigationExample>
                Custom step
              </CustomStepWithGoToNavigationExample>
              {steps.map((step, index) => (
                <Step key={index} animate>
                  {step}
                </Step>
              ))}
            </WizardStepsContainer>
            <WizardNavigation />
          </WizardProvider>,
        );

        const goToNextButton = screen.getByText('Go To Step 2');
        await user.click(goToNextButton);

        expect(screen.getByText('Step 1')).toBeInTheDocument();
      });

      it('calls the onStepChange callback', async () => {
        const onStepChange = jest.fn();
        const user = userEvent.setup();
        render(
          <WizardProvider title={WIZARD_TITLE} onStepChange={onStepChange}>
            <WizardStepsContainer>
              <CustomStepWithGoToNavigationExample>
                Custom step
              </CustomStepWithGoToNavigationExample>
              {steps.map((step, index) => (
                <Step key={index} animate>
                  {step}
                </Step>
              ))}
            </WizardStepsContainer>
            <WizardNavigation />
          </WizardProvider>,
        );

        const goToNextButton = screen.getByText('Go To Step 2');
        await user.click(goToNextButton);

        expect(onStepChange).toHaveBeenCalled();
        expect(onStepChange).toHaveBeenCalledWith(0, 1);
      });

      describe('when they navigate away and click again', () => {
        it('jumps to that specific step', async () => {
          const user = userEvent.setup();
          render(
            <WizardProvider title={WIZARD_TITLE}>
              <WizardStepsContainer>
                <CustomStepWithGoToNavigationExample>
                  Custom step 0
                </CustomStepWithGoToNavigationExample>
                <CustomStepWithGoToNavigationExample>
                  Custom step 1
                </CustomStepWithGoToNavigationExample>
                <CustomStepWithGoToNavigationExample>
                  Custom step 2
                </CustomStepWithGoToNavigationExample>
              </WizardStepsContainer>
              <WizardNavigation />
            </WizardProvider>,
          );

          const goToStep2Button = screen.getByText('Go To Step 2');
          await user.click(goToStep2Button);

          expect(screen.getByText('Custom step 1')).toBeInTheDocument();

          const nextButton = screen.getByTestId(
            TEST_IDS.NAVIGATION_NEXT_BUTTON,
          );
          await user.click(nextButton);
          expect(screen.getByText('Custom step 2')).toBeInTheDocument();

          const goToStep2ButtonAgain = screen.getByText('Go To Step 2');
          await user.click(goToStep2ButtonAgain);
          expect(screen.getByText('Custom step 1')).toBeInTheDocument();
        });

        it('calls the onStepChange callback', async () => {
          const onStepChange = jest.fn();
          const user = userEvent.setup();
          render(
            <WizardProvider title={WIZARD_TITLE} onStepChange={onStepChange}>
              <WizardStepsContainer>
                <CustomStepWithGoToNavigationExample>
                  Custom step 0
                </CustomStepWithGoToNavigationExample>
                <CustomStepWithGoToNavigationExample>
                  Custom step 1
                </CustomStepWithGoToNavigationExample>
                <CustomStepWithGoToNavigationExample>
                  Custom step 2
                </CustomStepWithGoToNavigationExample>
              </WizardStepsContainer>
              <WizardNavigation />
            </WizardProvider>,
          );

          const goToStep2Button = screen.getByText('Go To Step 2');
          await user.click(goToStep2Button);
          const nextButton = screen.getByTestId(
            TEST_IDS.NAVIGATION_NEXT_BUTTON,
          );
          await user.click(nextButton);
          const goToStep2ButtonAgain = screen.getByText('Go To Step 2');
          await user.click(goToStep2ButtonAgain);

          expect(onStepChange).toHaveBeenCalled();
          expect(onStepChange).toHaveBeenCalledTimes(3);
          expect(onStepChange).toHaveBeenNthCalledWith(1, 0, 1);
          expect(onStepChange).toHaveBeenNthCalledWith(2, 1, 2);
          expect(onStepChange).toHaveBeenNthCalledWith(3, 2, 1);
        });
      });
    });
  });
});
