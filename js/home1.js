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
	function locationFunction()
	{
		  Parse.initialize(PARSE_APP,PARSE_JS);
		 var locItem = Parse.Object.extend("Location");
         var locQuery = new Parse.Query(locItem);
		 locQuery.find().then(function(result){
		 for(var i=0;i<result.length;i++){
	      locationtitle[i]=result[i].get("Name");
		  locationlogo[i]=result[i].get("Logo");
		  locationaddress1[i]=result[i].get("Address1");
		  locationaddress2[i]=result[i].get("Address2");
		  locationstreet[i]=result[i].get("Street");
		  locationtown[i]=result[i].get("Town");
		  locationzip[i]=result[i].get("zipcode");
		  locationId[i]=result[i].id;
		  if(locationlogo[i]!=undefined){
	      locationurl[i]=locationlogo[i].url();
		  }
		   if(locationaddress2[i]==undefined)
		 {
			 locationaddress2[i]=" ";
		 }
	      console.log(locationId);
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
	}
		function handle(e){
			if(e.keyCode === 13){
				var address = $(".field").val();
				console.log(address);
			}

			return false;
		}
		
		$( ".field" ).change(function() {
		  var address = $(this).val();
		  console.log(address);
		  $("#locations").empty();
		  Parse.initialize(PARSE_APP,PARSE_JS);
		  var locItem = Parse.Object.extend("Location");
		  var locQuery = new Parse.Query(locItem);
		  locQuery.equalTo('Town',address);
		  locQuery.find().then(function(result){
			for(var i=0;i<result.length;i++){
			  locationtitle[i]=result[i].get("Name");
			  locationlogo[i]=result[i].get("Logo");
			  locationaddress1[i]=result[i].get("Address1");
			  locationaddress2[i]=result[i].get("Address2");
			  locationstreet[i]=result[i].get("Street");
			  locationtown[i]=result[i].get("Town");
			  locationzip[i]=result[i].get("zipcode");
			  locationId[i]=result[i].id;
			  if(locationlogo[i]!=undefined){
			  locationurl[i]=locationlogo[i].url();
			  }
			   if(locationaddress2[i]==undefined)
			 {
				 locationaddress2[i]=" ";
			 }
			  console.log(locationId);
			 }
			
			 var listdir;
			 var listlocations=" ";
			 for(var i=0;i<result.length;i++){
				
				listdir="<div class='row' ><div class='col s3' ><img class='logo-img' src='"+locationurl[i]+"'/></div>"+
				"<div class='col s7' ><p > <b style='font-size:13px;' > "+locationtitle[i]+" </b> </p><span> "+locationaddress1[i]+" </span><span> "+locationaddress2[i]+" </span><span> "+locationstreet[i]+" </span><span> "+locationtown[i]+" </span></br><span> "+locationzip[i]+"</span></div>"+
				"<div class='col s2'><a href='directories.html?id="+locationId[i]+"'> <i class='small material-icons'>input</i> </a></div>"+
				"</div>";
			   listlocations=listlocations+listdir;			
			 }
			 $("#locations").append(listlocations);
			 
		  });
		  
		});