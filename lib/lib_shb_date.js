Date.prototype.format = function(format){
	var format = format || "YYYY-MM-DD hh:mm:ss" ;
	var d = this ;
	var obj = {
		YYYY: d.getFullYear(),
		MM: d.getMonth()+1,
		DD: d.getDate(),
		hh: d.getHours(),
		mm: d.getMinutes(),
		ss: d.getSeconds()
	};
	for(var i in obj){
		obj[i] = (obj[i] < 10) ? ("0"+obj[i]) : ("" + obj[i]) ;
		format = format.replace(i,obj[i]) ;
	}
	return format ;
}
Date.prototype.week = function(EN){
	var day = this.getDay() ;
	var dayCN = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"] ;
	var dayEN = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] ;
	if(EN == 'EN'){
		return dayEN[day] ;
	}
	return dayCN[day] ;
}