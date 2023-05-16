<template>
  <div class="flipClock">
    <div class="clockBox">
      <div>
        <div>{{ clock.format('HH') }}</div>
      </div>
      <div>
        <div>{{ clock.format('mm') }}</div>
      </div>
    </div>

    <div class="clockBox down">
      <div>
        <div>{{ clock.format('HH') }}</div>
      </div>
      <div>
        <div>{{ clock.format('mm') }}</div>
      </div>
    </div>

    <div class="year middle">
      <div>
        <div v-once>{{ thisYear.slice(0, 2) }}</div>
      </div>
      <div>
        <div v-once>{{ thisYear.slice(2) }}</div>
      </div>
    </div>

    <div class="year down">
      <div>
        <div v-once>{{ thisYear.slice(0, 2) }}</div>
      </div>
      <div>
        <div v-once>{{ thisYear.slice(2) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { ref, watch } from 'vue'
let clock = ref(dayjs())
let fliping = ref(false)
setInterval(() => {
  clock.value = clock.value == dayjs() ? clock.value : dayjs()
}, 1000)

const thisYear = clock.value.format('MMDD')

</script>

<style lang="scss" scoped>
.flipClock {
  display: inline-block;
  position: relative;
  width: fit-content;
  margin-bottom: 10px;
  &:hover .clockBox.down {
    transform: rotateX(90deg);
    transition: all 0.3s ease-in-out;
  }
  &:hover .middle {
    transform: rotateX(0deg);
    transition: all 0.3s ease-in-out 0.2s;
  }

  &:hover::after{
    content: '日期';
  }
  &::after {
  content: '时分';
  position: absolute;
  top: 0;
  right: -20px;
  font-size: 16px;
  height: 70px;
  text-align: end;
  writing-mode: vertical-lr;
  letter-spacing: 5px;
}
}

.clockBox,
.year {
  display: flex;
  width: 180px;
  justify-content: space-between;
  margin: 0 5px;
  gap: 10px;
  z-index: 2;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(42, 42, 42);
    width: calc(100% / 2);
    height: 70px;
    border-radius: 8%;
    clip-path: inset(0 0 50% 0);
    div {
      border: none;
      color: #eee;
      font-size: 60px;
      font-weight: 700;
      clip-path: unset;
    }
  }
}

.year {
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 1;
}

.down {
  position: absolute;
  top: 2px;
  left: 0;
  div {
    clip-path: inset(50% 0 0 0);
    div {
      clip-path: unset;
    }
  }
}

.middle {
  z-index: 3;
  transform: rotateX(90deg);
}


</style>
