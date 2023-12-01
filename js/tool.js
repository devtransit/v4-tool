/**
 * V4 Tool
 * 
 */
$(document).ready( function() {
	
	var page = [
		{ name:"人数チェック", html:"person.html" },
		{ name:"カテゴリー警告", html:"category.html" },
		{ name:"商品警告", html:"item.html" },
		{ name:"基本設定", html:"config.html" },
	];

	var leng = page.length;
	var html = "";
	for( var i=0; i<leng; i++ ) {
		var ha = String(location.href).split("/");
		var h = ha[ ha.length-1 ];
		var c= "";
		if( h == page[i].html ) c = "selected";
		html += '<li><a href="' + page[i].html + '" class="' + c + '">' + page[i].name + '</a></li>';
	}
	$("header ul").html( html );

	//controllerを実行
	if( $controller ) {
		$controller.init();
	}
});



/**
 * 言語ファイル
 * @type {[type]}
 */
var LangJson = function() {

	var self = this;

	this.json_jp; //日本語
	this.json_en; //英語
	this.json_ko; //韓国語
	this.json_ch; //简体字
	this.json_ch_tw; //繁體字

	/**
	 * JSONのパース
	 */
	this.parseJSON = function( data ) {
		
		data = $.parseJSON(data);
		switch( data.name ) {
			case "jp":
				self.json_jp = data;
				break;
			case "en":
				self.json_en = data;
				break;
			case "ko":
				self.json_ko = data;
				break;
			case "ch":
				self.json_ch = data;
				break;
			case "ch_tw":
				self.json_ch_tw = data;
				break;
			default: 
				alert("言語が特定できません。日本語に設定します。");
				data.name = "jp";
				self.json_jp = data;
				break;
		}
	}

	/**
	 * メッセージのセット
	 */
	this.setMessage = function( id, key, msg ) {
		if( self.json_jp && key == 'jp' ) {
			self.json_jp["messages"][id] = msg;

			var json_jp = JSON.stringify( self.json_jp, null, "	" );
			$( "#JSON_jp_out" ).text( json_jp );

			//ファイル保存
			var blob = new Blob([ json_jp ], { "type" : "application/x-msdownload" });
	 		//Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
			window.URL = window.URL || window.webkitURL;
			$("#json_jp_download").attr("href", window.URL.createObjectURL(blob));
			$("#json_jp_download").attr("download", "jp.json").show();
		}

		if( self.json_en && key == 'en' ) {
			self.json_en["messages"][id] = msg;

			var json_en = JSON.stringify( self.json_en, null, "	" );
			$( "#JSON_en_out" ).text( json_en );

			//ファイル保存
			var blob = new Blob([ json_en ], { "type" : "application/x-msdownload" });
	 		//Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
			window.URL = window.URL || window.webkitURL;
			$("#json_en_download").attr("href", window.URL.createObjectURL(blob));
			$("#json_en_download").attr("download", "en.json").show();
		}

		if( self.json_ko && key == 'ko' ) {
			self.json_ko["messages"][id] = msg;

			var json_ko = JSON.stringify( self.json_ko, null, "	" );
			$( "#JSON_ko_out" ).text( json_ko );

			//ファイル保存
			var blob = new Blob([ json_ko ], { "type" : "application/x-msdownload" });
	 		//Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
			window.URL = window.URL || window.webkitURL;
			$("#json_ko_download").attr("href", window.URL.createObjectURL(blob));
			$("#json_ko_download").attr("download", "ko.json").show();
		}

		if( self.json_ch && key == 'ch' ) {
			self.json_ch["messages"][id] = msg;

			var json_ch = JSON.stringify( self.json_ch, null, "	" );
			$( "#JSON_ch_out" ).text( json_ch );

			//ファイル保存
			var blob = new Blob([ json_ch ], { "type" : "application/x-msdownload" });
	 		//Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
			window.URL = window.URL || window.webkitURL;
			$("#json_ch_download").attr("href", window.URL.createObjectURL(blob));
			$("#json_ch_download").attr("download", "ch.json").show();

		}

		if( self.json_ch_tw && key == 'ch_tw' ) {
			self.json_ch_tw["messages"][id] = msg;

			var json_ch_tw = JSON.stringify( self.json_ch_tw, null, "	" );
			$( "#JSON_ch_tw_out" ).text( json_ch_tw );

			//ファイル保存
			var blob = new Blob([ json_ch_tw ], { "type" : "application/x-msdownload" });
	 		//Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
			window.URL = window.URL || window.webkitURL;
			$("#json_ch_tw_download").attr("href", window.URL.createObjectURL(blob));
			$("#json_ch_tw_download").attr("download", "ch_tw.json").show();
		}
	}


	/**
	 * メッセージの生成
	 */
	this.createMessage = function() {
		if( self.json_jp ) {
			var json_jp = JSON.stringify( self.json_jp, null, "	" );
			$( "#JSON_jp_out" ).text( json_jp );

			//ファイル保存
			var blob = new Blob([ json_jp ], { "type" : "application/x-msdownload" });
	 		//Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
			window.URL = window.URL || window.webkitURL;
			$("#json_jp_download").attr("href", window.URL.createObjectURL(blob));
			$("#json_jp_download").attr("download", "jp.json").show();
		}

		if( self.json_en ) {
			var json_en = JSON.stringify( self.json_en, null, "	" );
			$( "#JSON_en_out" ).text( json_en );

			//ファイル保存
			var blob = new Blob([ json_en ], { "type" : "application/x-msdownload" });
	 		//Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
			window.URL = window.URL || window.webkitURL;
			$("#json_en_download").attr("href", window.URL.createObjectURL(blob));
			$("#json_en_download").attr("download", "en.json").show();
		}

		if( self.json_ko ) {
			var json_ko = JSON.stringify( self.json_ko, null, "	" );
			$( "#JSON_ko_out" ).text( json_ko );

			//ファイル保存
			var blob = new Blob([ json_ko ], { "type" : "application/x-msdownload" });
	 		//Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
			window.URL = window.URL || window.webkitURL;
			$("#json_ko_download").attr("href", window.URL.createObjectURL(blob));
			$("#json_ko_download").attr("download", "ko.json").show();
		}

		if( self.json_ch ) {
			var json_ch = JSON.stringify( self.json_ch, null, "	" );
			$( "#JSON_ch_out" ).text( json_ch );

			//ファイル保存
			var blob = new Blob([ json_ch ], { "type" : "application/x-msdownload" });
	 		//Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
			window.URL = window.URL || window.webkitURL;
			$("#json_ch_download").attr("href", window.URL.createObjectURL(blob));
			$("#json_ch_download").attr("download", "ch.json").show();

		}

		if( self.json_ch_tw ) {
			var json_ch_tw = JSON.stringify( self.json_ch_tw, null, "	" );
			$( "#JSON_ch_tw_out" ).text( json_ch_tw );

			//ファイル保存
			var blob = new Blob([ json_ch_tw ], { "type" : "application/x-msdownload" });
	 		//Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
			window.URL = window.URL || window.webkitURL;
			$("#json_ch_tw_download").attr("href", window.URL.createObjectURL(blob));
			$("#json_ch_tw_download").attr("download", "ch_tw.json").show();
		}
	}


	/**
	 * deleteJSON
	 */
	this.deleteJSON = function( id ) {
		if( self.json_jp ) {
			var i=0;
			$.each( self.json_jp.messages, function( key, val ) {
				if( key == id ) {
					delete self.json_jp.messages[key];
					return false;
				}
				i++;
			});	
		}

		if( self.json_en ) {
			var i=0;
			$.each( self.json_en.messages, function( key, val ) {
				if( key == id ) {
					delete self.json_en.messages[key];
					return false;
				}
				i++;
			});	
		}

		if( self.json_ko ) {
			var i=0;
			$.each( self.json_ko.messages, function( key, val ) {

				if( key == id ) {
					delete self.json_ko.messages[key];
					return false;
				}
				i++;
			});	
		}

		if( self.json_ch ) {
			var i=0;
			$.each( self.json_ch.messages, function( key, val ) {
				if( key == id ) {
					delete self.json_ch.messages[key];
					return false;
				}
				i++;
			});	
		}

		if( self.json_ch_tw ) {
			var i=0;
			$.each( self.json_ch_tw.messages, function( key, val ) {
				if( key == id ) {
					delete self.json_ch_tw.messages[key];
					return false;
				}
				i++;
			});	
		}
	}
}


/**
 * 人数チェック
 */
var CheckPerson = function() {

	var self = this;

	this.xml_data; //XMLデータ
	this.nid = 1; //新しいID
	this.step = 0; //ファイル選択フラグ
	this.langJson = new LangJson();
	
	this.init = function() {

		$("#inputs").hide();
		
		$("#xml_local_file").change(function() {

			//console.log( $("#config_local_file").get(0).files )
			var input = $(this).get(0).files[0];

			var reader = new FileReader();
			// ファイルの読み込みに成功
			reader.addEventListener('load', function(e) {
				self.parseXML( reader.result );
				self.step++;
				if( self.step == 2 ) {
					$("#inputs").show();
				}
			}, true);
			// ファイルの内容をテキストとして取得（3）
			reader.readAsText(input, 'UTF-8');

		});

		$(".json_local_file").change(function() {
			var leng = $(this).get(0).files.length;
			for(var i=0; i <leng; i++){
				var input = $(this).get(0).files[i];
				var reader = new FileReader();
				// ファイルの読み込みに成功
				reader.addEventListener('load', function(e) {
					self.langJson.parseJSON( e.currentTarget.result );
					self.step++;
					if( self.step == 2 ) {
						$("#inputs").show();
					}
				}, true);
				// ファイルの内容をテキストとして取得（3）
				reader.readAsText(input, 'UTF-8');
			}
		});

		//追加のクリック
		$("#data_add").click(function() {
			self.addData();
		});

		//生成のクリック
		$("#create_data").click( function() {
			self.setData();
		});

		//チェック数量
		$("#check_person_value_person_name").hide();
		$("#check_person_type").change(function() {
			if( $(this).val() == "item" ) {
				$("#check_person_value_person_name").show();
			} else {
				$("#check_person_value_person_name").hide();
				$("#check_person_value_person" ).removeAttr("checked");
			}
		});

		//モードの追加
		$("#check_person_mode_add").click(function() {
			$("#check_person_mode_0").clone().insertBefore(this).attr("id","");
		});
		//モードの切り替え
		$("#check_person_modes").show();
		$("#check_person_mode_all").change(function() {
			if( $(this).is(":checked") ) {
				$("#check_person_modes").hide();
			} else {
				$("#check_person_modes").show();
			}
		});

	}

	/**
	 * XMLのパース
	 */
	this.parseXML = function( data ) {
		var nid = 1;
		var node = $(data).find("item");
		var xmldata = [];
		if( node.length ) {
			$.each( node, function( i, val ) {
				//無しは後で生成
				if( $(val).attr("id") == "000" ) return true;
				var obj = {
					id:$(val).attr("id"),
					name:$(val).attr("name"),
					type:$(val).attr("type") || "",
					value:$(val).attr("value") || "",
					mode:$(val).attr("mode") || "",
					order:$(val).attr("order") || "",
					fix:$(val).attr("fix") || "",
					msg:$(val).attr("msg") || "",
					cart:$(val).attr("cart") || ""
				};
				xmldata.push( obj );
				nid = Number( $(val).attr("id") ) + 1;
			});
		} else {
			//なしがない場合には入れる
			
		}
		self.xml_data = xmldata;
		self.nid = ( '00' + nid ).slice( -3 );

		self.createList();
	}


	/**
	 * リストの生成
	 */
	this.createList = function() {

		$("#xmllist").html( "" );

		//リストを生成
		if( self.xml_data.length ) {
			var html = "";
			$.each( self.xml_data, function(i,val) {
				html += '<tr>';
				html += '<td class="name">' + val.name + '</td>';
				html += '<td class="type">' + val.type + '</td>';
				html += '<td class="value">' + val.value + '</td>';
				html += '<td class="order">' + val.order + '</td>';
				html += '<td class="fix">' + val.fix + '</td>';
				html += '<td class="mode">' + val.mode + '</td>';
				html += '<td class="msg">' + val.msg + '</td>';
				html += '<td class="cart">' + val.cart + '</td>';
				html += '<td class="delete"><button data-id="' + val.id + '" class="list-delete">削除</button></td>';
				html += '</tr>';
			});
			$("#xmllist").html( html );

			//リストの削除ボタン
			$(".list-delete").click(function() {
				var id = $(this).data("id");
				var btn = $(this);
				$.each( self.xml_data, function( i, val ) {
					if( val.id == id ) {
						self.xml_data.splice(i,1);
						btn.parents("tr").remove();
						//メッセージの削除
						self.langJson.deleteJSON( "check_person_" + id );
						return false;
					}
				});
			});
		}
	}

	/**
	 * データの追加
	 * @type {[type]}
	 */
	this.addData = function() {

		var id = self.nid;
		var name = $("#check_person_name").val();
		var type = $("#check_person_type").val();

		var v = $("#check_person_value").val();
		if( $("#check_person_value_person:checked" ).val() ) v = "-" + v;
		var value = v;

		var order = $("#check_person_order").val();
		var fix = $("#check_person_fix").val();

		var mode = "";
		if( !$("#check_person_mode_all:checked" ).val() ) {
			var m = [];
			$(".check_person_mode").each( function() {
				if( $(this).val() == "" ) return true;
				m.push( $(this).val() );
			});
			mode = m.join();
		}

		var cart = $("#check_person_cart").val();

		//データ整形
		var item = {
			id:id,
			name:name,
			type:type,
			value:value,
			order:order,
			fix:fix,
			mode:mode,
			msg:"check_person_" + id,
			cart:cart
		}

		//重複する場合は入れ替え
		if( self.xml_data.length ) {
			$.each( self.xml_data, function( i, val ) {
				if( item.id == val.id ) {
					self.xml_data.splice( i, 1 );
					return false;
				}
			});
		}
		self.xml_data.push( item );


		//JSONのセット
		var message_jp = { msg:$("#msg_jp").val(), action:"1" };
		//英語
		var message_en = { msg:$("#msg_en").val(), action:"1" };
		//韓国語
		var message_ko = { msg:$("#msg_ko").val(), action:"1" };
		//简体字
		var message_ch = { msg:$("#msg_ch").val(), action:"1" };
		//繁體字
		var message_ch_tw = { msg:$("#msg_ch_tw").val(), action:"1" };

		//メッセージのセット
		var mid = "check_person_" + id;
		self.langJson.setMessage( mid, "jp", message_jp );
		self.langJson.setMessage( mid, "en", message_en );
		self.langJson.setMessage( mid, "ko", message_ko );
		self.langJson.setMessage( mid, "ch", message_ch );
		self.langJson.setMessage( mid, "ch_tw", message_ch_tw );

		//リストのセット
		self.createList();

		//IDをインクリメント
		var nid = Number( id ) + 1;
		self.nid = ( '00' + nid ).slice( -3 ); 
	}

	
	/**
	 * [setData description]
	 */
	this.setData = function() {

		//XMLの作成
		var xml_str = '<?xml version="1.0" encoding="UTF-8"?>' + "\n" + '<CheckPerson>' + "\n"; 
		xml_str += '<item id="000" name="なし"  />' + "\n"; 
		$.each(self.xml_data, function( i, value ) {
			var xml = ["<item"];
			$.each( value, function( key, val ) {
				xml.push( key + '="' + val + '"' );
			});
			xml.push("/>");
			xml_str += xml.join(" ");
			xml_str += "\n";
		});
		xml_str += '</CheckPerson>';
		$( "#XML_out" ).text( xml_str );

		//ファイル保存
		var blob = new Blob([ xml_str ], { "type" : "application/x-msdownload" });
 
		//Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
		window.URL = window.URL || window.webkitURL;
		$("#xml_download").attr("href", window.URL.createObjectURL(blob));
		$("#xml_download").attr("download", "CheckPerson.xml").show();

		
		//メッセージの生成
		self.langJson.createMessage();
	}
}


/**
 * カテゴリー警告
 */
var Category = function() {

	var self = this;

	this.xml_data; //XMLデータ
	this.nid = 1; //新しいID
	this.step = 0; //ファイル選択フラグ
	this.langJson = new LangJson();

	this.init = function() {

		$("#inputs").hide();
		
		$("#xml_local_file").change(function() {

			//console.log( $("#config_local_file").get(0).files )
			var input = $(this).get(0).files[0];

			var reader = new FileReader();
			// ファイルの読み込みに成功
			reader.addEventListener('load', function(e) {
				self.parseXML( reader.result );
				self.step++;
				if( self.step == 2 ) {
					$("#inputs").show();
				}
			}, true);
			// ファイルの内容をテキストとして取得（3）
			reader.readAsText(input, 'UTF-8');

		});

		$(".json_local_file").change(function() {
			var leng = $(this).get(0).files.length;
			for(var i=0; i <leng; i++){
				var input = $(this).get(0).files[i];
				var reader = new FileReader();
				// ファイルの読み込みに成功
				reader.addEventListener('load', function(e) {
					self.langJson.parseJSON( e.currentTarget.result );
					self.step++;
					if( self.step == 2 ) {
						$("#inputs").show();
					}
				}, true);
				// ファイルの内容をテキストとして取得（3）
				reader.readAsText(input, 'UTF-8');
			}
		});

		//追加のクリック
		$("#data_add").click(function() {
			self.addData();
		});

		//生成のクリック
		$("#create_data").click( function() {
			self.setData();
		});

		//モードの追加
		$("#category_warn_mode_add").click(function() {
			$("#category_warn_mode_0").clone().insertBefore(this).attr("id","");
		});
		//モードの切り替え
		$("#category_warn_modes").show();
		$("#category_warn_mode_all").change(function() {
			if( $(this).is(":checked") ) {
				$("#category_warn_modes").hide();
			} else {
				$("#category_warn_modes").show();
			}
		});
	}
	

	/**
	 * XMLのパース
	 */
	this.parseXML = function( data ) {
		var nid = 1;
		var node = $(data).find("item");
		var xmldata = [];
		if( node.length ) {
			$.each( node, function( i, val ) {
				//無しは後で生成
				if( $(val).attr("id") == "000" ) return true;
				var obj = {
					id:$(val).attr("id"),
					name:$(val).attr("name"),
					mode:$(val).attr("mode") || "",
					every:$(val).attr("every") || "",
					message:$(val).attr("message") || ""
				};
				xmldata.push( obj );
				nid = Number( $(val).attr("id") ) + 1;
			});
		} else {
			//なしがない場合には入れる
			
		}
		self.xml_data = xmldata;
		self.nid = ( '00' + nid ).slice( -3 );

		self.createList();
	}


	/**
	 * リストの生成
	 */
	this.createList = function() {

		$("#xmllist").html( "" );

		//リストを生成
		if( self.xml_data.length ) {
			var html = "";
			$.each( self.xml_data, function(i,val) {
				html += '<tr>';
				html += '<td class="name">' + val.name + '</td>';
				html += '<td class="every">' + val.every + '</td>';
				html += '<td class="mode">' + val.mode + '</td>';
				html += '<td class="message">' + val.message + '</td>';
				html += '<td class="delete"><button data-id="' + val.id + '" class="list-delete">削除</button></td>';
				html += '</tr>';
			});
			$("#xmllist").html( html );

			//リストの削除ボタン
			$(".list-delete").click(function() {
				var id = $(this).data("id");
				var btn = $(this);
				$.each( self.xml_data, function( i, val ) {
					if( val.id == id ) {
						self.xml_data.splice(i,1);
						btn.parents("tr").remove();
						//メッセージの削除
						self.langJson.deleteJSON( "category_alert_" + id );
						return false;
					}
				});
			});
		}
	}

	/**
	 * データの追加
	 * @type {[type]}
	 */
	this.addData = function() {

		var id = self.nid;
		var name = $("#category_warn_name").val();
		var every = $("#category_warn_every").val();

		var mode = "";
		if( !$("#category_warn_mode_all:checked" ).val() ) {
			var m = [];
			$(".category_warn_mode").each( function() {
				if( $(this).val() == "" ) return true;
				m.push( $(this).val() );
			});
			mode = m.join();
		}

		//データ整形
		var item = {
			id:id,
			name:name,
			every:every,
			mode:mode,
			message:"category_alert_" + id,
		}
		
		//重複する場合は入れ替え
		if( self.xml_data.length ) {
			$.each( self.xml_data, function( i, val ) {
				if( item.id == val.id ) {
					self.xml_data.splice( i, 1 );
					return false;
				}
			});
		}
		self.xml_data.push( item );


		//JSONのセット
		var message_jp = { msg:$("#msg_jp").val(), action:"1" };
		//英語
		var message_en = { msg:$("#msg_en").val(), action:"1" };
		//韓国語
		var message_ko = { msg:$("#msg_ko").val(), action:"1" };
		//简体字
		var message_ch = { msg:$("#msg_ch").val(), action:"1" };
		//繁體字
		var message_ch_tw = { msg:$("#msg_ch_tw").val(), action:"1" };

		//メッセージのセット
		var mid = "category_alert_" + id;
		self.langJson.setMessage( mid, "jp", message_jp );
		self.langJson.setMessage( mid, "en", message_en );
		self.langJson.setMessage( mid, "ko", message_ko );
		self.langJson.setMessage( mid, "ch", message_ch );
		self.langJson.setMessage( mid, "ch_tw", message_ch_tw );

		//リストのセット
		self.createList();

		//IDをインクリメント
		var nid = Number( id ) + 1;
		self.nid = ( '00' + nid ).slice( -3 ); 
	}

	/**
	 * [setData description]
	 */
	this.setData = function() {

		//<item id="001" name="001:A商品やB商品の合計が" type="person" value="0" order="order" fix="1" mode="" msg="check_person_001" cart="true" />
		//XMLの作成
		var xml_str = '<?xml version="1.0" encoding="UTF-8"?>' + "\n" + '<CategoryWarn>' + "\n"; 
		xml_str += '<item id="000" name="なし"  />' + "\n"; 
		$.each(self.xml_data, function( i, value ) {
			var xml = ["<item"];
			$.each( value, function( key, val ) {
				xml.push( key + '="' + val + '"' );
			});
			xml.push("/>");
			xml_str += xml.join(" ");
			xml_str += "\n";
		});
		xml_str += '</CategoryWarn>';
		$( "#XML_out" ).text( xml_str );

		//ファイル保存
		var blob = new Blob([ xml_str ], { "type" : "application/x-msdownload" });
 
		//Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
		window.URL = window.URL || window.webkitURL;
		$("#xml_download").attr("href", window.URL.createObjectURL(blob));
		$("#xml_download").attr("download", "CategoryWarn.xml").show();

		
		//メッセージの生成
		self.langJson.createMessage();
	}
}


/**
 * 商品警告
 */
var Item = function() {

	var self = this;

	this.xml_data; //XMLデータ
	this.nid = 1; //新しいID
	this.step = 0; //ファイル選択フラグ
	this.langJson = new LangJson();

	this.init = function() {

		$("#inputs").hide();
		
		$("#xml_local_file").change(function() {

			//console.log( $("#config_local_file").get(0).files )
			var input = $(this).get(0).files[0];

			var reader = new FileReader();
			// ファイルの読み込みに成功
			reader.addEventListener('load', function(e) {
				self.parseXML( reader.result );
				self.step++;
				if( self.step == 2 ) {
					$("#inputs").show();
				}
			}, true);
			// ファイルの内容をテキストとして取得（3）
			reader.readAsText(input, 'UTF-8');

		});

		$(".json_local_file").change(function() {
			var leng = $(this).get(0).files.length;
			for(var i=0; i <leng; i++){
				var input = $(this).get(0).files[i];
				var reader = new FileReader();
				// ファイルの読み込みに成功
				reader.addEventListener('load', function(e) {
					self.langJson.parseJSON( e.currentTarget.result );
					self.step++;
					if( self.step == 2 ) {
						$("#inputs").show();
					}
				}, true);
				// ファイルの内容をテキストとして取得（3）
				reader.readAsText(input, 'UTF-8');
			}
		});

		//追加のクリック
		$("#data_add").click(function() {
			self.addData();
		});

		//生成のクリック
		$("#create_data").click( function() {
			self.setData();
		});

		//モードの追加
		$("#item_warn_mode_add").click(function() {
			$("#item_warn_mode_0").clone().insertBefore(this).attr("id","");
		});
		//モードの切り替え
		$("#item_warn_modes").show();
		$("#item_warn_mode_all").change(function() {
			if( $(this).is(":checked") ) {
				$("#item_warn_modes").hide();
			} else {
				$("#item_warn_modes").show();
			}
		});
	}
	

	/**
	 * XMLのパース
	 */
	this.parseXML = function( data ) {
		var nid = 1;
		var node = $(data).find("item");
		var xmldata = [];
		if( node.length ) {
			$.each( node, function( i, val ) {
				//無しは後で生成
				if( $(val).attr("id") == "000" ) return true;
				var obj = {
					id:$(val).attr("id"),
					name:$(val).attr("name"),
					mode:$(val).attr("mode") || "",
					every:$(val).attr("every") || "",
					message:$(val).attr("message") || ""
				};
				xmldata.push( obj );
				nid = Number( $(val).attr("id") ) + 1;
			});
		} else {
			//なしがない場合には入れる
			
		}
		self.xml_data = xmldata;
		self.nid = ( '00' + nid ).slice( -3 );

		self.createList();
	}


	/**
	 * リストの生成
	 */
	this.createList = function() {

		$("#xmllist").html( "" );

		//リストを生成
		if( self.xml_data.length ) {
			var html = "";
			$.each( self.xml_data, function(i,val) {
				html += '<tr>';
				html += '<td class="name">' + val.name + '</td>';
				html += '<td class="every">' + val.every + '</td>';
				html += '<td class="mode">' + val.mode + '</td>';
				html += '<td class="message">' + val.message + '</td>';
				html += '<td class="delete"><button data-id="' + val.id + '" class="list-delete">削除</button></td>';
				html += '</tr>';
			});
			$("#xmllist").html( html );

			//リストの削除ボタン
			$(".list-delete").click(function() {
				var id = $(this).data("id");
				var btn = $(this);
				$.each( self.xml_data, function( i, val ) {
					if( val.id == id ) {
						self.xml_data.splice(i,1);
						btn.parents("tr").remove();
						//メッセージの削除
						self.langJson.deleteJSON( "item_alert_" + id );
						return false;
					}
				});
			});
		}
	}

	/**
	 * データの追加
	 * @type {[type]}
	 */
	this.addData = function() {

		var id = self.nid;
		var name = $("#item_warn_name").val();
		var every = $("#item_warn_every").val();

		var mode = "";
		if( !$("#item_warn_mode_all:checked" ).val() ) {
			var m = [];
			$(".item_warn_mode").each( function() {
				if( $(this).val() == "" ) return true;
				m.push( $(this).val() );
			});
			mode = m.join();
		}

		//データ整形
		var item = {
			id:id,
			name:name,
			every:every,
			mode:mode,
			message:"item_alert_" + id,
		}

		//重複する場合は入れ替え
		if( self.xml_data.length ) {
			$.each( self.xml_data, function( i, val ) {
				if( item.id == val.id ) {
					self.xml_data.splice( i, 1 );
					return false;
				}
			});
		}
		self.xml_data.push( item );


		//JSONのセット
		var message_jp = { msg:$("#msg_jp").val(), action:"1" };
		//英語
		var message_en = { msg:$("#msg_en").val(), action:"1" };
		//韓国語
		var message_ko = { msg:$("#msg_ko").val(), action:"1" };
		//简体字
		var message_ch = { msg:$("#msg_ch").val(), action:"1" };
		//繁體字
		var message_ch_tw = { msg:$("#msg_ch_tw").val(), action:"1" };

		//メッセージのセット
		var mid = "item_alert_" + id;
		self.langJson.setMessage( mid, "jp", message_jp );
		self.langJson.setMessage( mid, "en", message_en );
		self.langJson.setMessage( mid, "ko", message_ko );
		self.langJson.setMessage( mid, "ch", message_ch );
		self.langJson.setMessage( mid, "ch_tw", message_ch_tw );

		//リストのセット
		self.createList();

		//IDをインクリメント
		var nid = Number( id ) + 1;
		self.nid = ( '00' + nid ).slice( -3 ); 
	}

	/**
	 * [setData description]
	 */
	this.setData = function() {

		//<item id="001" name="001:A商品やB商品の合計が" type="person" value="0" order="order" fix="1" mode="" msg="check_person_001" cart="true" />
		//XMLの作成
		var xml_str = '<?xml version="1.0" encoding="UTF-8"?>' + "\n" + '<ItemWarn>' + "\n"; 
		xml_str += '<item id="000" name="なし"  />' + "\n"; 
		$.each(self.xml_data, function( i, value ) {
			var xml = ["<item"];
			$.each( value, function( key, val ) {
				xml.push( key + '="' + val + '"' );
			});
			xml.push("/>");
			xml_str += xml.join(" ");
			xml_str += "\n";
		});
		xml_str += '</ItemWarn>';
		$( "#XML_out" ).text( xml_str );

		//ファイル保存
		var blob = new Blob([ xml_str ], { "type" : "application/x-msdownload" });
 
		//Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
		window.URL = window.URL || window.webkitURL;
		$("#xml_download").attr("href", window.URL.createObjectURL(blob));
		$("#xml_download").attr("download", "ItemWarn.xml").show();

		
		//メッセージの生成
		self.langJson.createMessage();
	}
}
