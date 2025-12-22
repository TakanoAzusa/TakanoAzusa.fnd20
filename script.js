var totaldata = {}
var count = 0
var tasklist = ["業務", "業務1", "業務2", "打ち合わせ", "創意工夫", "QC"]

function alertset(){
    if (title.value===""&&detail.value===""){
        alert("タイトル・詳細を入力して下さい")
    }else{
        if (title.value===""){alert("タイトルを入力してください")}
        if (detail.value===""){alert("詳細を入力してください")}}
        if (`${spin1.value}:${spin2.value}`==="00:00"){alert("時間を入力してください")}
}


function objsat(title, detail, spin1, spin2){
    let nowtime = new Date() //ボタンを押した時間を取得↓文字列に変換
    let nowtimestr = `${nowtime.getFullYear()}${nowtime.getMonth()+1}${nowtime.getDate()}_${nowtime.getHours()}:${nowtime.getMinutes()}`
    // if (totaldata.length!==undefined){//前回押したボタンと同じ時間に押したら登録出来ないようにしてます
    //     if (totaldata[totaldata.length-1]["nowtime"]===nowtimestr){
    //         console.log("登録出来ません：前回と登録時間が同じです")}
    // }else{//オブジェクト登録
    Array.prototype.push.call(totaldata, {"nowtime":nowtimestr,"title":String(title.value),"detail":String(detail.value),
                                            "hour":String(spin1.value), "min":String(spin2.value)})
    //グラフ化
    if (totaldata.length!==0){
        plotshow()
    }
    }

function reset(){
    //Webページ情報を取得
    let title = document.getElementById("title")
    let detail = document.getElementById("detail")
    let spin1 = document.getElementById("spin1")
    let spin2 = document.getElementById("spin2")
    title.value = ""
    detail.value = ""
    spin1.value = "00"
    spin2.value = "00"
}

function plotshow(){
    console.log('グラフ化', totaldata.length)
    let daylist = [] //日付リスト
    let numlist = [] //経過時間リスト
    for (let i=0;i<=totaldata.length-1;i++){
        daylist.push(totaldata[i]["nowtime"].split("_")[0])
        numlist.push((Number(totaldata[i]["hour"])+(Number(totaldata[i]["min"])/60)).toFixed(1))
    }
    if (daylist.length>1){
        daylist = Array.from(new Set(daylist))
    }
    new Chart(document.getElementById('myChart'), {
    type: 'horizontalBar',
    data: {
    labels: daylist,
    datasets: [
        { label: tasklist[0], data: [10], backgroundColor: "rgba(244, 143, 177, 0.6)" },
        { label: tasklist[1], data: [20], backgroundColor: "rgba(255, 235, 59, 0.6)" },
        { label: tasklist[2], data: [30], backgroundColor: "rgba(100, 181, 246, 0.6)" },
        { label: tasklist[3], data: [40], backgroundColor: "rgba(100, 93, 50, 0.6)" },
        { label: tasklist[4], data: [60], backgroundColor: "rgba(100, 23, 88, 0.6)" }     
    ]
    },
    options: {
    plugins: {
        stacked100: { enable: true }
    },
    title: {                           //タイトル設定
                display: true,                 //表示設定
                text: '順位上昇達成率'                //ラベル
            },
    scales: {                          //軸設定
        xAxes: [{
                stacked: true
            }],
        yAxes: [{                      //y軸設定
                    stacked: true,
                    display: true,             //表示設定
                    scaleLabel: {              //軸ラベル設定
                        display: true,          //表示設定
                        fontSize: 18               //フォントサイズ
                    },
                    ticks: {                      //最大値最小値設定
                        min: 0,                   //最小値
                        max: 100,                  //最大値
                        fontSize: 18,             //フォントサイズ
                        stepSize: 20              //軸間隔
                    },
                }],
                },
    legend: {
        display: true,
    }
    }
    });
}


function savelog() {
    //Webページ情報を取得
    let title = document.getElementById("title")
    let detail = document.getElementById("detail")
    let spin1 = document.getElementById("spin1")
    let spin2 = document.getElementById("spin2")
    //Webページ情報不足分アラート表示
    alertset()
    //Webページ情報をObject化
    objsat(title, detail, spin1, spin2)

    // console.log(totaldata)
}

//登録ボタンを押したら
let button = document.getElementById("button1");
button.addEventListener("click", savelog);
let button_reset = document.getElementById("button2");
button_reset.addEventListener("click", reset);
//
const btn = document.getElementById('btn');
const setSport = document.getElementById("setSport");
const selectSport = document.getElementById("selectSport");
// メニューから値を選択して、ボタンを押した後の処理
btn.addEventListener('click', () => {
    const num = selectSport.selectedIndex;
    // 選択した要素のテキストを取得する処理
    const getSportName = selectSport.options[num].innerText;
    // 取得した要素をHTMLに埋め込む
    // setSport.innerText = getSportName;
    console.log(getSportName)
});
