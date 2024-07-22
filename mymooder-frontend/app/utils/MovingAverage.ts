// export default setMovingAverage(data: any, windowSize: number) {
//     let newData = [];
    
//     for (let i = windowSize - 1; i < data.length; i++) {
//         let averages: any = {};

//         for (const stat of ["Alone", "Tiff"]) {
//             const curWindowData = data.slice(i - windowSize + 1, i + 1);

//             const average = curWindowData.reduce((acc: any, cur: { [x: string]: any; }) => cur[stat] + acc, 0) / windowSize;

//             const keyName = "ave_" + stat;
//             averages[keyName] = Math.round(average);
//         }

//         newData.push({
//             ...data[i],
//         })
//     }
// }