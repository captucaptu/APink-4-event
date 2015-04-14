$(document).ready(function(){
	//https://docs.google.com/spreadsheets/d/1k2yqErFAJGy_P5IYutquwue0OrqhVvS2T2K87Ca-Qac/pubhtml
	//var key = '1k2yqErFAJGy_P5IYutquwue0OrqhVvS2T2K87Ca-Qac';
	var key = '1k2yqErFAJGy_P5IYutquwue0OrqhVvS2T2K87Ca-Qac';
	var userURL = 'https://spreadsheets.google.com/feeds/list/' + key + '/1/public/values?alt=json';
	
	//queryTotal();
	function queryTotal(){
		var total = 0;
		$.ajax({
			url: userURL,
			type: "GET",
			dataType: "json",
			success: function (json) {
				var trowsRegex = /gsx\$/;

				// 呈現表格 rows 資料
				var trows = json.feed.entry;
				$.each(trows, function (i, data) {
					//console.log(data.gsx$訂購數量.$t);
					total += Number(data.gsx$訂購數量.$t);
					$('.total').html(total);
				});
				
			},
			//錯誤判斷
			error: function () {
				alert("資料讀取錯誤，請聯絡 captu");
			}
		});

		
	}
	queryData();
	function queryData(){
		var bookers = [];
		var booker = [];
		$.ajax({
			url: userURL,
			type: "GET",
			dataType: "json",
			success: function (json) {
				var rowsRegex = /gsx\$/;

				// 呈現表格 rows 資料
				var rows = json.feed.entry;
				$.each(rows, function (i, data) {
					//console.log(i);
					bookers[i]=[];
					$.each(data, function (j, jdata){
						if(rowsRegex.test(j)){
							//console.log(jdata.$t);
							//console.log(booker[i]);
							bookers[i].push(jdata.$t);
						}
					});
					var msg = '<li class="msg-item">';
					//var pics = [];
					//pics = [bookers[i][3],bookers[i][6]];
					//console.log(bookers[i][5]);
					//for(var p=0;p<pics.length;p++){
						if(bookers[i][3]!="") msg+='<img src="'+bookers[i][3]+'">';
						if(bookers[i][5]!="") msg+='<img src="'+bookers[i][5]+'">';
						//$('article').append('<img src="'+pics[p]+'"><br><br>');
					//}
					msg = msg + '<p class="msg-name">'+bookers[i][2]+'</p>';
					msg = msg + '<p class="msg-cont">'+bookers[i][4]+'</p>';
					msg = msg + '<div class="tag"><p class="no">No. '+(i+1)+'</p></div>';
					msg = msg + '</li>';
					$('.msg-list').append(msg);
				});
				$('img').load(function(){
					$('.msg-list').masonry({        
	            itemSelector: '.msg-item'
	        });
				});
				/*var find = false;
				for (var k = 0; k<bookers.length; k++) {
					if(bookers[k][1]==pttid && (bookers[k][7]==(tel.substring(1,tel.length)) || bookers[k][7] == tel)){
						booker = bookers[k];
						$('li.pttid').text("PTT 帳號："+booker[1]);
						$('li.name').text("訂購人："+booker[2]);
						$('li.num').text("數量："+booker[3]);
						$('li.price').text("金額："+booker[4]);
						$('li.ac').text("對帳資料："+booker[5]);
						$('li.receive').text("收件人："+booker[6]);
						if(bookers[k][7]==(tel.substring(1,tel.length))) $('li.tel').text("聯絡電話：0"+booker[7]);
						if(bookers[k][7] == tel) $('li.tel').text("聯絡電話："+booker[7]);
						$('li.adds').text("收件地址："+booker[8]);
						$('li.post').text("取貨方式："+booker[10]);
						//console.log(booker[12]);
						if(booker[12]=="TRUE"){
							$('li.check').text("處理狀況：匯款已確認收到。");
						}else{
							$('li.check').text("處理狀況：已填單，待確認款項與資料。");
						}
						$('li.trackno-1').text("郵件編號："+booker[13]);
						//$('li.trackno-2').text("郵件編號(海報)："+booker[14]);
						//$('li.check').text("PTT 帳號："+booker[1]);
						console.log(booker);
						find = true;
						break;
					}
				}
				if(!find){
					alert('查無資料');
				}*/
			},
			//錯誤判斷
			error: function () {
				console.log("資料讀取錯誤，請聯絡 captu");
			}
		});

		
	}
        
});

