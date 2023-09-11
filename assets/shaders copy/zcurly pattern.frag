precision mediump float;

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

const float zoom = 50.0;
void main( void ) {

	
	
	vec2 pos = ( gl_FragCoord.xy / zoom );
	
	for( int i = 0; i < 5; i++) {
	pos.y = pos.y + sin(pos.x) + sin(time * 1.0);
	pos.x = pos.x + sin(pos.y) + cos(time * 1.0);
	}

	

	gl_FragColor = vec4(cos(pos.x * 0.1) * 0.5, sin(pos.y * 0.1), sin(pos.x * 0.1), 1.0);

}