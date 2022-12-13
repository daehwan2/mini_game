const onChangeSelect1 = (e) => {
  console.log(e.value);

  const select2_options = [];
  let options_string = ``;
  switch (e.value) {
    case "대표님":
      select2_options.push("박성준");
      break;
    case "경영관리파트":
      select2_options.push("김민경");
      select2_options.push("신용호");
      select2_options.push("정덕남");
      break;
    case "지원파트":
      select2_options.push("최영호");
      select2_options.push("안정민");
      select2_options.push("홍가은");
      select2_options.push("정유경");
      select2_options.push("엄지은");
      break;
    case "말랑하니":
      select2_options.push("김보현");
      select2_options.push("박민우");
      select2_options.push("박민진");
      select2_options.push("허희경");
      break;
    case "패브릭":
      select2_options.push("하미영");
      select2_options.push("오수정");
      select2_options.push("이슬기");

      break;
    case "루미블린":
      select2_options.push("안수향");
      select2_options.push("전주원");
      select2_options.push("김효민");
      select2_options.push("서다은");
      break;
    case "본분":
      select2_options.push("문소정");
      select2_options.push("김완규");
      select2_options.push("이영준");
      select2_options.push("이은지");
      select2_options.push("황용준");
      break;
    case "잼먹":
      select2_options.push("임정우");
      select2_options.push("김서린");
      select2_options.push("김예빈");
      select2_options.push("변인학");
      select2_options.push("엄소현");
      select2_options.push("우동미");
      select2_options.push("이수정");
      break;
    case "앤드코어":
      select2_options.push("김소영");
      select2_options.push("이수진");
      select2_options.push("김현지");
      select2_options.push("강진리");
      select2_options.push("조은별");
      select2_options.push("김은지");
      break;
    case "디자인":
      select2_options.push("류은희");
      select2_options.push("강수민");
      select2_options.push("서채연");
      select2_options.push("최설아");
      select2_options.push("배미소");
      break;
    case "물류":
      select2_options.push("손길현");
      select2_options.push("김동구");
      select2_options.push("김현우");
      select2_options.push("박두현");
      select2_options.push("윤현성");
      break;
    case "IT":
      select2_options.push("최민경");
      select2_options.push("이예진");
      select2_options.push("박지애");
      select2_options.push("김대환");
      break;
  }

  const select2 = document.querySelector("#select2");

  select2_options.forEach((option, idx) => {
    if (idx === 0) {
      playerName = option;
    }
    options_string += `
<option value=${option}>${option}</option>`;
    select2.innerHTML = options_string;
  });

  console.log(playerName);
};

const onChangeSelect2 = (e) => {
  playerName = e.value;

  console.log(playerName);
};
