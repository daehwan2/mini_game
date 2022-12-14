const rankListElem = document.querySelector(".rank_list");
let openResult = false;

const firstSecondThirdLanding = (rank) => {
  switch (rank) {
    case 1:
      return `<div><img src='assets/ranking/first.png' class="rank-img"/></div>`;
    case 2:
      return `<div><img src='assets/ranking/second.png' class="rank-img"/></div>`;
    case 3:
      return `<div><img src='assets/ranking/third.png' class="rank-img"/></div>`;
    default:
      return `<div>${rank}</div>`;
  }
};

const getRank = () =>
  axios.get("http://192.168.0.97:10010/rank?game=말랑RUN").then((res) => {
    const rankList = res.data;
    let htmlString = ``;
    rankList.forEach((rankItem) => {
      htmlString += `<div class="rank_item">
              ${firstSecondThirdLanding(rankItem.rank)}
              <div>${
                rankItem.rank >= 1 && rankItem.rank <= 3 && !openResult
                  ? `???`
                  : rankItem.name
              }</div>
              <div>${
                rankItem.rank >= 1 && rankItem.rank <= 3 && !openResult
                  ? `???`
                  : rankItem.score
              }</div>
            </div>`;
    });

    rankListElem.innerHTML =
      `<div class="rank_item_title">
              <div>순위</div>
              <div>이름</div>
              <div>점수</div>
            </div>` + htmlString;
  });
