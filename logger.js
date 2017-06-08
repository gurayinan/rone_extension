function log_data(){
	news_sites_array = ['onedio', 'bbc', 'cnn', 'hurriyet','sozcu', 'milliyet', 'amk', 'fanatik', 'sputnik', 'yeniakit'];
	current_url = window.location.href;
	referral_url = document.referrer;
	var arrayLength = news_sites_array.length;
	for (var i = 0; i < arrayLength; i++) {
	    if(current_url.indexOf(news_sites_array[i]) > -1) {
	    	chrome.storage.sync.get(function(chrome_data){
	    		if(chrome_data.result !== undefined){
	    			window.unique_id = chrome_data.result.uniqueId;
	    			var userData = {
		    			uniqueId: window.unique_id,
		    			url: window.location.href,
		    			browser: navigator.userAgent,
		    			resolution: window.screen.availWidth + "x" + window.screen.availHeight
	    			}
		    		$.ajax({
						type: "POST",
						url: "http://159.8.19.250:9090/hit",
						data: JSON.stringify(userData),
						dataType: "json",
						contentType: 'application/json',
						async: false
					}).done(function(data){
						console.warn("Rone User Data Collection ,Hit sent for user id : " + window.unique_id);
					});
	    		}
	    		else{
	    			console.warn("Rone user data not found.Please register / authenticate via extension menu.");
	    		}
	    	});
    	}
	}
}

function check_window(){
	chrome.storage.sync.get(function(chrome_data){
		if(chrome_data.result !== undefined){
			$('#rone_registered_user').css('display', 'block');
			$('#rone_register').css('display','none');
			$('#rone_authenticate').css('display','none');
			$('#rone_menu').css('display','none');
			$('#already_registered').text('Your browser is already registered to Rone.Your Rone ID is : ' + chrome_data.result.uniqueId);
		}
	})
}

$(document).ready(function(){
	log_data();
	$('#rone_register').css('display','none');
	$('#rone_registered_user').css('display', 'none');
	check_window();
	$('#register_menu').click(function(){
		$('#rone_register').css('display','block');
		$('#rone_menu').css('display','none');
		$('#rone_registered_user').css('display', 'none');
	});
	window.unique_id = 0;
    $("#save").click(function(){
        var age = $("#age option:selected").text()
        var gender = $("#gender option:selected").text();
        var education = $("#education option:selected").text();
        var finance = $("#finance option:selected").text();
        var userData = {
            sex: gender,
            age: age,
            eduStatus: education,
            finStatus: finance
        };
        $.ajax({
            type: "POST",
            url: "http://159.8.19.250:9090/register",
            data: JSON.stringify(userData),
            dataType: "json",
            contentType: 'application/json',
            async: false
        }).done(function(data) {
        	chrome.storage.sync.set(data, function() {
          		// Notify that we saved.
        	});
  			$("#register-info").text("Register success. Your Rone ID is : " + data.result.uniqueId + 
  				" .You can identify yourself on another device with this id.");
  			setTimeout(function(){
  				check_window();
			}, 1000);
		});
    });
});