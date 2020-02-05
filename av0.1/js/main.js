let camera, scene, renderer, mesh, mesh2, controls;

function initialize() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );

    renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement );

    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshLambertMaterial( { color: 0xffd615 } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    mesh2 = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x1f4287 } ) );
    mesh2.position.set( 9.5, 4, 0 )
    scene.add( mesh2 );

    var tGeometry = new THREE.TorusBufferGeometry( 15, 0.08, 16, 100 );
    var tMaterial = new THREE.MeshBasicMaterial( { color: 0xDAE1DB } );
    var torus = new THREE.Mesh( tGeometry, tMaterial );
    scene.add( torus );

    var aLight = new THREE.HemisphereLight( 0xC6426E, 0x642b73, 3 );
    scene.add( aLight );

    var sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
    var light = new THREE.PointLight( 0x642B73, 10, 0 );
    light.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x642B73 } ) ) );
    //light.position.set( 0.5, -5, 2 );
    scene.add( light );

    camera.position.set(6, -91, 40);
    controls.update();
}

function animate() {
    requestAnimationFrame( animate );

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