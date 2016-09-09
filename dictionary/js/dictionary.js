//------------------------BEGIN FUNCTION HERE------------------ NEST VARIABLE PASSING


        //-----------intercept here var passed if object (= good:name){} else {} pass as cluster

          //dataset0=[];

          d3.csv("/data/UD_tablesABC20.csv", function(data) {
      // sort here if possible based on row/cluster identification
            dataset0 = data;

          d3.csv("/data/port.csv", function(dataP) {
      
            dataPlus = dataP;

          d3.csv("/data/trans.csv", function(dataM) {
      
            dataMulti = dataM;

          d3.csv("/data/conversions.csv", function(dataC) {
      
            dataConvert = dataC;

      

    // //     //d3.json("state_5m.json", function(json1) {

    //----- length of dataset to set window height

      // max units

      //Width and height
      var w = window.innerWidth;
      ////console.log(window.innerWidth);
      var drow =30;
      //console.log(w);

    if (window.innerWidth<1200){
      var w= 1200;
      var drow =24;
    } else if (window.innerWidth<1400){
      var drow =27;
    }
    ;


      var h2 = (dataset0.length/drow)*((w-60)/drow) + 255; 
      //var h = (window.innerHeight)*2; //works for basic desk top adjustments... not truely responsive to mobile environments
      var h=h2;
      var barPadding = 1;

      clips=0;

      //Create SVG element
      svg = d3.select("#container")
            .append("svg")
            //.attr("translate","transform(0,100)")
            .attr("width", w)
            .attr("height", h)
            ;



      group0 = svg.append("g"); // types to choice from @ 25 pixels
      group1 = svg.append("g") // alpha selections

      group2 = svg.append("g"); // units

      group3 = svg.append("g"); // squares-mint
      group8 = svg.append("g"); // squares-mint - selected
      group8a = svg.append("g");
      group4 = svg.append("g"); // squares-quant
      group5 = svg.append("g"); // squares-line
      group6 = svg.append("g"); // keys
      group9 = svg.append("g"); // titles - selected
      group7 = svg.append("g"); // click1 - majority of materials
      group10 = svg.append("g"); // pop-up titles and selected pages to view









            
            var result = []
            // combine info to automate lat/long/empire info

            dataset0.forEach(function(row) {
                result = dataPlus.filter(function(row2) {
                    return row2.nameShort.trim() === row.locality.trim();
                });
                if (result[0]) {
                    row.empire = result[0].empire;
                    row.lat = result[0].latitude;
                    row.lon = result[0].longitude;
                    row.nameNow = result[0].nameLong;
                    row.UDtxP = result[0].Udtpg;
                  } else {
                    row.empire = "na";
                    row.lat = 47.816184;
                    row.lon = -27.883419;
                  }; 
              });

            // add the varients

            var alts=[];
                dataMulti.forEach(function(row) {
                    var others = row.original.trim().split(" ");
                    others.forEach(function(d) {
                    alts=alts+d+" ";
                    });
                });
                //console.log(alts);


            var  matches=[];

            dataset0.forEach(function(row) { 
              var regex = new RegExp(row.nameU.trim().split(" ")[0]);
              ////console.log(regex);
                //if ((regex).test(alts.trim())){
                if  (regex.test(alts)){
                  ////console.log(regex);
                  // secondary MATCH to copy information...
                  dataMulti.forEach(function(row2) {
                      if  (regex.test(row2.original.trim())){
                        row.alter = row2.original.trim();
                      };
                    });
                };
              });



            //ADDITIONAL DATA TO WEAVE IN HERE


          
          //console.log("categories/header check: "); 
          //console.log(dataset0[0]);
          //console.log(dataset0.length);

    // check measure types  

        var type = d3.nest()
          .key(function(d) { return d.character.trim(); })
          .rollup(function(v) { return v.length; })
          .entries(dataset0);

          // most to least entries
        type.sort(function(a,b) {
          return b.values - a.values;
          });

        var tList=[];
          type.forEach(function(d) {
          tList.push(d.key);
          });

          tList.push("all");

          tList.sort();
        

          ////console.log("type: ");
          ////console.log(tList);

    // check ports list

        var port = d3.nest()
          .key(function(d) { return d.locality; })
          .rollup(function(v) { return v.length; })
          .entries(dataset0);

          // most to least entries
          port.sort(function(a,b) {
          return b.values - a.values;
          });

          var pList=[];
          port.forEach(function(d) {
          pList.push(d.key);
          });

          //////console.log(JSON.stringify(pList));
          ////console.log("port: ");
          ////console.log(pList);

        var name = d3.nest()
          .key(function(d) { return d.name; })
          .rollup(function(v) { return v.length; })
          .entries(dataset0);

          // most to least entries
          name.sort(function(a,b) {
          return b.values - a.values;
          });

          var nList=[];
          name.forEach(function(d) {
          nList.push(d.key);
          });

          ////console.log("name: ");
          ////console.log(nList);

        var emp = d3.nest()
          .key(function(d) { return d.empire; })
          .rollup(function(v) { return v.length; })
          .entries(dataset0);

          // most to least entries
          emp.sort(function(a,b) {
          return b.values - a.values;
          });

          var eList=[];
          emp.forEach(function(d) {
          eList.push(d.key);
          });

          ////console.log("empires: ");
          ////console.log(eList);

          var alpha = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","all"];
          ////console.log(alpha.length);



//----- group 0 ------- type selections at top of page/svg area as .btns to select which grid to show/navigate through....


          group0.selectAll("text")
                .data(tList)
                .enter()
                .append("text")
                .text(function(d,i){
                  return d;
                })
                .attr("x", (function(d,i){
                  return [i]*(w/10)+(w/9);
                }))
                .attr("y", 25)
                .attr("typename", function(d,i){
                  return d;
                })
                .attr("font-size", "14px")
                .attr("text-anchor", "middle")
                .attr("class", "btns")
                .attr("id", "type")
                .attr("fill", "#339999")
                .on("mouseover", function(d) {
                    //Get this bar's x/y values, then augment for the tooltip
                       d3.select(this).attr("fill", "#000000");
                       d3.select(this).attr("cursor", "pointer");
                     })
               .on("mouseout", function() { 
                    if (d3.select(this).attr("font-size")=="14px"){
                    d3.select(this).attr("fill", "#339999");
                  };
                    
                   })
                .on("click", function(d) {
                      ////console.log(d3.select(this).attr("typename"));
                   });
                ;

          group0.append("text")
                .text("select by unit type: ")
                .attr("x", 10)
                .attr("y", 21.5)
                .attr("font-size", "10px")
                .attr("font-style", "italic")
                .attr("text-anchor", "start")
                .attr("fill", "#000000")
                ;

//--------------------------------------------alphabetic selections------------------------------
          group1.selectAll("text")
                .data(alpha)
                .enter()
                .append("text")
                .text(function(d,i){
                  return d;
                })
                .attr("x", (function(d,i){
                  return [i]*(w/30)+(w/12);
                }))
                .attr("y", 50)
                .attr("alphaName", function(d,i){
                  return d;
                })
                .attr("font-size", "10px")
                .attr("text-anchor", "middle")
                .attr("class", "btns")
                .attr("id", "alphaKey")
                .attr("fill", "#339999")
                .on("mouseover", function(d) {
                    //Get this bar's x/y values, then augment for the tooltip
                       d3.select(this).attr("fill", "#000000");
                       d3.select(this).attr("cursor", "pointer");
                     })
               .on("mouseout", function() { 
                    if (d3.select(this).attr("font-size")=="10px"){
                    d3.select(this).attr("fill", "#339999");
                  };
                    
                   })
                .on("click", function(d) {
                      ////console.log(d3.select(this).attr("alphaName"));
                   });
                ;

          group1.append("text")
                .text("then letter: ")
                .attr("x", 20)
                .attr("y", 48)
                .attr("font-size", "10px")
                .attr("font-style", "italic")
                .attr("text-anchor", "start")
                .attr("fill", "#000000")
                ;

//-------------------------------------------------------just some dividers----------------------------------------------------
          group0.append("rect")
                       .attr("x", 30) 
                       .attr("y", 75)
                       .attr("width", w-60)
                       .attr("height", .5)
                       .attr("stroke-width", .25)
                       .attr("opacity", .25);

          group0.append("rect")
                       .attr("x", 30) 
                       .attr("y", 210)
                       .attr("width", w-60)
                       .attr("height", .5)
                       .attr("stroke-width", .25)
                       .attr("opacity", .25);

          group0.append("rect")
                       .attr("x", 30) 
                       .attr("y", 215)
                       .attr("width", w-60)
                       .attr("height", .5);


                  group0.append("text")
                       .attr("x", 30) 
                       .attr("y", 230)
                       .text("GRID DISPLAY: selected units, relative size")
                       .attr("font-size", "12px")
                        .attr("text-anchor", "start")
                        .attr("fill", "#000000")
                       ; 

                  group0.append("text")
                       .attr("x", w-30) 
                       .attr("y", 230)
                       .text("unit use, shared territories: GRID KEY")
                       .attr("font-size", "12px")
                        .attr("text-anchor", "end")
                        .attr("fill", "#000000")
                       ;  

                  group0.append("text")
                       .attr("x", w/2) 
                       .attr("y", 227)
                       .text("GRID mouseover to show relationships, click to pull up details")
                       .attr("font-size", "8px")
                        .attr("text-anchor", "middle")
                        .attr("fill", "#404040")
                        .attr("opacity", .6)
                       ;   


                  group0.append("text")
                       .attr("x", w/2) 
                       .attr("y", 206)
                       .text("NAMES hoover to highlight units, click to hold outlines")
                       .attr("font-size", "8px")
                        .attr("text-anchor", "middle")
                        .attr("fill", "#404040")
                        .attr("opacity", .6)
                       ;  



          group0.append("rect")
                       .attr("x", 30) 
                       .attr("y", 235)
                       .attr("width", w-60)
                       .attr("height", .5)
                       .attr("stroke-width", .25)
                       .attr("opacity", .25);

          group0.append("rect")
                       .attr("x", 30) 
                       .attr("y", 240)
                       .attr("width", w-60)
                       .attr("height", .5);


              group0.append("rect")
                       .attr("x", 0) 
                       .attr("y", 30)
                       .attr("width", w)
                       .attr("height", .5);

              group0.append("rect")
                       .attr("x", 0) 
                       .attr("y", 35)
                       .attr("width", w)
                       .attr("height", .5)
                       .attr("stroke-width", .25)
                       .attr("opacity", .25);


              group0.append("rect")
                       .attr("x", 20)
                       .attr("y", 55)
                       .attr("width", w-40)
                       .attr("height", .5);

             group0.append("rect")
                       .attr("x", 0) 
                       .attr("y", 5)
                       .attr("width", w)
                       .attr("height", .5);

//-------------------work through the data sorting given the selection-----------------------------------------------------------------------------------------------------------------------------

          group0.selectAll("#type")
                .on("click", function() {
                //////console.log(d3.select(this).attr("name"));
                dataset1=[]; 
                selectT = d3.select(this).attr("typename");

                      d3.selectAll("#type").attr("font-size", "14px");
                      d3.selectAll("#type").attr("letter-spacing", "0px");
                      d3.selectAll("#type").attr("fill", "#339999");

                      d3.selectAll("#alphaKey").attr("font-size", "10px");
                      d3.selectAll("#alphaKey").attr("letter-spacing", "0px");
                      d3.selectAll("#alphaKey").attr("fill", "#339999");

                      d3.select(this).attr("font-size", "18px");
                      d3.select(this).attr("letter-spacing", "0px");
                      d3.select(this).attr("fill", "#000000");
                
                      ////console.log(selectT);

                      var erase = ["#unit1", "#unit1r", "#unitanno", "#unitanno1", "#sqrs", "#sqrsB", "#sqrsT", "#sqrsTG", "#windowB", "#windowBd", "#windowBc", "#colorM", "#colorT", "#hold", "#holdT", "#popT", "#pgs", "#map" , "#mapBase" , "#mapBaseA" , "#gridSolid" , "#baselines" ];

                      for (i=0; i<erase.length; i++){
                        d3.selectAll(erase[i]).remove();
                      };

                      map=[];



          group1.selectAll("#alphaKey")
                .on("click", function() {
                //////console.log(d3.select(this).attr("name"));
                dataset1=[]; 
                selectA = d3.select(this).attr("alphaName");

                      d3.selectAll("#alphaKey").attr("font-size", "10px");
                      d3.selectAll("#alphaKey").attr("letter-spacing", "0px");
                      d3.selectAll("#alphaKey").attr("fill", "#339999");

                      d3.select(this).attr("font-size", "14px");
                      d3.select(this).attr("letter-spacing", "1px");
                      d3.select(this).attr("fill", "#000000");
                
                      //add elements to reset here
                      var erase = ["#unit1", "#unit1r", "#unitanno", "#unitanno1", "#sqrs", "#sqrsB", "#sqrsT", "#sqrsTG", "#windowB", "#windowBd", "#windowBc", "#colorM", "#colorT", "#hold", "#holdT", "#popT", "#pgs", "#map" , "#mapBase"  , "#mapBaseA" , "#gridSolid", "#baselines" ];

                      for (i=0; i<erase.length; i++){
                        d3.selectAll(erase[i]).remove();
                      };

                      map=[];



                dataset1=[]; 
                dataset2=[]; 

                if (selectT!="all" && selectA!="all"){
                dataset1 = dataset0.filter(function(row) {              
                      return ((row['nameU']).slice(0,1)==selectA && row['character']==selectT);
                      });
                } else if (selectT!="all" && selectA=="all"){
                dataset1 = dataset0.filter(function(row) {  
                      return (row['character']==selectT);
                });
              } else if (selectT=="all"&& selectA!="all"){
                dataset1 = dataset0.filter(function(row) {  
                      return ((row['nameU']).slice(0,1)==selectA);
                });
              } else {
                dataset1=dataset0;
              };


                dataset2 = dataset0.filter(function(row) {              
                      return (row['character']==selectT);
                      });

                var minL = d3.min(dataset1, function(d) { return d.val; });
                        ////console.log(minL);

                var maxL = d3.max(dataset1, function(d) { return d.val; });
                        ////console.log(maxL);

                h2 = (dataset1.length/drow)*((w-60)/drow) + 290; 
                //var h = (window.innerHeight)*2; //works for basic desk top adjustments... not truely responsive to mobile environments
                if (h2<900){
                  h2=900;
                };

                h=h2;

                d3.select("svg").attr("height", h);





// --------------------------- GROUP 1 - text list at top of page ----------------------------------------------------------------------------------------------------------------------------------

            
                var offText = 110;


                var units = d3.nest()
                  .key(function(d) { return d.nameU.split(" ")[0]; })
                  .rollup(function(v) { return v.length; })
                  .entries(dataset1);

                ////console.log(dataset1);
                ////console.log(units);

                var offX = (w-80)/units.length;

                if (units.length<165){

                group2.selectAll("rect")
                      .data(units)
                      .enter()
                      .append("rect")
                      .attr("x", (function(d,i){
                        return ([i]*offX-25);
                      }))
                      .attr("y", (function(d){
                        if (units.length < 100){
                            return 20+offText;
                          } else {
                            return 23+offText;
                          };
                          }))
                      .attr("unitCount", (function(d){
                        return d.values;
                      }))
                      .attr("width", (function(d){
                        var stack = d.values*(3.25);
                        if (stack>42*3.25){
                          return 42*3.25;
                        } else {
                          return stack;
                        };
                      }))
                      .attr("height", (function(d){
                          if (units.length < 100){
                            return 15;
                          } else {
                            return 10;
                          };
                      }))
                      .attr("transform", (function(d,i){
                        return "rotate(90 "+ ([i]*offX+40)+", 140)";
                      }))
                      .attr("id", "unit1r")
                      .attr("align", "right")
                      .attr("fill", "#339999")
                      .attr("opacity", (function(d){
                        var stack = d.values*(3.25);

                        if (stack>42*3.25){
                          return .45;
                        } else {
                          return .25;
                        };
                      }))
                      ;

                group2.selectAll("text")
                      .data(units)
                      .enter()
                      .append("text")
                      .text(function(d){
                        return "("+ d.values +")  - "+ d.key;
                      })
                      .attr("x", (function(d,i){
                        return [i]*offX-40;
                      }))
                      .attr("y", 30+offText)
                      .attr("unitName", function(d){
                        return d.key;
                      })
                      .attr("unitNum", function(d){
                        return d.values;
                      })
                      .attr("font-size", "9px")
                      .attr("transform", (function(d,i){
                        return "rotate(90 "+ ([i]*offX+40)+", 140)";
                      }))
                      .attr("text-anchor", "start")
                      .attr("class", "unit")
                      .attr("id", "unit1")
                      .attr("fill", "#404040")
                      .on("mouseover", function(d) {
                          //Get this bar's x/y values, then augment for the tooltip
                             d3.select(this).attr("fill", "#000000");
                             d3.select(this).attr("font-size", "13px");
                             d3.select(this).attr("cursor", "crosshair");
                             d3.select(this).attr("font-weight", "400");
                             d3.selectAll("#holdT").attr("opacity", 0);
                             

                        var unitSel = d3.select(this).attr("unitName");
                        var variant = d3.select(this).attr("varU");
                        var a= d3.selectAll("#sqrsB");

                        for (i=0;i<a[0].length;i++){
                          var d=((a[0][i].getAttribute("varU")));

                          if (d.split(" ")[0]==unitSel){
                          a[0][i].setAttribute("opacity", .8);
                          };
                        };

                       group6.append("text")
                             .attr("id", "tooltip2")
                             .attr("x", w/2)
                             .attr("y", 193)
                             .attr("text-anchor", "middle")
                             .attr("font-size", "18px")
                             .attr("fill", "#339999")
                             .text(d3.select(this).attr("unitName")+", "+d3.select(this).attr("unitNum")+" unit variations");
                             

                           })
                     .on("mouseout", function() { 
                          //d3.select(this).attr("fill", "#404040");
                          d3.select(this).attr("font-size", "9px");
                          d3.select(this).attr("font-weight", "normal");
                          d3.selectAll("#holdT").attr("opacity", .5);

                        var unitSel = d3.select(this).attr("unitName");
                        var variant = d3.select(this).attr("varU");
                        var a= d3.selectAll("#sqrsB");

                        for (i=0;i<a[0].length;i++){
                          var d=((a[0][i].getAttribute("varU")));
                          
                          if (d.split(" ")[0]==unitSel){
                          a[0][i].setAttribute("opacity", .2);
                          };
                        };

                        d3.select("#tooltip2").remove();

                         })
                      .on("click", function() {
                            ////console.log(d3.select(this).attr("unitName"));
                        var unitSel = d3.select(this).attr("unitName");
                        var variant = d3.select(this).attr("varU");
                        d3.selectAll("#hold").remove();
                        d3.selectAll("#holdT").remove();
                        var a= d3.selectAll("#sqrsB");

                        for (i=0;i<a[0].length;i++){
                          var d=((a[0][i].getAttribute("varU")));

                          if (d.split(" ")[0]==unitSel){

                          group8.append("rect")
                             .attr("id", "hold")
                             .attr("x", a[0][i].getAttribute("x"))
                             .attr("y", a[0][i].getAttribute("y"))
                             .attr("width", a[0][i].getAttribute("width"))
                             .attr("height", a[0][i].getAttribute("height"))
                             .attr("fill", "none")
                             .attr("stroke", "#339999")
                             .attr("opacity", 0)
                             .transition()
                             .delay(250)
                             .duration(750)
                             .attr("opacity", .8)
                             .attr("stroke-width", 2);



                          group8.append("text")
                             .attr("id", "holdT")
                             .attr("x", w/2)
                             .attr("y", 193)
                             .attr("text-anchor", "middle")
                             .attr("font-size", "18px")
                             .attr("fill", "#339999")
                             .attr("opacity", .5)
                             .text(d3.select(this).attr("unitName")+", "+d3.select(this).attr("unitNum")+" unit variations");

                          };
                        };
                        
                         });
                      ;
                    };

              var anno = ["base units: "+ units.length, "all "+ selectT+ " variants, starting with "+selectA+" : "+ dataset1.length];
              if (selectT!="all") {
                anno.push("all "+ selectT+ " units: "+ dataset2.length);
              } else {
                anno.push("same as above");
              }; 

              anno.push("all units, all variants: "+ dataset0.length);

              if (units.length>164){
                anno.push("TOO MANY UNITS TO DISPLAY TEXT LEGIBLY, EXPLORE VISUALLY");
              };

              group2.selectAll("texta")
                      .data(anno)
                      .enter()
                      .append("text")
                      .text(function(d,i){
                        return d;
                      })
                      .attr("x", 30)
                      .attr("y", function(d,i){
                        return [i]*15+145+2*Math.floor(i/4);
                      })
                      .attr("id", "unitanno")
                      .attr("font-size", function(d,i){
                        if (i<4){
                          return "10px";
                        }else {return "14px";};
                        })
                      .attr("font-style", "italic")
                      .attr("text-decoration", function(d,i){
                        if (i<4){
                          return "underline";
                        }else {return "none";};
                        })
                      .attr("text-anchor", "start")
                      .attr("fill", function(d,i){
                        if (i<4){
                          return "#000000";
                        }else {return "#339999";};
                        });






// --------------------------- GROUP 3 - basic grid array of sq values -----------------------------------------------------------------------------------------------------------------------------

// 25 unit per line, with 10 gap, into grid.... place unit at center

grid = (w-60)/drow;
gridM =grid-2;
var centH = [grid/2+30];
var centV = [240+grid/2];
var rows =dataset1.length/drow;

//mapping dataset1 to gridM;



for (i=1; i<drow; i++){
    centH.push(centH[0]+(i*grid));
}

for (i=1; i<rows+1; i++){
    centV.push(centV[0]+(i*grid));
}
////console.log(centH); // center of each
////console.log(centV); // center of each rowV, 

//map values by sq. // adjust for units here.....
    var dataset1m=[];
          dataset1.forEach(function(d) {
          dataset1m.push(parseInt(d.val));
          });

    var map=d3.scale.sqrt()
      .domain([0,d3.max(dataset1m)])
      .range([0,(gridM-8)]);

      ////console.log(gridM);
      ////console.log(d3.max(dataset1m));
      ////console.log(map(d3.max(dataset1m)));


                group3.selectAll("rect")
                      .data(dataset1)
                      .enter()
                      .append("rect")
                      .attr("x", (function(d,i){
                        if (i<drow*Math.floor((i+drow)/drow)){
                          return centH[i - (drow*Math.floor((i)/drow))]-gridM/2;
                        };}))

                      .attr("y", (function(d,i){
                        if (i<drow*Math.floor((i+drow)/drow)){
                          return centV[0+Math.floor(i/drow)]-gridM/2;
                        };}))
                      .attr("unitCount", (function(d){
                        return d.values;
                      }))
                      .attr("width", (function(d){
                        return gridM;
                      }))
                      .attr("height", (function(d){
                        return gridM;
                      }))
                      .attr("id", "sqrsB")
                      .attr("emp", function(d){
                        return d.empire;
                      })
                      .attr("varU", function(d){
                        if (d.alter!=""){
                          return d.alter;
                        } else {
                          return d.nameU.trim().split(" ")[0];
                        }; 
                      })
                      .attr("labelU", function(d){
                        return d.nameU +", "+ d.locality;
                      })
                      .attr("fill", "#339999")
                      .attr("opacity", .2)
                      .on("mouseover", function(d){
                        var trade = d3.select(this).attr("emp");
                        var variant = d3.select(this).attr("varU");
                        var a= d3.selectAll("#sqrsB");
                        var b=[];

                        for (i=0;i<a[0].length;i++){
                          var c=((a[0][i].getAttribute("emp")));
                          var d=((a[0][i].getAttribute("varU")));
                          b.push(c);
                          if (c==trade && d==variant){
                          a[0][i].setAttribute("opacity", .8);
                          
                          } else if (c==trade){
                          a[0][i].setAttribute("opacity", .5);
                          } else if(d==variant){
                          a[0][i].setAttribute("fill", "#000000");
                          a[0][i].setAttribute("opacity", .25);
                          };
                        };

                        var textL = d3.select(this).attr("varU");
                        var e= d3.selectAll("#unit1");

                        for (i=0;i<e[0].length;i++){
                          var c=((e[0][i].getAttribute("unitName")));
                          if (c==textL){
                            e[0][i].setAttribute("fill", "#000000");
                             e[0][i].setAttribute("font-size", "13px");
                             e[0][i].setAttribute("font-weight", "400");
                          };
                        };


                       group6.append("text")
                             .attr("id", "tooltip1")
                             .attr("x", d3.select(this).attr("x")-(-gridM/2))
                             .attr("y", d3.select(this).attr("y")-(-gridM)-6)
                             .attr("text-anchor", "middle")
                             .attr("font-size", "12px")
                             .attr("font-weight", "400")
                             .attr("text-transform", "capitalize")
                             .text(d3.select(this).attr("labelU"));

                     d3.select(this).attr("cursor", "crosshair");
                     

                      })
                      .on("mouseout", function(d){
                        var trade = d3.select(this).attr("emp");
                        var variant = d3.select(this).attr("varU");
                        var a= d3.selectAll("#sqrsB");
                        var b=[];

                        for (i=0;i<a[0].length;i++){
                          var c=((a[0][i].getAttribute("emp")));
                          var d=((a[0][i].getAttribute("varU")));
                          b.push(c);
                          if (c==trade && d==variant){
                          a[0][i].setAttribute("opacity", .2);
                          
                          } else if (c==trade){
                          a[0][i].setAttribute("opacity", .2);
                          } else if(d==variant){
                          a[0][i].setAttribute("fill", "#339999");
                          a[0][i].setAttribute("opacity", .2);
                          };
                        };

                        var textL = d3.select(this).attr("varU");
                        var e= d3.selectAll("#unit1");

                        for (i=0;i<e[0].length;i++){
                          var c=((e[0][i].getAttribute("unitName")));
                          if (c==textL){
                            e[0][i].setAttribute("fill", "#000000");
                             e[0][i].setAttribute("font-size", "9px");
                             e[0][i].setAttribute("font-weight", "100");
                          };
                        };
                       //////console.log(b);
                       d3.select("#tooltip1").remove();

                      })
                    .on ("click", function(){
                          //console.log(d3.select(this).attr("labelU"));
                          d3.select(this).setAttribute("fill", "#000000");


                    })
                      ;

              var baseh=(centV[(centV.length)-1])-gridM/2-1;
              //console.log(baseh);


              group0.append("rect")
                       .attr("x", 30) 
                       .attr("y", baseh+5)
                       .attr("width", w-60)
                       .attr("height", .5)
                       .attr("stroke-width", .25)
                       .attr("opacity", .25)
                       .attr("id", "baselines");

                group0.append("rect")
                       .attr("x", 30) 
                       .attr("y", baseh)
                       .attr("width", w-60)
                       .attr("height", .5)
                       .attr("id", "baselines");

                var gridKey = ["basic unit vs. max area of type", "unit variants (any nation)", "other units of empire (1850)", "unit variants within empire (1850)"];
                var gridC = ["#339999", "#000000", "#339999", "#339999"];
                var gridT = [".2", ".25", ".5", ".8"];

                group6.selectAll("rect")
                      .data(gridC)
                      .enter()
                      .append("rect")
                      .attr("x", w-50)
                      .attr("y", function(d, i){
                        return [i]*15+145+2*Math.floor(i/3)-8;
                        ////console.log(placed);
                      })
                      .attr("width", 10)
                      .attr("height", 10)
                      .attr("id", "key1")
                      .attr("fill", function(d, i){
                        return gridC[i];
                      })
                      .attr("opacity", function(d, i){
                        return gridT[i];
                      });

                group6.selectAll("text")
                      .data(gridKey)
                      .enter()
                      .append("text")
                      .text(function(d,i){
                        return d;
                      })
                      .attr("x", w-60)
                      .attr("y", function(d,i){
                        return [i]*15+145+2*Math.floor(i/3);
                      })
                      .attr("id", "key1")
                      .attr("font-size", "10px")
                      .attr("font-style", "italic")
                      .attr("text-decoration", "underline")
                      .attr("text-anchor", "end")
                      .attr("fill", "#000000");


                group4.selectAll("rect") // actual units sized as percentage
                      .data(dataset1)
                      .enter()
                      .append("rect")
                      .attr("x", (function(d,i){
                        if (i<drow*Math.floor((i+drow)/drow)){
                          return centH[i - (drow*Math.floor((i)/drow))];
                        };}))

                      .attr("y", (function(d,i){
                        if (i<drow*Math.floor((i+drow)/drow)){
                          return centV[0+Math.floor(i/drow)];
                        };}))
                      .attr("unitCount", (function(d){
                        return d.values;
                      }))
                      .attr("width", 0)
                      .attr("height", 0)
                      .attr("fill", "#339999")
                      .transition()
                      .duration(500)
                      .attr("x", (function(d,i){
                        if (i<drow*Math.floor((i+drow)/drow)){
                          return centH[i - (drow*Math.floor((i)/drow))]-(map(d.val)/2)-2;
                        };}))

                      .attr("y", (function(d,i){
                        if (i<drow*Math.floor((i+drow)/drow)){
                          return centV[0+Math.floor(i/drow)]-(map(d.val)/2)-2;
                        };}))

                      .attr("width", (function(d){
                        return map(d.val)+4;
                      }))
                      .attr("height", (function(d){
                        return map(d.val)+4;
                      }))
                      .attr("id", "sqrs")
                      .attr("emp", function(d){
                        return d.empire;
                      })
                      .attr("varU", function(d){
                        return d.nameU.split(" ")[0];
                      })
                      .attr("namU", function(d){
                        return d.nameU;
                      })
                      .attr("fill", "#ffffff")
                      ;

              group5.selectAll("line")
                      .data(dataset1)
                      .enter()
                      .append("line")
                      .attr("x1", (function(d,i){
                        if (i<drow*Math.floor((i+drow)/drow)){
                          return centH[i - (drow*Math.floor((i)/drow))]-(map(d.val)/2)-2;
                        };}))

                      .attr("y1", (function(d,i){
                        if (i<drow*Math.floor((i+drow)/drow)){
                          return centV[0+Math.floor(i/drow)]-(map(d.val)/2)-6;
                        };}))
                      .attr("unitCount", (function(d){
                        return d.values;
                      }))
                      .attr("x2", (function(d,i){
                        if (i<drow*Math.floor((i+drow)/drow)){
                          return centH[i - (drow*Math.floor((i)/drow))]+(map(d.val)/2)+2;
                      };}))
                      .attr("y2", (function(d,i){
                        if (i<drow*Math.floor((i+drow)/drow)){
                          return centV[0+Math.floor(i/drow)]-(map(d.val)/2)-6;
                        };}))
                      .attr("id", "sqrsT")
                      .attr("emp", function(d){
                        return d.empire;
                      })
                      .attr("varU", function(d){
                        return d.nameU.split(" ")[0];
                      })
                      .attr("stroke", "#404040")
                      .attr("opacity", 0)
                      .transition()
                      .delay(250)
                      .duration(250)
                      .attr("opacity", 1)
                      .attr("stroke-width", .75)
                      .attr("stroke-dasharray", "2,2")

                      ;

            group4.selectAll("text")
                      .data(dataset1)
                      .enter()
                      .append("text")
                      .attr("x", (function(d,i){
                        if (i<drow*Math.floor((i+drow)/drow)){
                          return centH[i - (drow*Math.floor((i)/drow))];
                        };}))

                      .attr("y", (function(d,i){
                        if (i<drow*Math.floor((i+drow)/drow)){
                          return centV[0+Math.floor(i/drow)]-(map(d.val)/2)-9;
                        };}))
                      .attr("unitCount", (function(d){
                        return d.values;
                      }))
                      .text(function(d){
                        return (parseFloat(d.val).toLocaleString('en-IN', { maximumFractionDigits: 2 })) +" "+d.unit;
                      })
                      .attr("font-size", "6pt")
                      .attr("text-anchor", "middle")
                      .attr("opacity", 0)
                      .transition()
                      .delay(250)
                      .duration(250)
                      .attr("opacity", .15)
                      .attr("id", "sqrsTG")
                      .transition()
                      .duration(500)
                      .attr("opacity", 1)
                      ;
//---------------------------------------------------to the pop-ups----------------------------------------------------------------------------------------------------------

  group3.selectAll("#sqrsB")
                .on("click", function() {
                 d3.selectAll("#hold").remove(); 
                 d3.selectAll("#holdT").remove(); 

                  var y0=parseFloat(d3.select(this).attr("y"));
                  var x0=parseFloat(d3.select(this).attr("x"));
                  var x1=(x0-400);
                  var x2=(x1+800);
                  var xU;

                  if (x1<50){
                            xU = 50;
                          } else if (x2>w-50){
                            xU =  w-700;
                          } else {
                            xU =  x1;
                          };

                  var y1=(y0+gridM+5);
                  var yU;
                  if (y1+500>h-25){
                    yU = h-525;
                  } else{
                    yU =  y1;
                  };


                  var copy = d3.selectAll("#sqrsB");
                        var b=[];
                  var tagL = d3.select(this).attr("labelU");
                  var n = tagL.split(",");
                  var nameEmp = d3.select(this).attr("emp");
                  var nameUnitF = n[0];
                  var nameTown = n[1].trim();
                  var n2 = nameUnitF.split(" ");
                  var nameUnitS = n2[0];


                  dataThis = dataset1.filter(function(row) {              
                      return (row['nameU']==nameUnitF && row['locality']==nameTown);
                  });
                  //console.log(dataThis);

                  dataVari = dataset1.filter(function(row) {              
                      return (row['nameU'].split(" ")[0]==nameUnitS);
                  });

                  //console.log(dataVari);

                  dataCountry = dataset1.filter(function(row) {              
                      return (row['empire'] ==nameEmp);
                  });

                  //console.log(dataCountry);

                  title=[];
                  title.push(dataThis[0].nameU+" ("+dataThis[0].character+"), as measured by "+dataThis[0].locality);
                  title.push(dataThis[0].nameNow+" (in 1850: "+dataThis[0].empire+")");
                  var titleAlts = dataThis[0].alter;
                  var titleA="";
                  if (titleAlts!=""){
                    titleAlts.split(" ").forEach(function(d){
                      if (d!=dataThis[0].nameU.split(" ")[0]){
                         titleA=(titleA+d+", "); 
                      };
                    })
                  var L = titleA.split("").length;  
                  title.push("International Variations: "+titleA.slice(0, L-2));
                  };
                  //console.log (JSON.stringify(title));

                  dataMax = dataset1.filter(function(row) { 
                      if (titleAlts.split("").length>0 && selectA!="all" ){
                      return (row['empire'] ==nameEmp| row['nameU'].split(" ")[0]==nameUnitS | row['alter']==dataThis[0].alter);
                    } else if (titleAlts.split("").length>0 && selectA=="all" ){
                      return (row['nameU'].split(" ")[0]==nameUnitS | row['alter']==dataThis[0].alter);
                    } else if (selectA!="all" ){
                      return (row['empire'] ==nameEmp| row['nameU'].split(" ")[0]==nameUnitS);
                    } else if(selectA=="all" ){
                      return (row['nameU'].split(" ")[0]==nameUnitS);
                    } else {
                      return (row['nameU']==nameUnitF && row['locality']==nameTown);
                    };
                  });
                  //console.log(dataMax);



                        for (i=0;i<copy[0].length;i++){
                          var xC=((copy[0][i].getAttribute("x")));
                          var yC=((copy[0][i].getAttribute("y")));
                          var fillC=((copy[0][i].getAttribute("fill")));
                          var opaC=((copy[0][i].getAttribute("opacity")));
                          
                          if (opaC>.2){      
                          group8a.append("rect")
                                  .attr("x", xC)
                                  .attr("y", yC)
                                  .attr("height", gridM)
                                  .attr("width", gridM)
                                  .attr("id", "colorM")
                                  .attr("tagg", tagL)

                                  .attr("opacity", opaC)
                                  .attr("fill", fillC)
                                  ;
                                };
                        };


                  group9.append("text")
                      .attr("x", d3.select(this).attr("x")-(-gridM/2))
                       .attr("y", d3.select(this).attr("y")-(-gridM)-6)
                       .attr("text-anchor", "middle")
                       .attr("font-size", "12px")
                       .attr("font-weight", "400")
                       .attr("text-transform", "capitalize")
                       .text(d3.select(this).attr("labelU"))
                        .attr("id", "colorT")
                        ;



                  group7.append("rect")
                        .attr("id", "windowB")
                        .attr("tagg", tagL)
                        .attr("x", xU)
                        .attr("y", yU)
                        .attr("height", 500)
                        .attr("width", 650)
                        .attr("fill", "#ffffff")
                        .attr("opacity", ".95")
                        .attr("stroke", "#000000")
                        .attr("stroke-width", ".5px")


                        // set to remove square
                        .on ("click", function(){

                            var itemX = d3.select(this).attr("x");
                            var itemY = d3.select(this).attr("y");
                            var itemT = d3.select(this).attr("tagg");

                            var series = d3.selectAll("#windowB");
                            var series2 = d3.selectAll("#windowBd");
                            var series3 = d3.selectAll("#windowBc");
                            var series4 = d3.selectAll("#colorM");
                            var series5 = d3.selectAll("#colorT");
                            var series6 = d3.selectAll("#popT");
                            var series7 = d3.selectAll("#pgs");
                            var series8 = d3.selectAll("#map");
                            var series9 = d3.selectAll("#mapBase");
                            var series10 = d3.selectAll("#mapBaseA");
                            var series11 = d3.selectAll("#gridSolid");

                            var seriesComp = series3.concat(series4, series6, series7, series8, series9, series10, series11);
                            ////console.log(seriesComp);

                        for (i=0;i<series[0].length;i++){
                          var c=((series[0][i].getAttribute("x")));
                          var d=((series[0][i].getAttribute("y")));
                          
                          if (c==itemX && d== itemY){
                            series[0][i].setAttribute("id", "erase2");
                            series2[0][i].setAttribute("id", "erase2");
                            series5[0][i].setAttribute("id", "erase2");
                          };
                        };
                        //all those using taggs!
                        for (j=0;j<seriesComp.length;j++){
                        for (i=0;i<seriesComp[j].length;i++){
                          var e=((seriesComp[j][i].getAttribute("tagg")));
                          
                          if (e==itemT){
                            seriesComp[j][i].setAttribute("id", "erase2");
                          };
                        };
                      };
                            d3.selectAll("#erase2").remove();
                        });

                  group7.append("rect")
                        .attr("id", "windowBd")
                        .attr("x", xU+5)
                        .attr("y", yU+5)
                        
                        .attr("height", 490)
                        .attr("width", 640)
                        .attr("fill", "none")
                     .attr("opacity", 0)
                     .transition()
                     .delay(100)
                     .duration(250)
                        .attr("opacity", "1")
                        .attr("stroke", "#000000")
                        .attr("stroke-width", "1px");

               group7.append("text")
                        .attr("id", "popT")
                        .attr("x", xU+25)
                        .attr("y", yU+35)
                        .attr("tagg", tagL)
                        .text(title[0])
                        .attr("fill", "#404040")
                        .attr("font-size", "18px")
                    
                     .attr("opacity", 1)
                        ;

                group7.append("text")
                        .attr("id", "popT")
                        .attr("x", xU+25)
                        .attr("y", yU+50)
                        .attr("tagg", tagL)
                        .text(title[1])
                        .attr("fill", "#404040")
                        .attr("font-size", "10px")
                    
                     .attr("opacity", 1)
                        ;

              group7.append("text")
                        .attr("id", "popT")
                        .attr("x", xU+25)
                        .attr("y", yU+65)
                        .attr("tagg", tagL)
                        .text(title[2])
                        .attr("fill", "#404040")
                        .attr("font-size", "10px")
                    
                     .attr("opacity", 1)
                        ;

              group7.append("text")
                        .attr("id", "windowBc")
                        .attr("x", xU-10+650)
                        .attr("y", yU+20)
                        .text("click background to close")
                        .attr("tagg", tagL)
                        .attr("fill", "#404040")
                        .attr("font-size", "8px")
                        .attr("font-style", "italic")
                        .attr("text-anchor", "end")
                    .attr("opacity", 0)
                     .transition()
                     .delay(150)
                     .duration(250)
                     .attr("opacity", .5)
                        ;

              group7.append("text")
                        .attr("id", "windowBc")
                        .attr("x", xU+498)
                        .attr("y", yU+55)
                        .text("hoover to enlarge")
                        .attr("tagg", tagL)
                        .attr("fill", "#404040")
                        .attr("font-size", "8px")
                        .attr("font-style", "italic")
                        .attr("text-anchor", "start")
                    .attr("opacity", 0)
                     .transition()
                     .delay(150)
                     .duration(250)
                     .attr("opacity", .5)
                        ;

          /*  group7.append("rect") // map background
                        .attr("id", "map")
                        .attr("x", xU+30)
                        .attr("y", yU+275)
                        .attr("tagg", tagL)
                        .attr("height", 195)
                        .attr("width", 440)
                        .attr("fill", "#000000")
                     .attr("opacity", 0)
                     .transition()
                     .delay(100)
                     .duration(250)
                        .attr("opacity", "1"); */
              var clips= (d3.selectAll("clipPath")[0].length+1);

              group7.append('clipPath') // hurrah, brilliant things can be clipped!
                       .attr('id', "clip"+clips)
                       .append('rect')
                        .attr("x", xU+30)
                        .attr("y", yU+280)
                        .attr("tagg", tagL)
                        .attr("height", 185)
                        .attr("width", 440);


            group7.append("svg:image") // raster map
                        .attr("id", "map")
                        .attr("x", xU+30)
                        .attr("y", yU+275)
                        .attr("tagg", tagL)
                        .attr("height", 195)
                        .attr("width", 440)
                        //.attr("xlink:href","/imgText/"+dataThis[0].UDtxP+".jpg")
                        .attr("xlink:href","/data/mapJ.jpg")
                        .attr("clip-path", "url(#clip" + clips + ")")
                        //.attr("fill", "url(#backFill)")
                        .attr("opacity", ".1")
                        ;



      var projection = d3.geo.mercator()
          .scale(600)
          .translate([xU+30+220, yU+275+95])
          .center([30,30])
          //.center([-71.49828230419597,42.06488679447954])
          .precision(.1);

      var path = d3.geo.path()
          .projection(projection);       

      // use raster instead:
      /*             

        d3.json("/data/countries.json", function(json1) {

        
        group7.selectAll("line")
              .data(json1.features)
             .enter()
             .append("path")
             .attr("d", path)
             .attr("stroke", "#bdbdbd")
             .attr("stroke-width", ".25")
             .attr("tagg", tagL)
             .attr("clip-path", "url(#clip" + clips + ")")
             .attr("id", "mapBase")
             .attr("fill", "#ffffff")
             .attr("opacity", "1")
             ; 

        }); */

      group7.selectAll("polyline")
                 //.data(datasetG)
                .data(dataMax)
                .enter()
                .append("circle")
                .attr("tagg", tagL)
                .attr("iter", clips)
                .attr("id", "mapBase")
                 //.transition(t)
                 .attr("cx", function(d) {
                   return projection([d.lon, d.lat])[0];
                 })
                 .attr("cy", function(d) {
                   return projection([d.lon, d.lat])[1];
                 })
                 .attr("r", function(d) {
                  if (d.nameU == nameUnitF){
                    return 5;
                   } else {
                    return 2;
                   };
                 })
                 .attr("fill", function(d) {
                   if (d.nameU == nameUnitF){ // full unit
                    return "#339999";
                   } else if (d.nameU.split(" ")[0] == nameUnitS){ //unit variation close
                    return "#000000"; 
                   } else if (d.empire == nameEmp) { // within empire
                      return "#A0A0A0";
                    } else { // international variants
                    return "#606060";
                   };
                 })
                .attr("opacity", .75)
                .attr("nameLabel", function(d) {
                   return d.nameU+", "+d.locality;
                 })
               .attr("clip-path", "url(#clip" + clips + ")")
               ;

        //hoover at bottom of map space... highlight to bring up name - line to site       



        group7.selectAll("polyline")
                 //.data(datasetG)
                .data(dataMax)
                .enter()
                .append("circle")
                .attr("tagg", tagL)
                .attr("iter", clips)
                .attr("id", "mapBaseA")
                 //.transition(t)
                 .attr("nameLabel", function(d) {
                   return d.nameU+", "+d.locality;
                 })
                 .attr("cx", function(d, i) {
                   return (xU+36)+((i)*428/(dataMax.length-1)) ;
                   //return xU+35;
                 })
                 .attr("cy", yU+275+185)
                 //.attr("x", xU+30)
                 //.attr("width", 440)
                        //.attr("y", yU+275)
                        //.attr("height", 195)

                 .attr("r", function(d) {
                   if (d.nameU == nameUnitF){ // full unit
                    return 5;
                   } else {
                    return 2;

                   };
                 })
                 .attr("fill", function(d) {
                   if (d.nameU == nameUnitF){ // full unit
                    return "#339999";
                   } else if (d.nameU.split(" ")[0] == nameUnitS){ //unit variation close
                    return "#000000"; 
                   } else if (d.empire == nameEmp) { // within empire
                      return "#A0A0A0";
                    } else { // international variants
                    return "#606060";
                   };
                 })
                 .attr("connect", function(d) {
                   if (d.nameU == nameUnitF){ // full unit
                    return "core unit";
                   } else if (d.nameU.split(" ")[0] == nameUnitS){ //unit variation close
                    return "material variant"; 
                   } else if (d.empire == nameEmp) { // within empire
                      return "used in "+ d.empire;
                    } else { // international variants
                    return "international equivalents";
                   };
                 })
                .attr("opacity", .75)
                .on("mouseover", function(d) {
                  //draw .25 line to mapped dot and dock label at top (note connection?)
                  var connect = d3.select(this).attr("connect");
                  var nameLabel = d3.select(this).attr("nameLabel");
                  var iteration = d3.select(this).attr("iter");
                  var x01 = d3.select(this).attr("cx");
                  var y01 = d3.select(this).attr("cy");
                  

                  //set label, relationship at top

                  group7.append("text")
                        .attr("id", "mapBaseA1")
                        .attr("x", xU+80)
                        .attr("y", yU+270)
                        .text(nameLabel+"; Relationship: "+connect)
                        .attr("tagg", tagL)
                        .attr("fill", "#000000")
                        .attr("font-size", "12px")
                        .attr("text-anchor", "start")
                     .attr("opacity", 1)
                        ;


                  //search map for connection lines

                  var a= d3.selectAll("#mapBase");

                        for (i=0;i<a[0].length;i++){
                          var x02=((a[0][i].getAttribute("cx")));
                          var y02=((a[0][i].getAttribute("cy")));
                          var nL=((a[0][i].getAttribute("nameLabel")));
                          var itera =((a[0][i].getAttribute("iter")));
                          
                          if (nL==nameLabel && itera == iteration){

                          group7.append("line")
                                .attr("id", "mapBaseA1")
                                .attr("x1", x01)
                                .attr("y1", y01)
                                .attr("x2", x02)
                                .attr("y2", y02)
                                .attr("opacity", 1)
                                .attr("stroke", "#000000")
                                .attr("stroke-width", .5)
                                .attr("clip-path", "url(#clip" + clips + ")")
                                ;
                          };
                        };
                })
               .on("mouseout", function() {
                d3.selectAll("#mapBaseA1").remove();
               })
               ;

               group7.append("text")
                        .attr("id", "mapBaseA")
                        .attr("x", xU+30)
                        .attr("y", yU+270)
                        .text("Shown:")
                        .attr("tagg", tagL)
                        .attr("fill", "#000000")
                        .attr("font-size", "12px")
                        .attr("text-anchor", "start")
                     .attr("opacity", 1)
                        ;

               group7.append("text")
                        .attr("id", "windowBc")
                        .attr("x", xU+30)
                        .attr("y", yU+275+205)
                        .text("hoover on bottom row for leaders, labels (shows within type and alphabetic choice, empire not shown for 'all')")
                        .attr("tagg", tagL)
                        .attr("fill", "#404040")
                        .attr("font-size", "8px")
                        .attr("font-style", "italic")
                        .attr("text-anchor", "start")
                    .attr("opacity", 0)
                     .transition()
                     .delay(150)
                     .duration(250)
                     .attr("opacity", .5)
                        ;

               group7.append("text")
                        .attr("id", "windowBc")
                        .attr("x", xU+498)
                        .attr("y", yU+275+205)
                        .text("note: randomized, will be updated")
                        .attr("tagg", tagL)
                        .attr("fill", "#404040")
                        .attr("font-size", "8px")
                        .attr("font-style", "italic")
                        .attr("text-anchor", "start")
                    .attr("opacity", 0)
                     .transition()
                     .delay(150)
                     .duration(250)
                     .attr("opacity", .5)
                        ;
                group7.append("svg:image") // upper page
                        .attr("id", "pgs")
                        .attr("x", xU+495)
                        .attr("y", yU+60)
                        .attr("tagg", tagL)
                        .attr("height", 195)
                        .attr("width", 125)
                        .attr("xlink:href","/imgList/"+dataThis[0].pg+".jpg")
                        .attr("opacity", "1")
                        .attr("stroke", "#000000")
                        .attr("stroke-width", "1px")
                        .on("mouseover", function(){
                          d3.select(this).attr("width", 375);
                          d3.select(this).attr("height", 585);
                          d3.select(this).attr("y", yU+60+195-585);
                          if (d3.select(this).attr("x")>(w-375)){
                            d3.select(this).attr("x", w-375);
                          } else {
                            d3.select(this).attr("x", xU+495);
                          };
                        })
                        .on("mouseout", function(){
                          d3.select(this).attr("width", 125);
                          d3.select(this).attr("height", 195);
                          d3.select(this).attr("y", yU+60)
                          d3.select(this).attr("x", xU+495)
                        })
                        ;

            //randomized until i enter data to align
            var pgR = parseInt((Math.floor(Math.random() * (30 - 1)) + 1)).toLocaleString('en-IN', {minimumIntegerDigits: 3 });
            //console.log(pgR);

            group7.append("svg:image") // lower page
                        .attr("id", "pgs")
                        .attr("x", xU+495)
                        .attr("y", yU+275)
                        .attr("tagg", tagL)
                        .attr("height", 195)
                        .attr("width", 125)
                        //.attr("xlink:href","/imgText/"+dataThis[0].UDtxP+".jpg")
                        .attr("xlink:href","/imgText/"+pgR+".jpg")
                        //.attr("fill", "url(#backFill)")
                        .attr("opacity", "1")
                        .attr("stroke", "#000000")
                        .attr("stroke-width", "1px")
                        .on("mouseover", function(){
                          d3.select(this).attr("width", 375);
                          d3.select(this).attr("height", 585);
                          if (d3.select(this).attr("x")>(w-375)){
                            d3.select(this).attr("x", w-375);
                          } else {
                            d3.select(this).attr("x", xU+495);
                          };
                        })
                        .on("mouseout", function(){
                          d3.select(this).attr("width", 125);
                          d3.select(this).attr("height", 195);
                          d3.select(this).attr("x", xU+495)
                        })
                        ;



          //--------------------------------------------------------------VISUAL TRANSLATIONS------------------------------------------------------------------------------------------

          /* for each unit we need:
          character (initial sort)
          val 
          unit
 
          conversion table is dataConvert 
          for each match unit to d.uL, run number to determine best uC and multiply value * d.valM
          
          label at R should read # over d.unitC

          bottom translation if d.valM > 1 should read 'd.valM d.unitC = 1 d.unitL'
          if d.valM < 1 should read 'd.valM/1 d.unitL = 1 d.unitC'

          */


              var value = dataThis[0].val;
              var unit = dataThis[0].unit;


          //-------------------------------------------THE GRID - WEIGHT/SOLIDS/CAPACITY/surface areas-------------------------------------------------------------------------------------------------------------
          
          if (dataThis[0].character == "liquid capacity" | dataThis[0].character == "dry capacity" | dataThis[0].character == "solid" | dataThis[0].character == "weight (metals)" | dataThis[0].character == "weight" | dataThis[0].character == "superficial"){

           dataCon =  dataConvert.filter(function(row) {              
                      return (row['uL']==unit);
                  }); 

              var tally=" ";
              var tally2=" ";
              dataCon.forEach(function(d){
                if (d.valM>1){
                tally=tally+" "+Math.round(d.valM)+" "+d.unitC+" = ";
                } else if (d.valM==1){
                tally=tally+" "+d.valM+" "+d.unitC;
                } else {
                tally2=tally2+" "+Math.round(1/d.valM)+" "+unit+" = "+ d.unitC+",";
                };
              });
              //console.log(tally);

              var mm=0;
              var units="plc"
              dataCon.forEach(function(d){
                  if (value*d.valM<51){
                    if (value*d.valM>mm){
                      mm=value*d.valM;
                      units=d.uC;
                    }
                  }
                  //test.push(d.unitC+" "+value*d.valM);
              });
              //console.log(mm, unit);

              dataC =  dataCon.filter(function(row) {              
                      return (row['uC']==units);
                  }); 
              dataConv = dataC[0];
              //console.log(dataConv);


                        
                        var grid1 =285;
                        var gridWW = grid1/10;
                        var total = value*dataConv.valM;
                        var totalFloor = Math.floor(total);
                        var totalS = total- totalFloor;

                        var count = [];
                        var u = 1;
                        for (i=0;i<totalFloor;i++){
                          count.push(u);
                        };
                        count.push(totalS);

                        var countS = [];
                        var u = 1;
                        for (i=0;i<50;i++){
                          countS.push(u);
                        };

                        //console.log("1 "+dataThis[0].nameU+" = " +total+ " "+dataConv.unitC, count);
  

            group7.append("text")
                      .attr("id", "gridSolid")
                      .attr("tagg", tagL)
                      .attr("x", xU+grid1/2+82)
                      .attr("y", yU+230-5)
                      .attr("font-size", "8px")
                      .attr("font-style", "italic")
                      .attr("text-anchor", "middle")
                      .attr("fill", "#404040")
                      //bottom translation if d.valM > 1 should read 'd.valM d.unitC = 1 d.unitL'
                      //if d.valM < 1 should read 'd.valM/1 d.unitL = 1 d.unitC'
                      .text(tally)
                      .attr("opacity", 0)
                      .transition()
                      .delay(250)
                      .duration(250)
                      .attr("opacity", .5)
                      ; 

              group7.append("text")
                      .attr("id", "gridSolid")
                      .attr("tagg", tagL)
                      .attr("x", xU+grid1/2+82)
                      .attr("y", yU+240-5)
                      .attr("font-size", "8px")
                      .attr("font-style", "italic")
                      .attr("text-anchor", "middle")
                      .attr("fill", "#404040")
                      //bottom translation if d.valM > 1 should read 'd.valM d.unitC = 1 d.unitL'
                      //if d.valM < 1 should read 'd.valM/1 d.unitL = 1 d.unitC'
                      .text(tally2)
                      .attr("opacity", 0)
                      .transition()
                      .delay(250)
                      .duration(250)
                      .attr("opacity", .5)
                      ;

              group7.append("text")
                      .attr("id", "gridSolid")
                      .attr("tagg", tagL)
                      .attr("x", xU+40)
                      .attr("y", yU+200-5)
                      .attr("font-size", "18pt")
                      .attr("text-anchor", "start")
                      //bottom translation if d.valM > 1 should read 'd.valM d.unitC = 1 d.unitL'
                      //if d.valM < 1 should read 'd.valM/1 d.unitL = 1 d.unitC'
                      .text("1 =")
                      .attr("opacity", 0)
                      .transition()
                      .delay(250)
                      .duration(250)
                      .attr("opacity", 1); 

              group7.append("text")
                      .attr("id", "gridSolid")
                      .attr("tagg", tagL)
                      .attr("x", xU+10+grid1+82)
                      .attr("y", yU+200-5)
                      .attr("font-size", "18pt")
                      .attr("text-anchor", "start")
                      //bottom translation if d.valM > 1 should read 'd.valM d.unitC = 1 d.unitL'
                      //if d.valM < 1 should read 'd.valM/1 d.unitL = 1 d.unitC'
                      .text("= "+total.toLocaleString('en-IN', {SigificantDigits: 2 }))
                      .attr("opacity", 0)
                      .transition()
                      .delay(250)
                      .duration(250)
                      .attr("opacity", 1);  

                group7.append("text")
                      .attr("id", "gridSolid")
                      .attr("tagg", tagL)
                      .attr("x", xU+10+grid1+82+20)
                      .attr("y", yU+215-5)
                      .attr("font-size", "10pt")
                      .attr("text-anchor", "start")
                      //bottom translation if d.valM > 1 should read 'd.valM d.unitC = 1 d.unitL'
                      //if d.valM < 1 should read 'd.valM/1 d.unitL = 1 d.unitC'
                      .text(dataConv.unitC.split(" ")[0])
                      .attr("opacity", 0)
                      .transition()
                      .delay(250)
                      .duration(250)
                      .attr("opacity", 1);   

              group7.selectAll("polyline")
                      .data(countS)
                      .enter()
                      .append("rect")
                      .attr("x", (function(d,i){
                        if (i<10*Math.floor((i+10)/10)){ 
                          return (xU+82)+(i-(Math.floor(i/10)*10))*gridWW;
                        };}))
                      .attr("y", (function(d,i){
                        if (i<10){
                          return yU+188-5;
                        } else if (i<20){
                          return yU+161-5;
                        } else if (i<30){
                          return yU+134-5;
                        } else if (i<40){
                          return yU+107-5;
                        }else if (i<50){
                          return yU+80-5;
                        };
                      }))
                      .attr("width", (function(d){
                        return 23*d;
                      }))
                      .attr("height", (function(d){
                        return 23;
                      }))
                      .attr("id", "gridSolid")
                      .attr("tagg", tagL)
                      .attr("fill", "none")
                      .attr("stroke", "#404040")
                      .attr("opacity", 0)
                      .transition()
                      .delay(250)
                      .duration(250)
                      .attr("opacity", .5)
                      .attr("stroke-width", .5)
                      .attr("stroke-dasharray", "2,2")
                     ;
        
                group7.selectAll("polyline")
                      .data(count)
                      .enter()
                      .append("rect")
                      .attr("x", (function(d,i){
                        if (i<10*Math.floor((i+10)/10)){ 
                          return (xU+82)+(i-(Math.floor(i/10)*10))*gridWW;
                        };}))
                      .attr("y", (function(d,i){
                        if (i<10){
                          return yU+188-5;
                        } else if (i<20){
                          return yU+161-5;
                        } else if (i<30){
                          return yU+134-5;
                        } else if (i<40){
                          return yU+107-5;
                        }else if (i<50){
                          return yU+80-5;
                        }
                        ;
                      }))
                      .attr("width", (function(d){
                        return 0;
                      }))
                      .attr("height", (function(d){
                        return 23;
                      }))
                      .attr("id", "gridSolid")
                      .attr("tagg", tagL)
                      .transition()
                     .delay(250)
                     .duration(250)
                     .attr("width", (function(d){
                        return 23*d;
                      }))
                     ; 



//--------------------------------------------------------------------LENGTH VERSION--------------------------------------------------------------------

          } else if (dataThis[0].character == "length" | dataThis[0].character == "itinerary"){

              //console.log("length lines!");
                         dataCon =  dataConvert.filter(function(row) {              
                      return (row['uL']==unit);
                  }); 

              var tally=" ";
              var tally2=" ";
              dataCon.forEach(function(d){
                if (d.valM>1){
                tally=tally+" "+Math.round(d.valM)+" "+d.unitC+" = ";
                } else if (d.valM==1){
                tally=tally+" "+d.valM+" "+d.unitC;
                } else {
                tally2=tally2+" "+Math.round(1/d.valM)+" "+unit+" = "+ d.unitC+",";
                };
              });
              //console.log(tally);

              var mm=0;
              var units="plc"
              dataCon.forEach(function(d){
                  if (value*d.valM<41){
                    if (value*d.valM>mm){
                      mm=value*d.valM;
                      units=d.uC;
                    }
                  }
                  //test.push(d.unitC+" "+value*d.valM);
              });
              //console.log(mm, unit);

              dataC =  dataCon.filter(function(row) {              
                      return (row['uC']==units);
                  }); 
              dataConv = dataC[0];
              //console.log(dataConv);


                        
                        var grid1 =285;
                        var gridWW = grid1/10;
                        var total = value*dataConv.valM;
                        var totalFloor = Math.floor(total);
                        var totalS = total- totalFloor;

                        var count = [];
                        var u = 1;
                        for (i=0;i<totalFloor;i++){
                          count.push(u);
                        };
                        count.push(totalS);

                        var countS = [];
                        var u = 1;
                        for (i=0;i<40;i++){
                          countS.push(u);
                        };

                        //console.log("1 "+dataThis[0].nameU+" = " +total+ " "+dataConv.unitC, count);


            group7.append("text")
                      .attr("id", "gridSolid")
                      .attr("tagg", tagL)
                      .attr("x", xU+grid1/2+82)
                      .attr("y", yU+230-5)
                      .attr("font-size", "8px")
                      .attr("font-style", "italic")
                      .attr("text-anchor", "middle")
                      .attr("fill", "#404040")
                      //bottom translation if d.valM > 1 should read 'd.valM d.unitC = 1 d.unitL'
                      //if d.valM < 1 should read 'd.valM/1 d.unitL = 1 d.unitC'
                      .text(tally)
                      .attr("opacity", 0)
                      .transition()
                      .delay(250)
                      .duration(250)
                      .attr("opacity", .5)
                      ; 

              group7.append("text")
                      .attr("id", "gridSolid")
                      .attr("tagg", tagL)
                      .attr("x", xU+grid1/2+82)
                      .attr("y", yU+240-5)
                      .attr("font-size", "8px")
                      .attr("font-style", "italic")
                      .attr("text-anchor", "middle")
                      .attr("fill", "#404040")
                      //bottom translation if d.valM > 1 should read 'd.valM d.unitC = 1 d.unitL'
                      //if d.valM < 1 should read 'd.valM/1 d.unitL = 1 d.unitC'
                      .text(tally2)
                      .attr("opacity", 0)
                      .transition()
                      .delay(250)
                      .duration(250)
                      .attr("opacity", .5)
                      ;

              group7.append("text")
                      .attr("id", "gridSolid")
                      .attr("tagg", tagL)
                      .attr("x", xU+40)
                      .attr("y", yU+200-5)
                      .attr("font-size", "18pt")
                      .attr("text-anchor", "start")
                      //bottom translation if d.valM > 1 should read 'd.valM d.unitC = 1 d.unitL'
                      //if d.valM < 1 should read 'd.valM/1 d.unitL = 1 d.unitC'
                      .text("1 =")
                      .attr("opacity", 0)
                      .transition()
                      .delay(250)
                      .duration(250)
                      .attr("opacity", 1); 

              group7.append("text")
                      .attr("id", "gridSolid")
                      .attr("tagg", tagL)
                      .attr("x", xU+10+grid1+82)
                      .attr("y", yU+200-5)
                      .attr("font-size", "18pt")
                      .attr("text-anchor", "start")
                      //bottom translation if d.valM > 1 should read 'd.valM d.unitC = 1 d.unitL'
                      //if d.valM < 1 should read 'd.valM/1 d.unitL = 1 d.unitC'
                      .text("= "+total.toLocaleString('en-IN', {SigificantDigits: 2 }))
                      .attr("opacity", 0)
                      .transition()
                      .delay(250)
                      .duration(250)
                      .attr("opacity", 1);  

                group7.append("text")
                      .attr("id", "gridSolid")
                      .attr("tagg", tagL)
                      .attr("x", xU+10+grid1+82+20)
                      .attr("y", yU+215-5)
                      .attr("font-size", "10pt")
                      .attr("text-anchor", "start")
                      //bottom translation if d.valM > 1 should read 'd.valM d.unitC = 1 d.unitL'
                      //if d.valM < 1 should read 'd.valM/1 d.unitL = 1 d.unitC'
                      .text(dataConv.unitC.split(" ")[0])
                      .attr("opacity", 0)
                      .transition()
                      .delay(250)
                      .duration(250)
                      .attr("opacity", 1);   

              group7.selectAll("polyline")
                      .append("rect")
                      .attr("x", xU+82)
                      .attr("y", yU+80-5)
                      .attr("width", 27)
                      .attr("height", 1)
                      .attr("id", "gridSolid")
                      .attr("tagg", tagL)
                      .attr("fill", "none")
                      .attr("stroke", "#404040")
                      .attr("opacity", .5)
                      .attr("stroke-width", 1)
                      .attr("stroke-dasharray", "2,2")
                     ;
        
                group7.selectAll("polyline")
                      .data(count)
                      .enter()
                      .append("rect")
                      .attr("x", (function(d,i){
                        if (i<10*Math.floor((i+10)/10)){ 
                          return (xU+82)+(i-(Math.floor(i/10)*10))*gridWW;
                        };}))
                      .attr("y", (function(d,i){
                        if (i<10){
                          return yU+188-5;
                        } else if (i<20){
                          return yU+161-5;
                        } else if (i<30){
                          return yU+134-5;
                        } else if (i<40){
                          return yU+107-5;
                        }
                        ;
                      }))
                      .attr("width", (function(d){
                        return 0;
                      }))
                      .attr("height", (function(d){
                        return 4;
                      }))
                      .attr("id", "gridSolid")
                      .attr("tagg", tagL)
                      .transition()
                     .delay(250)
                     .duration(250)
                     .attr("width", (function(d){
                        return 27*d;
                      }))
                     ;

          } else {

              ////console.log("superficial!");

          };







                group7.append("svg:image") // upper page
                        .attr("id", "pgs")
                        .attr("x", xU+495)
                        .attr("y", yU+60)
                        .attr("tagg", tagL)
                        .attr("height", 195)
                        .attr("width", 125)
                        .attr("xlink:href","/imgList/"+dataThis[0].pg+".jpg")
                        .attr("opacity", "1")
                        .attr("stroke", "#000000")
                        .attr("stroke-width", "1px")
                        .on("mouseover", function(){
                          d3.select(this).attr("width", 375);
                          d3.select(this).attr("height", 585);
                          d3.select(this).attr("y", yU+60+195-585);
                          if (d3.select(this).attr("x")>(w-375)){
                            d3.select(this).attr("x", w-375);
                          } else {
                            d3.select(this).attr("x", xU+495);
                          };
                        })
                        .on("mouseout", function(){
                          d3.select(this).attr("width", 125);
                          d3.select(this).attr("height", 195);
                          d3.select(this).attr("y", yU+60)
                          d3.select(this).attr("x", xU+495)
                        })
                        ;

            //randomized until i enter data to align
            var pgR = parseInt((Math.floor(Math.random() * (30 - 1)) + 1)).toLocaleString('en-IN', {minimumIntegerDigits: 3 });
            //console.log(pgR);

            group7.append("svg:image") // lower page
                        .attr("id", "pgs")
                        .attr("x", xU+495)
                        .attr("y", yU+275)
                        .attr("tagg", tagL)
                        .attr("height", 195)
                        .attr("width", 125)
                        //.attr("xlink:href","/imgText/"+dataThis[0].UDtxP+".jpg")
                        .attr("xlink:href","/imgText/"+pgR+".jpg")
                        //.attr("fill", "url(#backFill)")
                        .attr("opacity", "1")
                        .attr("stroke", "#000000")
                        .attr("stroke-width", "1px")
                        .on("mouseover", function(){
                          d3.select(this).attr("width", 375);
                          d3.select(this).attr("height", 585);
                          if (d3.select(this).attr("x")>(w-375)){
                            d3.select(this).attr("x", w-375);
                          } else {
                            d3.select(this).attr("x", xU+495);
                          };
                        })
                        .on("mouseout", function(){
                          d3.select(this).attr("width", 125);
                          d3.select(this).attr("height", 195);
                          d3.select(this).attr("x", xU+495)
                        })
                        ;




}); //conversion tables

}); //letter range

}); //selector-type


}); // maps

}); //trans.csv

}); //port.csv


}); //abc20

