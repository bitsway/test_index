
var latitude="";
var longitude="";

function getLocationInfoAch() {	
	var options = { enableHighAccuracy: false};	
	navigator.geolocation.getCurrentPosition(onSuccess, onError, options);				
	//$(".errorChk").html("Confirming location. Please wait..");
}
// onSuccess Geolocation
function onSuccess(position) {
	$("#ach_lat").val(position.coords.latitude);
	$("#ach_long").val(position.coords.longitude);
	//$(".errorChk").html("Location Confirmed");
}
// onError Callback receives a PositionError object
function onError(error) {
   $("#ach_lat").val(0);
   $("#ach_long").val(0);
   //$(".errorChk").html("Failed to Confirmed Location.");
}


//---- online 
//var apipath="http://c003.cloudapp.net/cab_management/syncmobile/";

//--- local
//var apipath="http://127.0.0.1:8000/cab_management/syncmobile/";
var apipath="http://a007.yeapps.com/cab_management/syncmobile/";

url ="";

$(document).ready(function(){
	if (localStorage.synced!='YES'){
			 url = "#pagesync";						
		}else{
			url = "#homePage";
		}
	$.mobile.navigate(url);
		
});

function syncBasic() {
					
		var mobile=$("#mobile").val() ;
	 	var password=$("#password").val() ;
		
		if (mobile=="" || password==""){
			 $(".errorMsg").html("Required mobile no and password");	
		 }else{	
			 $('#syncBasic').hide();			 
			 $(".errorMsg").html("Sync in progress. Please wait...");
			if(localStorage.sync_code==undefined || localStorage.sync_code==""){
					localStorage.sync_code=0
				}
		
		 	//alert(apipath+'passwordCheck?cid=BANBEIS&mobile='+mobile+'&password='+encodeURIComponent(password)+'&sync_code='+localStorage.sync_code);
			$.ajax({
			  url:apipath+'passwordCheck?cid=BANBEIS&mobile='+mobile+'&password='+encodeURIComponent(password)+'&sync_code='+localStorage.sync_code,
			  success: function(result) {
				syncResult=result
				//alert(syncResult);
				var syncResultArray = syncResult.split('rdrd');
					localStorage.synced=syncResultArray[0];
					if (localStorage.synced=='YES'){	
						localStorage.sync_code=syncResultArray[1];
						localStorage.upazilaList=syncResultArray[2];						
						
						localStorage.mobile_no=mobile;
						
						
						$(".errorMsg").html("Sync Successful");
						//alert('aa');
						
						$('#syncBasic').show();
											
						url = "#homePage";
						$.mobile.navigate(url);
						
					}else{
						
						$(".errorMsg").html("Sync Failed. Authorization or Network Error.");
						$('#syncBasic').show();
					}
				
			  }//----/success f
			});//------/ajax
			
		 }//-----/field
			
	}
	

function menuClick(){
		$(".errorChk").text("");
		$(".sucChk").text("");
				
		url = "#homePage";
		$.mobile.navigate(url);
	
	}
//--------------back button
function backClick(){
	$(".errorChk").text("");
	}
	
//-------------------
var cabData="";

function registration(){
	getLocationInfoAch();
	
	url="#first_page";					
	$.mobile.navigate(url);		
}

//===================		
function booking(){
		var name=$("#name").val();
		var mobileNo=$("#mobileNo").val();
		var nid=$("#nid").val();
		var pickupDate=$("#pickupDate").val();
		var address=$("#address").val();
				
		latitude=$("#ach_lat").val();
		longitude=$("#ach_long").val();
		
		if (latitude==undefined || latitude==''){
			latitude=0;
			}
		if (longitude==undefined || longitude==''){
			longitude=0;
			}
		
		if (name=="" ){
			$(".errorChk").text("Required Name");	
		}else if (mobileNo=="" ){
			$(".errorChk").text("Required Mobile No");	
		}else if (nid=="" ){
			$(".errorChk").text("Required nid");
		}else if (pickupDate=="" ){
			$(".errorChk").text("Required Pickup Date");
		}else if (address=="" ){
			$(".errorChk").text("Required Address");			
		}else{
			//alert(apipath+"submitData?cid=CABM&name="+name+"&mobileNo="+mobileNo+"&nid="+nid+"&pickupDate="+pickupDate+"&address="+address+"&latitude="+latitude+"&longitude="+longitude);
			$.ajax({
				type: 'POST',
				url:apipath+"submitData?cid=CABM&name="+name+"&mobileNo="+mobileNo+"&nid="+nid+"&pickupDate="+pickupDate+"&address="+address+"&latitude="+latitude+"&longitude="+longitude,
				   
				   success: function(result) {
					if(result=='Success'){							
						//------------------------	
						$("#name").val("");	
						$("#mobileNo").val("");							
						$("#nid").val("");	
						$("#pickupDate").val("");	
						$("#address").val("");						
						$("#ach_lat").val("");
						$("#ach_long").val("");
						
						$(".errorChk").text("");
						
						url="#last_page"
						$.mobile.navigate(url);						
					}else{
						$(".errorChk").text('Unauthorized Access');																	
						$("#btn_submit").show();
						}
						
				   }//end result
		});//end ajax
		
						
	}

};	




function exit() {
navigator.app.exitApp();
//navigator.device.exitApp();
}