/* ---------------------------------------
Component Description:
This component is a wrapper for all the elements a field can have such as label, input field, error message, etc. 
--------------------------------------- */

function Field({ children }) {
	return (
		<fieldset class="field border-dashed">
			{children}
		</fieldset>
	)
}

export default Field;