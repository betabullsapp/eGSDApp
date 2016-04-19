    var PARSE_APP = "FAbluZyN0hpXGpudGXrt9WOgvUQCxey3KEGALLle";
    var PARSE_JS = "diTLB99p5GHZED8SDzZ4ysNMMyXTXzJOcJi2Qww6";
	var id;
	var locationtitile;
	
	 function myFunction()
  {    
	   var query = location.search.substr(1);
       var idresult = {};
        query.split("&").forEach(function(part) {
        var item = part.split("=");
        idresult[item[0]] = decodeURIComponent(item[1]);
		id=idresult[item[0]];
        localStorage.setItem( 'parentid',JSON.stringify(id));
		
		});
		
	var dirid=new Array();
	
	 var val=localStorage.getItem('itemIndex');
	 var result=JSON.parse(val);
	  for(var i=0;i<result.length;i++){
		  if(result[i].objectId==id)
		  {
			  locationtitile=result[i].Name;
			  console.log(locationtitile);
		  }
		 
	  }
	   $("#location").append(locationtitile);
	  
	    var dirresult=localStorage.getItem('directory');
		var dRes=JSON.parse(dirresult);
		
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
					//console.log(dRes[i]);
					if(dRes[i].DirectoryID==id){
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
			   console.log(json);
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
							titleval="<a href='description.html?title="+locationtitile+"&id="+directory[j].dirid+"&header="+directory[j].title+"'><li class='normalListStyle' ><img src='"+directory[j].dirlogo+"' class='dirlogo pull-left' style='"+directory[j].dirlogodis+"'>"+directory[j].title+"<i class='fa fa-chevron-right pull-right itemIcon'></i><p style='font-size:11px;"+titlecapDis+"' class='caps'>"+directory[j].caption+"</p></li></a>";
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
				
				
			    $("#title").append(titlecomlete);
			
	   
  }
 //search box
	$('#textbox').on("input",function(event){
		 var textres = $(this).val();
		 var res = new RegExp(textres,"i");
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
					
					
						if((res.test(dRes[i].Title))||(res.test(dRes[i].Keywords))){
							if(dRes[i].ParentReferrence==id){
							console.log(dRes[i]);
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
					   console.log(json);
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
							titleval="<a href='description.html?title="+locationtitile+"&id="+directory[j].dirid+"&header="+directory[j].title+"'><li class='normalListStyle' ><img src='"+directory[j].dirlogo+"' class='dirlogo pull-left' style='"+directory[j].dirlogodis+"'>"+directory[j].title+"<i class='fa fa-chevron-right pull-right itemIcon'></i><p style='font-size:11px;"+titlecapDis+"' class='caps'>"+directory[j].caption+"</p></li></a>";
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
							if(dRes[i].ParentReferrence==id){
							console.log(dRes[i]);
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
					   console.log(json);
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
							titleval="<a href='description.html?title="+locationtitile+"&id="+directory[j].dirid+"&header="+directory[j].title+"'><li class='normalListStyle' ><img src='"+directory[j].dirlogo+"' class='dirlogo pull-left' style='"+directory[j].dirlogodis+"'>"+directory[j].title+"<i class='fa fa-chevron-right pull-right itemIcon'></i><p style='font-size:11px;"+titlecapDis+"' class='caps'>"+directory[j].caption+"</p></li></a>";
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
 //search for food  
 $("#food").click(function(){
    
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
							if(dRes[i].ParentReferrence==id){
							console.log(dRes[i]);
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
					   console.log(json);
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
							titleval="<a href='description.html?title="+locationtitile+"&id="+directory[j].dirid+"&header="+directory[j].title+"'><li class='normalListStyle' ><img src='"+directory[j].dirlogo+"' class='dirlogo pull-left' style='"+directory[j].dirlogodis+"'>"+directory[j].title+"<i class='fa fa-chevron-right pull-right itemIcon'></i><p style='font-size:11px;"+titlecapDis+"' class='caps'>"+directory[j].caption+"</p></li></a>";
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
							if(dRes[i].ParentReferrence==id){
							console.log(dRes[i]);
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
					   console.log(json);
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
							titleval="<a href='description.html?title="+locationtitile+"&id="+directory[j].dirid+"&header="+directory[j].title+"'><li class='normalListStyle' ><img src='"+directory[j].dirlogo+"' class='dirlogo pull-left' style='"+directory[j].dirlogodis+"'>"+directory[j].title+"<i class='fa fa-chevron-right pull-right itemIcon'></i><p style='font-size:11px;"+titlecapDis+"' class='caps'>"+directory[j].caption+"</p></li></a>";
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
							if(dRes[i].ParentReferrence==id){
							console.log(dRes[i]);
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
					   console.log(json);
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
							
								titleval="<a href='description.html?title="+locationtitile+"&id="+directory[j].dirid+"&header="+directory[j].title+"'><li class='normalListStyle' ><img src='"+directory[j].dirlogo+"' class='dirlogo pull-left' style='"+directory[j].dirlogodis+"'>"+directory[j].title+"<i class='fa fa-chevron-right pull-right itemIcon'></i><p style='font-size:11px;"+titlecapDis+"' class='caps'>"+directory[j].caption+"</p></li></a>";
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
	

