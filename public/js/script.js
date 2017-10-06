var jQuery = jQuery || console.error('jQuery in undefined'); // eslint-disable-line
(function ($) {
  'use strict'; // Start of use strict
  // Configure tooltips for collapsed side navigation
  $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
    template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
  });
  // Toggle the side navigation
  $('#sidenavToggler').click(function (e) {
    e.preventDefault();
    $('body').toggleClass('sidenav-toggled');
    $('.navbar-sidenav .nav-link-collapse').addClass('collapsed');
    $('.navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level').removeClass('show');
  });
  // Force the toggled class to be removed when a collapsible nav link is clicked
  $('.navbar-sidenav .nav-link-collapse').click(function (e) {
    e.preventDefault();
    $('body').removeClass('sidenav-toggled');
  });
  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function (e) {
    var e0 = e.originalEvent;
    var delta = e0.wheelDelta || -e0.detail;
    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  });
  // Scroll to top button appear
  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });
  // Configure tooltips globally
  $('[data-toggle="tooltip"]').tooltip();
  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });
})(jQuery); // End of use strict
// addProjectsNav
var rightNav = document.querySelector('.rightNav ul');
if (rightNav) {
  var selectProjectsForm = document.getElementById('selectProjectsForm');
  var selectProjectsContainer = document.querySelector('#selectProjectsForm .form-group');
  apiReq('/allUserProjects', 'GET', function (err, res) {
    if (err) {
      window.alert('Connection error');
    } else {
      res = JSON.parse(res);
      /* Right Nav */
      rightNav.innerHTML = generateRightSideHTML(res);
      /* Modal data */
      selectProjectsContainer.innerHTML = generateProjectsHTML(res);
    }
  });
}
function generateProjectsHTML (projectsArr) {
  return projectsArr.reduce(function (acc, project) {
    if (project.project_nav) {
      return acc += '<label class="form-control-label">' +
                      '<input name="' + project.project_id + '" type="checkbox" aria-label="Checkbox for project" checked>' +
                      project.title +
                    '</label>';
    }
    return acc += '<label class="form-control-label">' +
                    '<input name="' + project.project_id + '" type="checkbox" aria-label="Checkbox for project">' +
                    project.title +
                  '</label>';
  }, '');
}
function firstLetters (title) {
  return title.match(/\b(\w)/g).join(''); // walid mash => wm
}
function currentProjectId () {
  var link = window.location.pathname;
  if (link.includes('/projects/')) {
    return parseInt(link.split('/projects/')[1]);
  } else if (link.includes('/tasks/')) {
    return parseInt(link.split('/')[1]);
  } else {
    return -1;
  }
}
function generateRightSideHTML (projectsArr) {
  var projectsNav = projectsArr.reduce(function (acc, project) {
    if (currentProjectId() === project.project_id) { // add class active to current project
      return acc += '<a href="/projects/' + project.project_id + '"><li data-toggle="tooltip" title="' + project.title + '" class="active">' + firstLetters(project.title) + '</li></a>';
    }
    return acc += '<a href="/projects/' + project.project_id + '"><li data-toggle="tooltip" title="' + project.title + '">' + firstLetters(project.title) + '</li></a>';
  }, '');
  return projectsNav += '<a href="#"><li data-toggle="modal" data-target="#addProjectsNav" id="addNavProject" data-toggle="tooltip" title="add project"><i class="fa fa-plus" aria-hidden="true"></i></li></a>';
}
