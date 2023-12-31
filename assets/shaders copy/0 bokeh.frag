precision mediump float;

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
uniform float bw;

#define TOTAL_LAYERS 12.0 

#define hue(h) clamp( abs( fract(h + vec4(3,2,1,0)/3.) * 6. - 3.) -1. , 0., 1.)

float hash12(vec2 p)
{
    vec3 p3  = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}
 
void main(void)
 { 
    vec2 uv = (gl_FragCoord.xy) / resolution.x + vec2(100.);    
                             
    vec3 col = vec3(0.); 
        
     
    for(float layer =1.; layer <= TOTAL_LAYERS; layer++ ) {
    
        float SIZE = (17. - layer) * .5;
        vec2 luv = uv * SIZE;
    	vec2 id = floor(luv);
    	luv = fract(luv) - 0.5;
                       
        for(float y =- 1.0; y <= 1.0; y++ ) {
        	for(float x =- 1.0; x <= 1.0; x++ ) {
                vec2 rid = id - vec2(x, y);

                float rFactor1 = hash12(rid + 542. * layer);
                float rFactor2 = hash12(rid + 159. * layer);
                
                float t = time*5.5/(10. + layer*5./rFactor1) + 100. * rFactor2;

                vec2 ruv = luv + vec2(x, y) +                 
                    vec2(
                        sin(time*.1 + t + rFactor1),
                        sin(time*.2 + t*.9 + rFactor2)                    
                    );            

                float l = length(ruv);            
                float ld = length(ruv - vec2(.075));  
                
                float SF = 1./min(resolution.x,resolution.y)*SIZE*(layer*2.);

                float d = smoothstep(SF,-SF,l-(.125 + hash12(rid + 700.)*.25));      

                // Remove some bubbles to make breath space
                d *= step(hash12(rid*75.4 + 100.), .5 + (layer/TOTAL_LAYERS));

                // Determine bubble color factor
                float colFactor = hash12(rid + 500.) + time*.1;

                vec3 iCol = hue(colFactor).rgb * d * (.7 + smoothstep(.1,.5,ld)*1.);

                col = col + iCol*(.25 + (1. - layer/TOTAL_LAYERS)*.2); 
        	}
    	}                
    }
   if (bw == 1.0)
        gl_FragColor = vec4(col/3., 1.0);
    else
        gl_FragColor = vec4(vec3((col.x+col.y+col.z)/3.), 1.0); // b&w version
}
