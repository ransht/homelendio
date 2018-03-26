$(document).ready(function() {
	$('#contactForm').validate({
		rules: {
			name: {
				required: true,
			},
			phone: {
				required: true,
			},
			email: {
				required: true,
			},
		},
		errorPlacement: function(error,element) {
			return true;
		}
	});

	$('#contactForm').submit(function(e) {
		e.preventDefault();
		if ($(this).valid()) {
			$.ajax({
				type: 'POST',
				url: 'form/form.php',
				data: $(this).serialize(),
				success: function() {
					formSuccess();
				}
			})
			formSuccess();
		}
		else {
			formError();
		}
	});
});

function formError() {
	$("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		$(this).removeClass();
	});
}

function formSuccess() {
	$("#contactForm")[0].reset();
	setTimeout(function () {
		window.location = "thanks.html"
	}, 500);
};