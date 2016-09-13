$(function(){
  var canvasS = 600;
  var row = 15;
  var blocksS = canvasS/row;
  var ctx = $('#canvas').get(0).getContext('2d');
  var r = function(deg){
    return (Math.PI/180) * deg;
  }
  $('#canvas').get(0).width = canvasS;
  $('#canvas').get(0).height = canvasS;
  var jiange = blocksS/2 + 0.5;
  var lineWidth = canvasS - blocksS;


 //画点
  var point = [3.5 * blocksS + 0.5,11.5 * blocksS + 0.5];
  // console.log(point)
  for(var i = 0; i < 2; i ++){
    for(var j = 0; j < 2; j ++){
      var x = point[i];
      var y = point[j];
      ctx.save();
      ctx.beginPath();
      ctx.translate(x,y);
      ctx.arc(0,0,5,0,r(360));
      ctx.fillStyle = '#000';
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  }
  ctx.save();
  ctx.beginPath();
  ctx.translate(7.5 * blocksS + 0.5,7.5 * blocksS + 0.5);
  ctx.arc(0,0,5,0,r(360));
  ctx.fillStyle = '#000';
  ctx.fill();
  ctx.closePath();
  ctx.restore();




  //画棋盘
  ctx.save();
  ctx.beginPath();
  for(var i = 0; i < row; i ++){
    if(i == 0){
      ctx.translate(jiange, jiange);
      ctx.moveTo(0,0);
      ctx.lineTo(lineWidth,0);
    }else{
      ctx.translate(0,blocksS);
      ctx.moveTo(0,0);
      ctx.lineTo(lineWidth,0);
    }
  }
  ctx.strokeStyle = '#733b2f';
  ctx.stroke();
  ctx.closePath();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  for(var i = 0; i < row; i ++){
    if(i == 0){
      ctx.translate(jiange, jiange);
      ctx.moveTo(0,0);
      ctx.lineTo(0,lineWidth);
    }else{
      ctx.translate(blocksS,0);
      ctx.moveTo(0,0);
      ctx.lineTo(0,lineWidth);
    }

  }
  ctx.strokeStyle = '#733b2f';
  ctx.stroke();
  ctx.closePath();
  ctx.restore();




  var drop = function(qizi){
    ctx.save();
    ctx.beginPath();
    ctx.translate((qizi.x + 0.5) * blocksS + 0.5, (qizi.y + 0.5)*blocksS + 0.5);
    ctx.arc(0,0,15,0,r(360));
    if( qizi.color === 1){
      ctx.fill();
    }else{
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#000';
      ctx.fill();
      ctx.stroke();
    }
    ctx.closePath();
    ctx.restore();
  }

  var flag = true;
  var All = {};
  var step = 1;
  var panduan =function(qizi){
    var shuju = {};
    $.each(All,function(k,v){
      if( v.color === qizi.color){
        shuju[k] = v;
      }
    })
    var shu = 1,heng = 1,youxie = 1,zuoxie = 1;
    var tx,ty;
    tx = qizi.x;ty = qizi.y;
    while( shuju[tx + '_' +(ty +1)]){
      shu++;ty++;
    }


    tx = qizi.x;ty = qizi.y;
    while( shuju[tx + '_' +(ty -1)]){
      shu++;ty--;
    }

    tx = qizi.x;ty = qizi.y;
    while( shuju[(tx+1) + '_' + ty]){
      heng++;tx++;
    }

    tx = qizi.x;ty = qizi.y;
    while( shuju[(tx-1) + '_' + ty]){
      heng++;tx--;
    }

    tx = qizi.x;ty = qizi.y;
    while( shuju[(tx+1) + '_' + (ty+1)]){
      zuoxie++;tx++;ty++;
    }
    tx = qizi.x;ty = qizi.y;
    while( shuju[(tx-1) + '_' + (ty-1)]){
      zuoxie++;tx--;ty--;
    }
    while( shuju[(tx-1) + '_' + (ty+1)]){
      youxie++;tx--;ty++;
    }
    while( shuju[(tx+1) + '_' + (ty-1)]){
      youxie++;tx++;ty--;
    }
    if( shu >=5  || heng>=5 || zuoxie>=5 || youxie>=5){
      return true;
    }
  }


   $('#canvas').on('click',function(e){
     var x = Math.floor(e.offsetX/blocksS);
     var y = Math.floor(e.offsetY/blocksS);
     if(All[x + '_' + y]){
       return;
     }
     var qizi;
     if(flag){
       qizi = {x: x,y: y,color: 1,step: step};
       drop(qizi);
       if( panduan(qizi) ){
         alert('黑棋赢！');
         return;
       }
     }else{
       qizi = {x: x,y: y,color: 0,step: step};
       drop(qizi);
       if( panduan(qizi) ){
         alert('白棋赢！');
         return;
       }
     }

     step += 1;
     flag = !flag;
     All[x + '_' + y] = qizi;
   });










})
