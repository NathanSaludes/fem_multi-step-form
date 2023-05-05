import { Show } from 'solid-js';

function FormActions({ currentStep, stepHandler }) {

	return (
		<div class='
			[ fixed bottom-0 inset-x-0 p-4 bg-white flex justify-between ]
			[ sm:static sm:p-0 sm:flex-grow sm:flex sm:items-end sm:mb-4 sm:mt-16 ]
		'>
			<Show
				when={currentStep() !== "/step-1"}
				fallback={<div />}
			>
				<button type="button" onclick={() => stepHandler("back")} class="py-2.5 text-slate-400 font-semibold text-lg">Go Back</button>
			</Show>
			<Show
				when={currentStep() !== "/summary"}
				fallback={
					<button class="py-2.5 px-5 bg-indigo-600 text-blue-100 font-semibold text-lg rounded-md" type="submit">
						Confirm
					</button>
				}
			>
				<button type="button" onclick={() => stepHandler("next")} class="py-2.5 px-5 bg-blue-950 text-blue-100 font-semibold text-lg rounded-md">
					Next Step
				</button>
			</Show>
		</div>
	)
}

export default FormActions;