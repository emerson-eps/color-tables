export declare type propertiesObj = {
    objectName: string;
    colorTable: string;
    context: string;
    colorInterpolation: string;
}

type propertiesArr = Array<propertiesObj>;

declare type template = {
    name: string;
    properties: propertiesArr;
}

export type templateArray = Array<template>;
