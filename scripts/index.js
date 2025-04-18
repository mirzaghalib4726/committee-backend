const users = [
  {
    _id: '6801f253c79cd2ef96785297',
    name: 'Mirza Usama Ali Baig',
    contributions: [100000],
    bankName: 'Meezan',
    bankAccountNo: '02430110131551',
    userType: 'Admin',
    receivableMonths: ['Aug'],
    __v: 0,
    paymentStatus: {
      May_6802022dc79cd2ef967852a1: true,
    },
  },
  {
    paymentStatus: {},
    _id: '6802022dc79cd2ef967852a1',
    name: 'Syed Airaj Ali Rizvi',
    contributions: [100000],
    bankName: 'Meezan',
    bankAccountNo: '1',
    userType: 'User',
    receivableMonths: ['May'],
    __v: 0,
  },
  {
    paymentStatus: {},
    _id: '680206b1c8c7038b29ea4e6b',
    name: 'Asad Raza',
    contributions: [25000],
    bankName: 'Meezan',
    bankAccountNo: '10',
    userType: 'User',
    receivableMonths: ['Oct'],
    __v: 0,
  },
  {
    paymentStatus: {},
    _id: '68020256c79cd2ef967852a4',
    name: 'Ubaid',
    contributions: [50000],
    bankName: 'Meezan',
    bankAccountNo: '2',
    userType: 'User',
    receivableMonths: ['June'],
    __v: 0,
  },
  {
    paymentStatus: {},
    _id: '6802029ec79cd2ef967852a7',
    name: 'Mohsin Nawaz',
    contributions: [50000],
    bankName: 'Meezan',
    bankAccountNo: '3',
    userType: 'User',
    receivableMonths: ['June'],
    __v: 0,
  },
  {
    paymentStatus: {},
    _id: '680202d8c79cd2ef967852aa',
    name: 'Faran Khalid',
    contributions: [100000],
    bankName: 'Meezan',
    bankAccountNo: '4',
    userType: 'User',
    receivableMonths: ['July'],
    __v: 0,
  },
  {
    paymentStatus: {},
    _id: '6802030ac79cd2ef967852ad',
    name: 'Wajih Ul Hassan',
    contributions: [50000],
    bankName: 'Meezan',
    bankAccountNo: '5',
    userType: 'User',
    receivableMonths: ['Sep'],
    __v: 0,
  },
  {
    paymentStatus: {},
    _id: '68020332c79cd2ef967852b0',
    name: 'Haseeb Ahmad',
    contributions: [50000, 100000],
    bankName: 'Meezan',
    bankAccountNo: '6',
    userType: 'User',
    receivableMonths: ['Sep', 'Nov'],
    __v: 0,
  },
  {
    paymentStatus: {},
    _id: '68020658c8c7038b29ea4e62',
    name: 'Foxy',
    contributions: [25000],
    bankName: 'Meezan',
    bankAccountNo: '7',
    userType: 'User',
    receivableMonths: ['Oct'],
    __v: 0,
  },
  {
    paymentStatus: {},
    _id: '6802067bc8c7038b29ea4e65',
    name: 'Muhamman Ahmad',
    contributions: [25000],
    bankName: 'Meezan',
    bankAccountNo: '8',
    userType: 'User',
    receivableMonths: ['Oct'],
    __v: 0,
  },
  {
    paymentStatus: {},
    _id: '6802069fc8c7038b29ea4e68',
    name: 'Umar',
    contributions: [25000],
    bankName: 'Meezan',
    bankAccountNo: '9',
    userType: 'User',
    receivableMonths: ['Oct'],
    __v: 0,
  },
];

const selectedMonth = 'May';
const rowId = '6802022dc79cd2ef967852a1';
const final = users.reduce((sum, user) => {
  const paymentKey = `${selectedMonth}_${rowId}`;
  if (user.paymentStatus?.[paymentKey]) {
    const monthIndex = user.receivableMonths.indexOf(selectedMonth);
    if (monthIndex !== -1 && user.contributions[monthIndex]) {
      return sum + user.contributions[monthIndex];
    }
  }
  return sum;
}, 0);
