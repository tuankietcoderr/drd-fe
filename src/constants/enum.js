export const ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  RECRUITER: 'RECRUITER',
};

export const ROLE_LABEL = {
  [ROLE.ADMIN]: 'Quản trị viên',
  [ROLE.USER]: 'Ứng viên',
  [ROLE.RECRUITER]: 'Nhà tuyển dụng',
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

export const PROFESSIONAL_LEVEL = {
  NONE: 'NONE',
  MIDDLE_SCHOOL: 'MIDDLE_SCHOOL',
  HIGH_SCHOOL: 'HIGH_SCHOOL',
  VOCATIONAL: 'VOCATIONAL',
  COLLEGE: 'COLLEGE',
  UNIVERSITY: 'UNIVERSITY',
  POSTGRADUATE: 'POSTGRADUATE',
};

export const PROFESSIONAL_LEVEL_LABEL = {
  [PROFESSIONAL_LEVEL.NONE]: 'Không yêu cầu',
  [PROFESSIONAL_LEVEL.MIDDLE_SCHOOL]: 'Trung học cơ sở',
  [PROFESSIONAL_LEVEL.HIGH_SCHOOL]: 'Trung học phổ thông',
  [PROFESSIONAL_LEVEL.VOCATIONAL]: 'Trung cấp',
  [PROFESSIONAL_LEVEL.COLLEGE]: 'Cao đẳng',
  [PROFESSIONAL_LEVEL.UNIVERSITY]: 'Đại học',
  [PROFESSIONAL_LEVEL.POSTGRADUATE]: 'Sau đại học',
};

export const PROFESSIONAL_LEVEL_ARRAY = Object.values(PROFESSIONAL_LEVEL).map(
  level => ({
    value: level,
    label: PROFESSIONAL_LEVEL_LABEL[level],
  }),
);

export const DISABILITY_TYPE = {
  KHUYET_TAT_TAY: 'KHUYET_TAT_TAY',
  KHUYET_TAT_CHAN: 'KHUYET_TAT_CHAN',
  KHUYET_TAT_TOAN_THAN: 'KHUYET_TAT_TOAN_THAN',
  KHIEM_THI: 'KHIEM_THI',
  MU_HOAN_TOAN: 'MU_HOAN_TOAN',
  KHIEM_THINH: 'KHIEM_THINH',
  DIEC_HOAN_TOAN: 'DIEC_HOAN_TOAN',
  KHO_GIAO_TIEP: 'KHO_GIAO_TIEP',
  CAM: 'CAM',
  CHAM_PHAT_TRIEN_TRI_TUE: 'CHAM_PHAT_TRIEN_TRI_TUE',
};

export const DISABILITY_TYPE_LABEL = {
  [DISABILITY_TYPE.KHUYET_TAT_TAY]: 'Khuyết tật tay',
  [DISABILITY_TYPE.KHUYET_TAT_CHAN]: 'Khuyết tật chân',
  [DISABILITY_TYPE.KHUYET_TAT_TOAN_THAN]: 'Khuyết tật toàn thân',
  [DISABILITY_TYPE.KHIEM_THI]: 'Khiếm thị',
  [DISABILITY_TYPE.MU_HOAN_TOAN]: 'Mù hoàn toàn',
  [DISABILITY_TYPE.KHIEM_THINH]: 'Khiếm thính',
  [DISABILITY_TYPE.DIEC_HOAN_TOAN]: 'Điếc hoàn toàn',
  [DISABILITY_TYPE.KHO_GIAO_TIEP]: 'Khó giao tiếp',
  [DISABILITY_TYPE.CAM]: 'Câm',
  [DISABILITY_TYPE.CHAM_PHAT_TRIEN_TRI_TUE]: 'Chậm phát triển trí tuệ',
};

export const DISABILITY_TYPE_REVERSE = {
  'Khuyết tật tay': DISABILITY_TYPE.KHUYET_TAT_TAY,
  'Khuyết tật chân': DISABILITY_TYPE.KHUYET_TAT_CHAN,
  'Khuyết tật toàn thân': DISABILITY_TYPE.KHUYET_TAT_TOAN_THAN,
  'Khiếm thị': DISABILITY_TYPE.KHIEM_THI,
  'Mù hoàn toàn': DISABILITY_TYPE.MU_HOAN_TOAN,
  'Khiếm thính': DISABILITY_TYPE.KHIEM_THINH,
  'Điếc hoàn toàn': DISABILITY_TYPE.DIEC_HOAN_TOAN,
  'Khó giao tiếp': DISABILITY_TYPE.KHO_GIAO_TIEP,
  Câm: DISABILITY_TYPE.CAM,
  'Chậm phát triển trí tuệ': DISABILITY_TYPE.CHAM_PHAT_TRIEN_TRI_TUE,
};

export const DISABILITY_TYPE_ARRAY = Object.values(DISABILITY_TYPE).map(
  type => ({
    value: type,
    label: DISABILITY_TYPE_LABEL[type],
  }),
);

export const QUALIFICATION_REQUIREMENT = {
  NONE: 'NONE',
  BASIC: 'BASIC',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
};

export const QUALIFICATION_REQUIREMENT_LABEL = {
  [QUALIFICATION_REQUIREMENT.NONE]: 'Không yêu cầu',
  [QUALIFICATION_REQUIREMENT.BASIC]: 'Cơ bản',
  [QUALIFICATION_REQUIREMENT.INTERMEDIATE]: 'Trung bình',
  [QUALIFICATION_REQUIREMENT.ADVANCED]: 'Nâng cao',
};

export const QUALIFICATION_REQUIREMENT_ARRAY = Object.values(
  QUALIFICATION_REQUIREMENT,
).map(requirement => ({
  value: requirement,
  label: QUALIFICATION_REQUIREMENT_LABEL[requirement],
}));

export const DEGREE_CLASSIFICATION = {
  DISTINCTION: 'DISTINCTION',
  VERY_GOOD: 'VERY_GOOD',
  GOOD: 'GOOD',
  AVERAGE: 'AVERAGE',
  FAIL: 'FAIL',
};

export const DEGREE_CLASSIFICATION_LABEL = {
  [DEGREE_CLASSIFICATION.DISTINCTION]: 'Xuất sắc',
  [DEGREE_CLASSIFICATION.VERY_GOOD]: 'Giỏi',
  [DEGREE_CLASSIFICATION.GOOD]: 'Khá',
  [DEGREE_CLASSIFICATION.AVERAGE]: 'Trung bình',
  [DEGREE_CLASSIFICATION.FAIL]: 'Yếu',
};

export const JOB_TYPE = {
  FULL_TIME: 'Toàn thời gian',
  PART_TIME: 'Bán thời gian',
  INTERNSHIP: 'Thực tập',
  FREELANCE: 'Freelance',
};

export const JOB_TYPE_REVERSE = {
  'Toàn thời gian': 'FULL_TIME',
  'Bán thời gian': 'PART_TIME',
  'Thực tập': 'INTERNSHIP',
  Freelance: 'FREELANCE',
};

export const JOB_TYPE_ARRAY = Object.keys(JOB_TYPE).map(type => ({
  value: type,
  label: JOB_TYPE[type],
}));
