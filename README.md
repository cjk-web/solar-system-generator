## solar-system-generator
# Procedurally Generated 3d Star Systems 

I've been wanting to try out three.js, and this is project I've been thinking about for a while. Currently very early in development, working on some of the basics to set up the 3d scene and make it look decent for now. Also building out a rough draft of base classes needed to set up procedural generation that will eventually be the foundation for all the stellar objects that may appear in a procedural system.


# Update 2/13

Adding the initial pieces for large scale generation. Now groups of stars are set around a cluster position, have multiple color options and have a better spread of sizes thanks to a fix for the LCG's getIntInRange function that solves the bias towards the lowest values in the specified range. 

Up next is custom camera controls and updating cluster around the camera, removing clusters outside of visible range and generating new clusters based on movement.

# Update 2/22

Added inital implementation of custome camera controls to allow for rudimentary flight through the generated star clusters. Working on setting up smoother movement and allowing for finer control or speed and rotation as well as registering multiple controls at once.

Also made a minor tweak to the procedurally generated star clusters that spreads the stars out across a larger area which seems to look (and perform) a bit better.

These steps were needed to set up the next phase of of the project to continuously generate clusters as you move through the scene.
