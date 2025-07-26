/**
 * SUNRAYS COMPONENT
 * =================
 * 
 * Interactive SVG component that renders dynamic sun ray animations for the celestial interface.
 *
 * RAY SYSTEM STRUCTURE:
 * --------------------
 * • Ray Group 1 (ray1-1 to ray1-15): 15 elements
 * • Ray Group 2 (ray2-1 to ray2-70): 70 elements
 * • Ray Group 3 (ray3-1 to ray3-105): 105 elements
 * • Ray Group 4 (ray4-1 to ray4-76): 76 elements
 * • Ray Group 5 (ray5-1 to ray5-57): 57 elements
 * TOTAL: 323 individual polygon elements for maximum visual complexity
 * 
 * ANIMATION INTEGRATION:
 * ---------------------
 * - All ray elements initialize with opacity:0 for smooth fade-in animations
 * - Element IDs follow strict naming convention: "ray{group}-{index}"
 * - useSunRaysAnimation hook targets elements by ID
 */
import useSunRaysAnimation from './useSunRaysAnimation';

function SunRays({ rotation }) {
    useSunRaysAnimation(rotation);
    
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 620">
            <g>
                {/* Ray 1 */}
                <polygon id="ray1-1" points="411,54 395,71 420,87" style={{fill:"#F1B39D", stroke:"#F1B39D", opacity:0}}/>
                <polygon id="ray1-2" points="435,86 411,54 420,87" style={{fill:"#F6BA99", stroke:"#F6BA99", opacity:0}}/>
                <polygon id="ray1-3" points="445,46 411,54 435,86" style={{fill:"#EACDBD", stroke:"#EACDBD", opacity:0}}/>
                <polygon id="ray1-4" points="472,90 445,46 435,86" style={{fill:"#F0D6C4", stroke:"#F0D6C4", opacity:0}}/>
                <polygon id="ray1-5" points="463,103 472,90 435,86" style={{fill:"#FBCBA9", stroke:"#FBCBA9", opacity:0}}/>
                <polygon id="ray1-6" points="480,82 445,46 472,90" style={{fill:"#EED3C2", stroke:"#EED3C2", opacity:0}}/>
                <polygon id="ray1-7" points="484,71 445,46 480,82" style={{fill:"#EADCD7", stroke:"#EADCD7", opacity:0}}/>
                <polygon id="ray1-8" points="472,90 463,103 497,84" style={{fill:"#F5CAB5", stroke:"#F5CAB5", opacity:0}}/>
                <polygon id="ray1-9" points="497,84 484,71 483,80" style={{fill:"#F4B091", stroke:"#F4B091", opacity:0}}/>
                <polygon id="ray1-10" points="483,80 481,84 497,84" style={{fill:"#EEB596", stroke:"#EEB596", opacity:0}}/>
                <polygon id="ray1-11" points="481,84 472,90 497,84" style={{fill:"#F2BAA0", stroke:"#F2BAA0", opacity:0}}/>
                <polygon id="ray1-12" points="483,80 484,71 480,82" style={{fill:"#F9A98A", stroke:"#F9A98A", opacity:0}}/>
                <polygon id="ray1-13" points="481,84 480,82 472,90" style={{fill:"#F8B490", stroke:"#F8B490", opacity:0}}/>
                <polygon id="ray1-14" points="483,80 480,82 481,84" style={{fill:"#F5B28E", stroke:"#F5B28E", opacity:0}}/>
                <polygon id="ray1-15" points="497,84 526,72 484,71" style={{fill:"#F1D0B5", stroke:"#F1D0B5", opacity:0}}/>

                {/* Ray 2 */}
                <polygon id="ray2-1" points="375,127 353,137 365,142" style={{fill:"#D16742", stroke:"#D16742", opacity:0}}/>
                <polygon id="ray2-2" points="365,142 353,137 346,171" style={{fill:"#C56B48", stroke:"#C56B48", opacity:0}}/>
                <polygon id="ray2-3" points="389,107 362,104 375,127" style={{fill:"#ECA882", stroke:"#ECA882", opacity:0}}/>
                <polygon id="ray2-4" points="389,107 383,91 362,104" style={{fill:"#EC9478", stroke:"#EC9478", opacity:0}}/>
                <polygon id="ray2-5" points="365,142 346,171 367,172" style={{fill:"#E28B60", stroke:"#E28B60", opacity:0}}/>
                <polygon id="ray2-6" points="381,154 365,142 367,172" style={{fill:"#D57650", stroke:"#D57650", opacity:0}}/>
                <polygon id="ray2-7" points="368,185 367,172 346,171" style={{fill:"#E7773C", stroke:"#E7773C", opacity:0}}/>
                <polygon id="ray2-8" points="346,171 340,185 368,185" style={{fill:"#E2773F", stroke:"#E2773F", opacity:0}}/>
                <polygon id="ray2-9" points="375,127 365,142 381,154" style={{fill:"#EB9A6F", stroke:"#EB9A6F", opacity:0}}/>
                <polygon id="ray2-10" points="368,185 340,185 348,211" style={{fill:"#E58252", stroke:"#E58252", opacity:0}}/>
                <polygon id="ray2-11" points="408,133 375,127 381,154" style={{fill:"#F1B08A", stroke:"#F1B08A", opacity:0}}/>
                <polygon id="ray2-12" points="348,211 340,185 325,201" style={{fill:"#E58B5E", stroke:"#E58B5E", opacity:0}}/>
                <polygon id="ray2-13" points="408,133 389,107 375,127" style={{fill:"#F3BF9F", stroke:"#F3BF9F", opacity:0}}/>
                <polygon id="ray2-14" points="348,211 325,201 323,211" style={{fill:"#E89061", stroke:"#E89061", opacity:0}}/>
                <polygon id="ray2-15" points="384,163 381,154 367,172" style={{fill:"#D98B68", stroke:"#D98B68", opacity:0}}/>
                <polygon id="ray2-16" points="384,163 367,172 368,185" style={{fill:"#EC9C70", stroke:"#EC9C70", opacity:0}}/>
                <polygon id="ray2-17" points="384,163 368,185 405,172" style={{fill:"#F0B48E", stroke:"#F0B48E", opacity:0}}/>
                <polygon id="ray2-18" points="405,172 381,154 384,163" style={{fill:"#E0865C", stroke:"#E0865C", opacity:0}}/>
                <polygon id="ray2-19" points="408,133 381,154 405,172" style={{fill:"#EFAB7F", stroke:"#EFAB7F", opacity:0}}/>
                <polygon id="ray2-20" points="440,162 408,133 405,172" style={{fill:"#F4C7A1", stroke:"#F4C7A1", opacity:0}}/>
                <polygon id="ray2-21" points="425,199 405,172 368,185" style={{fill:"#F3A96C", stroke:"#F3A96C", opacity:0}}/>
                <polygon id="ray2-22" points="368,185 348,211 379,234" style={{fill:"#E99D6F", stroke:"#E99D6F", opacity:0}}/>
                <polygon id="ray2-23" points="425,199 440,162 405,172" style={{fill:"#F7C58E", stroke:"#F7C58E", opacity:0}}/>
                <polygon id="ray2-24" points="425,199 368,185 379,234" style={{fill:"#ECA268", stroke:"#ECA268", opacity:0}}/>
                <polygon id="ray2-25" points="425,199 379,234 421,252" style={{fill:"#DF8959", stroke:"#DF8959", opacity:0}}/>
                <polygon id="ray2-26" points="411,272 421,252 379,234" style={{fill:"#DA6A39", stroke:"#DA6A39", opacity:0}}/>
                <polygon id="ray2-27" points="438,218 425,199 421,252" style={{fill:"#F4C183", stroke:"#F4C183", opacity:0}}/>
                <polygon id="ray2-28" points="457,205 440,162 425,199" style={{fill:"#F6C286", stroke:"#F6C286", opacity:0}}/>
                <polygon id="ray2-29" points="438,218 457,205 425,199" style={{fill:"#F9C27F", stroke:"#F9C27F", opacity:0}}/>
                <polygon id="ray2-30" points="461,166 440,162 457,205" style={{fill:"#F9D5AE", stroke:"#F9D5AE", opacity:0}}/>
                <polygon id="ray2-31" points="473,208 461,166 457,205" style={{fill:"#F8D39E", stroke:"#F8D39E", opacity:0}}/>
                <polygon id="ray2-32" points="471,233 473,208 457,205" style={{fill:"#F9C174", stroke:"#F9C174", opacity:0}}/>
                <polygon id="ray2-33" points="444,229 457,205 438,218" style={{fill:"#F8C882", stroke:"#F8C882", opacity:0}}/>
                <polygon id="ray2-34" points="444,229 438,218 421,252" style={{fill:"#F5C386", stroke:"#F5C386", opacity:0}}/>
                <polygon id="ray2-35" points="444,229 421,252 448,237" style={{fill:"#F6C28B", stroke:"#F6C28B", opacity:0}}/>
                <polygon id="ray2-36" points="471,233 457,205 444,229" style={{fill:"#F7C986", stroke:"#F7C986", opacity:0}}/>
                <polygon id="ray2-37" points="471,233 444,229 448,237" style={{fill:"#F6CB87", stroke:"#F6CB87", opacity:0}}/>
                <polygon id="ray2-38" points="426,259 421,252 411,272" style={{fill:"#EB8D50", stroke:"#EB8D50", opacity:0}}/>
                <polygon id="ray2-39" points="448,237 421,252 445,254" style={{fill:"#F1BA80", stroke:"#F1BA80", opacity:0}}/>
                <polygon id="ray2-40" points="426,259 445,254 421,252" style={{fill:"#EE9B5A", stroke:"#EE9B5A", opacity:0}}/>
                <polygon id="ray2-41" points="456,252 448,237 445,254" style={{fill:"#F3D19C", stroke:"#F3D19C", opacity:0}}/>
                <polygon id="ray2-42" points="483,226 473,208 471,233" style={{fill:"#F7CF8B", stroke:"#F7CF8B", opacity:0}}/>
                <polygon id="ray2-43" points="471,233 448,237 456,252" style={{fill:"#F5CA88", stroke:"#F5CA88", opacity:0}}/>
                <polygon id="ray2-44" points="481,246 471,233 456,252" style={{fill:"#F4CB85", stroke:"#F4CB85", opacity:0}}/>
                <polygon id="ray2-45" points="481,246 483,226 471,233" style={{fill:"#F7D497", stroke:"#F7D497", opacity:0}}/>
                <polygon id="ray2-46" points="451,259 456,252 445,254" style={{fill:"#F5D1A5", stroke:"#F5D1A5", opacity:0}}/>
                <polygon id="ray2-47" points="480,252 481,246 456,252" style={{fill:"#F6D28C", stroke:"#F6D28C", opacity:0}}/>
                <polygon id="ray2-48" points="451,259 445,254 426,259" style={{fill:"#F3B57B", stroke:"#F3B57B", opacity:0}}/>
                <polygon id="ray2-49" points="455,289 451,259 426,259" style={{fill:"#F2AD71", stroke:"#F2AD71", opacity:0}}/>
                <polygon id="ray2-50" points="466,278 456,252 451,259" style={{fill:"#F3C27B", stroke:"#F3C27B", opacity:0}}/>
                <polygon id="ray2-51" points="466,278 451,259 455,289" style={{fill:"#F7C37B", stroke:"#F7C37B", opacity:0}}/>
                <polygon id="ray2-52" points="456,252 466,278 480,252" style={{fill:"#F5C372", stroke:"#F5C372", opacity:0}}/>
                <polygon id="ray2-53" points="455,289 426,259 411,272" style={{fill:"#EE9A5B", stroke:"#EE9A5B", opacity:0}}/>
                <polygon id="ray2-54" points="455,289 411,272 427,308" style={{fill:"#ED8B45", stroke:"#ED8B45", opacity:0}}/>
                <polygon id="ray2-55" points="414,312 427,308 411,272" style={{fill:"#E79967", stroke:"#E79967", opacity:0}}/>
                <polygon id="ray2-56" points="453,301 455,289 427,308" style={{fill:"#EE9B56", stroke:"#EE9B56", opacity:0}}/>
                <polygon id="ray2-57" points="475,289 466,278 455,289" style={{fill:"#F5D29D", stroke:"#F5D29D", opacity:0}}/>
                <polygon id="ray2-58" points="465,300 475,289 455,289" style={{fill:"#FAE5C1", stroke:"#FAE5C1", opacity:0}}/>
                <polygon id="ray2-59" points="453,301 465,300 455,289" style={{fill:"#F6D197", stroke:"#F6D197", opacity:0}}/>
                <polygon id="ray2-60" points="460,319 465,300 453,301" style={{fill:"#FBDAAD", stroke:"#FBDAAD", opacity:0}}/>
                <polygon id="ray2-61" points="453,301 427,308 433,313" style={{fill:"#EB823B", stroke:"#EB823B", opacity:0}}/>
                <polygon id="ray2-62" points="433,313 427,308 414,312" style={{fill:"#E78F5A", stroke:"#E78F5A", opacity:0}}/>
                <polygon id="ray2-63" points="460,319 453,301 433,313" style={{fill:"#EB9752", stroke:"#EB9752", opacity:0}}/>
                <polygon id="ray2-64" points="433,313 414,312 436,349" style={{fill:"#EABD9C", stroke:"#EABD9C", opacity:0}}/>
                <polygon id="ray2-65" points="436,349 460,319 433,313" style={{fill:"#ED8B3D", stroke:"#ED8B3D", opacity:0}}/>
                <polygon id="ray2-66" points="436,349 465,349 460,319" style={{fill:"#E98533", stroke:"#E98533", opacity:0}}/>
                <polygon id="ray2-67" points="470,354 465,349 436,349" style={{fill:"#EE8928", stroke:"#EE8928", opacity:0}}/>
                <polygon id="ray2-68" points="470,354 436,349 480,372" style={{fill:"#F29130", stroke:"#F29130", opacity:0}}/>
                <polygon id="ray2-69" points="480,372 436,349 482,378" style={{fill:"#F49D38", stroke:"#F49D38", opacity:0}}/>
                <polygon id="ray2-70" points="482,378 519,366 480,372" style={{fill:"#F8CEA4", stroke:"#F8CEA4", opacity:0}}/>

                {/* Ray 3 */}
                <polygon id="ray3-1" points="296,238 271,256 292,269" style={{fill:"#EDAB74", stroke:"#EDAB74", opacity:0}}/>
                <polygon id="ray3-2" points="297,268 296,238 292,269" style={{fill:"#EFB079", stroke:"#EFB079", opacity:0}}/>
                <polygon id="ray3-3" points="292,269 271,256 273,263" style={{fill:"#EEB07C", stroke:"#EEB07C", opacity:0}}/>
                <polygon id="ray3-4" points="273,263 248,271 265,294" style={{fill:"#EB9D62", stroke:"#EB9D62", opacity:0}}/>
                <polygon id="ray3-5" points="281,272 273,263 265,294" style={{fill:"#E69255", stroke:"#E69255", opacity:0}}/>
                <polygon id="ray3-6" points="292,269 273,263 281,272" style={{fill:"#F3B37C", stroke:"#F3B37C", opacity:0}}/>
                <polygon id="ray3-7" points="248,271 246,274 265,294" style={{fill:"#EA995D", stroke:"#EA995D", opacity:0}}/>
                <polygon id="ray3-8" points="246,274 237,292 265,294" style={{fill:"#E19055", stroke:"#E19055", opacity:0}}/>
                <polygon id="ray3-9" points="307,257 296,238 297,268" style={{fill:"#F1B27A", stroke:"#F1B27A", opacity:0}}/>
                <polygon id="ray3-10" points="302,239 296,238 307,257" style={{fill:"#E89C6B", stroke:"#E89C6B", opacity:0}}/>
                <polygon id="ray3-11" points="315,242 306,239 310,247" style={{fill:"#F5C496", stroke:"#F5C496", opacity:0}}/>
                <polygon id="ray3-12" points="292,275 292,269 281,272" style={{fill:"#F5C290", stroke:"#F5C290", opacity:0}}/>
                <polygon id="ray3-15" points="285,288 281,272 265,294" style={{fill:"#F2A86E", stroke:"#F2A86E", opacity:0}}/>
                <polygon id="ray3-16" points="290,280 281,272 285,288" style={{fill:"#E6955B", stroke:"#E6955B", opacity:0}}/>
                <polygon id="ray3-17" points="307,261 307,257 297,268" style={{fill:"#F4BB7F", stroke:"#F4BB7F", opacity:0}}/>
                <polygon id="ray3-18" points="317,279 307,261 297,268" style={{fill:"#F6BA7A", stroke:"#F6BA7A", opacity:0}}/>
                <polygon id="ray3-19" points="317,279 297,268 295,274" style={{fill:"#EEB578", stroke:"#EEB578", opacity:0}}/>
                <polygon id="ray3-20" points="317,279 295,274 296,288" style={{fill:"#ECB27F", stroke:"#ECB27F", opacity:0}}/>
                <polygon id="ray3-21" points="314,254 310,247 307,257" style={{fill:"#F6BF8D", stroke:"#F6BF8D", opacity:0}}/>
                <polygon id="ray3-22" points="325,264 314,254 307,261" style={{fill:"#F5C38E", stroke:"#F5C38E", opacity:0}}/>
                <polygon id="ray3-23" points="314,254 307,257 307,261" style={{fill:"#F8BE86", stroke:"#F8BE86", opacity:0}}/>
                <polygon id="ray3-24" points="317,279 324,273 307,261" style={{fill:"#FAC68D", stroke:"#FAC68D", opacity:0}}/>
                <polygon id="ray3-25" points="325,264 307,261 324,273" style={{fill:"#F7C794", stroke:"#F7C794", opacity:0}}/>
                <polygon id="ray3-26" points="324,257 315,242 314,254" style={{fill:"#F5CD98", stroke:"#F5CD98", opacity:0}}/>
                <polygon id="ray3-27" points="325,264 324,257 314,254" style={{fill:"#F4C99A", stroke:"#F4C99A", opacity:0}}/>
                <polygon id="ray3-28" points="290,298 287,288 285,288" style={{fill:"#F1AC70", stroke:"#F1AC70", opacity:0}}/>
                <polygon id="ray3-29" points="277,303 285,288 265,294" style={{fill:"#F0AB6C", stroke:"#F0AB6C", opacity:0}}/>
                <polygon id="ray3-30" points="290,298 285,288 277,303" style={{fill:"#F3A767", stroke:"#F3A767", opacity:0}}/>
                <polygon id="ray3-31" points="304,296 317,279 296,288" style={{fill:"#E89967", stroke:"#E89967", opacity:0}}/>
                <polygon id="ray3-32" points="304,296 297,291 290,298" style={{fill:"#EC9B62", stroke:"#EC9B62", opacity:0}}/>
                <polygon id="ray3-33" points="321,281 317,279 304,296" style={{fill:"#EAB47C", stroke:"#EAB47C", opacity:0}}/>
                <polygon id="ray3-34" points="321,281 324,273 317,279" style={{fill:"#F9C991", stroke:"#F9C991", opacity:0}}/>
                <polygon id="ray3-35" points="330,283 324,273 321,281" style={{fill:"#F8CA94", stroke:"#F8CA94", opacity:0}}/>
                <polygon id="ray3-36" points="329,286 330,283 321,281" style={{fill:"#F7C991", stroke:"#F7C991", opacity:0}}/>
                <polygon id="ray3-37" points="330,295 321,281 304,296" style={{fill:"#F0B980", stroke:"#F0B980", opacity:0}}/>
                <polygon id="ray3-38" points="330,295 329,286 321,281" style={{fill:"#F7C890", stroke:"#F7C890", opacity:0}}/>
                <polygon id="ray3-39" points="329,273 328,266 324,273" style={{fill:"#F8CC9B", stroke:"#F8CC9B", opacity:0}}/>
                <polygon id="ray3-40" points="330,283 329,273 324,273" style={{fill:"#F9CC96", stroke:"#F9CC96", opacity:0}}/>
                <polygon id="ray3-41" points="328,266 325,264 324,273" style={{fill:"#F7CD9C", stroke:"#F7CD9C", opacity:0}}/>
                <polygon id="ray3-42" points="328,266 324,257 325,264" style={{fill:"#F4CA9C", stroke:"#F4CA9C", opacity:0}}/>
                <polygon id="ray3-43" points="328,266 337,262 324,257" style={{fill:"#F5CCA0", stroke:"#F5CCA0", opacity:0}}/>
                <polygon id="ray3-44" points="337,268 337,262 328,266" style={{fill:"#F1CCA5", stroke:"#F1CCA5", opacity:0}}/>
                <polygon id="ray3-45" points="337,268 328,266 329,273" style={{fill:"#F3C898", stroke:"#F3C898", opacity:0}}/>
                <polygon id="ray3-46" points="337,268 329,273 330,283" style={{fill:"#F4C894", stroke:"#F4C894", opacity:0}}/>
                <polygon id="ray3-47" points="343,296 337,268 332,286" style={{fill:"#F6C88F", stroke:"#F6C88F", opacity:0}}/>
                <polygon id="ray3-48" points="332,286 337,268 330,283" style={{fill:"#F6C791", stroke:"#F6C791", opacity:0}}/>
                <polygon id="ray3-49" points="343,296 332,286 330,295" style={{fill:"#F9C694", stroke:"#F9C694", opacity:0}}/>
                <polygon id="ray3-50" points="330,295 332,286 329,286" style={{fill:"#F8C894", stroke:"#F8C894", opacity:0}}/>
                <polygon id="ray3-51" points="339,306 343,296 330,295" style={{fill:"#F8C892", stroke:"#F8C892", opacity:0}}/>
                <polygon id="ray3-52" points="349,316 343,296 339,306" style={{fill:"#EFCF9E", stroke:"#EFCF9E", opacity:0}}/>
                <polygon id="ray3-53" points="329,310 330,295 304,296" style={{fill:"#EDAF80", stroke:"#EDAF80", opacity:0}}/>
                <polygon id="ray3-54" points="304,296 290,298 292,305" style={{fill:"#F1A569", stroke:"#F1A569", opacity:0}}/>
                <polygon id="ray3-55" points="284,310 292,305 284,305" style={{fill:"#F0A35F", stroke:"#F0A35F", opacity:0}}/>
                <polygon id="ray3-56" points="292,305 290,298 284,305" style={{fill:"#F1A563", stroke:"#F1A563", opacity:0}}/>
                <polygon id="ray3-57" points="284,310 284,305 277,303" style={{fill:"#F0A05C", stroke:"#F0A05C", opacity:0}}/>
                <polygon id="ray3-58" points="290,298 277,303 284,305" style={{fill:"#F1A15D", stroke:"#F1A15D", opacity:0}}/>
                <polygon id="ray3-59" points="292,317 292,305 284,310" style={{fill:"#F0A462", stroke:"#F0A462", opacity:0}}/>
                <polygon id="ray3-60" points="303,323 304,296 292,305" style={{fill:"#F2A96B", stroke:"#F2A96B", opacity:0}}/>
                <polygon id="ray3-61" points="299,327 303,323 292,317" style={{fill:"#F3A669", stroke:"#F3A669", opacity:0}}/>
                <polygon id="ray3-62" points="303,323 292,305 292,317" style={{fill:"#F4A96A", stroke:"#F4A96A", opacity:0}}/>
                <polygon id="ray3-63" points="328,313 329,310 304,296" style={{fill:"#E8A270", stroke:"#E8A270", opacity:0}}/>
                <polygon id="ray3-64" points="303,323 328,313 304,296" style={{fill:"#EB985C", stroke:"#EB985C", opacity:0}}/>
                <polygon id="ray3-65" points="312,328 328,313 303,323" style={{fill:"#ED9E60", stroke:"#ED9E60", opacity:0}}/>
                <polygon id="ray3-66" points="337,337 329,317 312,328" style={{fill:"#EEA671", stroke:"#EEA671", opacity:0}}/>
                <polygon id="ray3-67" points="329,317 328,313 312,328" style={{fill:"#ECA36F", stroke:"#ECA36F", opacity:0}}/>
                <polygon id="ray3-68" points="338,315 329,317 337,337" style={{fill:"#F2BC8D", stroke:"#F2BC8D", opacity:0}}/>
                <polygon id="ray3-69" points="337,337 346,335 338,315" style={{fill:"#F6BB85", stroke:"#F6BB85", opacity:0}}/>
                <polygon id="ray3-70" points="346,335 349,316 338,315" style={{fill:"#F4C49A", stroke:"#F4C49A", opacity:0}}/>
                <polygon id="ray3-71" points="346,335 349,336 349,316" style={{fill:"#F4C9A4", stroke:"#F4C9A4", opacity:0}}/>
                <polygon id="ray3-72" points="349,336 353,337 349,316" style={{fill:"#F1D7BF", stroke:"#F1D7BF", opacity:0}}/>
                <polygon id="ray3-73" points="346,340 349,336 346,335" style={{fill:"#F5C195", stroke:"#F5C195", opacity:0}}/>
                <polygon id="ray3-74" points="346,340 353,337 349,336" style={{fill:"#F5C9A3", stroke:"#F5C9A3", opacity:0}}/>
                <polygon id="ray3-75" points="346,340 337,337 348,354" style={{fill:"#F5BC88", stroke:"#F5BC88", opacity:0}}/>
                <polygon id="ray3-76" points="291,324 292,317 284,310" style={{fill:"#ECA564", stroke:"#ECA564", opacity:0}}/>
                <polygon id="ray3-77" points="291,324 299,327 292,317" style={{fill:"#EFA86B", stroke:"#EFA86B", opacity:0}}/>
                <polygon id="ray3-78" points="299,327 312,328 303,323" style={{fill:"#F2A764", stroke:"#F2A764", opacity:0}}/>
                <polygon id="ray3-79" points="337,337 312,328 308,346" style={{fill:"#EB995A", stroke:"#EB995A", opacity:0}}/>
                <polygon id="ray3-80" points="306,343 312,328 299,327" style={{fill:"#EFA367", stroke:"#EFA367", opacity:0}}/>
                <polygon id="ray3-81" points="306,343 308,346 312,328" style={{fill:"#EA9D5E", stroke:"#EA9D5E", opacity:0}}/>
                <polygon id="ray3-82" points="291,326 299,327 291,324" style={{fill:"#F2B477", stroke:"#F2B477", opacity:0}}/>
                <polygon id="ray3-83" points="297,345 299,327 291,326" style={{fill:"#F0AF80", stroke:"#F0AF80", opacity:0}}/>
                <polygon id="ray3-84" points="297,345 306,343 299,327" style={{fill:"#F5BE93", stroke:"#F5BE93", opacity:0}}/>
                <polygon id="ray3-85" points="304,345 308,346 306,343" style={{fill:"#E7A86D", stroke:"#E7A86D", opacity:0}}/>
                <polygon id="ray3-86" points="303,353 308,346 304,345" style={{fill:"#EFC196", stroke:"#EFC196", opacity:0}}/>
                <polygon id="ray3-87" points="303,353 304,345 297,345" style={{fill:"#F7F4E0", stroke:"#F7F4E0", opacity:0}}/>
                <polygon id="ray3-88" points="317,367 337,337 308,346" style={{fill:"#E99554", stroke:"#E99554", opacity:0}}/>
                <polygon id="ray3-89" points="342,361 337,337 317,367" style={{fill:"#EB934F", stroke:"#EB934F", opacity:0}}/>
                <polygon id="ray3-90" points="303,353 317,367 308,346" style={{fill:"#F0B589", stroke:"#F0B589", opacity:0}}/>
                <polygon id="ray3-91" points="342,361 348,354 337,337" style={{fill:"#F3AC67", stroke:"#F3AC67", opacity:0}}/>
                <polygon id="ray3-92" points="333,375 342,361 317,367" style={{fill:"#DF8644", stroke:"#DF8644", opacity:0}}/>
                <polygon id="ray3-93" points="333,375 317,367 318,370" style={{fill:"#EEC8A5", stroke:"#EEC8A5", opacity:0}}/>
                <polygon id="ray3-94" points="342,361 357,365 348,354" style={{fill:"#F9B96B", stroke:"#F9B96B", opacity:0}}/>
                <polygon id="ray3-95" points="357,365 368,352 348,354" style={{fill:"#F6BA6E", stroke:"#F6BA6E", opacity:0}}/>
                <polygon id="ray3-96" points="348,377 342,361 333,375" style={{fill:"#ED9B57", stroke:"#ED9B57", opacity:0}}/>
                <polygon id="ray3-97" points="348,377 357,365 342,361" style={{fill:"#F4AE66", stroke:"#F4AE66", opacity:0}}/>
                <polygon id="ray3-98" points="374,362 368,352 357,365" style={{fill:"#F0AA51", stroke:"#F0AA51", opacity:0}}/>
                <polygon id="ray3-99" points="348,377 358,377 357,365" style={{fill:"#EFBF8E", stroke:"#EFBF8E", opacity:0}}/>
                <polygon id="ray3-100" points="357,378 358,377 348,377" style={{fill:"#F1E2E3", stroke:"#F1E2E3", opacity:0}}/>
                <polygon id="ray3-101" points="358,377 374,362 357,365" style={{fill:"#F3BF81", stroke:"#F3BF81", opacity:0}}/>
                <polygon id="ray3-102" points="374,362 392,346 368,352" style={{fill:"#ECB369", stroke:"#ECB369", opacity:0}}/>
                <polygon id="ray3-103" points="346,340 346,335 337,337" style={{fill:"#F4BB89", stroke:"#F4BB89", opacity:0}}/>
                <polygon id="ray3-104" points="348,354 353,337 346,340" style={{fill:"#F8C89B", stroke:"#F8C89B", opacity:0}}/>
                <polygon id="ray3-105" points="348,354 368,352 353,337" style={{fill:"#F5CB9D", stroke:"#F5CB9D", opacity:0}}/>

                {/* Ray 4 */}
                <polygon id="ray4-1" points="209,328 228,353 246,328" style={{fill:"#EC9653", stroke:"#EC9653", opacity:0}}/>
                <polygon id="ray4-2" points="210,347 228,353 209,328" style={{fill:"#E89E6B", stroke:"#E89E6B", opacity:0}}/>
                <polygon id="ray4-3" points="189,337 210,347 209,328" style={{fill:"#E18856", stroke:"#E18856", opacity:0}}/>
                <polygon id="ray4-4" points="200,367 206,365 198,365" style={{fill:"#E68950", stroke:"#E68950", opacity:0}}/>
                <polygon id="ray4-5" points="174,365 198,365 189,337" style={{fill:"#DA885A", stroke:"#DA885A", opacity:0}}/>
                <polygon id="ray4-6" points="198,365 210,347 189,337" style={{fill:"#DE8852", stroke:"#DE8852", opacity:0}}/>
                <polygon id="ray4-7" points="210,347 206,365 218,354" style={{fill:"#E4864E", stroke:"#E4864E", opacity:0}}/>
                <polygon id="ray4-8" points="206,365 210,347 198,365" style={{fill:"#E1844B", stroke:"#E1844B", opacity:0}}/>
                <polygon id="ray4-9" points="210,347 218,354 228,353" style={{fill:"#E7935E", stroke:"#E7935E", opacity:0}}/>
                <polygon id="ray4-10" points="228,353 240,362 246,328" style={{fill:"#ED9049", stroke:"#ED9049", opacity:0}}/>
                <polygon id="ray4-11" points="228,353 218,354 235,361" style={{fill:"#EA8B4C", stroke:"#EA8B4C", opacity:0}}/>
                <polygon id="ray4-12" points="206,365 218,380 218,354" style={{fill:"#E88B51", stroke:"#E88B51", opacity:0}}/>
                <polygon id="ray4-13" points="218,354 218,380 235,361" style={{fill:"#E98F53", stroke:"#E98F53", opacity:0}}/>
                <polygon id="ray4-14" points="218,380 240,362 235,361" style={{fill:"#EC9858", stroke:"#EC9858", opacity:0}}/>
                <polygon id="ray4-15" points="228,353 235,361 240,362" style={{fill:"#EF8D47", stroke:"#EF8D47", opacity:0}}/>
                <polygon id="ray4-16" points="174,365 193,396 203,374" style={{fill:"#D87640", stroke:"#D87640", opacity:0}}/>
                <polygon id="ray4-17" points="198,365 174,365 203,374" style={{fill:"#D97844", stroke:"#D97844", opacity:0}}/>
                <polygon id="ray4-18" points="203,374 206,365 200,367" style={{fill:"#E7884E", stroke:"#E7884E", opacity:0}}/>
                <polygon id="ray4-19" points="199,397 207,377 193,396" style={{fill:"#E2824C", stroke:"#E2824C", opacity:0}}/>
                <polygon id="ray4-20" points="203,374 207,377 206,365" style={{fill:"#E5854C", stroke:"#E5854C", opacity:0}}/>
                <polygon id="ray4-21" points="193,396 207,377 203,374" style={{fill:"#E3824C", stroke:"#E3824C", opacity:0}}/>
                <polygon id="ray4-22" points="206,365 208,378 218,380" style={{fill:"#E5894E", stroke:"#E5894E", opacity:0}}/>
                <polygon id="ray4-23" points="199,397 211,393 209,379" style={{fill:"#E78C53", stroke:"#E78C53", opacity:0}}/>
                <polygon id="ray4-24" points="199,397 209,379 208,378" style={{fill:"#E58850", stroke:"#E58850", opacity:0}}/>
                <polygon id="ray4-25" points="209,379 211,393 218,380" style={{fill:"#E68E52", stroke:"#E68E52", opacity:0}}/>
                <polygon id="ray4-26" points="234,407 240,362 218,380" style={{fill:"#EEA165", stroke:"#EEA165", opacity:0}}/>
                <polygon id="ray4-27" points="220,399 234,407 218,380" style={{fill:"#EFA163", stroke:"#EFA163", opacity:0}}/>
                <polygon id="ray4-28" points="211,393 220,399 218,380" style={{fill:"#EA9658", stroke:"#EA9658", opacity:0}}/>
                <polygon id="ray4-29" points="206,416 220,403 212,402" style={{fill:"#EA9A63", stroke:"#EA9A63", opacity:0}}/>
                <polygon id="ray4-30" points="211,393 212,401 220,399" style={{fill:"#EB985A", stroke:"#EB985A", opacity:0}}/>
                <polygon id="ray4-31" points="203,406 206,416 212,402" style={{fill:"#E7925D", stroke:"#E7925D", opacity:0}}/>
                <polygon id="ray4-32" points="194,400 203,406 199,397" style={{fill:"#E78C52", stroke:"#E78C52", opacity:0}}/>
                <polygon id="ray4-33" points="199,397 212,401 211,393" style={{fill:"#E89056", stroke:"#E89056", opacity:0}}/>
                <polygon id="ray4-34" points="199,397 203,406 212,401" style={{fill:"#E78C55", stroke:"#E78C55", opacity:0}}/>
                <polygon id="ray4-35" points="193,396 194,400 199,397" style={{fill:"#E58751", stroke:"#E58751", opacity:0}}/>
                <polygon id="ray4-36" points="212,401 220,403 220,399" style={{fill:"#EF9C5D", stroke:"#EF9C5D", opacity:0}}/>
                <polygon id="ray4-37" points="220,399 220,403 234,407" style={{fill:"#F0A368", stroke:"#F0A368", opacity:0}}/>
                <polygon id="ray4-38" points="220,403 230,418 234,407" style={{fill:"#F1A86A", stroke:"#F1A86A", opacity:0}}/>
                <polygon id="ray4-39" points="206,416 230,418 220,403" style={{fill:"#EDA164", stroke:"#EDA164", opacity:0}}/>
                <polygon id="ray4-40" points="217,440 230,418 206,416" style={{fill:"#E99E66", stroke:"#E99E66", opacity:0}}/>
                <polygon id="ray4-41" points="194,400 193,407 203,406" style={{fill:"#EA995A", stroke:"#EA995A", opacity:0}}/>
                <polygon id="ray4-42" points="192,405 193,407 194,400" style={{fill:"#E7A062", stroke:"#E7A062", opacity:0}}/>
                <polygon id="ray4-43" points="193,407 198,415 203,406" style={{fill:"#EF9C5A", stroke:"#EF9C5A", opacity:0}}/>
                <polygon id="ray4-44" points="198,415 206,416 203,406" style={{fill:"#EB9354", stroke:"#EB9354", opacity:0}}/>
                <polygon id="ray4-45" points="199,433 206,416 196,417" style={{fill:"#F09B57", stroke:"#F09B57", opacity:0}}/>
                <polygon id="ray4-46" points="199,433 196,417 188,413" style={{fill:"#F5A15B", stroke:"#F5A15B", opacity:0}}/>
                <polygon id="ray4-47" points="191,411 198,415 193,407" style={{fill:"#EFA462", stroke:"#EFA462", opacity:0}}/>
                <polygon id="ray4-48" points="188,413 196,417 191,411" style={{fill:"#F4A65E", stroke:"#F4A65E", opacity:0}}/>
                <polygon id="ray4-49" points="198,415 196,417 206,416" style={{fill:"#EC9755", stroke:"#EC9755", opacity:0}}/>
                <polygon id="ray4-50" points="203,438 217,440 206,416" style={{fill:"#EEA56F", stroke:"#EEA56F", opacity:0}}/>
                <polygon id="ray4-51" points="199,433 203,438 206,416" style={{fill:"#E69A58", stroke:"#E69A58", opacity:0}}/>
                <polygon id="ray4-52" points="197,439 203,438 199,433" style={{fill:"#E2934D", stroke:"#E2934D", opacity:0}}/>
                <polygon id="ray4-53" points="197,439 193,444 203,438" style={{fill:"#E78C44", stroke:"#E78C44", opacity:0}}/>
                <polygon id="ray4-54" points="193,444 199,433 188,413" style={{fill:"#F5954B", stroke:"#F5954B", opacity:0}}/>
                <polygon id="ray4-55" points="190,447 193,444 188,413" style={{fill:"#EF8E47", stroke:"#EF8E47", opacity:0}}/>
                <polygon id="ray4-56" points="190,447 190,451 193,444" style={{fill:"#EC7E39", stroke:"#EC7E39", opacity:0}}/>
                <polygon id="ray4-57" points="203,438 211,460 217,440" style={{fill:"#EEA26F", stroke:"#EEA26F", opacity:0}}/>
                <polygon id="ray4-58" points="201,462 203,438 193,444" style={{fill:"#EE9B5B", stroke:"#EE9B5B", opacity:0}}/>
                <polygon id="ray4-59" points="201,462 211,460 203,438" style={{fill:"#ECA470", stroke:"#ECA470", opacity:0}}/>
                <polygon id="ray4-60" points="190,451 201,462 193,444" style={{fill:"#EB8442", stroke:"#EB8442", opacity:0}}/>
                <polygon id="ray4-61" points="199,466 201,462 190,451" style={{fill:"#E78D50", stroke:"#E78D50", opacity:0}}/>
                <polygon id="ray4-62" points="201,462 199,466 211,460" style={{fill:"#E7A274", stroke:"#E7A274", opacity:0}}/>
                <polygon id="ray4-63" points="187,478 199,466 190,451" style={{fill:"#E6844D", stroke:"#E6844D", opacity:0}}/>
                <polygon id="ray4-64" points="199,466 220,488 211,460" style={{fill:"#EE9A6C", stroke:"#EE9A6C", opacity:0}}/>
                <polygon id="ray4-65" points="201,497 199,466 187,478" style={{fill:"#EE9A6C", stroke:"#E3916A", opacity:0}}/>
                <polygon id="ray4-66" points="201,497 220,488 199,466" style={{fill:"#E99164", stroke:"#E99164", opacity:0}}/>
                <polygon id="ray4-67" points="209,498 220,488 201,497" style={{fill:"#E87B58", stroke:"#E87B58", opacity:0}}/>
                <polygon id="ray4-68" points="209,498 215,511 220,488" style={{fill:"#DE8D6D", stroke:"#DE8D6D", opacity:0}}/>
                <polygon id="ray4-69" points="201,497 215,511 209,498" style={{fill:"#EC785A", stroke:"#EC785A", opacity:0}}/>
                <polygon id="ray4-70" points="208,525 215,511 201,497" style={{fill:"#E7AA99", stroke:"#E7AA99", opacity:0}}/>
                <polygon id="ray4-71" points="215,511 226,523 220,488" style={{fill:"#E7AA96", stroke:"#E7AA96", opacity:0}}/>
                <polygon id="ray4-72" points="208,525 226,523 215,511" style={{fill:"#E69F90", stroke:"#E69F90", opacity:0}}/>
                <polygon id="ray4-73" points="208,525 222,529 226,523" style={{fill:"#E8CFBF", stroke:"#E8CFBF", opacity:0}}/>
                <polygon id="ray4-74" points="222,529 238,535 226,523" style={{fill:"#DDBEB6", stroke:"#DDBEB6", opacity:0}}/>
                <polygon id="ray4-75" points="208,525 223,536 222,529" style={{fill:"#E6E8DE", stroke:"#E6E8DE", opacity:0}}/>
                <polygon id="ray4-76" points="223,536 238,535 222,529" style={{fill:"#E8E1DA", stroke:"#E8E1DA", opacity:0}}/>

                {/* Ray 5 */}
                <polygon id="ray5-1" points="109,356 129,365 129,355" style={{fill:"#E09151", stroke:"#E09151", opacity:0}}/>
                <polygon id="ray5-2" points="109,356 106,367 129,365" style={{fill:"#E09151", stroke:"#E79155", opacity:0}}/>
                <polygon id="ray5-3" points="81,342 101,366 102,349" style={{fill:"#E99156", stroke:"#E99156", opacity:0}}/>
                <polygon id="ray5-4" points="101,366 107,355 102,349" style={{fill:"#E7925A", stroke:"#E7925A", opacity:0}}/>
                <polygon id="ray5-5" points="147,373 155,388 151,368" style={{fill:"#DFA167", stroke:"#DFA167", opacity:0}}/>
                <polygon id="ray5-6" points="101,366 106,367 107,355" style={{fill:"#EA995B", stroke:"#EA995B", opacity:0}}/>
                <polygon id="ray5-7" points="107,355 106,367 109,356" style={{fill:"#E99059", stroke:"#E99059", opacity:0}}/>
                <polygon id="ray5-8" points="129,355 129,365 151,368" style={{fill:"#E49E5B", stroke:"#E49E5B", opacity:0}}/>
                <polygon id="ray5-9" points="151,368 155,388 174,365" style={{fill:"#DE9555", stroke:"#DE9555", opacity:0}}/>
                <polygon id="ray5-10" points="129,365 147,373 151,368" style={{fill:"#DE9A51", stroke:"#DE9A51", opacity:0}}/>
                <polygon id="ray5-11" points="123,381 129,365 106,367" style={{fill:"#EC995B", stroke:"#EC995B", opacity:0}}/>
                <polygon id="ray5-12" points="123,381 147,373 129,365" style={{fill:"#E9B078", stroke:"#E9B078", opacity:0}}/>
                <polygon id="ray5-13" points="67,355 101,366 81,342" style={{fill:"#D37E50", stroke:"#D37E50", opacity:0}}/>
                <polygon id="ray5-14" points="101,366 103,373 106,367" style={{fill:"#F0A15E", stroke:"#F0A15E", opacity:0}}/>
                <polygon id="ray5-15" points="106,367 103,373 123,381" style={{fill:"#EBA25E", stroke:"#EBA25E", opacity:0}}/>
                <polygon id="ray5-16" points="147,373 146,399 155,388" style={{fill:"#E3DBD1", stroke:"#E3DBD1", opacity:0}}/>
                <polygon id="ray5-17" points="123,381 146,399 147,373" style={{fill:"#ECD6C0", stroke:"#ECD6C0", opacity:0}}/>
                <polygon id="ray5-18" points="104,413 123,381 103,373" style={{fill:"#E19767", stroke:"#E19767", opacity:0}}/>
                <polygon id="ray5-19" points="123,381 132,403 146,399" style={{fill:"#F3C49A", stroke:"#F3C49A", opacity:0}}/>
                <polygon id="ray5-20" points="104,413 132,403 123,381" style={{fill:"#E8A773", stroke:"#E8A773", opacity:0}}/>
                <polygon id="ray5-21" points="132,403 136,405 146,399" style={{fill:"#F0D0B0", stroke:"#F0D0B0", opacity:0}}/>
                <polygon id="ray5-22" points="136,405 143,407 146,399" style={{fill:"#EEE1D3", stroke:"#EEE1D3", opacity:0}}/>
                <polygon id="ray5-23" points="126,416 136,405 132,403" style={{fill:"#F6C088", stroke:"#F6C088", opacity:0}}/>
                <polygon id="ray5-24" points="126,416 132,403 104,413" style={{fill:"#E39E71", stroke:"#E39E71", opacity:0}}/>
                <polygon id="ray5-25" points="136,405 138,414 143,407" style={{fill:"#F7D0AB", stroke:"#F7D0AB", opacity:0}}/>
                <polygon id="ray5-26" points="126,416 138,414 136,405" style={{fill:"#FAC189", stroke:"#FAC189", opacity:0}}/>
                <polygon id="ray5-27" points="59,350 66,364 67,355" style={{fill:"#D26C5A", stroke:"#D26C5A", opacity:0}}/>
                <polygon id="ray5-28" points="67,355 66,364 101,366" style={{fill:"#C5684B", stroke:"#C5684B", opacity:0}}/>
                <polygon id="ray5-29" points="66,364 78,383 101,366" style={{fill:"#CC7454", stroke:"#CC7454", opacity:0}}/>
                <polygon id="ray5-30" points="101,366 78,383 103,373" style={{fill:"#D98856", stroke:"#D98856", opacity:0}}/>
                <polygon id="ray5-31" points="78,383 84,396 103,373" style={{fill:"#CA6347", stroke:"#CA6347", opacity:0}}/>
                <polygon id="ray5-32" points="84,396 104,413 103,373" style={{fill:"#D27554", stroke:"#D27554", opacity:0}}/>
                <polygon id="ray5-33" points="84,396 84,402 104,413" style={{fill:"#E18A69", stroke:"#E18A69", opacity:0}}/>
                <polygon id="ray5-34" points="84,402 83,418 104,413" style={{fill:"#E2906B", stroke:"#E2906B", opacity:0}}/>
                <polygon id="ray5-35" points="83,418 80,428 104,413" style={{fill:"#D87E61", stroke:"#D87E61", opacity:0}}/>
                <polygon id="ray5-36" points="80,428 111,438 104,413" style={{fill:"#E29672", stroke:"#E29672", opacity:0}}/>
                <polygon id="ray5-37" points="104,413 121,423 126,416" style={{fill:"#CC7856", stroke:"#CC7856", opacity:0}}/>
                <polygon id="ray5-38" points="104,413 111,438 121,423" style={{fill:"#DA7F60", stroke:"#DA7F60", opacity:0}}/>
                <polygon id="ray5-39" points="128,418 126,425 138,414" style={{fill:"#F6BE87", stroke:"#F6BE87", opacity:0}}/>
                <polygon id="ray5-40" points="121,423 126,425 128,418" style={{fill:"#F3B488", stroke:"#F3B488", opacity:0}}/>
                <polygon id="ray5-41" points="111,438 126,425 121,423" style={{fill:"#C87153", stroke:"#C87153", opacity:0}}/>
                <polygon id="ray5-42" points="128,418 138,414 126,416" style={{fill:"#F8C188", stroke:"#F8C188", opacity:0}}/>
                <polygon id="ray5-43" points="121,423 128,418 126,416" style={{fill:"#F4B688", stroke:"#F4B688", opacity:0}}/>
                <polygon id="ray5-44" points="80,428 96,455 111,438" style={{fill:"#E6AC91", stroke:"#E6AC91", opacity:0}}/>
                <polygon id="ray5-45" points="111,438 113,451 126,425" style={{fill:"#D37856", stroke:"#D37856", opacity:0}}/>
                <polygon id="ray5-46" points="113,451 119,463 126,425" style={{fill:"#D3855D", stroke:"#D3855D", opacity:0}}/>
                <polygon id="ray5-47" points="96,455 113,451 111,438" style={{fill:"#E49269", stroke:"#E49269", opacity:0}}/>
                <polygon id="ray5-48" points="96,455 119,463 113,451" style={{fill:"#E19066", stroke:"#E19066", opacity:0}}/>
                <polygon id="ray5-49" points="96,455 103,475 119,463" style={{fill:"#E7916A", stroke:"#E7916A", opacity:0}}/>
                <polygon id="ray5-50" points="103,475 127,484 119,463" style={{fill:"#EEA677", stroke:"#EEA677", opacity:0}}/>
                <polygon id="ray5-51" points="103,475 119,496 127,484" style={{fill:"#EEA471", stroke:"#EEA471", opacity:0}}/>
                <polygon id="ray5-52" points="112,502 119,496 103,475" style={{fill:"#ECA171", stroke:"#ECA171", opacity:0}}/>
                <polygon id="ray5-53" points="119,496 117,525 127,484" style={{fill:"#FDEBD8", stroke:"#FDEBD8", opacity:0}}/>
                <polygon id="ray5-54" points="112,502 117,525 119,496" style={{fill:"#EDB78E", stroke:"#EDB78E", opacity:0}}/>
                <polygon id="ray5-55" points="97,543 117,525 112,502" style={{fill:"#E5925D", stroke:"#E5925D", opacity:0}}/>
                <polygon id="ray5-56" points="107,541 117,525 97,543" style={{fill:"#E8A379", stroke:"#E8A379", opacity:0}}/>
                <polygon id="ray5-57" points="97,543 89,565 107,541" style={{fill:"#E6A986", stroke:"#E6A986", opacity:0}}/>
            </g>
        </svg>
    );
}

export default SunRays;