import { type ReactNode, type FC } from 'react';

import { Button } from '@veedstudio/shared-ui';

import {
  withCenteredWrapper,
  withBorderWrapper,
} from '#/utils/storybook/decorators';

import {
  WizardProvider,
  WizardStepsContainer,
  Step,
  WizardNavigation,
  useWizard,
  type WizardStepProps,
} from './Wizard';

const WIZARD_TITLE = 'story';

export default {
  title: 'SharedUI Candidates/Widgets/Wizard',
  component: WizardStepsContainer,
  decorators: [withBorderWrapper, withCenteredWrapper],
  tags: ['tailwind'],
};

const steps: ReactNode[] = [
  <div className='p-3' key={1}>
    Step 1
  </div>,
  <div className='p-3' key={2}>
    Step 2
  </div>,
  <div className='p-3' key={3}>
    Step 3
  </div>,
];

const CustomStepWithNavigationExample: FC<WizardStepProps> = ({
  children,
  animate,
}) => {
  const { goToNextStep, goToPrevStep } = useWizard();

  return (
    <Step animate={animate}>
      <div className='p-5'>
        <div className='p-3'>{children}</div>
        <div className='flex space-x-5'>
          <Button onClick={goToPrevStep} variant='secondary'>
            Previous
          </Button>
          <Button onClick={goToNextStep}>Next</Button>
        </div>
      </div>
    </Step>
  );
};
const CustomStepWithGoToNavigationExample: FC<WizardStepProps> = ({
  children,
}) => {
  const { goToStep, currentStep } = useWizard();

  return (
    <Step animate={false}>
      <div className='p-5'>
        <div className='p-3'>{children}</div>
        <div className='flex space-x-5'>
          <Button onClick={() => goToStep(currentStep - 1)} variant='secondary'>
            Go to Previous Step
          </Button>
          <Button onClick={() => goToStep(1)} variant='outline'>
            Go Step 2
          </Button>
          <Button onClick={() => goToStep(currentStep + 1)}>
            Go to Next Step
          </Button>
        </div>
      </div>
    </Step>
  );
};

export const BasicWithNavigation = () => (
  <WizardProvider title={WIZARD_TITLE}>
    <WizardStepsContainer>
      {steps.map((step, index) => (
        <Step key={index}>{step}</Step>
      ))}
    </WizardStepsContainer>
    <WizardNavigation />
  </WizardProvider>
);

export const Animated = () => (
  <WizardProvider title={WIZARD_TITLE}>
    <WizardStepsContainer>
      {steps.map((step, index) => (
        <Step key={index} animate>
          {step}
        </Step>
      ))}
    </WizardStepsContainer>
    <WizardNavigation />
  </WizardProvider>
);

export const WithCustomSteps = () => (
  <WizardProvider title={WIZARD_TITLE}>
    <WizardStepsContainer>
      <CustomStepWithNavigationExample key={0} animate>
        Custom Step!
      </CustomStepWithNavigationExample>
      <CustomStepWithNavigationExample key={1} animate>
        Custom Step the second!
      </CustomStepWithNavigationExample>
      <CustomStepWithNavigationExample key={2} animate>
        Custom Step the third!
      </CustomStepWithNavigationExample>
    </WizardStepsContainer>
  </WizardProvider>
);

export const WithCustomGoToSteps = () => (
  <WizardProvider title={WIZARD_TITLE}>
    <WizardStepsContainer>
      <CustomStepWithGoToNavigationExample key={0} animate>
        Custom Step!
      </CustomStepWithGoToNavigationExample>
      <CustomStepWithGoToNavigationExample key={1} animate>
        Custom Step the second!
      </CustomStepWithGoToNavigationExample>
      <CustomStepWithGoToNavigationExample key={2} animate>
        Custom Step the third!
      </CustomStepWithGoToNavigationExample>
    </WizardStepsContainer>
  </WizardProvider>
);

export const WithDifferentInitialStep = () => (
  <WizardProvider title={WIZARD_TITLE} initialStep={2}>
    <WizardStepsContainer>
      <CustomStepWithNavigationExample key={0} animate>
        Custom Step!
      </CustomStepWithNavigationExample>
      <CustomStepWithNavigationExample key={1} animate>
        Custom Step the second!
      </CustomStepWithNavigationExample>
      <CustomStepWithNavigationExample key={2} animate>
        Custom Step the third!
      </CustomStepWithNavigationExample>
    </WizardStepsContainer>
  </WizardProvider>
);

export const WithOnStepChangeCallback = () => (
  <WizardProvider
    title={WIZARD_TITLE}
    onStepChange={(prevStep: number, nextStep: number) =>
      console.log(`Step changed from ${prevStep} to ${nextStep}`)
    }
  >
    <WizardStepsContainer>
      <CustomStepWithNavigationExample key={0} animate>
        Custom Step!
      </CustomStepWithNavigationExample>
      <CustomStepWithNavigationExample key={1} animate>
        Custom Step the second!
      </CustomStepWithNavigationExample>
      <CustomStepWithNavigationExample key={2} animate>
        Custom Step the third!
      </CustomStepWithNavigationExample>
    </WizardStepsContainer>
  </WizardProvider>
);
