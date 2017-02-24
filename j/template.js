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
	
	// Add a hook to allow modification of the mobile states and ARIA
	$("#main-menu, #main-search").addClass("mobileState");
	
	// Check the viewport size on page load
	checkSize();
	
	// Check the viewport size on window resize
    $(window).resize(checkSize);
	
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
	$('<div class="modal fade" tabindex="-1" role="dialog" id="leftNav" aria-labelledby="modalTitle"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span class="sr-only">Close</span>&times;</button><p class="modal-title" id="modalTitle"><strong>In this section...</strong></p></div><div class="modal-body">'+subNav+'</div></div></div></div>').insertBefore('.subNav-wrap');	
});


// Prevent empty searches
function searchCheck(q)  {
  if (q.value == 'Search...' || q.value.search(/^\s*$/) >=0)  {
	alert('Please enter a search phrase.');
	return false;
  }
  return true;
}

// This function updates the ARIA attributes for the toggled mobile elements (main navigation and search)
// Documentation: https://www.fourfront.us/blog/jquery-window-width-and-media-queries
function checkSize(){
	// Checking for the state of the Main Menu toggle. If it's there, it means we are mobile so apply relevant ARIA.
    if ($("#menu-button").css("display") == "block" ){
		if ( $(".mobileState").css("display") === "block") {
			$(".mobileState").attr({ "aria-hidden": "false", "role": "region", "tabindex": "-1" });
		} else {
			$(".mobileState").attr({ "aria-hidden": "true", "role": "region", "tabindex": "-1" });
		}
		// Since we are mobile, move the search form down the DOM so it follows the search toggle button
		$('#main-search').insertAfter("#search-tog");
	// Main Menu toggle is not there, then we are in desktop mode.
	} else {
		$(".mobileState").removeAttr("aria-hidden role aria-labeledby tabindex");
		// Since we are desktop, put the search back at the top.
		$(".searchWrap").append($("#main-search"));
	}
}