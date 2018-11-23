var versionCol = 0;
$(".dataTables_scrollHead table thead tr th").each(function(index, el) {
	if($(el).text().toLowerCase() == 'version'){
		versionCol = index;
		return;
	}
});

var versionArr = Array();

$("#filter-results-table tbody tr td:nth-child("+(versionCol+1)+")").each(function(index, el) {
	var v = $(el).text();

	if(versionArr.indexOf(v) == -1){
		versionArr.push(v);
	}	
});
versionArr.sort().reverse();

//Results
function hdProcessBugBase(){

	var dObj = new Date();
	var day = dObj.getDate(); day = (day < 10) ? ('0' + day) : day;
	var mon = dObj.getMonth() + 1; mon = (mon < 10) ? ('0' + mon) : mon;
	var year = dObj.getFullYear();

	var date = year + '-' + mon + '-' + day;

	//Selectors
	var nextButtonSelector = '#filter-results-table_next';
	var prevButtonSelector = '#filter-results-table_previous';
	var unresolvedSelector = 'td  span:contains(Unresolved)';
	
	var versionSelector = 'td:contains('+versionArr[0]+')';
	var daySelector = 'td:contains(\''+date+'\')';
	
	var confirmedSelector = 'td:contains(Confirmed)';
	var closedSelector = 'td:contains(Closed)';
	var ccConfirmedSelector = 'td:contains(CC Confirmed)';
	var hqConfirmedSelector = 'td:contains(HQ Confirmed)';
	var doubleConfirmedSelector = 'td:contains(Double Confirmed)';
	
	var undoSelector = 'td:contains(A - Tests Undoable)';
	var crashSelector = 'td:contains(B - Crash)';
	var essentialSelector = 'td:contains(C - Essential Req.)';
	var majorSelector = 'td:contains(D - Major)';

	var toconfirmSelector = 'td:contains(To Confirm)';
	var needHQConfirmationSelector = 'td:contains(Needs HQ Confirmation)';
	var needConfirmationSelector = 'td:contains(Needs Confirmation)';
	var cannotTestSelector = 'td:contains(Cannot Test)';
	var fixedSelector = 'td:contains(Fixed)';
	
	var tfuSelector = 'td:contains(To Fix in Update)';
	var tfwwSelector = 'td:contains(To Fix for WW launch)';
	var wnfSelector = 'td:contains(Will not fix)';
	var nabSelector = 'td:contains(Not a bug)';
	var tpSelector = 'td:contains(Third Party)';
	var cnrSelector = 'td:contains(Could not Reproduce)';
	var dupSelector = 'td:contains(Duplicate)';
	var naSelector = 'td:contains(Not Applicable)';
		
	var newSelector = 'td:contains(New)';
	var pendingSelector = 'td:contains(Pending)';
	var openSelector = 'td:contains(Open)';

	// Quantity of bugs
	var cntTotalBug = 0;
	var cntUnresolved = 0;
	var cntThisVersion = 0;
	var cntFoundToday = 0;
	
	var cntUndoFoundToday = 0;
	var cntCrashFoundToday = 0;
	var cntMajorFoundToday = 0;
	var cntEssentialFoundToday = 0;
	var cntCriticalFoundToday = 0;
	
	var cntUndoUnresolved = 0;
	var cntCrashUnresolved = 0;
	var cntMajorUnresolved = 0;
	var cntEssentialUnresolved = 0;
	var cntCriticalUnresolved = 0;

	var cntToConfirm = 0;
	var cntNeedConfirmation = 0;
	var cntCannotTest = 0;
	var cntToConfirm_Fixed = 0;
	var cntToConfirm_TFU = 0;
	var cntToConfirm_Remain = 0;
	
	var cntNew = 0;
	var cntPending = 0;
	var cntOpen = 0;

	var cntConfirmed = 0;
	var cntClosed = 0;
	var cntCCConfirmed = 0;
	var cntHQConfirmed = 0;
	var cntDoubleConfirmed = 0;

	var cntWaivedToConfirm = 0;
	var cntWaivedConfirmed = 0;
	var bugsElements = $('table#filter-results-table tr');
	var bugs = [];
	$('#bugbaseStatusResult').remove();
	
	
	for (var i = 1; i < bugsElements.length; i++) {
		var bugElem = bugsElements.eq(i);
		var bug = {
			
			isConfirmed: (bugElem.find(confirmedSelector).length > 0),			
			isClosed: (bugElem.find(closedSelector).length > 0),
			isCCConfirmed: (bugElem.find(ccConfirmedSelector).length > 0),
			isHQConfirmed: (bugElem.find(hqConfirmedSelector).length > 0),
			isDoubleConfirmed: (bugElem.find(doubleConfirmedSelector).length > 0),
			
			isUndo: (bugElem.find(undoSelector).length > 0),
			isEssential: (bugElem.find(essentialSelector).length > 0),
			isCrash: (bugElem.find(crashSelector).length > 0),
			isMajor: (bugElem.find(majorSelector).length > 0),

			isNew: (bugElem.find(newSelector).length > 0),
			isPending: (bugElem.find(pendingSelector).length > 0),
			isOpen: (bugElem.find(openSelector).length > 0),
			isUnresolved: (bugElem.find(unresolvedSelector).length > 0),
			
			isToConfirm: (bugElem.find(toconfirmSelector).length > 0),
			isNeedHQConfirmation: (bugElem.find(needHQConfirmationSelector).length > 0),
			isNeedConfirmation: (bugElem.find(needConfirmationSelector).length > 0),
			isCannotTest: (bugElem.find(cannotTestSelector).length > 0),
			isFixed: (bugElem.find(fixedSelector).length > 0),
			
			isConfirmed: (bugElem.find(confirmedSelector).length > 0),
			isVersion: (bugElem.find(versionSelector).length > 0 ),
			isDate: (bugElem.find(daySelector).length > 0),
			isTFWW: (bugElem.find(tfwwSelector).length > 0),
			isTFU: (bugElem.find(tfuSelector).length > 0),
			isWNF: (bugElem.find(wnfSelector).length > 0),
			isNAB: (bugElem.find(nabSelector).length > 0),
			isDUP: (bugElem.find(dupSelector).length > 0),
			isTP: (bugElem.find(tpSelector).length > 0),
			isCNR: (bugElem.find(cnrSelector).length > 0),
			isNA: (bugElem.find(naSelector).length > 0),
			
		};
		
		if(!bug.isConfirmed && !bug.isClosed && !bug.isCCConfirmed && !bug.isHQConfirmed && !bug.isDoubleConfirmed ){
			cntTotalBug++;
			if( bug.isUnresolved ){
				cntUnresolved++;
				if(bug.isUndo){ cntUndoUnresolved++; };
				if(bug.isCrash){ cntCrashUnresolved++; };
				if(bug.isEssential){ cntEssentialUnresolved++; };
				if( bug.isMajor){ cntMajorUnresolved++; };
				cntCriticalUnresolved = cntUndoUnresolved + cntCrashUnresolved + cntEssentialUnresolved + cntMajorUnresolved;
				
				if(bug.isNew ){
					cntNew++;}
				if(bug.isPending ){
					cntPending++;}
				if(bug.isOpen ){
					cntOpen++;}
			};
			if(bug.isToConfirm){
				cntToConfirm++;
				if(bug.isFixed ){ cntToConfirm_Fixed++; };
				if(bug.isTFU || bug.isTFWW){ cntToConfirm_TFU++; };
				if(bug.isWNF || bug.isNAB || bug.isDUP || bug.isTP || bug.isCNR || bug.isNA ){ cntToConfirm_Remain++; };
			};
			if(bug.isNeedConfirmation || bug.isNeedHQConfirmation){
				cntNeedConfirmation++;
			};
			if(bug.isCannotTest){
				cntCannotTest++;
			};
		};
		
		if(bug.isDate){
			cntFoundToday++;
			if(bug.isUndo){ cntUndoFoundToday++; };
			if(bug.isCrash){ cntCrashFoundToday++; };
			if(bug.isEssential){ cntEssentialFoundToday++; };
			if(bug.isMajor){ cntMajorFoundToday++; };
			cntCriticalFoundToday = cntUndoFoundToday + cntCrashFoundToday + cntEssentialFoundToday + cntMajorFoundToday;
		};
		if(bug.isVersion){
			cntThisVersion++;
		}
		
		bugs.push(bug);
	}
	var cntTotal = bugs.length;
	//console.log(bugs);
	
	var htmlTotal1 =
		'<tr>'
			+'<th colspan="2" style="background-color:#4A86E8; border: solid 1px black; margin:0; padding: 2px 5px; color:#fff;">Total issues remaining</th>'
			+'<td colspan="2" style="background-color:#4A86E8; border: solid 1px black; margin:0; padding: 2px 5px; color:#fff;">'+cntTotalBug+'</td>'			
		+'</tr>';
	var htmlRow1 = 
		'<tr>'
			+'<th style="width: 200px; background-color:#C9DAF8; border: solid 1px black; margin:0; padding: 2px 5px;">Critical issues found today</th>'
			+'<td style="width: 200px; border: solid 1px black; margin:0; padding: 2px 5px;">'+cntCriticalFoundToday+'</td>'
			+'<th style="width: 200px; background-color:#C9DAF8; border: solid 1px black; margin:0; padding: 2px 5px;">Issues found this version *</th>'
			+'<td style="width: 200px; border: solid 1px black; margin:0; padding: 2px 5px;">'+cntThisVersion+'</td>'
		+'</tr>';
	var htmlRow2 = 
		'<tr>'
			+'<th style="background-color:#C9DAF8; border: solid 1px black; margin:0; padding: 2px 5px;">Critical issues unresolved</th>'
			+'<td style="border: solid 1px black; margin:0; padding: 2px 5px;">'+cntCriticalUnresolved+'</td>'
			+'<th style="background-color:#C9DAF8; border: solid 1px black; margin:0; padding: 2px 5px;">Issues found today</th>'
			+'<td style="border: solid 1px black; margin:0; padding: 2px 5px;">'+cntFoundToday+'</td>'
		+'</tr>';
	var htmlRow3 = 
		'<tr>'
			+'<th style="background-color:#C9DAF8; border: solid 1px black; margin:0; padding: 2px 5px;">Total unresolved</th>'
			+'<td style="border: solid 1px black; margin:0; padding: 2px 5px;">'+cntUnresolved+'</td>'
			+'<th style="background-color:#C9DAF8; border: solid 1px black; margin:0; padding: 2px 5px;">Reopen found this update</th>'
			+'<td style="border: solid 1px black; margin:0; padding: 2px 5px;">'+cntOpen+'</td>'
		+'</tr>';
	var htmlTotal2 =
		'<tr>'
			+'<th colspan="4" style="background-color:#4A86E8; border: solid 1px black; margin:0; padding: 2px 5px;">-</th>'				
		+'</tr>';
	var htmlRow4 = 
		'<tr>'
			+'<th style="background-color:#C9DAF8; border: solid 1px black; margin:0; padding: 2px 5px;">Total To Confirm by QA</th>'
			+'<td style="border: solid 1px black; margin:0; padding: 2px 5px;">'+cntToConfirm+'</td>'
			+'<th style="background-color:#C9DAF8; border: solid 1px black; margin:0; padding: 2px 5px;">To Confirm by QA - Fixed</th>'
			+'<td style="border: solid 1px black; margin:0; padding: 2px 5px;">'+cntToConfirm_Fixed+'</td>'
		+'</tr>';
	var htmlRow5 = 
		'<tr>'
			+'<th style="background-color:#C9DAF8; border: solid 1px black; margin:0; padding: 2px 5px;">Need Confirmation by HQ</th>'
			+'<td style="border: solid 1px black; margin:0; padding: 2px 5px;">'+cntNeedConfirmation+'</td>'
			+'<th style="background-color:#C9DAF8; border: solid 1px black; margin:0; padding: 2px 5px;">To Confirm by QA - TFU/TFWW</th>'
			+'<td style="border: solid 1px black; margin:0; padding: 2px 5px;">'+cntToConfirm_TFU+'</td>'
		+'</tr>';
	var htmlRow6 = 
		'<tr>'
			+'<th style="background-color:#C9DAF8; border: solid 1px black; margin:0; padding: 2px 5px;">Cannot Test issues</th>'
			+'<td style="border: solid 1px black; margin:0; padding: 2px 5px;">'+cntCannotTest+'</td>'
			+'<th style="background-color:#C9DAF8; border: solid 1px black; margin:0; padding: 2px 5px;">To Confirm by QA - WNF/NAB/TP/CNR/DUP/NA</th>'
			+'<td style="border: solid 1px black; margin:0; padding: 2px 5px;">'+cntToConfirm_Remain+'</td>'
		+'</tr>';
	$('#filtersPanel').append('<div id="bugbaseStatusResult" ><table style="margin-top: 10px; text-align:center;border-collapse: collapse;;">'+htmlTotal1+htmlRow1+htmlRow2+htmlRow3+htmlTotal2+htmlRow4+htmlRow5+htmlRow6+'</table></div>');
};
hdProcessBugBase();
