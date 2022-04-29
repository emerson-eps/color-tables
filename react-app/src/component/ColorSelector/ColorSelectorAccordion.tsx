import * as React from "react";
import { Accordion  } from "@equinor/eds-core-react";
import {useRef, MouseEvent  } from "react"; 
import { ColorSelectorWrapper } from "./ColorSelectorWrapper";

export const ColorSelectorAccordion = (props: any) => {
    const divRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
        function handleClick(e: MouseEvent<HTMLButtonElement> | any) {
            if(divRef && divRef.current){
                console.log('e:', e)
                console.log('props:', props)
                if(!divRef.current.contains(e.target as Node)){
                    props.closeColorSelector(false);            
                }
            }
        }
    }, []);

    return (
        <div className="Container" ref={divRef} style={{width: "316px",
        position: "absolute",
        zIndex: 1,
        top: props.isHorizontal ? 100 : 30,
        right: props.isHorizontal ? 5 : 165,
        }}>
            <Accordion >
                <Accordion.Item isExpanded>
                    <Accordion.Header>
                        Color Scales
                    </Accordion.Header>
                    <Accordion.Panel>
                        <Accordion >
                            <Accordion.Item>
                                <Accordion.Header>
                                    Geologic Color Scale
                                </Accordion.Header>
                                <Accordion.Panel>
                                    <ColorSelectorWrapper useColorTableColors={true} newColorScaleData={props?.newColorScaleData}/>
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion >
                            <Accordion.Item>
                                <Accordion.Header>
                                    D3 Color Scale
                                </Accordion.Header>
                                <Accordion.Panel>
                                    <ColorSelectorWrapper useColorTableColors={false} newColorScaleData={props?.newColorScaleData}/>
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};