import Swal from "sweetalert2"
import CustomErrorHandler from "./ErrorHandler"

const Toast = Swal.mixin({
	toast: true,
	position: "top-end",
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: toast => {
		toast.addEventListener("mouseenter", Swal.stopTimer)
		toast.addEventListener("mouseleave", Swal.resumeTimer)
	},
})

export const showSuccess = (
	{ text, type } = { text: "Success!", type: "noti-box" }
) => {

	if (type === "noti-box") {
		Toast.fire({
			icon: "success",
			title: text,
		})
	} else {
		new Swal({
			title: "Success",
			text: text,
			icon: "success",
			confirmButtonText: "OK",
		})
	}
}

export const showError = ({ text, axiosResponse } = { text: "Failed to process!" }) => {
	let message = {
		title: `<div>${CustomErrorHandler.getStatusCode(axiosResponse)}</div><div>${CustomErrorHandler.getStatusText(axiosResponse)}</div>`,
		icon: "error",
		confirmButtonText: "OK",
	}
	
	if(text) {
		message.text = text
	}

	if(axiosResponse) {
		message.html = `<h5 style="font-weight: bold;font-size: 20px;margin-bottom: 6px;">${CustomErrorHandler.getErrorMessage(axiosResponse)}
		</h5>
		`
	}
	new Swal(message)
}
