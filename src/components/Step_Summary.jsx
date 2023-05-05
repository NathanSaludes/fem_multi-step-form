import Heading from "./Heading";
import Text from "./Text";

import { For, Show, createEffect, createMemo } from "solid-js";
import { useFormStep } from '../utils/useFormStep';

import { add_ons, plan_tiers } from "../utils/form-schema.json";
import { useForm } from "../utils/useForm";

function SummaryStep() {

	const { formData, isPaidMonthly } = useForm();

	const { setCurrentStepIndex } = useFormStep();

	const getAddOnPrice = (item) => (
		isPaidMonthly()
			? add_ons[item].pricing.monthly.label
			: add_ons[item].pricing.annually.label
	)

	const planTier = createMemo(() => plan_tiers[formData().plan.tier].label);

	const planTierPrice = createMemo(() =>
		plan_tiers[formData().plan.tier].pricing[formData().plan.term_of_payment].label
	);

	const netPrice = createMemo(() => {
		const tier = formData().plan.tier;
		const term_of_payment = formData().plan.term_of_payment;
		const tier_price = plan_tiers[tier].pricing[term_of_payment].value;

		const total = formData().plan.add_ons.reduce((sum, add_on_item) => (
			sum + add_ons[add_on_item].pricing[term_of_payment].value
		), tier_price)

		return total;
	});

	return (
		<>
			<div class="space-y-2 sm:pt-6">
				<Heading>Finishing up</Heading>
				<Text>Double-check if everything looks OK before confirming.</Text>
			</div>
			<div class="bg-slate-100 p-4 rounded-md mt-6 divide-y divide-slate-200 space-y-4 font-medium">
				<div class="flex items-center justify-between">
					<div class="text-gray-400/80">
						<span class="font-bold text-blue-950">{planTier()} ({isPaidMonthly() ? "Monthly" : "Yearly"})</span> <br />
						<button class="underline" type="button" onclick={() => setCurrentStepIndex(1)}>Change</button>
					</div>
					<span class="font-bold text-blue-950">{planTierPrice()}</span>
				</div>
				<Show when={formData().plan.add_ons.length > 0}>
					<ul class="breakdown block pt-3 space-y-2 text-gray-400/80">
						<For each={formData().plan.add_ons}>
							{(item) => (
								<li class="flex justify-between">
									<p>{() => add_ons[item].label}</p>
									<span class="font-semibold text-blue-900">{() => getAddOnPrice(item)}</span>
								</li>
							)}
						</For>
					</ul>
				</Show>
			</div>
			<div class="mt-2 p-4 flex justify-between text-gray-400/80 font-medium">
				<p>Total (per {isPaidMonthly() ? "month" : "year"})</p>
				<span class="text-lg text-indigo-600 font-bold">+${netPrice()}/{isPaidMonthly() ? "mo" : "yr"}</span>
			</div>
		</>
	)
}

export default SummaryStep;