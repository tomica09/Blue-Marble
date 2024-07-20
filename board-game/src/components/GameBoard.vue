<template>
  <div class="game-board">
    <table>
      <tbody>
        <tr v-for="(row, rowIndex) in board" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex" :class="cellClass(cell)" :id="cellId(cell)">
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'GameBoard',
  data() {
    return {
      board: [
        ["무인도", "아테네", "황금열쇠3", "코펜하겐", "스톡홀롬", "콩코드여객기", "베른", "황금열쇠4", "베를린", "오타와", "사회복지기금"],
        ["이스탄불", "", "", "", "", "", "", "", "", "", "부에노스아이레스"],
        ["카이로", "", "", "", "", "", "", "", "", "", "황금열쇠5"],
        ["황금열쇠2", "", "", "", "", "", "", "", "", "", "상파울루"],
        ["싱가포르", "", "", "", "", "", "", "", "", "", "시드니"],
        ["제주", "", "", "", "", "", "", "", "", "", "부산"],
        ["마닐라", "", "", "", "", "", "", "", "", "", "하와이"],
        ["베이징", "", "", "", "", "", "", "", "", "", "리스본"],
        ["황금열쇠1", "", "", "", "", "", "", "", "", "", "퀸 엘리자베스 호"],
        ["타이베이", "", "", "", "", "", "", "", "", "", "마드리드"],
        ["출발", "서울", "사회복지기금 접수처", "뉴욕", "런던", "황금열쇠6", "로마", "파리", "컬럼비아호", "도쿄", "우주여행"]
      ]
    };
  },
  methods: {
    cellClass(cell) {
      if (cell === "") return 'empty-cell';
      if (cell.startsWith("황금열쇠")) return 'key-cell';
      return 'city-cell';
    },
    cellId(cell) {
      const ids = {
        "무인도": "10",
        "황금열쇠1": "2",
        "황금열쇠2": "7",
        "황금열쇠3": "12",
        "황금열쇠4": "17",
        "황금열쇠5": "22",
        "황금열쇠6": "35",
        "아테네": "11",
        "코펜하겐": "13",
        "스톡홀롬": "14",
        "콩코드여객기": "15",
        "베른": "16",
        "베를린": "18",
        "오타와": "19",
        "사회복지기금": "20",
        "이스탄불": "9",
        "부에노스아이레스": "21",
        "카이로": "8",
        "싱가포르": "6",
        "상파울루": "23",
        "제주": "25",
        "시드니": "24",
        "마닐라": "4",
        "부산": "5",
        "베이징": "3",
        "하와이": "26",
        "리스본": "27",
        "타이베이": "1",
        "퀸 엘리자베스 호": "28",
        "마드리드": "29",
        "출발": "0",
        "서울": "39",
        "사회복지기금접수처": "38",
        "뉴욕": "37",
        "런던": "36",
        "로마": "34",
        "파리": "33",
        "컬럼비아호": "32",
        "도쿄": "31",
        "우주여행": "30"
      };
      return ids[cell] || '';
    }
  }
};
</script>

<style scoped>
.game-board {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

table {
  border-collapse: collapse;
}

td {
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  text-align: center;
  vertical-align: middle;
  font-size: 8pt;
  font-family: 맑은 고딕;
}

.empty-cell {
  background-color: #f0f0f0;
}

.key-cell {
  background-color: gold;
}

.city-cell {
  background-color: #d3d3d3;
}
</style>
