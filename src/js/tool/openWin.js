export default function (url) {
    const body = document.getElementsByTagName('body')[0];
    const a = document.createElement('a');
    a.innerText = "跳转";
    a.href = url;
    a.target="_blank";
    a.id = "openWin";
    body.appendChild(a);
    document.getElementById("openWin").click();
    body.removeChild(a);
}