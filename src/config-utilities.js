import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isDate from 'lodash/isDate';
import isString from 'lodash/isString';
import get from 'lodash/get';
import isPlainObject from 'lodash/isPlainObject';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';

export function clone(layer0, layer1) {
    return merge(layer0, layer1, true);
}

export function merge(layer0, layer1, isCloneNeeded) {
    let base = layer0;
    if(Array.isArray(base)){
        if (layer1) {
            if(Array.isArray(layer1)){
                base.concat(layer1);
            }
            else {
                base.push(layer1);
            }
        }
        if(base.length > 2){
            let newMergeArray = base.slice(0, base.length-2);
            let mergeResult = merge(base[base.length-2], base[base.length-1], isCloneNeeded);
            newMergeArray.push(mergeResult);
            return merge(newMergeArray, undefined, isCloneNeeded);
        }
        else if(base.length == 2){
            layer1 = base[1];
            base = base[0];
            return merge(base, layer1, isCloneNeeded);
        }
    }
    else{
        if(isCloneNeeded === true && isPlainObject(base) && !isEmpty(base)){
            base = merge({}, base, isCloneNeeded);
        }
        if(isUndefined(base)){
            base = {};
        }
        if(isPlainObject(layer1)){
            for (let property in layer1){

                let value = layer1[property];
                if(isFunction(value)){
                    base[property] = value;
                }
                else if (value === "_REMOVE"){
                    delete base[property];
                }                   
                else if(Array.isArray(value)){
                    base[property] = value;
                }
                else if (isDate(value)){
                    base[property] = value;
                }
                else if(isPlainObject(value)){
                    base[property] = merge(base[property], value, isCloneNeeded);
                }
                
                else if(isUndefined(value)){
                    base[property] = base[property];
                }             
                else {
                    base[property] = value;
                }
            }
        }
    }

    return base;
}

function getFunctionName(str) {
    let startWith = str.substring(0, 1);
    let indexOfOpenCurlyBrackets = str.indexOf("{");
    let finishWith = str.substring(str.length - 1);
    let isValid = (startWith === '$') && (finishWith === '}') && (indexOfOpenCurlyBrackets!==-1);
    if(isValid){
        let functionName = str.substring(1, indexOfOpenCurlyBrackets);
        return functionName;
    }
}

export function fulfilment(config, data, handlers) {
    let fullConfig = {};
    for (const key in config) {
        let value = config[key];
        let newValue = value;
        if(isPlainObject(value)){
            newValue = fulfilment(config[key], data, handlers);
        }
        else if(isString(value)) {
            let functionName = getFunctionName(value);
            if(functionName === undefined){
                newValue = value;
            }
            else if(functionName === ''){ // ${x}
                let path = value.substring(2, value.length - 1);
                newValue = get(data, path);
            }
            else{
                if(handlers){
                    let handler = handlers[functionName];
                    if(handler) {
                        newValue = handler(data);
                    }
                    //TODO: else - warning
                }
            }
        }
        fullConfig[key] = newValue;
    }
    return fullConfig;
}

export function deepAddToProps (config, attributeName, value) {
  const currentConfig = config;
  if (!currentConfig.props) {
    currentConfig.props = {};
  }
  currentConfig.props[attributeName] = value;
  if (currentConfig.children) {
    const currentChildren = values(currentConfig.children);
    currentChildren.forEach((child) => {
      deepAddToProps(child, attributeName, value);
    });
  }
};

