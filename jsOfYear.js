
	var times=document.getElementById('time1');
	var select_year=document.getElementById('selectyear');
	var select_month=document.getElementById('selectmonth');
	var backToday=document.getElementById('backToday');
	var find=new Date();
	var beijingTime=document.getElementById('beijingTime');
	
	//设置每月的天数
	var DaysOfMonth={
		1:31,2:[28,29],3:31,4:30,5:31,6:30,7:31,8:31,9:30,10:31,11:30,12:31
	}
	var lunarName=["初一","初二","初三","初四","初五","初六","初七","初八","初九","初十","十一","十二","十三","十四","十五",
			"十六","十七","十八","十九","廿","廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","卅"];
	//根据选择设置当前要跳转的年份
	function Get_year(){
		var index=select_year.selectedIndex;
		find.setFullYear(select_year.options[index].value);
		var index=select_month.selectedIndex;
		find.setMonth(index,1);
		findplace();
}
	select_year.onchange=Get_year;
	//跳转到前一年
	var preYear=document.getElementById('preYear');
	function toPreYear(){
		find.setFullYear(find.getFullYear()-1);
		var index=select_year.selectedIndex;
		select_year.options[index-1].selected="selected";
	}
	preYear.onclick=function(){
		toPreYear();
		findplace();
	};
	//t跳转到下一年
	var nextYear=document.getElementById('nextYear');
	function toNextYear(){
		find.setFullYear(find.getFullYear()+1);
		var index=select_year.selectedIndex;
		select_year.options[index+1].selected="selected";

	}
	nextYear.onclick=function(){
		toNextYear();
		findplace();
	};
	//跳转到上一月
	var preMonth=document.getElementById('preMonth');
	function toPreMonth(){
		var index_month=select_month.selectedIndex;
		if(find.getMonth()==0){
			toPreYear();
			select_month.options[11].selected="selected";
			find.setMonth(11);
		}
		else{
			find.setMonth(index_month-1);
			select_month.options[index_month-1].selected="selected";
		}
		findplace();
	}
	preMonth.onclick=toPreMonth;
	//跳转到下一个月
	var nextMonth=document.getElementById('nextMonth');
	function toNextMonth(){
		var index_month=select_month.selectedIndex;
		if(find.getMonth()==11){
			toNextYear();
			select_month.options[0].selected="selected";
			find.setMonth(0);
		}
		else{
			find.setMonth(index_month+1);
			select_month.options[index_month+1].selected="selected";
		}
		findplace();
	}
	nextMonth.onclick=toNextMonth;
	//显示今天的日期
	var showToday=document.getElementById('showToday');
	function show_Today(){
		var newDay=new Date();
		var nowY=newDay.getFullYear();
		var nowM=newDay.getMonth()+1;
		var nowD=newDay.getDate();
		showToday.innerHTML=nowY+"年"+nowM+"月"+nowD+"日";
	}
	//根据选择设置当前的月份
	function Get_month(){
		var index=select_month.selectedIndex;
		find.setMonth(index,1);
		findplace();
	}
	select_month.onchange=Get_month;

	var days=document.getElementsByClassName('day');
	//根据所选日期渲染页面
	function findplace(){	
		find.setDate(1);
		var index_Year=find.getFullYear();
		var Month=find.getMonth();
		var D_day=find.getDay();
		var indexDay=new Date(index_Year,Month,1);
		for(index in days){
			var lunarDay=findLunar(indexDay);
			if(index>=D_day&&indexDay.getMonth()==Month){
				days[index].innerHTML=indexDay.getDate()+"<br/>";
				if(findsFestival(indexDay)||findlFestival(indexDay)||findSolarTerm(indexDay)){
					if(findlFestival(indexDay))
						days[index].innerHTML+="<span class='lfestival'>"+findlFestival(indexDay)+"</span>";
					if(findsFestival(indexDay))
					days[index].innerHTML+="<span class='sfestival'>"+findsFestival(indexDay)+"</span><br>";
					if(findSolarTerm(indexDay))
					days[index].innerHTML+="<span class='solarTerm'>"+findSolarTerm(indexDay)+"</span><br>";
			}
					else
					days[index].innerHTML+="<span class='lunar'>"+lunarName[lunarDay[2]-1]+"</span>";
				indexDay.setDate(indexDay.getDate()+1);
			}
			else
				days[index].innerHTML=" ";
		}
	}
	//国际假期的显示
	
	//返回今天函数
	function back_today(){
		var Today=new Date();
		find=Today;
		init();
	}
	backToday.onclick=back_today;
	//标记当日的表格中的位置
	//显示时间
	function showTime(){
		var nowTime=new Date();
		var hour=nowTime.getHours();
		var minute=nowTime.getMinutes();
		var second=nowTime.getSeconds();
		if(hour<10){
			hour="0"+hour;
		}
		if(minute<10){
			minute="0"+minute;
		}
		if(second<10){
			second="0"+second;
		}
		beijingTime.innerHTML=hour+"\:"+minute+"\:"+second;
	}
	setInterval("showTime()",1000);
	//初始化页面
	function init(){
		var D=new Date();
		var nowyear=D.getFullYear();
		var nowmonth=D.getMonth();
		for(index in select_year.options){
			if(select_year.options[index].value==nowyear) {
				select_year.options[index].selected="selected";
			}
		}
		for(index in select_month.options){
			if(index==nowmonth) {
				select_month.options[index].selected="selected";
			}
		}
		findplace();	
		 showTime();
		 show_Today();
	}
	init();
