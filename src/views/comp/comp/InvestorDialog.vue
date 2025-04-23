<template>
  <el-dialog title="添加被投企业" width="800px" :visible.sync="dialogVisible">
    <Transfer ref="TransferRef" @transferList="list => (investorList = list)" />
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmFn">确定</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Transfer from './Transfer.vue'

export default {
  name: 'InvestorDialog',
  components: { Transfer },
  data() {
    return {
      dialogVisible: false,
      investorList: []
    }
  },
  methods: {
    // 打开弹窗
    async openDialog(list) {
      this.dialogVisible = true
      await this.$nextTick()
      this.$refs.TransferRef && this.$refs.TransferRef.init(list)
    },
    // 确定
    async confirmFn() {
      this.dialogVisible = false
      this.$emit('investorList', this.investorList)
    },
    removeInvestor(o) {
      this.$refs.TransferRef.remove(o)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  border-radius: 5px;
  .el-dialog__body {
    padding: 20px;
  }
}
</style>
