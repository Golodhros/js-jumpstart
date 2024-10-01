import React, {
  type FC,
  type ReactNode,
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import { motion } from 'framer-motion';

import { Button } from '@veedstudio/shared-ui';

import { StepperCounter } from '../StepperCounter/StepperCounter';

const ANIMATED_STEP_PARAMETERS = {
  INITIAL_STYLE: { opacity: 0 },
  ANIMATE_STYLE: { opacity: 1 },
  TRANSITION_CONFIG: { duration: 0.5 },
};

export const getTitledTestIds = (title: string) => {
  const rootId = `@${title}-wizard`;

  return {
    CONTAINER: `${rootId}/container`,
    STEPS_CONTAINER: `${rootId}/steps-container`,
    STEP: `${rootId}/step`,
    NAVIGATION: `${rootId}/navigation`,
    NAVIGATION_PREV_BUTTON: `${rootId}/navigation-prev-button`,
    NAVIGATION_NEXT_BUTTON: `${rootId}/navigation-next-button`,
    NAVIGATION_STEP_COUNTER: `${rootId}/navigation-step-counter`,
  };
};

// Improvements:
// - Give some basic styling
// - Move to UI package
// - Add translations once stable

// Maybe Needed:
// - Add prop for custom onWizardComplete callback
// - Add step validations

export type WizardContext = {
  /* Current step of the wizard, zero-indexed */
  currentStep: number;
  /* Function to trigger the advance to the next step */
  goToNextStep: () => void;
  /* Function to trigger going back to the previous step */
  goToPrevStep: () => void;
  /* Function to navigate to a specific step */
  goToStep: (newStep: number) => void;
  /* Array of steps to render */
  steps: ReactNode[] | null;
  /* Function to set the rendered steps (internal) */
  setSteps: (steps: ReactNode[]) => void;
  /* Test ids for the wizard (internal) */
  testIds: Record<string, string>;
};

export const WizardContext = createContext<WizardContext | null>(null);

export const useWizard = () => {
  const context = useContext(WizardContext);

  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }

  return context;
};

export type WizardProviderProps = {
  /* Children to render, usually the WizardStepsContainer and WizardNavigation */
  children: ReactNode;
  /* Title of the wizard, to differentiate it among other wizards. Example values: 'magic-cut', 'onboarding', 'l&d' */
  title: string;
  /* Initial step to start the wizard on */
  initialStep?: number;
  /* Callback to trigger when the step changes */
  onStepChange?: (previousStep: number, newStep: number) => void;
  /* Optional className to style the provider */
  className?: string;
};

export const WizardProvider: FC<WizardProviderProps> = ({
  title,
  children,
  initialStep = 0,
  onStepChange,
  className,
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [steps, setSteps] = useState<null | ReactNode[]>(null);
  const [testIds, setTestIds] = useState(getTitledTestIds(title));

  useEffect(() => {
    setTestIds(getTitledTestIds(title));
  }, [title]);

  const goToNextStep = useCallback(() => {
    setCurrentStep(currentIndex => {
      const nextStep = currentIndex + 1;
      const isLastStep = steps && nextStep === steps.length;

      if (!isLastStep) {
        onStepChange?.(currentIndex, nextStep);

        return nextStep;
      }
      console.error(
        `WizardProvider: Invalid step index: ${nextStep}. Must be smaller than ${steps.length}`,
      );

      return currentIndex;
    });
  }, [steps, onStepChange]);

  const goToPrevStep = useCallback(() => {
    setCurrentStep(currentIndex => {
      const prevStep = currentIndex - 1;
      const isFirstStep = prevStep < 0;

      if (!isFirstStep) {
        onStepChange?.(currentIndex, prevStep);

        return prevStep;
      }
      console.error(
        `WizardProvider: Invalid step index: ${prevStep}. Must be larger than 0`,
      );

      return currentIndex;
    });
  }, [onStepChange]);

  const goToStep = useCallback(
    (newStep: number) => {
      const isValidStep = newStep >= 0 && (!steps || newStep < steps.length);

      if (isValidStep) {
        setCurrentStep(newStep);
        onStepChange?.(currentStep, newStep);
      } else {
        console.error(
          `WizardProvider: Invalid step index: ${newStep}. Must be between 0 and ${
            steps ? steps.length - 1 : 0
          }`,
        );
      }
    },
    [steps, currentStep, onStepChange],
  );

  const contextValue = {
    currentStep,
    goToNextStep,
    goToPrevStep,
    goToStep,
    steps,
    setSteps,
    testIds,
  };

  return (
    <WizardContext.Provider value={contextValue}>
      <div data-testid={testIds.CONTAINER} className={className}>
        {children}
      </div>
    </WizardContext.Provider>
  );
};

export type WizardStepsContainerProps = {
  /* Array of steps to render */
  children: ReactNode[];
  /* Optional className to style the container */
  className?: string;
};

export const WizardStepsContainer = ({
  children,
  className,
}: WizardStepsContainerProps) => {
  const { currentStep, setSteps, testIds } = useWizard();
  const steps = React.Children.toArray(children);
  const stepCount = React.Children.count(children);

  useEffect(() => {
    setSteps(steps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepCount, setSteps]);

  const currentStepContent = steps[currentStep];

  return (
    <div data-testid={testIds.STEPS_CONTAINER} className={className}>
      {currentStepContent}
    </div>
  );
};

export type WizardStepProps = {
  children: ReactNode;
  className?: string;
  animate?: boolean;
};

export const Step: FC<WizardStepProps> = ({ children, className, animate }) => {
  const { testIds } = useWizard();

  return animate ? (
    <motion.div
      initial={ANIMATED_STEP_PARAMETERS.INITIAL_STYLE}
      animate={ANIMATED_STEP_PARAMETERS.ANIMATE_STYLE}
      transition={ANIMATED_STEP_PARAMETERS.TRANSITION_CONFIG}
      data-testid={testIds.STEP}
      className={className}
    >
      {children}
    </motion.div>
  ) : (
    <div data-testid={testIds.STEP} className={className}>
      {children}
    </div>
  );
};

export const WizardNavigationCounter: FC = () => {
  const { currentStep, steps, testIds } = useWizard();

  return (
    <div
      data-testid={testIds.NAVIGATION_STEP_COUNTER}
      className='flex justify-center p-2'
    >
      {steps && (
        <StepperCounter
          stepsLength={steps.length}
          currentStepIndex={currentStep}
        />
      )}
    </div>
  );
};

export const WizardNavigationNextButton: FC = () => {
  const { goToNextStep, testIds } = useWizard();

  const handleNextStep = () => {
    goToNextStep();
  };

  return (
    <Button
      onClick={handleNextStep}
      data-testid={testIds.NAVIGATION_NEXT_BUTTON}
    >
      Next
    </Button>
  );
};

export const WizardNavigationPrevButton: FC = () => {
  const { goToPrevStep, testIds } = useWizard();

  const handlePrevStep = () => {
    goToPrevStep();
  };

  return (
    <Button
      onClick={handlePrevStep}
      data-testid={testIds.NAVIGATION_PREV_BUTTON}
      variant='secondary'
    >
      Previous
    </Button>
  );
};

export const WizardNavigation: FC = () => {
  const { testIds } = useWizard();

  return (
    <div data-testid={testIds.NAVIGATION}>
      <div className='flex space-x-5'>
        <WizardNavigationPrevButton />
        <WizardNavigationNextButton />
      </div>
      <WizardNavigationCounter />
    </div>
  );
};
