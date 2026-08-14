const steps = ['Ticket details', 'Priority & status', 'Review'];

export default function TicketFormStepIndicator({ currentStep }) {
  return (
    <ol className="step-indicator" aria-label="Ticket form progress">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isComplete = currentStep > stepNumber;

        return (
          <li
            key={step}
            className={isActive ? 'active' : isComplete ? 'complete' : ''}
            aria-current={isActive ? 'step' : undefined}
          >
            <span>{stepNumber}</span>
            {step}
          </li>
        );
      })}
    </ol>
  );
}
