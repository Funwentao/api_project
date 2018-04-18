export default function (string) {
    const queryString = string.split("?")[1];
    const exg = /\w*=\w*/g;
    const array = queryString.match(exg);
    const obj = {};
    array.forEach((e)=>{
        const temp = e.split("=");
        obj[temp[0]] = temp[1];
    });
    return obj;
}