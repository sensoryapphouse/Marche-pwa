precision mediump float;

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

#define PI 3.141593

void main( void ) {

	vec2 p = ( gl_FragCoord.xy * 2. - resolution )/ min(resolution.x, resolution.y );
	
	p.x = dot(p,p)*(.5+sin(p.y*3.4+time)*.5);
	p.y += p.x;
	float l = length(p);
	
	float a = atan(p.y*p.x, p.y+p.x)*0.1;
	vec4 c = vec4(cos(time+a), sin(time+p.y*32.0*a), 0, 1.);
	c *= (1. - l+sin(p.y*2.0*p.x*2.0)) ;
	c = c * 0.5 + 0.5;
	
	

	gl_FragColor = c;

}