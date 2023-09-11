precision mediump float;

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

// shadertoy emulation
#define iTime time
#define iResolution resolution

// --------[ Original ShaderToy begins here ]---------- //
//
// !!! Size not whole number to get around the problem with lines glitch
//
#define SIZE 20.001
#define BLACK_COL vec3(32,43,51)/255.

float rand(vec2 co) { 
    return fract(sin(dot(co.xy , vec2(12.9898, 78.233))) * 43758.5453);
} 

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{       
    vec2 ouv = fragCoord.xy/iResolution.xy;
    vec2 uv = fragCoord.xy/iResolution.y;    
              
    float m = 0.;
    float t = iTime*2.2 + 100.;
    
    for(float i=0.; i<=1.0; i+=0.25){
        vec2 iuv = uv + vec2(i*.05, 0.);
        vec2 ruv = iuv*SIZE;    
    	vec2 id = ceil(ruv);
        
        for(float y=-1.; y<=1.; y+=1.){
            for(float x=-1.; x<=1.; x+=1.0){
                vec2 nuv = ruv + vec2(x,y);
                vec2 nid = id + vec2(x,y);

                nuv.y += t*2. * (rand(vec2(nid.x))*0.5+.5) * i; // move 
                nuv.y += ceil(mod(nid.x, 2.))*0.3 * t;

                vec2 guv = fract(nuv); 

                nuv = floor(nuv) ;    
                float g = length(guv - vec2(x,y));

                float v = rand(nuv);
                v *= step(0.8, v); 
                m += smoothstep(v,v-.8, g);
            }
        }    	
    }
    
    float om = m;    
    m = m*.2 + step(1.25, m) *.2 + step(2.0, m) *.1;
    
    vec3 col = mix(BLACK_COL, vec3(om*.5, 1., 1.), m);
    
    fragColor = vec4(col,1.0);
}
// --------[ Original ShaderToy ends here ]---------- //

void main(void)
{
    mainImage(gl_FragColor, gl_FragCoord.xy);
}