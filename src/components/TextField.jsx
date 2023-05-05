import { Show } from 'solid-js';
import FieldBlock from './FieldBlock';

function TextField({ name, type, label, placeholder, isDirty = false, isInvalid = false, value, changeHandler }) {

	return (
		<FieldBlock>
			<div class="flex flex-col gap-1">
				<label class="grid grid-cols-2" htmlFor={name}>
					<span class="font-medium text-blue-950">{label ?? ""}</span>
					<Show when={isDirty}>
						<span class="text-red-600 font-semibold ml-2 justify-self-end">This field is required</span>
					</Show>
				</label>
				<input
					class="px-4 py-3 border rounded-lg font-semibold text-lg text-blue-950 placeholder:text-slate-400/70"
					classList={{
						"border-red-600": isDirty || isInvalid,
						"border-slate-300": !isDirty && !isInvalid
					}}
					name={name}
					type={type}
					placeholder={placeholder}
					value={value()}
					onchange={(e) => changeHandler(e.target.value)}
				/>
				<Show when={isInvalid}>
					<p class="text-sm text-red-600 ">Lorem, ipsum dolor.</p>
				</Show>
			</div>
		</FieldBlock>
	)
}

export default TextField;