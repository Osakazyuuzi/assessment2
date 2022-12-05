// 厳格モード　宣言後の記述ミスをエラーとして表示してくれる機能を呼び出すための記述です。
'use strict'
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    // 名前が空の時は処理を終了する
    if (userName.length === 0) return;

    // 診断結果表示エリアの作成
    resultDivided.innerText = '';
    
    // headerDivided の作成
    const headerDivided = document.createElement('div');
    headerDivided.setAttribute('class', 'card-header');
    headerDivided.innerText = '診断結果';
    
    // bodyDivided の作成
    const bodyDivided = document.createElement('div');
    bodyDivided.setAttribute('class', 'card-body');
    
    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text');
    const result = assessment(userName);
    paragraph.innerText = result;
    bodyDivided.appendChild(paragraph);
    
    // resultDevided に Bootstrap のスタイルを適用する
    resultDivided.setAttribute('class', 'card');
    resultDivided.setAttribute('style', 'max-width: 700px;');
    
    // headerDivided と BbodyDivided を resultDivided に差し込む
    resultDivided.appendChild(headerDivided);
    resultDivided.appendChild(bodyDivided);

    // ツイートエリアの作成
    tweetDivided.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue = 
        'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('あなたのいいところ') + 
        '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声はみんなを惹きつけ、心に残ります。',
    '{userName}のいいところは眼差しです。{userName}に見つめられた人は、気になって仕方がないです。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさが物事をいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその直腸がみんなを楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。溢れ出る{userName}の良さにみんなが気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことにみんなが共感し、分かりあうことが出来ます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えにみんなが感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の子事が前が多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはそのすべてです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}がみんなから評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 * JSDocの記述方法はDevDocsというサイトで使い方が解説されている
 */
function assessment(userName) {
    // 全文字の文字コードを取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++)
    {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を解答の数で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replaceAll('{userName}', userName);
    return result;
}
