    var PARSE_APP = "FAbluZyN0hpXGpudGXrt9WOgvUQCxey3KEGALLle";
    var PARSE_JS = "diTLB99p5GHZED8SDzZ4ysNMMyXTXzJOcJi2Qww6";
	var id;
	
	 function myFunction()
  {
	   var query = location.search.substr(1);
       var idresult = {};
        query.split("&").forEach(function(part) {
        var item = part.split("=");
        idresult[item[0]] = decodeURIComponent(item[1]);
		id=idresult[item[0]];
		});
		
	var dirid=new Array();	
   Parse.initialize(PARSE_APP,PARSE_JS);
   var locItem = Parse.Object.extend("Location");
   var locQuery = new Parse.Query(locItem);
   locQuery.equalTo('Directories',id);
   locQuery.find().then(function(result){
	var locationtitile=result[0].get("Name");
	var locationlogo=result[0].get("Logo");
	id=result[0].get("Directories");
	var logo=locationlogo.url();
	$("#location").append(locationtitile);
	$("#logo").attr("src",logo);
    }).then(function(){
	    var dItem = Parse.Object.extend("DirectoryItem");
		var dItemQuery = new Parse.Query(dItem);
		dItemQuery.include("StyleId")
		dItemQuery.equalTo('ParentDirectoryId', id);
		dItemQuery.find({
			success: function(dRes){
				
				var dirtitle=new Array();
				var dirColor=new Array();
				var styles=new Array();
				var TitleColor=new Array();
				var TitleFont=new Array();
				var titleval;
				var titletotval="";
				
	            for(var i=0;i<dRes.length;i++){
				dirtitle[i]=dRes[i].get("Title");
				dirid[i]=dRes[i].id;
				 styles[i]=dRes[i].get("StyleId")
				
				if(styles[i]!=undefined)
				{
				 TitleColor[i]=styles[i].get("TitleColor");
				 TitleFont[i]=styles[i].get("TitleFont");
				 
				}
				//
				
				}
				//dirtitle.sort();
				//dirid.sort();
				for(var i=0;i<dRes.length;i++){
				titleval="<a href='description.html?title="+dirtitle[i]+"&id="+dirid[i]+"'><li class='normalListStyle' style='font-size:"+TitleFont[i]+"px !important;color:"+TitleColor[i]+" !important;'>"+dirtitle[i]+"<i class='fa fa-chevron-right pull-right'></i></li></a>";
				titletotval=titletotval+titleval;
				}
				
				
			    $("#title").append(titletotval);
			}
		}); 
   }).then(function(){
	   var dir=new Array("19W8ATUaKV","c8986clifD");
	   //console.log(dirid[0]);
		var sItem = Parse.Object.extend("Style");
		var sItemQuery = new Parse.Query(sItem);
		sItemQuery.containedIn("StyleID", dirid);
		sItemQuery.find({
			success: function(sRes){
				 for(var i=0;i<sRes.length; i++) {
      console.log(sRes[i]);
                    }
			}
		});
	}).then(function(){
	   
	      var pItem = Parse.Object.extend("Phones");
		  var pItemQuery = new Parse.Query(pItem);
		  pItemQuery.equalTo("PhoneId","ig8gM4gPnG");
		  pItemQuery.find({
		   success: function(pRes){
			//console.log({res:pRes});
		   }
		  });
    //console.fun2();
    });
   
   
  }
	/*function myFunction()
	{
		var val=0;
		Parse.initialize(PARSE_APP,PARSE_JS);
		
		var locItem = Parse.Object.extend("Location");
		//var locItem1 = Parse.Object.extend("DirectoryItem");
		var locQuery = new Parse.Query(locItem);
		locQuery.equalTo('Directories','XN1QjWBzkJ');
		//var loc = new Parse.Query(locItem1);
		//loc.matchesKeyInQuery("ParentDirectoryID","ParentDirectoryID", locQuery);
		 locQuery.find({
			
			success: function(locRes){
				 
				console.log({res:locRes});
				
			}
		});
          
		
		var dItem = Parse.Object.extend("DirectoryItem");
		var dItemQuery = new Parse.Query(dItem);
		dItemQuery.equalTo('ParentDirectoryId','XN1QjWBzkJ');
		//var loc2 = new Parse.Query(Parse.DirectoryItem);
		//loc2.matchesKeyInQuery("ParentDirectoryID", dItemQuery2);
		dItemQuery.find({
			success: function(dRes){
				console.log({res:dRes});
			}
		}); 
        
		var pItem = Parse.Object.extend("Phones");
		var pItemQuery = new Parse.Query(pItem);
		pItemQuery.equalTo("PhoneId","ig8gM4gPnG");
		pItemQuery.find({
			success: function(pRes){
				console.log({res:pRes});
			}
		});
		
		var sItem = Parse.Object.extend("Style");
		var sItemQuery = new Parse.Query(sItem);
		sItemQuery.equalTo("StyleID","ig8gM4gPnG");
		sItemQuery.find({
			success: function(sRes){
				console.log({res:sRes});
			}
		});
		

	}*/
	
	
	/*function myFunction()
    {
         Parse.initialize(PARSE_APP,PARSE_JS);
		 
         var NoteObject = Parse.Object.extend("DirectoryItem");
         var query = new Parse.Query(NoteObject);
  		 query.equalTo('ParentDirectoryID','69PInq9BTF');
			//alert(query);
		 query.find({
			success:function(object) {
			  
                  alert(object[0]);
				  var title=new Array();
				  var title=new Array();
	            for(var i=0;i<object.length;i++){
				title[i]=object[i].get("Title");
				}
				alert(title);
				var titleval;
				var titletotval="";
				for(var i=0;i<object.length;i++){
			    titleval="<li class='normalListStyle'>"+title[i]+"<i class='fa fa-chevron-right pull-right'></i></li>";
				titletotval=titletotval+titleval;
				}
				alert(titletotval);
			    $("#title").append(titletotval);
				
				//window.location="./atm.html?mesg="+json;
			}, 
			error:function(object,error) {
				console.dir(error);
				//window.location="./index.html";
				alert("Sorry, I couldn't find it.");
			}		 
	   
    });
	}*/
/* function myFunction(){
		Parse.initialize(PARSE_APP,PARSE_JS);
			var Post = Parse.Object.extend("Location");
			
			var postsQuery = new Parse.Query(Post);
			
		    postsQuery.equalTo('objectId','69PInq9BTF');
			var dirQuery = new Parse.Query(Parse.DirectoryItem);
			dirQuery.matchesKeyInQuery('ParentDirectoryID',postsQuery)
			dirQuery.find( {
			  success: function(post) {
				myPost = post;
				console.log({myPost:myPost});
								
			  }
			
	});
	} */
	/*function myFunction()
	{
		        Parse.initialize(PARSE_APP,PARSE_JS);
				var Post = Parse.Object.extend("Location");
				var Comment = Parse.Object.extend("DirectoryItem");
				var innerQuery = new Parse.Query(Post);
				innerQuery.exists("Directories");
				var query = new Parse.Query(Comment);
				query.matchesQuery("post", innerQuery);
				query.find("69PInq9BTF",{
				  success: function(comments) {
					  console.log(comments);
					// comments now contains the comments for posts with images.
				  },
				  error: function(obj,err){
					  console.log("failue");
				  }
				});		
	}*/
/*	function myFunction()
    {
         Parse.initialize(PARSE_APP,PARSE_JS);
		 var DirObject = Parse.Object.extend("DirectoryItem");
					var query1 = new Parse.Query(DirObject);
					query1.equalTo('ParentDirectoryID','69PInq9BTF');
		 
		  var LocationObject = Parse.Object.extend("Location");
        // var NoteObject = Parse.Object.extend("DirectoryItem");
		var loc=new LocationObject();
		  var query = new Parse.Query(LocationObject);
		  //Parse.Relation("parent",Location);
		  //query.include('Directories');
		  // 
  		 query.equalTo('objectId','69PInq9BTF');
		
			//alert(query);
		 query.find({
			success:function(object) {
			  console.log(object);
				  var title=new Array();
				 var locationame=object[0].get("Name");
				 //var locationlogo=object[0].get("Logo");
	               console.log(locationame);
				   var relation=loc.relation("DirectoryItem");
					var query1=relation.query();
			        query1.find({
						sucess:function(obj){
							console.log(obj);
						},
						error:function(obj,err){
							console.log(err);
						}
						
					});
					
			}, 
			error:function(object,error) {
				console.dir(error);
				//window.location="./index.html";
				alert("Sorry, I couldn't find it.");
			}		 
	   
    });
	}*/
    
   // window.onload = pageLoad;  

