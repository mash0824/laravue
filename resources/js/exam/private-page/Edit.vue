<template>
  <el-card>
    <div class="user-profile">
      <div class="box-center">
        <div class="user-name text-center">
          Welcome, {{ user.name }}
        </div>
        <div v-loading="userUpdating" class="form-container">
          <el-form ref="userForm" :model="formDataInput" label-position="left" label-width="150px" style="max-width: 500px;">
            <el-form-item :label="'Old Password'" prop="password">
              <el-input v-model="formDataInput.password" :class="[{'is-invalid' : errorFor('password')}]" show-password />
              <div v-for="(error,index) in errorFor('password')" :key="'password' + index" class="invalid-feedback">{{ error }}</div>
            </el-form-item>
            <el-form-item :label="'New Password'" prop="newPassword">
              <el-input v-model="formDataInput.newPassword" :class="[{'is-invalid' : errorFor('newPassword')}]" show-password />
              <div v-for="(error,index) in errorFor('newPassword')" :key="'newPassword' + index" class="invalid-feedback">{{ error }}</div>
            </el-form-item>
            <el-form-item :label="'Confirm Password'" prop="newPassword_confirmation">
              <el-input v-model="formDataInput.newPassword_confirmation" :class="[{'is-invalid' : errorFor('newPassword_confirmation')}]" show-password />
              <div v-for="(error,index) in errorFor('newPassword_confirmation')" :key="'newPassword_confirmation' + index" class="invalid-feedback">{{ error }}</div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updatePassword()">
              Update
            </el-button>
            <el-button @click="clearForm()">
              Clear
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import UserPasswordResource from '@/exam/private-page/user-password';
const userResource = new UserPasswordResource();

export default {
  name: 'PrivatePage',
  data() {
    return {
      user: {},
      formDataInput: {},
      userUpdating: false,
      status: null,
      errors: null,
    };
  },
  computed: {
    hasErrors() {
      return this.status === 422 && this.errors !== null;
    },
  },
  watch: {
    '$route': 'getUser',
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const data = await this.$store.dispatch('user/getInfo');
      this.user = data;
    },
    updatePassword() {
      this.userUpdating = true;
      this.formDataInput.id = this.user.id;
      this.formDataInput.roles = this.user.roles;
      userResource
        .updatePassword(this.user.id, this.formDataInput)
        .then(response => {
          this.status = response.status;
          this.userUpdating = false;
          this.$message({
            message: 'User information has been updated successfully',
            type: 'success',
            duration: 5 * 1000,
          });
          this.clearForm();
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
          this.status = error.response.status;
        })
        .then(() => (this.userUpdating = false));
    },
    clearForm() {
      this.formDataInput = {
        password: '',
        newPassword: '',
        newPassword_confirmation: '',
      };
    },
    errorFor(field) {
      return this.hasErrors && this.errors[field] ? this.errors[field] : null;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  .user-name {
    font-weight: bold;
    padding-bottom:10px;
  }
  .box-center {
    padding-top: 10px;
  }
}
.is-invalid{
  border-color : #b22222;
  background-image: none;
}
.invalid-feedback {
  border-color : #b22222;
  color : #b22222;
}
</style>
