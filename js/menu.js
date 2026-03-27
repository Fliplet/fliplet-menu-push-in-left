// Remove stale master page references that should have been replaced by production pages
(function() {
  var appPages = Fliplet.Env.get('appPages') || [];
  var masterPageIds = {};

  appPages.forEach(function(p) {
    if (p.masterPageId) {
      masterPageIds[p.masterPageId] = true;
    }
  });

  $('li[data-page-id]').each(function() {
    var pageId = $(this).attr('data-page-id');

    if (pageId && masterPageIds[pageId]) {
      $(this).remove();
    }
  });
})();

if (Modernizr.backdropfilter) {
  $('.body').addClass('backdropfilter');
}

$('[data-fl-toggle-menu]').on('click', function() {
  $('body').addClass('has-push-menu');
  $('html').addClass('has-push-menu');
});

$('.fl-menu-overlay').click(function() {
  $(this).closest('.fl-menu').removeClass('active');
  $('body').removeClass('has-push-menu');
  $('html').removeClass('has-push-menu');
});

$('.fl-menu .fl-close-menu').on('click', function() {
  $(this).parents('.fl-menu').removeClass('active');
  $('body').removeClass('has-push-menu');
  $('html').removeClass('has-push-menu');
});
