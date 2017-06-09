function log_data(){
	news_sites_array = ['www.sabah.com.tr',
'tr.sputniknews.com',
'www.bbc.com',
'onedio.com',
'www.ensonhaber.com',
'www.haber7.com',
'www.hurriyet.com.tr',
'www.milliyet.com.tr',
'www.yenisafak.com',
'www.sporx.com',
'www.yeniakit.com.tr',
'www.mynet.com',
'www.sozcu.com.tr',
'www.haberturk.com',
'www.haberler.com',
'www.star.com.tr',
'www.memurlar.net',
'aa.com.tr',
'www.fanatik.com.tr',
'www.cumhuriyet.com.tr',
'www.cnnturk.com',
'www.mackolik.com',
'www.gazetevatan.com',
'www.haber3.com',
'tr.beinsports.com',
'www.ahaber.com.tr',
'odatv.com',
'www.sondakika.com',
'www.egehaber.com',
'www.ntvspor.net',
't24.com.tr',
'www.dunyavegercekler.com',
'www.aksam.com.tr',
'www.fotomac.com.tr',
'www.f5haber.com',
'www.webaslan.com',
'www.iha.com.tr',
'haber.sol.org.tr',
'www.doviz.com',
'www.acunn.com',
'www.posta.com.tr',
'www.turkiyegazetesi.com.tr',
'www.takvim.com.tr',
'www.diken.com.tr',
'www.istiklal.com.tr',
'sacitaslan.com',
'www.bloomberght.com',
'dha.com.tr',
'www.medyafaresi.com',
'www.transfermarkt.com.tr',
'www.yenicaggazetesi.com.tr',
'www.ajansspor.com',
'www.fotospor.com',
'www.trtspor.com',
'www.gazeteoku.com',
'haber1903.com',
'www.gecce.com',
'www.timeturk.com',
'listelist.com',
'www.aydinlik.com.tr',
'www.haber10.com',
'www.ulusalkanal.com.tr',
'www.tgrthaber.com.tr',
'www.sanalbasin.com',
'www.gercekgundem.com',
'www.dunya.com',
'www.evrensel.net',
'beyazgazete.com',
'www.radikal.com.tr',
'www.haber365.com.tr',
'www.habervaktim.com',
'gsgazete.com',
'fenerbahce.org',
'www.yurtgazetesi.com.tr',
'bianet.org',
'www.haberzamani.com.tr',
'www.netgazete.com',
'www.yeniasir.com.tr',
'www.gunes.com',
'olay.com.tr',
'gazetesok.com',
'www.hurhaber.com',
'nediyor.com',
'www.stargundem.com.tr',
'www.ntv.com.tr'];
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