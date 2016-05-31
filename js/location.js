    var PARSE_APP = "FAbluZyN0hpXGpudGXrt9WOgvUQCxey3KEGALLle";
    var PARSE_JS = "diTLB99p5GHZED8SDzZ4ysNMMyXTXzJOcJi2Qww6";
	var id,LocationStyleid;
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
			//console.log(hRes.length)
			if((hRes!=null)&&(hRes.length>0)&&(hRes[0].objectId==id)){
			//localstorage hotel	
			  showHotel();
			}else{
				localStorage.clear();
				
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
								  locationstyle=result[0].get("StyleId");
								     LocationStyleid=locationstyle.id 
									console.log(LocationStyleid)
									/* if(LocationStyleid!=undefined){
									   var locStyle = Parse.Object.extend("Style");
									   var StyleQuery = new Parse.Query(locStyle);
									   StyleQuery.equalTo('objectId',LocationStyleid);
									   StyleQuery.find().then(function(result1){
										   console.log(result1)
										   localStorage.setItem('locationBrandstyle',JSON.stringify(result1));
										   var val=localStorage.getItem('locationBrandstyle');
							               var styleId=JSON.parse(val);
								             console.log(styleId)
									   });
								 	} */
							}
				          }).then(function(){
							
							 if(LocationStyleid!=undefined){
									   var locStyle = Parse.Object.extend("Style");
									   var StyleQuery = new Parse.Query(locStyle);
									   StyleQuery.equalTo('objectId',LocationStyleid);
									   StyleQuery.find().then(function(result1){
										   console.log(result1)
										   localStorage.setItem('locationBrandstyle',JSON.stringify(result1));
									   });
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
								}
								});
							}).then(function(){
							//getting menu icons							  
							 var MenuItem = Parse.Object.extend("HotelMenuList");
							   var MenuQuery = new Parse.Query(MenuItem);
							   MenuQuery.equalTo('HotelId',id);
							   MenuQuery.find().then(function(menuRes){
								   localStorage.setItem( 'HotelMenu',JSON.stringify(menuRes));
								   	  var menuDesc=new Array();
									  var menuSequence=new Array();
									  var menuIcon=new Array();
									  var menuIconSeq=new Array();
									  var menuAction=new Array();
									  var menuActionType=new Array();
									  var menuUrl=new Array();
									  var menuUrlDis=new Array();
										var menuOrder=new Array();
										var iconOrder=new Array();
										var menulist,totmenulist="",iconlist,toticonlist="";
									for(var i=0;i<menuRes.length;i++){
										menuDesc[i]=menuRes[i].get("MenuDescription");
										menuSequence[i]=menuRes[i].get("MenuSequence");
										menuIcon[i]=menuRes[i].get("Icon");
										menuIconSeq[i]=menuRes[i].get("IconSequence");
										menuAction[i]=menuRes[i].get("IconAction");
										menuActionType[i]=menuRes[i].get("ActionType");
										if(menuIcon[i]!=undefined){
												 menuUrl[i]=menuIcon[i]._url;
												
											 }
											 else{
												  menuUrlDis[i]='display:none;';
												 
											 }
										
										if((menuSequence[i]!=undefined))
										{
											var json={"menuDesc":menuDesc[i],
													  "menuSequence":menuSequence[i],
													  "menuIcon":menuUrl[i],
													  "menuAction":menuAction[i],
													  "menuActionType":menuActionType[i]
													  };
												menuOrder.push(json);
										}
										if((menuIconSeq[i]!=undefined))
										{
											var json={"menuDesc":menuDesc[i],
													  "menuIconSeq":menuIconSeq[i],
													  "menuIcon":menuUrl[i],
													  "menuAction":menuAction[i],
													  "menuActionType":menuActionType[i]
													  };
												iconOrder.push(json);
										}
										
									}
												//menuicons
												menuOrder.sort(function(a, b) {
											return parseInt(a.menuSequence) - parseInt(b.menuSequence);
											  });
									
											for(var i=0;i<menuOrder.length;i++){
												var mlink="";
												console.log(menuOrder[i].menuActionType);
												if(menuOrder[i].menuActionType=="Phone Number"){
													mlink="href='tel:"+menuOrder[i].menuAction+"'";
												}
												else if(menuOrder[i].menuActionType=="URL"){
													mlink="href='http://"+menuOrder[i].menuAction+"' target='_blank'";
												}
												else{
													mlink="id='"+menuOrder[i].menuAction+"'  onclick='searchField(this.id)'";
												}
												
												
												menulist="<a "+mlink+" style='cursor:pointer'>"+menuOrder[i].menuDesc+"</a>"
												
												totmenulist=totmenulist+menulist;
											}
											 localStorage.setItem('menuicons',JSON.stringify(totmenulist));
											 
											//access icons
											iconOrder.sort(function(a, b) {
													return parseInt(a.menuIconSeq) - parseInt(b.menuIconSeq);
													  });
											
											for(var i=0;i<iconOrder.length;i++){
												var alink=''
												if(iconOrder[i].menuActionType=="Phone Number"){
													alink="href='tel:"+iconOrder[i].menuAction+"'";
												}
												else if(iconOrder[i].menuActionType=="URL"){
													alink="href='http://"+iconOrder[i].menuAction+"' target='_blank'";
												}
												else{
													alink="id='"+iconOrder[i].menuAction+"' onclick='searchField(this.id)'";
												}
												
												
												
													 
												
												iconlist="<a "+alink+" style='cursor:pointer'><img src='"+iconOrder[i].menuIcon+"' class='iconimg' title='"+iconOrder[i].menuDesc+"'></a>"
												toticonlist=toticonlist+iconlist;
											}
											 localStorage.setItem('accessicons',JSON.stringify(toticonlist));
										
														
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
								    showHotel()
							   }
							  });
						  }).then(function(){
							 
						  });
										
			}
	   function	showHotel(){
		
				//about hotel
			var hotelresult=localStorage.getItem('Hotel');
			var hRes=JSON.parse(hotelresult);
			if(hRes[0]!=null){
				var locationimg,locationhotelimg,loctionBackground,locTextFont,	locationMsg,locFooterBackground,footerimg,locCaptionstyle;
				 locationtitile=hRes[0].Name;
				 locationcaption=hRes[0].hotelCaption;
				 locationLogo=hRes[0].Logo;
				 locationHotelLogo=hRes[0].hotelLogo;
				 locationMessage=hRes[0].description;
				 locationfooterimg=hRes[0].footerImage;
				 locationfooterText=hRes[0].footerText;
				 locationaddress1=hRes[0].Address1;
				 locationaddress2=hRes[0].Address2;
				 locationstreet=hRes[0].Street;
				 locationtown=hRes[0].Town;
				 locationzip=hRes[0].zipcode;
				 locationcountry=hRes[0].Country;
				 locationgeo=hRes[0].Geopoints;
				 lstyle=hRes[0].StyleId;
				 var parentid=hRes[0].objectId;
		         //id=result[0].get("Directories");
	           if(locationLogo!=undefined){
					 locationimg=locationLogo.url;
					 console.log(locationLogo)
					  imgstyle="margin-top:5px;"
						$('#locationlogo').attr("src",locationimg).attr("style",imgstyle);
				 }
				 else{
					  locationimg='display:none;margin-top:0px;margin-bottom:0px !important';
					  	$('#locationlogo').attr("style",locationimg);
				 }
				if(locationHotelLogo!=undefined){
							 locationhotelimg=locationHotelLogo.url;
							
								$('#locationhotellogo').attr("src",locationhotelimg);
						 }
						 else{
							  locationhotelimg='display:none;margin-top:0px;margin-bottom:0px !important';
								$('#locationhotellogo').attr("style",locationhotelimg)
						 }
		
		
					   if(locationaddress1==undefined){
									 locationadd1='display:none;';
								  }else{
									  locationadd1="";
								  }

						if(locationaddress2==undefined){
									 locationadd2="display:none;";
								  }else{
									  locationadd2="";
								  }
								  
						if(locationstreet==undefined){
									 locationst="display:none;";
								  }
								  else{
									  locationst="";
								  }
									
						if(locationtown==undefined){
									 locationtwn="display:none;";
								  }
								  else{
									  locationtwn="";
								  }
						if(locationzip==undefined){
									 locationzipcode="display:none;";
								  }else{
									  locationzipcode="";
								  }
						if(locationcountry==undefined){
									 locationctry="display:none;";
								  }else{
									  locationctry="";
								  }
								  
						if((locationaddress1==undefined)&&(locationaddress2==undefined)&&(locationstreet==undefined)&&(locationtown==undefined)&&(locationzip==undefined)&&(locationcountry==undefined)){
							locationgeopoints="display:none;";
							$('.mapfun').attr("style",locationgeopoints)
						}		  		  
						if(locationgeo==undefined){
									 locationgeopoints="display:none;";
									 locationlat="";
									 locationlang="";
									 /* style="margin:auto;width:100%"
									 $('#geocss').attr("style",style) */
									 style="col-md-12"
									 addbr="<br>"
									 styleclass="text-center"
									 /* locationadd1="margin-right:60px;" */
									 $('.geocss').attr("class",style)
									 
								  }
								  else{
									  addbr=""
									  locationlat=locationgeo.latitude;
									  locationlang=locationgeo.longitude;
									  locationgeopoints="display:show;";
									  styleclass="text-left"
								  }
						//template view{}
						if(lstyle==undefined){
							
							 localStorage.setItem( 'parentid',JSON.stringify(parentid));
							 localStorage.setItem( 'HotelTitle',JSON.stringify(locationtitile));
							$("#location").html(locationtitile);
							if((locationaddress1==undefined)&&(locationaddress2==undefined)&&(locationstreet==undefined)&&(locationtown==undefined)&&(locationzip==undefined)&&(locationcountry==undefined)){
									locationgeopoints="display:none;";
									$('.mapfun').attr("style",locationgeopoints)
		                         }
								if((locationaddress1==undefined)&&(locationaddress2==undefined)&&(locationstreet==undefined)&&(locationtown==undefined)&&(locationzip==undefined)&&(locationcountry==undefined)&&(locationLogo==undefined)&&(locationHotelLogo==undefined)&&(locationMessage==undefined)){
						locationcontent="display:none;";
						$('.locationcontent').attr("style",locationcontent)
		                    }
						}
						if(lstyle!=undefined){
							console.log(lstyle)
							console.log(localStorage)
							 var val=localStorage.getItem('locationBrandstyle');
							               var StyleId=JSON.parse(val);
								             console.log(StyleId)
							if(StyleId!=null){
										console.log(StyleId)
					locTitleColor=StyleId[0].hotelTitleColor;
					console.log(locTitleColor)
					locTitleFont=StyleId[0].hotelTitleFont;
					 locTitleFontFamily=StyleId[0].hotelTitleFontFamily;
				   locCaptionColor=StyleId[0].hotelCaptionColor;
				    locCaptionFont=StyleId[0].hotelCaptionFont;
					 locCaptionFontFamily=StyleId[0].hotelCaptionFontFamily;
				   locBackground=StyleId[0].LocationBackground;
					locTextBackground=StyleId[0].LocationTextBackground;
					locHtmlColor=StyleId[0].HtmlContentColor;
					locHtmlFont=StyleId[0].HtmlContentFont;
					locFooterBackground=StyleId[0].LocationFooterBackground;
					locAddressFont=StyleId[0].LocationAddressFont;
					locAddressFontColor=StyleId[0].LocationAddressFontColor;
					locAddressFontFamily=StyleId[0].LocationAddressFontFamily;
					locFooterTextFont=StyleId[0].footerFont;
					locFooterTextFontfamily=StyleId[0].footerCaptionFamily;
					locFooterTextColor=StyleId[0].FooterTextColor;
							if(locationtitile==undefined){
								locTitleStyle="display:none"
								$(".titlestyle").attr("style",locTitlestyle);
								
							}else{
								console.log("asgad")
								 locTitle="<text style='color:#"+locTitleColor+";font-size:"+locTitleFont+";font-family:"+locTitleFontFamily+"'>"+locationtitile+"</text>"
								  localStorage.setItem( 'HotelTitle',JSON.stringify(locTitle));
								   	$("#location").html(locTitle);
								 
							}
							if(locationcaption==undefined){
									locCaptionstyle="display:none";
									$(".captionstyle").attr("style",locCaptionstyle);
							 }
							else{
								  
								   locCaption="<text style='color:#"+locCaptionColor+";font-size:"+locCaptionFont+";font-family:"+locCaptionFontFamily+"'>"+locationcaption+"</text>"
								   localStorage.setItem( 'HotelCaption',JSON.stringify(locCaption));
								   $("#locationcaption").html(locCaption);
			
								   
								}
							   if(locBackground!=undefined){
								   loctionBackground="background-color:#"+locBackground;
									 localStorage.setItem( 'Hotelbackground',JSON.stringify(loctionBackground));
								   $("#locationbackground").attr("style",loctionBackground)
							   }
								 if(locationMessage==undefined){
									locationmsg='display:none';
									$('#locationmessage').attr("style",locationmsg)
									}else{
										locationMsg="<div class='section'><div class='container'><div class='row' ><div class='col-md-12 text-center'>"+locationMessage+"</div></div></div></div>"
									  $('#locationmessage').html(locationMsg)
									}
                            /* if(locationhtml==undefined){
							locationhtml='display:none';
							$('#locationhtml').attr("style",locationhtml)
							}else{
								locationHtml="<div class='section'><div class='container'><div class='row' ><div class='col-md-12 text-center' style='font-size:"+
						      locHtmlFont+";color:#"+locHtmlColor+";'>"+locationhtml+"</div></div></div></div>"
							  $('#locationhtml').html(locationHtml)
							}
                            										 */
							if(locationfooterimg!=undefined){
									 footerimage=locationfooterimg.url;
									footerimg="<div style='background-color:#"+locFooterBackground+";margin-top:5px;' ><center><img class='footer'style='width:100%;height:auto' src='"+footerimage+"'></center></div>"
									localStorage.setItem( 'Hotelfooter',JSON.stringify(footerimg));
									  $('#footerimage').html(footerimg)
								 }
								 else{
									 
									  footerimage='display:none';
									    $('#footerimage').attr("styles",footerimage)
								 }
						 
						   if(locationfooterText!=undefined){
							   
							   footerText="<div style='background-color:#"+locFooterBackground+";' ><center><text style='font-size:"+
						      locFooterTextFont+";font-family:"+locFooterTextFontfamily+";color:#"+locFooterTextColor+";'>"+locationfooterText+"</text></center></div>"	
									localStorage.setItem( 'HotelfooterText',JSON.stringify(footerText));
									  $('#footerText').html(footerText)
							   
						   }else{
							   footerText='display:none';
							   $('#footerText').attr("styles",footerText)
						   }
					   
						 var dirlocationdetails="<address class='"+styleclass+"' style='color:#"+locAddressFontColor+";font-size:"+locAddressFont+";font-family:"+locAddressFontFamily+"'>"+
						 addbr+
						 "<text style='"+locationadd1+"'>"+locationaddress1+"</text><br>"+
						 "<text style='"+locationadd2+"'>"+locationaddress2+"</text><br>"+
						 "<text style='"+locationst+"'>"+locationstreet+"<text style='"+locationtwn+"'>, "+locationtown+"</text></text><br>"+
						 "<text style='"+locationzipcode+"'>"+locationzip+"</text><br>"+"<text style='"+locationctry+"'>"+locationcountry+"</text></address>"
						 	$("#dirlocationdetails").html(dirlocationdetails);
									}
								
						}
						var geomap="<a style='"+locationgeopoints+"' onclick='myNavFunc(this.id,this.lang)' id='"+locationlat+"' lang='"+locationlang+"' class='mapPadding'>"+
		 "<img class = 'imgaspects map-logo' style='cursor:pointer' src='./images/map.jpg'  alt = '' >"+
		 "<p  class='mapPadding text-center' > Map</p><a>"
		
		localStorage.setItem( 'parentid',JSON.stringify(id));
		
			}//end of location
		var dirresult=localStorage.getItem('directory');
		var dRes=JSON.parse(dirresult);
		if(dRes!=null){
			var dirtitle=new Array();
			var dirLogo=new Array();
			var dirid=new Array();
			var dirlogoDis=new Array();
			var  dirbutton=new Array();
			var dirurl=new Array();
			var titletotval="";
				for(var i=0;i<dRes.length;i++){
			 
			if(dRes[i].DirectoryID==id){
				  
							dirtitle[i]=dRes[i].Title;
							dirid[i]=dRes[i].objectId;
							dirLogo[i]=dRes[i].Picture;
				if(dirLogo[i]!=undefined){
					 dirurl[i]=dirLogo[i].url;
					
				 }
				 else{
					  dirlogoDis[i]='display:none;';
					  dirbutton[i]='margin-left:44px!important';
				 }
						var brandresult=localStorage.getItem('locationBrandstyle');
		                var bRes=JSON.parse(brandresult);
						if(bRes!=null){
						var brandButtonColor=bRes[0].BrandButtonColor;
						var brandFontColor=bRes[0].BrandFontColor;
						var brandFontFamily=bRes[0].BrandFontFamily;

						}
						
					 titleval="<div class='row'><span class='menudir'><img  src='"+dirurl[i]+"' class='dirlogo' style='"+dirlogoDis[i]+"'></span><span><a style='"+dirbutton[i]+"' href='description.html?id="+dirid[i]+"&header="+dirtitle[i]+"'><button class='dirbutton' style='background-color:#"+brandButtonColor+";color:#"+brandFontColor+";font-family:"+brandFontFamily+";'>"+dirtitle[i]+"</button></a></span></div>";	
					titletotval=titletotval+titleval;
				
				}
				
			}	
			$("#titledir").html(titletotval);
		}//end of directory 
			var menuicons=localStorage.getItem('menuicons');
		   var menu=JSON.parse(menuicons);
		   if(menu!=null){
			   $(".menuItems").append(menu);
		   }
			var accessicons=localStorage.getItem('accessicons');
		    var aicons=JSON.parse(accessicons);
			if(aicons!=null){
				$(".iconlist").append(aicons); 
			}//end of menu icons
			
	   }
  }	

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
						
						var brandresult=localStorage.getItem('locationBrandstyle');
		                var bRes=JSON.parse(brandresult);
						console.log(bRes)
						if(bRes!=null){
						var brandButtonColor=bRes[0].BrandButtonColor;
						var brandFontColor=bRes[0].BrandFontColor;
						var brandFontFamily=bRes[0].BrandFontFamily;
						}
						 titleval="<div class='row'><span class='menudir'><img  src='"+dirurl[i]+"' class='dirlogo' style='"+dirlogoDis[i]+"'></span><span><a style='"+dirbutton[i]+"' href='description.html?title="+locationtitile+"&id="+dirid[i]+"&header="+dirtitle[i]+"'><button class='dirbutton' style='background-color:#"+brandButtonColor+";color:#"+brandFontColor+";font-family:"+brandFontFamily+";'>"+dirtitle[i]+"</button></a></span></div>";	
					titletotval=titletotval+titleval;
					  
					}
				 }
			}
			$("#titledir").html(titletotval);
			
				
		  event.stopPropagation();
	});
	
	function searchField(field){
	
	
			
		 var dirresult=localStorage.getItem('directory');
		 var dRes=JSON.parse(dirresult);
		 
		        
				
				if(dRes.length==0){
					titledis='display:none';
				}
	            for(var i=0;i<dRes.length;i++){
					
					var dtitle=(dRes[i].Title).toUpperCase();
					var sfield=field.toUpperCase();
						
						if(dtitle==sfield)
						{
							
							
							console.log(field);
							window.open("description.html?id="+dRes[i].objectId,"_self");
							i=dRes.length
				        }
						
				 }
			
			
		  event.stopPropagation();
	
}	