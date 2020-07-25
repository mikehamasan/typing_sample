/* ここから */
  // shufffle関数を使って引数にwords設定してシャッフル
  let words;
  let word;
  let i;
  let loc;
  let score;
  let miss;
  let isPlaying = false;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');

  //初期化メソッド
  function init() {
    i = 0;
    score = 0;
    miss = 0;
    loc = 0;
    words = shuffle([
      'apple',
      'sky',
      'blue',
      'middle',
      'set',
    ]);
    missLabel.textContent = '0';
    scoreLabel.textContent = '0';
    word = words[i];
    target.textContent = word;
  }

  // フィッシャー・イェーツのシャッフル関数を追加
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function updateTarget() {
    let placeholder = '';
    for (let i = 0; i < loc; i++) {
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
  }

  //init関数の呼び出し
  window.addEventListener('click', ()=> {
    if(isPlaying)return;
    isPlaying = true;
    init();
  });

  window.addEventListener('keydown', e => {
    if(!isPlaying)return;
    if (e.key === word[loc]) {
      loc++;
      if (loc === word.length) {
        //wordの数とloc数が一致したらインデックス番号の加算（次の単語を取得するため）
        i++;
        //最後まで単語が一致したらアラート表示とインデックス番号を初期化
        if (i === words.length) {
          target.textContent = 'Cleared the game';
          setTimeout(()=>{
            alert('click to replay?');
          },100);
          //2回目追加部分
          // init();
          // updateTarget();
          isPlaying = false;
          return;
        }
        // wordsのi番目をwordに設定
        word = words[i];
        loc = 0;
      }
      updateTarget();
      score++;
      scoreLabel.textContent = score;
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });

