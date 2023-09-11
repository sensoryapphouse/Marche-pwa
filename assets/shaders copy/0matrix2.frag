precision mediump float;

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

// shadertoy globals
float iTime = 0.0;
vec3  iResolution = vec3(0.);

// --------[ Original ShaderToy begins here ]---------- //
#define R fract(1e2*sin(p.x*8.+p.y))
void mainImage(out vec4 o,vec2 u) {
    vec3 v=vec3(u,1)/iResolution-.5,
        s=.5/abs(v),
        i=ceil(8e2*(s.z=min(s.y,s.x))*(s.y<s.x?v.xzz:v.zyz)),
        j=fract(i*=.1),
        p=vec3(9,int(iTime*(9.+8.*sin(i-=j).x)),0)+i;
   o-=o,o.g=R/s.z;p*=j;o*=R>.5&&j.x<.6&&j.y<.8?1.:0.;
}
// --------[ Original ShaderToy ends here ]---------- //

void main(void)
{
    iTime = time;
    iResolution = vec3(resolution, 1.0);

    mainImage(gl_FragColor, gl_FragCoord.xy);
    gl_FragColor.a = 1.0;
}