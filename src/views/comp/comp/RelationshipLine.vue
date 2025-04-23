<template>
  <div class="relationship">
    <div class="relationship-item" v-for="o in relationships" :key="o.id">
      <div class="company">
        <i class="circle" :style="`background: ${o.color}`"></i><span>{{ o.name }}</span>
      </div>
      <div class="down-line" v-if="o.direction" :class="{ up: o.direction === 'up' }">
        <i class="el-icon-caret-bottom"></i><span>{{ o.position }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RelationshipLine',
  props: {
    relationships: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.relationship {
  margin-top: 10px;
  &-item {
    margin: 0 18px;
    .company {
      display: flex;
      align-items: center;
    }
    // .up-line i {
    //   top: -5px;
    // }
    .down-line.up {
      i {
        top: -5px;
        transform: rotate(180deg);
      }
    }
    .down-line i {
      top: 18px;
    }
    // .up-line,
    .down-line {
      position: relative;
      color: #b3c8f0;
      font-size: 14px;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 2px;
        width: 2px;
        height: 24px;
        background-color: #b3c8f0;
      }
      i {
        position: absolute;
        left: -4px;
      }
      span {
        font-size: 12px;
        margin-left: 14px;
      }
    }
    .company {
      .circle {
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin-right: 6px;
        vertical-align: middle;
      }
    }
  }
}
</style>
