    var PARSE_APP = "FAbluZyN0hpXGpudGXrt9WOgvUQCxey3KEGALLle";
    var PARSE_JS = "diTLB99p5GHZED8SDzZ4ysNMMyXTXzJOcJi2Qww6";
	var id;
		var dirid=new Array();
	
	var locationtitile;
	function myFunction()
  { 
     var query = location.search.substr(1);
       var idresult = {};
        query.split("&").forEach(function(part) {
        var item = part.split("=");
        idresult[item[0]] = decodeURIComponent(item[1]);
		id=idresult[item[0]];
		});
			var hotelresult=localStorage.getItem('Hotel');
			var hRes=JSON.parse(hotelresult);
			if((hRes[0]!=null)&&(hRes[0].ObjectId=id)){
			//localstorage hotel	
			  showHotel();
			}else{
					  Parse.initialize(PARSE_APP,PARSE_JS);
					 //getting hotel info 
					   var locItem = Parse.Object.extend("Location");
					   var locQuery = new Parse.Query(locItem);
					   locQuery.equalTo('objectId',id);
					   locQuery.find().then(function(result){
						   console.log(result[0]);
					        if(result[0]=="undefined"||result[0]==null)
								  {
									//getting template
									var tempItem = Parse.Object.extend("Template");
									var tempQuery = new Parse.Query(tempItem);
									tempQuery.equalTo('objectId',id);
								    tempQuery.find().then(function(result){
									localStorage.setItem( 'Hotel',JSON.stringify(result));
												  });
												  
									}
							else{
								localStorage.setItem( 'Hotel',JSON.stringify(result));
							}
				          }).then(function(){
						  //getting directories
						    var dItem = Parse.Object.extend("DirectoryItem");
							var dItemQuery = new Parse.Query(dItem);
							dItemQuery.limit(1000);
							dItemQuery.include("StyleId")
							dItemQuery.equalTo('LocationId', id);
							dItemQuery.find({
								success: function(dRes){
									localStorage.setItem('directory',JSON.stringify(dRes));
								});
							});
						}).then(function(){
							//getting menu icons							  
							 var MenuItem = Parse.Object.extend("HotelMenuList");
							   var MenuQuery = new Parse.Query(MenuItem);
							   MenuQuery.equalTo('HotelId',id);
							   MenuQuery.find().then(function(menuRes){
								   localStorage.setItem( 'HotelMenu',JSON.stringify(menuRes));
														
								});
							}).then(function(){ 
						  //getting phones
							 var pItem = Parse.Object.extend("Phones");
							  var pItemQuery = new Parse.Query(pItem);
							  pItemQuery.limit(1000);
							  pItemQuery.equalTo('LocationId', id);
							  pItemQuery.find({
							   success: function(pRes){
								   localStorage.setItem('phones',JSON.stringify(pRes));
							   }
							   });
						  }).then(function(){
							  //geeting menu
							  var mItem = Parse.Object.extend("Menu");
							  var mItemQuery = new Parse.Query(mItem);
							  mItemQuery.limit(1000);
							  mItemQuery.include("StyleID");
							  mItemQuery.equalTo('LocationId', id);
							  mItemQuery.find({
							   success: function(mRes){
								   localStorage.setItem('menu',JSON.stringify(mRes))
								}
							   });
						  }).then(function(){
							  //getting Styles
							  var sItem = Parse.Object.extend("Style");
							  var sItemQuery = new Parse.Query(sItem);
							  sItemQuery.limit(1000);
							  sItemQuery.equalTo('LocationId', id);
							  sItemQuery.find({
							   success: function(sRes){
								   localStorage.setItem('Style',JSON.stringify(sRes));
							   }
							  });
						  }).then(function(){
							  showHotel()
						  });
										
			}
	   function	showHotel(){
		 alert("hello")
				
	   }
  }		