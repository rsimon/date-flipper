var DateFlipper = function(parent, options) {

  var DURATION = 150,

      MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                     'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],

      el = jQuery(
        '<div class="timedial-container">' +
        '  <div class="timedial-column year"><p></p></div>' +
        '  <div class="timedial-column month"><p></p></div>' +
        '  <div class="timedial-column day"><p></p></div>' +
        '</div>'),

      currentDate, currentYear, currentMonth, currentDay,

      busy = false,

      pending = false,

      colYear = el.find('.timedial-column.year'),
      colMonth = el.find('.timedial-column.month'),
      colDay = el.find('.timedial-column.day'),

      /** Helper function to scroll one column up **/
      scrollUp = function(column, nextValue, onComplete) {
        var first = column.children().first(),
            lineheight = first.outerHeight(),
            colTop = column.position().top;

        column.append('<p>' + nextValue + '</p>');

        column.animate({ top: colTop - lineheight }, {
          duration: DURATION,
          complete: function() {
            first.remove();
            column.css('top', colTop);
            onComplete();
          }
        });
      },

      /** Helper function to scroll one column down **/
      scrollDown = function(column, nextValue, onComplete) {
        var last = column.children().last(),
            lineheight = last.outerHeight(),
            colTop = column.position().top;

        column.css('top', colTop - lineheight);
        column.prepend('<p>' + nextValue + '</p>');

        column.animate({ top: colTop }, {
          duration: DURATION,
          complete: function() {
            last.remove();
            onComplete();
          }
        });
      },

      checkComplete = function(completeY, completeM, completeD) {
        var currentlyPending = pending;
        if (completeY && completeM && completeD) {
          busy = false;
          if (pending) {
            pending = false;
            set(currentlyPending);
          }
        }
      },

      /** Sets the dial to the specified year, month and day **/
      set = function(date) {
        var y = date.getFullYear(),
            m = MONTH_NAMES[date.getMonth()],
            d = date.getDate(),

            completeY = false,
            completeM = false,
            completeD = false,

            scroll = ((currentDate - date) < 0) ? scrollUp : scrollDown;

        if (busy) {
          // Update animation currently running - just buffer the update for later
          pending = date;
        } else {
          busy = true;
          currentDate = new Date(date.getTime());

          if (y === currentYear) {
            // No change - just set flag to completed
            completeY = true;
          } else {
            currentYear = y;
            scroll(colYear, y, function() {
              completeY = true;
              checkComplete(completeY, completeM, completeD);
            });
          }

          if (m === currentMonth) {
            completeM = true;
          } else {
            currentMonth = m;
            scroll(colMonth, m, function() {
              completeM = true;
              checkComplete(completeY, completeM, completeD);
            });
          }

          if (d === currentDay) {
            completeD = true;
          } else {
            currentDay = d;
            scroll(colDay, d, function() {
              completeD = true;
              checkComplete(completeY, completeM, completeD);
            });
          }

          // Just in case we had an identical date set
          checkComplete(completeY, completeM, completeD);
        }

      };

  // Export public methods
  this.set = set;

  /** DUMMY **/
  colYear.css('width', 50);
  colMonth.css('width', 80);
  colDay.css('width', 50);
  /** DUMMY **/

  jQuery(parent).append(el);

};
