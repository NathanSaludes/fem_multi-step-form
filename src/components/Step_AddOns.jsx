import { For, createMemo, createSignal } from "solid-js";
import Heading from "./Heading";
import Text from "./Text";

import { add_ons } from "../utils/form-schema.json";
import { useForm } from "../utils/useForm";

// main component
function AddOnStep() {

  const { formData, setFormData, isPaidMonthly } = useForm();

  const getPricing = (item) => (
    isPaidMonthly()
      ? add_ons[item].pricing.monthly.label
      : add_ons[item].pricing.annually.label
  )

  const updateAddOns = (item) => {
    if (item.checked) {
      setFormData(prev => ({
        ...prev,
        plan: {
          ...prev.plan,
          add_ons: [
            ...prev.plan.add_ons,
            item.value
          ]
        }
      }));
    }
    else {
      const filtered = formData().plan.add_ons.filter((value) => value !== item.value);
      setFormData(prev => ({
        ...prev,
        plan: {
          ...prev.plan,
          add_ons: filtered
        }
      }));
    }
  }

  return (
    <>
      <div class="space-y-2 sm:pt-6">
        <Heading>Pick add-ons</Heading>
        <Text>Add-ons help enhance your gaming experience.</Text>
      </div>
      <fieldset class="space-y-4 mt-6">
        <For each={Object.keys(add_ons)}>
          {(item) => (
            <AddOnOption
              name={add_ons[item].unique_value}
              label={add_ons[item].label}
              description={add_ons[item].description}
              price={() => getPricing(item)}
              value={add_ons[item].unique_value}
              onChangeHandler={updateAddOns}
            />
          )}
        </For>
      </fieldset>
    </>
  )
}

// child/sub component
function AddOnOption({ name, label, description, value, price, onChangeHandler }) {

  return (
    <div class="relative flex items-center group">
      <input
        class="
          [ absolute peer rounded p-2.5 ml-6 border-slate-300 ]
          [ checked:text-indigo-600 focus:ring-0 focus:outline-2 focus:outline-indigo-400 ]
        "
        type="checkbox"
        name={name}
        id={name}
        value={value}
        onchange={(e) => onChangeHandler(e.target)}
      />
      <label
        htmlFor={name}
        class="
          [ flex items-center w-full gap-4 px-4 py-2.5 rounded-lg border cursor-pointer select-none ]
          [ peer-checked:border-2 peer-checked:border-indigo-700/90 peer-checked:bg-slate-100 ]
        "
      >
        <div class="ml-14">
          <p class="font-semibold text-blue-950 text-lg">{label}</p>
          <span class="text-gray-500">{description}</span>
        </div>
        <span class="font-semibold flex-grow flex justify-end text-indigo-700 text-sm">{price}</span>
      </label>
    </div>
  )
}

export default AddOnStep;