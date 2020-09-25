/*
 * The folowing two functions are available for you to use.
 * 
 * offsetBubble(x, y, bubbleId)
 *     This function will position the bubble with ID 'bubbleId' at an
 *     offset of (x, y) pixels from its original position in centre of
 *     the track.
 *
 *     The coordinate system's origin (0, 0) is the original bubble position.
 *     x increases to the right and y increases to the top of the view.
 *     
 *     Parameters:
 *         x, y:     Numbers in pixels. 
 *                   Negative values offset bubble in opposite direction.
 *         bubbleId: ID of bubble to be moved.
 * 
 *
 * bubbleTrackLength()
 *     Returns the length of both bubble tracks in pixels.
 * 
 *     Return value:
 *         Returns an Number of pixels representing the length.
 * 
 * 
 * removeMarkerStyles()
 *     Removes all JavaScript-created style changes from all track markers.
 *
 *
 * deviceMotionNormalisedAccelerationIncludingGravity(event)
 *     Given a DeviceMotionEvent object, returns a normalised version
 *     of the accelerationIncludingGravity property object with values
 *     matching Android, since Safari on iOS reports negated values.
 *     This is only useful if you want to test/run your app on iOS.
 * 
 *     Parameters:
 *         event:    A devicemotion event object.
 *     Return value:
 *         Returns an object with same properties as the 
 *         event.accelerationIncludingGravity object.
 * 
 * 
 * IDs of HTML elements of interest
 * =========================================
 * 
 * message-area       ID of text area at the bottom of the view.
 * vertical-25        ID of upper marker in vertical track.
 * vertical-50        ID of centre marker in vertical track.
 * vertical-75        ID of lower marker in vertical track.
 * horizontal-25      ID of left marker in horizontal track.
 * horizontal-50      ID of centre marker in horizontal track.
 * horizontal-75      ID of right marker in horizontal track.
 * vertical-bubble    ID of the bubble in vertical track.
 * horizontal-bubble  ID of the bubble in horizontal track. 
*/

//YOUR CODE HERE
var acceleration_x;
var acceleration_y;
var acceleration_z;

var position_x = [];
var position_y = [];

window.addEventListener('devicemotion', function(Devicemotion)
{
	var avg_x = 0;
	var avg_y = 0;

	var normalisedDeviceMotion = deviceMotionNormalisedAccelerationIncludingGravity(Devicemotion);

    acceleration_x = normalisedDeviceMotion.x;
    acceleration_y = normalisedDeviceMotion.y;
    acceleration_z = normalisedDeviceMotion.z;

	position_x.push(acceleration_x);
	position_y.push(acceleration_y);

	if(position_x.length > 10)
	{
		position_x.shift();
	}

	if(position_y.length > 10)
	{
		position_y.shift();
	}

	for(i=0;i < position_x.length;i++)
	{
		avg_x += position_x[i];
	}

	for(i=0;i < position_y.length;i++)
	{
		avg_y += position_y[i];
	}

	avg_x /= position_x.length;
	avg_y /= position_y.length;


	offsetBubble((bubbleTrackLengthH() / 22) * avg_x, 0, 'horizontal-bubble');
	offsetBubble(0, - ((bubbleTrackLengthV() / 22) * avg_y), 'vertical-bubble');

	if(avg_x >= - 1 && avg_x <= 1)
	{
		document.getElementById("horizontal-50").style.backgroundColor = "rgba(255, 0, 0, 0.3)";
	}
	else
	{
		document.getElementById("horizontal-50").removeAttribute("style");
	}

	if(avg_x >= 4 && avg_x <= 6)
	{
		document.getElementById("horizontal-75").style.backgroundColor = "rgba(255, 0, 0, 0.3)";
	}
	else
	{
		document.getElementById("horizontal-75").removeAttribute("style");
	}

	if(avg_x >= - 6 && avg_x <= - 4)
	{
		document.getElementById("horizontal-25").style.backgroundColor = "rgba(255, 0, 0, 0.3)";
	}
	else
	{
		document.getElementById("horizontal-25").removeAttribute("style");
	}

	if(avg_y >= - 1 && avg_y <= 1)
	{
		document.getElementById("vertical-50").style.backgroundColor = "rgba(255, 0, 0, 0.3)";
	}
	else
	{
		document.getElementById("vertical-50").removeAttribute("style");
	}

	if(avg_y >= 4 && avg_y <= 6)
	{
		document.getElementById("vertical-25").style.backgroundColor = "rgba(255, 0, 0, 0.3)";
	}
	else
	{
		document.getElementById("vertical-25").removeAttribute("style");
	}

	if(avg_y >= - 6 && avg_y <= - 4)
	{
		document.getElementById("vertical-75").style.backgroundColor = "rgba(255, 0, 0, 0.3)";
	}
	else
	{
		document.getElementById("vertical-75").removeAttribute("style");
	}
});