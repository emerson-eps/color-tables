export declare type propertiesObj = {
    objectName: string;
    colorTable: string;
    context: string;
    colorInterpolation: string;
};
declare type propertiesArr = Array<propertiesObj>;
declare type template = {
    name: string;
    properties: propertiesArr;
};
export declare type templateArray = Array<template>;
export {};
