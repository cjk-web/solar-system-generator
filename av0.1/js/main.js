let camera, scene, renderer, controls, hlight, mesh, mesh2;

var isSystemView = false;

const starGeometry = new THREE.IcosahedronGeometry(1,1);
const starMaterial = [
    new THREE.MeshLambertMaterial( { color: 0xffd615 } ),   // yellow
    new THREE.MeshLambertMaterial( { color: 0x6356e5 } ),   // blue
    new THREE.MeshLambertMaterial( { color: 0xcf3030 } ),   // red
    new THREE.MeshLambertMaterial( { color: 0xff9a3c } ),   // orange
    new THREE.MeshLambertMaterial( { color: 0xffffff } )    // white
];

var lastCamPos;

function initialize() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

    renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement );

    addLighting();

    if (isSystemView) {
        buildSystemView();
    }
    else {
        var d = new Date();
        testDynamicGeneration(d.getTime(), 1);
    }

    camera.position.set(6, -91, 40);
    lastCamPos = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
    controls.update();
}

function regenerate() {
    clearScene();
    addLighting();
    if (isSystemView) {
        buildSystemView();
    }
    else {
        var d = new Date();
        testDynamicGeneration(d.getTime(), 1);
    }
}

function addLighting() {
    hLight = new THREE.HemisphereLight( 0xC6426E, 0x642b73, 3 );
    scene.add( hLight );
}

function buildSystemView() {
    var geometry = new THREE.IcosahedronGeometry(2, 1);
    var material = new THREE.MeshLambertMaterial( { color: 0xffd615 } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    mesh2 = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x1f4287 } ) );
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

function testDynamicGeneration(seed, idx) {

    var rng = new lcg(seed, idx);
    var clusterArray = [];

    var posCalcArray = [
        { x: 0,     y: 0,       z: 0 },
        { x: 1000,  y: 0,       z: 0 },
        { x: 1000,  y: 0,       z: 1000 },
        { x: 0,     y: 0,       z: 1000 },
        { x: -1000, y: 0,       z: 1000 },
        { x: -1000, y: 0,       z: 0 },
        { x: -1000, y: 0,       z: -1000 },
        { x: 0,     y: 0,       z: -1000 },
        { x: 1000,  y: 0,       z: -1000 },
        { x: 0,     y: 1000,   z: 0 },
        { x: 1000,  y: 1000,   z: 0 },
        { x: 1000,  y: 1000,   z: 1000 },
        { x: 0,     y: 1000,   z: 1000 },
        { x: -1000, y: 1000,   z: 1000 },
        { x: -1000, y: 1000,   z: 0 },
        { x: -1000, y: 1000,   z: -1000 },
        { x: 0,     y: 1000,   z: -1000 },
        { x: 1000,  y: 1000,   z: -1000 },
        { x: 0,     y: -1000,  z: 0 },
        { x: 1000,  y: -1000,  z: 0 },
        { x: 1000,  y: -1000,  z: 1000 },
        { x: 0,     y: -1000,  z: 1000 },
        { x: -1000, y: -1000,  z: 1000 },
        { x: -1000, y: -1000,  z: 0 },
        { x: -1000, y: -1000,  z: -1000 },
        { x: 0,     y: -1000,  z: -1000 },
        { x: 1000,  y: -1000,  z: -1000 },
    ];

    for (var c = 0; c < posCalcArray.length; c++) {
        var gPos = new THREE.Vector3();
        var sPos = new THREE.Vector3(posCalcArray[c].x, posCalcArray[c].y, posCalcArray[c].z);
        var numStars = rng.getIntInRange(500, 1000);

        var cluster = new Cluster(gPos, sPos, numStars);
        
        clusterArray.push(cluster);
    }

    for (var cl in clusterArray) {
        for (var i = 0; i < clusterArray[cl].numStars; i++) {
            var vX = rng.getIntInRange(clusterArray[cl].screenV3.x - 500, clusterArray[cl].screenV3.x + 500);
    
            var vY = rng.getIntInRange(clusterArray[cl].screenV3.y - 500, clusterArray[cl].screenV3.y + 500);
    
            var vZ = rng.getIntInRange(clusterArray[cl].screenV3.z - 500, clusterArray[cl].screenV3.z + 500);
    
            var scale = rng.getIntInRange(1, 5);
    
            var mat = rng.getIntInRange(0, 4)
    
            var sMesh = new THREE.Mesh(starGeometry, starMaterial[mat]);
            sMesh.position.set(vX, vY, vZ);
            sMesh.scale.set(scale, scale, scale);
            scene.add(sMesh);
        }
    }

    // for (var i=0; i<1000; i++) {

    //     var vX = rng.getIntInRange(camera.position.x - 500, camera.position.x + 500);

    //     var vY = rng.getIntInRange(camera.position.y - 500, camera.position.y + 500);

    //     var vZ = rng.getIntInRange(camera.position.z - 500, camera.position.z + 500);

    //     var scale = rng.getIntInRange(1, 5);

    //     var mat = rng.getIntInRange(0, 4)

    //     var sMesh = new THREE.Mesh(starGeometry, starMaterial[mat]);
    //     sMesh.position.set(vX, vY, vZ);
    //     sMesh.scale.set(scale, scale, scale);
    //     scene.add(sMesh);
    // }
}

function toggleSystem() {
    isSystemView = !isSystemView;
    var hideButton = document.getElementById('regenerate');
    if (isSystemView) {
        hideButton.style.display = 'none';
    }
    else {
        hideButton.style.display = 'inline';
    }
    regenerate();
}

function animate() {
    requestAnimationFrame( animate );

    if (lastCamPos.x != camera.position.x) {
        lastCamPos.set(camera.position.x, camera.position.y, camera.position.z);
    }

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


function clearScene() {
    while (scene.children.length > 0 ) {
        scene.remove(scene.children[0]);
    } 
}

initialize();
animate();