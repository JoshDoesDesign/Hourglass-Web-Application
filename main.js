$(document).on('ready', function() {

	// RUN ON CLICK OF EDITABLE CALENDAR BLOCK
	$(document).on('click', '.editable', function() {  
		console.log ( 'First Click Works!' );

		// TWO VARIABLES ARE CREATED TO CAPTURE WHAT THE USER WRITES INTO A SCHEDULE BLOCK
		// THESE VARIABLES WILL THEN BE SAVED INTO THE SPECIFIC CALENDAR BLOCK THAT WAS CLICKED ON
		var originalField = $(this);
		var appointmentText = $('textarea');

		// ON FOCUS, CURSOR IS BLINKING
		$('#myModal').on('shown.bs.modal', function () {
    		$('#myInput').focus();
		})

		// THE MODAL LIGHTBOX FADES IN ON CLICK OF EDITABLE CALENDAR BLOCK
		$('.bs-example-modal-lg').modal('show');

		// THIS CODE OCCURS ONLY ON CLICK OF THE SAVE BUTTON
		$('.save-button').one('click', function(e) {
			e.preventDefault();
			// SAVE THE USER INPUT INTO THE CALENDAR BLOCK TEXT AREA
			// HIDE THE MODAL WINDOW
			originalField.text( appointmentText.val() );

			// CLEARS THE TEXT FIELD FOR NEXT CLICK
			appointmentText.val('');

			$('.bs-example-modal-lg').modal('hide');
		});

		// REMOVE ALL EVENT HANDLERS ON CLICK
		$('.close-button').one('click', function() {
			console.log ('close click works');
			$('.save-button').off('click');
			appointmentText.val('');
		});
	});


	// RUN ON CLICK OF SUBMIT BUTTON
	$('.submit-button').on('click', function(event) {  
		console.log ('Third Click Works!');
		$('.submit-button').css('background-color', '#45767F');

		// SCROLL TO BOTTOM OF THE PAGE ON CLICK
		$("html, body").animate({ scrollTop: $(document).height() }, 1000);

		// CHECK EACH ITEM FROM THE GIVEN SELECTOR TIME BLOCK
		// VAR BLOCKS IS AN ARRAY THAT IS CREATED WITH THE FILTER METHOD
		// 
		var blocks = $('.time-block').filter(function(){
			return $(this).text() !== "";
		});	
		console.log(blocks.length);
			
		// VAR THAT EQUALS THE HOURS ON CALENDAR PER WEEK MINUS APPOINTMENTS SCHEDULED
		var freeTime = 75 - blocks.length;

		// Remainder value is now generated by Morris JS
		var Remainder = 75 - freeTime;


		// VAR THAT APPENDS GENERATED HTML AND FREETIME AMOUNT TO THE BOTTOM OF THE CALENDAR
		var generatedInfo = $('<div class="generated-header-wrapper text-center"><h1 class="generated-header">Josh, you have ' + freeTime + ' hours of free time available.</h1></div>');
		$('.schedule-wrapper').html(generatedInfo);
		event.stopPropagation();

		var chartInfo = $('<div id="myfirstchart" class="chart-visibility text-center"></div>');
		$('.chart-wrapper').html(chartInfo);
		$('.chart-visibility').css('display', 'block');

		event.stopPropagation();


		// MORRIS.JS GENERATED CHART

		new Morris.Donut({
		  // ID of the element in which to draw the chart.
		  element: 'myfirstchart',
		  // Chart data records -- each entry in this array corresponds to a point on
		  // the chart.
		  data: [
		  	// Pass in the values of freeTime and Remainder to be generated by Morris JS
		    {label: 'Free Time', value: freeTime},
		    {label: 'Busy Time', value: Remainder}
		  ],
		  colors:['#26797F','#00BCCC','#3DDFFF'],
		  // The name of the data record attribute that contains x-values.
		  xkey: 'year',
		  // A list of names of data record attributes that contain y-values.
		  ykeys: ['value'],
		  // Labels for the ykeys -- will be displayed when you hover over the
		  // chart.
		  labels: ['Value'],
		  formatter: function (y, data) { return y + ' Hours' },
		  resize: false
		});

		$('#myfirstchart').on('mouseover', function() {
			$('#myfirstchart svg text tspan').css({"font-size":"13.65px"});
		});	
	});	
});

