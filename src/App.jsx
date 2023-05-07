// SolidJS Imports
import { Navigate, Route, Routes, useNavigate } from '@solidjs/router';
import { For, Show, createEffect, createMemo, createSignal } from 'solid-js';

// Component Imports
import FormActions from './components/FormActions';
import MainLayout from './components/MainLayout';
import StepBlock from './components/StepBlock';
import AddOnStep from './components/Step_AddOns';
import PersonalInfoStep from './components/Step_PersonalInfo';
import SelectPlanStep from './components/Step_SelectPlan';
import SummaryStep from './components/Step_Summary';
import ThankYouMessage from './components/ThankYouMessage';

// Other Imports
import { useFormStep } from './utils/useFormStep';
import { useForm } from './utils/useForm';
import Steps from './utils/steps.json';

function App() {

  const { currentStepIndex, handleStep } = useFormStep();
  const { formData, setFormData, isPaidMonthly } = useForm();

  const [formIsSubmitted, setFormIsSubmitted] = createSignal(false);

  const currentStep = createMemo(() => (
    Steps[currentStepIndex()].path
  ));

  const navigate = useNavigate();
  createEffect(() => {
    navigate(currentStep(), { resolve: true });
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormIsSubmitted(true);
  }

  return (
    <MainLayout>
      <form class='
        container
        [ bg-white flex ]
        [ sm:bg-white sm:w-full sm:max-w-[1000px] sm:gap-4 sm:mx-4 sm:p-4 sm:rounded-2xl sm:shadow-xl sm:shadow-slate-300/40 ]'
        onsubmit={handleFormSubmit}
      >
        <div class='
          side-bar
          [ bg-[url("/images/bg-sidebar-mobile.svg")] sm:bg-[url("/images/bg-sidebar-desktop.svg")] bg-cover ]
          [ absolute top-0 inset-x-0 bg-blue-700 flex justify-center gap-4 text-white pt-9 min-h-[200px] ]
          [ sm:static sm:block sm:space-y-7 sm:rounded-lg sm:p-8 sm:pt-8 sm:pr-12 sm:bg-cover sm:min-w-[260px] ]'>
          <For each={Steps}>{
            (step, i) => <StepBlock stepIndex={i()} title={step.title} isActive={() => i() === currentStepIndex()} />
          }</For>
        </div>

        <div class='
          main-panel
          [ absolute inset-x-0 top-28 w-auto px-8 ]
          [ sm:w-full sm:min-h-[600px] sm:static sm:flex sm:flex-col sm:items-center sm:mx-auto sm:px-4 ]
        '>
          <div class='
            main-panel-content
            [ flex flex-col flex-grow justify-center p-8 rounded-xl bg-white w-full mx-auto shadow-lg shadow-slate-300/40 ]
            [ sm:shadow-none sm:p-0 sm:mx-4 sm:rounded-none sm:max-w-[465px] ]'
          >
            <Show
              when={formIsSubmitted() === true}
              fallback={(
                <>
                  <Routes>
                    <Route path="/step-1" element={<PersonalInfoStep />} />
                    <Route path="/step-2" element={<SelectPlanStep />} />
                    <Route path="/step-3" element={<AddOnStep />} />
                    <Route path="/summary" element={<SummaryStep />} />
                    <Route path="/" element={<Navigate href="/step-1" />} />
                  </Routes>

                  <FormActions
                    currentStep={currentStep}
                    stepHandler={handleStep}
                  />
                </>
              )}
            >
              <ThankYouMessage />
            </Show>
          </div>
        </div>

      </form>
    </MainLayout>
  )
}

export default App;