/*
 * form-timestamp.js
 * Adds hidden timestamp fields to the inquiry form at submit time.
 *   submitted_denver_time  -> Mountain Time (America/Denver)
 *   submitted_visitor_time -> visitor's own time zone
 */
(function () {
  function setField(form, name, value) {
    var input = form.querySelector('input[name="' + name + '"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      form.appendChild(input);
    }
    input.value = value;
  }
  function format(timeZone) {
    var opts = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' };
    if (timeZone) opts.timeZone = timeZone;
    return new Date().toLocaleString('en-US', opts);
  }
  // Capture phase on document runs before Formspree's own submit handler.
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || form.id !== 'inquiry-form') return;
    setField(form, 'submitted_denver_time', format('America/Denver'));
    setField(form, 'submitted_visitor_time', format());
  }, true);
})();
