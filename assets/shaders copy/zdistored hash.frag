precision mediump float;

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

#define W 0.01
#define t (time * 1.5)

void main( void ) {

	vec2 uv = ( gl_FragCoord.xy / resolution.xy ) * 2.0;
	
	//vec2 p = 1.0 + 0.5 * vec2(cos(t * 0.3), sin(t * 0.4));
	vec2 p = vec2(1.0);
	float distortion = max(0.0, 1.0 - length(p - uv));
	
	//distortion = pow(distortion, 5.0) * pow(0.5, 1.0 + 3.0 * sin(t + 10.0 * length(p - uv)));
	distortion = pow(distortion, 5.0) * (-1.25 + pow(0.7 , 1.0 + 3.0 * sin(t + 10.0 * length(p - uv))));
	
	uv += distortion;
	
	// grid
	float color = step(mod(uv.x, 0.1), W) + step(mod(uv.y, 0.1), W);
	
	gl_FragColor = vec4(color);

}