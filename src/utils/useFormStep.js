import { createSignal } from "solid-js";

const [currentStepIndex, setCurrentStepIndex] = createSignal(0);

const handleStep = (choice) => {
	switch (choice) {
		case "next":
			setCurrentStepIndex((prev) => (prev < 3 ? prev + 1 : 3));
			break;
		case "back":
			setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : 0));
			break;
		default:
			break;
	}
}

export function useFormStep() {
	return {
		currentStepIndex,
		setCurrentStepIndex,
		handleStep
	}
}