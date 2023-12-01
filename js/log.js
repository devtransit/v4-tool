/**
 * V4 Tool
 * 
 */
$(document).ready( function() {
	
	$controller.init();
});


/**
 * ログ整形
 */
var Log = function() {

	var self = this;

	this.log_data; //XMLデータ
	this.nid = 1; //新しいID
	this.step = 0; //ファイル選択フラグ
	this.output = [];

	this.init = function() {

		//$("#inputs").hide();
		
		$("#xml_local_file").change(function() {

			console.log( $("#xml_local_file").get(0).files )
			var input = $(this).get(0).files[0];

			var reader = new FileReader();
			// ファイルの読み込みに成功
			reader.addEventListener('load', function(e) {

				var data = reader.result;
				var ldata = data.split("\n");
				var leng = ldata.length;
				self.output = [];

				//ログの整形
				for( var i=0; i<leng; i++ ) {
					var row = ldata[i].split(',');
					if( row[5] == "チェックイン" ) {
						//
						//self.output.push( ldata[i] );
						var slip = row[4];
						// 
						for( var k=i; k<leng; k++ ) {
							var row2 = ldata[k].split(',');

							if( slip == row2[4] && row2[5] == "ORDER" ) {

								//delete millisec
								row[1] = row[1].split(".")[0];
								row2[1] = row2[1].split(".")[0];

								//
								start = row[0] + " " +  row[1];
								end = row2[0] + " " +  row2[1];
								var sd = new Date( start );
								var ed = new Date( end );
								
								var tmp = ( ed.getTime() - sd.getTime() ) / 1000;
								var sec = tmp % 60 ;
								var min = Math.floor(tmp / 60) % 60;
								//console.log( start, end, min,  min * 60 + sec )


								//7列目を変更
								row2[6] = min * 60 + sec;
								self.output.push( row2.join(",") );
								break;
							}
						}
					}
				}

				//console.log( output )
				
				self.setData();

			}, true);
			// ファイルの内容をテキストとして取得（3）
			reader.readAsText(input, 'Shift-JIS');
		});
	}

	
	/**
	 * [setData description]
	 */
	this.setData = function() {

		//$( "#XML_out" ).text( xml_str );
		var xml_str = self.output.join("\n");
		$( "#XML_out" ).text( xml_str );
		
		//ファイル保存
		var blob = new Blob([ xml_str ], { "type" : "application/x-msdownload" });
 
		//Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
		window.URL = window.URL || window.webkitURL;
		$("#xml_download").attr("href", window.URL.createObjectURL(blob));
		$("#xml_download").attr("download", "log.csv").show();

	}
}
