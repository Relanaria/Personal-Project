export function trimInputs(inputData) {
    
    const dataToTrim = inputData
    
    for (const key in dataToTrim) {
        dataToTrim[key] = dataToTrim[key].trim();
    }
    return dataToTrim;
}