precision mediump float;

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

void main( void )
{
	float mx = max( resolution.x, resolution.y );
	vec2 uv = .7* (gl_FragCoord.xy-resolution.xy*.5)/mx;

	float angle = .78539816339745 + sin(uv.x * 10.0 + time) * cos(uv.y * 10.0+ time);
	uv *= mat2(
		cos( angle ), -sin( angle ),
		sin( angle ), cos( angle ) );

	float fineness = mx*.4;
	float sy = uv.y*fineness;
	float c = fract(
		sin( floor( sy )/fineness*12.9898 )*
		437.5854 );

	// Сглаживание полос
float f = fract( sy );
c *= min( f, 1.-f )*2.;

// Дырка
//anus hole = anus( sin( 1.5-distance( uv, t )*6.0 ) );

	// Тень проходит
	c += sin( uv.y*1.5+time )*.3;

	// Фон
	float r = -uv.y+.5;
	float b = uv.y+.3;
	float g = uv.y+.7;

	gl_FragColor = vec4(mix(vec3( r, r*.1, b ),vec3( c ),.4 )/4.,1.0 );
}