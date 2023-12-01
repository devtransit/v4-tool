/**
 * [Coupon description]
 */


$(document).ready(function() {


	//円/率変更
	$("#coupon_kubun").bind("change", function() {
		if( $(this).val() == "0" ) {
			$("#coupon_num_unit").text("円");
		} else {
			$("#coupon_num_unit").text("%");
		}
	});


	var date  = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();

	console.log( day )

	var year_ary = [];
	for(var i=0; i<10; i++ ) {
		year_ary.push( '<option value="' + (Number(year)+i) + '">' + (Number(year)+i) + '</option>' );
	}
	$("#coupon_year").append( year_ary.join('') );
	
	var month_ary = [];
	for(var i=1; i<=12; i++ ) {
		var selected = ( month == (i-1) ) ? 'selected' : "";
		var num = (i<10) ? "0" + i : i;
		month_ary.push( '<option value="' + num + '" ' + selected + '>' + num + '</option>' );
	}
	$("#coupon_month").append( month_ary.join('') );


	var day_ary = [];
	for(var i=1; i<=31; i++ ) {
		var selected = ( day == i ) ? 'selected' : "";
		var num = (i<10) ? "0" + i : i;
		day_ary.push( '<option value="' + num + '" ' + selected + '>' + num + '</option>' );
	}
	$("#coupon_day").append( day_ary.join('') );


	//data生成
	$("#create_data").click(function() {

		$("#qrcode canvas").remove();

		var output = [];

		var coupon_id = $("#coupon_id").val();
		var coupon_kubun = $("#coupon_kubun").val();
		var coupon_num = $("#coupon_num").val();
		var coupon_year = $("#coupon_year").val();
		var coupon_month = $("#coupon_month").val();
		var coupon_day = $("#coupon_day").val();
		var coupon_code = $("#coupon_code").val();

		var date = coupon_year + coupon_month + coupon_day;

		var checkdegit = 7 - (Number(coupon_kubun) + Number(coupon_num) + Number(date)) % 7;

		output = [ "coupon", coupon_id, coupon_kubun, coupon_num, date, checkdegit, coupon_code ];

		$('#qrcode').qrcode({ width: 300, height: 300, text: output.join(",") });
		$("#output_text").val( output.join(",") );



		//ダウンロードデータ生成
		var type = 'image/jpeg';
		// canvas から DataURL で画像を出力
		var dataurl = $('#qrcode canvas').get(0).toDataURL(type);
		// DataURL のデータ部分を抜き出し、Base64からバイナリに変換
		var bin = atob(dataurl.split(',')[1]);
		// 空の Uint8Array ビューを作る
		var buffer = new Uint8Array(bin.length);
		// Uint8Array ビューに 1 バイトずつ値を埋める
		for (var i = 0; i < bin.length; i++) {
		  buffer[i] = bin.charCodeAt(i);
		}
		// Uint8Array ビューのバッファーを抜き出し、それを元に Blob を作る
		var blob = new Blob([buffer.buffer], {type: type});


		var url = window.URL.createObjectURL(blob);
 
		//Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
		window.URL = window.URL || window.webkitURL;
		$("#download").attr("href", url );
		$("#download").attr("download", "qr.jpg").show();

	});

});
