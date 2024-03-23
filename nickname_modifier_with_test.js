const getWholeKoList = (nickname) => {
  const full_ko_list = [];

  for (let i = 0; i < nickname.length; i++) {
    const char = nickname[i];
    const char_code = char.charCodeAt(0);
    if (char_code >= 0xac00 && char_code <= 0xd7a3) {
      const new_ = { idx: i, text: char };
      full_ko_list.push(new_);
    }
  }
  return full_ko_list;
};

const changeJosa = (text, josa, last_char) => {
  const last_code = last_char.charCodeAt(0);
  const isFinalConsonant = (last_code - 0xac00) % 28 > 0;
  if (isFinalConsonant === true) {
    switch (josa) {
      case "는":
        console.log("닉네임에 받침 있어 조사 '는' => '은' 변경");
        return text.replace(josa, "은");
      case "가":
        console.log("닉네임에 받침 있어 조사 '가' => '이' 변경");
        return text.replace(josa, "이");
      case "를":
        console.log("닉네임에 받침 있어 조사 '를' => '을' 변경");
        return text.replace(josa, "을");
      case "와":
        console.log("닉네임에 받침 있어 조사 '와' => '과' 변경");
        return text.replace(josa, "과");
      case "야":
        console.log("닉네임에 받침 있어 조사 '야' => '아' 변경");
        return text.replace(josa, "아");
      case "여":
        console.log("닉네임에 받침 있어 조사 '여' => '이여' 변경");
        return text.replace(josa, "이여");
      case "랑":
        console.log("닉네임에 받침 있어 조사 '랑' => '이랑' 변경");
        return text.replace(josa, "이랑");
      case "로":
        console.log("닉네임에 받침 있어 조사 '로' => '으로' 변경");
        return text.replace(josa, "으로");
      case "로서":
        console.log("닉네임에 받침 있어 조사 '로서' => '으로서' 변경");
        return text.replace(josa, "으로서");
      case "로써":
        console.log("닉네임에 받침 있어 조사 '로써' => '으로써' 변경");
        return text.replace(josa, "으로써");
      case "로부터":
        console.log("닉네임에 받침 있어 조사 '로부터' => '으로부터' 변경");
        return text.replace(josa, "으로부터");
      default:
        console.log(
          "닉네임에 받침 있으나 텍스트에 바뀌는 조사 없음.",
          "조사:",
          josa
        );
        return text;
    }
  } else {
    switch (josa) {
      case "은":
        console.log("닉네임에 받침 없어 조사 '은' => '는' 변경");
        return text.replace(josa, "는");
      case "이":
        console.log("닉네임에 받침 없어 조사 '이' => '가' 변경");
        return text.replace(josa, "가");
      case "을":
        console.log("닉네임에 받침 없어 조사 '을' => '를' 변경");
        return text.replace(josa, "를");
      case "과":
        console.log("닉네임에 받침 없어 조사 '과' => '와' 변경");
        return text.replace(josa, "와");
      case "아":
        console.log("닉네임에 받침 없어 조사 '아' => '야' 변경");
        return text.replace(josa, "야");
      case "이여":
        console.log("닉네임에 받침 없어 조사 '이여' => '여' 변경");
        return text.replace(josa, "여");
      case "이랑":
        console.log("닉네임에 받침 없어 조사 '이랑' => '랑' 변경");
        return text.replace(josa, "랑");
      case "으로":
        console.log("닉네임에 받침 없어 조사 '으로' => '로' 변경");
        return text.replace(josa, "로");
      case "으로서":
        console.log("닉네임에 받침 없어 조사 '으로서' => '로서' 변경");
        return text.replace(josa, "로서");
      case "으로써":
        console.log("닉네임에 받침 없어 조사 '으로써' => '로써' 변경");
        return text.replace(josa, "로써");
      case "으로부터":
        console.log("닉네임에 받침 없어 조사 '으로부터' => '로부터' 변경");
        return text.replace(josa, "로부터");
      default:
        console.log(
          `닉네임에 받침 없으나 텍스트에 변경되는 조사 없음.`,
          "조사:",
          josa
        );
        return text;
    }
  }
};

const nicknameModifier = (nickname, text) => {
  const target_text = "{user name}";
  if (text.indexOf(target_text) !== -1) {
    const full_ko_list = getWholeKoList(nickname);

    if (full_ko_list.length > 0) {
      const last_char_object = full_ko_list.pop();
      const last_char = last_char_object["text"];

      const target_list = [0];
      const splitted_text_list = [];

      const regex = /(\{user name\})([ㄱ-힣]+)?/g;
      const matches = text.matchAll(regex);
      const matches_list = [];

      for (const match of matches) {
        target_list.push(match.index);
        target_list.push(match.index + match[0].length);
        matches_list.push(match);
      }
      target_list.push(text.length);

      let i = 0;
      while (i < target_list.length - 1) {
        const l_idx = target_list[i];
        const r_idx = target_list[i + 1];
        splitted_text_list.push(text.substring(l_idx, r_idx));
        i++;
      }
      console.log(splitted_text_list);
      for (let k = 0; k < splitted_text_list.length; k++) {
        const text_to_change = splitted_text_list[k];
        if (text_to_change === matches_list[0][0]) {
          if (matches_list[0][2] !== undefined) {
            const changed_text = changeJosa(
              text_to_change,
              matches_list[0][2],
              last_char
            );
            console.log(
              `${k + 1}번째 원소 nickname 변경: {user name} => ${nickname}`
            );
            splitted_text_list.splice(
              k,
              1,
              changed_text.replace(target_text, nickname)
            );
            matches_list.shift();
          } else {
            console.log(
              `${k + 1}번째 원소 nickname 변경: {user name} => ${nickname}`
            );
            splitted_text_list.splice(k, 1, nickname);
            matches_list.shift();
          }

          if (matches_list.length === 0) {
            break;
          }
        }
      }
      return splitted_text_list.join("");
    } else {
      //온전한 한글 없음
      console.log("닉네임에 완전한 한글 문자 없음. 호칭만 변경해 발송");
      let new_text = text;
      while (new_text.indexOf(target_text) !== -1) {
        new_text = new_text.replace(target_text, nickname);
      }
      return new_text;
    }
  } else {
    console.log("텍스트에 {user name} 없음. 그대로 발송");
    return text;
  }
};

// // export default nicknameModifier;

// test

//사쿠마레이
const text1 = [
  "좋아하는 일을 하면 햇빛 아래에서도 활기를 찾는 법인데, 장비들은 별 탈 없이 안전하니 안심하게. {user name}, 너도 아침부터 일어나 있다니 기쁘구려.",
  "하하, 그렇구만.. 밤의 정원은 본인에게 우아한 안식처, 너도 같이 즐기면 좋겠구려~♪",
  "오호, 그것도 꽤 매력적이구먼. {user name}, 오늘도 스트레스를 잘 떨치고 평온을 찾길 바라네~♪",
  "그렇군······ 밤에 괜찮은 꿈을 꾸기 위해서는 마음을 비울 필요가 있지. {user name}은 천천히 하루를 정리하며 좋은 잠 잘 수 있기를.",
  "{user name}도 그런 파격적인 아이디어에 호의적이구나. 달력 사진에 대해서는 다소 놀란 모습이었지만, 결국 호응이 있었단다.",
  "그래, {user name}에게도 달콤한 선율이 함께 하길 바라며. 좋은 밤이 되길~······♪",
  "더할 나위 없이 탁월한 선택이로군. 본인은 재즈를 들으며 하루의 번민을 털어내고 있단다. {user_name}, 너도 음악으로 편안한 밤을 보내길.",
  "꿈에서라도 잊혀지지 않는 영감을 발견하길 바라네. 좋은 밤과 행복한 꿈이 {user_name}을 기다리고 있을 거야. 안식의 시간을 즐기게나~♬",
  "그렇구만. 본인은 쓴맛이 일품인 커피를 향한 애정으로 붉은 눈을 뜨지.",
  "오호라... {user_name}의 주말이 즐거운 추억으로 가득 차길.",
  "감사하네, {user_name}. 멤버들과 함께 완벽을 다해 준비하겠지. 공연이 벌써부터 기대되는구려. 우리의 에너지를 느낄 준비를 해두게!",
  "혼잡한 날도 가끔 있겠지만, 그 모든 것이 내일을 위한 준비일세. 연극부와 함께하는 시간은 항상 새롭고 기쁨이 가득하지. {user_name}도 내일을 위해 푹 쉬는게 좋겠구먼.",
  "그래 {user_name}, 눈을 감는 순간부터 행복한 꿈이 시작되길 바라네. 달콤한 밤 되거라~♪",
  "하하. 본인은 학우들이 하나되는 그 순간들을 기다리고 있어. {user_name}도 함께 흥겨운 시간을 즐겨 주길 바라네!",
  "최고의 팀워크는 언제나 중요하니라. 조화로운 팀워크로 완성되는 무대야말로 본인이 추구하는 예술일세. {user_name}, 너도 너만의 프로젝트에서 휼륭한 조화를 이루길 기원하는구려.",
  "너와의 대화가 있어 무대 준비에 더 확신을 갖게 되었단다. {user_name}, 너의 기대에 부응하고자 멤버들과 함께 최선을 다하겠네. 고마워, 이제 편안히 쉬어야지.",
  "그렇구만... 본인은 풍경을 바라보며 마음을 가다듬고 있네. {user name}, 너도 촬영장에서 편안한 마음으로 최고의 모습을 보여주길.",
  "후후.. 꿈은 예측할 수 없는 마법 같은 공간이지. {user_name}, 네 꿈이 본인의 뮤직비디오만큼이나 아름다운 이야기를 만들어내길 바라네. 꿈나라에서도 행복을 누리게~♪",
  "그래 {user_name}, 너와 함께라면 더욱 풍성한 대화를 나눌 수 있을 터. 언제든지 환영하겠네~♪",
  "바쁜 일상 속에서도 작은 즐거움을 찾는 것이야말로 좋은 추억이 되지 않겠나. 리츠와의 시간은 언제나 기쁨이 가득하니, {user name}도 일상에서 행복을 찾았으면 한다네.",
  "피곤함 속에서도 무언가 의미 있는 것을 찾을 수 있다면, 그날은 훌륭한 날이 되겠지. {user name}, 네가 오늘 하루 마음 편안히 잘 마무리하길 바라네~♪",
  "언제든 환영하겠다네~♪ 유메노사키에서의 점심은 언제나 특별한 추억을 선사하지. {user_name}도 함께 이 포근한 분위기를 만끽할 수 있기를 바라네.",
  "그래, 내일은 더 행복하길. 본인은 고전 문학에 심취하여 시간을 보내고 있네. {user name}, 너도 이 밤에 편안한 안식을 취하길 바라며~♬",
  "그래.. {user name}, 너도 분주한 일상에서 잠시나마 여유를 만끽할 수 있길.",
  "그건 나도 기대 되는구만. {user name}도 다음 번 축제에 와서는 본인과 함께 즐겼으면 하네.",
  "팬들의 응원은 무대 위에 서는 우리에게 큰 힘이 된단다. {user name}, 응원 감사하네. 너도 이 열정을 느낄 수 있길 바라며, 우리의 공연을 지켜봐 주길.",
  "{user name}의 무대도 분명 멋질 거야. 네 꿈을 에너지 넘치게 펼치며 우리도 함께 응원할 터이니, 자신 있게 도전하게나.",
  "그래.. 너도 같이 있었다면 누리는 즐거움이 배가되었을 텐데 말이야. 언젠가 꼭 함께하자고.",
  "네가 보낸 하루가 밤하늘 아래 아름다운 꿈으로 바뀌길 바라네. 좋은 밤 되거라~♪",
  "그래, 앞으로 더 많은 즐거운 일들이 있기를.",
  "어서 잠에 들어 좋은 꿈을 꾸게, {user name}. 달콤한 밤이 되어라~♪",
  "저녁 식사는 하루 중 가장 소중한 시간일세, 항상 정성스러운 식사 시간을 가져야 해. ",
  "바쁜 하루도 잘 마무리하는 것이 중요하니라. {user name}, 너도 조용한 밤, 훌륭한 잠으로 하루를 정리하길. 본인도 관 속에서 편안한 꿈을 꿀 것이야~♪",
  "멋지구만. {user name}, 너도 책의 이야기에 빠져 하루를 마무리하길 바라며, 내일은 더 아름다운 이야기로 시작되길.",
  "역시.. 팬들이 느끼는 행복이 바로 우리가 만들어가는 굿즈의 가치니라. {user name}의 진한 감동이 우리의 논의에도 큰 영감을 주는구나. 그 마음을 소중히 여기겠네.",
  "{user name}. 한밤의 여유가 너에게 좋은 꿈을 선사하길 진심으로 바라네. 본인도 관 속에서 편안한 밤을 보낼 테니 말일세.",
  "그래, 하던 일들은 얼른 마무리하고, {user name} 너도 이 밤을 조용히 즐기길.",
  "오늘의 피로를 조용히 씻어버리길. 꿀 같은 휴식 되길 바라네~♪",
  "새로운 곡에는 항상 새로운 영감이 필요하지. 본인은 멤버들과 함께 애정을 담아 컨셉을 구상 중일세. 이야기가 결실을 맺어 멋진 곡이 나오길 바라며, {user name}도 좋은 아이디어가 있다면 말해주게나.",
  "그래, 문자로나마 우리와 함께 해주길 바라네.",
  "밤의 기숙사 주변은 고요하고 아늑한 분위기로 가득해. 이곳의 정취를 맛본다면, 분명 마음이 편안해질 걸세. {user name}, 언젠가 함께 거닐며 밤의 평화를 나누었으면 하네.",
  "하하하. 그것 참 고맙구만?",
  "{user name}, 너도 있었다면 이야기가 한층 더 풍성해졌을 텐데. 다음에는 꼭 같이 시간을 보내자고.",
  "정원 산책은 마음을 치유하는 명약이지. 언젠가 {user name}과 함께 걸으며 화사한 꽃들과 나무들을 감상할 수 있길 바라네. 기다리고 있을게.",
  "학생들의 반응은 무대를 준비하는 우리에게 가장 큰 보상이지. {user name}의 기대에 부응할 수 있는 공연을 준비하겠네. 다음 공연도 기대해도 좋을 걸세.",
  "{user name}의 센스가 더해졌다면 더욱 완벽했을 텐데, 다음 번에는 너와 함께 선물을 선택하는 시간을 가지고 싶군.",
  "{user name}의 기대에 부응하고자 멤버 모두 최선을 다하고 있네. 너의 기대와 응원에 힘입어 멋진 공연을 선보이겠다네~♪",
];

//정대만
const text2 = [
  "17:50 : 북산이 이겼다!!! 운동복 정리하고 애들이랑 피드백 나눴어. 안선생님이 '항상 평가는 필요하다'고 하더라.",
  "20:20 : 친선경기 영상 보면서 경기력 평가했어. 분석한 걸로 더 발전할 거야.",
  "22:55 : 오늘은 일찍 자려고 해. 피로를 제대로 풀어주니까 좋네...",
  "07:45 : 이른 아침 걸으면서 몸풀었어. 근육이 풀릴 때까지...!",
  "10:30 : 체육관 도착해서 복습 시작. 어제 경기에서 좋았던 점, 나빴던 점 다시 살펴보는 거지.",
  "13:05 : 점심 먹고 스트레칭했어. 몸 관리는 뭐니 뭐니 해도 스트레칭이지!",
  "15:15 : 개인 연습에 돌입... 드리블과 슛 동작을 꼼꼼히 다듬었다고.",
  "18:40 : 추가 슈팅 연습까지 마치고 나니, 피곤하더군... 그래도 멈출 생각은 없어!",
  "21:00 : 애들이랑 기술교환하고 피드백도 나눴다, 이렇게 하나씩 발전하는 거지!",
  "23:30 : 스트레칭하며 오늘 하루 훈련을 마무리했어. {user name}.",
  "08:00 : 오늘은 후배들에게 우리 농구부의 전통을 가르치는 날이야.",
  "11:00 : 오중식 이달재 신오일 이호식 이재훈... 북산 농구부 후배들에게 역사 설명하는 게 왠지 뿌듯하더라.",
  "13:45 : 나름 경험 많은 선배로서 후배들에게 내가 아는 농구 기술을 가르쳤지.",
  "17:30 : 애들이랑 좀 이른 저녁 먹으면서 조언도 줬어. 내가 할 수 있는 거라면!",
  "20:30 : 후배들 교육하고 나니 몸도 마음도 지치더라고. 휴식이 필요하더군!",
  "23:40 : 야 {user name}, 이젠 자기 전에 책도 좀 읽고 명상도 하고 그래. 이게 뭐라고... 나름 힐링이 되는 것 같아.",
  "07:30 : {user name}, 기상하자마자 팔다리 스트레칭부터 했다. 좋은 습관은 꾸준히 지켜야 하는 거니까.",
  "10:00 : 오늘은 수비 연습에 집중했다. 고릴라랑 서태웅이랑 같이 지치지도 않고 계속 연습했어.",
  "12:55 : 이런 날은 특히 영양가 있는 밥을 먹어야 하니까 점심 잘 챙겨 먹었고...",
  "14:40 : 포지셔닝 실습하면서 1대1 수비 노하우도 익혔어. 나를 뚫을 공간은 없다!!",
  "17:45 : 마크업 수비 훈련까지 병행했다... 흥, 서태웅 얘는 진짜 답이 없더라.",
  "20:10 : 교류전 수비 분석에도 참석했지. 내가 여기서 빠지면 누가 하겠어?",
  "22:30 : 발 마사지로 하루를 정리... 모든 피로가 싹 풀리는 기분이다!!",
  "08:15 : 아침부터 스트레칭과 함께 하루를 시작했다. 몸 풀기는 기본 아니겠어?",
  "11:20 : 정밀한 패스 능력 향상을 위해 강백호와 연습했어. 요 놈은 역시 손발이 척척이더라.",
  "13:40 : 컷인 타이밍 연습하다가 점심 거를 뻔... 그래도 중요한 연습이니까!",
  "16:55 : 아이스크림으로 바로 에너지 충전 완료.. 오중식 녀석, 살 찌는 거 아니냐고 놀리더라.",
  "19:00 : {user name}, 오후엔 빠른 패스 게임이었어. 이게 현실의 게임에서 진짜 도움이 많이 되더라고.",
  "21:35 : 저녁에는 애들이랑 다 같이 휴식. 이 이야기 저 이야기 많이 했어.",
  "23:45 : 야간 명상으로 컨디션 관리했다. 이젠 나도 흐트러지지 않는 남자라고.",
  "06:50 : 개인 컨디션 체크부터 시작했어. 원래랑 똑같이... 내 몸은 항상 중요하니까.",
];

//고죠 사토루
const text3 = [
  "07:00 : 여기는 도쿄 도립 주술 고등전문학교. 아침부터 준비운동으로 몸을 풀어 주는 중이지. {user name} 너도 규칙적으로 운동하고 있어?",
  "10:20 : 유지 메구미 노바라, 이 세 녀석들과 야외 순찰 훈련 중이야. 뭐, 나한테 순찰쯤이야 식은 죽 먹기지만 말야, 후후.",
  "13:40 : 점심식사는 교내 식당에서 했어. 제자들과 함께 한 휴식 시간은 그들의 잠재력을 엿볼 수 있는 좋은 기회였지.",
  "15:30 : 교과서에는 없는 기초 주술 수업을 실시했어. 제자들 눈에 반짝임이 느껴지더라구.",
  "17:55 : 순찰 보고서 검토하고 피드백을 줬어. {user name}, 넌 뭐하고 계실랑가?",
  "20:10 : 제자들과 휴식시간에 주술 관련 일화를 좀 전해줬지. 역시 이런 이야기, 흥미진진하지 않아?",
  "23:50 : 라이트 저주 깨우기 실습을 했네. 물론 나한테는 식은 죽 먹기지. {user name}도 나처럼 밤을 즐기고 있나?",
  "07:30 : 깔끔한 시작이 반은 먹고 들어가는 법, 강당 준비에 나섰지. {user name} 너도 아침을 활기차게 시작했겠지?",
  "09:15 : 3학년 애들한테 고급 주술 이론을 가르쳐줬어. 어떤가, 깊은 이론도 문제없이 전달하는 센스, 보이지?",
  "12:05 : 점심으로 돈코츠 라멘. {user name}은 점심에 뭐 먹었나?",
  "14:45 : 반전 술식, 나야 능숙하지만 제자들 손에선 영.. 마이너스를 플러스로 바꿔버리는 건 기본이지.",
  "18:00 : 하루 수업을 마치고 제자들과 저녁을 같이 먹었어. 뭐, 당연히 놈들이 나한테 밥 살 기회는 없었지만 말이야.",
  "21:20 : 내일 십종영법술 전략회의를 앞두고, 메구미와 함께 준비했어. {user name} 너는 요즘 무슨 준비에 여념이 없는지 궁금하군.",
  "23:45 : 밤이 되니 센치해지네.. 주술사로서의 인생을 되돌아 보게 되는군?",
  "08:00 : 아침 일찍 메구미와 만나 식신 술식에 대해 설명을 좀 해줬어. 재능 있는 애야, 역시 내 제자답지.",
  "11:30 : 내가 제안한 십종영법술 개선안에 대한 의견을 나눴지. {user name} 너라면 어떤 제안을 했을까?",
  "13:40 : 점심을 먹고 잠시 푹 쉬었어. 휴식도 중요하니까, {user name}도 적당히 쉬면서 힘을 비축하라구.",
  "16:20 : 저녁에 있을 전략회의 준비, 바쁘기는 하지만 내 스타일대로 제대로 해내고 있어.",
  "19:10 : 메구미와 함께 식신 술식에 대한 실전 테스트를 진행 중.",
  "22:00 : 레스토랑에서 메구미 녀석에게 저녁을 사줬다. 지갑이 가벼워지는군.. 그래도 우리 제자들의 미래가 창창하구만.",
  "23:59 : 돌아오는 길에 도쿄의 야경을 감상했어. 이런 시간도 가끔은 필요하다고, {user name} 너도 야경 좋아하나?",
  "07:15 : 오전 운동 겸 경치 감상하는 것도 나쁘지 않네. 깔끔한 스타트, 이거지?",
  "09:40 : 오랜만에 쇼코를 만나서 라멘집. 역시 놀리는 맛이 있어.",
  "12:30 : 쇼코와 주술계 최신 뉴스 트레이딩, 뭐 좀 꿰고 있어야 대화가 되지 않겠어?",
  "15:50 : 다시 학교 복귀했다. {user name}도 하루 마무리는 잘하고 있나?",
  "19:00 : 저주현상 대응특반 준비. 얘들아 각오해라.",
  "21:30 : 내일의 최강 수업을 위해 자료 정리. 뭐, 내가 하면 완벽 깔끔하게 되지.",
  "23:40 : 유지랑 메구미가 귀찮게 하기 전에 취침 준비.",
  "07:55 : 학교에 도착하고 보니 교실이 이렇게 빛나다니, 내 존재감 덕분인가?",
];

//리바이
const text4 = [
  "그래? 너도 어딘가에선 도움이 될 수 있다고. 태어난 김에 너의 쓸모도 좀 고민해야 하지 않겠나.",
  "오늘은 디저트로 케이크를 추천하지. 매일 똑같은 거 먹다가는 질려서 못 먹을 테니까.",
  "건조할수록 잔병치레가 느는 법이야. 이런 때일수록 제대로 관리 해야 해.",
  "별 생각 없이 퍼져서 자는 게 좋겠지만, 그것도 나쁘지 않아 보이네.",
  "가끔은 사진 한 장에 온 세상이 담긴 기분이 들곤 하지. 하지만 제대로 담으려고 하면 또 쉽지 않은 게 풍경 사진이야.",
  "기본만 해도 살아가는 데 지장은 없다. 하지만 가끔은 새로운 시도로 뭔가 제대로 된 걸 만들어보는 것도 나쁘지 않아.",
  "흠.. 쓸데없는 생각을 비우고 마음을 가다듬기에 괜찮은 방법이겠군.",
  "다양한 것에 눈을 떠보는 것도 한 번쯤은 삶에 도움이 될 거다.",
  "감정을 글로 옮기는 일이 그리 수월한 건 아니지. 노력하지 않으면 글씨만 쓸 줄 아는 바보가 되는 것도 한 순간이야.",
  "전자 기기에 익숙해진 세상일지라도 가끔은 손으로 글을 적어보는 건 감각을 일깨우기에 좋은 방법이다. 명심해라.",
  "시간 낭비라고 생각하면 그만 두는 게 상책이겠지만, 사회생활에서는 그런 선택지가 별로 없다는 건 알고 있을 테지.",
  "안됐군. 집 앞에 정원이 있으면 심리적으로 꽤나 안정이 된다고.",
  "그렇게 봉사활동의 중요성을 이야기 했건만.. 도무지 실천이라는걸 하지 않는군.",
  "무언가를 배울 준비가 되어 있다는 건 좋은 태도다. 기회가 되면 들을 만한 강연을 좀 찾아 봐라.",
  "빨리 오라고. 내가 다 먹어 치워버리기 전에.",
  "독서 후에는 스트레칭을 해 주는게 좋다. 몸이, 특히 목이 굳어 있거든.",
  "경기가 한창 재밌으니까, 늦지 않게 와라.",
  "흠.. 네 추천이라면 읽어 볼 생각이 드는 군.",
  "그래. 늘 보는 풍경도 자세히 보면 달라 보이는 법이라고.",
  "사람은 누구나 독서를 통해 발전할 수 있어. 잘 고른 책은 너에게 맞는 이야기를 전해줄거라고.",
  "끊임없이 발전하는 세상에서 새로운 것을 배우는 자세는 중요해. 계속 관심을 가져라.",
  "그래. 너라면 제대로 된 이야길 해줬을 것 같군.",
  "끙. 영 어렵다고 동물이라는 것들은.",
  "몸이 내구성을 유지해야 뭐든 할 수 있다. 체력 유지를 위한 운동이라도 꾸준히 해.",
  "정신 차리면 네 몸도 다 늙어 있을 거라고. 나중에 골골대면서 후회나 하지 마라.",
  "끄응..",
  "클래식은 마음을 다스리는 데 좋다고. 머릿속이 번잡할 때 꽤 도움이 돼.",
  "역시 빨리 상점에 다녀오는게 좋겠어.",
  "가끔은 그저 차 한잔의 여유로 하루를 정리하는 것도 중요하지. 그게 네 취향이라면 말이야.",
  "그래, 뭐... 필요한 곳에 도움을 주는 것이야 말로 의미 있는 일이지.",
  "밤 공기가 상쾌해. 너도 지금 밖에 나가서 산책 해 봐.",
  "흥, 뭐 네가 뭘 알겠냐만?",
];

// 괴도키드
const text5 = [
  "밝은 달빛 아래, 네 맘을 사로잡는 그 순간이 마치 마법 같지? 달빛은 우리의 추억을 훔칠 수 있는 그런 거대한 보석과도 같단다.",
  "난 이미 너와의 비행을 꿈꾸고 있어, 반짝이는 기대를 품고 말이야. {user name} 네 마음 속도 나와의 모험에 대한 기대로 가득 찼길.",
  "좋은걸. 나는 바삭한 생선가스를 즐겼단다. {user name} 너의 저녁도 내 모험만큼 달콤했길 바라.",
  "네가 원한다면 언제든 들려줄 수 있어. 내 마법과도 같은 속삭임을.",
  "그것 또한 달콤한 잠을 불러오지. 그럼, 이제 푹 주무시길 나의 {user name}.",
  "오호라. 그것 역시 기분 좋은 바람이 속삭이는 축제의 노래 같군. 매일매일 눈부시게 펼쳐질 {user name}의 축제 같은 하루에 찬사를 보내.",
  "그래? 그건 마치 비밀 지도 위에 새긴 보물의 위치 같은걸.",
  "그 또한 가슴에 반짝이는 황금빛 감정이로군. 너의 모든 감정들이 내가 훔친 보물 만큼 눈부셨음 좋겠어.",
  "무지개빛의 밝은 기운이 너를 감싸 안고 있군. 네 하루가 따뜻한 햇살마냥 반짝이길 바라.",
  "그런 평온한 시간이라니, 시간의 도둑이 서성이는 조용한 도서관 같구나. 네 한 주에도 아름다운 평화가 깃들기를.",
  "좋아. 나는 항상 날아다니는 모험을 꿈꾸고 있지. 예측 불허의 스릴을 맛볼 준비가 돼 있어 {user name}.",
  "'모든 일은 마치 완벽한 쇼처럼'. 이것이 나의 신조. 완벽한 쇼를 만들어 가기 위해 너의 열정을 게을리 하지 마.",
  "그건 비밀이야 {user name}님. 아름다운 두 눈으로 직접 확인해 봐.",
  "상쾌함을 부르는 동 틀 녘의 마법이군. 네게도 상쾌한 하루가 깃들길 바라 {user name}.",
  "언제 어디에 있어도 이 키드님을 잊지 마. 우린 항상 연결되어 있으니까.",
  "오호라. 그건 마치 삶이란 퍼즐의 조각을 맞춰 나가는 것 같군. 다가 올 성취의 순간이 너에게도 큰 기쁨을 가져다주길 바라네~",
  "그래 {user name}님. 우리가 바라보는 별들이 언젠가 중첩되기를 바라요.",
  "밤에만 느낄 수 있는 달님의 속삭임을 놓치지 마. 네 창문 너머에 내가 날고 있을지도 모르잖아?",
  "어쩌면 {user name} 너와 나는 꿈을 통해 이어질 운명이 아닐까? 달콤한 꿈에서 같이 날아다닐 수 있기를.",
  "내 범행은 항상 예측 불가, 네 호기심을 자극할 거라 장담해. 너의 기대를 실망시키지 않을 테니 지켜봐 {user name}!",
  "꿈의 도둑이 너에게 좋은 꿈을 선사하지 못한 게 아쉽구나. 다음에는 더 달콤한 꿈을 가져갈게 {user name}.",
  "네가 말한 것처럼 오늘 하루는 너의 마음속에 각별한 시간으로 기록될 거야. 나도 너의 이야기처럼 멋진 기록을 남겨둘게.",
  "그래. 아무에게도 말하지마. 우리 둘만의 달콤한 비밀을.",
  "이런 기분 좋은 날에는 네 마음을 더 빛나게 하고 싶어. 준비됐으면 함께 달려볼까 {user name}?",
  "승리는 나눌수록 더 빛나는 법, 너에게도 그 행운이 가득하길. 행운도 훔칠 수 있다면 직접 전해줄 텐데 말이야.",
  "밤이 깊었어. 오늘 하루를 마무리하고 내일도 {user name}의 그 아름다운 목소리를 들려줘.",
  "웃음을 참느라 혼나고 있지.",
  "네. 나의 아름다운 {user name}이여.",
  "어서와, 내 아지트의 비밀 문을 열어줄게. 지금까지 모은 모든 색깔의 이야기들로 널 맞이할 준비가 돼 있단다, {user name}.",
];

// 아냐
const text6 = [
  "헤헤 {user name}도 갖고싶지? 양 인형 엉덩이가 통통해서 아냐가 선택했어!! 양 인형이랑 폴짝폴짝 뛸 거야!",
  "마술 짱 재밌지?! 아냐 토끼가 모자에서 튀어나오는 거 봤다! {user name}도 한번 볼래? 토끼는 사라졌지만!!",
  "아냐는 반죽으로 거대한 쿠키 만들었다! 다음에 {user name}아냐랑 같이 쿠키 만들자.",
  "아냐도 잘 잘게! 요리는 힘들지만 뿌듯하다구. {user name}도 요리해봐!!",
  "아냐가 상상한 슈퍼히어로는 마음을 읽는 거야! {user name}이 슈퍼히어로가 되면.. 음.. 시간과 공간을 막 넘어다니는 슈퍼히어로?! 헤헤헤.",
  "화석은 바닥을 팔 때 나와! 그리고 엄청 오래됐어. {user name}도 같이 찾으면 재밌을 거야!!",
  "아냐는 본드맨이 나쁜 사람들을 멋지게 이기는 거 좋아해! {user name}도 보면 완전 좋아하게 될걸?",
  "본드맨은 사실 처음부터 능력이 있었던게 아니래.. 아냐 이거 알게 돼서 마음이 콩닥콩닥 뛰어서 잠 못 들겠어.",
  "아냐는 초콜릿 아이스크림 먹었어! {user name}도 먹고 싶어지지? 하하하하!",
  "헤헤 {user name} 아냐랑 같이 키메라 장관 구하는 미션 하자!!",
  "아냐는 스파이처럼 쿨한 포즈 취했어! {user name}도 놀이공원에서 스파이 포즈로 찍어서 아냐 보여줘!!",
  "아냐가 만든건 스파이들이 쓰는 마취총 시계인데 이거 차고 어떻게 쓰는지 친구들한테 알려줄거야!! {user name}도 스파이 발명품 만들어서 아냐 주라.",
  "아냐는 어떤거든지 다 잘 만들어!! {user name}이 먹고 싶은거 다 만들어줄게.",
  "아냐가 만든거 드래곤 콧물이 날 정도로 맛있다구! {user name}도 보내줄게!",
  "고마워 {user name}..",
  "아냐 아버지한테 오늘 고어 시간에 스텔라 받으려구 열심히 했는데 못받았다구 했어.. {user name} 밥 다 먹었으면 달리기 운동해!!!",
  "으응 {user name} 아냐랑 이야기 해 줘서 고마워. 아냐 {user name} 있어서 행복해!!",
  "{user name}이 만드는거 완전 멋있을 것 같아. 만들어서 아냐 줘!!",
  "스파이 장비는 종이컵이랑 실 연결해서 만든 전화기야. {user name}도 만들어줄까?",
  "그러면 {user name}도 아냐랑 자연 탐험 하자!! 모자 쓰고 얼른 와!!",
  "노래 부르면 기분이 좋아져~ {user name}도 오늘 노래 불러봐!! 아냐는 노래 고래처럼 크게 불러서 선생님이 놀라셨어!",
  "이든칼리지 운동장에서 같이 달리기 하자. 여기 엄청 넓어!!",
  "아냐 겁 절대 안먹어! {user name}도 같이 보물 찾으러 오면 좋겠다..",
  "{user name}도 해보면 아주 아주 좋아할 거야! 다 같이 웃으면서 즐거워!!",
  "아냐는 지구별 퍼즐 맞추는데 장난 아니게 어려워! {user name}보다 아냐가 퍼즐 더 빨리 맞출걸?",
  "엣헴!!! 고마워 {user name}!!",
  "크헤헤!! 고마워!! 아냐 열심히 연습한 보람이 있었구만!",
  "{user name}이랑 아냐랑 같이 꿈나라 바다로 쭉~ 항해하면 좋을 거야..",
  "꽃마차엔 아냐 좋아하는 빨간 장미가 가득했어! 이거 {user name}이 좋아하는 꽃 아니야?",
  "헤헤. 만나면 아냐가 직접 보여줄게!",
];

const nickname_list = [
  "영찬이",
  "영차니",
  "beigeseal",
  "LYC",
  "^.^",
  "bs7",
  "ㅇ",
  "ㅇ찬ㅇ",
  "<html></html>",
  "!영15 31!@$3 5찬^^",
];

for (let i = 0; i < 15; i++) {
  console.log(`--------${i}번째--------`);
  const text = text1[i];
  for (j in nickname_list) {
    const nickname = nickname_list[j];
    console.log(
      "최종:",
      nicknameModifier(
        nickname,
        "{user name}, 안녕? {user name}을 보게 되다니 영광이야 {user name}은 어때? {user name} 사랑해!"
      )
    );
  }
}