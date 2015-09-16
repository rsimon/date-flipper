var DateFlipper = function(parent, options) {

  var DURATION = 150,

      el = jQuery(
        '<div class="timedial-container">' +
        '  <div class="timedial-column year"><p></p></div>' +
        '  <div class="timedial-column month"><p></p></div>' +
        '  <div class="timedial-column day"><p></p></div>' +
        '</div>'),

      year, month, day,

      busy = false,

      pending = false,

      colYear = el.find('.timedial-column.year'),
      colMonth = el.find('.timedial-column.month'),
      colDay = el.find('.timedial-column.day'),

      /** Helper function to scroll one column **/
      scroll = function(column, onComplete) {
        var first = column.children().first(),
            lineheight = first.outerHeight(),
            colTop = column.position().top;

        column.animate({ top: colTop - lineheight }, {
          duration: DURATION,
          complete: function() {
            first.remove();
            column.css('top', colTop);
            onComplete();
          }
        });
      },

      /** Sets the dial to the specified year, month and day **/
      set = function(y, m, d) {
        var scrollCompleteY = false,
            scrollCompleteM = false,
            scrollCompleteD = false,

            checkComplete = function() {
              if (scrollCompleteY && scrollCompleteM && scrollCompleteD) {
                busy = false;
                if (pending) {
                  var y = pending.y,
                      m = pending.m,
                      d = pending.d;

                  pending = false;
                  set(y, m, d);
                }
              }
            };

        if (busy) {
          // Update animation currently running - just buffer the update for later
          pending = { y: y, m: m, d: d };
        } else {
          busy = true;

          if (y === year) {
            // No change - just set flag to completed
            scrollCompleteY = true;
          } else {
            year = y;
            colYear.append('<p>' + y + '</p>');
            scroll(colYear, function() {
              scrollCompleteY = true;
              checkComplete();
            });
          }

          if (m === month) {
            scrollCompleteM = true;
          } else {
            month = m;
            colMonth.append('<p>' + m + '</p>');
            scroll(colMonth, function() {
              scrollCompleteM = true;
              checkComplete();
            });
          }

          if (d === day) {
            scrollCompleteD = true;
          } else {
            day = d;
            colDay.append('<p>' + d + '</p>');
            scroll(colDay, function() {
              scrollCompleteD = true;
              checkComplete();
            });
          }

          // Just in case an identical date was set
          checkComplete();
        }

      };

  // Export public methods
  this.set = set;

  colYear.css('width', 50);
  colMonth.css('width', 80);
  colDay.css('width', 50);

  jQuery(parent).append(el);

};
