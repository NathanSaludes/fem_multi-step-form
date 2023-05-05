import { For, createEffect, createMemo, createSignal } from "solid-js";
import Heading from "./Heading";
import Text from "./Text";

import { plan_tiers, billing_terms } from '../utils/form-schema.json';

import { useForm } from "../utils/useForm";

const { formData, setFormData, isPaidMonthly } = useForm();

// main component
function SelectPlanStep() {

	const getSupplementaryText = (type) => (
		isPaidMonthly()
			? plan_tiers[type].pricing.monthly.supplementary_text
			: plan_tiers[type].pricing.annually.supplementary_text
	);

	const getPricing = (type) => (
		isPaidMonthly()
			? plan_tiers[type].pricing.monthly.label
			: plan_tiers[type].pricing.annually.label
	)

	return (
		<>
			<div class="space-y-2 sm:pt-6">
				<Heading>Select your plan</Heading>
				<Text>You have the option of monthly or yearly billing</Text>
			</div>
			<fieldset class='
				[ mt-6 flex flex-col gap-4 ]
				[ md:flex-row md:items-center sm:justify-center sm:gap-5 sm:flex-wrap ]
			'>
				<For each={Object.keys(plan_tiers)}>
					{(type) => {
						return (
							<PlanOption
								image={plan_tiers[type].icon}
								label={plan_tiers[type].label}
								text1={() => getPricing(type)}
								text2={() => getSupplementaryText(type)}
								value={plan_tiers[type].unique_value}
							/>
						)
					}}
				</For>
			</fieldset>
			<fieldset>
				<div class='bg-slate-100 w-full p-4 rounded-lg mt-8'>
					<label
						class="flex cursor-pointer gap-4 mx-auto max-w-max justify-center items-center"
						htmlFor="billing_type"
					>
						<input
							type="checkbox"
							name="billing_type"
							id="billing_type"
							class="sr-only peer"
							checked={!isPaidMonthly()}
							onchange={() => {
								setFormData(prev => ({
									...prev,
									plan: {
										...prev.plan,
										term_of_payment: isPaidMonthly() ? billing_terms[1] : billing_terms[0]
									}
								}))
							}}
						/>
						<span class="font-bold select-none peer-checked:text-blue-950/30 text-blue-950">Monthly</span>
						<div class='
							flex relative px-5 py-3 items-center bg-blue-950 rounded-full
							[ peer-focus:outline-none peer-focus:ring-4 peer-checked:after:translate-x-full ]
							[ after:content-[""] after:absolute after:bg-white after:rounded-full after:h-4 after:left-0 after:mx-1 after:aspect-square after:transition-all ]
						'/>
						<span class="font-bold select-none peer-checked:text-blue-950 text-blue-950/30">
							Yearly
						</span>
					</label>
				</div>
			</fieldset>
		</>
	)
}

// sub-component
function PlanOption({ label, value, image, text1, text2 }) {
	return (
		<div class="min-w-full lg:min-w-[140px]">
			<input
				class='hidden peer'
				type='radio'
				name='plan'
				id={value}
				value={value}
				checked={formData().plan.tier === value}
				onchange={(e) => setFormData(prev => ({
					...prev,
					plan: {
						...prev.plan,
						tier: e.target.value
					}
				}))}
			/>
			<label
				htmlFor={value}
				class='
					[ flex items-start gap-4 cursor-pointer p-4 rounded-lg outline outline-1 outline-slate-300 hover:bg-slate-100/60 ]
					[ lg:flex-col ]
					[ peer-checked:bg-slate-200/70 peer-checked:outline peer-checked:outline-2 peer-checked:outline-indigo-700 ]
				'
			>
				<img class="aspect-square h-11 rounded-full object-cover object-center" src={`/images/${image}`} alt={label} />
				<div class='space-y-1 lg:mt-5'>
					<p class='text-lg text-blue-950 font-semibold'>{label}</p>
					<span class='block text-gray-400/70 font-medium'>{text1}</span>
					<span class='block text-blue-900 text-sm font-medium'>{text2}</span>
				</div>
			</label>
		</div>
	)
}

export default SelectPlanStep;