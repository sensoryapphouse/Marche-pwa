precision mediump float;

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

vec2 rotate( vec2 matrix, float angle ) {
	return vec2( matrix.x*cos(radians(angle)), matrix.x*sin(radians(angle)) ) + vec2( matrix.y*-sin(radians(angle)), matrix.y*cos(radians(angle)) );
}

void main( void ) {

	float scale  = min( resolution.x, resolution.y );
	float width  = resolution.x / scale;
	float height = resolution.y / scale;
	vec2 xy = gl_FragCoord.xy / scale - vec2( width/2., height/2. );
	xy = rotate( xy, time * 10. );

	float tile = floor( sin( xy.x * 20.0 ) * sin(xy.y * 20.) + 1. );
	vec3 rgb = vec3( tile );

	gl_FragColor = vec4( rgb/5., 1.0 );
}