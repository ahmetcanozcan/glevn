function Message(object) {
  if (object) {
    this.head = object.head;
    this.body = object.body;
  } else {
    this.head = {};
    this.body = {
      timestamp: new Date()
    };
  }
}


Message.prototype.from = function (name) {
  this.head.from = name;
  return this;
}

Message.prototype.add = function (key, value) {
  this.body[key] = value;
  return this;
}



module.exports = Message;