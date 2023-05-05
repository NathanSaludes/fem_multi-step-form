import Heading from "./Heading";
import Text from "./Text";

function ThankYouMessage() {
	return (
		<div class="
			flex flex-col items-center space-y-3 text-center
			[ sm:max-w-lg ]
		">
			<img class="aspect-square h-16 mb-3" src="/images/icon-thank-you.svg" alt="thank you" />
			<Heading>Thank you!</Heading>
			<Text>
				Thanks for confirming your subscription! We hope you have fun using our platform.
				If you ever need support, please feel free to email us at support@loregaming.com.
			</Text>
		</div>
	)
}

export default ThankYouMessage;