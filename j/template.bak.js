/*
I apologize to the following people for the code on this page:
	1. Developers with a better understanding of JS/Jquery
	2. Developers learning JS/jQuery
	3. Everyone else
*/

// Prevent empty searches
function searchCheck(q)  {
  if (q.value == 'Search...' || q.value.search(/^\s*$/) >=0)  {
	alert('Please enter a search phrase.');
	return false;
  }
  return true;
}

// Test window size to run certain functions
// This method is needed since IE8 window.resize fires when ANY element is resized, not just the viewport
var lastWindowHeight = $(window).height();
var lastWindowWidth = $(window).width();
$(window).resize(function () {
	 // Confirm window was actually resized
     if($(window).height()!=lastWindowHeight || $(window).width()!=lastWindowWidth){

		// Set this windows size
		lastWindowHeight = $(window).height();
		lastWindowWidth = $(window).width();
		
		// On resize, check the window width and apply ARIA to the mobile states if applicable
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;	
		if ( width < 768) {
			if ( $(".mobileState").css("display") === "block") {
				$(".mobileState").attr({ "aria-hidden": "false", "role": "region", "tabindex": "-1" });
			} else {
				$(".mobileState").attr({ "aria-hidden": "true", "role": "region", "tabindex": "-1" });
			}
			$('#main-search').insertAfter("#search-tog");
		} else {
			$(".mobileState").removeAttr("aria-hidden role aria-labeledby tabindex");
			$(".searchWrap").append($("#main-search"));
		}
	 }
});

$(document).ready(function(){
	// Add a hook to detect JS (progressive enhancement)
	$("body").addClass("js");
	
	// SmartMenus Initialization
	$(function() {
		$('#main-menu').smartmenus({
			mainMenuSubOffsetX: -1,
			mainMenuSubOffsetY: 4,
			subMenusSubOffsetX: 6,
			subMenusSubOffsetY: -6
		});
	});
	
	// Add a hook to allow modification of the mobile states
	$("#main-menu, #main-search").addClass("mobileState");
	
	// On page load, check the window width and apply ARIA to the mobile states if applicable
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;	
	if ( width < 768 ) {
		$(".mobileState").attr({ "aria-hidden": "true", "tabindex": "-1" });
		// Grab the search and move it down the DOM for mobile so logical tab order is maintained
		$('#main-search').insertAfter("#search-tog");
	}
	
	// When the menu toggle is hit, check its current state (along with the search toggle), show/hide the relevent elements, update all ARIA
	$("#menu-button").click(function(){
		if ( $("#main-menu").attr("aria-hidden") === "true" ) {
			$("#menu-button").attr("aria-expanded", "true");
			$("#main-menu").removeClass("mobileState").attr("aria-hidden", "false");
			$("#search-tog").attr("aria-expanded", "false");
			$("#main-search").addClass("mobileState").attr("aria-hidden", "true");
		} else {
			$("#menu-button").attr("aria-expanded", "false");
			$("#main-menu").addClass("mobileState").attr("aria-hidden", "true");
		}
	});
	
	// When the search toggle is hit, check its current state (along with the menu toggle), show/hide the relevent elements, update all ARIA
	$("#search-tog").click(function(){
		if ( $("#main-search").attr("aria-hidden") === "true" ) {
			$("#search-tog").attr("aria-expanded", "true");
			$("#main-search").removeClass("mobileState").attr("aria-hidden", "false");
			$("#menu-button").attr("aria-expanded", "false");
			$("#main-menu").addClass("mobileState").attr("aria-hidden", "true");
		} else {
			$("#search-tog").attr("aria-expanded", "false");
			$("#main-search").addClass("mobileState").attr("aria-hidden", "true");
		}
	});

	// Store the Sub Navigation and clone a version for the mobile version modal window.
	var subNav = $('.subNav-wrap').html();
	// Place that cloned navigation into BS's modal markup
	$('<div class="modal fade" tabindex="-1" role="dialog" id="leftNav" aria-labelledby="modalTitle"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span class="sr-only">Close</span>&times;</button><h4 class="modal-title" id="modalTitle">In this section...</h4></div><div class="modal-body">'+subNav+'</div></div></div></div>').insertBefore('.subNav-wrap');	
});