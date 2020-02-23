CameraControls = function( camera, canvas ) {
    this.camera = camera;
    this.canvas = canvas;

    this.keyControls = { UA: 38, DA: 40, LA: 37, RA: 39, W: 87, A: 65, S: 83, D: 68 };

    this.vectors = { forward: 0, reverse: 1 };

    this.headings = { bankLeft: 0, bankRight: 1 };

    this.activeControls = {};

    scope = this;

    this.initialize = function () {
        canvas.tabIndex = -1; // setting tab-index on canvas to be able to catch key inputs
    }

    function movement( vector, speed, heading, degree ) {
        if ( heading == null)  {
            if ( vector == scope.vectors.forward ) {
                camera.translateZ( - speed);
                return
            }
            if ( vector == scope.vectors.reverse ) {
                camera.translateZ( speed );
                return
            }
        }
        else if ( vector == null ) {
            if (heading = scope.headings.bankLeft) {
                camera.rotateY((degree * Math.PI / 180));
                return
            }
            if (heading = scope.headings.bankRight) {
                camera.rotateY((degree * Math.PI / 180));
                return
            }
        }
    }
 
    function handleKeys( event ) {

        if ( event.keyCode == scope.keyControls.UA || event.keyCode == scope.keyControls.W ) {
            movement( scope.vectors.forward, 10 );
            return
        }
        else if ( event.keyCode == scope.keyControls.LA || event.keyCode == scope.keyControls.A ) {
            movement( null, null, 0, 1 );
            return
        }
        else if ( event.keyCode == scope.keyControls.DA || event.keyCode == scope.keyControls.S ) {
            movement( scope.vectors.reverse, 10 );
        }
        else if ( event.keyCode == scope.keyControls.RA || event.keyCode == scope.keyControls.D ) {
            movement( null, null, 1, -1 );
        }
    }

    canvas.addEventListener("keydown", handleKeys);

    scope.initialize();
};