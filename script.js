(function() {

    var slot = $( '.slot-wrap' );
    var column = $( '.column' );
    var victory = $( '.victory' );
    var reset = $( '#reset' );
    var img = $( '.img-wrap' );
    var client = $( '#con4-wrap' );
    var horaceWin = $( '.horace audio' );
    var rudyWin = $( '.rudy audio' );
    var amulet = $( '.mouse-wrap img' );
    var amWrap = $( '.mouse-wrap' );
    var lightning = $( '.img-wrap audio' );
    var start = $( '.start h3' );
    var startScreen = $( '.start-wrap' );
    var theme = $( '#theme' );
    var rudy = $( '.rudy img' );
    var horace = $( '.horace img' );
    var matchLight = $( '#match-light' );

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    var curPlayer = 'p1';
    var curRow;
    var lastCounter;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    var victoryScreen = function() { // ----------------- victory screen
        setTimeout( function() {
            slot.removeClass( 'lightning' );
        }, 200 );
        setTimeout( function() {
            slot.removeClass( 'lightning2' );
        }, 3000 );
        victory.css({
            "display": "flex"
        })
        if ( curPlayer === 'p1' ) {
            $( '.reset #who' ).html( 'My name... is Horace!' );
            horaceWin[0].play();
            horace.addClass( 'winner' );
            setTimeout( function() {
                horace.removeClass( 'winner' );
            }, 3000 );
        } else {
            $( '.reset #who' ).html( 'See ya later, Band-Aid Breath!' );
            rudyWin[0].play();
            rudy.addClass( 'winner' );
            setTimeout( function() {
                rudy.removeClass( 'winner' );
            }, 3000 );
        }
        reset.on( 'click', function( e ) {
            slot.removeClass( 'winning-pieces' );
            curPlayer = 'p1';
            if ( window.innerWidth >= 768 && window.innerWidth <= 1023 ) {
                amulet.css({
                    "padding-left": "10%",
                    "padding-right": "0px"
                })
            } else if ( window.innerWidth >= 480 && window.innerWidth <= 767 ) {
                amulet.css({
                    "padding-left": "13%",
                    "padding-right": "0px"
                })
            } else if ( window.innerWidth <= 479 ) {
                amulet.css({
                    "padding-left": "9%",
                    "padding-right": "0px"
                })
            } else {
                amulet.css({
                    "padding-left": "17%",
                    "padding-right": "0px"
                })
            }
            amWrap.css({
                "justify-content": "flex-start"
            })
            slot.removeClass( 'p1 p2' );
            victory.css({
                "display": "none"
            })
            img.addClass( 'lightning' );
            lightning[0].play();
            setTimeout( function() {
                img.removeClass( 'lightning' );
            }, 1000);
            reset.off( 'click' );
        })
    }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    column.on( 'click', function( e ) {

        matchLight[0].play();

        var counterV = 0;
        var counterH = 0;

        var indexV;
        var indexH;
        var curSlots = $( e.currentTarget ).find( slot ); // ----------------------- cur slots in relevent column

        for ( var i = 5; i >= 0; i-- ) { // ------------------------ counter placement
            if ( !curSlots.eq(i).hasClass( 'p1' ) && !curSlots.eq(i).hasClass( 'p2' ) ) {
                curSlots.eq(i).addClass( curPlayer )
                curRow = '.row' + i; // ------------------ getting current row
                lastCounter = curSlots.eq(i);
                indexV = i;
                curSlots.eq(i).addClass( 'lightning' );
                setTimeout( function() {
                    slot.removeClass( 'lightning' );
                }, 2000 );
                break;
            }
        }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        for ( var i = 0; i < curSlots.length; i++ ) { // ---------------- vertical victory check
            if ( curSlots.eq(i).hasClass( curPlayer ) ) {
                counterV++;
                if ( counterV === 4 ) {
                    for (var j = 0; j < 4; j++) {
                        var winningPieces = i - j;
                        curSlots.eq( winningPieces ).addClass( 'winning-pieces lightning2' );
                    }
                    victoryScreen();
                    return;
                }
            } else {
                counterV = 0;
            }
        }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        var rowSlots = $( curRow ); // ----------------------- finding all slots in current row

        for ( var i = 0; i < rowSlots.length; i++ ) { // ---------------- horizontal victory check
            if ( rowSlots.eq(i).hasClass( curPlayer ) ) {
                counterH++;
                if ( counterH === 4 ) {
                    for (var j = 0; j < 4; j++) {
                        var winningPieces = i - j;
                        console.log( winningPieces );
                        rowSlots.eq( winningPieces ).addClass( 'winning-pieces lightning2' );
                    }
                    victoryScreen();
                    return;
                }
            } else {
                counterH = 0;
            }
        }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        if ( lastCounter.parent().hasClass( 'column0' ) ) { // ----------------------------- getting horizontal index
            indexH = 0;
        } else if ( lastCounter.parent().hasClass( 'column1' ) ) {
            indexH = 1;
        } else if ( lastCounter.parent().hasClass( 'column2' ) ) {
            indexH = 2;
        } else if ( lastCounter.parent().hasClass( 'column3' ) ) {
            indexH = 3;
        } else if ( lastCounter.parent().hasClass( 'column4' ) ) {
            indexH = 4;
        } else if ( lastCounter.parent().hasClass( 'column5' ) ) {
            indexH = 5;
        } else if ( lastCounter.parent().hasClass( 'column6' ) ) {
            indexH = 6;
        }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        function checkDiag() { // ------------------------ check diagonal victory like --> /

            var counterD = 0;

            var diag = [ lastCounter ]; // ------------------ array of diagonals

            var a = indexV + 0;
            var c = indexV + 0;
            var b = indexH + 0;
            var d = indexH + 0;

            for ( var i = 0; i < 3; i++ ) { // ------------------- checks down left
                a += 1;
                b -= 1;
                if ( a < 0 || a > 5 || b < 0 || b > 6 ) {
                    break;
                } else {
                    diag.push( $( ".column" + b + " .row" + a ) );
                }
            }

            for ( var i = 0; i < 3; i++ ) { // ------------------- checks up right
                c -= 1;
                d += 1;
                if ( c < 0 || c > 5 || d < 0 || d > 6 ) {
                    break;
                } else {
                    diag.push( $( ".column" + d + " .row" + c ) );
                }
            }

            diag.sort( function( a, b ) { // ----------------------- sorts array
                var aLeft = $( a ).position().left
                var bLeft = $( b ).position().left
                return aLeft - bLeft;
            })

            for ( var i = 0; i < diag.length; i++ ) { // ---------------- diagonal / victory check
                if ( diag[i].eq(0).hasClass( curPlayer ) ) {
                    counterD++;
                    if ( counterD === 4 ) {
                        for (var j = 0; j < 4; j++) {
                            var winningPieces = i - j;
                            diag[winningPieces].eq(0).addClass( 'winning-pieces lightning2' );
                        }
                        victoryScreen();
                        return;
                    }
                } else {
                    counterD = 0;
                }
            }
        }

        checkDiag()

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        function checkDiag2() { // ------------------------ check diagonal victory like --> \

            var counterD = 0;

            var diag = [ lastCounter ]; // ------------------ array of diagonals

            var a = indexV + 0;
            var c = indexV + 0;
            var b = indexH + 0;
            var d = indexH + 0;

            for ( var i = 0; i < 3; i++ ) { // ------------------- checks up left
                a -= 1;
                b -= 1;
                if ( a < 0 || a > 5 || b < 0 || b > 6 ) {
                    break;
                } else {
                    diag.push( $( ".column" + b + " .row" + a ) );
                }
            }

            for ( var i = 0; i < 3; i++ ) { // ------------------- checks down right
                c += 1;
                d += 1;
                if ( c < 0 || c > 5 || d < 0 || d > 6 ) {
                    break;
                } else {
                    diag.push( $( ".column" + d + " .row" + c ) );
                }
            }

            diag.sort( function( a, b ) { // ----------------------- sorts array
                var aLeft = $( a ).position().left
                var bLeft = $( b ).position().left
                return aLeft - bLeft;
            })

            for ( var i = 0; i < diag.length; i++ ) { // ---------------- diagonal / victory check
                if ( diag[i].eq(0).hasClass( curPlayer ) ) {
                    counterD++;
                    if ( counterD === 4 ) {
                        for (var j = 0; j < 4; j++) {
                            var winningPieces = i - j;
                            diag[winningPieces].eq(0).addClass( 'winning-pieces lightning2' );
                        }
                        victoryScreen();
                        return;
                    }
                } else {
                    counterD = 0;
                }
            }
        }

        checkDiag2()

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        if ( curPlayer === 'p1' ) { // ----------------------- player toggle
            curPlayer = 'p2';
            if ( window.innerWidth >= 768 && window.innerWidth <= 1023 ) { // ------------------------- amulet position
                amulet.css({
                    "padding-left": "0px",
                    "padding-right": "10%"
                })
            } else if ( window.innerWidth >= 480 && window.innerWidth <= 767 ) {
                amulet.css({
                    "padding-left": "0px",
                    "padding-right": "13%"
                })
            } else if ( window.innerWidth <= 479 ) {
                amulet.css({
                    "padding-left": "0px",
                    "padding-right": "6%"
                })
            } else {
                amulet.css({
                    "padding-left": "0px",
                    "padding-right": "17%"
                })
            }
            amWrap.css({
                "justify-content": "flex-end"
            })
        } else {
            curPlayer = 'p1';
            if ( window.innerWidth >= 768 && window.innerWidth <= 1023 ) {
                amulet.css({
                    "padding-left": "10%",
                    "padding-right": "0px"
                })
            } else if ( window.innerWidth >= 480 && window.innerWidth <= 767 ) {
                amulet.css({
                    "padding-left": "13%",
                    "padding-right": "0px"
                })
            } else if ( window.innerWidth <= 479 ) {
                amulet.css({
                    "padding-left": "9%",
                    "padding-right": "0px"
                })
            } else {
                amulet.css({
                    "padding-left": "17%",
                    "padding-right": "0px"
                })
            }
            amWrap.css({
                "justify-content": "flex-start"
            })
        }

    });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    client.on( 'mousemove', function( e ) { // --------------------------- tad janky, code to make background change 'right' with mouse position
    if ( window.innerWidth < 767 && window.innerWidth > 479 ) {
        if ( e.pageX > 0 && e.pageX < 200 ) {
            img.css({
                "right": "50"
            });
        } else if ( e.pageX > 201 && e.pageX < 350 ) {
            img.css({
                "right": "100px"
            });
        }  else if ( e.pageX > 351 && e.pageX < 500 ) {
            img.css({
                "right": "200px"
            });
        }  else if ( e.pageX > 501 && e.pageX < window.innerWidth ) {
            img.css({
                "right": "350px"
            });
        }
    } else if ( window.innerWidth < 479 ) {
        if ( e.pageX > 0 && e.pageX < 100 ) {
            img.css({
                "right": "50"
            });
        } else if ( e.pageX > 101 && e.pageX < 220 ) {
            img.css({
                "right": "100px"
            });
        }  else if ( e.pageX > 221 && e.pageX < 340 ) {
            img.css({
                "right": "200px"
            });
        }  else if ( e.pageX > 341 && e.pageX < window.innerWidth ) {
            img.css({
                "right": "350px"
            });
        }
    } else {
        if ( e.pageX > 0 && e.pageX < 300 ) {
            img.css({
                "right": "50"
            });
        } else if ( e.pageX > 299 && e.pageX < 600 ) {
            img.css({
                "right": "100px"
            });
        }  else if ( e.pageX > 599 && e.pageX < 900 ) {
            img.css({
                "right": "200px"
            });
        }  else if ( e.pageX > 899 && e.pageX < window.innerWidth ) {
            img.css({
                "right": "350px"
            });
        }
    }

    })

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    start.on( 'click', function() { // ----------------------------------- start screen transition and theme
        startScreen.css({
            "bottom": "100%"
        })
        theme[0].play();
    })
    
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    column.on( 'mouseenter', function( e ) { // ----------------------- highlights current column
        var curSlots = $( e.currentTarget ).find( slot );
        curSlots.css({
            "filter": "saturate(175%)"
        })
    }).on( 'mouseleave', function( e ) {
        var curSlots = $( e.currentTarget ).find( slot );
        curSlots.css({
            "filter": "saturate(100%)"
        })
    })

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

}());
