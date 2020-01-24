const users = [];

const addUser = ({ userId, username, room }) => {

  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // this mean: if the user try to signup with same username and same room
  const existingUser = users.find(user => user.room === room && user.username === username);

  if(existingUser){
    return { error: 'username is token'}
  }

  const newUser = { userId, username, room };
  users.push(newUser);
  return { newUser }
};

const removeUser = (id) => {
  const index = users.findIndex(user => user.userId === id);
  if(index !== -1) {
    return users.splice(index, 1)[0];
  }

};

const getUser = (id) => {
  const user = users.find(user => user.userId === id.userId);
  return { user }

};

const getUsersInRoom = (room) => {
  return users.find(user => user.room === room);
}

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
