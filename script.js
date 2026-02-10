const fortuneData = [
  {
    text: "🌟 大吉 🌟 今日は最高の一日！",
    bg: "linear-gradient(135deg, #ffe259, #ffa751)",
    emoji: "🎉✨",
    color: "#fff8dc"
  },
  {
    text: "😊 中吉 😊 いい流れに乗れそう！",
    bg: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
    emoji: "🍀💙",
    color: "#f0f8ff"
  },
  {
    text: "🙂 小吉 🙂 マイペースが吉",
    bg: "linear-gradient(135deg, #d4fc79, #96e6a1)",
    emoji: "📘🌱",
    color: "#f5fff5"
  },
  {
    text: "😌 凶 😌 無理せず慎重に",
    bg: "linear-gradient(135deg, #e0c3fc, #8ec5fc)",
    emoji: "☕💤",
    color: "#f8f5ff"
  }
];

const personalityQuestions = [
  "新しいことに挑戦するのが好き？",
  "人と話すのは得意？",
  "計画を立てて行動するタイプ？",
  "直感を信じることが多い？",
  "一人の時間は好き？"
];

let currentType = "";

// 占い選択
function selectFortune(type) {
  currentType = type;

  document.getElementById("menu").style.display = "none";
  document.getElementById("form").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("runBtn").style.display = "block";

  const form = document.getElementById("form");

  if (type === "blood") {
    form.innerHTML = `
      <p>🩸 血液型を選んでね</p>
      <select id="blood">
        <option>A</option><option>B</option><option>O</option><option>AB</option>
      </select>`;
  }

  if (type === "birthday" || type === "zodiac") {
    form.innerHTML = `
      <p>🎂 誕生日を入力してね</p>
      <input type="date" id="date">`;
  }

  if (type === "personality") {
    let html = "<p>🧠 性格診断に答えてね</p>";
    personalityQuestions.forEach((q, i) => {
      html += `
        <p>${i + 1}. ${q}</p>
        <select class="person-q">
          <option value="2">はい</option>
          <option value="1">どちらでもない</option>
          <option value="0">いいえ</option>
        </select>`;
    });
    form.innerHTML = html;
  }
}

// 占い実行
function runFortune() {
  let f;

  if (currentType === "personality") {
    let score = 0;
    document.querySelectorAll(".person-q").forEach(el => {
      score += Number(el.value);
    });

    if (score >= 8) {
      f = {
        text: "🌈 超ポジティブタイプ！",
        bg: "linear-gradient(135deg, #ffecd2, #fcb69f)",
        emoji: "😆🔥",
        color: "#fff3e0"
      };
    } else if (score >= 4) {
      f = {
        text: "🌱 バランスタイプ",
        bg: "linear-gradient(135deg, #a1ffce, #faffd1)",
        emoji: "🙂🍀",
        color: "#f4fff7"
      };
    } else {
      f = {
        text: "☕ マイペースタイプ",
        bg: "linear-gradient(135deg, #d3cce3, #e9e4f0)",
        emoji: "😌📘",
        color: "#f7f5ff"
      };
    }
  } else {
    const today = new Date();
    const seed = today.getDate();
    f = fortuneData[seed % fortuneData.length];
  }

  document.getElementById("screen").style.background = f.bg;
  document.getElementById("form").innerHTML = "";
  document.getElementById("runBtn").style.display = "none";

  document.getElementById("result").innerHTML = `
    <div class="result-box" style="background:${f.color}">
      <p>${f.emoji}</p>
      <p>${f.text}</p>
      <button onclick="goBack()">🔁 他の占いに戻る</button>
    </div>`;
}

// 戻る
function goBack() {
  document.getElementById("screen").style.background =
    "linear-gradient(135deg, #fff, #fff8dc)";
  document.getElementById("menu").style.display = "block";
  document.getElementById("form").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("runBtn").style.display = "none";
}
