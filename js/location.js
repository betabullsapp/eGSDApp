    var PARSE_APP = "FAbluZyN0hpXGpudGXrt9WOgvUQCxey3KEGALLle";
    var PARSE_JS = "diTLB99p5GHZED8SDzZ4ysNMMyXTXzJOcJi2Qww6";
	var id;
		var dirid=new Array();
	
	var locationtitile;
	function myFunction()
  {    
	localStorage.clear();
	Parse.initialize(PARSE_APP,PARSE_JS);
	var query = location.search.substr(1);
       var idresult = {};
        query.split("&").forEach(function(part) {
        var item = part.split("=");
        idresult[item[0]] = decodeURIComponent(item[1]);
		id=idresult[item[0]];
		});
   var locItem = Parse.Object.extend("Location");
   var locQuery = new Parse.Query(locItem);
   locQuery.equalTo('objectId',id);
   locQuery.find().then(function(result){
	  if(result[0]==undefined)
	  {

			var tempItem = Parse.Object.extend("Template");
		   var tempQuery = new Parse.Query(tempItem);
		   tempQuery.equalTo('objectId',id);
			tempQuery.find().then(function(result){
			   locationtitile=result[0].get("Name");
			   var parentid=result[0].id;
			
				localStorage.setItem( 'parentid',JSON.stringify(parentid));
				$("#location").append(locationtitile);
				
			   });
		   
	  }
	  else{
		 
		 var locationimg,locationhotelimg;
		 locationtitile=result[0].get("Name");
		 locationLogo=result[0].get("Logo");
		 locationHotelLogo=result[0].get("HotelLogo");
		 locationMessage=result[0].get("Message");
		 locationfooterimg=result[0].get("FooterImage")
		id=result[0].get("Directories");
		if(locationLogo!=undefined){
					 locationimg=locationLogo._url;
					
				 }
				 else{
					  locationimg='display:none';
				 }
		if(locationHotelLogo!=undefined){
					 locationhotelimg=locationHotelLogo._url;
					
				 }
				 else{
					  locationhotelimg='display:none';
				 }
		if(locationfooterimg!=undefined){
					 footerimage=locationfooterimg._url;
					
				 }
				 else{
					  footerimage='display:none';
				 }
		
		if(locationMessage==undefined){
			          locationmsg='display:none';
		          }		
		localStorage.setItem( 'parentid',JSON.stringify(id));
		$('#locationlogo').attr("src",locationimg);
		$('#locationhotellogo').attr("src",locationhotelimg)
		$('#footerimage').attr("src",footerimage)
		$('#locationmessage').append(locationMessage)
		
		$("#location").append(locationtitile);
		
		
	  }
	 
	
    }).then(function(){
		
	    var dItem = Parse.Object.extend("DirectoryItem");
		var dItemQuery = new Parse.Query(dItem);
		dItemQuery.limit(1000);
		dItemQuery.include("StyleId")
		dItemQuery.equalTo('LocationId', id);
		dItemQuery.find({
			success: function(dRes){
				localStorage.setItem('directory',JSON.stringify(dRes));
				
				var directory=new Array();
				var dirtitle=new Array();
				var dircaption=new Array();
				var dirColor=new Array();
				var dirLogo=new Array();
				var dirurl=new Array();
				var styles=new Array();
				var TitleColor=new Array();
				var TitleFont=new Array();
				var dirlogoDis=new Array();
				var  dirbutton=new Array();
				var titleval;
				var titletotval="";
				var titletotval1="";
				var titletotval2="";
				var character="";
				var titledis="";
				var titlecapDis="";
				
			
	       for(var i=0;i<dRes.length;i++){
			 
			if(dRes[i].get("DirectoryID")==id){
				  
							dirtitle[i]=dRes[i].get("Title");
							dircaption[i]=dRes[i].get("Caption");
							dirid[i]=dRes[i].id;
							dirLogo[i]=dRes[i].get("Picture");
				if(dirLogo[i]!=undefined){
					 dirurl[i]=dirLogo[i]._url;
					
				 }
				 else{
					  dirlogoDis[i]='display:none;';
					  dirbutton[i]='margin-left:43px!important';
				 }
				 if(dircaption[i]==undefined)
				{
				 titlecapDis='display:none';
				}
				
				
				/* var json={"title":dirtitle[i],
				          "caption":dircaption[i],
				          "dirid":dirid[i],
						  "dirlogo":dirurl[i],
						  "titlecolor":TitleColor[i],
						  "titlefont": TitleFont[i],
						  "dirlogodis": dirlogoDis[i]
						  };
				directory.push(json); */
					 titleval="<div class='row'><span class='menudir'><img  src='"+dirurl[i]+"' class='dirlogo' style='"+dirlogoDis[i]+"'></span><span><a style='"+dirbutton[i]+"' href='description.html?title="+locationtitile+"&id="+dirid[i]+"&header="+dirtitle[i]+"'><button class='dirbutton' >"+dirtitle[i]+"</button></a></span></div>";	
					titletotval=titletotval+titleval;
				
				}
				
			}	
			
			
				
			$("#titledir").append(titletotval);
				//console.log(directory[0]);
				/* function compare(a,b) {
                       if (a.title < b.title)
                           return -1;
                       if (a.title > b.title)
                           return 1;
                            return 0;
                             }
				directory.sort(compare); */
				/* for(var i=0;i<directory.length;i++){
				  
					for(var j=i;j<directory.length;j++){
						if(directory[i].title.charAt(0)==directory[j].title.charAt(0)){
							titleval="<a href='description.html?title="+locationtitile+"&id="+directory[j].dirid+"&header="+directory[j].title+"'><li class='normalListStyle' ><img src='"+directory[j].dirlogo+"' class='dirlogo pull-left' style='"+directory[j].dirlogodis+"'>"+directory[j].title+" <img src='./img/right.jpg' class='pull-right'><p style='font-size:11px;"+titlecapDis+"' class='caps'>"+directory[j].caption+"</p></li></a>";
						    titletotval1=titletotval1+titleval;
							if(j==directory.length-1){
								character="<li class='mainStyleList'>"+directory[i].title.charAt(0)+"</li>"
							titletotval2=character+titletotval1;
							titletotval=titletotval+titletotval2;
							i=directory.length;
							}
						}
						else{
							character="<li class='mainStyleList'>"+directory[i].title.charAt(0)+"</li>"
							titletotval2=character+titletotval1;
							titletotval=titletotval+titletotval2;
							i=j;
							j=j-1;
							titleval='';
							titletotval1='';
							
						}
					}
				}
				
			
				
				var titlecomlete="<ul style='"+titledis+"'>"+titletotval+"</ul>"
				
				
			    $("#title").append(titlecomlete); */
				
			}	
		}); //end for directory items
   }).then(function(){
			var pItem = Parse.Object.extend("Phones");
		  var pItemQuery = new Parse.Query(pItem);
		  pItemQuery.limit(1000);
		  pItemQuery.equalTo('LocationId', id);
		  pItemQuery.find({
		   success: function(pRes){
			   localStorage.setItem('phones',JSON.stringify(pRes));
			   var val=localStorage.getItem('phones');
	              var result=JSON.parse(val);
		   }
		   });//end for phones
	
   }).then(function(){
		 //local storage for menu details
		  var mItem = Parse.Object.extend("Menu");
		  var mItemQuery = new Parse.Query(mItem);
		  mItemQuery.limit(1000);
		  mItemQuery.include("StyleID");
		  mItemQuery.equalTo('LocationId', id);
		  mItemQuery.find({
		   success: function(mRes){
			   localStorage.setItem('menu',JSON.stringify(mRes))
			}
		   });//end for menu details
   }).then(function(){
	   ////local storage for styles details
	    var sItem = Parse.Object.extend("Style");
		  var sItemQuery = new Parse.Query(sItem);
		  sItemQuery.limit(1000);
		  sItemQuery.equalTo('LocationId', id);
		  sItemQuery.find({
		   success: function(sRes){
			   localStorage.setItem('Style',JSON.stringify(sRes));
			  // var val=localStorage.getItem('Style');
	             // var result=JSON.parse(val);
				 // console.log(result);
		   }
		  });
   });
  }

 //search box
	$('#search').click(function(){
		 var textres = $('#textbox').val();
		 var res = new RegExp(textres,"i");
		 $("#titledir").empty();
		 var dirresult=localStorage.getItem('directory');
		 var dRes=JSON.parse(dirresult);
		        var dirid=new Array();
				var directory=new Array();
				var dirtitle=new Array();
				var dircaption=new Array();
				var dirColor=new Array();
				var dirLogo=new Array();
				var dirurl=new Array();
				var styles=new Array();
				var TitleColor=new Array();
				var TitleFont=new Array();
				var dirlogoDis=new Array();
				var dirbutton=new Array();
				var titleval;
				var titletotval="";
				var titletotval1="";
				var titletotval2="";
				var character="";
				var titledis="";
				var titlecapDis="";
				
				//dRes.sort();
				if(dRes.length==0){
					titledis='display:none';
				}
	            for(var i=0;i<dRes.length;i++){
					
					
						if((res.test(dRes[i].Title))){
							if(dRes[i].LocationId==id){
							
						dirtitle[i]=dRes[i].Title;
						dircaption[i]=dRes[i].Caption;
						dirid[i]=dRes[i].objectId;
						dirLogo[i]=dRes[i].Picture;
						 styles[i]=dRes[i].StyleId;
						 if(dirLogo[i]!=undefined){
							 dirurl[i]=dirLogo[i].url;
							
						 }
						 else{
							  dirlogoDis[i]='display:none';
							  dirbutton[i]='margin-left:43px!important';
						 }
						if(styles[i]!=undefined)
						{
						 TitleColor[i]=styles[i].TitleColor;
						 TitleFont[i]=styles[i].TitleFont;
						 
						}
						if(dircaption[i]==undefined)
						{
						 titlecapDis='display:none';
						 
						}
						//
						/* var json={"title":dirtitle[i],
								  "caption":dircaption[i],
								  "dirid":dirid[i],
								  "dirlogo":dirurl[i],
								  "titlecolor":TitleColor[i],
								  "titlefont": TitleFont[i],
								  "dirlogodis": dirlogoDis[i]
								  };
						directory.push(json); */
						 titleval="<div class='row'><span class='menudir'><img  src='"+dirurl[i]+"' class='dirlogo' style='"+dirlogoDis[i]+"'></span><span><a style='"+dirbutton[i]+"' href='description.html?title="+locationtitile+"&id="+dirid[i]+"&header="+dirtitle[i]+"'><button class='dirbutton' >"+dirtitle[i]+"</button></a></span></div>";	
					titletotval=titletotval+titleval;
					  
					}
				 }
			}
			$("#titledir").append(titletotval);
				//console.log(directory[0]);
				/* function compare(a,b) {
                       if (a.title < b.title)
                           return -1;
                       if (a.title > b.title)
                           return 1;
                            return 0;
                             }
				directory.sort(compare);
				for(var i=0;i<directory.length;i++){
				  
					for(var j=i;j<directory.length;j++){
						if(directory[i].title.charAt(0)==directory[j].title.charAt(0)){
							titleval="<a href='description.html?title="+locationtitile+"&id="+directory[j].dirid+"&header="+directory[j].title+"'><li class='normalListStyle' ><img src='"+directory[j].dirlogo+"' class='dirlogo pull-left' style='"+directory[j].dirlogodis+"'>"+directory[j].title+"<img src='./img/right.jpg' class='pull-right'><p style='font-size:11px;"+titlecapDis+"' class='caps'>"+directory[j].caption+"</p></li></a>";
						    titletotval1=titletotval1+titleval;
							if(j==directory.length-1){
								character="<li class='mainStyleList'>"+directory[i].title.charAt(0)+"</li>"
							titletotval2=character+titletotval1;
							titletotval=titletotval+titletotval2;
							i=(directory.length-1);
							}
						}
						else{
							character="<li class='mainStyleList'>"+directory[i].title.charAt(0)+"</li>"
							titletotval2=character+titletotval1;
							titletotval=titletotval+titletotval2;
							i=j;
							j=j-1;
							titleval='';
							titletotval1='';
							//character="<h1>"+directory[i].title.charAt(0)+"</h1>"
						}
					}
				}
				
				var titlecomlete="<ul style='"+titledis+"'>"+titletotval+"</ul>"
				
				
			    $("#title").append(titlecomlete); */
		  event.stopPropagation();
	});
//search for food	
 $("#food").click(function(){
    //alert("The paragraph was clicked.");
	var textfood = "food"
	 var textdining = "dining";
	 var textrestaurant ="restaurant";
		 var resdining = new RegExp(textdining,"i");
		 var resfood = new RegExp(textfood,"i");
		 var resrestaurant = new RegExp(textrestaurant,"i");
		 $("#title").empty();
		 var dirresult=localStorage.getItem('directory');
		 var dRes=JSON.parse(dirresult);
		        var dirid=new Array();
				var directory=new Array();
				var dirtitle=new Array();
				var dircaption=new Array();
				var dirColor=new Array();
				var dirLogo=new Array();
				var dirurl=new Array();
				var styles=new Array();
				var TitleColor=new Array();
				var TitleFont=new Array();
				var dirlogoDis=new Array();
				var titleval;
				var titletotval="";
				var titletotval1="";
				var titletotval2="";
				var character="";
				var titledis="";
				var titlecapDis="";
				
				//dRes.sort();
				if(dRes.length==0){
					titledis='display:none';
				}
	            for(var i=0;i<dRes.length;i++){
					
					
						if((resdining.test(dRes[i].Title))||(resfood.test(dRes[i].Title))||(resrestaurant.test(dRes[i].Title))){
							if(dRes[i].LocationId==id){
							//console.log(dRes[i]);
						dirtitle[i]=dRes[i].Title;
						dircaption[i]=dRes[i].Caption;
						dirid[i]=dRes[i].objectId;
						dirLogo[i]=dRes[i].Picture;
						 styles[i]=dRes[i].StyleId;
						 if(dirLogo[i]!=undefined){
							 dirurl[i]=dirLogo[i].url;
							
						 }
						 else{
							  dirlogoDis[i]='display:none';
						 }
						if(styles[i]!=undefined)
						{
						 TitleColor[i]=styles[i].TitleColor;
						 TitleFont[i]=styles[i].TitleFont;
						 
						}
						if(dircaption[i]==undefined)
						{
						 titlecapDis='display:none';
						}
						//
						var json={"title":dirtitle[i],
								  "caption":dircaption[i],
								  "dirid":dirid[i],
								  "dirlogo":dirurl[i],
								  "titlecolor":TitleColor[i],
								  "titlefont": TitleFont[i],
								  "dirlogodis": dirlogoDis[i]
								  };
						directory.push(json);
					  // console.log(json);
					}
				 }
			}
				//console.log(directory[0]);
				function compare(a,b) {
                       if (a.title < b.title)
                           return -1;
                       if (a.title > b.title)
                           return 1;
                            return 0;
                             }
				directory.sort(compare);
				for(var i=0;i<directory.length;i++){
				  
					for(var j=i;j<directory.length;j++){
						if(directory[i].title.charAt(0)==directory[j].title.charAt(0)){
							titleval="<a href='description.html?title="+locationtitile+"&id="+directory[j].dirid+"&header="+directory[j].title+"'><li class='normalListStyle' ><img src='"+directory[j].dirlogo+"' class='dirlogo pull-left' style='"+directory[j].dirlogodis+"'>"+directory[j].title+"<img src='./img/right.jpg' class='pull-right'><p style='font-size:11px;"+titlecapDis+"' class='caps'>"+directory[j].caption+"</p></li></a>";
						    titletotval1=titletotval1+titleval;
							if(j==directory.length-1){
								character="<li class='mainStyleList'>"+directory[i].title.charAt(0)+"</li>"
							titletotval2=character+titletotval1;
							titletotval=titletotval+titletotval2;
							i=(directory.length-1);
							}
						}
						else{
							character="<li class='mainStyleList'>"+directory[i].title.charAt(0)+"</li>"
							titletotval2=character+titletotval1;
							titletotval=titletotval+titletotval2;
							i=j;
							j=j-1;
							titleval='';
							titletotval1='';
							//character="<h1>"+directory[i].title.charAt(0)+"</h1>"
						}
					}
				}
				
				var titlecomlete="<ul style='"+titledis+"'>"+titletotval+"</ul>"
				
				
			    $("#title").append(titlecomlete);
		  event.stopPropagation();
});

  //search for banking
   $("#banking").click(function(){
    //alert("The paragraph was clicked.");
	var textatm = "atm"
	 var textbank = "bank";
	 var textmoney ="money";
		 var resatm = new RegExp(textatm,"i");
		 var resbank = new RegExp(textbank,"i");
		 var resmoney = new RegExp(textmoney,"i");
		 $("#title").empty();
		 var dirresult=localStorage.getItem('directory');
		 var dRes=JSON.parse(dirresult);
		        var dirid=new Array();
				var directory=new Array();
				var dirtitle=new Array();
				var dircaption=new Array();
				var dirColor=new Array();
				var dirLogo=new Array();
				var dirurl=new Array();
				var styles=new Array();
				var TitleColor=new Array();
				var TitleFont=new Array();
				var dirlogoDis=new Array();
				var titleval;
				var titletotval="";
				var titletotval1="";
				var titletotval2="";
				var character="";
				var titledis="";
				var titlecapDis="";
				
				//dRes.sort();
				if(dRes.length==0){
					titledis='display:none';
				}
	            for(var i=0;i<dRes.length;i++){
					
					
						if((resatm.test(dRes[i].Title))||(resbank.test(dRes[i].Title))||(resmoney.test(dRes[i].Title))){
							if(dRes[i].LocationId==id){
						//	console.log(dRes[i]);
						dirtitle[i]=dRes[i].Title;
						dircaption[i]=dRes[i].Caption;
						dirid[i]=dRes[i].objectId;
						dirLogo[i]=dRes[i].Picture;
						 styles[i]=dRes[i].StyleId;
						 if(dirLogo[i]!=undefined){
							 dirurl[i]=dirLogo[i].url;
							
						 }
						 else{
							  dirlogoDis[i]='display:none';
						 }
						if(styles[i]!=undefined)
						{
						 TitleColor[i]=styles[i].TitleColor;
						 TitleFont[i]=styles[i].TitleFont;
						 
						}
						if(dircaption[i]==undefined)
						{
						 titlecapDis='display:none';
						}
						//
						var json={"title":dirtitle[i],
								  "caption":dircaption[i],
								  "dirid":dirid[i],
								  "dirlogo":dirurl[i],
								  "titlecolor":TitleColor[i],
								  "titlefont": TitleFont[i],
								  "dirlogodis": dirlogoDis[i]
								  };
						directory.push(json);
					  // console.log(json);
					}
				 }
			}
				//console.log(directory[0]);
				function compare(a,b) {
                       if (a.title < b.title)
                           return -1;
                       if (a.title > b.title)
                           return 1;
                            return 0;
                             }
				directory.sort(compare);
				for(var i=0;i<directory.length;i++){
				  
					for(var j=i;j<directory.length;j++){
						if(directory[i].title.charAt(0)==directory[j].title.charAt(0)){
							titleval="<a href='description.html?title="+locationtitile+"&id="+directory[j].dirid+"&header="+directory[j].title+"'><li class='normalListStyle' ><img src='"+directory[j].dirlogo+"' class='dirlogo pull-left' style='"+directory[j].dirlogodis+"'>"+directory[j].title+"<img src='./img/right.jpg' class='pull-right'><p style='font-size:11px;"+titlecapDis+"' class='caps'>"+directory[j].caption+"</p></li></a>";
						    titletotval1=titletotval1+titleval;
							if(j==directory.length-1){
								character="<li class='mainStyleList'>"+directory[i].title.charAt(0)+"</li>"
							titletotval2=character+titletotval1;
							titletotval=titletotval+titletotval2;
							i=(directory.length-1);
							}
						}
						else{
							character="<li class='mainStyleList'>"+directory[i].title.charAt(0)+"</li>"
							titletotval2=character+titletotval1;
							titletotval=titletotval+titletotval2;
							i=j;
							j=j-1;
							titleval='';
							titletotval1='';
							//character="<h1>"+directory[i].title.charAt(0)+"</h1>"
						}
					}
				}
				
				var titlecomlete="<ul style='"+titledis+"'>"+titletotval+"</ul>"
				
				
			    $("#title").append(titlecomlete);
		  event.stopPropagation();
});
 //search for transport 
 $("#transport").click(function(){
    //alert("The paragraph was clicked.");
	var texttransport = "transport"
	 var textairport = "airport";
		 var restransport = new RegExp(texttransport,"i");
		 var resairport = new RegExp(textairport,"i");
		 $("#title").empty();
		 var dirresult=localStorage.getItem('directory');
		 var dRes=JSON.parse(dirresult);
		        var dirid=new Array();
				var directory=new Array();
				var dirtitle=new Array();
				var dircaption=new Array();
				var dirColor=new Array();
				var dirLogo=new Array();
				var dirurl=new Array();
				var styles=new Array();
				var TitleColor=new Array();
				var TitleFont=new Array();
				var dirlogoDis=new Array();
				var titleval;
				var titletotval="";
				var titletotval1="";
				var titletotval2="";
				var character="";
				var titledis="";
				var titlecapDis="";
				
				//dRes.sort();
				if(dRes.length==0){
					titledis='display:none';
				}
	            for(var i=0;i<dRes.length;i++){
					
					
						if((restransport.test(dRes[i].Title))||(resairport.test(dRes[i].Title))){
							if(dRes[i].LocationId==id){
							//console.log(dRes[i]);
						dirtitle[i]=dRes[i].Title;
						dircaption[i]=dRes[i].Caption;
						dirid[i]=dRes[i].objectId;
						dirLogo[i]=dRes[i].Picture;
						 styles[i]=dRes[i].StyleId;
						 if(dirLogo[i]!=undefined){
							 dirurl[i]=dirLogo[i].url;
							
						 }
						 else{
							  dirlogoDis[i]='display:none';
						 }
						if(styles[i]!=undefined)
						{
						 TitleColor[i]=styles[i].TitleColor;
						 TitleFont[i]=styles[i].TitleFont;
						 
						}
						if(dircaption[i]==undefined)
						{
						 titlecapDis='display:none';
						}
						//
						var json={"title":dirtitle[i],
								  "caption":dircaption[i],
								  "dirid":dirid[i],
								  "dirlogo":dirurl[i],
								  "titlecolor":TitleColor[i],
								  "titlefont": TitleFont[i],
								  "dirlogodis": dirlogoDis[i]
								  };
						directory.push(json);
					//   console.log(json);
					}
				 }
			}
				//console.log(directory[0]);
				function compare(a,b) {
                       if (a.title < b.title)
                           return -1;
                       if (a.title > b.title)
                           return 1;
                            return 0;
                             }
				directory.sort(compare);
				for(var i=0;i<directory.length;i++){
				  
					for(var j=i;j<directory.length;j++){
						if(directory[i].title.charAt(0)==directory[j].title.charAt(0)){
							
								titleval="<a href='description.html?title="+locationtitile+"&id="+directory[j].dirid+"&header="+directory[j].title+"'><li class='normalListStyle' ><img src='"+directory[j].dirlogo+"' class='dirlogo pull-left' style='"+directory[j].dirlogodis+"'>"+directory[j].title+"<img src='./img/right.jpg' class='pull-right'><p style='font-size:11px;"+titlecapDis+"' class='caps'>"+directory[j].caption+"</p></li></a>";
								titletotval1=titletotval1+titleval;
								if(j==directory.length-1){
									character="<li class='mainStyleList'>"+directory[i].title.charAt(0)+"</li>"
								titletotval2=character+titletotval1;
								titletotval=titletotval+titletotval2;
								i=(directory.length-1);
								}
						}
						else{
							character="<li class='mainStyleList'>"+directory[i].title.charAt(0)+"</li>"
							titletotval2=character+titletotval1;
							titletotval=titletotval+titletotval2;
							i=j;
							j=j-1;
							titleval='';
							titletotval1='';
							//character="<h1>"+directory[i].title.charAt(0)+"</h1>"
						}
					}
				}
				
				var titlecomlete="<ul style='"+titledis+"'>"+titletotval+"</ul>"
				
				
			    $("#title").append(titlecomlete);
		  event.stopPropagation();
});
	

  
	