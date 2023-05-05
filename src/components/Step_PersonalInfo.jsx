import Heading from "./Heading";
import Text from "./Text";
import TextField from "./TextField";

import { name, email, phone } from '../utils/form-schema.json';

import { useForm } from '../utils/useForm';

function PersonalInfoStep() {

	const { formData, setFormData } = useForm();

	return (
		<>
			<div class="space-y-2 sm:pt-6">
				<Heading>Personal info</Heading>
				<Text>Please provide your name, email address, and phone number.</Text>
			</div>
			<div class='space-y-4 mt-6'>
				<TextField
					label={name.label}
					name={name.unique_value}
					type={name.type}
					placeolder={name.placeholder}
					value={() => formData().name}
					changeHandler={value => setFormData(prev => ({ ...prev, name: value }))}
				/>
				<TextField
					label={email.label}
					name={email.unique_value}
					type={email.type}
					placeolder={email.placeholder}
					value={() => formData().email}
					changeHandler={value => setFormData(prev => ({ ...prev, email: value }))}
				/>
				<TextField
					label={phone.label}
					name={phone.unique_value}
					type={phone.type}
					placeolder={phone.placeholder}
					value={() => formData().phone}
					changeHandler={value => setFormData(prev => ({ ...prev, phone: value }))}
				/>
			</div>
		</>
	)
}

export default PersonalInfoStep;