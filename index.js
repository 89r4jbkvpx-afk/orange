// 占い結果データ（背景色・ラッキーアイテム・イラスト）
const fortunes = [
  {text:"大吉: 今日は最高の日！✨", color:"赤", item:"ラッキーペン🖊️", bg:"#ffe5e5"},
  {text:"中吉: いいことがありそう😊", color:"青", item:"ラッキーリング💍", bg:"#e5f0ff"},
  {text:"小吉: 気をつけて過ごそう⚠️", color:"緑", item:"ラッキー本📖", bg:"#e5ffe5"},
  {text:"凶: 注意が必要な日😅", color:"紫", item:"ラッキーストラップ🎀", bg:"#f0e5ff"}
];

// 性格診断10問
const personalityQuestions = [
  {q:"外向的ですか？", options:["はい","どちらでもない","いいえ"]},
  {q:"計画的ですか？", options:["はい","どちらでもない","いいえ"]},
  {q:"感情的になりやすいですか？", options:["はい","どちらでもない","いいえ"]},
  {q:"好奇心が強いですか？", options:["はい","どちらでもない","いいえ"]},
  {q:"集中力はありますか？", options:["はい","どちらでもない","いいえ"]},
  {q:"ポジティブですか？", options:["はい","どちらでもない","いいえ"]},
  {q:"優柔不断ですか？", options:["はい","どちらでもない","いいえ"]},
  {q:"責任感がありますか？", options:["はい","どちらでもない","いいえ"]},
  {q:"ストレスに強いですか？", options:["はい","どちらでもない","いいえ"]},
  {q:"リーダータイプですか？", options:["はい","どちらでもない","いいえ"]}
];

// 入力フォーム表示
function goToForm(type) {
  const formArea = document.getElementById('formArea');
  formArea.innerHTML = '';
  document.getElementById('result').innerText = '';
  document.getElementById('menu').style.display = 'none';
  document.getElementById('fortuneBtn').style.display = 'inline-block';

  if(type==='blood'){
    formArea.innerHTML = `<p>血液型を選んでね</p>
      <select id="bloodType">
        <option value="A">A型</option>
        <option value="B">B型</option>
        <option value="O">O型</option>
        <option value="AB">AB型</option>
      </select>`;
  } else if(type==='birthday'){
    formArea.innerHTML = `<p>誕生日を入力してね</p>
      <input type="date" id="birthday">`;
  } else if(type==='personality'){
    let html = "<p>性格診断に答えてね</p>";
    personalityQuestions.forEach((q,i)=>{
      html+=`<p>${q.q}</p>
        <select id="q${i}">
          <option value="2">はい</option>
          <option value="1">どちらでもない</option>
          <option value="0">いいえ</option>
        </select>`;
    });
    formArea.innerHTML=html;
  } else if(type==='zodiac'){
    formArea.innerHTML = `<p>生年月日を入力してね（星座判定用）</p>
      <input type="date" id="zodiacBirthday">`;
  }

  formArea.style.display='block';
}

// 今日の日付＋追加シード
function getDailyIndex(extraSeed=0){
  const today=new Date();
  const dateStr=`${today.getFullYear()}${today.getMonth()+1}${today.getDate()}`;
  let seed=0;
  for(let i=0;i<dateStr.length;i++){ seed+=parseInt(dateStr[i]); }
  return (seed+extraSeed)%fortunes.length;
}

// 星座判定
function getZodiac(dateStr){
  const date = new Date(dateStr);
  const m=date.getMonth()+1, d=date.getDate();
  if((m==1&&d>=20)||(m==2&&d<=18)) return "水瓶座";
  if((m==2&&d>=19)||(m==3&&d<=20)) return "魚座";
  if((m==3&&d>=21)||(m==4&&d<=19)) return "牡羊座";
  if((m==4&&d>=20)||(m==5&&d<=20)) return "牡牛座";
  if((m==5&&d>=21)||(m==6&&d<=21)) return "双子座";
  if((m==6&&d>=22)||(m==7&&d<=22)) return "蟹座";
  if((m==7&&d>=23)||(m==8&&d<=22)) return "獅子座";
  if((m==8&&d>=23)||(m==9&&d<=22)) return "乙女座";
  if((m==9&&d>=23)||(m==10&&d<=23)) return "天秤座";
  if((m==10&&d>=24)||(m==11&&d<=22)) return "蠍座";
  if((m==11&&d>=23)||(m==12&&d<=21)) return "射手座";
  if((m==12&&d>=22)||(m==1&&d<=19)) return "山羊座";
}

// 占い表示
function showFortune(){
  const resultDiv=document.getElementById('result');
  let extraSeed=0, description='', imgUrl='';

  const bloodInput=document.getElementById('bloodType');
  const birthdayInput=document.getElementById('birthday');
  const zodiacInput=document.getElementById('zodiacBirthday');

  if(bloodInput){
    const t=bloodInput.value||'A';
    extraSeed=t.charCodeAt(0);
    description=`血液型: ${t}`;
  } else if(birthdayInput){
    const bd=birthdayInput.value||'2000-01-01';
    extraSeed=bd.replace(/-/g,'').split('').reduce((a,c)=>a+parseInt(c),0);
    description=`誕生日: ${bd}`;
  } else if(zodiacInput){
    const zb=zodiacInput.value||'2000-01-01';
    const zodiac=getZodiac(zb);
    extraSeed=zb.replace(/-/g,'').split('').reduce((a,c)=>a+parseInt(c),0);
    description=`星座: ${zodiac}`;
  } else {
    // 性格診断10問
    let score=0;
    personalityQuestions.forEach((q,i)=>{
      const val=parseInt(document.getElementById(`q${i}`).value);
      score+=val;
    });
    extraSeed=score;
    if(score<=6) description="性格: 落ち着いたタイプ";
    else if(score<=13) description="性格: バランス型";
    else if(score<=16) description="性格: 活発なタイプ";
    else description="性格: 慎重なタイプ";
  }

  const idx=getDailyIndex(extraSeed);
  const result=fortunes[idx];
  imgUrl=result.img;

  document.body.style.background=result.bg; // 背景色変化

  resultDiv.innerHTML=`
    <div class="result-box">
      <p>${description}</p>
      <img src="${imgUrl}" class="result-img">
      <p>今日の運勢: ${result.text}</p>
      <p>ラッキーカラー: ${result.color} 🎨</p>
      <p>ラッキーアイテム: ${result.item}</p>
      <button onclick="goBack()">他の占いに戻る</button>
    </div>
  `;

  document.getElementById('formArea').style.display='none';
  document.getElementById('fortuneBtn').style.display='none';
}

// 戻る
function goBack(){
  document.getElementById('menu').style.display='block';
  document.getElementById('result').innerHTML='';
  document.body.style.background='#fffaf0'; // 戻す
}
