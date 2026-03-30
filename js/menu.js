// Remove stale master page references that should have been replaced by production pages
Fliplet().then(function() {
  var appPages = Fliplet.Env.get('appPages') || [];
  var masterPageIds = {};

  appPages.forEach(function(p) {
    if (p.masterPageId) {
      masterPageIds[p.masterPageId] = true;
    }
  });

  $('.fl-menu li[data-fl-navigate]').each(function() {
    try {
      var action = JSON.parse($(this).attr('data-fl-navigate'));
      var pageId = action && action.page;

      if (pageId && masterPageIds[pageId]) {
        $(this).remove();
      }
    } catch (e) {
      // Skip items with invalid JSON
    }
  });
});

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
