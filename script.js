var totaldata = {}
var count = 0
var tasklist = ["業務1", "業務2", "業務3", "打ち合わせ", "創意工夫", "QC"]
var counttime = 8 //業務開始時刻

function alertset(){
    if (detail.value===""){
        alert("詳細を入力して下さい")
    }else{
        if (detail.value===""){alert("詳細を入力してください")}
        if (`${spin1.value}:${spin2.value}`==="00:00"){alert("時間を入力してください")}
    }
}


function objsat(title, detail, spin1, spin2){
    let nowtime = new Date() //ボタンを押した時間を取得↓文字列に変換
    let nowtimestr = `${nowtime.getFullYear()}${nowtime.getMonth()+1}${nowtime.getDate()}_${nowtime.getHours()}:${nowtime.getMinutes()}`
    // if (totaldata.length!==undefined){//前回押したボタンと同じ時間に押したら登録出来ないようにしてます
    //     if (totaldata[totaldata.length-1]["nowtime"]===nowtimestr){
    //         console.log("登録出来ません：前回と登録時間が同じです")}
    // }else{//オブジェクト登録
    const titlenum = title.selectedIndex;//プルダウンから値取得
    const selectname = title.options[titlenum].innerText;// 選択した要素のテキストを取得する処理
    Array.prototype.push.call(totaldata, {"nowtime":nowtimestr,"title":String(selectname),"detail":String(detail.value),
                                            "hour":String(spin1.value), "min":String(spin2.value)})
    //グラフ化
    if (totaldata.length!==0){
        plotshow()
    }
    }

function reset(){
    //Webページ情報を取得
    let detail = document.getElementById("detail")
    let spin1 = document.getElementById("spin1")
    let spin2 = document.getElementById("spin2")
    detail.value = ""
    spin1.value = "00"
    spin2.value = "00"
}

function plotshow(){
    console.log('グラフ化', totaldata.length)
    // Y軸設定
    let daylist = [] //日付リスト
    let numlist = [] //経過時間リスト
    for (let i=0;i<=totaldata.length-1;i++){//totaldataから時間分を取得
        daylist.push(totaldata[i]["nowtime"].split("_")[0])
        numlist.push(totaldata[i]["title"]+ "_" +String((Number(totaldata[i]["hour"])+(Number(totaldata[i]["min"])/60)).toFixed(1)))//作業時間を算出
    }
    if (daylist.length>1){//同じ日付を除外（１つにまとめる）
        daylist = Array.from(new Set(daylist))
    }
    // X軸調整 アウトプット"業務１"=[1H, 3H, 4H]
    var totaltasklist = []
    var task1s = []
    var task2s = []
    var task3s = []
    var task4s = []
    var task5s = []
    var task6s = []
    var task7s = []
    for (const taskdata of numlist){
        let taskname = taskdata.split('_')[0]
        let tasktime = Number(taskdata.split("_")[1])
        counttime = tasktime
        console.log(taskname, tasklist)
        if (taskname===tasklist[0]){
            task1s.unshift(tasktime)
        }else if (taskname===tasklist[1]){
            task2s.unshift(tasktime)
        }else if (taskname===tasklist[2]){
            task3s.unshift(tasktime)
        }else if (taskname===tasklist[3]){
            task4s.unshift(tasktime)
        }else if (taskname===tasklist[4]){
            task5s.unshift(tasktime)
        }else if (taskname===tasklist[5]){
            task6s.unshift(tasktime)
        }
    }
    function listsum(arraydatas){
        let newarray = arraydatas.reduce(function(sum, element){
        return sum + element;
        }, 0);
        return [newarray]
    }
    totaltasklist.push(listsum(task1s))
    totaltasklist.push(listsum(task2s))
    totaltasklist.push(listsum(task3s))
    totaltasklist.push(listsum(task4s))
    totaltasklist.push(listsum(task5s))
    totaltasklist.push(listsum(task6s))
    // console.log(totaltasklist)
    console.log(`
        ${tasklist[0]}:${totaltasklist[0]}, 
        ${tasklist[1]}:${totaltasklist[1]}, 
        ${tasklist[2]}:${totaltasklist[2]}, 
        ${tasklist[3]}:${totaltasklist[3]}, 
        ${tasklist[4]}:${totaltasklist[4]},
        ${tasklist[5]}:${totaltasklist[5]}`)

    //グラフを作成
    new Chart(document.getElementById('myChart'), {
    type: 'horizontalBar', //グラフタイプ(水平)
    data: {
    labels: daylist, //日付リスト
    datasets: [
        { label: tasklist[0], data: totaltasklist[0], backgroundColor: "rgba(244, 143, 177, 0.6)" },
        { label: tasklist[1], data: totaltasklist[1], backgroundColor: "rgba(255, 235, 59, 0.6)" },
        { label: tasklist[2], data: totaltasklist[2], backgroundColor: "rgba(100, 181, 246, 0.6)" },
        { label: tasklist[3], data: totaltasklist[3], backgroundColor: "rgba(226, 239, 231, 0.6)" },
        { label: tasklist[4], data: totaltasklist[4], backgroundColor: "rgba(241, 56, 214, 0.6)" },     
        { label: tasklist[5], data: totaltasklist[5], backgroundColor: "rgba(255, 106, 0, 0.6)" }   
    ]},
    options: {
    // plugins: {stacked100: { enable: true }},
    title: {display: true,text: '進捗状況',},
    // scales:{xAxes: [{stacked: true}],
    //         yAxes: [{stacked: true,display: true,scaleLabel: {display: true,fontSize: 18},ticks: {min: 0, max: 10,fontSize: 18,stepSize: 20}}]},legend: { display: true}
    scales:{xAxes: [{stacked: true,ticks: {min: 0, max: 10,fontSize: 18,stepSize: 1,
                    callback: function(value, index, ticks) {
                        return `${value+8}:00`;
                    }}}],
            yAxes: [{stacked: true,ticks: {fontSize: 15,}}]},
    layout: {
        padding: 20
    }
}})}


function savelog() {
    //Webページ情報を取得
    // let title = document.getElementById("title")
    let title = document.getElementById("select-task")
    let detail = document.getElementById("detail")
    let spin1 = document.getElementById("spin1")
    let spin2 = document.getElementById("spin2")
    //Webページ情報不足分アラート表示
    alertset()
    //Webページ情報をObject化
    objsat(title, detail, spin1, spin2)

    console.log(totaldata)
}

//登録ボタンを押したら
let button = document.getElementById("button1");
button.addEventListener("click", savelog);
let button_reset = document.getElementById("button2");
button_reset.addEventListener("click", reset);
