module.exports = class User {
  static memUserList = [];

  static addComments(userName, praise, advice) {
    let discern = null;
    User.memUserList.map((e, index) => {
      if (e.name === userName) {
        User.memUserList[index].praises.push(praise);
        User.memUserList[index].advices.push(advice);
        discern = index;
        return ;
      }
    });
    if (discern === null) return null;
    return User.memUserList[discern];
  }

  static getUserObj(userName) {
    let discern = null;
    User.memUserList.map((e, index) => {
      if (e.name === userName) {
        discern = index;
        return ;
      }
    });
    if (discern === null) return null;
    return User.memUserList[discern];
  }

  constructor(name, praises, advices) {
    this.name = name;
    this.praises = praises;
    this.advices = advices;
  }
};
