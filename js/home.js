 var PARSE_APP = "FAbluZyN0hpXGpudGXrt9WOgvUQCxey3KEGALLle";
    var PARSE_JS = "diTLB99p5GHZED8SDzZ4ysNMMyXTXzJOcJi2Qww6";
	var locationtitle=new Array();
	var locationlogo=new Array();
	var locationaddress1=new Array();
	var locationaddress2=new Array();
	var locationstreet=new Array();
	var locationtown=new Array();
	var locationzip=new Array();
	var locationId=new Array();
	var locationurl=new Array();
	var id,latitude,longitude;
	function locationFunction()
	{      
       
      if ( navigator.geolocation )
        {
            navigator.geolocation.getCurrentPosition(UserLocation);
		}
        // Default to Washington, DC
        else{
			alert("no geolocation");
		//NearestCity( 38.8951, -77.0367 );
         } 
	   

	   
	   var query = location.search.substr(1);
	   var idresult = {};
        query.split("&").forEach(function(part) {
        var item = part.split("=");
        idresult[item[0]] = decodeURIComponent(item[1]);
		id=idresult[item[0]];
		//id = "08401";
		
		});	
		  
		  Parse.initialize(PARSE_APP,PARSE_JS);
		 
		  function UserLocation( position )
      {    
	         latitude= position.coords.latitude;
            longitude= position.coords.longitude; 
			
		  var loc = new Parse.GeoPoint(latitude,longitude);
		 var locItem = Parse.Object.extend("Location");
         var locQuery = new Parse.Query(locItem);
		 //locQuery.equalTo("zipcode",id);
		 locQuery.withinMiles('Geopoints',loc,5);
		 locQuery.limit(1000);
		 locQuery.find().then(function(result){
		// console.log(result);
		 localStorage.setItem( 'itemIndex',JSON.stringify(result));
			
			  for(var i=0;i<result.length;i++){
	      locationtitle[i]=result[i].get("Name");
		  locationlogo[i]=result[i].get("Logo");
		  locationaddress1[i]=result[i].get("Address1");
		  locationaddress2[i]=result[i].get("Address2");
		  locationstreet[i]=result[i].get("Street");
		  locationtown[i]=result[i].get("Town");
		  locationzip[i]=result[i].get("zipcode");
		  locationId[i]=result[i].id;
		//  console.log(locationId[i]);
		  if(locationlogo[i]!=undefined){
	      locationurl[i]=locationlogo[i]._url;
		  }
		   if(locationaddress2[i]==undefined)
		 {
			 locationaddress2[i]=" ";
		 }
	     // console.log(locationId);
	     }
		
		 var listdir;
		 var listlocations=" ";
		 for(var i=0;i<result.length;i++){
			
			listdir="<div class='row' ><div class='col s3' ><img class='logo-img' src='"+locationurl[i]+"'/></div>"+
			"<div class='col s7' ><p style='font-size:12px'> <b> "+locationtitle[i]+" </b> </p><span> "+locationaddress1[i]+" </span><span> "+locationaddress2[i]+" </span><span> "+locationstreet[i]+" </span><span> "+locationtown[i]+" </span></br><span> "+locationzip[i]+"</span></div>"+
			"<div class='col s2'><a href='directories.html?id="+locationId[i]+"'> <i class='small material-icons'>input</i> </a></div>"+
			"</div>";
           listlocations=listlocations+listdir;			
		 }

		 $("#locations").append(listlocations);
         });
			
       
		  //var loc = new Parse.GeoPoint(17.45141956,78.38098168);
   }  
   event.stopPropagation();
	}
//Search box	
    
     $('#textbox').on("input",function(event){
		     var listdir;
			 var listlocations=" ";
	      var textres = $(this).val();
		  
		    $("#locations").empty();
			var SearchlocItem = Parse.Object.extend("Location");
         var SearchlocQuery = new Parse.Query(SearchlocItem);
		 SearchlocQuery.find().then(function(result){
		// console.log(result);
		 localStorage.setItem( 'SearchitemIndex',JSON.stringify(result));
		 });
		 
        var val=localStorage.getItem('SearchitemIndex');
	      var result=JSON.parse(val);
		 var res = new RegExp(textres,"i");
		  var resvalue;
		  for(var i=0;i<result.length;i++){
	        if((res.test(result[i].Name))||(res.test(result[i].Address1))||(res.test(result[i].Address2))||(res.test(result[i].Street))||(res.test(result[i].Town))||(res.test(result[i].zipcode)))
			  {
			locationtitle[i]=result[i].Name;
			  locationlogo[i]=result[i].Logo;
			  locationaddress1[i]=result[i].Address1;
			  locationaddress2[i]=result[i].Address2;
			  locationstreet[i]=result[i].Street;
			  locationtown[i]=result[i].Town;
			  locationzip[i]=result[i].zipcode;
			  locationId[i]=result[i].objectId;
			  if(locationlogo[i]!=undefined){
			  locationurl[i]=locationlogo[i].url;
			  }
			   if(locationaddress2[i]==undefined)
			 {
				 locationaddress2[i]=" ";
			 }
			  
			//  console.log(locationId);
			   listdir = "<div class='row' ><div class='col s3' ><img class='logo-img' src='"+locationurl[i]+"'/></div>"+
				"<div class='col s7' ><p > <b style='font-size:13px;' > "+locationtitle[i]+" </b> </p><span> "+locationaddress1[i]+" </span><span> "+locationaddress2[i]+" </span><span> "+locationstreet[i]+" </span><span> "+locationtown[i]+" </span></br><span> "+locationzip[i]+"</span></div>"+
				"<div class='col s2'><a href='directories.html?id="+locationId[i]+"'> <i class='small material-icons'>input</i> </a></div>"+
				"</div>";
			   listlocations=listlocations+listdir;			
			  }  
			  
				  
		  }
		  $("#locations").append(listlocations);
		  event.stopPropagation();
	});
          
