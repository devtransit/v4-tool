;
/**
 * [ConfigLocal description]
 */

var ConfigLocal = function() {

	var self =this;

	this.local_data;

	/**
	 * [init description]
	 * @return {[type]} [description]
	 */
	this.init = function() {

		$("#inputs").hide();

		//config_localのロード
		$("#config_local_file").change(function() {

			//console.log( $("#config_local_file").get(0).files )
			var input = $("#config_local_file").get(0).files[0];

			var reader = new FileReader();
			// ファイルの読み込みに成功したら、その内容を<div id="result">に反映（2）
			reader.addEventListener('load', function(e) {
				//console.log( reader.result.replace(/var config_local = /g,'').replace(/\n/g,'').replace(/　　　　/g,'').replace(/　　　　/g,'') );
				self.local_data = JSON.parse( reader.result.replace(/var config_local = /g,'').replace(/\n/g,'').replace(/　　　　/g,'') );
				self.loadedConfig();
				$("#inputs").show();
			}, true);
			// ファイルの内容をテキストとして取得（3）
			reader.readAsText(input, 'UTF-8');

		});

		//生成のクリック
		$("#create_data").click( function() {
			self.setData();
		});

		//画像選択の場合は追加をセット
		$(".billboard_banner_type").change(function() {
			if( $( this ).val() == "image" ) {
				$(this).parents(".billboard_banner").find(".billboard_banner_value_add").show();
			} else {
				$(this).parents(".billboard_banner").find(".billboard_banner_value_add").hide();
				$(this).parents(".billboard_banner").find(".billboard_banner_value:not(:eq(0))").remove();
			}
		});

		//billboardの画像追加
		$(".billboard_banner_value_add").click(function() {
			$(this).prevAll(".billboard_banner_value_0").clone().insertBefore(this).removeClass("billboard_banner_value_0");
		});
		//billboardのモード追加
		$(".billboard_banner_mode_add").click(function() {
			$(this).prevAll(".billboard_banner_mode_0").clone().insertBefore(this).removeClass("billboard_banner_mode_0");
		});
		//billboardの削除
		$(".billboard_banner_delete").click(function() {
			$(this).parents(".billboard_banner").remove();
		});
		//billboardの追加
		$("#billboard_banner_add").click(function(){
			var i = $(".billboard_banner").length;
			$("#billboard_banner_0").clone(true).insertBefore(this).attr("id","").addClass("billboard_banner").removeClass("hide").find("h5").text("バナー"+(i+1));
			$(".billboard_banner").last().find(".billboard_banner_id").val(i);
		});

		//多言語初期言語
		$("#language_default").change(function(){
			var def = $(this).val();
			$("#languages").find( "." + def ).find(".enable").prop("checked", true);
		});

		//インクルードセレクト
		$("#include_select_add").click(function() {
			$(".include_select_0").clone().insertBefore("#include_select_add").addClass("include_select").removeClass("include_select_0 hide");
		});

		//トップ画面
		//おすすめ
		$("#fcate_reco_item_add").click(function() {
			$(".fcate_reco_item_0").clone().insertBefore("#fcate_reco_item_add").addClass("fcate_reco_item").removeClass("fcate_reco_item_0 hide");
		});
		
		//促しモード別の追加
		$("#firstcategory_add").click(function(){
			var i = $(".firstcategory_mode").length;
			$("#firstcategory_mode_0").clone(true).insertBefore(this).attr("id","").addClass("firstcategory_mode").removeClass("hide");
		});
		//促しモード別の削除
		$(".firstcategory_delete").click(function() {
			$(this).parents(".firstcategory_mode").remove();
		});

		//ダウンロード
		$("#download").hide();
		$("#download").click(function() {
			$(this).hide();
			$("#JSON_out").text("");
		});

	}

	/**
	 * [loadedConfig description]
	 * config_loadを読み込み完了
	 * @return {[type]} [description]
	 */
	this.loadedConfig = function() {
		
		var c = self.local_data;

		//カラー
		if( !c.shop ) {
			c.shop = { color:"saffron" }
		} 
		$("#shop_color").val(c.shop.color);

		//フリック
		if( !c.flick ) {
			c.flick = { enable:"false" }
		} 
		$("#flick_enable").val(c.flick.enable);

		//ビルボードをセット
		$("#billboard_enable").val( String(c.billboard.enable) );
		$(".billboard_banner").remove();
		if( c.billboard.banners.length ) {
			$.each( c.billboard.banners, function( i, val ) {
				//if( i != 0 ) {
					var abtn = $("#billboard_banner_add");
					$("#billboard_banner_0").clone(true).insertBefore(abtn).attr("id","").addClass("billboard_banner").removeClass("hide").find("h5").text("バナー"+(i+1));
				//}

				var parent = $(".billboard_banner").eq(i);
				parent.find(".billboard_banner_id").val( val.id );
				parent.find(".billboard_banner_banner").val( val.banner );
				parent.find(".billboard_banner_type").val( val.type );

				var value = val.value;
				if( Array.isArray( val.value ) && val.value.length ) {
					$.each( value, function( k, m ) {
						if( k != 0 ) {
							var mabtn = parent.find(".billboard_banner_value_add");
							parent.find(".billboard_banner_value_0").clone().insertBefore(mabtn).removeClass("billboard_banner_value_0");
						}
						parent.find(".billboard_banner_value").eq(k).val( m );
					});
				} else {
					parent.find(".billboard_banner_value").val( val.value );
				}

				//モード
				var mode = val.mode;
				if( mode.length ) {
					$.each( mode, function( k, m ) {
						if( k != 0 ) {
							var mabtn = parent.find(".billboard_banner_mode_add");
							parent.find(".billboard_banner_mode_0").clone().insertBefore(mabtn).removeClass("billboard_banner_mode_0");
						}
						parent.find(".billboard_banner_mode").eq(k).val( m );
					});
				} else {
					parent.find( ".billboard_banner_mode_all" ).prop("checked", true);
				}			
			});

			$(".billboard_banner_type").change();
		}

		//言語設定
		$("#language_button_enable").val( c.alternate.button_enable );
		$("#language_default").val( c.alternate.default );
		$("#languages").find(".enable").removeAttr("checked");
		var loading_default = { //ローディングの初期値
			jp:"お待ちください",
			en:"Please wait.",
			ko:"기다려 주세요",
			ch:"请您稍等",
			ch_tw:"請稍等"
		}
		$.each( c.alternate.language, function( i, val ) {
			var check = $("#languages").find( "." + val.id ).find(".enable").prop("checked", true);
			$("#languages").find( "." + val.id ).find(".admessage").val( val.admessage );
			var loading_str = val.loading || loading_default[val.id];
			$("#languages").find( "." + val.id ).find(".loading").val( loading_str );
		});

		//メッセージ
		if(!c.message) {
			c.message = { text_class:"white" };
		}
		$("#message_text_class").val( String(c.message.text_class) );

		//注文確認
		if(!c.order_confirm) {
			c.order_confirm = { total_price:"false" };
		}
		$("#order_confirm_total_price").val( String(c.order_confirm.total_price) );
		
		//注文履歴
		$("#check_order_enable").val( String(c.check_order.enable) );
		$("#check_order_price").val( String(c.check_order.price) );
		$("#check_order_status").val( String(c.check_order.status) );
		var check_order_refill = c.check_order.refill || "true";
		$("#check_order_refill").val( String( check_order_refill ) );
		if( c.check_order.total_include_tax == undefined ) {
			c.check_order.total_include_tax = "true";
		}
		$("#check_order_total_include_tax").val( String(c.check_order.total_include_tax) );

		//割り勘
		$("#account_division_enable").val( String(c.account_division.enable) );

		//商品画像
		$("#product_type").val( c.product.type );
		//金額表示
		if( c.product.option_price_text == undefined ) {
			 c.product.option_price_text = "false";
		}
		$("#product_option_price_text").val( c.product.option_price_text );

		//メニュー表示
		//インクルードセレクト
		if( c.menubody.include_select.select.length ) {
			$.each( c.menubody.include_select.select, function( i, v ) {
				$(".include_select_0").clone().insertBefore("#include_select_add").addClass("include_select").removeClass("include_select_0 hide").val( v );
			});
		}
		$("#include_select_price").val( String(c.menubody.include_select.add_price) );

		//いらっしゃいませ画面
		$("#welcome_staff_enable").val( String(c.welcome.staffcall_enable) );
		if( !c.welcome.admessage ) {
			c.welcome.admessage = { enable:"true" };
		}
		$("#welcome_admessage_enable").val( String(c.welcome.admessage.enable) );

		//ログイン画面
		$("#login_enable").val( String(c.login.enable) );
		$("#login_wlan_update_enable").val( String(c.login.wlan_update) );


		//トップ画面
		if(!c.fcategory_top.image_type) {
			c.fcategory_top.image_type = ".jpg";
		}
		$("#fcate_image_type").val( c.fcategory_top.image_type );
		//おかわり
		$("#fcate_refill_enable").val( String(c.fcategory_top.refill.enable) );
		$("#fcate_refill_drink").val( String(c.fcategory_top.refill.drink) );
		$("#fcate_refill_food").val( String(c.fcategory_top.refill.food) );
		$("#fcate_refill_order").val( String(c.fcategory_top.refill.order) );
		//おすすめ
		$("#fcate_reco_enable").val( String(c.fcategory_top.recommend.enable) );
		$("#fcate_reco_code").val( String(c.fcategory_top.recommend.code) );
		if( c.fcategory_top.recommend.item_code ) {
			$.each( c.fcategory_top.recommend.item_code, function( i, v ) {
				$(".fcate_reco_item_0").clone().insertBefore("#fcate_reco_item_add").addClass("fcate_reco_item").removeClass("fcate_reco_item_0 hide").val(v);
			});
		}
		$("#fcate_reco_order").val( String(c.fcategory_top.recommend.order) );


		//タイマー
		$("#fcate_timer_enable").val( String(c.fcategory_top.timer.enable) );
		$("#fcate_timer_time").val( String(c.fcategory_top.timer.time) );
		//多言語ボタン
		$("#fcate_alternate_enable").val( String(c.fcategory_top.alternate.enable) );
		//商品検索ボタン
		$("#fcate_search_enable").val( String(c.fcategory_top.search.enable) );
		if( c.search.btn_enable == "false" ) {
			$("#fcate_search_navigate_enable").attr( "checked", true );
		} else {
			$("#fcate_search_navigate_enable").removeAttr( "checked" );
		}
		//スタッフ呼び出しボタン
		if( c.fcategory_top.staff ) {
			$("#fcate_staff_enable").val( String(c.fcategory_top.staff.enable) );
			if(c.staffcall) {
				console.log( c.staffcall.btn_enable == "false" )
				if( c.staffcall.btn_enable == "false" ) {
					$("#fcate_staff_navigate_enable").attr( "checked", true );
				} else {
					$("#fcate_staff_navigate_enable").removeAttr( "checked" );
				}
			}
		} else {
			$("#fcate_staff_enable").val( "false" );
		}
		//バナー表示
		$("#fcate_banner_enable").val( String(c.fcategory_top.banner.enable) );
		//トップ店舗メッセージ
		if( !c.fcategory_top.admessage ) {
			c.fcategory_top.admessage = { enable:"true" };
		}
		$("#fcate_admessage_enable").val( String(c.fcategory_top.admessage.enable) );

		//決済種別表示
		if( !c.fcategory_top.payment ) {
			c.fcategory_top.payment = "false";
		}
		$("#fcate_payment_enable").val( String(c.fcategory_top.payment) );
		
		

		//中カテゴリートップ
		if(!c.scategory) {
			c.scategory = { top_enable:"false", image_type:".jpg" };
		}
		$("#scategory_top_enable").val( String(c.scategory.top_enable) );
		$("#scategory_image_type").val( String(c.scategory.image_type) );

		//味噌茶ページ
		$("#first_category_enable").val( String(c.first_category.enable) );
		$("#first_category_code").val( String(c.first_category.code) );

		if( c.first_category.mode && c.first_category.mode.length ) {

			var mm = 0;
			$.each( c.first_category.mode, function( k, mode ) {

				var abtn = $("#firstcategory_add");
				$("#firstcategory_mode_0").clone(true).insertBefore(abtn).attr("id","").addClass("firstcategory_mode").removeClass("hide");

				var fbox = $(".firstcategory_mode").eq(k);
				fbox.find(".firstcategory_viewmode").val( mode.id );
				fbox.find(".firstcategory_image").val( mode.image );
				fbox.find(".firstcategory_code").val( mode.code );
			} );

		}

		//商品検索
		$("#search_enable").val( String(c.search.enable) );
		// $("#search_btn_enable").val( String(c.search.btn_enable) );
		$("#search_number").val( String(c.search.number) );
		$("#search_hiragana").val( String(c.search.hiragana) );
		$("#search_hiragana_50").val( String(c.search.hiragana_50) );
		$("#search_search_btn").val( String(c.search.search_btn) );

		if( c.search.number_match ) {
			$("#search_number_match").val( String(c.search.number_match) );
		}

		//クレードル警告
		if( c.stat ) {
			$("#batt_alert_enable").val( String(c.stat.batt_alert.enable));
			$("#batt_alert_interval").val( String(Number( c.stat.batt_alert.interval )/1000) );
		} else {
			$("#batt_alert_enable").val( "false" );
			$("#batt_alert_interval").val( "600000" );
		}

		//ナビゲーション
		//寿司　メニュー画面の検索ボタン
		if( !c.navigation ) {
			c.navigation = { viewmenu:{ rightbutton:"search" } };
		}
		$("#navigation_viewmenu_rightbutton").val( String(c.navigation.viewmenu.rightbutton));


		//クーポンボタン
		if( !c.coupon ) {
			c.coupon = { enable:"false" };
		}
		$("#coupon_enable").val( String(c.coupon.enable) );

	}


	/**
	 * データのセット
	 */
	this.setData = function() {
		var c = self.local_data;

		//カラー
		c.shop.color = $("#shop_color").val();

		//フリック
		c.flick.enable = $("#flick_enable").val();

		//Billboard
		c.billboard.enable = $("#billboard_enable").val();
		var banners = [];
		if( $(".billboard_banner").length ) {
			$(".billboard_banner").each( function() {
				var banner = {};
				banner.id = $(this).find(".billboard_banner_id").val();
				banner.banner = $(this).find(".billboard_banner_banner").val();
				banner.type = $(this).find(".billboard_banner_type").val();
				banner.value = $(this).find(".billboard_banner_value").val();

				if( $(this).find(".billboard_banner_value").length > 1 && banner.type == "image" ) {
					banner.value = [];
					$(this).find(".billboard_banner_value").each(function() {
						if( $(this).val() == "" ) return true;
						banner.value.push( $(this).val() );
					});
					if( !banner.value.length ) {
						banner.value = "";
					} else if( banner.value.length == 1 ) {
						banner.value = banner.value[0];
					}
				} else {
					banner.value = $(this).find(".billboard_banner_value").val();
				}

				if( $(this).find(".billboard_banner_mode_all:checked").length ) {
					banner.mode = [];
				} else {
					banner.mode = [];
					$(this).find(".billboard_banner_mode").each(function(){
						if( $(this).val() == "" ) return true;
						banner.mode.push( $(this).val() );
					});
				}
				banners.push( banner );
			});
		}
		c.billboard.banners = banners;

		//言語
		c.alternate.button_enable = $("#language_button_enable").val();
		c.alternate.default = $("#language_default").val();
		c.alternate.language = [];
		$("#languages .input").each( function( i, val ) {
			if( $(this).find(".enable:checked").length ) {
				var lang = {};
				lang.id = $(this).find(".id").val();
				lang.name = $(this).find(".name").val();
				lang.langfaile = $(this).find(".langfaile").val();
				lang.admessage = $(this).find(".admessage").val();
				lang.loading = $(this).find(".loading").val();
				c.alternate.language.push( lang );
			}
		} );

		//メッセージ
		c.message.text_class = $("#message_text_class").val();

		//注文確認
		c.order_confirm.total_price = $("#order_confirm_total_price").val();

		//注文履歴
		c.check_order.enable = $("#check_order_enable").val();
		c.check_order.price = $("#check_order_price").val();
		c.check_order.status = $("#check_order_status").val();
		c.check_order.refill = $("#check_order_refill").val();
		c.check_order.total_include_tax = $("#check_order_total_include_tax").val();
		
		//割り勘
		c.account_division.enable = $("#account_division_enable").val();

		//商品画像
		c.product.type = $("#product_type").val();
		c.product.option_price_text = $("#product_option_price_text").val();

		//インクルードセレクト
		c.menubody.include_select.select = [];
		if( $(".include_select").length ) {
			$(".include_select").each(function() {
				if( $(this).val() == "" ) return true;
				c.menubody.include_select.select.push( $(this).val() );
			});
		}
		c.menubody.include_select.add_price = $("#include_select_price").val();

		//いらっしゃいませ画面
		c.welcome.staffcall_enable  = $("#welcome_staff_enable").val();
		//いらっしゃいませ画面 店舗メッセージ表示
		c.welcome.admessage.enable = $("#welcome_admessage_enable").val();

		//ログイン画面
		c.login.enable = $("#login_enable").val();
		c.login.wlan_update = $("#login_wlan_update_enable").val();

		//トップ画面
		c.fcategory_top.image_type = $("#fcate_image_type").val();
		//おかわり
		c.fcategory_top.refill.enable = $("#fcate_refill_enable").val();
		c.fcategory_top.refill.drink = $("#fcate_refill_drink").val();
		c.fcategory_top.refill.food = $("#fcate_refill_food").val();
		c.fcategory_top.refill.order = $("#fcate_refill_order").val();
		//おすすめ
		c.fcategory_top.recommend.enable = $("#fcate_reco_enable").val();
		c.fcategory_top.recommend.code = $("#fcate_reco_code").val();
		c.fcategory_top.recommend.item_code = [];
		if( $(".fcate_reco_item").length ) {
			$(".fcate_reco_item").each(function() {
				if( $(this).val() == "" ) return true;
				c.fcategory_top.recommend.item_code.push( $(this).val() );
			});
		}
		c.fcategory_top.recommend.order = $("#fcate_reco_order").val();

		//タイマー
		c.fcategory_top.timer.enable = $("#fcate_timer_enable").val();
		c.fcategory_top.timer.time = $("#fcate_timer_time").val();
		//多言語ボタン
		c.fcategory_top.alternate.enable = $("#fcate_alternate_enable").val();
		//商品検索ボタン
		c.fcategory_top.search.enable = $("#fcate_search_enable").val();

		//スタッフ呼び出しボタン
		if( !c.fcategory_top.staff ) c.fcategory_top.staff = {};
		c.fcategory_top.staff.enable = $("#fcate_staff_enable").val();
		if( !c.staffcall ) c.staffcall = {};
		c.staffcall.btn_enable = ( $("#fcate_staff_navigate_enable:checked").val() ) ? "false" : "true";

		//バナー表示
		c.fcategory_top.banner.enable = $("#fcate_banner_enable").val();
		//トップ店舗メッセージ表示
		c.fcategory_top.admessage.enable = $("#fcate_admessage_enable").val();

		//決済種別
		c.fcategory_top.payment = $("#fcate_payment_enable").val();
		

		//中カテゴリートップ
		c.scategory.top_enable = $("#scategory_top_enable").val();
		c.scategory.image_type = $("#scategory_image_type").val();

		//味噌茶ページ
		c.first_category.enable = $("#first_category_enable").val();
		c.first_category.code = $("#first_category_code").val();
		c.first_category.mode = [];
		if( $(".firstcategory_mode").length ) {
			$(".firstcategory_mode").each(function() {
				var mm = {};
				mm.id = $(this).find(".firstcategory_viewmode").val();
				mm.image = $(this).find(".firstcategory_image").val();
				mm.code = $(this).find(".firstcategory_code").val();
				c.first_category.mode.push( mm );
			});
		}

		
		//検索ボタン
		c.search.enable = $("#search_enable").val();
		c.search.btn_enable = ( $("#fcate_search_navigate_enable:checked").val() ) ? "false" : "true";  //$("#search_btn_enable").val();
		c.search.number = $("#search_number").val();
		c.search.number_match = $("#search_number_match").val();
		c.search.hiragana = $("#search_hiragana").val();
		c.search.hiragana_50 = $("#search_hiragana_50").val();
		c.search.search_btn = $("#search_search_btn").val();

		//クレードル警告
		if( !c.stat ) {
			c.stat = new Object({ batt_alert:{ enable:true, interval:600000 }});
		}
		c.stat.batt_alert.enable = $("#batt_alert_enable").val();
		c.stat.batt_alert.interval = String(Number($("#batt_alert_interval").val()*1000));

		c.navigation.viewmenu.rightbutton = $("#navigation_viewmenu_rightbutton").val();

		//クーポンの表示
		c.coupon.enable = $("#coupon_enable").val();


		console.log( c )

		//jsonの生成
		var jsonstr = JSON.stringify( c, null, "	" );

		jsonstr = 'var config_local = ' + jsonstr;
		$( "#JSON_out" ).text( jsonstr );

		//ファイル保存
		var blob = new Blob([ jsonstr ], { "type" : "application/x-msdownload" });
 
		//Aタグのhref属性にBlobオブジェクトを設定し、リンクを生成
		window.URL = window.URL || window.webkitURL;
		$("#download").attr("href", window.URL.createObjectURL(blob));
		$("#download").attr("download", "config.json");

		$("#download").show();

	}
}


