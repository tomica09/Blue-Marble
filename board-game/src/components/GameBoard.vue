<template>
  <div class="game-board">
    <div v-for="city in cities" :key="city.id" class="city">
      {{ city.name }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: [
        { id: 1, name: "출발" },
        { id: 2, name: "타이베이" }, { id: 3, name: "황금열쇠" },
        { id: 4, name: "베이징" }, { id: 5, name: "마닐라" },
        { id: 6, name: "제주" }, { id: 7, name: "싱가포르" },
        { id: 8, name: "황금열쇠" },
        { id: 9, name: "카이로" }, { id: 10, name: "이스탄불" },
        { id: 11, name: "무인도" }, { id: 12, name: "아테네" },
        { id: 13, name: "황금열쇠" }, { id: 14, name: "코펜하겐" },
        { id: 15, name: "스톡홀롬" }, { id: 16, name: "콩코드 여객기" },
        { id: 17, name: "베른" }, { id: 18, name: "황금열쇠" },
        { id: 19, name: "베를린" }, { id: 20, name: "오타와" },
        { id: 21, name: "사회복지기금 접수처" }, { id: 22, name: "부에노스아이레스" },
        { id: 23, name: "황금열쇠" }, { id: 24, name: "상파울루" },
        { id: 25, name: "시드니" }, { id: 26, name: "부산" },
        { id: 27, name: "하와이" }, { id: 28, name: "리스본" },
        { id: 29, name: "퀸 엘리자베스 호" }, { id: 30, name: "마드리드" },
        { id: 31, name: "우주여행" }, { id: 32, name: "도쿄" },
        { id: 33, name: "컬럼비아호" }, { id: 34, name: "파리" },
        { id: 35, name: "로마" }, { id: 36, name: "황금열쇠" },
        { id: 37, name: "런던" }, { id: 38, name: "뉴욕" },
        { id: 39, name: "사회복지기금" }, { id: 42, name: "서울" },

      ],
    };
  },
};
</script>

<style>
.game-board {
  display: flex;
  flex-wrap: wrap;
}

.city {
  width: 100px;
  height: 100px;
  border: 1px solid black;
}
</style>
