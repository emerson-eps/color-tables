import * as React from "react";
import { Accordion  } from "@equinor/eds-core-react";
import {ColorSelectors} from "./ContinousColorSelector";
import ColorSelectorss from "./DiscreteColorSelector";
import ContinuousLegendtt from "../Legend/d3legend";
import {ColorSelectorrt} from "./d3ColorSelector";

export const ColorSelector = () => {
    // export const ColorSelector: React.FC<legendProps> = ({
    // }: legendProps) => {
    return (
        <div style={{width: "450px"}}>
            <Accordion >
                <Accordion.Item>
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
                                    {/* <ColorSelectors colorTableColors={true} /> */}
                                    <ColorSelectors colorTableColors={true} />
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion >
                            <Accordion.Item>
                                <Accordion.Header>
                                    D3 Color Scale
                                </Accordion.Header>
                                <Accordion.Panel>
                                    {/* <ColorSelectorrt colorTableColors={false} /> */}
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion >
                            <Accordion.Item>
                                <Accordion.Header>
                                    Custom Color Scale
                                </Accordion.Header>
                                <Accordion.Panel>
                                    Custom Content
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};