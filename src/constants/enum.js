export const ROLE = {
  ADMIN: 'ADMIN',
  RECRUITER: 'RECRUITER',
  USER: 'USER',
};

export const ROLE_LABEL = {
  [ROLE.ADMIN]: 'Quản trị viên',
  [ROLE.RECRUITER]: 'Nhà tuyển dụng',
  [ROLE.USER]: 'Ứng viên',
};

export const ROLE_ARRAY = Object.values(ROLE)
  .filter(role => role !== ROLE.ADMIN)
  .map(role => ({
    value: role,
    label: ROLE_LABEL[role],
  }));

export const HEALTH_STATUS = {
  DISABLED: 'DISABLED',
  NORMAL: 'NORMAL',
};

export const HEALTH_STATUS_LABEL = {
  [HEALTH_STATUS.DISABLED]: 'Khuyết tật',
  [HEALTH_STATUS.NORMAL]: 'Bình thường',
};

export const HEALTH_STATUS_ARRAY = Object.values(HEALTH_STATUS).map(status => ({
  value: status,
  label: HEALTH_STATUS_LABEL[status],
}));
