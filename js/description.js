 var PARSE_APP = "FAbluZyN0hpXGpudGXrt9WOgvUQCxey3KEGALLle";
 var PARSE_JS = "diTLB99p5GHZED8SDzZ4ysNMMyXTXzJOcJi2Qww6";
 var urlid=new Array();
 var dirparentid=new Array();
 var id,locationtitle;
function myDescription(){
        var query = window.location.search.substr(1);
        var idresult = {};
	    var phonesfont='',phonescolor='';
        query.split("&").forEach(function(part) {
        var item = part.split("=");
        idresult[item[0]] = decodeURIComponent(item[1]);
		urlid.push(idresult[item[0]]);
		//console.log(urlid[0])
		});
         var headertitle=urlid[2];		
	      id=urlid[1];
		 var location=urlid[0];
		 locationtitle=location;
		$("#location").append(location);
		
		var dirresult=localStorage.getItem('directory');
		var dRes=JSON.parse(dirresult);
		//console.log(dRes);
		var directory=new Array();
		var descurl,descweb,descdata,desctitle,descres=0;
		for(var i=0;i<dRes.length;i++){
			if(dRes[i].ParentDirectoryId==id){
				 var dirid=new Array();
					
					var dirtitle=new Array();
					var dircaption=new Array();
					var dirorder=new Array();
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
					var titlecapDis="";
					
					
						dirtitle[i]=dRes[i].Title;
						dircaption[i]=dRes[i].Caption;
						dirLogo[i]=dRes[i].Picture;
						dirorder[i]=dRes[i].CustomizedOrder;
						dirparentid[i]=dRes[i].LocationId;
						//console.log(dirparentid[i]);
						dirid[i]=dRes[i].objectId;
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
						if(dircaption[i]==undefined){
							titlecapDis='display:none;';
						}
						//console.log(dirorder[i]);
						var json={"title":dirtitle[i],
								  "caption":dircaption[i],
								  "dirid":dirid[i],
								  "dirlogo":dirurl[i],
								  "titlecolor":TitleColor[i],
								  "titlefont": TitleFont[i],
								   "dirlogodis": dirlogoDis[i],
								   "dirorder": dirorder[i]
								  };
								  
						directory.push(json);
						
					function compareorder(a,b) {
						   if (a.dirorder < b.dirorder)
							   return -1;
						   if (a.dirorder > b.dirorder)
							   return 1;
								return 0;
								 }
					
					function compare(a,b) {
						   if (a.title < b.title)
							   return -1;
						   if (a.title > b.title)
							   return 1;
								return 0;
								 }
					if(typeof dirorder !== 'undefined'){
						directory.sort(compareorder);
					}else{
						directory.sort(compare);
					}
					
					
					
			}
			else
			{
				if(dRes[i].objectId==id){
					var pic,dirtitle='',dircaption='',dirnote='',dirdesc='',dirloc='',dirtiming='',dirprice='',dirwebsite='',websiteDis='',diremail='',emailDis='',dirpicture='',pictureDis='',dirParentid='';
					var styles,titlefont='',titlecolor='',captionfont='',captioncolor='',descrptionfont='',descriptioncolor='',timingsfont='';
					var timingscolor='',pricefont='',pricecolor='',websitefont='',websitecolor='',emailfont='',emailcolor='' ,priceDis='';				
					dirtitle=dRes[i].Title;
					dircaption=dRes[i].Caption;
					dirnote=dRes[i].Note;
					dirdesc=dRes[i].Description;
					dirloc=dRes[i].Location;
					dirtiming=dRes[i].Timings;
					dirprice=dRes[i].Price;
					dirwebsite=dRes[i].Website;
					dirpicture=dRes[i].Picture;
					diremail=dRes[i].Email;
					dirParentid=dRes[i].LocationId;
					//styles=dRes[i].StyleId;
					//console.log(dRes[i].StyleId.objectId);
					var objid=dRes[i].StyleId.objectId;
					var val=localStorage.getItem('Style');
	                var StyleId=JSON.parse(val);
				   // console.log(StyleId)
					for(var j=0;j<StyleId.length;j++){
						if(StyleId[j].objectId==objid){
					titlefont=StyleId[j].TitleFont;
					titlecolor=StyleId[j].TitleColor;
					captionfont=StyleId[j].CaptionFont;
					captioncolor=StyleId[j].CaptionColor;
					descrptionfont=StyleId[j].DescriptionFont;
					descriptioncolor=StyleId[j].DescriptionColor;
					phonesfont=StyleId[j].PhonesFont;
					phonescolor=StyleId[j].PhonesColor;
					timingsfont=StyleId[j].TimingsFont;
					timingscolor=StyleId[j].TimingsColor;
					pricecolor=StyleId[j].PriceColor;
					pricefont=StyleId[j].PriceFont;
					websitefont=StyleId[j].WebsiteFont;
					websitecolor=StyleId[j].WebsiteColor;
					emailfont=StyleId[j].EmailFont;
					emailcolor=StyleId[j].EmailColor;
						}
					}
					
					
					if(dirpicture!=undefined)
					{
					 pic=dirpicture.url;
					}
					if((dircaption==undefined)||(dircaption==''))
					{dircaption='';}
					if((dirnote==undefined)||(dirnote==''))
					{dirnote='';}
					if((dirdesc==undefined)||(dirdesc==''))
					{dirdesc='';}
					if((dirloc==undefined)||(dirloc==''))
					{dirloc='';}
					if((dirtiming==undefined)||(dirtiming==''))
					{dirtiming='';}
					 if((dirprice==undefined)||(dirprice==''))
					{dirprice=''; priceDis='display:none;';}
					if((dirwebsite==undefined)||(dirwebsite==''))
					{dirwebsite='';websiteDis='display:none';}
					if((dirpicture==undefined)||(dirpicture==''))
					{dirpicture='';pictureDis='display:none';}
					if((diremail==undefined)||(diremail==''))
					{diremail='';emailDis='display:none;';}
					//console.log(titlecolor);
					//console.log(titlefont);
				   descurl="directories.html?id="+dirParentid;
				   descdata= "<p >"+dirnote+"</p>"+
					 "<p style='text-align:justify;font-size:"+descrptionfont+"px !important;color:"+descriptioncolor+" !important;'>"+dirdesc+"</p>"+
					 " <p>"+dirloc+"</p>"+
					 "<p style='font-size:"+timingsfont+"px !important;color:"+timingscolor+" !important;'>"+dirtiming+"</p><p style='font-size:"+pricefont+"px !important;color:"+pricecolor+" !important;"+priceDis+"'>Price: "+dirprice+"</p>"+
					 "<p style='font-size:"+emailfont+"px !important;color:"+emailcolor+" !important;"+emailDis+"'>Email:<a href='mailto:"+diremail+"'>"+diremail+"</a></p>"+
					 " <center><img style='"+pictureDis+"' src='"+pic+"' class='detail-image img-responsive img-rounded margin' ></center></br></br>";
					  descweb="<p style='"+websiteDis+"'><a  data-role='button' class='linkbutton ui-btn ui-shadow ui-btn-corner-all ui-btn-hover-c ui-btn-up-c' target='_blank' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='c' href='http://"+dirwebsite+"'><span class='ui-btn-inner ui-btn-corner-all'><span class='ui-btn-text' style='font-size:"+websitefont+"px !important;color:"+websitecolor+" !important;'>Website:"+dirwebsite+"</span></span></a></p>";
					  desctitle=" <div class='container'><div class='row'><div class='col-md-12'><h3 class='text-center backIconHover titlemargin'><p style='font-size:"+titlefont+"px !important;color:"+titlecolor+" !important;'>"+dirtitle+"</p>"+
								 "<p style='font-size:"+captionfont+"px !important;color:"+captioncolor+" !important;'>"+dircaption+"</p></h3>"+
								 "</div></div></div>";
					//	console.log(desctitle);
					descres=1;
				
						
					
					 			 
					
				}
			}
		}
		
		if(directory.length!=0){
		 for(var i=0;i<directory.length;i++){
					  
						for(var j=i;j<directory.length;j++){
							if(directory[i].title.charAt(0)==directory[j].title.charAt(0)){
								
								titleval="<a href='description.html?title="+location+"&id="+directory[j].dirid+"&header="+directory[j].title+"'><li class='normalListStyle' ><img src='"+directory[j].dirlogo+"' class='dirlogo pull-left' style='"+directory[j].dirlogodis+"'>"+directory[j].title+"<img src='./img/right.jpg' class='pull-right'><p style='font-size:11px;"+titlecapDis+"' class='caps'>"+directory[j].caption+"</p></li></a>";
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
								//character="<h1>"+directory[i].title.charAt(0)+"</h1>"
							}
						}
					}
					
					var url="directories.html?id="+dirParentid;
					
					var title=" <div class='container'><div class='row'><div class='col-md-12'><h4 class='text-center backIconHover titlemargin'><p>"+headertitle+"</p>"+"</h4>"+
								 "</div></div></div>";
				    $(".parentid").attr("href",url);
					$(".title").append(title);
					$("#title").append(titletotval);
					$("#search").show();
		}
        else{
			if(descres==1){
			$("#web").append(descweb);
					 $("#data").append(descdata);
					$(".title").append(desctitle);
					$(".parentid").attr("href",descurl);
		}
		}
		
		
	
	  
			
			
		 var val=localStorage.getItem('phones');
	         var pRes=JSON.parse(val);
			
	          var phonetype=new Array();
			  var phoneext=new Array();
			  var phonetot='',phone;
			  if((pRes.length)!=0){
			  for(var i=0;i<pRes.length;i++){
				   
				
						if((pRes[i].PhoneId)==id){
							
								phonetype[i]=pRes[i].Type;
								phoneext[i]=pRes[i].Ext;
								
								
								if(phonetype[i]=="phone"){
									 phone="<p><a  data-role='button' class='linkbutton ui-btn ui-shadow ui-btn-corner-all ui-btn-hover-c ui-btn-up-c' target='_new' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='c' href='tel:"+phoneext[i]+"'><span class='ui-btn-inner ui-btn-corner-all'><span class='ui-btn-text' style='font-size:"+phonesfont+"px !important;color:"+phonescolor+" !important;'>"+phonetype[i]+":"+phoneext[i]+"</span></span></a></p>";
								}
								if(phonetype[i]=="email"){
									 phone="<p><a  data-role='button' class='linkbutton ui-btn ui-shadow ui-btn-corner-all ui-btn-hover-c ui-btn-up-c' target='_new' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='c' href='mailto:"+phoneext[i]+"'><span class='ui-btn-inner ui-btn-corner-all'><span class='ui-btn-text' style='font-size:"+phonesfont+"px !important;color:"+phonescolor+" !important;'>"+phonetype[i]+":"+phoneext[i]+"</span></span></a></p>";
								}
								if(phonetype[i]=="website"){
									phone="<p><a  data-role='button' class='linkbutton ui-btn ui-shadow ui-btn-corner-all ui-btn-hover-c ui-btn-up-c' target='_blank' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='c' href='http://"+phoneext[i]+"'><span class='ui-btn-inner ui-btn-corner-all'><span class='ui-btn-text' style='font-size:"+phonesfont+"px !important;color:"+phonescolor+" !important;'>"+phonetype[i]+":"+phoneext[i]+"</span></span></a></p>";
								}
							phonetot=phonetot+phone;	  	
						}
						
					}
					 
				 
			  }
			
			$("#phone").append(phonetot);
			
			
			
			
			
	   var val=localStorage.getItem('menu');
	         var mRes=JSON.parse(val);
			 // console.log(mRes[0]);
	
	var description=new Array();
			var price=new Array();
			var pricefont=new Array();
			var pricecolor=new Array();
			var descriptioncolor=new Array();
			var descrptionfont=new Array();
			var totalmenu='',menu;
			//console.log(mRes);
			if((mRes.length)!=0){
				for(var i=0;i<mRes.length;i++){
					if(mRes[i].MenuId==id){
							 description[i]=mRes[i].Description;
							 price[i]=mRes[i].Price;
						//	 console.log(mRes[i].StyleID);
							 var objid=mRes[i].StyleID.objectId
							 var val=localStorage.getItem('Style');
							  var result=JSON.parse(val);
							for(var j=0;j<result.length;j++){
							  if(result[j].objectId==objid){
									 pricecolor[i]=result[j].PriceColor;
									 pricefont[i]=result[j].PriceFont;
									 descriptioncolor[i]=result[j].DescriptionColor;
									 descrptionfont[i]=result[j].DescriptionFont;
							  }
						  }
						 
						 menu="<tr><td class='tabheight' style='text-align:justify;font-size:"+descrptionfont[i]+"px !important;color:"+descriptioncolor[i]+" !important;padding-right:60px;padding-bottom:30px;' >"+description[i]+"</td><td class='tabheight' style='font-size:"+pricefont[i]+"px !important;color:"+pricecolor[i]+" !important;padding-bottom:30px;' >"+price[i]+"</td></tr><tr></tr><tr></tr>";
						 totalmenu=totalmenu+menu;
					}
				}
			  fullmenu="<table>"+totalmenu+"</table>"
			$("#menu").append(fullmenu);
			}
}
	
	//search box
	$('#textbox').on("input",function(event){
	  	var textres = $(this).val();
		var res = new RegExp(textres,"i");
		 $("#title").empty();
		 var parentid=localStorage.getItem('parentid');
		var parentres=JSON.parse(parentid);
		// console.log(parentres);
		  var dirresult=localStorage.getItem('directory');
		  var dRes=JSON.parse(dirresult);
		  var directory=new Array();
		    for(var i=0;i<dRes.length;i++){
				if((res.test(dRes[i].Title))||(res.test(dRes[i].Keywords))){
			   if(dRes[i].LocationId==parentres){
				 var dirid=new Array();
					
					var dirtitle=new Array();
					var dircaption=new Array();
					var dirparentid=new Array();
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
					var titlecapDis="";
					
					
						dirtitle[i]=dRes[i].Title;
						dircaption[i]=dRes[i].Caption;
						dirLogo[i]=dRes[i].DirectoryLogo;
						dirparentid[i]=dRes[i].LocationId;
						dirid[i]=dRes[i].objectId;
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
						if(dircaption[i]==undefined){
							titlecapDis='display:none;';
						}
						var json={"title":dirtitle[i],
								  "caption":dircaption[i],
								  "dirid":dirid[i],
								  "dirlogo":dirurl[i],
								  "titlecolor":TitleColor[i],
								  "titlefont": TitleFont[i],
								   "dirlogodis": dirlogoDis[i]
								  };
						directory.push(json);
						
					
					
					function compare(a,b) {
						   if (a.title < b.title)
							   return -1;
						   if (a.title > b.title)
							   return 1;
								return 0;
								 }
					directory.sort(compare);
					
					
			}
		  }
			}
		  if(directory.length!=0){
		    for(var i=0;i<directory.length;i++){
					  
						for(var j=i;j<directory.length;j++){
							if(directory[i].title.charAt(0)==directory[j].title.charAt(0)){
								titleval="<a href='description.html?title="+locationtitle+"&id="+directory[j].dirid+"&header="+directory[j].title+"'><li class='normalListStyle' ><img src='"+directory[j].dirlogo+"' class='dirlogo pull-left' style='"+directory[j].dirlogodis+"'>"+directory[j].title+"<img src='./img/right.jpg' class='pull-right'><p style='font-size:11px;"+titlecapDis+"' class='caps'>"+directory[j].caption+"</p></li></a>";
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
								//character="<h1>"+directory[i].title.charAt(0)+"</h1>"
							}
						}
					}
					
					//var url="directories.html?id="+dirParentid[0];
					
				//	var title=" <div class='container'><div class='row'><div class='col-md-12'><h4 class='text-center backIconHover titlemargin'><p>"+headertitle+"</p>"+"</h4>"+
								// "</div></div></div>";
				    //$(".parentid").attr("href",url);
					//$(".title").append(title);
					$("#title").append(titletotval);
					$("#search").show();
		}
		  
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
		 $("#data").empty();
		 $("#title").empty();
		  $(".title").empty();
		  $("#web").empty();
		  $("#menu").empty();
		  $("#phone").empty();
		 var parentid=localStorage.getItem('parentid');
		var parentres=JSON.parse(parentid);
		 //console.log(parentres);
		  var dirresult=localStorage.getItem('directory');
		  var dRes=JSON.parse(dirresult);
		  var directory=new Array();
		    for(var i=0;i<dRes.length;i++){
				if((resfood.test(dRes[i].Title))||(resdining.test(dRes[i].Title))||(resrestaurant.test(dRes[i].Title))){
			   if(dRes[i].LocationId==parentres){
				 var dirid=new Array();
					
					var dirtitle=new Array();
					var dircaption=new Array();
					var dirparentid=new Array();
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
					var titlecapDis="";
					
					
						dirtitle[i]=dRes[i].Title;
						dircaption[i]=dRes[i].Caption;
						dirLogo[i]=dRes[i].DirectoryLogo;
						dirparentid[i]=dRes[i].LocationId;
						dirid[i]=dRes[i].objectId;
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
						if(dircaption[i]==undefined){
							titlecapDis='display:none;';
						}
						var json={"title":dirtitle[i],
								  "caption":dircaption[i],
								  "dirid":dirid[i],
								  "dirlogo":dirurl[i],
								  "titlecolor":TitleColor[i],
								  "titlefont": TitleFont[i],
								   "dirlogodis": dirlogoDis[i]
								  };
						directory.push(json);
						
					
					
					function compare(a,b) {
						   if (a.title < b.title)
							   return -1;
						   if (a.title > b.title)
							   return 1;
								return 0;
								 }
					directory.sort(compare);
					
					
			}
		  }
			}
		  if(directory.length!=0){
		    for(var i=0;i<directory.length;i++){
					  
						for(var j=i;j<directory.length;j++){
							if(directory[i].title.charAt(0)==directory[j].title.charAt(0)){
								titleval="<a href='description.html?title="+locationtitle+"&id="+directory[j].dirid+"&header="+directory[j].title+"'><li class='normalListStyle' ><img src='"+directory[j].dirlogo+"' class='dirlogo pull-left' style='"+directory[j].dirlogodis+"'>"+directory[j].title+"<img src='./img/right.jpg' class='pull-right'><p style='font-size:11px;"+titlecapDis+"' class='caps'>"+directory[j].caption+"</p></li></a>";
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
								//character="<h1>"+directory[i].title.charAt(0)+"</h1>"
							}
						}
					}
					
					//var url="directories.html?id="+dirParentid[0];
					
				//	var title=" <div class='container'><div class='row'><div class='col-md-12'><h4 class='text-center backIconHover titlemargin'><p>"+headertitle+"</p>"+"</h4>"+
								// "</div></div></div>";
				    //$(".parentid").attr("href",url);
					//$(".title").append(title);
					$("#title").append(titletotval);
					$("#search").show();
		}
		  
		    event.stopPropagation();
		 
});
//search for banking
$("#banking").click(function(){
    
		var textatm = "atm"
	 var textbank = "bank";
	 var textmoney ="money";
		 var resatm = new RegExp(textatm,"i");
		 var resbank = new RegExp(textbank,"i");
		 var resmoney = new RegExp(textmoney,"i");
		 
		 $("#data").empty();
		 $("#title").empty();
		  $(".title").empty();
		   $("#web").empty();
		  $("#menu").empty();
		  $("#phone").empty();
		 var parentid=localStorage.getItem('parentid');
		var parentres=JSON.parse(parentid);
		// console.log(parentres);
		  var dirresult=localStorage.getItem('directory');
		  var dRes=JSON.parse(dirresult);
		  var directory=new Array();
		    for(var i=0;i<dRes.length;i++){
				if((resatm.test(dRes[i].Title))||(resbank.test(dRes[i].Title))||(resmoney.test(dRes[i].Title))){
			   if(dRes[i].LocationId==parentres){
				 var dirid=new Array();
					
					var dirtitle=new Array();
					var dircaption=new Array();
					var dirparentid=new Array();
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
					var titlecapDis="";
					
					
						dirtitle[i]=dRes[i].Title;
						dircaption[i]=dRes[i].Caption;
						dirLogo[i]=dRes[i].DirectoryLogo;
						dirparentid[i]=dRes[i].LocationId;
						dirid[i]=dRes[i].objectId;
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
						if(dircaption[i]==undefined){
							titlecapDis='display:none;';
						}
						var json={"title":dirtitle[i],
								  "caption":dircaption[i],
								  "dirid":dirid[i],
								  "dirlogo":dirurl[i],
								  "titlecolor":TitleColor[i],
								  "titlefont": TitleFont[i],
								   "dirlogodis": dirlogoDis[i]
								  };
						directory.push(json);
						
					
					
					function compare(a,b) {
						   if (a.title < b.title)
							   return -1;
						   if (a.title > b.title)
							   return 1;
								return 0;
								 }
					directory.sort(compare);
					
					
			}
		  }
			}
		  if(directory.length!=0){
		    for(var i=0;i<directory.length;i++){
					  
						for(var j=i;j<directory.length;j++){
							if(directory[i].title.charAt(0)==directory[j].title.charAt(0)){
								titleval="<a href='description.html?title="+locationtitle+"&id="+directory[j].dirid+"&header="+directory[j].title+"'><li class='normalListStyle' ><img src='"+directory[j].dirlogo+"' class='dirlogo pull-left' style='"+directory[j].dirlogodis+"'>"+directory[j].title+"<img src='./img/right.jpg' class='pull-right'><p style='font-size:11px;"+titlecapDis+"' class='caps'>"+directory[j].caption+"</p></li></a>";
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
								//character="<h1>"+directory[i].title.charAt(0)+"</h1>"
							}
						}
					}
					
					//var url="directories.html?id="+dirParentid[0];
					
				//	var title=" <div class='container'><div class='row'><div class='col-md-12'><h4 class='text-center backIconHover titlemargin'><p>"+headertitle+"</p>"+"</h4>"+
								// "</div></div></div>";
				    //$(".parentid").attr("href",url);
					//$(".title").append(title);
					$("#title").append(titletotval);
					$("#search").show();
		}
		  
		    event.stopPropagation();
		 
});
//search for transport
$("#transport").click(function(){
    
		var texttransport = "transport"
	 var textairport = "airport";
		 var restransport = new RegExp(texttransport,"i");
		 var resairport = new RegExp(textairport,"i");
		 
		 $("#data").empty();
		 $("#title").empty();
		  $("#web").empty();
		  $(".title").empty();
		  $("#menu").empty();
		  $("#phone").empty();
		 var parentid=localStorage.getItem('parentid');
		var parentres=JSON.parse(parentid);
		// console.log(parentres);
		  var dirresult=localStorage.getItem('directory');
		  var dRes=JSON.parse(dirresult);
		  var directory=new Array();
		    for(var i=0;i<dRes.length;i++){
				if((restransport.test(dRes[i].Title))||(resairport.test(dRes[i].Title))){
			   if(dRes[i].LocationId==parentres){
				 var dirid=new Array();
					
					var dirtitle=new Array();
					var dircaption=new Array();
					var dirparentid=new Array();
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
					var titlecapDis="";
					
					
						dirtitle[i]=dRes[i].Title;
						dircaption[i]=dRes[i].Caption;
						dirLogo[i]=dRes[i].DirectoryLogo;
						dirparentid[i]=dRes[i].LocationId;
						dirid[i]=dRes[i].objectId;
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
						if(dircaption[i]==undefined){
							titlecapDis='display:none;';
						}
						var json={"title":dirtitle[i],
								  "caption":dircaption[i],
								  "dirid":dirid[i],
								  "dirlogo":dirurl[i],
								  "titlecolor":TitleColor[i],
								  "titlefont": TitleFont[i],
								   "dirlogodis": dirlogoDis[i]
								  };
						directory.push(json);
						
					
					
					function compare(a,b) {
						   if (a.title < b.title)
							   return -1;
						   if (a.title > b.title)
							   return 1;
								return 0;
								 }
					directory.sort(compare);
					
					
			}
		  }
			}
		  if(directory.length!=0){
		    for(var i=0;i<directory.length;i++){
					  
						for(var j=i;j<directory.length;j++){
							if(directory[i].title.charAt(0)==directory[j].title.charAt(0)){
								titleval="<a href='description.html?title="+locationtitle+"&id="+directory[j].dirid+"&header="+directory[j].title+"'><li class='normalListStyle' ><img src='"+directory[j].dirlogo+"' class='dirlogo pull-left' style='"+directory[j].dirlogodis+"'>"+directory[j].title+"<img src='./img/right.jpg' class='pull-right'><p style='font-size:11px;"+titlecapDis+"' class='caps'>"+directory[j].caption+"</p></li></a>";
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
								//character="<h1>"+directory[i].title.charAt(0)+"</h1>"
							}
						}
					}
					
					//var url="directories.html?id="+dirParentid[0];
					
				//	var title=" <div class='container'><div class='row'><div class='col-md-12'><h4 class='text-center backIconHover titlemargin'><p>"+headertitle+"</p>"+"</h4>"+
								// "</div></div></div>";
				    //$(".parentid").attr("href",url);
					//$(".title").append(title);
					$("#title").append(titletotval);
					$("#search").show();
		}
		  
		    event.stopPropagation();
		 
});
