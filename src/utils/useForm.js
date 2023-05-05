import { createMemo, createSignal } from "solid-js";

const [formData, setFormData] = createSignal({
	name: "",
	email: "",
	phone: "",
	plan: {
		tier: "arcade",
		term_of_payment: "monthly",
		add_ons: []
	}
});

const isPaidMonthly = createMemo(() => (
	formData().plan.term_of_payment === "monthly" ? true : false
));

export function useForm() {
	return {
		formData,
		setFormData,
		isPaidMonthly
	}
}