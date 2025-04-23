<template>
  <el-dialog
    title="添加被投企业"
    width="600px"
    top="30vh"
    :visible.sync="dialogVisible"
    @closed="closeDialog"
  >
    <el-form ref="dataForm" :model="params" label-width="100px">
      <el-form-item label="关联方名称" prop="enterpriseName">
        <JsonSelect
          v-model="params.enterpriseName"
          filterable
          remote
          :remote-method="remoteFn"
          :loading="loading"
          :options="enterpriseOptions"
          :optionProps="{
            value: 'label',
            label: 'label'
          }"
        />
        <!-- @change="changeFn" -->
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmFn">确定</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      enterpriseOptions: [],
      params: {
        enterpriseName: ''
      }
    }
  },
  methods: {
    openDialog() {
      this.dialogVisible = true
    },
    closeDialog() {},
    async confirmFn() {
      this.$emit('addEnterprise', this.params.enterpriseName)
      this.dialogVisible = false
    },
    remoteFn(str) {
      if (str !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.enterpriseOptions = [
            { value: '1', label: '京东科技控股股份有限公司' },
            { value: '2', label: '阿里兄弟集团有限公司' },
            { value: '3', label: '美团科技有限公司' },
            { value: '4', label: '抖音有限公司' }
          ]
        }, 200)
      } else {
        this.enterpriseOptions = []
      }
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
