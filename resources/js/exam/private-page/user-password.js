import request from '@/utils/request';
import UserResource from '@/api/user';

class UserPasswordResource extends UserResource {
  constructor() {
    super('users');
  }

  updatePassword(id, passwords) {
    return request({
      url: '/' + this.uri + '/' + id + '/passwords',
      method: 'put',
      data: passwords,
    });
  }
}

export { UserPasswordResource as default };
