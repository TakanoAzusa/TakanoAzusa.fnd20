
const tasklist = ["業務1", "業務2", "業務3", "打ち合わせ", "創意工夫", "QC"]
const colorlist = ["rgba(244, 143, 177, 0.6)", "rgba(255, 235, 59, 0.6)" , "rgba(100, 181, 246, 0.6)" , "rgba(226, 239, 231, 0.6)", "rgba(241, 56, 214, 0.6)", "rgba(255, 106, 0, 0.6)"]
let Y_list = []
let X_dataset = []
let totaltime = 0
let labels = [""]
let data = [0]
let backgroundColor = "red"
let resetpush = false
//=========================================================================================
//                                  ↓　メイン動作 ↓
//=========================================================================================
//---登録ボタンを押したら------
let button = document.getElementById("button1"); //ボタン１動作取得
let button_reset = document.getElementById("button2"); //ボタン２動作取得
button.addEventListener("click", savelog); //ボタン１を押したら動作関数=>タスク登録
button_reset.addEventListener("click", reset); //ボタン２を押したら動作する関数=>リセット動作
//=========================================================================================
//                                  ↓　作成関数 ↓
//　＊アラーム表示-alertset(引数無し)
//　＊ボタン１を押したときの動作関数-savelog(引数無し)
//　＊ボタン２を押したときの動作関数-reset(引数無し)
//=========================================================================================
//---ボタン１（登録）を押したときの動作関数-------------------------
function savelog() {
    //--Webページ情報を取得--
    let title = document.getElementById("select-task")
    let detail = document.getElementById("detail")
    let spin1 = document.getElementById("spin1")
    let spin2 = document.getElementById("spin2")
    //--Webページ情報不足分アラート表示--
    alertset()
    //--押したボタン順番を取得--
    let dataset_YX = clickbutton(title, detail, spin1, spin2)
    //--Webページ情報をObject化--
    Graphmake(dataset_YX)
}
//---ボタン２（リセット）を押したときの動作関数-------------------------
function reset(){
    resetpush = true //リセットを押したかどうか判定
    //Webページ情報を取得
    let detail = document.getElementById("detail")
    let spin1 = document.getElementById("spin1")
    let spin2 = document.getElementById("spin2")
    detail.value = ""
    spin1.value = "00"
    spin2.value = "00"
    if (totaltime===0){
        alert("進捗が登録されていません")
    }else{
        Y_list = []
        X_dataset = []
        labels = [""]
        data = [0]
        backgroundColor = "red"
        Y_list.push("None")
        X_dataset.push({ labels, data, backgroundColor})
        Graphmake([Y_list, X_dataset])
    }
    
}

//=====================================================================================
//=====================================================================================
//ボタンクリックした順番取得ー＞各軸のデータセット作成
function clickbutton(title, detail, spin1, spin2){
    if (resetpush===true){//リセットボタンを押したときに残ったデータを削除ー＞新規で登録
        Y_list = []
        X_dataset = []
        resetpush = false
    }
    //Y軸データ取得(日付)
    let nowtime = new Date() //ボタンを押した時間を取得↓文字列に変換
    // let nowtimestr = `${nowtime.getFullYear()}${nowtime.getMonth()+1}${nowtime.getDate()}_${nowtime.getHours()}:${nowtime.getMinutes()}`
    Y_list.push(`${nowtime.getFullYear()}年${nowtime.getMonth()+1}月${nowtime.getDate()}日`)
    Y_list = Array.from(new Set(Y_list)) 
    //X軸データ取得(項目、時間)
    //項目
    let titlenum = title.selectedIndex;//プルダウンから業務名取得
    // let labels = [title.options[titlenum].innerText];// 選択した業務名を取得する処理
    labels = [title.options[titlenum].innerText];// 選択した業務名を取得する処理
    //時間
    let min = Math.round(Number(spin2.value)/60) //分->時間変換
    // let data = [Number(spin1.value)+min]
    data = [Number(spin1.value)+min]
    totaltime = (Number(spin1.value)+min)+totaltime //全体合計時間
    //色
    for (let i=0;i<tasklist.length;i++){
        if (tasklist[i]===labels[0]){
            backgroundColor = [colorlist[i]]
        }
    }
    // //お昼情報を入れる
    // console.log("合計時間", totaltime)
    // if (totaltime >= 4 && totaltime <= 5){
    //     console.log("お昼です")
    //     labels = ["お昼"]
    //     data = [1]
    //     backgroundColor = "red"
    //     X_dataset.unshift({ labels, data, backgroundColor})//X軸完成
    // }else{
    //     X_dataset.unshift({ labels, data, backgroundColor})//X軸完成
    // }
    X_dataset.unshift({ labels, data, backgroundColor})//X軸完成
    return [Y_list, X_dataset]
}

//グラフ作成
function Graphmake(dataset_YX){
    console.log(dataset_YX)
    new Chart(document.getElementById('myChart'),
         {
            type: 'horizontalBar', //グラフタイプ(水平)
            data: {
                labels: dataset_YX[0], //日付リスト
                datasets: dataset_YX[1]},//業務データリスト
            options: {
                title: {display: true, text: '進捗状況',},
                scales:{
                    xAxes: [{
                        stacked: true,
                        ticks: {min: 0, max: 10,fontSize: 18,stepSize: 1
                                , callback: function(value, index, ticks) {return `${value}H`;}}
                            }],
                    yAxes: [{
                        stacked: true,
                        ticks: {fontSize: 15,}
                            }]},
            layout: {padding: 20},
            legend: {display: false},
                    }})}























































//--アラーム表示--------------------------------------------------
function alertset(){
    if (detail.value===""){
        alert("詳細を入力して下さい")
    }else{
        if (detail.value===""){alert("詳細を入力してください")}
        if (`${spin1.value}:${spin2.value}`==="00:00"){alert("時間を入力してください")}
    }
}

