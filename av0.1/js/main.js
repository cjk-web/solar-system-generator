let camera, scene, renderer, controls, hlight;

var isSystemView = false;

function initialize() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );

    renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement );

    hLight = new THREE.HemisphereLight( 0xC6426E, 0x642b73, 3 );
    scene.add( hLight );

    if (isSystemView) {
        var geometry = new THREE.IcosahedronGeometry(2, 1);
        var material = new THREE.MeshLambertMaterial( { color: 0xffd615 } );
        var mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        var mesh2 = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x1f4287 } ) );
        mesh2.position.set( 9.5, 4, 0 )
        scene.add( mesh2 );

        var tGeometry = new THREE.TorusBufferGeometry( 15, 0.08, 16, 100 );
        var tMaterial = new THREE.MeshBasicMaterial( { color: 0xDAE1DB } );
        var torus = new THREE.Mesh( tGeometry, tMaterial );
        scene.add( torus );

        var sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
        var light = new THREE.PointLight( 0x642B73, 10, 0 );
        light.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x642B73 } ) ) );
        scene.add( light );
    }
    else {
        testDynamicGeneration();
    }

    camera.position.set(6, -91, 40);
    controls.update();
}

function testDynamicGeneration() {
    var o = 0x3fffffff;
    var x = 10;

    var viewHeight = 1000;
    var viewWidth = 1000;
    var viewDepth = 1000;

    var sGeo = new THREE.IcosahedronGeometry(1, 1);
    var sMat = new THREE.MeshLambertMaterial( { color: 0xffd615 } );

    var rng = new lcg(0, 1);

    for (var i=0; i<1000; i++) {
        
        x = rng.getInt()
        if (i == 0){console.log(x);}
        var vX = ((x & o)/o*viewWidth)|0;
        
        x = rng.getInt()
        if (i == 0){console.log(x);}
        var vY = ((x & o)/o*viewHeight)|0;

        x = rng.getInt()
        if (i == 0){console.log(x);}
        var vZ = ((x & o)/o*viewDepth)|0;

        var scale = rng.getIntInRange(1, 9);

        var sMesh = new THREE.Mesh(sGeo, sMat);
        sMesh.position.set(vX - 500, vY - 500, vZ - 500);
        sMesh.scale.set(scale, scale, scale);
        scene.add(sMesh);
    }
}

function animate() {
    requestAnimationFrame( animate );

    if (isSystemView) {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        var orbitRadius = 15;
        var date;
        date = Date.now() * 0.001;
        mesh2.position.set(
        Math.cos(date) * orbitRadius,
        Math.sin(date) * orbitRadius,
        0);
        mesh2.rotation.z += 0.08;
    }

    renderer.render( scene, camera );
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

initialize();
animate();