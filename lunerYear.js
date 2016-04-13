//从1900到2049年的农历数据公用20位来标记，前四位和后四位使用来标记，
//后四位用来表明润的是几月，当全为0时表示当年不用润月，前四位用来标记
//该年份是润大月还是润小月，他们在后四位不等于0的时候才有效。中间12位
//用来标记当年每月是大月还是小月，0表示小月，1表示大月
var lunarInfo = new Array(
0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0)

//国历节日 *表示节假日
var sFtv ={
		"1-1":"*元旦",
		"2-14":"情人节",
		"3-8":"妇女节",
		"3-12":"植树节",
		"3-15":"消费者权益日",	
		"4-1":"愚人节",
		"4-22":"世界地球日",	
		"5-1":"*劳动节",
		"5-4":"青年节",
		"5-8":"世界红十字日",
		"5-12":"国际护士节",
		"5-17":"世界电信日",
		"5-31":"世界无烟日",
		"6-1":"儿童节",
		"7-1":"建党节",
		"8-1":"建军节",
		"8-8":"父亲节",
		"9-10":"教师节",
		"10-1":"*国庆节",
		"11-8":"中国记者日",
		"11-9":"消防宣传日",
		"11-17":"国际大学生节",
		"12-1":"世界艾滋病日",
		"12-25":"圣诞节"
		};

//农历节日 *表示节假日
var lFtv ={
		"1-1":"*春节",
		"1-15":"元宵节",
		"5-5":"端午节",
		"7-7":"七夕情人节",
		"7-15":"中元节",
		"8-15":"中秋节",
		"9-9":"重阳节",
		"12-8":"腊八节",
		"12-23":"小年",
		};
//二十四节气
var solarTerms={
	"2016-2-4":"立春",
	"2016-2-19":"雨水",
	"2016-3-5":"惊蛰",
	"2016-3-20":"春分",
	"2016-4-4":"清明",
	"2016-4-19":"谷雨",
	"2016-5-5":"立夏",
	"2016-5-20":"小满",
	"2016-6-5":"芒种",
	"2016-6-21":"夏至",
	"2016-7-7":"小暑",
	"2016-7-22":"大暑",
	"2016-8-7":"立秋",
	"2016-8-23":"处暑",
	"2016-9-7":"白露",
	"2016-9-22":"秋分",
	"2016-10-8":"寒露",
	"2016-10-23":"霜降",
	"2016-11-7":"立冬",
	"2016-11-22":"小雪",
	"2016-12-7":"大雪",
	"2016-12-21":"冬至",
	"2017-1-5":"小寒",
	"2017-1-20":"大寒"
}
//农历的渲染
//起始的日期为1900.1.31
	function renderLuner(){
		var startDay=new Date(1900,1,31);
		var distance=parseInt(find-startDay)/(3600*24*1000);
	}
//根据数据获取每年的天数，每个农历月至少有29天，所以基数为348，
//在加上大月多出来的一天和闰月的天数即得到该年的天数
	function lYearDays(y) {
		   var i, sum = 348;
		   for(i=0x8000; i>0x8; i>>=1) 
		   	sum += (lunarInfo[y-1900] & i)? 1: 0;
		   return(sum+leapDays(y));
	}

//获取闰月的天数
	function leapDays(y) {
		   if(leapMonth(y))  
		   	return((lunarInfo[y-1900] & 0x10000)? 30: 29);
		   else return(0);
	}

//判断当年是否闰月
	function leapMonth(y) {
	   	return(lunarInfo[y-1900] & 0xf);
	}

//获取闰月的月份
	function getLeapMonth(y){
		var leapM=lunarInfo[y-1900] & 0xf;
		if(leapM)
			return parseInt(leapM);
	}

//获取某年某个月的天数
	function monthDays(y,m) {
	  	 return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
	}

//获取指定日期的农历
	function findLunar(someDay){
		var startDay=new Date(1900,0,31);
		var distance=1+parseInt(someDay-startDay)/(24*3600*1000);
		var year=1900;
		var month=1;
		for(year;distance>lYearDays(year)&&distance>0;year++){
			distance-=lYearDays(year);
		}
		var daysOfNextMonth=monthDays(year,month);
		var flag=true;
		for(month;distance>daysOfNextMonth&&distance>0;month++){
			distance-=daysOfNextMonth;
			if(month==getLeapMonth(year)&&flag){
				daysOfNextMonth=leapDays(year);
				month=month-1;
				flag=false;
			}
			else{
				daysOfNextMonth=monthDays(year,month+1);
			}
		}
		if(leapMonth(year)&&month>getLeapMonth(year))
			return [year,month,distance]
		else	
			return [year,month,distance];
	}
//国际节假日标注
	function findsFestival(someDay){
		var sYear=someDay.getFullYear();
		var sMonth=someDay.getMonth()+1;
		var sDay=someDay.getDate();
		var index_sf=sMonth+"\-"+sDay;
		for (name in sFtv){
			if(name==index_sf){
				return sFtv[name];
				break;
			}
			}
			return "";
		}

//中国传统节假日的标注
	function findlFestival(someDay){
		var LunarDay=findLunar(someDay);
		var index_lf=LunarDay[1]+"\-"+LunarDay[2];
		var n=someDay.getTime()+(3600*24*1000);
		var beforeChunjie=new Date(n);
		var chuxi=findLunar(beforeChunjie);
		var if_chuxi=chuxi[1]+"\-"+chuxi[2];
		if(if_chuxi=="1-1")
			return "除夕";
		else{
		for(i in lFtv){
			if(i==index_lf){
				return lFtv[i];
				break;
				}
			}
		}
		return "";
	}

//二十四节气标注
	function findSolarTerm(someDay){
		var Y=someDay.getFullYear();
		var M=someDay.getMonth()+1;
		var D=someDay.getDate();
		if(Y==2016||Y==2017){
			var index_term=Y+"\-"+M+"\-"+D;
			for(day in solarTerms)
			{
				if(day==index_term)
					return solarTerms[day];
			}
		}
		return "";
	}
