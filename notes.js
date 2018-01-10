- connect four you -
- -
- determining if a player has won, tricky, especially diagonally -
- -
- 6 rows / 7 columns -
- -
- place to start 1. making the board / display the board - html and css -
-                                      board - how to arrange board. columns. -
-                                      slot - html - each slot square with a circle in it - 2 divs - box shadow css property. / loop through a bunch of slots to see which class they have.
- -
-                2. column selection / check for victory -
-                                      if the player won - victory message -
-                                      if player did not win - switch player -
- -
-                3. on click / in column selection var currPlayer = 'red' -
-                              when a player clicks on a column you want to find the lowest slot to fill. -
- -
-                              var curSlots = $(e.currentTarget).find('.slot');
- -
-                              for (var i = 5; i >= 0; i--) {
-                                  if ( !slots.eq(i).hasClass('red') && !slots.eg(i).hasClass('black') );
-                                  slots.eq(i).addClass(curPlayer);
-                                  break; // ------------------------- when break / (i) will be which row to check for victory
-                              }
- -
-                4. player switch / - put victory search inbetween move and player switch -
- -
-                5. victory checking / vertical - check slots in column user just put piece in -
-
-                                      var counter = 0;
                                        for (var i = 0; i < slots.length; i++) {
                                            if ( slots[i].classList.contains(curPlayer) ) {
                                                counter++
                                                if (counter == 4) {
                                                    // victory
                                                }
                                            } else {
                                                counter = 0;
                                            }
                                        }

                                        or

                                        var srt = '';
                                        for (var i = 0; i < slots.length; i++) {
                                            if ( slots[i].classList.contains(curPlayer) ) {
                                                str += 'y';
                                            } else {
                                                str += 'n';
                                            }
                                            if ( str.indexOf('yyyy') > -1 ) {
                                                // victory
                                            }
                                        }
-
-                                      horizontal - check slots in row user just put piece in -
-                                      diagonal - find the different sets you want to check /
-
-
-
